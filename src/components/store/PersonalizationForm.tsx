import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { formatPrice, productSettings } from "@/config/site";
import { products, type Product } from "@/data/products";
import { useCart, type Personalization } from "@/lib/cart";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-sm border border-input bg-background px-4 py-3.5 text-sm outline-none transition-colors focus:border-primary";
const labelClass = "label-xs mb-2 block text-muted-foreground";

const emptyForm: Personalization = {
  recipient: "",
  name: "",
  date: "",
  message: "",
  language: "English",
  instructions: "",
};

export function PersonalizationForm({
  product,
  allowDesignChoice = false,
  compact = false,
}: {
  /** Pre-selected design (product detail page). */
  product?: Product;
  /** Show the design dropdown (standalone builder). */
  allowDesignChoice?: boolean;
  compact?: boolean;
}) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [form, setForm] = useState<Personalization>(emptyForm);
  const [designSlug, setDesignSlug] = useState(product?.slug ?? "");
  const [quantity, setQuantity] = useState(1);
  const [photoName, setPhotoName] = useState<string>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  const selected =
    product ?? products.find((item) => item.slug === designSlug) ?? undefined;

  const update = (key: keyof Personalization, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.recipient) next["recipient"] = "Please choose who this is for.";
    if (allowDesignChoice && !designSlug) next["design"] = "Please choose a design.";
    if (!form.name.trim() && !form.message.trim()) {
      next["message"] = "Add a name or a message to engrave.";
    }
    if (form.name.length > productSettings.nameMaxLength) {
      next["name"] = `Names are limited to ${productSettings.nameMaxLength} characters.`;
    }
    if (form.message.length > productSettings.messageMaxLength) {
      next["message"] = `Messages are limited to ${productSettings.messageMaxLength} characters.`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePreview = () => {
    if (!validate()) {
      toast.error("Please complete the highlighted fields.");
      return;
    }
    setShowPreview(true);
  };

  const handleAddToCart = () => {
    if (!validate()) {
      toast.error("Please complete the highlighted fields.");
      return;
    }
    if (!selected) {
      setErrors((current) => ({ ...current, design: "Please choose a design." }));
      return;
    }
    const image = selected.images[0];
    addItem({
      productId: selected.id,
      slug: selected.slug,
      title: selected.title,
      image: image?.localPath ?? "",
      imageAlt: image?.alt ?? selected.title,
      price: selected.price,
      quantity,
      personalization: photoName ? { ...form, photoName } : { ...form },
    });
    toast.success("Added to cart. Please review your spelling before checkout.");
    void navigate({ to: "/cart" });
  };

  return (
    <div className={cn("grid gap-10", compact ? "" : "lg:grid-cols-[1.1fr_0.9fr]")}>
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="recipient" className={labelClass}>
              Who is it for?
            </label>
            <select
              id="recipient"
              value={form.recipient}
              onChange={(event) => update("recipient", event.target.value)}
              className={fieldClass}
            >
              <option value="">Select recipient</option>
              {productSettings.recipients.map((recipient) => (
                <option key={recipient} value={recipient}>
                  {recipient}
                </option>
              ))}
            </select>
            <FieldError message={errors["recipient"]} />
          </div>

          {allowDesignChoice ? (
            <div>
              <label htmlFor="design" className={labelClass}>
                Design
              </label>
              <select
                id="design"
                value={designSlug}
                onChange={(event) => {
                  setDesignSlug(event.target.value);
                  setErrors((current) => ({ ...current, design: "" }));
                }}
                className={fieldClass}
              >
                <option value="">Select a design</option>
                {products.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.title}
                  </option>
                ))}
              </select>
              <FieldError message={errors["design"]} />
            </div>
          ) : (
            <div>
              <label htmlFor="language-top" className={labelClass}>
                Engraving language
              </label>
              <select
                id="language-top"
                value={form.language}
                onChange={(event) => update("language", event.target.value)}
                className={fieldClass}
              >
                {productSettings.engravingLanguages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input
              id="name"
              value={form.name}
              maxLength={productSettings.nameMaxLength}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Name to engrave"
              className={fieldClass}
            />
            <FieldError message={errors["name"]} />
          </div>
          <div>
            <label htmlFor="date" className={labelClass}>
              Special date (optional)
            </label>
            <input
              id="date"
              type="date"
              value={form.date}
              onChange={(event) => update("date", event.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Your message
          </label>
          <textarea
            id="message"
            rows={4}
            value={form.message}
            maxLength={productSettings.messageMaxLength}
            onChange={(event) => update("message", event.target.value)}
            placeholder="The words you want engraved"
            className={cn(fieldClass, "resize-none")}
          />
          <div className="mt-1.5 flex items-center justify-between">
            <FieldError message={errors["message"]} />
            <p className="text-xs text-muted-foreground">
              {form.message.length}/{productSettings.messageMaxLength}
            </p>
          </div>
        </div>

        {allowDesignChoice ? (
          <div>
            <label htmlFor="language" className={labelClass}>
              Language
            </label>
            <select
              id="language"
              value={form.language}
              onChange={(event) => update("language", event.target.value)}
              className={fieldClass}
            >
              {productSettings.engravingLanguages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-muted-foreground">
              Engraving can be requested in other languages — enter the exact text
              you want engraved.
            </p>
          </div>
        ) : null}

        <div>
          <label htmlFor="photo" className={labelClass}>
            Optional photo
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={(event) => setPhotoName(event.target.files?.[0]?.name)}
            className="w-full text-sm text-muted-foreground file:mr-4 file:rounded-sm file:border file:border-input file:bg-secondary file:px-4 file:py-2.5 file:text-xs file:tracking-widest file:uppercase"
          />
          {photoName ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Attached: {photoName}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="instructions" className={labelClass}>
            Special instructions
          </label>
          <textarea
            id="instructions"
            rows={3}
            value={form.instructions}
            onChange={(event) => update("instructions", event.target.value)}
            placeholder="Anything we should know"
            className={cn(fieldClass, "resize-none")}
          />
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="quantity" className="label-xs text-muted-foreground">
            Qty
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            max={20}
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value) || 1)}
            className="w-20 rounded-sm border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handlePreview}
            className="label-xs flex-1 rounded-sm border border-foreground/20 px-6 py-4 transition-colors hover:border-primary hover:text-primary"
          >
            Preview your tag
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            className="label-xs flex-1 rounded-sm bg-primary px-6 py-4 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Add to cart
            {selected ? ` — ${formatPrice(selected.price * quantity)}` : ""}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Preview is for placement reference only. Please review spelling
          carefully before ordering personalized items.
        </p>
      </div>

      {!compact ? (
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-sm border border-border bg-card">
            {selected?.images[0] ? (
              <img
                src={selected.images[0].localPath}
                alt={selected.images[0].alt}
                width={selected.images[0].width}
                height={selected.images[0].height}
                loading="lazy"
                className="aspect-4/5 w-full object-cover"
              />
            ) : (
              <div className="aspect-4/5 grid place-items-center bg-secondary p-8 text-center text-sm text-muted-foreground">
                Choose a design to see it here.
              </div>
            )}
            <div className="space-y-3 p-6">
              <p className="label-xs text-primary">Placement reference</p>
              {showPreview ? (
                <div className="space-y-1.5 border-l-2 border-primary/40 pl-4 font-display text-lg leading-snug">
                  {form.name ? <p>{form.name}</p> : null}
                  {form.message ? (
                    <p className="text-base">{form.message}</p>
                  ) : null}
                  {form.date ? (
                    <p className="text-sm text-muted-foreground">{form.date}</p>
                  ) : null}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Fill in your details and select Preview your tag to see how your
                  words are laid out.
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Preview is for placement reference only — final engraving may vary
                slightly.
              </p>
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-destructive">{message}</p>;
}
