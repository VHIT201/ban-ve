"use client";

import { ContentResponse } from "@/api/types/content";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Lens } from "@/components/ui/lens";
import { formatFileSize } from "@/utils/file";
import {
  Edit,
  Trash2,
  Eye,
  EyeOff,
  FileType,
  Grid3x3,
  FolderOpen,
  Calendar,
  Clock,
  Download,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Package,
} from "lucide-react";
import { FC, Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import baseConfig from "@/configs/base";
import { Separator } from "@/components/ui/separator";
import { ImageProtection } from "@/components/shared";
import { motion, easeOut, easeInOut } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { BASE_PATHS } from "@/constants/paths";

interface Props {
  content: ContentResponse;
}

const AdminContentDetailView: FC<Props> = ({ content }) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    router.push(
      BASE_PATHS.admin.contents.edit.path.replace(":id", content._id),
    );
  };

  const handleDelete = async () => {
    if (!confirm("Bạn có chắc chắn muốn xóa nội dung này?")) return;

    setIsDeleting(true);
    try {
      // TODO: Implement delete API call
      toast.success("Đã xóa nội dung thành công");
      router.push("/admin/contents");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa nội dung");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleVisibility = async () => {
    try {
      // TODO: Implement toggle visibility API call
      const isActive = (content as any).is_active;
      toast.success(isActive ? "Đã ẩn nội dung" : "Đã hiển thị nội dung");
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  const imageList =
    content?.images?.map((img) => `${baseConfig.mediaDomain}/${img}`) || [];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: easeInOut,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const infoItems = [
    {
      icon: Package,
      label: "Loại file",
      value: "Vector",
    },
    {
      icon: FileType,
      label: "Kích thước",
      value: content.file_id?.size
        ? formatFileSize(content.file_id.size)
        : "N/A",
    },
    {
      icon: Grid3x3,
      label: "Định dạng",
      value: "AI, PDF, PNG",
    },
    {
      icon: FolderOpen,
      label: "Danh mục",
      value:
        typeof content.category_id === "object" &&
        content.category_id !== null &&
        "name" in content.category_id &&
        typeof (content.category_id as { name?: unknown }).name === "string"
          ? (content.category_id as { name: string }).name
          : "N/A",
    },
  ];

  const statsItems = [
    {
      icon: Eye,
      label: "Lượt xem",
      value: (content as any).view_count || 0,
      color: "text-blue-500",
    },
    {
      icon: Download,
      label: "Lượt tải",
      value: (content as any).download_count || 0,
      color: "text-green-500",
    },
    {
      icon: TrendingUp,
      label: "Doanh thu",
      value: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format((content as any).revenue || 0),
      color: "text-purple-500",
    },
  ];

  const getStatusBadge = () => {
    const isActive = (content as any).is_active;
    if (isActive) {
      return (
        <Badge
          variant="default"
          className="bg-green-500/10 text-green-600 border-green-500/20"
        >
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Đang hiển thị
        </Badge>
      );
    }
    return (
      <Badge
        variant="secondary"
        className="bg-gray-500/10 text-gray-600 border-gray-500/20"
      >
        <XCircle className="w-3 h-3 mr-1" />
        Đã ẩn
      </Badge>
    );
  };

  return (
    <Fragment>
      <ImageProtection>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Image Gallery */}
          <motion.div
            className="lg:col-span-3 space-y-4"
            variants={itemVariants}
          >
            {/* Main Image */}
            <motion.div
              className="bg-card border  overflow-hidden shadow-xl"
              variants={imageVariants}
              layoutId={`image-${selectedImage}`}
            >
              <Lens
                zoomFactor={2}
                lensSize={150}
                isStatic={false}
                ariaLabel="Zoom Area"
              >
                <motion.img
                  key={selectedImage}
                  src={imageList[selectedImage] || "/placeholder.png"}
                  alt={content.title}
                  className="w-full h-[300px] sm:h-[400px] lg:h-[550px] object-contain bg-muted/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Lens>
            </motion.div>

            {/* Thumbnail Gallery */}
            {imageList.length > 1 && (
              <motion.div variants={itemVariants}>
                <Carousel
                  opts={{
                    align: "start",
                    loop: false,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2">
                    {imageList.map((image, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-2 basis-1/4 md:basis-1/5"
                      >
                        <motion.button
                          onClick={() => setSelectedImage(index)}
                          className={`aspect-square bg-card  overflow-hidden border transition-all duration-300 w-full ${
                            selectedImage === index
                              ? "border-primary ring-2 ring-primary/20 shadow-lg"
                              : "border-border hover:border-primary/50 opacity-60 hover:opacity-100"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                            draggable="false"
                            onContextMenu={(e) => e.preventDefault()}
                          />
                        </motion.button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {imageList.length > 5 && (
                    <>
                      <CarouselPrevious className="-left-3 size-8" />
                      <CarouselNext className="-right-3 size-8" />
                    </>
                  )}
                </Carousel>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Product Info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={itemVariants}
          >
            <div className="bg-card/80 backdrop-blur-sm border  p-6 sm:p-8 shadow-xl space-y-6 h-fit">
              {/* Header with Status */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <motion.h1
                    className="text-2xl sm:text-3xl font-bold text-foreground leading-tight flex-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {content.title}
                  </motion.h1>
                </div>

                <div className="flex items-center gap-2">
                  {getStatusBadge()}
                </div>
              </div>

              {/* Price */}
              <motion.div
                className="pb-6 border-b"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="text-3xl sm:text-4xl font-bold bg-linear-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                  {content.price
                    ? new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(content.price)
                    : "Miễn phí"}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  Mô tả
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {content.description || "Không có mô tả cho sản phẩm này."}
                </p>
              </motion.div>

              <Separator />

              {/* Quick Info Grid */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h3 className="text-sm font-semibold text-foreground">
                  Thông tin file
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {infoItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        className="p-3 bg-muted/30  hover:bg-muted/50 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="size-4 text-muted-foreground" />
                          <div className="text-xs text-muted-foreground uppercase tracking-wider">
                            {item.label}
                          </div>
                        </div>
                        <div className="font-medium text-foreground text-sm">
                          {item.value}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <Separator />

              {/* Metadata */}
              <motion.div
                className="space-y-3 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <h3 className="text-sm font-semibold text-foreground">
                  Thông tin khác
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>Ngày tạo:</span>
                    <span className="font-medium text-foreground ml-auto">
                      {content.createdAt
                        ? format(
                            new Date(content.createdAt),
                            "dd/MM/yyyy HH:mm",
                            { locale: vi },
                          )
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4" />
                    <span>Cập nhật:</span>
                    <span className="font-medium text-foreground ml-auto">
                      {content.updatedAt
                        ? format(
                            new Date(content.updatedAt),
                            "dd/MM/yyyy HH:mm",
                            { locale: vi },
                          )
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </motion.div>

              <Separator />

              {/* Admin Actions */}
              <motion.div
                className="space-y-3 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <h3 className="text-sm font-semibold text-foreground">
                  Hành động
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      size="lg"
                      className="w-full h-11 font-semibold"
                      onClick={handleEdit}
                      variant="default"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Chỉnh sửa nội dung
                    </Button>
                  </motion.div>

                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      size="lg"
                      variant="destructive"
                      className="w-full h-11 font-semibold"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {isDeleting ? "Đang xóa..." : "Xóa nội dung"}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </ImageProtection>
    </Fragment>
  );
};

export default AdminContentDetailView;
