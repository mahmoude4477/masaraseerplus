"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  //const { t } = useLanguage()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("خطأ في البيانات", {
        description: "يرجى ملء جميع الحقول المطلوبة",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("خطأ في كلمة المرور", {
        description: "كلمة المرور وتأكيد كلمة المرور غير متطابقتين",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast.error("كلمة مرور ضعيفة", {
        description: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
      });
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error("الموافقة على الشروط", {
        description: "يجب الموافقة على الشروط والأحكام للمتابعة",
      });
      return;
    }

    // Simulate registration
    toast.success("تم إنشاء الحساب بنجاح!", {
      description: "مرحباً بك في مسار بلس، يمكنك الآن تسجيل الدخول",
    });

    // In a real app, you would handle registration here
    console.log("Registration attempt:", formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-primary">
                إنشاء حساب جديد
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                انضم إلى مسار بلس واكتشف أجمل الوجهات في عسير
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="اكتب اسمك الكامل"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="اختر كلمة مرور قوية"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    يجب أن تكون كلمة المرور 6 أحرف على الأقل
                  </p>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="أعد كتابة كلمة المرور"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-2 space-x-reverse">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked: boolean) =>
                      handleInputChange("agreeToTerms", checked)
                    }
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    أوافق على{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      الشروط والأحكام
                    </Link>{" "}
                    و{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      سياسة الخصوصية
                    </Link>
                  </Label>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg">
                  إنشاء الحساب
                </Button>

                {/* Login Link */}
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    هل لديك حساب بالفعل؟{" "}
                  </span>
                  <Link
                    href="/login"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    تسجيل الدخول
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
