"use client";

import { Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { useGetApiNotificationsUnreadCount, useGetApiNotifications } from "@/api/endpoints/notifications";
import type { NotificationUnreadCountResponse, NotificationsResponse } from "@/api/models/notificationTypes";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const HeaderNotifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    data: unreadCount,
    isLoading: isLoadingCount,
    error: countError,
  } = useGetApiNotificationsUnreadCount<NotificationUnreadCountResponse>({
    query: {
      refetchInterval: 30000, // Refetch every 30 seconds
      refetchOnWindowFocus: true,
    },
  });

  const {
    data: notifications,
    isLoading: isLoadingNotifications,
    error: notificationsError,
  } = useGetApiNotifications<NotificationsResponse>(
    { limit: 5 }, // params
    {
      query: {
        // enabled: isOpen, // Bỏ điều kiện để luôn gọi API
      },
    }
  );

  const unreadCountValue = unreadCount?.data?.unreadCount || 0;

  // Debug notifications data
  useEffect(() => {
    if (notifications?.data) {
      console.log('Notifications data:', notifications);
    }
  }, [notifications]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-muted/20 transition-colors duration-200"
        >
          <Bell className="w-5 h-5" />
          {unreadCountValue > 0 && (
            <span className="absolute -top-1 -right-1 bg-destructive text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {unreadCountValue > 99 ? "99+" : unreadCountValue}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Thông báo</span>
          {isLoadingCount ? (
            <Skeleton className="h-4 w-8" />
          ) : (
            <span className="text-sm text-muted-foreground">
              {unreadCountValue > 0 ? `${unreadCountValue} chưa đọc` : "Không có thông báo mới"}
            </span>
          )}
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <ScrollArea className="h-96">
          {isLoadingNotifications ? (
            <div className="p-4 space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              ))}
            </div>
          ) : notificationsError ? (
            <div className="p-4 text-center text-red-500">
              Không thể tải thông báo
            </div>
          ) : !Array.isArray(notifications?.data?.notifications) || notifications?.data?.notifications?.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              Bạn không có thông báo nào
            </div>
          ) : (
            <div className="space-y-1">
              {Array.isArray(notifications?.data?.notifications) ? notifications?.data?.notifications?.map((notification, index) => (
             <DropdownMenuItem
  key={notification.id || `notification-${index}`}
  className="
    p-4 cursor-pointer flex flex-col items-start space-y-1
      transition-colors duration-150
      hover:bg-muted/20
      focus:bg-muted/20
      data-[highlighted]:bg-muted/10
    "
  >
                  <div className="flex items-start space-x-2 w-full">
                    <div className="flex-1">
                      <p className={cn(
                        "text-sm font-medium",
                        !notification.isRead && "text-primary"
                      )}>
                        {notification.title || "Thông báo mới"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(notification.createdAt).toLocaleDateString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                </DropdownMenuItem>
              )) : (
                <div className="p-4 text-center text-muted-foreground">
                  Dữ liệu thông báo không đúng định dạng
                </div>
              )}
            </div>
          )}
        </ScrollArea>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="cursor-pointer justify-center hover:bg-muted/20 transition-colors duration-150"
          onClick={() => {
            // TODO: Navigate to notifications page when it exists
            console.log("Navigate to notifications page");
          }}
        >
          Xem tất cả thông báo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderNotifications;
