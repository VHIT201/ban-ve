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
  DownloadIcon,
  ShoppingCartIcon,
  StarIcon,
  Check,
  Ellipsis,
  EllipsisVerticalIcon,
  HeartIcon,
  ShareIcon,
  FlagIcon,
  EllipsisIcon,
} from "lucide-react";
import { FC, Fragment, useState } from "react";
import { Props } from "./lib/types";
import { useCartStore } from "@/stores/use-cart-store";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReportDialog } from "@/components/shared";
import { ContentPaymentDialog } from "@/components/modules/content";
import { useGetApiFileIdDownload } from "@/api/endpoints/files";
import { QueryData } from "@/api/types/base";
import { FileResponse } from "@/api/types/file";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/error";
import { useWatermark } from "@/hooks";

const mockProduct: ContentResponse = {
  _id: "1",
  title: "Flat Vector Everyday Life Detailed Plan Creator Bundle",
  description:
    "Flat vector everyday life themed detailed plan creator bundle for your architecture & design projects.",
  category_id: {
    _id: "cat1",
    name: "Thiết kế đồ họa",
    slug: "thiet-ke-do-hoa",
    description: "Bản vẽ thiết kế đồ họa",
  },
  file_id: {
    _id: "file1",
    name: "flat-vector-bundle.ai",
    url: "/uploads/flat-vector-bundle.ai",
    type: "AI",
    size: 78643200, // 75.3 MB
  },
  price: 289000, // ~$11.99
  status: "approved",
  createdBy: {
    _id: "user1",
    username: "TOFFU",
    email: "toffu@example.com",
  },
  createdAt: "2025-11-01T10:00:00Z",
  updatedAt: "2025-11-08T15:30:00Z",
};

const MOCK_IMAGE_LIST = [
  "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
  "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
  "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
  "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
  "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
];

const BlueprintDetailView: FC<Props> = (props) => {
  // Props
  const { content } = props;

  // Hooks
  const canvasRef = useWatermark({
    text: "TẠO BỞI BANVE.VN",
    rotation: -Math.PI / 6,
    fontSize: 22,
    overlayOpacity: 0.5,
    textOpacity: 0.7,
  });

  // States
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openReportDialog, setOpenReportDialog] = useState(false);

  // Cart Store
  const addItem = useCartStore((state) => state.addItem);
  const isInCart = useCartStore((state) => state.isInCart(content._id));
  const openCart = useCartStore((state) => state.openCart);

  // States
  const [selectedImage, setSelectedImage] = useState(0);
  const [rating] = useState(4);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Queries
  const getDownloadFileQuery = useGetApiFileIdDownload(content.file_id._id, {
    query: {
      select: (data) =>
        (data as unknown as QueryData<FileResponse>).responseData,
      enabled: false,
    },
  });

  // Methods
  const handleAddToCart = () => {
    if (isInCart) {
      openCart();
      return;
    }

    setIsAdding(true);

    // Simulate async operation (could be API call for validation)
    setTimeout(() => {
      addItem(content, 1);
      setIsAdding(false);
      setJustAdded(true);

      // Reset justAdded state after animation
      setTimeout(() => {
        setJustAdded(false);
      }, 2000);
    }, 300);
  };

  const handleBuyNow = () => {
    if (!isInCart) {
      addItem(content, 1);
    }
    setOpenPaymentDialog(true);
  };

  const handleDownloadPreview = async () => {
    const downloadUrlRes = await getDownloadFileQuery.refetch();

    if (downloadUrlRes.isError) {
      toast.error(extractErrorMessage(downloadUrlRes.error));
      return;
    }

    const downloadUrl = downloadUrlRes.data?.url;
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    } else {
      toast.error("Không tìm thấy link tải xuống.");
    }
  };

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
                src={MOCK_IMAGE_LIST[selectedImage]}
                alt={content.title}
                className="w-full h-[400px] lg:h-[550px] object-cover"
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
              {MOCK_IMAGE_LIST.map((image, index) => (
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
            {MOCK_IMAGE_LIST.length > 5 && (
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
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(content.price)}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-4 h-4 ${
                      star <= rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-white/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-white/60">
                {rating > 0 ? `${rating}/5` : "Chưa có đánh giá"}
              </span>
            </div>
          </div>

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
              <div className="font-medium text-white">
                {formatFileSize(content.file_id.size)}
              </div>
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
                {content.category_id.name}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="py-4">
            <p className="text-white/80 leading-relaxed text-sm">
              {content.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 h-12 bg-white text-gray-900 hover:bg-white/90 font-semibold hover:text-gray-900"
                onClick={handleAddToCart}
                disabled={isAdding}
                variant={isInCart ? "outline" : "default"}
              >
                {isAdding ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Đang thêm...
                  </>
                ) : justAdded ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Đã thêm!
                  </>
                ) : isInCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Xem giỏ hàng
                  </>
                ) : (
                  <>
                    <ShoppingCartIcon className="w-5 h-5 mr-2" />
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
            <Button
              loading={getDownloadFileQuery.isFetching}
              variant="outline"
              size="lg"
              onClick={handleDownloadPreview}
              className="w-full h-12 font-semibold border-white/20 text-gray-700 hover:bg-white/80 hover:text-gray-900"
            >
              <DownloadIcon className="w-5 h-5 mr-2" />
              Xem trước miễn phí
            </Button>
          </div>
        </div>
      </div>

      <ReportDialog
        open={openReportDialog}
        onOpenChange={setOpenReportDialog}
      />

      <ContentPaymentDialog
        contentId={content._id}
        open={openPaymentDialog}
        onOpenChange={setOpenPaymentDialog}
      />
    </Fragment>
  );
};

export default BlueprintDetailView;
