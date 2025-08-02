"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, Save, Bell, Lock, Globe, Mail } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "مسار بلس",
    siteDescription: "منصة سياحية لاكتشاف أجمل الوجهات في منطقة عسير",
    contactEmail: "info@masarplus.com",
    supportPhone: "+966501234567",
    enableNotifications: true,
    enableRegistration: true,
    enableBooking: true,
    enableReviews: true,
    maintenanceMode: false,
    maxBookingDays: "30",
    defaultLanguage: "ar",
  });

  const handleSave = () => {
    // Here you would typically save to a backend
    toast.success("تم حفظ الإعدادات بنجاح");
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          الإعدادات
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          إدارة إعدادات النظام والموقع
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              الإعدادات العامة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">اسم الموقع</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleInputChange("siteName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="siteDescription">وصف الموقع</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) =>
                  handleInputChange("siteDescription", e.target.value)
                }
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="defaultLanguage">اللغة الافتراضية</Label>
              <select
                id="defaultLanguage"
                value={settings.defaultLanguage}
                onChange={(e) =>
                  handleInputChange("defaultLanguage", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              معلومات الاتصال
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="contactEmail">البريد الإلكتروني</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) =>
                  handleInputChange("contactEmail", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="supportPhone">رقم الدعم</Label>
              <Input
                id="supportPhone"
                value={settings.supportPhone}
                onChange={(e) =>
                  handleInputChange("supportPhone", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="maxBookingDays">أقصى مدة للحجز (بالأيام)</Label>
              <Input
                id="maxBookingDays"
                type="number"
                value={settings.maxBookingDays}
                onChange={(e) =>
                  handleInputChange("maxBookingDays", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Feature Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              إعدادات الميزات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableRegistration">تفعيل التسجيل</Label>
                <p className="text-sm text-gray-500">
                  السماح للمستخدمين بإنشاء حسابات جديدة
                </p>
              </div>
              <Checkbox
                id="enableRegistration"
                checked={settings.enableRegistration}
                onCheckedChange={(checked) =>
                  handleInputChange("enableRegistration", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableBooking">تفعيل الحجوزات</Label>
                <p className="text-sm text-gray-500">
                  السماح للمستخدمين بحجز الرحلات
                </p>
              </div>
              <Checkbox
                id="enableBooking"
                checked={settings.enableBooking}
                onCheckedChange={(checked) =>
                  handleInputChange("enableBooking", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableReviews">تفعيل المراجعات</Label>
                <p className="text-sm text-gray-500">
                  السماح للمستخدمين بكتابة المراجعات
                </p>
              </div>
              <Checkbox
                id="enableReviews"
                checked={settings.enableReviews}
                onCheckedChange={(checked) =>
                  handleInputChange("enableReviews", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              إعدادات النظام
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableNotifications">تفعيل الإشعارات</Label>
                <p className="text-sm text-gray-500">
                  إرسال إشعارات للمستخدمين
                </p>
              </div>
              <Checkbox
                id="enableNotifications"
                checked={settings.enableNotifications}
                onCheckedChange={(checked) =>
                  handleInputChange("enableNotifications", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenanceMode">وضع الصيانة</Label>
                <p className="text-sm text-gray-500">
                  تعطيل الموقع مؤقتاً للصيانة
                </p>
              </div>
              <Checkbox
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) =>
                  handleInputChange("maintenanceMode", checked)
                }
              />
            </div>
            {settings.maintenanceMode && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    تحذير: وضع الصيانة مفعل
                  </span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  الموقع غير متاح للمستخدمين حالياً
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                حفظ التغييرات
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                تأكد من حفظ إعداداتك قبل المغادرة
              </p>
            </div>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              حفظ الإعدادات
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
