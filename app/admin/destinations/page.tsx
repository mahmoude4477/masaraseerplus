"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { mockDestinations, type Destination } from "@/lib/data";

export default function DestinationsManagement() {
  const [destinations, setDestinations] =
    useState<Destination[]>(mockDestinations);
  const [isAddingDestination, setIsAddingDestination] = useState(false);
  const [editingDestination, setEditingDestination] = useState<number | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    category: "",
    image: "/placeholder.svg?height=200&width=300",
    childFriendly: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingDestination) {
      // Edit existing destination
      setDestinations(
        destinations.map((dest) =>
          dest.id === editingDestination ? { ...dest, ...formData } : dest
        )
      );
      toast.success("تم تحديث الوجهة بنجاح");
      setEditingDestination(null);
    } else {
      // Add new destination
      const newDestination = {
        id: destinations.length + 1,
        ...formData,
        rating: 4.5,
        status: "نشط",
      };
      setDestinations([...destinations, newDestination]);
      toast.success("تم إضافة الوجهة بنجاح");
      setIsAddingDestination(false);
    }

    // Reset form
    setFormData({
      name: "",
      description: "",
      location: "",
      category: "",
      image: "/placeholder.svg?height=200&width=300",
      childFriendly: true,
    });
  };

  const handleEdit = (destination: Destination) => {
    setFormData({
      name: destination.name,
      description: destination.description,
      location: destination.location,
      category: destination.category,
      image: destination.image,
      childFriendly: destination.childFriendly,
    });
    setEditingDestination(destination.id);
    setIsAddingDestination(true);
  };

  const handleDelete = (id: number) => {
    setDestinations(destinations.filter((dest) => dest.id !== id));
    toast.success("تم حذف الوجهة بنجاح");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "نشط":
        return "bg-green-100 text-green-800";
      case "قيد التطوير":
        return "bg-yellow-100 text-yellow-800";
      case "مغلق":
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
            إدارة الوجهات
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            إدارة وإضافة الوجهات السياحية في المنطقة
          </p>
        </div>
        <Button
          onClick={() => setIsAddingDestination(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          إضافة وجهة جديدة
        </Button>
      </div>

      {/* Add/Edit Destination Form */}
      {isAddingDestination && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingDestination ? "تعديل الوجهة" : "إضافة وجهة جديدة"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">اسم الوجهة</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="أدخل اسم الوجهة"
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
                    placeholder="أدخل موقع الوجهة"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="category">الفئة</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="مثال: منتزه طبيعي، تراث، ترفيه"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">وصف الوجهة</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="أدخل وصف مفصل للوجهة"
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
                  {editingDestination ? "تحديث الوجهة" : "إضافة الوجهة"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddingDestination(false);
                    setEditingDestination(null);
                    setFormData({
                      name: "",
                      description: "",
                      location: "",
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

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <Card key={destination.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover"
              />
              <Badge
                className={`absolute top-2 right-2 ${getStatusColor(
                  destination.status
                )}`}
              >
                {destination.status}
              </Badge>
              {destination.childFriendly && (
                <Badge className="absolute top-2 left-2 bg-green-100 text-green-800">
                  مناسب للأطفال
                </Badge>
              )}
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{destination.rating}</span>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                {destination.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                {destination.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 ml-1" />
                  {destination.location}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {destination.category}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(destination)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 ml-1" />
                  تعديل
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(destination.id)}
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
      {destinations.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              لا توجد وجهات
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              ابدأ بإضافة أول وجهة سياحية
            </p>
            <Button onClick={() => setIsAddingDestination(true)}>
              <Plus className="w-4 h-4 ml-2" />
              إضافة وجهة جديدة
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
