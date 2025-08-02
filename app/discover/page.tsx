"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
// import { useLanguage } from "@/lib/language-context";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { getAllActivities } from "@/lib/data";

const activities = getAllActivities();

export default function DiscoverPage() {
  //const { t, language } = useLanguage()
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedActivities, setLikedActivities] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Load liked activities from localStorage
    const saved = localStorage.getItem("likedActivities");
    if (saved) {
      setLikedActivities(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Update progress
    setProgress((currentIndex / activities.length) * 100);
  }, [currentIndex]);

  const handleLike = () => {
    const activityId = activities[currentIndex].id;
    const newLiked = [...likedActivities, activityId];
    setLikedActivities(newLiked);
    localStorage.setItem("likedActivities", JSON.stringify(newLiked));
    toast.success("تمت إضافة النشاط إلى المفضلة!", {
      description: activities[currentIndex].name,
    });
    nextActivity();
  };

  const handleDislike = () => {
    const activityId = activities[currentIndex].id;
    const newLiked = likedActivities.filter((id) => id !== activityId);
    setLikedActivities(newLiked);
    localStorage.setItem("likedActivities", JSON.stringify(newLiked));
    nextActivity();
  };

  const nextActivity = () => {
    if (currentIndex < activities.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All activities viewed, go to plan
      router.push("/my-plan");
    }
  };

  const prevActivity = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentActivity = activities[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-center text-sm text-muted-foreground mt-2">
            {currentIndex + 1} من {activities.length}
          </p>
        </div>

        {/* Liked Activities Preview */}
        {likedActivities.length > 0 && (
          <div
            className={`fixed top-20 z-40 bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs rtl-left-4`}
            // className={`fixed top-20 z-40 bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs ${
            //   language === "ar" ? "rtl-left-4" : "right-4"
            // }`}
          >
            <h3 className="text-sm font-medium mb-2">
              الأنشطة المفضلة ({likedActivities.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {likedActivities.slice(-3).map((id) => {
                const activity = activities.find((a) => a.id === id);
                return activity ? (
                  <div
                    key={id}
                    className="w-12 h-12 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : null;
              })}
              {likedActivities.length > 3 && (
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-xs">
                  +{likedActivities.length - 3}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <h1 className="text-3xl font-bold text-center text-primary mb-8">
                اكتشف أنشطة عسير {/* t("discover.title") */}
              </h1>

              {/* Activity Display */}
              <div className="space-y-6">
                <div className="flex items-center justify-center rtl-space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevActivity}
                    disabled={currentIndex === 0}
                    className="h-12 w-12 bg-transparent"
                  >
                    <ChevronRight className="h-6 w-6" />
                    {/* {language === "ar" ? (
                      <ChevronRight className="h-6 w-6" />
                    ) : (
                      <ChevronLeft className="h-6 w-6" />
                    )} */}
                  </Button>

                  <div className="flex-1 max-w-2xl">
                    <div className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={currentActivity.image || "/placeholder.svg"}
                        alt={currentActivity.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    <div className="text-center mt-4 space-y-2">
                      <h2 className="text-2xl font-bold text-primary">
                        {currentActivity.name}
                      </h2>
                      <p className="text-muted-foreground">
                        {currentActivity.description}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextActivity}
                    className="h-12 w-12 bg-transparent"
                  >
                    <ChevronLeft className="h-6 w-6" />
                    {/* {language === "ar" ? (
                      <ChevronLeft className="h-6 w-6" />
                    ) : (
                      <ChevronRight className="h-6 w-6" />
                    )} */}
                  </Button>
                </div>

                {/* Like/Dislike Buttons */}
                <div className="flex justify-center rtl-space-x-6">
                  <Button
                    onClick={handleLike}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-6"
                  >
                    <Heart className="h-5 w-5 rtl-ml-2" />
                    أعجبني {/* t("discover.like") */}
                  </Button>

                  <Button
                    onClick={handleDislike}
                    variant="outline"
                    size="lg"
                    className="border-red-200 text-red-600 hover:bg-red-50 px-8 py-6 bg-transparent"
                  >
                    <X className="h-5 w-5 rtl-ml-2" />
                    لا يعجبني {/* t("discover.dislike") */}
                  </Button>
                </div>

                {/* Go to Plan Button */}
                {likedActivities.length > 0 && (
                  <div className="text-center pt-4">
                    <Button
                      onClick={() => router.push("/my-plan")}
                      variant="secondary"
                      size="lg"
                    >
                      خطتي ({likedActivities.length}){" "}
                      {/* t("discover.my_plan") */}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
