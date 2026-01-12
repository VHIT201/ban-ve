import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DownloadCloudIcon, ShoppingCartIcon, User, Loader2 } from "lucide-react";
import type { Content } from "@/api/models/content";
import Image from "@/components/ui/image";
import { ContentProduct } from "@/api/types/content";
import { FC, MouseEvent, useMemo } from "react";
import { formatVND } from "@/utils/currency";
import { generateImageRandom } from "@/utils/image";
import { ContentStatus } from "@/enums/content";
import { useGetApiCart, usePostApiCart, useDeleteApiCart } from "@/api/endpoints/cart";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CartItem {
  _id: string;
  quantity: number;
  contentId?: {
    _id: string;
    title: string;
    price?: number;
    description?: string;
    category?: {
      _id: string;
      name: string;
      description?: string;
    };
  };
}

interface CartResponse {
  message?: string;
  data?: {
    _id?: string;
    userId?: string;
    items?: CartItem[];
    createdAt?: string;
    updatedAt?: string;
  };
}

interface Props {
  product: ContentProduct;
  className?: string;
  onViewDetail?: (product: ContentProduct) => void;
  onAddToCart?: (product: ContentProduct) => void;
}

const BlueprintCard: FC<Props> = (props) => {
  // Props
  const { product, className, onViewDetail, onAddToCart } = props;
  const queryClient = useQueryClient();

  // Cart API
  const { data: cartData, isLoading: isLoadingCart } = useGetApiCart({});
  const cartResponse = cartData as CartResponse;
  const cartItems = cartResponse?.data?.items ?? [];

  // Check if product is in cart
  const isInCart = useMemo(() => {
    return cartItems.some(item => item.contentId?._id === product._id);
  }, [cartItems, product._id]);

  // Add to cart mutation
  const { mutate: addToCart, isPending: isAddingToCart } = usePostApiCart({
    mutation: {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        
        // Kiểm tra xem sản phẩm đã được thêm vào giỏ hàng chưa
        const isItemInCart = data?.data?.items?.some(item => item.contentId?._id === product._id);
        
        if (isItemInCart) {
          toast.success("Đã thêm vào giỏ hàng");
          onAddToCart?.(product);
        } else {
          toast.error("Không thể thêm sản phẩm vào giỏ hàng");
        }
        
        // Dispatch custom event to notify other components about cart update
        window.dispatchEvent(new Event('cartUpdated'));
      },
      onError: () => {
        toast.error("Thêm vào giỏ hàng thất bại");
      },
    },
  });

  // Remove from cart mutation
  const { mutate: removeFromCart } = useDeleteApiCart({
    mutation: {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        
        // Kiểm tra xem sản phẩm đã bị xóa khỏi giỏ hàng chưa
        const isItemRemoved = !data?.data?.items?.some(item => item.contentId?._id === product._id);
        
        if (isItemRemoved) {
          toast.success("Đã xóa khỏi giỏ hàng");
        } else {
          toast.error("Không thể xóa sản phẩm khỏi giỏ hàng");
        }
      },
      onError: () => {
        toast.error("Xóa khỏi giỏ hàng thất bại");
      },
    },
  });

  // Methods
  const handleViewDetail = () => {
    onViewDetail?.(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Always add to cart, don't check if it's already in cart
    addToCart({
      data: {
        contentId: product._id,
        quantity: 1
      },
    });
  };

  // Memos
  const title = product.title || "Untitled Product";
  const formattedPrice = formatVND(product.price || 0);
  const username = product.createdBy?.username || "Anonymous";
  const categoryName = product?.category?.name || "General";
  const statusName =
    product.status === ContentStatus.APPROVED
      ? {
          name: "Đã duyệt",
          variant: "success",
        }
      : {
          name: "Chưa duyệt",
          variant: "error",
        };

  return (
    <Card
      onClick={handleViewDetail}
      className={cn(
        "group cursor-pointer overflow-hidden border-none shadow-none bg-transparent transition-all duration-500 hover:-translate-y-1",
        className
      )}
    >
      <div className="relative aspect-[1/1] overflow-hidden bg-[#F5F5F3]">
        <Image
          src={generateImageRandom()}
          alt={title}
          wrapperClassName="h-full"
          className="object-cover h-full transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="bg-white/90 backdrop-blur-sm border-none text-[10px] uppercase tracking-widest py-1 "
          >
            {categoryName}
          </Badge>
        </div>

        <div className="absolute top-4 right-4 flex flex-wrap gap-2">
          {product.purchaseCount && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="destructive" className="shadow-none!">
                  <ShoppingCartIcon className="inline-block size-4 mr-2" />
                  {product.purchaseCount}
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="bg-black/90 text-white text-xs">
                Lượt mua
              </TooltipContent>
            </Tooltip>
          )}
          {product.downloadCount && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="destructive" className="shadow-none!">
                  <DownloadCloudIcon className="inline-block size-4 mr-2" />
                  {product.downloadCount}
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="bg-black/90 text-white text-xs">
                Lượt tải
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {product.status && (
            <Badge
              variant={statusName.variant as "success" | "error"}
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.1em] border-none py-1 px-2.5"
              )}
            >
              {statusName.name}
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="pt-6 px-0 pb-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
            <User className="w-3 h-3" strokeWidth={3} />
            <span>{username}</span>
          </div>
        </div>

        <h3 className="text-xl font-medium text-foreground leading-tight mb-2 group-hover:underline underline-offset-4 decoration-1 transition-all">
          {title}
        </h3>

        <div className="text-[15px] font-bold text-foreground/80 tracking-tighter mt-4">
          {formattedPrice}
        </div>
      </CardContent>

      <CardFooter className="px-0 pt-0 pb-4 flex items-center justify-between border-t border-border mt-auto pt-4">
        <Button
          size="sm"
          loading={isAddingToCart}
          variant="outline"
          className={cn(
            "h-12 rounded-none w-full px-5 font-semibold text-[12px] uppercase tracking-wider border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 bg-transparent",
            isAddingToCart ? "cursor-not-allowed opacity-70" : ""
          )}
          onClick={handleAddToCart}
        >
          {isAddingToCart ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCartIcon className="w-4 h-4 mr-2" />
          )}
          Thêm vào giỏ hàng
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlueprintCard;
