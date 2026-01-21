"use client";

import { User, Mail, Phone, Calendar, Edit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetApiAuthMe,
  usePutApiAuthUpdateProfile,
} from "@/api/endpoints/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type UserProfile = {
  _id?: string;
  username: string;
  email: string;
  phone?: string;
  birthday?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};

type ProfileData = {
  username: string;
  email: string;
};

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    username: "",
    email: "",
  });

  const queryClient = useQueryClient();

  // Fetch user profile with proper error handling and logging
  const {
    data: userData,
    refetch: refetchProfile,
    isLoading,
    error: fetchError,
  } = useGetApiAuthMe({
    query: {
      onSuccess: (response: any) => {
        const user = response?.data;
        console.log("User data:", user);

        if (user && (user.username || user.email)) {
          setProfile({
            username: user.username || "",
            email: user.email || "",
          });
        } else {
          console.warn("No user data found in response");
          toast.warning("Không tìm thấy thông tin người dùng");
        }
      },
      onError: (error: Error) => {
        console.error("Lỗi khi tải thông tin người dùng:", error);
        toast.error("Không thể tải thông tin người dùng");
      },
      refetchOnWindowFocus: false,
    },
  });

  // Handle initial data load
  useEffect(() => {
    if (userData?.data) {
      const user = userData.data;
      setProfile({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [userData]);

  // Update profile mutation
  const { mutate: updateProfile, isPending: isUpdating } =
    usePutApiAuthUpdateProfile({
      mutation: {
        onSuccess: (response: any) => {
          toast.success("Cập nhật thông tin thành công");
          // Invalidate and refetch the user data
          queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
          refetchProfile();
          setIsEditing(false);
        },
        onError: (error: Error) => {
          console.error("Failed to update profile:", error);
          toast.error("Cập nhật thông tin thất bại");
        },
      },
    });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        data: {
          username: profile.username,
          email: profile.email,
        },
      });
      toast.success("Cập nhật thông tin thành công");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Có lỗi xảy ra khi cập nhật thông tin");
    }
  };

  const handleCancel = () => {
    // Reset to original data from API
    if (userData) {
      const user =
        (userData as any)?.data?.user || (userData as any)?.data || userData;
      setProfile({
        username: user.username || "",
        email: user.email || "",
      });
    }
    setIsEditing(false);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải thông tin người dùng...</p>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
            <div className="space-y-2">
              <Label htmlFor="username" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Tên đăng nhập
              </Label>
              {isEditing ? (
                <Input
                  id="username"
                  name="username"
                  value={profile.username}
                  onChange={handleInputChange}
                  placeholder="Nhập tên đăng nhập"
                  disabled={isUpdating}
                />
              ) : (
                <div className="p-2 border rounded bg-gray-50 min-h-[40px]">
                  {profile.username || (
                    <span className="text-gray-400">Chưa có thông tin</span>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Label>
              {isEditing ? (
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  placeholder="Nhập địa chỉ email"
                  disabled={isUpdating}
                />
              ) : (
                <div className="p-2 border rounded bg-gray-50 min-h-[40px]">
                  {profile.email || (
                    <span className="text-gray-400">
                      Chưa có thông tin email
                    </span>
                  )}
                </div>
              )}
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4 pt-4 border-t mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isUpdating}
                >
                  Hủy
                </Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Đang lưu..." : "Lưu thay đổi"}
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
