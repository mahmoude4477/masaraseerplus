"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, MoreHorizontal, UserCheck, UserX } from "lucide-react";
import { toast } from "sonner";

// Fake data for users
const initialUsers = [
  {
    id: 1,
    name: "أحمد محمد علي",
    email: "ahmed.mohammed@email.com",
    phone: "+966501234567",
    joinDate: "2024-12-15",
    status: "نشط",
    role: "مستخدم",
    totalBookings: 5,
    lastActivity: "2025-01-30",
  },
  {
    id: 2,
    name: "فاطمة عبدالله",
    email: "fatima.abdullah@email.com",
    phone: "+966512345678",
    joinDate: "2024-11-20",
    status: "نشط",
    role: "مستخدم",
    totalBookings: 3,
    lastActivity: "2025-01-29",
  },
  {
    id: 3,
    name: "سعد العتيبي",
    email: "saad.alotaibi@email.com",
    phone: "+966523456789",
    joinDate: "2024-10-05",
    status: "معلق",
    role: "مستخدم",
    totalBookings: 0,
    lastActivity: "2025-01-15",
  },
  {
    id: 4,
    name: "نورا السعد",
    email: "nora.alsaad@email.com",
    phone: "+966534567890",
    joinDate: "2024-08-12",
    status: "نشط",
    role: "مدير محتوى",
    totalBookings: 8,
    lastActivity: "2025-01-31",
  },
  {
    id: 5,
    name: "خالد الغامدي",
    email: "khalid.alghamdi@email.com",
    phone: "+966545678901",
    joinDate: "2024-09-30",
    status: "نشط",
    role: "مستخدم",
    totalBookings: 12,
    lastActivity: "2025-01-28",
  },
];

export default function UsersManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("الكل");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "الكل" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    toast.success(
      `تم ${newStatus === "نشط" ? "تفعيل" : "تعليق"} المستخدم بنجاح`
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "نشط":
        return "bg-green-100 text-green-800";
      case "معلق":
        return "bg-red-100 text-red-800";
      case "غير مفعل":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "مدير":
        return "bg-purple-100 text-purple-800";
      case "مدير محتوى":
        return "bg-blue-100 text-blue-800";
      case "مستخدم":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: users.length.toString(),
      description: "مستخدم مسجل",
    },
    {
      title: "المستخدمين النشطين",
      value: users.filter((u) => u.status === "نشط").length.toString(),
      description: "مستخدم نشط",
    },
    {
      title: "المستخدمين الجدد",
      value: users
        .filter((u) => {
          const joinDate = new Date(u.joinDate);
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
          return joinDate > oneMonthAgo;
        })
        .length.toString(),
      description: "خلال الشهر الماضي",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          إدارة المستخدمين
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          إدارة حسابات المستخدمين وصلاحياتهم
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>قائمة المستخدمين</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث عن مستخدم..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="الكل">جميع الحالات</option>
                <option value="نشط">نشط</option>
                <option value="معلق">معلق</option>
                <option value="غير مفعل">غير مفعل</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">
                    المستخدم
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">
                    الدور
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">
                    الحالة
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">
                    الحجوزات
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">
                    تاريخ الانضمام
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">
                    آخر نشاط
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {user.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {user.totalBookings}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {new Date(user.joinDate).toLocaleDateString("ar-SA")}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {new Date(user.lastActivity).toLocaleDateString(
                          "ar-SA"
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        {user.status === "نشط" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(user.id, "معلق")}
                          >
                            <UserX className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(user.id, "نشط")}
                          >
                            <UserCheck className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                لا توجد نتائج
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                لم يتم العثور على مستخدمين يطابقون معايير البحث
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
