"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { mockEvents, type Event } from "@/lib/data";

export default function EventsManagement() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    category: "",
    image: "/placeholder.svg?height=200&width=300",
    childFriendly: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEvent) {
      // Edit existing event
      setEvents(
        events.map((event) =>
          event.id === editingEvent
            ? { ...event, ...formData, attendees: event.attendees }
            : event
        )
      );
      toast.success("تم تحديث الحدث بنجاح");
      setEditingEvent(null);
    } else {
      // Add new event
      const newEvent = {
        id: events.length + 1,
        ...formData,
        status: "نشط",
        attendees: 0,
      };
      setEvents([...events, newEvent]);
      toast.success("تم إضافة الحدث بنجاح");
      setIsAddingEvent(false);
    }

    // Reset form
    setFormData({
      name: "",
      description: "",
      location: "",
      date: "",
      category: "",
      image: "/placeholder.svg?height=200&width=300",
      childFriendly: true,
    });
  };

  const handleEdit = (event: Event) => {
    setFormData({
      name: event.name,
      description: event.description,
      location: event.location,
      date: event.date,
      category: event.category,
      image: event.image,
      childFriendly: event.childFriendly,
    });
    setEditingEvent(event.id);
    setIsAddingEvent(true);
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
    toast.success("تم حذف الحدث بنجاح");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "نشط":
        return "bg-green-100 text-green-800";
      case "قريباً":
        return "bg-yellow-100 text-yellow-800";
      case "منتهي":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            إدارة الأحداث
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            إدارة وإضافة الأحداث التي تظهر في صفحة الاستكشاف
          </p>
        </div>
        <Button
          onClick={() => setIsAddingEvent(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          إضافة حدث جديد
        </Button>
      </div>

      {/* Add/Edit Event Form */}
      {isAddingEvent && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingEvent ? "تعديل الحدث" : "إضافة حدث جديد"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">اسم الحدث</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="أدخل اسم الحدث"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">الموقع</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="أدخل موقع الحدث"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="date">تاريخ الحدث</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">الفئة</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="مثال: مهرجان، رحلة، تراث"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">وصف الحدث</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="أدخل وصف مفصل للحدث"
                  rows={3}
                  required
                />
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="childFriendly"
                  checked={formData.childFriendly}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, childFriendly: !!checked })
                  }
                />
                <Label
                  htmlFor="childFriendly"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  مناسب للأطفال
                </Label>
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingEvent ? "تحديث الحدث" : "إضافة الحدث"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddingEvent(false);
                    setEditingEvent(null);
                    setFormData({
                      name: "",
                      description: "",
                      location: "",
                      date: "",
                      category: "",
                      image: "/placeholder.svg?height=200&width=300",
                      childFriendly: true,
                    });
                  }}
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={event.image}
                alt={event.name}
                fill
                className="object-cover"
              />
              <Badge
                className={`absolute top-2 right-2 ${getStatusColor(
                  event.status
                )}`}
              >
                {event.status}
              </Badge>
              {event.childFriendly && (
                <Badge className="absolute top-2 left-2 bg-green-100 text-green-800">
                  مناسب للأطفال
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                {event.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                {event.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 ml-1" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 ml-1" />
                  {new Date(event.date).toLocaleDateString("ar-SA")}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 ml-1" />
                  {event.attendees} مشارك
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(event)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 ml-1" />
                  تعديل
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(event.id)}
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4 ml-1" />
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              لا توجد أحداث
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              ابدأ بإضافة أول حدث لك
            </p>
            <Button onClick={() => setIsAddingEvent(true)}>
              <Plus className="w-4 h-4 ml-2" />
              إضافة حدث جديد
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
