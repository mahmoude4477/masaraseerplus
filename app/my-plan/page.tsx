"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { useLanguage } from "@/lib/language-context";
import { useState, useEffect } from "react";
import { MapPin, Clock, Users, Printer, Edit } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const activities = [
  {
    id: 1,
    name: "متنزه عسير الوطني",
    image: "/image1.jpeg", // نفس صورة الحدث 1
    description:
      "من أكبر المتنزهات الوطنية في المملكة، يضم مسارات جبلية وإطلالات بانورامية على جبال السروات.",
    duration: "3 ساعات",
    type: "طبيعة",
  },
  {
    id: 2,
    name: "منتزه السودة",
    image: "/image2.jpeg", // نفس صورة الحدث 2
    description:
      "منتزه جبلي يشتهر بضبابه الدائم وأجوائه الباردة، ويضم مسارات للمشي ومنصات مشاهدة.",
    duration: "3 ساعات",
    type: "طبيعة",
  },
  {
    id: 3,
    name: "قرية رجال ألمع التراثية",
    image: "/image3.jpeg", // نفس صورة الحدث 3
    description:
      "قرية أثرية حجرية تتميز بعمارتها التقليدية الملونة وتاريخها العريق في التجارة والثقافة.",
    duration: "2 ساعة",
    type: "تراث",
  },
  {
    id: 4,
    name: "شارع الفن (أبها)",
    image: "/image4.jpeg", // نفس صورة الحدث 4
    description:
      "ممر ثقافي في وسط أبها يضم معارض فنية، مقاهي، وأسواقًا محلية بأجواء نابضة.",
    duration: "4 ساعات",
    type: "ترفيه",
  },
  {
    id: 5,
    name: "قرية الحبلة المعلّقة",
    image: "/image6.jpeg", // نفس صورة الحدث 6
    description:
      "قرية جبلية معلّقة تطل على أخاديد عميقة، مع منازل حجرية وسلالم خشبية تاريخية.",
    duration: "2 ساعة",
    type: "تاريخ",
  },
];

export default function MyPlanPage() {
  //const { t } = useLanguage()
  const [likedActivities, setLikedActivities] = useState<number[]>([]);
  const [tripPreferences, setTripPreferences] = useState<null | {
    days: number;
    kidsPlaces: boolean;
  }>(null);

  useEffect(() => {
    // Load data from localStorage
    const liked = localStorage.getItem("likedActivities");
    const preferences = localStorage.getItem("tripPreferences");

    if (liked) {
      setLikedActivities(JSON.parse(liked));
    }
    if (preferences) {
      setTripPreferences(JSON.parse(preferences));
    }
  }, []);

  const selectedActivities = activities.filter((activity) =>
    likedActivities.includes(activity.id)
  );

  const distributeDays = () => {
    if (!tripPreferences || selectedActivities.length === 0) return [];

    const days = tripPreferences.days || 3;
    const activitiesPerDay = Math.ceil(selectedActivities.length / days);
    const dayPlans = [];

    for (let i = 0; i < days; i++) {
      const startIndex = i * activitiesPerDay;
      const dayActivities = selectedActivities.slice(
        startIndex,
        startIndex + activitiesPerDay
      );
      if (dayActivities.length > 0) {
        dayPlans.push({
          day: i + 1,
          activities: dayActivities,
        });
      }
    }

    return dayPlans;
  };

  const dayPlans = distributeDays();

  const handlePrint = () => {
    window.print();
    toast.success("تم إعداد الخطة للطباعة!", {
      description: "يمكنك الآن طباعة خطة رحلتك",
    });
  };

  const handleEdit = () => {
    toast("تعديل الخطة", {
      description: "سيتم توجيهك لتعديل الخطة قريباً!",
    });
  };

  if (selectedActivities.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="p-12">
                <h1 className="text-3xl font-bold text-primary mb-4">خطتي</h1>
                <p className="text-muted-foreground mb-8">
                  لم يتم اختيار أي أنشطة بعد. عد إلى صفحة الاكتشاف لاختيار
                  الأنشطة التي تعجبك.
                </p>
                <Button asChild>
                  <a href="/discover">اكتشف الأنشطة</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">خطتي</h1>
            <p className="text-lg text-muted-foreground">
              بناءً على الأنشطة التي أعجبتك، تم إعداد خطة رحلة مناسبة لك
            </p>
          </div>

          {/* Trip Summary */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-wrap justify-center gap-6 text-center">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">
                    {tripPreferences?.days || dayPlans.length} أيام
                  </span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-medium">
                    {selectedActivities.length} نشاط
                  </span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">
                    {tripPreferences?.kidsPlaces ? "مناسب للأطفال" : "للكبار"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day Plans */}
          <div className="space-y-8">
            {dayPlans.map((dayPlan) => (
              <Card key={dayPlan.day} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">
                    اليوم {dayPlan.day}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {dayPlan.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex gap-4 p-4 rounded-lg bg-muted/30"
                    >
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={activity.image || "/placeholder.svg"}
                          alt={activity.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="text-xl font-semibold text-primary">
                            {activity.name}
                          </h3>
                          <Badge variant="secondary">{activity.type}</Badge>
                        </div>

                        <p className="text-muted-foreground text-sm">
                          {activity.description}
                        </p>

                        <div className="flex items-center space-x-4 space-x-reverse text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Clock className="h-4 w-4" />
                            <span>{activity.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button onClick={handlePrint} variant="outline" size="lg">
              <Printer className="h-5 w-5 ml-2" />
              طباعة الخطة
            </Button>
            <Button onClick={handleEdit} variant="outline" size="lg">
              <Edit className="h-5 w-5 ml-2" />
              تعديل الخطة
            </Button>
            <Button asChild size="lg">
              <a href="/my-experience">تقييم تجربتي</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
