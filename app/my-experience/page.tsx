"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
// import { useLanguage } from "@/lib/language-context";
import { useState, useEffect } from "react";
import { Star, Calendar, Send } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";

const activities = [
  {
    id: 1,
    name: "منتزه السودة",
    image: "/placeholder.svg?height=200&width=300",
    visitDate: "2024-12-20",
  },
  {
    id: 2,
    name: "قرية رجال ألمع التراثية",
    image: "/placeholder.svg?height=200&width=300",
    visitDate: "2024-12-21",
  },
  {
    id: 3,
    name: "جبل بوليفارد",
    image: "/placeholder.svg?height=200&width=300",
    visitDate: "2024-12-22",
  },
];

export default function MyExperiencePage() {
  //const { t } = useLanguage()
  const [experiences, setExperiences] = useState<{
    [key: number]: { rating: number; review: string };
  }>({});
  const [likedActivities, setLikedActivities] = useState<number[]>([]);

  useEffect(() => {
    // Load liked activities from localStorage
    const liked = localStorage.getItem("likedActivities");
    if (liked) {
      setLikedActivities(JSON.parse(liked));
    }

    // Load saved experiences
    const savedExperiences = localStorage.getItem("myExperiences");
    if (savedExperiences) {
      setExperiences(JSON.parse(savedExperiences));
    }
  }, []);

  const visitedActivities = activities.filter((activity) =>
    likedActivities.includes(activity.id)
  );

  const handleRatingChange = (activityId: number, rating: number) => {
    setExperiences((prev) => ({
      ...prev,
      [activityId]: {
        ...prev[activityId],
        rating,
        review: prev[activityId]?.review || "",
      },
    }));
  };

  const handleReviewChange = (activityId: number, review: string) => {
    setExperiences((prev) => ({
      ...prev,
      [activityId]: {
        ...prev[activityId],
        rating: prev[activityId]?.rating || 0,
        review,
      },
    }));
  };

  const handleSubmitExperience = (activityId: number) => {
    const experience = experiences[activityId];
    if (!experience?.rating || !experience?.review.trim()) {
      toast.error("بيانات ناقصة", {
        description: "يرجى إضافة التقييم والمراجعة قبل الإرسال",
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem("myExperiences", JSON.stringify(experiences));

    toast.success("تم إرسال تقييمك بنجاح!", {
      description: "شكراً لك على مشاركة تجربتك معنا",
    });
  };

  const renderStars = (activityId: number, currentRating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => handleRatingChange(activityId, i + 1)}
        className="focus:outline-none"
      >
        <Star
          className={`h-6 w-6 transition-colors ${
            i < currentRating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300 hover:text-yellow-200"
          }`}
        />
      </button>
    ));
  };

  if (visitedActivities.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="p-12">
                <h1 className="text-3xl font-bold text-primary mb-4">تجربتي</h1>
                <p className="text-muted-foreground mb-8">
                  لم تقم بزيارة أي أنشطة بعد. عد إلى صفحة الاكتشاف لاختيار
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
            <h1 className="text-4xl font-bold text-primary mb-4">تجربتي</h1>
            <p className="text-lg text-muted-foreground">
              شارك تجربتك مع الأنشطة التي قمت بزيارتها وساعد الزوار الآخرين
            </p>
          </div>

          {/* Experience Cards */}
          <div className="space-y-8">
            {visitedActivities.map((activity) => {
              const experience = experiences[activity.id] || {
                rating: 0,
                review: "",
              };

              return (
                <Card key={activity.id} className="shadow-lg">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={activity.image || "/placeholder.svg"}
                          alt={activity.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <CardTitle className="text-2xl text-primary mb-2">
                          {activity.name}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>تمت الزيارة: {activity.visitDate}</span>
                          </div>
                          <Badge variant="secondary">مُكتملة</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Rating Section */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-primary">
                        تقييمك للموقع:
                      </h3>
                      <div className="flex items-center gap-2">
                        {renderStars(activity.id, experience.rating)}
                        <span className="text-sm text-muted-foreground mr-2">
                          ({experience.rating}/5)
                        </span>
                      </div>
                    </div>

                    {/* Review Section */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-primary">
                        مراجعتك:
                      </h3>
                      <Textarea
                        placeholder="اكتب تجربتك مع هذا المكان... ما الذي أعجبك؟ ما النصائح التي تود مشاركتها مع الزوار الآخرين؟"
                        value={experience.review}
                        onChange={(e) =>
                          handleReviewChange(activity.id, e.target.value)
                        }
                        className="min-h-[120px] resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSubmitExperience(activity.id)}
                        className="px-6"
                      >
                        <Send className="h-4 w-4 ml-2" />
                        إرسال التقييم
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Summary Card */}
          <Card className="mt-12 bg-primary/5">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">
                شكراً لك!
              </h2>
              <p className="text-muted-foreground mb-6">
                تقييماتك ومراجعاتك تساعد الزوار الآخرين في اتخاذ قرارات أفضل
                لرحلاتهم
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild variant="outline">
                  <Link href="/experiences">عرض تجارب الزوار</Link>
                </Button>
                <Button asChild>
                  <Link href="/destination">خطط رحلة جديدة</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
