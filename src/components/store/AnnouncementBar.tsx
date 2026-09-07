import { site } from "@/config/site";

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-ink-foreground">
      <div className="shell flex items-center justify-center gap-3 py-2.5 text-center">
        <p className="label-xs opacity-90">{site.announcement.primary}</p>
        <span aria-hidden className="hidden h-3 w-px bg-current/30 sm:block" />
        <p className="label-xs hidden opacity-60 sm:block">
          {site.announcement.secondary}
        </p>
      </div>
    </div>
  );
}
