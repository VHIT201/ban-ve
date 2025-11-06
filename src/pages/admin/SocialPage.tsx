import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Share2, Facebook, Twitter, Instagram, Linkedin, Youtube, Save, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export function SocialPage() {
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const socialPlatforms = [
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: Facebook, 
      placeholder: 'https://facebook.com/username',
      value: socialLinks.facebook,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => 
        setSocialLinks({...socialLinks, facebook: e.target.value})
    },
    { 
      id: 'twitter', 
      name: 'Twitter', 
      icon: Twitter, 
      placeholder: 'https://twitter.com/username',
      value: socialLinks.twitter,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => 
        setSocialLinks({...socialLinks, twitter: e.target.value})
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: Instagram, 
      placeholder: 'https://instagram.com/username',
      value: socialLinks.instagram,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => 
        setSocialLinks({...socialLinks, instagram: e.target.value})
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      icon: Linkedin, 
      placeholder: 'https://linkedin.com/company/username',
      value: socialLinks.linkedin,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => 
        setSocialLinks({...socialLinks, linkedin: e.target.value})
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      icon: Youtube, 
      placeholder: 'https://youtube.com/username',
      value: socialLinks.youtube,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => 
        setSocialLinks({...socialLinks, youtube: e.target.value})
    },
  ];

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // TODO: Replace with actual API call
      console.log('Saving social links:', socialLinks);
      setIsLoading(false);
      // Show success message
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Mạng xã hội</h1>
        <p className="text-muted-foreground">
          Quản lý liên kết mạng xã hội và cài đặt chia sẻ
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Liên kết mạng xã hội</CardTitle>
                <CardDescription className="mt-1">
                  Thêm hoặc cập nhật liên kết mạng xã hội của bạn
                </CardDescription>
              </div>
              <Button 
                onClick={handleSave}
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Lưu thay đổi
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {socialPlatforms.map((platform) => (
                <div key={platform.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <platform.icon className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor={platform.id} className="text-sm font-medium">
                      {platform.name}
                    </Label>
                  </div>
                  <Input
                    id={platform.id}
                    placeholder={platform.placeholder}
                    value={platform.value}
                    onChange={platform.onChange}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cài đặt chia sẻ</CardTitle>
            <CardDescription className="mt-1">
              Tùy chỉnh cách hiển thị nút chia sẻ trên trang web
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="font-medium">Hiển thị nút chia sẻ</h3>
                  <p className="text-sm text-muted-foreground">
                    Hiển thị các nút chia sẻ mạng xã hội trên trang chi tiết bản vẽ
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Bật
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Mạng xã hội hiển thị</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Facebook', 'Twitter', 'LinkedIn', 'Pinterest', 'Reddit', 'Tumblr'].map((social) => (
                    <div key={social} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id={`share-${social.toLowerCase()}`} 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label 
                        htmlFor={`share-${social.toLowerCase()}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        {social}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  onClick={handleSave}
                  disabled={isLoading}
                  className="gap-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Lưu cài đặt
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SocialPage;
