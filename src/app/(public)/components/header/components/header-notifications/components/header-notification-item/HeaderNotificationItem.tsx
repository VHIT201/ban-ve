"use client";

// Core
import { FC } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// App
import { cn } from "@/lib/utils";
import { usePatchApiNotificationsIdRead } from "@/api/endpoints/notifications";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { useProfileStore } from "@/stores";

interface NotificationItem {
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

interface Props {
  notification: NotificationItem;
}

const HeaderNotificationItem: FC<Props> = ({ notification }) => {
  // Hooks
  const router = useRouter();
  const queryClient = useQueryClient();
  const { role } = useProfileStore();
  
  // Mutations
  const markAsReadMutation = usePatchApiNotificationsIdRead();

  // Methods
  const getNotificationRedirectUrl = (notification: NotificationItem): string => {
    switch (notification.type) {
      case "COLLABORATOR":
        // Kiểm tra role để chuyển đến trang phù hợp
        if (role === "admin") {
          return "/admin/collaborators/list";
        } else {
          return "/profile/collaborator";
        }
      
      case "PAYMENT":
        // Chuyển đến trang chi tiết đơn hàng
        const orderId = notification.metadata?.orderId;
        return `/profile/order/detail/${orderId}`;
      case "COPYRIGHT":
        return "/profile/collaborator#contents";
      default:
        // Mặc định chuyển đến trang thông báo
        return "/notifications";
    }
  };

  const handleClick = async () => {
    // Mark as read
    if (!notification.isRead) {
      try {
        console.log("Notification data:", notification);
        console.log("Notification ID:", notification._id);
        await markAsReadMutation.mutateAsync({
          id: notification._id as string,
        });
        
        // Invalidate queries to refresh data
        queryClient.invalidateQueries({
          queryKey: ['/api/notifications'],
        });
        queryClient.invalidateQueries({
          queryKey: ['/api/notifications/unread-count'],
        });
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    }

    // Chuyển trang sau khi xử lý
    const redirectUrl = getNotificationRedirectUrl(notification);
    
    // Dùng window.location.href để tránh double path issue
    window.location.href = redirectUrl;
  };

  if (markAsReadMutation.isPending) {
    return (
      <div className="flex items-start space-x-2 w-full rounded-md px-2 py-2">
        <Skeleton className="w-full h-16" />
      </div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      whileHover={{ x: 2 }}
      className="flex items-start space-x-2 w-full rounded-md px-2 py-2 transition-colors hover:bg-muted/50 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex-1">
        <p
          className={cn(
            "text-sm font-medium transition-colors",
            !notification.isRead && "text-primary",
          )}
        >
          {notification.title || "Thông báo mới"}
        </p>

        <p className="text-xs text-muted-foreground mt-1">
          {notification.message}
        </p>

        <p className="text-xs text-muted-foreground mt-2">
          {new Date(notification.createdAt).toLocaleDateString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {!notification.isRead && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"
        />
      )}
    </motion.div>
  );
};

export default HeaderNotificationItem;

