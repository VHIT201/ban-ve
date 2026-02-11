"use client";

import { ContentResponse } from "@/api/types/content";
import { usePostApiCart } from "@/api/endpoints/cart";
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
  DownloadIcon,
  ShoppingCartIcon,
  StarIcon,
  Check,
  HeartIcon,
  ShareIcon,
  FlagIcon,
  EllipsisIcon,
  Package,
  FileType,
  Grid3x3,
  FolderOpen,
} from "lucide-react";
import { FC, Fragment, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Props } from "./lib/types";
import { useCartStore } from "@/stores/use-cart-store";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReportDialog } from "@/components/shared";
import { ContentPaymentDialog } from "@/components/modules/content";

import { toast } from "sonner";
import { useCreateQrPayment } from "@/hooks/modules/payments";
import baseConfig from "@/configs/base";
import { useProfileStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import EmailDialog from "@/components/shared/email-dialog";
import { useMetaTags } from "@/hooks";
import { BlueprintDownload } from "./components";
import { ImageProtection } from "@/components/shared";
import { motion, AnimatePresence, easeOut, easeInOut } from "framer-motion";
import { useCart } from "@/hooks/use-cart";

const BlueprintDetailView: FC<Props> = (props) => {
  // Props
  const { content } = props;
  const isFree = content.price === 0 || content.price === undefined;

  // Stores
  const profileStore = useProfileStore(useShallow(({ email }) => ({ email })));

  // Hooks
  const cart = useCart({ sync: false });

  // States
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openReportDialog, setOpenReportDialog] = useState(false);

  // States
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Mutations
  const createQRPaymentMutation = useCreateQrPayment({
    orders: [{ contentId: content._id || "", quantity: 1 }],
  });

  const handleConfirmEmail = (email: string) => {
    setOpenEmailDialog(false);
    setOpenPaymentDialog(true);
    createQRPaymentMutation.createPaymentQR(email);
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const contentId = content._id;
      if (!contentId) {
        console.error("Missing content._id, cannot add to cart");
        toast.error("Không thể thêm vào giỏ hàng: thiếu ID sản phẩm");
        return;
      }

      await cart.addItem(content as any, 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1000);
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = () => {
    setOpenEmailDialog(true);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;

    // Chỉ copy link, không dùng Web Share API nữa
    await handleCopyLink(shareUrl);
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Đã sao chép link vào clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast.error("Không thể sao chép link");
    }
  };

  const imageList =
    content?.images?.map((img) => `${baseConfig.mediaDomain}/${img}`) || [];

  // Setup meta tags for SEO and social sharing
  useMetaTags({
    title: content.title || "Sản phẩm",
    description:
      content.description ||
      "Khám phá thiết kế độc đáo tại Blueprint Marketplace",
    image: imageList[0] || `${window.location.origin}/og-image.jpg`,
    url: window.location.href,
    type: "product",
  });

  // Effects
  useEffect(() => {
    // Dialog will automatically show success view when status changes to COMPLETED
    // No need for separate dialog management
  }, [createQRPaymentMutation.streamingStatus]);

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
              className="bg-white/5 backdrop-blur-sm overflow-hidden shadow-xl border border-white/10"
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
                  src={imageList[selectedImage]}
                  alt={content.title}
                  className="w-full h-[300px] sm:h-[400px] lg:h-[550px] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Lens>
            </motion.div>

            {/* Thumbnail Gallery */}
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
                        className={`aspect-square bg-white/5 backdrop-blur-sm  overflow-hidden border transition-all duration-300 w-full ${
                          selectedImage === index
                            ? "border-white/40 ring-2 ring-white/20 shadow-lg"
                            : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
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
                    <CarouselPrevious className="-left-3 size-8 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 shadow-lg" />
                    <CarouselNext className="-right-3 size-8 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 shadow-lg" />
                  </>
                )}
              </Carousel>
            </motion.div>
          </motion.div>

          {/* Right Column - Product Info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={itemVariants}
          >
            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 shadow-xl border border-white/10 space-y-6 h-fit">
              {/* Header with Actions */}
              <div className="flex items-start justify-between gap-4">
                <motion.h1
                  className="text-2xl sm:text-3xl font-bold text-white leading-tight flex-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {content.title}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white/60 hover:text-white hover:bg-white/10  transition-colors"
                      >
                        <EllipsisIcon className="size-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleShare}>
                        <ShareIcon className="size-4 mr-2" />
                        Chia sẻ
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setOpenReportDialog(true)}
                        className="hover:bg-red-500/10"
                      >
                        <FlagIcon className="size-4 mr-2" />
                        Báo cáo vi phạm
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              </div>

              {/* Price */}
              <motion.div
                className="pb-6 border-b border-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
                  {content.price
                    ? new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(content.price)
                    : "Miễn phí"}
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-white/60 text-sm leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {content.description || "Không có mô tả cho sản phẩm này."}
              </motion.p>

              {/* Quick Info Grid */}
              <motion.div
                className="grid grid-cols-2 gap-4 py-6 border-y border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {infoItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      className="group space-y-2 p-3  hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="size-4 text-white/40 group-hover:text-white/60 transition-colors" />
                        <div className="text-xs text-white/40 uppercase tracking-wider group-hover:text-white/60 transition-colors">
                          {item.label}
                        </div>
                      </div>
                      <div className="font-medium text-white/90 text-sm">
                        {item.value}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="space-y-3 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.div
                    className="w-full sm:flex-1"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      size="lg"
                      className="w-full h-12 bg-white text-gray-900 hover:bg-white/90 font-semibold  shadow-lg hover:shadow-xl transition-shadow"
                      onClick={handleAddToCart}
                      disabled={isAdding}
                      variant="default"
                    >
                      <AnimatePresence mode="wait">
                        {isAdding ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center"
                          >
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                            Đang thêm...
                          </motion.div>
                        ) : justAdded ? (
                          <motion.div
                            key="success"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center"
                          >
                            <Check className="h-5 w-5 mr-2" />
                            Đã thêm vào giỏ
                          </motion.div>
                        ) : (
                          <motion.div
                            key="default"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center"
                          >
                            <ShoppingCartIcon className="h-5 w-5 mr-2" />
                            Thêm vào giỏ
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>

                  <motion.div
                    className="w-full sm:flex-1"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      size="lg"
                      variant="destructive"
                      className="w-full h-12 font-semibold  shadow-lg hover:shadow-xl transition-shadow"
                      onClick={handleBuyNow}
                      disabled={isFree}
                    >
                      Mua ngay
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Download Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <BlueprintDownload content={content} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </ImageProtection>

      <ReportDialog
        contentId={content._id!}
        open={openReportDialog}
        onOpenChange={setOpenReportDialog}
      />

      <EmailDialog
        open={openEmailDialog}
        defaultEmail={profileStore.email}
        onOpenChange={setOpenEmailDialog}
        onEmailSubmit={handleConfirmEmail}
      />

      <ContentPaymentDialog
        urlQRCode={createQRPaymentMutation.qrCodeUrl}
        loading={createQRPaymentMutation.isPending}
        open={openPaymentDialog}
        onOpenChange={setOpenPaymentDialog}
        status={createQRPaymentMutation.streamingStatus}
        order={createQRPaymentMutation.order}
        amount={content.price}
      />
    </Fragment>
  );
};

export default BlueprintDetailView;
