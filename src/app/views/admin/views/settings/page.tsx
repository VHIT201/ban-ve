"use client";

import { User, Mail, Phone, MapPin, Calendar, Edit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

type ProfileData = {
  fullName: string;
  email: string;
  phone: string;
  birthday: string;
};

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0987 654 321",
    birthday: "1990-01-01",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Đã lưu thông tin:", profile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset về giá trị ban đầu
    setProfile({
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0987 654 321",
      birthday: "1990-01-01",
    });
    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Hồ sơ cá nhân</h1>
          <p className="text-gray-500">Quản lý thông tin cá nhân của bạn</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Chỉnh sửa
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Họ và tên
                </Label>
                {isEditing ? (
                  <Input
                    id="fullName"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="p-2 border rounded">{profile.fullName}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="p-2 border rounded">{profile.email}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Số điện thoại
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="p-2 border rounded">{profile.phone}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthday" className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Ngày sinh
                </Label>
                {isEditing ? (
                  <Input
                    id="birthday"
                    type="date"
                    name="birthday"
                    value={profile.birthday}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="p-2 border rounded">
                    {new Date(profile.birthday).toLocaleDateString("vi-VN")}
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4 pt-4 border-t mt-6">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Hủy
                </Button>
                <Button type="button" onClick={handleSave}>
                  Lưu thay đổi
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SettingsPage() {
  return <ProfilePage />;
}
