"use client";

import type React from "react";

// import { useLanguage } from "@/lib/language-context";
import { useEffect } from "react";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  // const { language } = useLanguage();

  useEffect(() => {
    // Update document direction and language
    // document.documentElement.lang = language;
    document.documentElement.dir = "rtl"; // language === "ar" ? "rtl" : "rtl";
  }, []); // [language]

  return <>{children}</>;
}
