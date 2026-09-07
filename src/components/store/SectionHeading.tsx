import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  className,
  children,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {label ? (
        <p className="label-xs text-primary">{label}</p>
      ) : null}
      <h2 className="display-lg mt-3 uppercase">{title}</h2>
      {subtitle ? (
        <p className="mt-4 text-base text-muted-foreground">{subtitle}</p>
      ) : null}
      {children}
    </div>
  );
}
