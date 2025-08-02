"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { useLanguage } from "@/lib/language-context";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  Calendar,
  Star,
  Clock,
  Camera,
  Users,
} from "lucide-react";
import Image from "next/image";

// Extended experience data with detailed day-by-day information
const experienceDetails = {
  1: {
    id: 1,
    name: "أحمد بن علي",
    days: 4,
    rating: 5,
    date: "2024-12-15",
    location: "أبها - السودة",
    experience:
      "رحلة رائعة جداً! استمتعت بالطبيعة الخلابة والأجواء الباردة في السودة. المناظر كانت خيالية والضباب أضاف جمالاً خاصاً للمكان.",
    avatar: "/placeholder.svg?height=80&width=80",
    totalCost: "1200 ريال",
    groupSize: "عائلة (4 أشخاص)",
    season: "شتاء",
    dailyDetails: [
      {
        day: 1,
        title: "الوصول واستكشاف السودة",
        locations: [
          {
            name: "منتزه السودة",
            time: "10:00 ص",
            duration: "3 ساعات",
            coordinates: { lat: 18.2741, lng: 42.3647 },
            description:
              "بدأنا اليوم بزيارة منتزه السودة الشهير. الطقس كان بارداً والضباب يغطي المكان مما أضاف جمالاً خاصاً.",
            photos: [
              "/placeholder.svg?height=200&width=300",
              "/placeholder.svg?height=200&width=300",
            ],
            tips: "ننصح بإحضار ملابس دافئة حتى في الصيف",
            rating: 5,
          },
          {
            name: "مطعم السودة التراثي",
            time: "1:30 م",
            duration: "ساعة واحدة",
            coordinates: { lat: 18.2751, lng: 42.3657 },
            description:
              "تناولنا الغداء في مطعم تراثي رائع يقدم الأكلات الشعبية المحلية.",
            photos: ["/placeholder.svg?height=200&width=300"],
            tips: "جربوا الكبسة العسيرية والعسل المحلي",
            rating: 4,
          },
        ],
        weather: "بارد وضبابي (15°م)",
        totalDistance: "25 كم",
        highlights: ["الضباب الكثيف", "المناظر الطبيعية", "الطعام التراثي"],
      },
      {
        day: 2,
        title: "استكشاف التراث في رجال ألمع",
        locations: [
          {
            name: "قرية رجال ألمع التراثية",
            time: "9:00 ص",
            duration: "4 ساعات",
            coordinates: { lat: 18.1975, lng: 42.3186 },
            description:
              "زيارة مذهلة للقرية التراثية. المباني الحجرية والألوان الزاهية تحكي تاريخ المنطقة.",
            photos: [
              "/placeholder.svg?height=200&width=300",
              "/placeholder.svg?height=200&width=300",
              "/placeholder.svg?height=200&width=300",
            ],
            tips: "أفضل وقت للتصوير في الصباح الباكر",
            rating: 5,
          },
          {
            name: "متحف رجال ألمع",
            time: "2:00 م",
            duration: "ساعتان",
            coordinates: { lat: 18.1985, lng: 42.3196 },
            description:
              "متحف رائع يعرض تاريخ وثقافة المنطقة بطريقة تفاعلية ممتعة.",
            photos: ["/placeholder.svg?height=200&width=300"],
            tips: "الدخول مجاني والجولات الإرشادية متوفرة",
            rating: 4,
          },
        ],
        weather: "معتدل ومشمس (22°م)",
        totalDistance: "45 كم",
        highlights: ["العمارة التراثية", "المتحف التفاعلي", "الحرف اليدوية"],
      },
      {
        day: 3,
        title: "المغامرة في جبل بوليفارد",
        locations: [
          {
            name: "جبل بوليفارد",
            time: "11:00 ص",
            duration: "5 ساعات",
            coordinates: { lat: 18.2167, lng: 42.5056 },
            description:
              "يوم مليء بالأنشطة الترفيهية والمطاعم الرائعة مع إطلالات خلابة على المدينة.",
            photos: [
              "/placeholder.svg?height=200&width=300",
              "/placeholder.svg?height=200&width=300",
            ],
            tips: "احجزوا في المطاعم مسبقاً خاصة في عطلة نهاية الأسبوع",
            rating: 5,
          },
          {
            name: "التلفريك",
            time: "4:00 م",
            duration: "ساعة واحدة",
            coordinates: { lat: 18.2177, lng: 42.5066 },
            description:
              "رحلة تلفريك ممتعة توفر مناظر بانورامية رائعة للمنطقة.",
            photos: ["/placeholder.svg?height=200&width=300"],
            tips: "أفضل وقت للركوب قبل الغروب",
            rating: 5,
          },
        ],
        weather: "لطيف ومعتدل (20°م)",
        totalDistance: "30 كم",
        highlights: ["التلفريك", "المطاعم المتنوعة", "الأنشطة الترفيهية"],
      },
      {
        day: 4,
        title: "ختام الرحلة في مطل السحاب",
        locations: [
          {
            name: "مطل السحاب",
            time: "8:00 ص",
            duration: "3 ساعات",
            coordinates: { lat: 18.2891, lng: 42.3747 },
            description:
              "ختمنا الرحلة بزيارة مطل السحاب. تجربة لا تُنسى وكأننا نلامس السحب حقاً.",
            photos: [
              "/placeholder.svg?height=200&width=300",
              "/placeholder.svg?height=200&width=300",
            ],
            tips: "اذهبوا في الصباح الباكر لتجنب الزحام والاستمتاع بالضباب",
            rating: 5,
          },
          {
            name: "ممشى الضباب",
            time: "12:00 م",
            duration: "ساعتان",
            coordinates: { lat: 18.2901, lng: 42.3757 },
            description:
              "مشي هادئ في ممشى الضباب كان الختام المثالي لرحلتنا الرائعة.",
            photos: ["/placeholder.svg?height=200&width=300"],
            tips: "مناسب لجميع الأعمار ومجهز بمرافق ممتازة",
            rating: 4,
          },
        ],
        weather: "بارد وضبابي (16°م)",
        totalDistance: "20 كم",
        highlights: ["مطل السحاب", "الممشى الطبيعي", "الهدوء والاسترخاء"],
      },
    ],
  },
  2: {
    id: 2,
    name: "نورة الشهراني",
    days: 3,
    rating: 4,
    date: "2024-12-10",
    location: "رجال ألمع",
    experience:
      "تجربة ثقافية مميزة في قرية رجال ألمع التراثية. المباني الحجرية والألوان الزاهية تحكي تاريخ المنطقة بشكل جميل.",
    avatar: "/placeholder.svg?height=80&width=80",
    totalCost: "800 ريال",
    groupSize: "مجموعة أصدقاء (3 أشخاص)",
    season: "شتاء",
    dailyDetails: [
      {
        day: 1,
        title: "اكتشاف التراث",
        locations: [
          {
            name: "قرية رجال ألمع التراثية",
            time: "9:00 ص",
            duration: "4 ساعات",
            coordinates: { lat: 18.1975, lng: 42.3186 },
            description:
              "يوم كامل في استكشاف القرية التراثية والتعرف على تاريخها العريق.",
            photos: [
              "/placeholder.svg?height=200&width=300",
              "/placeholder.svg?height=200&width=300",
            ],
            tips: "استأجروا دليل محلي للحصول على معلومات أكثر",
            rating: 5,
          },
        ],
        weather: "معتدل (21°م)",
        totalDistance: "15 كم",
        highlights: ["العمارة التراثية", "الحرف اليدوية", "القصص التاريخية"],
      },
      {
        day: 2,
        title: "الطبيعة والاسترخاء",
        locations: [
          {
            name: "ممشى الضباب",
            time: "10:00 ص",
            duration: "3 ساعات",
            coordinates: { lat: 18.2901, lng: 42.3757 },
            description: "مشي هادئ ومريح في أجواء طبيعية خلابة.",
            photos: ["/placeholder.svg?height=200&width=300"],
            tips: "أحضروا كاميرا جيدة لالتقاط الضباب",
            rating: 4,
          },
        ],
        weather: "بارد وضبابي (18°م)",
        totalDistance: "10 كم",
        highlights: ["الضباب الطبيعي", "الهدوء", "التصوير"],
      },
      {
        day: 3,
        title: "التسوق والذكريات",
        locations: [
          {
            name: "سوق رجال ألمع التراثي",
            time: "11:00 ص",
            duration: "2 ساعة",
            coordinates: { lat: 18.1965, lng: 42.3176 },
            description: "تسوق للحرف اليدوية والهدايا التذكارية المحلية.",
            photos: ["/placeholder.svg?height=200&width=300"],
            tips: "تفاوضوا على الأسعار واشتروا المنتجات المحلية",
            rating: 4,
          },
        ],
        weather: "مشمس ومعتدل (23°م)",
        totalDistance: "5 كم",
        highlights: [
          "الحرف اليدوية",
          "الهدايا التذكارية",
          "التفاعل مع السكان المحليين",
        ],
      },
    ],
  },
  // Add more experiences as needed
};

export default function ExperienceDetailPage() {
  //const { t, language } = useLanguage()
  const params = useParams();
  const router = useRouter();
  const [currentDay, setCurrentDay] = useState(1);

  const experienceId = Number.parseInt(params.id as string);
  const experience =
    experienceDetails[experienceId as keyof typeof experienceDetails];

  useEffect(() => {
    if (!experience) {
      router.push("/experiences");
    }
  }, [experience, router]);

  if (!experience) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-primary">
            التجربة غير موجودة
          </h1>
          <Button onClick={() => router.push("/experiences")} className="mt-4">
            العودة إلى التجارب
          </Button>
        </div>
      </div>
    );
  }

  const currentDayDetails = experience.dailyDetails[currentDay - 1];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  // const BackIcon = language === "ar" ? ArrowRight : ArrowLeft;
  // const NextIcon = language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push("/experiences")}
            className="mb-6 hover:bg-transparent"
          >
            <ArrowRight className="h-4 w-4 rtl-ml-2" />
            العودة إلى التجارب
          </Button>

          {/* Experience Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-primary">
                    {experience.name.charAt(0)}
                  </span>
                </div>

                {/* Experience Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">
                      {experience.name}
                    </h1>
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(experience.rating)}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {experience.experience}
                    </p>
                  </div>

                  {/* Trip Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{experience.days} أيام</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{experience.groupSize}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">التكلفة: </span>
                      <span className="text-primary font-bold">
                        {experience.totalCost}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day Navigation */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-primary mb-4">
                تفاصيل الرحلة يوماً بيوم
              </h2>
              <div className="flex flex-wrap gap-2">
                {experience.dailyDetails.map((day) => (
                  <Button
                    key={day.day}
                    variant={currentDay === day.day ? "default" : "outline"}
                    onClick={() => setCurrentDay(day.day)}
                    className="min-w-[100px]"
                  >
                    اليوم {day.day}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Day Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-3">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  اليوم {currentDay}
                </Badge>
                {currentDayDetails.title}
              </CardTitle>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span>🌤️ {currentDayDetails.weather}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    📍 المسافة الإجمالية: {currentDayDetails.totalDistance}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Locations */}
              {currentDayDetails.locations.map((location, index) => (
                <div
                  key={index}
                  className={`rtl-border-r-4 border-primary/20 pr-6 space-y-4`}
                  // className={`rtl-border-r-4 border-primary/20 ${
                  //   language === "ar" ? "pr-6" : "pl-6"
                  // } space-y-4`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {location.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{location.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>⏱️ {location.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {location.coordinates.lat.toFixed(4)},{" "}
                            {location.coordinates.lng.toFixed(4)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(location.rating)}
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {location.description}
                  </p>

                  {/* Photos */}
                  {location.photos && location.photos.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-primary flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        الصور ({location.photos.length})
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {location.photos.map((photo, photoIndex) => (
                          <div
                            key={photoIndex}
                            className="relative aspect-[4/3] rounded-lg overflow-hidden"
                          >
                            <Image
                              src={photo || "/placeholder.svg"}
                              alt={`${location.name} - صورة ${photoIndex + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tips */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">
                      💡 نصيحة:
                    </h4>
                    <p className="text-blue-700 text-sm">{location.tips}</p>
                  </div>
                </div>
              ))}

              {/* Day Highlights */}
              <div className="bg-primary/5 rounded-lg p-6">
                <h3 className="font-semibold text-primary mb-3">
                  ✨ أبرز معالم اليوم:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentDayDetails.highlights.map((highlight, index) => (
                    <Badge key={index} variant="secondary">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Between Days */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
              disabled={currentDay === 1}
            >
              <ArrowRight className="h-4 w-4 rtl-ml-2" />
              اليوم السابق
            </Button>

            <span className="text-muted-foreground">
              {currentDay} من {experience.days}
            </span>

            <Button
              variant="outline"
              onClick={() =>
                setCurrentDay(Math.min(experience.days, currentDay + 1))
              }
              disabled={currentDay === experience.days}
            >
              اليوم التالي
              <ArrowLeft className="h-4 w-4 rtl-mr-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
