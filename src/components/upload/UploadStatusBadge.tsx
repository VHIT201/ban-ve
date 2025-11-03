import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FileStatus } from '@/types/upload';

interface UploadStatusBadgeProps {
  status: FileStatus;
  className?: string;
}

export function UploadStatusBadge({ status, className }: UploadStatusBadgeProps) {
  const statusConfig = {
    pending: {
      text: 'Đang chờ duyệt',
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-800',
    },
    approved: {
      text: 'Đã được duyệt',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800',
    },
    rejected: {
      text: 'Đã từ chối',
      icon: XCircle,
      color: 'bg-red-100 text-red-800',
    },
  };

  const { text, icon: Icon, color } = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        color,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {text}
    </span>
  );
}
