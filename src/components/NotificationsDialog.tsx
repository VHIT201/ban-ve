import { useState } from 'react';
import { Bell, Check, X, BellRing, CheckCircle2, AlertCircle, Info, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface NotificationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationsDialog({ open, onOpenChange }: NotificationsDialogProps) {
  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Đơn hàng đã đặt thành công',
      message: 'Đơn hàng #ORD-2023-001 của bạn đã được đặt thành công. Vui lòng kiểm tra email để xem chi tiết.',
      time: '5 phút trước',
      read: false,
      type: 'success'
    },
    {
      id: '2',
      title: 'Khuyến mãi đặc biệt',
      message: 'Giảm giá 20% cho tất cả các gói thiết kế trong tuần này. Áp dụng đến hết ngày 30/11/2023.',
      time: '2 giờ trước',
      read: true,
      type: 'info'
    },
    {
      id: '3',
      title: 'Đánh giá sản phẩm',
      message: 'Bạn có muốn đánh giá sản phẩm vừa mua? Chia sẻ ý kiến của bạn để chúng tôi phục vụ tốt hơn.',
      time: '1 ngày trước',
      read: true,
      type: 'warning'
    },
    {
      id: '4',
      title: 'Hệ thống bảo trì',
      message: 'Hệ thống sẽ bảo trì từ 2h đến 4h sáng ngày mai. Xin lỗi vì sự bất tiện này.',
      time: '3 ngày trước',
      read: true,
      type: 'error'
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif: Notification) => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(noti => ({
        ...noti,
        read: true
      }))
    );
  };

  const unreadCount = notifications.filter((n: Notification) => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    const iconClass = 'h-5 w-5';
    switch (type) {
      case 'success':
        return <CheckCircle2 className={`${iconClass} text-green-500`} />;
      case 'warning':
        return <AlertCircle className={`${iconClass} text-amber-500`} />;
      case 'error':
        return <XCircle className={`${iconClass} text-red-500`} />;
      case 'info':
      default:
        return <Info className={`${iconClass} text-blue-500`} />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-[90vw] max-h-[90vh] overflow-hidden p-0">
        <div className="border-b px-6 py-4">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <BellRing className="h-5 w-5" />
                </div>
                <span className="text-xl font-semibold">Thông báo</span>
                {unreadCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                    {unreadCount} mới
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-primary hover:bg-primary/10"
                  onClick={markAllAsRead}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Đánh dấu đã đọc
                </Button>
              )}
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="divide-y max-h-[calc(100vh-180px)] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <Bell className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-foreground font-medium text-lg mb-1">Không có thông báo</h3>
              <p className="text-muted-foreground text-sm">Chúng tôi sẽ thông báo khi có thông tin mới</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-muted/50'}`}
                onClick={() => {
                  if (!notification.read) {
                    markAsRead(notification.id);
                  }
                }}
              >
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className={`font-medium text-sm ${!notification.read ? 'text-foreground' : 'text-foreground/80'}`}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notification.time}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-muted-foreground hover:text-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                        >
                          {notification.read ? (
                            <X className="h-3.5 w-3.5" />
                          ) : (
                            <Check className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    {!notification.read && (
                      <div className="mt-2 inline-flex items-center text-xs text-blue-600">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
                        Mới
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
