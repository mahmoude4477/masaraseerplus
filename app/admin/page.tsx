"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Activity } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "إجمالي الأحداث",
    value: "24",
    description: "حدث نشط",
    icon: Calendar,
    href: "/admin/events",
  },
  {
    title: "التجارب",
    value: "18",
    description: "تجربة مسجلة",
    icon: Activity,
    href: "/admin/experiences",
  },
  {
    title: "المستخدمين",
    value: "1,247",
    description: "مستخدم مسجل",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "النشاط اليومي",
    value: "89",
    description: "زائر اليوم",
    icon: Activity,
    href: "/admin",
  },
];

const recentActivities = [
  {
    id: 1,
    action: "تم إضافة حدث جديد",
    description: "مهرجان الورود في الطائف",
    time: "منذ دقيقتين",
  },
  {
    id: 2,
    action: "تجربة جديدة مرسلة",
    description: "أحمد محمد أرسل تجربة عن منتزه السودة",
    time: "منذ 5 دقائق",
  },
  {
    id: 3,
    action: "تم الموافقة على تجربة",
    description: "تم الموافقة على تجربة في جبل بوليفارد",
    time: "منذ 10 دقائق",
  },
  {
    id: 4,
    action: "حجز جديد",
    description: "حجز رحلة إلى جبل بوليفارد",
    time: "منذ 15 دقيقة",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          لوحة التحكم
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          مرحباً بك في لوحة تحكم مسار بلس
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <Link href={stat.href}>
                  <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                    عرض التفاصيل
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>النشاطات الأخيرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 space-x-reverse"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/admin/events">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 ml-2" />
                  إضافة حدث جديد
                </Button>
              </Link>
              <Link href="/admin/experiences">
                <Button className="w-full justify-start" variant="outline">
                  <Activity className="w-4 h-4 ml-2" />
                  مراجعة التجارب
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 ml-2" />
                  إدارة المستخدمين
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button className="w-full justify-start" variant="outline">
                  <Activity className="w-4 h-4 ml-2" />
                  عرض التقارير
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
