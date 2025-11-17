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
  Check,
} from "lucide-react";
import { FC, useState } from "react";
import { Props } from "./lib/types";
import {
  formatDate,
  formatFileSize,
  getStatusColor,
  getStatusText,
} from "./lib/utils";
import { cn } from "@/utils/ui";
import { generateImageRandom } from "@/utils/image";
import { useCartStore } from "@/stores/use-cart-store";

const BlueprintCard: FC<Props> = (props) => {
  const { blueprint, onViewDetails, onAddToCart } = props;
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const isInCart = useCartStore((state) => state.isInCart(blueprint._id));
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isInCart) {
      // If already in cart, open cart drawer
      openCart();
      return;
    }

    setIsAdding(true);

    try {
      // Simulate async operation (can be replaced with API call)
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Add to cart
      addItem(blueprint);

      // Call parent callback if provided
      onAddToCart?.(blueprint);

      // Show success state
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className="group/container relative max-w-md rounded-xl bg-linear-to-r from-neutral-600 to-neutral-300 pt-0 shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
      style={{
        backgroundImage: `url(${generateImageRandom()})`,
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
        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch flex-wrap">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(blueprint.price)}
            </span>
          </div>
          <Button
            size="lg"
            onClick={handleAddToCart}
            disabled={isAdding}
            className={cn(
              "ml-auto",
              "transition-all duration-300",
              isInCart && "bg-green-600 hover:bg-green-700",
              justAdded && "bg-green-600"
            )}
          >
            {isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Đang thêm...
              </>
            ) : justAdded ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Đã thêm!
              </>
            ) : isInCart ? (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Xem giỏ hàng
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Thêm vào giỏ
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BlueprintCard;
