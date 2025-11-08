import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  FileText,
  Calendar,
  User,
  Download,
  Eye,
  HeartIcon,
  EyeIcon,
} from "lucide-react";
import { FC } from "react";
import { Props } from "./lib/types";
import {
  formatDate,
  formatFileSize,
  getStatusColor,
  getStatusText,
} from "./lib/utils";
import { cn } from "@/utils/ui";

const BlueprintCard: FC<Props> = (props) => {
  const { blueprint, onViewDetails, onAddToCart } = props;

  return (
    <div
      className="group/container relative max-w-md rounded-xl bg-linear-to-r from-neutral-600 to-neutral-300 pt-0 shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/4458210/pexels-photo-4458210.jpeg)",
        objectFit: "cover",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="h-60 relative">
        <div
          onClick={() => onViewDetails(blueprint)}
          className="cursor-pointer group/view z-20 flex flex-col items-center justify-center opacity-0 group-hover/container:opacity-100 absolute left-1/2 top-1/2 -translate-1/2  rounded-full transition-opacity duration-300"
        >
          <EyeIcon
            className={cn(
              "size-8 stroke-white group-hover/view:scale-110 transition-transform duration-300"
            )}
          />
          <span className="text-white text-sm group-hover/view:scale-110 transition-transform duration-300">
            Xem chi tiết
          </span>
        </div>
      </div>
      <div className="opacity-0 group-hover/container:opacity-100 transition-opacity duration-300 absolute inset-0 bg-linear-to-b from-gray-400/50 to-gray-300/20 z-10" />
      <Badge className="absolute top-4 left-4 rounded-full z-20">
        Xây dựng
      </Badge>

      <Button
        size="icon"
        className="z-20 opacity-0 group-hover/container:opacity-100 bg-primary/10 hover:bg-primary/20 absolute top-4 right-4 rounded-full transition-opacity duration-300"
      >
        <HeartIcon className={cn("size-4 stroke-white")} />
        <span className="sr-only">Like</span>
      </Button>
      <Card className="border-none relative z-20">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl line-clamp-1">
            {blueprint.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="line-clamp-2 h-12">
          {blueprint.description}
        </CardContent>
        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(blueprint.price)}
            </span>
          </div>
          <Button size="lg">Thêm vào giỏ</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BlueprintCard;
