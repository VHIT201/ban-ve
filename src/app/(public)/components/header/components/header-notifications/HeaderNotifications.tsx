"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import {
  useGetApiNotificationsUnreadCount,
  useGetApiNotifications,
} from "@/api/endpoints/notifications";
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
import { HeaderNotificationItem } from "./components";
import { useAuthStore } from "@/stores";
import { useShallow } from "zustand/shallow";

// Local type definitions since generated types are not available
interface NotificationData {
  _id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  contentId?: string;
  type?: string;
  metadata?: {
    requestId?: string;
    reason?: string;
    orderId?: string;
    orderCode?: string;
    amount?: number;
  };
}

interface UnreadCountResponse {
  data?: {
    unreadCount: number;
  };
}

interface NotificationsResponse {
  data?: {
    notifications: NotificationData[];
  };
}

const HeaderNotifications = () => {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [showAll, setShowAll] = useState(false);

  // Stores
  const authStore = useAuthStore(
    useShallow(({ isSignedIn }) => ({ isSignedIn })),
  );

  // Queries
  const { data: unreadCount, isLoading: isLoadingCount } =
    useGetApiNotificationsUnreadCount<UnreadCountResponse>({
      query: {
        refetchInterval: 60000,
        refetchOnWindowFocus: true,
        enabled: authStore.isSignedIn && isOpen,
      },
    });

  const {
    data: notifications,
    isLoading: isLoadingNotifications,
    error: notificationsError,
  } = useGetApiNotifications<NotificationsResponse>(
    { limit: showAll ? undefined : 5, isRead: activeTab === "unread" ? false : undefined }, // params
    {
      query: {
        enabled: isOpen,
      },
    },
  );

  // Memos
  const unreadCountValue = unreadCount?.data?.unreadCount || 0;

  // Template
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
          <span className="flex items-center gap-2">
            Thông báo
            {unreadCountValue > 0 && (
              <span className="bg-destructive text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                {unreadCountValue} chưa đọc
              </span>
            )}
          </span>
          {isLoadingCount ? (
            <Skeleton className="h-4 w-8" />
          ) : (
            <span className="text-sm text-muted-foreground">
              {unreadCountValue > 0
                ? `${unreadCountValue} chưa đọc`
                : "Không có thông báo mới"}
            </span>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />


        <div className="flex items-center gap-1 px-3 py-2">
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200",
              activeTab === "all"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            Tất cả
          </button>
          
          <button
            onClick={() => setActiveTab("unread")}
            className={cn(
              "px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 flex items-center gap-2",
              activeTab === "unread"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            Chưa đọc
            {unreadCountValue > 0 && activeTab !== "unread" && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] text-[11px] font-bold px-1 rounded-full bg-destructive text-white">
                {unreadCountValue > 99 ? "99+" : unreadCountValue}
              </span>
            )}
          </button>
        </div>

        <DropdownMenuSeparator />

        <ScrollArea className={cn("transition-all duration-300", showAll ? "h-[500px]" : "h-72")}>
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
          ) : !Array.isArray(notifications?.data?.notifications) ||
            notifications?.data?.notifications?.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              Bạn không có thông báo nào
            </div>
          ) : (
            <div className="space-y-1">
              {Array.isArray(notifications?.data?.notifications) ? (
                notifications?.data?.notifications?.map(
                  (notification: NotificationData, index: number) => (
                    <DropdownMenuItem
                      key={notification._id || `notification-${index}`}
                      className="
                        p-4 cursor-pointer flex flex-col items-start space-y-1
                          transition-colors duration-150
                          hover:bg-muted/20
                          focus:bg-muted/20
                          data-[highlighted]:bg-muted/10
                        "
                    >
                      <HeaderNotificationItem
                        notification={notification}
                      />
                    </DropdownMenuItem>
                  ),
                )
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Dữ liệu thông báo không đúng định dạng
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <DropdownMenuSeparator />

        <div
          className="cursor-pointer justify-center hover:bg-muted/20 transition-colors duration-150 text-sm font-medium py-3 flex items-center"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Thu gọn" : "Xem thông báo trước đó"}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderNotifications;
