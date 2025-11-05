import { User, Mail, MapPin, Phone, Pencil, LogOut, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccountDialog({ open, onOpenChange }: AccountDialogProps) {
  // Mock user data - in a real app, this would come from your auth context
  const userData = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0987654321',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    avatar: '' // Empty to show default avatar
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <UserCircle className="h-6 w-6 text-primary" />
            <span>Thông tin tài khoản</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-muted/30 rounded-xl">
            <div className="relative">
              {userData.avatar ? (
                <div className="w-24 h-24 rounded-full bg-muted overflow-hidden">
                  <img 
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0i0IDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg4OCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTE4IDE4SDZhMiAyIDAgMCAxLTItMlY2YTIgMiAwIDAgMSAyLTJoMTJhMiAyIDAgMCAxIDIgMnYxMGEyIDIgMCAwIDEtMiAyWiIvPjxwYXRoIGQ9Ik0xNSAxMC41YTEuNSAxLjUgMCAxIDEtMyAwIDEuNSAxLjUgMCAwIDEgMyA2WiIvPjxwYXRoIGQ9Im04IDIxIC0yLTJhMTAgMTAgMCAxIDEgMTYgMGwtMiAyIi8+PC9zdmc+';
                    }}
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserCircle className="h-16 w-16 text-primary/50" />
                </div>
              )}
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute -right-2 -bottom-2 rounded-full w-8 h-8 shadow-sm"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <p className="text-muted-foreground text-sm">{userData.email}</p>
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="truncate">{userData.email}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Số điện thoại</p>
                    <p>{userData.phone}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">Địa chỉ</p>
                    <p className="break-words">{userData.address}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground mt-0.5">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full gap-2">
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
