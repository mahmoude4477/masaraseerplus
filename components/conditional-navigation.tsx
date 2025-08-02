"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/navigation";

export function ConditionalNavigation() {
  const pathname = usePathname();

  // Hide navigation on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <Navigation />;
}
