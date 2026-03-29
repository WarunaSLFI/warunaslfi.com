"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export default function Navigation() {
  return (
    <nav className="flex items-center gap-8">
      {siteConfig.navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
