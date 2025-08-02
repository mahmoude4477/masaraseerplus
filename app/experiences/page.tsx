"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
// import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import { Search, MapPin, Calendar, Star } from "lucide-react";
import Link from "next/link";
// import { useRouter } from "next/navigation";

const visitorExperiences = [
  {
    id: 1,
    name: "أحمد بن علي",
    days: 4,
    rating: 5,
    date: "2024-12-15",
    location: "أبها - السودة",
    experience:
      "رحلة رائعة جداً! استمتعت بالطبيعة الخلابة والأجواء الباردة في السودة. المناظر كانت خيالية والضباب أضاف جمالاً خاصاً للمكان.",
    activities: ["منتزه السودة", "قرية رجال ألمع", "جبل بوليفارد"],
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "نورة الشهراني",
    days: 3,
    rating: 4,
    date: "2024-12-10",
    location: "رجال ألمع",
    experience:
      "تجربة ثقافية مميزة في قرية رجال ألمع التراثية. المباني الحجرية والألوان الزاهية تحكي تاريخ المنطقة بشكل جميل.",
    activities: ["قرية رجال ألمع", "ممشى الضباب"],
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "محمد القحطاني",
    days: 5,
    rating: 5,
    date: "2024-12-05",
    location: "أبها - بوليفارد",
    experience:
      "رحلة عائلية ممتازة! الأطفال استمتعوا كثيراً في جبل بوليفارد والأنشطة الترفيهية. المطاعم والمقاهي كانت رائعة.",
    activities: ["جبل بوليفارد", "مطل السحاب", "منتزه السودة"],
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "فاطمة العسيري",
    days: 2,
    rating: 4,
    date: "2024-11-28",
    location: "مطل السحاب",
    experience:
      "مطل السحاب كان تجربة لا تُنسى! الشعور وكأنك تلامس السحب حقاً. مكان مثالي للتصوير ومشاهدة الغروب.",
    activities: ["مطل السحاب", "ممشى الضباب"],
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 5,
    name: "سعد الغامدي",
    days: 6,
    rating: 5,
    date: "2024-11-20",
    location: "عسير - جولة شاملة",
    experience:
      "جولة شاملة في منطقة عسير. كل مكان له طابعه الخاص وجماله المميز. أنصح بقضاء وقت كافي في كل موقع للاستمتاع الكامل.",
    activities: [
      "منتزه السودة",
      "قرية رجال ألمع",
      "جبل بوليفارد",
      "مطل السحاب",
      "ممشى الضباب",
    ],
    avatar: "/placeholder.svg?height=60&width=60",
  },
];

export default function ExperiencesPage() {
  // const { t, language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("");
  // const router = useRouter();

  const filteredExperiences = visitorExperiences.filter(
    (exp) =>
      exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.days.toString().includes(searchTerm)
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              تجارب الزوار
            </h1>
            <p className="text-lg text-muted-foreground">
              اكتشف تجارب الزوار السابقين واستفد من نصائحهم وتوصياتهم
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search
              // TODO:fix language
              className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 ${"rtl-right-3"}`}
              // className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 ${
              //   "ar" === "ar" ? "rtl-right-3" : "left-3"
              // }`}
            />
            <Input
              type="text"
              placeholder="ابحث باسم الزائر أو المكان أو عدد الأيام..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // TODO: fix language
              className={`py-6 text-lg ${
                "ar" === "ar" ? "rtl-pr-12" : "pl-12"
              }`}
            />
          </div>

          {/* Experiences Grid */}
          <div className="space-y-6">
            {filteredExperiences.map((experience) => (
              <Link key={experience.id} href={`/experiences/${experience.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-primary">
                          {experience.name.charAt(0)}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-primary">
                              {experience.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{experience.days} أيام</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{experience.location}</span>
                              </div>
                              <span>{experience.date}</span>
                            </div>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-1">
                            {renderStars(experience.rating)}
                          </div>
                        </div>

                        {/* Experience Preview */}
                        <p className="text-muted-foreground line-clamp-2">
                          {experience.experience}
                        </p>

                        {/* Activities */}
                        <div className="flex flex-wrap gap-2">
                          {experience.activities
                            .slice(0, 3)
                            .map((activity, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {activity}
                              </Badge>
                            ))}
                          {experience.activities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{experience.activities.length - 3} المزيد
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredExperiences.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                لم يتم العثور على تجارب تطابق بحثك
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted/50 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2025 جميع الحقوق محفوظة - منصة مسار بلس</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
