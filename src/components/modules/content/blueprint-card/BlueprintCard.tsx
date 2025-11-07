import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  FileText,
  Calendar,
  User,
  Download,
  Eye,
} from "lucide-react";

// New interface matching API data structure
interface ApiBlueprint {
  _id: string;
  title: string;
  description: string;
  category_id: {
    _id: string;
    name: string;
    slug: string;
    description: string;
  };
  file_id: {
    _id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  };
  price: number;
  status: string;
  createdBy: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface BlueprintCardProps {
  blueprint: ApiBlueprint;
  onViewDetails: (blueprint: ApiBlueprint) => void;
  onAddToCart: (blueprint: ApiBlueprint) => void;
}

const getFileTypeIcon = (fileType: string) => {
  switch (fileType.toUpperCase()) {
    case "RVT":
    case "DWG":
    case "DXF":
      return <FileText className="w-4 h-4" />;
    default:
      return <Download className="w-4 h-4" />;
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "approved":
      return "Đã duyệt";
    case "pending":
      return "Chờ duyệt";
    case "rejected":
      return "Từ chối";
    default:
      return "Không xác định";
  }
};

export function BlueprintCard({
  blueprint,
  onViewDetails,
  onAddToCart,
}: BlueprintCardProps) {
  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-200 hover:shadow-md border-gray-200/80">
      {/* Header với status và category */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between gap-2 mb-3">
          <Badge
            variant="outline"
            className={`text-xs ${getStatusColor(blueprint.status)}`}
          >
            {getStatusText(blueprint.status)}
          </Badge>
          <Badge
            variant="secondary"
            className="text-xs bg-gray-100 text-gray-700"
          >
            {blueprint.category_id.name}
          </Badge>
        </div>

        <h3 className="font-medium text-gray-900 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {blueprint.title}
        </h3>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
          {blueprint.description}
        </p>

        {/* File Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {getFileTypeIcon(blueprint.file_id.type)}
            <span className="font-mono">{blueprint.file_id.name}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="uppercase font-medium bg-gray-50 px-2 py-1 rounded">
              {blueprint.file_id.type}
            </span>
            <span>{formatFileSize(blueprint.file_id.size)}</span>
          </div>
        </div>

        {/* Meta info */}
        <div className="space-y-1.5 pt-2 border-t border-gray-50">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <User className="w-3 h-3" />
            <span>{blueprint.createdBy.username}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(blueprint.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900 tabular-nums">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(blueprint.price)}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(blueprint);
              }}
              className="h-8 px-3 text-xs border-gray-200 hover:border-gray-300"
            >
              <Eye className="w-3 h-3 mr-1" />
              Xem
            </Button>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(blueprint);
              }}
              className="h-8 px-3 text-xs bg-gray-900 hover:bg-gray-800"
            >
              <ShoppingCart className="w-3 h-3 mr-1" />
              Mua
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
