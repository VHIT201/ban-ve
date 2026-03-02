"use client";

// Core
import { FC } from "react";
import { motion } from "framer-motion";

// App
import { cn } from "@/lib/utils";
import { NotificationItem } from "@/api/models/notificationTypes";
import { usePatchApiNotificationsIdRead } from "@/api/endpoints/notifications";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  notification: NotificationItem & {
    _id: string;
  };
}

const HeaderNotificationItem: FC<Props> = ({ notification }) => {
  // Mutations
  const markAsReadMutation = usePatchApiNotificationsIdRead();

  // Methods
  const handleMarkAsRead = async () => {
    try {
      await markAsReadMutation.mutateAsync({
        id: notification._id as string,
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
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
      onClick={handleMarkAsRead}
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
