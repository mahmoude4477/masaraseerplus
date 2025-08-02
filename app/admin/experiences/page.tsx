"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trash2,
  MapPin,
  Star,
  Check,
  X,
  Eye,
  Calendar,
  User,
  Mail,
  Globe,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { mockExperiences, type Experience } from "@/lib/data";

export default function ExperiencesManagement() {
  const [experiences, setExperiences] = useState<Experience[]>(mockExperiences);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [languageFilter, setLanguageFilter] = useState<
    "all" | "ar" | "en" | "both"
  >("all");
  const [modalDisplayLang, setModalDisplayLang] = useState<"ar" | "en">("ar");

  // Get modal display content based on selected language
  const getModalDisplayContent = (experience: Experience) => {
    return {
      title: modalDisplayLang === "ar" ? experience.title : experience.titleEn,
      description:
        modalDisplayLang === "ar"
          ? experience.description
          : experience.descriptionEn,
    };
  };

  // Check if experience has both languages
  const hasBothLanguages = (experience: Experience) => {
    return !!(
      experience.title &&
      experience.title.trim() &&
      experience.titleEn &&
      experience.titleEn.trim()
    );
  };

  const filteredExperiences = experiences.filter((exp) => {
    const matchesStatus = statusFilter === "all" || exp.status === statusFilter;
    const matchesLanguage =
      languageFilter === "all" || exp.language === languageFilter;
    return matchesStatus && matchesLanguage;
  });

  const handleApprove = (id: number) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, status: "approved" as const } : exp
      )
    );
    toast.success("تم الموافقة على التجربة بنجاح");
  };

  const handleReject = (id: number) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, status: "rejected" as const } : exp
      )
    );
    toast.success("تم رفض التجربة");
  };

  const handleDelete = (id: number) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
    toast.success("تم حذف التجربة بنجاح");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "موافق عليها";
      case "pending":
        return "في الانتظار";
      case "rejected":
        return "مرفوضة";
      default:
        return status;
    }
  };

  const stats = [
    {
      title: "إجمالي التجارب",
      value: experiences.length.toString(),
      color: "text-blue-600",
    },
    {
      title: "في الانتظار",
      value: experiences
        .filter((exp) => exp.status === "pending")
        .length.toString(),
      color: "text-yellow-600",
    },
    {
      title: "موافق عليها",
      value: experiences
        .filter((exp) => exp.status === "approved")
        .length.toString(),
      color: "text-green-600",
    },
    {
      title: "مرفوضة",
      value: experiences
        .filter((exp) => exp.status === "rejected")
        .length.toString(),
      color: "text-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            إدارة التجارب
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            مراجعة والموافقة على تجارب المستخدمين
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.title}
                </p>
                <p className={`text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>تصفية التجارب</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div>
              <Label htmlFor="statusFilter">حالة التجربة</Label>
              <Select
                value={statusFilter}
                onValueChange={(value) =>
                  setStatusFilter(
                    value as "all" | "pending" | "approved" | "rejected"
                  )
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="pending">في الانتظار</SelectItem>
                  <SelectItem value="approved">موافق عليها</SelectItem>
                  <SelectItem value="rejected">مرفوضة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="languageFilter">اللغة</Label>
              <Select
                value={languageFilter}
                onValueChange={(value) =>
                  setLanguageFilter(value as "all" | "ar" | "en" | "both")
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="اختر اللغة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع اللغات</SelectItem>
                  <SelectItem value="ar">عربي</SelectItem>
                  <SelectItem value="en">إنجليزي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((experience) => (
          <Card key={experience.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={experience.images[0]}
                alt={experience.title || experience.titleEn}
                fill
                className="object-cover"
              />
              <Badge
                className={`absolute top-2 right-2 ${getStatusColor(
                  experience.status
                )}`}
              >
                {getStatusText(experience.status)}
              </Badge>

              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{experience.rating}</span>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {experience.title || experience.titleEn}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                {experience.description || experience.descriptionEn}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <User className="w-4 h-4 ml-1" />
                  {experience.author}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 ml-1" />
                  {experience.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 ml-1" />
                  {new Date(experience.date).toLocaleDateString("ar-SA")}
                </div>
                {experience.days && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 ml-1" />
                    {experience.days} أيام
                  </div>
                )}
              </div>

              <div className="flex gap-1 mb-3">
                {experience.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {experience.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{experience.tags.length - 2}
                  </Badge>
                )}
              </div>

              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedExperience(experience);
                    // Set default language based on what's available
                    if (experience.title && experience.title.trim()) {
                      setModalDisplayLang("ar");
                    } else if (
                      experience.titleEn &&
                      experience.titleEn.trim()
                    ) {
                      setModalDisplayLang("en");
                    }
                    setIsViewingDetails(true);
                  }}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 ml-1" />
                  عرض
                </Button>
                {experience.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleApprove(experience.id)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleReject(experience.id)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(experience.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Experience Details Modal */}
      {isViewingDetails && selectedExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">تفاصيل التجربة</CardTitle>
                    {/* Language Select Dropdown */}
                    {hasBothLanguages(selectedExperience) && (
                      <div className="ml-4">
                        <Select
                          value={modalDisplayLang}
                          onValueChange={(value) =>
                            setModalDisplayLang(value as "ar" | "en")
                          }
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ar">العربية</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge
                      className={getStatusColor(selectedExperience.status)}
                    >
                      {getStatusText(selectedExperience.status)}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsViewingDetails(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Author Info */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">معلومات الكاتب</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{selectedExperience.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{selectedExperience.authorEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{selectedExperience.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>
                      {new Date(selectedExperience.date).toLocaleDateString(
                        "ar-SA"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              {(selectedExperience.days ||
                selectedExperience.totalCost ||
                selectedExperience.groupSize) && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">تفاصيل الرحلة</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    {selectedExperience.days && (
                      <div>
                        <span className="font-medium">المدة:</span>{" "}
                        {selectedExperience.days} أيام
                      </div>
                    )}
                    {selectedExperience.totalCost && (
                      <div>
                        <span className="font-medium">التكلفة:</span>{" "}
                        {selectedExperience.totalCost}
                      </div>
                    )}
                    {selectedExperience.groupSize && (
                      <div>
                        <span className="font-medium">حجم المجموعة:</span>{" "}
                        {selectedExperience.groupSize}
                      </div>
                    )}
                    {selectedExperience.season && (
                      <div>
                        <span className="font-medium">الموسم:</span>{" "}
                        {selectedExperience.season}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Daily Details */}
              {selectedExperience.dailyDetails &&
                selectedExperience.dailyDetails.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-4 text-lg">
                      برنامج الرحلة اليومي
                    </h4>
                    <div className="space-y-6">
                      {selectedExperience.dailyDetails.map((day, dayIndex) => (
                        <div
                          key={dayIndex}
                          className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-semibold text-lg">
                              اليوم {day.day}: {day.title}
                            </h5>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <span>الطقس: {day.weather}</span>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {day.locations.map((location, locationIndex) => (
                              <div
                                key={locationIndex}
                                className="bg-white dark:bg-gray-700 p-4 rounded border-l-4 border-blue-500"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h6 className="font-medium text-base">
                                    {location.name}
                                  </h6>
                                  <div className="text-sm text-gray-500">
                                    {location.time} - {location.duration}
                                  </div>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                                  {location.description}
                                </p>
                                {location.tips && (
                                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded text-sm">
                                    <span className="font-medium text-yellow-800 dark:text-yellow-200">
                                      نصيحة:
                                    </span>
                                    <span className="text-yellow-700 dark:text-yellow-300 mr-2">
                                      {location.tips}
                                    </span>
                                  </div>
                                )}
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm">
                                      {location.rating}/5
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <MapPin className="w-3 h-3" />
                                    <span>
                                      {location.coordinates.lat.toFixed(4)},{" "}
                                      {location.coordinates.lng.toFixed(4)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">
                                  المسافة الإجمالية:
                                </span>{" "}
                                {day.totalDistance}
                              </div>
                              <div>
                                <span className="font-medium">
                                  أبرز النقاط:
                                </span>{" "}
                                {day.highlights.join("، ")}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Experience Content */}
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {modalDisplayLang === "ar" ? "المحتوى" : "Content"}
                </h4>
                <div className="space-y-3">
                  <div>
                    <Label>
                      {modalDisplayLang === "ar" ? "العنوان" : "Title"}
                    </Label>
                    <p className="text-lg font-medium">
                      {(() => {
                        const content =
                          getModalDisplayContent(selectedExperience);
                        return (
                          content.title ||
                          (modalDisplayLang === "ar"
                            ? "لا يوجد عنوان"
                            : "No title available")
                        );
                      })()}
                    </p>
                  </div>
                  <div>
                    <Label>
                      {modalDisplayLang === "ar" ? "الوصف" : "Description"}
                    </Label>
                    <p className="text-gray-700 dark:text-gray-300">
                      {(() => {
                        const content =
                          getModalDisplayContent(selectedExperience);
                        return (
                          content.description ||
                          (modalDisplayLang === "ar"
                            ? "لا يوجد وصف"
                            : "No description available")
                        );
                      })()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div>
                <h4 className="font-semibold mb-2">الصور</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedExperience.images.map((image, index) => (
                    <div key={index} className="relative h-48">
                      <Image
                        src={image}
                        alt={`صورة ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">الفئة</h4>
                  <Badge variant="secondary">
                    {selectedExperience.category}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">العلامات</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedExperience.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              {selectedExperience.status === "pending" && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={() => {
                      handleApprove(selectedExperience.id);
                      setIsViewingDetails(false);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="w-4 h-4 ml-2" />
                    الموافقة على التجربة
                  </Button>
                  <Button
                    onClick={() => {
                      handleReject(selectedExperience.id);
                      setIsViewingDetails(false);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <X className="w-4 h-4 ml-2" />
                    رفض التجربة
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {filteredExperiences.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              لا توجد تجارب
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              لا توجد تجارب تطابق معايير التصفية المحددة
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
