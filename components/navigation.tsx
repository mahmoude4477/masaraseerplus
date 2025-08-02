"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { useLanguage } from "@/lib/language-context"
// import { Globe, Menu } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function Navigation() {
  // const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "الرئيسية" }, // t("nav.home")
    { href: "/destination", label: "الوجهات" }, // t("nav.destination")
    { href: "/my-plan", label: "خطتي" }, // t("nav.plan")
    { href: "/my-experience", label: "تجربتي" }, // t("nav.experience")
    { href: "/experiences", label: "التجارب" }, // t("nav.experiences")
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-foreground hover:text-primary transition-colors font-medium ${
            mobile ? "block py-2" : ""
          }`}
          onClick={() => mobile && setIsOpen(false)}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              عسير بلس {/* t("nav.logo") */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse rtl:space-x-reverse">
            <NavLinks />
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4 space-x-reverse rtl:space-x-reverse">
            {/* Language Switcher */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Globe className="h-4 w-4 ml-2 rtl:ml-2" />
                  {t("nav.language")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("ar")}>العربية</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            {/* Login Button */}
            {/* t("nav.login") */}
            <Button asChild variant="outline">
              <Link href="/login">تسجيل الدخول</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                {/* language === "ar" ? "right" : "left" */}
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
