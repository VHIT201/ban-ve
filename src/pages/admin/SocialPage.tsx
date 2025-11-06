import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Save, 
  Loader2,
  Link2,
  Globe,
  Linkedin,
  Share2,
  Settings,
  Twitter,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';

// Custom Icons
const Tiktok = (props: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={props.className || 'h-5 w-5'}
  >
    <path d="M16 8a6 6 0 0 1-6 6v-6h6Z" />
    <path d="M10 8v8a4 4 0 0 0 4-4v-4h4V8h-8Z" />
  </svg>
);

const SocialIcon = ({ platform, className = '' }: { platform: string; className?: string }) => {
  const Icon = {
    facebook: Facebook,
    instagram: Instagram,
    tiktok: Tiktok,
    youtube: Youtube,
    website: Globe,
    linkedin: Linkedin,
    twitter: Twitter,
    phone: Phone,
    email: Mail,
    address: MapPin,
    hours: Clock
  }[platform] || Globe;
  
  return <Icon className={`h-5 w-5 ${className}`} />;
};

type SocialLink = {
  id: string;
  name: string;
  icon: string;
  placeholder: string;
  value: string;
  category: 'social' | 'contact';
};

type ShareSetting = {
  platform: string;
  icon: string;
  enabled: boolean;
};

type BusinessInfo = {
  phone: string;
  email: string;
  address: string;
  workingHours: string;
};

export function SocialPage() {
  const [activeTab, setActiveTab] = useState('social');
  const [isLoading, setIsLoading] = useState(false);
  
  // Social Media Links
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: 'facebook',
      placeholder: 'https://facebook.com/trang-cua-ban',
      value: '',
      category: 'social'
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: 'instagram',
      placeholder: 'https://instagram.com/trang-cua-ban',
      value: '',
      category: 'social'
    },
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      icon: 'tiktok',
      placeholder: 'https://tiktok.com/@tai-khoan',
      value: '',
      category: 'social'
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      icon: 'youtube',
      placeholder: 'https://youtube.com/@kenh-cua-ban',
      value: '',
      category: 'social'
    },
    { 
      id: 'website', 
      name: 'Website', 
      icon: 'website',
      placeholder: 'https://trang-web-cua-ban.com',
      value: '',
      category: 'contact'
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      icon: 'linkedin',
      placeholder: 'https://linkedin.com/company/ten-cong-ty',
      value: '',
      category: 'social'
    },
    {
      id: 'phone',
      name: 'Số điện thoại',
      icon: 'phone',
      placeholder: '0987654321',
      value: '',
      category: 'contact'
    },
    {
      id: 'email',
      name: 'Email',
      icon: 'email',
      placeholder: 'contact@example.com',
      value: '',
      category: 'contact'
    },
    {
      id: 'address',
      name: 'Địa chỉ',
      icon: 'address',
      placeholder: 'Số nhà, đường, quận, thành phố',
      value: '',
      category: 'contact'
    },
    {
      id: 'workingHours',
      name: 'Giờ làm việc',
      icon: 'hours',
      placeholder: 'Thứ 2 - Thứ 6: 8:00 - 17:00',
      value: '',
      category: 'contact'
    }
  ]);

  const [shareSettings, setShareSettings] = useState({
    enabled: true,
    platforms: [
      { platform: 'Facebook', icon: 'facebook', enabled: true },
      { platform: 'Twitter', icon: 'twitter', enabled: true },
      { platform: 'LinkedIn', icon: 'linkedin', enabled: true },
      { platform: 'Instagram', icon: 'instagram', enabled: true },
      { platform: 'Zalo', icon: 'message-circle', enabled: true },
      { platform: 'Email', icon: 'mail', enabled: true }
    ]
  });

  const handleInputChange = (id: string, value: string) => {
    setSocialLinks(prev => 
      prev.map(link => 
        link.id === id ? { ...link, value } : link
      )
    );
  };

  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Cập nhật thông tin:', { 
        socialLinks,
        shareSettings
      });
      setIsLoading(false);
      // Thêm thông báo thành công ở đây nếu cần
    }, 1000);
  };

  const toggleShareSetting = (platform: string) => {
    setShareSettings(prev => ({
      ...prev,
      platforms: prev.platforms.map(setting => 
        setting.platform === platform 
          ? { ...setting, enabled: !setting.enabled } 
          : setting
      )
    }));
  };

  const toggleShareSettings = (enabled: boolean) => {
    setShareSettings(prev => ({
      ...prev,
      enabled
    }));
  };

  const handleSocialLinkChange = (id: string, value: string) => {
    setSocialLinks(prev => 
      prev.map(link => 
        link.id === id ? { ...link, value } : link
      )
    );
  };

  const filteredLinks = socialLinks.filter(link => 
    activeTab === 'social' 
      ? link.category === 'social' 
      : link.category === 'contact'
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Thiết lập liên kết</h1>
            <p className="text-sm text-muted-foreground">Quản lý thông tin liên hệ và mạng xã hội của bạn</p>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={isLoading} 
            className="gap-2 bg-primary hover:bg-primary/90 transition-colors h-10 px-4 py-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Đang lưu...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Lưu thay đổi</span>
              </>
            )}
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full border-b">
          <TabsList className="grid w-full grid-cols-2 max-w-xs bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="social" 
              className="relative py-3 px-4 flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Share2 className="h-4 w-4" />
              <span>Mạng xã hội</span>
            </TabsTrigger>
            <TabsTrigger 
              value="contact" 
              className="relative py-3 px-4 flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Liên hệ</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Social Media Tab */}
      {activeTab === 'social' && (
        <Card className="border-border/50 overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Liên kết mạng xã hội</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${shareSettings.enabled ? 'text-primary' : 'text-muted-foreground'}`}>
                  {shareSettings.enabled ? 'Đang bật' : 'Đang tắt'}
                </span>
                <Switch 
                  checked={shareSettings.enabled} 
                  onCheckedChange={toggleShareSettings} 
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
            <CardDescription className="pt-1">
              Thêm liên kết mạng xã hội của bạn để hiển thị trên trang web
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialLinks.map((link) => (
                  <div key={link.id} className="space-y-1.5">
                    <Label htmlFor={link.id} className="flex items-center gap-2 text-sm font-medium">
                      <SocialIcon platform={link.icon.toLowerCase()} className="h-4 w-4" />
                      {link.name}
                    </Label>
                    <div className="relative">
                      <Input
                        id={link.id}
                        placeholder={link.placeholder}
                        value={link.value}
                        onChange={(e) => handleSocialLinkChange(link.id, e.target.value)}
                        className="pl-10 focus-visible:ring-1 focus-visible:ring-primary/50 transition-all duration-200"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <SocialIcon platform={link.icon.toLowerCase()} className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Share Settings */}
              {shareSettings.enabled && (
                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-0.5">
                      <h3 className="font-medium">Nút chia sẻ</h3>
                      <p className="text-sm text-muted-foreground">
                        Chọn các nền tảng hiển thị nút chia sẻ
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {shareSettings.platforms.map((setting: ShareSetting) => (
                      <div 
                        key={setting.platform} 
                        className={`group relative overflow-hidden p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                          setting.enabled 
                            ? 'bg-primary/5 border-primary/20 hover:border-primary/40' 
                            : 'bg-card border-border/50 hover:border-border/70 hover:bg-muted/30'
                        }`}
                        onClick={() => toggleShareSetting(setting.platform)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div 
                              className={`p-2.5 rounded-xl transition-all duration-200 ${
                                setting.enabled 
                                  ? 'bg-primary/10 text-primary shadow-sm' 
                                  : 'bg-muted/50 text-muted-foreground group-hover:bg-muted/60'
                              }`}
                            >
                              <SocialIcon 
                                platform={setting.icon.toLowerCase()} 
                                className={`h-5 w-5 ${setting.enabled ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}
                              />
                            </div>
                            <div>
                              <p className={`text-sm font-medium ${
                                setting.enabled ? 'text-foreground' : 'text-foreground/80 group-hover:text-foreground'
                              }`}>
                                {setting.platform}
                              </p>
                              <p className={`text-xs mt-0.5 ${
                                setting.enabled 
                                  ? 'text-primary font-medium' 
                                  : 'text-muted-foreground group-hover:text-muted-foreground/90'
                              }`}>
                                {setting.enabled ? 'Đang bật' : 'Đang tắt'}
                              </p>
                            </div>
                          </div>
                          <div className={`w-10 h-6 flex items-center rounded-full p-0.5 transition-colors ${
                            setting.enabled 
                              ? 'bg-primary/90' 
                              : 'bg-muted group-hover:bg-muted/80'
                          }`}>
                            <div 
                              className={`bg-white h-5 w-5 rounded-full shadow-sm transform transition-transform duration-300 ${
                                setting.enabled 
                                  ? 'translate-x-[18px]' 
                                  : 'translate-x-0.5'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <Card className="border-border/50 overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-500/5 to-blue-600/10 pb-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg font-semibold">Thông tin liên hệ</CardTitle>
            </div>
            <CardDescription className="pt-1">
              Cập nhật thông tin liên hệ để khách hàng dễ dàng liên hệ với bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialLinks
                  .filter(link => link.category === 'contact')
                  .map((link) => (
                    <div key={link.id} className="space-y-1.5">
                      <Label htmlFor={link.id} className="flex items-center gap-2 text-sm font-medium">
                        <SocialIcon platform={link.icon.toLowerCase()} className="h-4 w-4" />
                        {link.name}
                      </Label>
                      <div className="relative">
                        <Input
                          id={link.id}
                          type={link.id === 'email' ? 'email' : 'text'}
                          placeholder={link.placeholder}
                          value={link.value}
                          onChange={(e) => handleSocialLinkChange(link.id, e.target.value)}
                          className="pl-10 focus-visible:ring-1 focus-visible:ring-primary/50 transition-all duration-200"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <SocialIcon platform={link.icon.toLowerCase()} className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 p-4 text-sm border border-primary/10 mt-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 p-1.5 rounded-lg bg-primary/10 text-primary flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb">
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
              <path d="M9 18h6"/>
              <path d="M10 22h4"/>
            </svg>
          </div>
          <div>
            <p className="font-medium text-foreground">Mẹo sử dụng</p>
            <p className="mt-1 text-foreground/90">
              {activeTab === 'social' 
                ? 'Nhập đầy đủ URL (bao gồm https://) để đảm bảo liên kết hoạt động chính xác.'
                : 'Điền đầy đủ thông tin liên hệ để khách hàng dễ dàng liên hệ với bạn.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
