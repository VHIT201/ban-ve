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
import {
  useGetApiFileIdDownload,
  useGetApiFileDownloadFreeContentId,
} from "@/api/endpoints/files";
import { toast } from "sonner";
import { PaymentStatusDialog } from "@/components/modules/payment";
import { useCreateQrPayment } from "@/hooks/modules/payments";
import { PaymentStatus } from "@/enums/payment";
import baseConfig from "@/configs/base";
import { useProfileStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import EmailDialog from "@/components/shared/email-dialog";
import { extractErrorMessage } from "@/utils/error";
import { Separator } from "@/components/ui/separator";
import { useCountDown } from "@/hooks";
import { BlueprintDownload } from "./components";

const DOWNLOAD_COUNTDOWN_SECONDS = 5;

const BlueprintDetailView: FC<Props> = (props) => {
  // Props
  const { content } = props;

  // Stores
  const profileStore = useProfileStore(useShallow(({ email }) => ({ email })));

  // Hooks
  const queryClient = useQueryClient();
  const router = useRouter();

  // States
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [openQRPaymentDialog, setOpenQRPaymentDialog] = useState(false);
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [openPaymentStatusDialog, setOpenPaymentStatusDialog] =
    useState<boolean>(false);

  // Cart Store
  const addItem = useCartStore((state) => state.addItem);

  // Hooks
  const countdown = useCountDown({
    seconds: DOWNLOAD_COUNTDOWN_SECONDS,
    autoStart: false,
  });

  // States
  const [selectedImage, setSelectedImage] = useState(0);
  const [rating] = useState(4);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Mutations
  const createQRPaymentMutation = useCreateQrPayment({
    orders: [{ contentId: content._id || "", quantity: 1 }],
  });

  // Methods
  const { mutate: addToCart } = usePostApiCart({
    mutation: {
      onSuccess: async () => {
        // Cập nhật store cục bộ sau khi gọi API thành công
        addItem(content, 1);
        setJustAdded(true);

        // Làm mới dữ liệu giỏ hàng
        await queryClient.invalidateQueries({ queryKey: ["/api/cart"] });

        setTimeout(() => {
          setJustAdded(false);
        }, 2000);
      },
      onError: (error) => {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
        toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
      },
    },
  });

  const handleConfirmEmail = (email: string) => {
    setOpenEmailDialog(false);
    setOpenQRPaymentDialog(true);
    createQRPaymentMutation.createPaymentQR(email);
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      // Gọi API để thêm vào giỏ hàng
      await addToCart({
        data: {
          contentId: content._id,
          quantity: 1,
        },
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = () => {
    setOpenEmailDialog(true);
  };

  const imageList =
    content?.images?.map((img) => `${baseConfig.mediaDomain}/${img}`) || [];

  // Effects
  useEffect(() => {
    if (createQRPaymentMutation.streamingStatus === PaymentStatus.COMPLETED) {
      setOpenPaymentStatusDialog(true);
    }
  }, [createQRPaymentMutation.streamingStatus]);

  useEffect(() => {
    if (!openPaymentStatusDialog) return;
    setOpenQRPaymentDialog(false);
  }, [openPaymentStatusDialog]);

  return (
    <Fragment>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Left Column - Image Gallery */}
        <div className="lg:col-span-3 space-y-4">
          {/* Main Image */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <Lens
              zoomFactor={2}
              lensSize={150}
              isStatic={false}
              ariaLabel="Zoom Area"
            >
              <img
                src={imageList[selectedImage]}
                alt={content.title}
                className="w-full h-[400px] lg:h-[550px] object-contain"
              />
            </Lens>
          </div>

          {/* Thumbnail Gallery */}
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
                  <button
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-200 w-full ${
                      selectedImage === index
                        ? "border-white ring-2 ring-white/50 shadow-md"
                        : "border-white/20 hover:border-white/60 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            {imageList.length > 5 && (
              <>
                <CarouselPrevious className="-left-3 size-8 bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white shadow-lg" />
                <CarouselNext className="-right-3 size-8 bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white shadow-lg" />
              </>
            )}
          </Carousel>
        </div>

        {/* Right Column - Product Info */}
        <div className="lg:col-span-2 space-y-6 bg-white/5 p-6 rounded-xl shadow-lg h-fit">
          {/* Header with Actions */}
          <div className="flex items-start justify-between gap-3 ">
            <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight flex-1">
              {content.title}
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <EllipsisIcon className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <HeartIcon className="size-4 mr-2" />
                  Yêu thích
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShareIcon className="size-4 mr-2" />
                  Chia sẻ
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setOpenReportDialog(true)}
                >
                  <FlagIcon className="size-4 mr-2" />
                  Báo cáo vi phạm
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Price & Rating */}
          <div className="space-y-3 pb-6 border-b border-white/10">
            <div className="text-3xl lg:text-4xl font-bold text-white">
              {content.price
                ? new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(content.price)
                : "Liên hệ"}
            </div>
          </div>
          <h6 className="text-white/50 text-md leading-relaxed">
            {content.description || "Không có mô tả cho sản phẩm này."}
          </h6>
          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4 py-6 border-b border-white/10">
            <div className="space-y-1.5">
              <div className="text-xs text-white/50 uppercase tracking-wide">
                Loại file
              </div>
              <div className="font-medium text-white">Vector</div>
            </div>
            <div className="space-y-1.5">
              <div className="text-xs text-white/50 uppercase tracking-wide">
                Kích thước
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {content.file_id?.size
                  ? formatFileSize(content.file_id.size)
                  : "N/A"}
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="text-xs text-white/50 uppercase tracking-wide">
                Định dạng
              </div>
              <div className="font-medium text-white">AI, PDF, PNG</div>
            </div>
            <div className="space-y-1.5">
              <div className="text-xs text-white/50 uppercase tracking-wide">
                Danh mục
              </div>
              <div className="font-medium text-white">
                {typeof content.category_id === "object"
                  ? content.category_id.name
                  : "N/A"}
              </div>
            </div>
          </div>
          // ...
          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 h-12 bg-white text-gray-900 hover:bg-white/90 font-semibold hover:text-gray-900"
                onClick={handleAddToCart}
                disabled={isAdding}
                variant="default"
              >
                {isAdding ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Đang thêm...
                  </>
                ) : justAdded ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Đã thêm vào giỏ
                  </>
                ) : (
                  <>
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    Thêm vào giỏ
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="destructive"
                className="flex-1 h-12 font-semibold"
                onClick={handleBuyNow}
              >
                Mua ngay
              </Button>
            </div>
          </div>
          <BlueprintDownload content={content} />
        </div>
      </div>

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
        open={openQRPaymentDialog}
        onOpenChange={setOpenQRPaymentDialog}
      />

      <PaymentStatusDialog
        order={createQRPaymentMutation.order}
        open={openPaymentStatusDialog}
        amount={content.price}
        status={PaymentStatus.COMPLETED}
        onOpenChange={setOpenPaymentStatusDialog}
      />
    </Fragment>
  );
};

export default BlueprintDetailView;
