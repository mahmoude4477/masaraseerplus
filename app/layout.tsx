import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { LanguageProvider } from "@/lib/language-context";
import { Toaster } from "@/components/ui/sonner";
import { ConditionalNavigation } from "@/components/conditional-navigation";
// import { LayoutWrapper } from "@/components/layout-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "مسار بلس - اكتشف عسير",
  description: "منصة سياحية لاكتشاف أجمل الوجهات في منطقة عسير",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="rtl" lang="ar" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* <LanguageProvider> */}
          {/* <LayoutWrapper> */}
          <>
            <ConditionalNavigation />
            {children}
            <Toaster />
          </>
          {/* </LayoutWrapper> */}
          {/* </LanguageProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
