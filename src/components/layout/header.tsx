import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-30 bg-white px-6">
      <div />
      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 hover:bg-neutral-20"
        >
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-8 w-8 rounded-full bg-primary-500" />
      </div>
    </header>
  );
}
