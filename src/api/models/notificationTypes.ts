export interface NotificationUnreadCountResponse {
  data: {
    unreadCount: number;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  content?: string;
  message?: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  message: string;
  message_en: string;
  data: {
    notifications: NotificationItem[];
    total: number;
    unreadCount: number;
  };
  status: string;
  timeStamp: string;
}
