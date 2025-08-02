"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DestinationPage() {
  const router = useRouter();
  const [days, setDays] = useState(3);
  const [kidsPlaces, setKidsPlaces] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save preferences to localStorage
    localStorage.setItem(
      "tripPreferences",
      JSON.stringify({
        days,
        kidsPlaces,
        timestamp: Date.now(),
      })
    );

    toast.success("تم حفظ تفضيلاتك بنجاح!", {
      description: "يمكنك الآن المتابعة لاكتشاف الأنشطة",
    });
    router.push("/discover");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-primary">
                اختر وجهتك
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Number of Days */}
                <div className="space-y-4">
                  <Label htmlFor="days" className="text-lg font-medium">
                    اختر عدد أيام رحلتك:
                  </Label>
                  <Input
                    id="days"
                    type="number"
                    min="1"
                    max="14"
                    value={days}
                    onChange={(e) =>
                      setDays(Number.parseInt(e.target.value) || 1)
                    }
                    className="text-center text-lg py-6"
                  />
                </div>

                {/* Kids Places Question */}
                <div className="space-y-4">
                  <Label className="text-lg font-medium">
                    هل تهتم بزيارة أماكن مخصصة للأطفال؟
                  </Label>

                  <div className="flex items-center justify-center space-x-8 space-x-reverse">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="kids-yes"
                        checked={kidsPlaces}
                        onCheckedChange={(checked) =>
                          setKidsPlaces(checked as boolean)
                        }
                      />
                      <Label htmlFor="kids-yes" className="text-lg">
                        نعم
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="kids-no"
                        checked={!kidsPlaces}
                        onCheckedChange={(checked) =>
                          setKidsPlaces(!(checked as boolean))
                        }
                      />
                      <Label htmlFor="kids-no" className="text-lg">
                        لا
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full text-lg py-6">
                  اكتشف عسير
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
