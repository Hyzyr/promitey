"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Server,
  BarChart2,
  Settings,
  Shield,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard",     icon: LayoutDashboard, label: "Dashboard" },
  { href: "/users",         icon: Users,           label: "Users" },
  { href: "/subscriptions", icon: CreditCard,      label: "Subscriptions" },
  { href: "/servers",       icon: Server,          label: "Servers" },
  { href: "/analytics",     icon: BarChart2,       label: "Analytics" },
  { href: "/settings",      icon: Settings,        label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-neutral-30 bg-white px-4 py-6">
      <div className="mb-8 flex items-center gap-2 px-2">
        <Shield className="h-7 w-7 text-primary-500" />
        <span className="text-lg font-bold text-neutral-900">Prometey VPN</span>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname.includes(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-600"
                  : "text-neutral-600 hover:bg-neutral-20 hover:text-neutral-900",
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
