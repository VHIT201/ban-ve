import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { User } from "lucide-react";
import Image from "@/components/ui/image";
import { ContentProduct } from "@/api/types/content";
import { FC, MouseEvent, useState } from "react";
import { formatVND } from "@/utils/currency";
import { generateImageRandom } from "@/utils/image";
import { ContentStatus } from "@/enums/content";
import { useCartStore } from "@/stores/use-cart-store";

interface Props {
  product: ContentProduct;
  className?: string;
  onViewDetail?: (product: ContentProduct) => void;
  onAddToCart?: (product: ContentProduct) => void;
}

const BlueprintCard: FC<Props> = (props) => {
  // Props
  const { product, className, onViewDetail, onAddToCart } = props;

  // States
  const [isAddingCart, setIsAddingCart] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const isInCart = useCartStore((state) => state.isInCart(product._id));
  const openCart = useCartStore((state) => state.openCart);

  // Methods
  const handleViewDetail = () => {
    if (onViewDetail) {
      onViewDetail(product);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isInCart) {
      openCart();
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      addItem(product);
      onAddToCart?.(product);

      setIsAddingCart(true);
      setTimeout(() => setIsAddingCart(false), 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
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
            className="bg-white/90 backdrop-blur-sm border-none text-[10px] uppercase tracking-widest py-1"
          >
            {categoryName}
          </Badge>
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
          loading={isAddingCart}
          variant="outline"
          className={cn(
            "h-12 rounded-none w-full px-5 font-semibold text-[12px] uppercase tracking-wider border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 bg-transparent",
            isAddingCart ? "cursor-not-allowed opacity-70" : "",
            isInCart
              ? "bg-green-600 text-white border-green-600 hover:bg-green-700 hover:border-green-700"
              : ""
          )}
          onClick={handleAddToCart}
        >
          {isInCart
            ? "Đã trong giỏ"
            : isAddingCart
            ? "Đang thêm"
            : "Thêm vào giỏ"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlueprintCard;
