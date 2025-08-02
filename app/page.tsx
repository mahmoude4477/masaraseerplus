import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AIAssistant } from "@/components/ai-assistant";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Image */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/imageL.jpg"
                alt="منظر طبيعي خلاب من منطقة عسير"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="order-1 lg:order-2 text-center lg:rtl-text-right space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-primary leading-tight">
                مسار بلس
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground">
                رحلتك تبدأ من اهتمامك..
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:rtl-justify-end">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/destination">اختر وجهتك</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent"
              >
                <Link href="/experiences">تجارب الزوار</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            اكتشف عسير بطريقة مختلفة
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            منصة ذكية تساعدك في التخطيط لرحلتك المثالية بناءً على اهتماماتك
            وتفضيلاتك الشخصية
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold">تخطيط ذكي</h3>
              <p className="text-muted-foreground">
                خطط لرحلتك بناءً على اهتماماتك وعدد الأيام المتاحة
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-semibold">وجهات مميزة</h3>
              <p className="text-muted-foreground">
                اكتشف أجمل الأماكن والفعاليات في منطقة عسير
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold">تجارب حقيقية</h3>
              <p className="text-muted-foreground">
                استفد من تجارب الزوار السابقين وشارك تجربتك
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center rtl-space-x-6">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary"
              >
                الرئيسية
              </Link>
              <Link
                href="/destination"
                className="text-muted-foreground hover:text-primary"
              >
                اختر وجهتك
              </Link>
              <Link
                href="/experiences"
                className="text-muted-foreground hover:text-primary"
              >
                تجارب الزوار
              </Link>
            </div>
            <div className="text-muted-foreground">
              <p>تواصل معنا: info@masarplus.com</p>
              <p className="mt-2">© 2025 جميع الحقوق محفوظة لمسار بلس</p>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}
