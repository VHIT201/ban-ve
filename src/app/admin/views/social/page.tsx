"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

type SocialLink = {
  platform: string;
  url: string;
};

export default function SocialPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: "facebook", url: "" },
    { platform: "twitter", url: "" },
    { platform: "linkedin", url: "" },
    { platform: "instagram", url: "" },
  ]);

  const handleInputChange = (index: number, value: string) => {
    const newLinks = [...socialLinks];
    newLinks[index].url = value;
    setSocialLinks(newLinks);
  };

  const handleSave = () => {
    console.log("Đã lưu liên kết mạng xã hội:", socialLinks);
    // Thêm logic lưu dữ liệu vào API ở đây
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "facebook":
        return "Facebook";
      case "twitter":
        return "Twitter";
      case "linkedin":
        return "LinkedIn";
      case "instagram":
        return "Instagram";
      default:
        return platform;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <span className="text-blue-600">f</span>;
      case "twitter":
        return <span className="text-blue-400">𝕏</span>;
      case "linkedin":
        return <span className="text-blue-700">in</span>;
      case "instagram":
        return <span className="text-pink-600">📷</span>;
      default:
        return <span>🔗</span>;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Mạng xã hội</h1>
          <p className="text-gray-500">Quản lý liên kết mạng xã hội của bạn</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liên kết mạng xã hội</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <div key={link.platform} className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center">
                      {getPlatformIcon(link.platform)}
                    </span>
                    {getPlatformName(link.platform)}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      placeholder={`https://${link.platform}.com/username`}
                      value={link.url}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSave}>Lưu thay đổi</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
