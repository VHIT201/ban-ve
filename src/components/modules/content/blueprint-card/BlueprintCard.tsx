import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, HeartIcon, EyeIcon, Check } from "lucide-react";
import { FC, useState } from "react";
import { Props } from "./lib/types";

import { cn } from "@/utils/ui";
import { generateImageRandom } from "@/utils/image";
import { useCartStore } from "@/stores/use-cart-store";
import { useWatermark } from "@/hooks";

const BlueprintCard: FC<Props> = (props) => {
  const { blueprint, onViewDetails, onAddToCart } = props;
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const isInCart = useCartStore((state) => state.isInCart(blueprint._id));
  const openCart = useCartStore((state) => state.openCart);

  // Use watermark hook
  const canvasRef = useWatermark({
    text: "TẠO BỞI BANVE.VN",
    rotation: -Math.PI / 6,
    fontSize: 22,
    overlayOpacity: 0.5,
    textOpacity: 0.7,
  });

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isInCart) {
      openCart();
      return;
    }

    setIsAdding(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      addItem(blueprint);
      onAddToCart?.(blueprint);

      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    } finally {
      setIsAdding(false);
    }
    0;
  };

  return (
    <div
      className="group/container relative rounded-xl bg-linear-to-r from-neutral-600 to-neutral-300 pt-0 shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
      style={{
        backgroundImage: `url(${generateImageRandom()})`,
        objectFit: "cover",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* IMAGE AREA + WATERMARK */}
      <div className="h-60 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
            style={{
              mixBlendMode: "overlay",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Hover View Button */}
        <div
          onClick={() => onViewDetails(blueprint)}
          className="cursor-pointer group/view z-20 flex flex-col items-center justify-center opacity-0 group-hover/container:opacity-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300"
        >
          <EyeIcon className="size-8 stroke-white group-hover/view:scale-110 transition-transform duration-300" />
          <span className="text-white text-sm group-hover/view:scale-110 transition-transform duration-300">
            Xem chi tiết
          </span>
        </div>
      </div>

      <div className="opacity-0 group-hover/container:opacity-100 transition-opacity duration-300 absolute inset-0 bg-linear-to-b from-gray-400/50 to-gray-300/20 z-10" />

      {/* Category Badge */}
      <Badge className="absolute top-4 left-4 rounded-full z-20">
        {blueprint.category_id.name}
      </Badge>

      {/* Heart Button */}
      <Button
        size="icon"
        className="z-20 opacity-0 group-hover/container:opacity-100 bg-primary/10 hover:bg-primary/20 absolute top-4 right-4 rounded-full transition-opacity duration-300"
      >
        <HeartIcon className="size-4 stroke-white" />
        <span className="sr-only">Like</span>
      </Button>

      {/* Card Content */}
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
              "ml-auto transition-all duration-300",
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
