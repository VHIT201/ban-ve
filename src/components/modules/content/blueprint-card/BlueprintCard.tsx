"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DownloadCloudIcon,
  ShoppingCartIcon,
  User,
  Loader2,
} from "lucide-react";
import Image from "@/components/ui/image";
import { ContentProduct } from "@/api/types/content";
import { FC, useMemo, useState } from "react";
import { formatVND } from "@/utils/currency";
import { generateImageRandom } from "@/utils/image";
import { ContentStatus } from "@/enums/content";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCart } from "@/hooks/use-cart";
import baseConfig from "@/configs/base";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: -20,
    transition: {
      opacity: { duration: 0.4 },
      y: { duration: 0.3, delay: 0.2 }, // Delay slide lên sau fade
    },
  },
};

interface Props {
  product: ContentProduct;
  className?: string;
  onViewDetail?: (product: ContentProduct) => void;
  onAddToCart?: (product: ContentProduct) => void;
}

const BlueprintCard: FC<Props> = (props) => {
  // Props
  const { product, className, onViewDetail, onAddToCart } = props;

  // Cart hook
  const cart = useCart({ sync: false });
  const isProductInCart = cart.isInCart(product._id);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Methods
  const handleViewDetail = () => {
    onViewDetail?.(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isProductInCart || isAddingToCart) return;
    setIsAddingToCart(true);
    cart.addItem(product as any, 1);
    onAddToCart?.(product);
    setIsAddingToCart(false);
  };

  // Memos
  const title = product.title || "Untitled Product";
  const formattedPrice = formatVND(product.price || 0);
  const username = product.createdBy?.email || "Anonymous";
  const categoryName = product?.category?.name || "General";
  const productImage = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return `${baseConfig.mediaDomain}/${product.images[0]}`;
    }
    return undefined;
  }, [product.images]);
  
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

  const index = 0;

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.05,
        rotateY: 5,
        rotateX: 2,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15,
        },
      }}
      // Hiệu ứng xuất hiện đặc biệt
      initial={{
        opacity: 0,
        y: 60,
        scale: 0.8,
        rotateX: -15,
        rotateY: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        transition: {
          opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          y: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: index * 0.1 + 0.2, // Stagger theo index
          },
          scale: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: index * 0.1 + 0.1,
          },
          rotateX: {
            duration: 0.8,
            ease: "backOut",
            delay: index * 0.1,
          },
          rotateY: {
            duration: 0.8,
            ease: "backOut",
            delay: index * 0.1 + 0.05,
          },
        },
      }}
      // Hiệu ứng khi click
      whileTap={{
        scale: 0.98,
        rotateY: -2,
        transition: { duration: 0.1 },
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
        y: -20,
        transition: { duration: 0.3 },
      }}
      onClick={handleViewDetail}
      className={cn(
        "group cursor-pointer overflow-hidden border-none shadow-none bg-transparent",
        "transform-gpu", // Để tối ưu hiệu ứng 3D
        className,
      )}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <div className="relative aspect-[1/1] overflow-hidden bg-[#F5F5F3]">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full"
        >
          <Image
            src={productImage ?? generateImageRandom()}
            alt={title}
            wrapperClassName="h-full"
            className="object-cover h-full w-full"
          />
        </motion.div>
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
        <motion.div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/5"
          initial={{ backgroundColor: "rgba(0,0,0,0)" }}
          whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
          transition={{ duration: 0.4 }}
        />
        <AnimatePresence>
          {product.status && (
            <motion.div
              className="absolute bottom-4 left-4 right-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4 }}
            >
              <Badge
                variant={statusName.variant as "success" | "error"}
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.1em] border-none py-1 px-2.5",
                )}
              >
                {statusName.name}
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CardContent className="pt-6 px-0 pb-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
            <User className="w-3 h-3" strokeWidth={3} />
            <span>{username}</span>
          </div>
        </div>

        <h3 className="text-xl font-medium text-foreground leading-tight line-clamp-1 mb-2 group-hover:underline underline-offset-4 decoration-1 transition-all">
          {title}
        </h3>

        <div className="text-[15px] font-bold text-foreground/80 tracking-tighter mt-4">
          {formattedPrice}
        </div>
      </CardContent>

      <CardFooter className="px-0 pt-0 pb-4 flex items-center justify-between border-t border-border mt-auto pt-4">
        <Button
          size="sm"
          variant="outline"
          disabled={isAddingToCart}
          className={cn(
            "h-12 rounded-none w-full px-5 font-semibold text-[12px] uppercase tracking-wider border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 bg-transparent",
            isProductInCart &&
              "bg-primary text-primary-foreground border-primary",
            isAddingToCart && "cursor-not-allowed opacity-70",
          )}
          onClick={handleAddToCart}
        >
          {isAddingToCart ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCartIcon className="w-4 h-4 mr-2" />
          )}
          {isProductInCart ? "Đã có trong giỏ" : "Thêm vào giỏ hàng"}
        </Button>
      </CardFooter>
    </motion.div>
  );
};

export default BlueprintCard;
