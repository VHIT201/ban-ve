"use client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { CardContent, CardFooter } from "@/components/ui/card";

import {
  DownloadCloudIcon,
  ShoppingCartIcon,
  User,
  Loader2,
} from "lucide-react";

import Image from "@/components/ui/image";

import { ContentProduct } from "@/api/types/content";

import { FC, useMemo, useState, useRef, useCallback } from "react";

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

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { toast } from "sonner";

interface Props {
  product: ContentProduct;

  className?: string;

  viewUsername?: boolean;

  onViewDetail?: (product: ContentProduct) => void;

  onAddToCart?: (product: ContentProduct) => void;
}

const BlueprintCard: FC<Props> = (props) => {
  // Props
  const {
    product,
    className,
    viewUsername = true,
    onViewDetail,
    onAddToCart,
  } = props;

  // Refs
  const cardRef = useRef<HTMLDivElement>(null);

  // Cart hook
  const cart = useCart({ sync: false });
  const isProductInCart = cart.isInCart(product._id);

  // States
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  // Mouse tracking for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  // Shimmer position
  const shimmerX = useSpring(0, { stiffness: 100, damping: 20 });

  // Methods
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseXPercent = (e.clientX - centerX) / (rect.width / 2);
      const mouseYPercent = (e.clientY - centerY) / (rect.height / 2);

      mouseX.set(mouseXPercent);
      mouseY.set(mouseYPercent);
      shimmerX.set(mouseXPercent * 100);
    },
    [mouseX, mouseY, shimmerX],
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    // Generate particles on hover
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    shimmerX.set(0);
    setParticles([]);
  }, [mouseX, mouseY, shimmerX]);

  const handleViewDetail = () => {
    onViewDetail?.(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isAddingToCart) return;

    setIsAddingToCart(true);
    if (isProductInCart) {
      cart.removeItem(product._id);
      toast.success(`"${product.title}" đã được bỏ khỏi giỏ hàng.`);
    } else {
      cart.addItem(product as any, 1);
      onAddToCart?.(product);
      toast.success(`"${product.title}" đã được thêm vào giỏ hàng.`);
    }
    setIsAddingToCart(false);
  };

  // Memos

  const title = product.title || "Untitled Product";

  const formattedPrice = formatVND(product.price || 0);

  const username = product.createdBy?.email || "Không xác định";

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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleViewDetail}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1200px",
      }}
      initial={{
        opacity: 0,
        y: 60,
        scale: 0.8,
        rotateX: -15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
          opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          y: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: index * 0.1 + 0.2,
          },
          scale: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: index * 0.1 + 0.1,
          },
        },
      }}
      whileHover={{
        scale: 1.05,
        z: 50,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 },
      }}
      className={cn(
        "group cursor-pointer overflow-hidden border-none shadow-none bg-transparent relative",
        "transform-gpu will-change-transform",
        className,
      )}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-0.5 bg-linear-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        animate={{
          opacity: isHovered ? [0, 0.3, 0] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Main card container with parallax layers */}
      <div className="relative">
        <div className="relative aspect-square overflow-hidden bg-[#F5F5F3]">
          {/* Shimmer overlay effect */}
          <motion.div
            className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: `linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 55%, transparent 75%)`,
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: isHovered ? ["200% 0", "-200% 0"] : "200% 0",
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: isHovered ? Infinity : 0,
            }}
          />

          {/* Particle system */}
          <AnimatePresence>
            {isHovered &&
              particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-1 h-1 bg-white/60 rounded-full blur-[1px]"
                  initial={{
                    x: `${particle.x}%`,
                    y: `${particle.y}%`,
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, `${particle.y - 30}%`, `${particle.y - 60}%`],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    delay: Math.random() * 0.3,
                  }}
                />
              ))}
          </AnimatePresence>

          {/* Image with parallax */}
          <motion.div
            style={{
              transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
            }}
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
            className="h-full"
          >
            <Image
              src={productImage ?? generateImageRandom()}
              alt={title}
              wrapperClassName="h-full"
              className="object-cover h-full w-full"
            />
          </motion.div>

          {/* Top left badges with parallax */}
          <motion.div
            className="absolute top-4 left-4 flex flex-wrap gap-2"
            style={{
              transform: isHovered ? "translateZ(30px)" : "translateZ(0px)",
            }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Badge
                variant="outline"
                className="bg-white/90 backdrop-blur-sm border-none text-[10px] uppercase tracking-widest py-1"
              >
                {categoryName}
              </Badge>
            </motion.div>
          </motion.div>

          {/* Top right stats with parallax */}
          <motion.div
            className="absolute top-4 right-4 flex flex-wrap gap-2"
            style={{
              transform: isHovered ? "translateZ(30px)" : "translateZ(0px)",
            }}
          >
            {product.purchaseCount && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    <Badge variant="destructive" className="shadow-none!">
                      <ShoppingCartIcon className="inline-block size-4 mr-2" />
                      {product.purchaseCount}
                    </Badge>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent className="bg-black/90 text-white text-xs">
                  Lượt mua
                </TooltipContent>
              </Tooltip>
            )}

            {product.downloadCount && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    <Badge variant="destructive" className="shadow-none!">
                      <DownloadCloudIcon className="inline-block size-4 mr-2" />
                      {product.downloadCount}
                    </Badge>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent className="bg-black/90 text-white text-xs">
                  Lượt tải
                </TooltipContent>
              </Tooltip>
            )}
          </motion.div>

          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-black/0"
            animate={{
              backgroundColor: isHovered ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Status badge with parallax */}
          <AnimatePresence>
            {product.status && (
              <motion.div
                className="absolute bottom-4 left-4 right-4"
                style={{
                  transform: isHovered ? "translateZ(30px)" : "translateZ(0px)",
                }}
                initial={{ opacity: 0, y: 16, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                <Badge
                  variant={statusName.variant as "success" | "error"}
                  className="text-[10px] font-bold uppercase tracking-widest border-none py-1 px-2.5"
                >
                  {statusName.name}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card content with stagger animations */}
        <CardContent className="pt-6 px-0 pb-2">
          {viewUsername && (
            <motion.div
              className="flex items-center gap-2 mb-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                <motion.div
                  animate={{
                    rotate: isHovered ? [0, -10, 10, 0] : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <User className="w-3 h-3" strokeWidth={3} />
                </motion.div>
                <span>{username}</span>
              </div>
            </motion.div>
          )}

          <motion.h3
            className="text-xl font-medium text-foreground leading-tight line-clamp-1 mb-2 group-hover:underline underline-offset-4 decoration-1 transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            whileHover={{
              x: 2,
              transition: { duration: 0.2 },
            }}
          >
            {title}
          </motion.h3>

          <motion.div
            className="text-[15px] font-bold text-foreground/80 tracking-tighter mt-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <motion.span
              animate={{
                opacity: isHovered ? [1, 0.7, 1] : 1,
              }}
              transition={{
                duration: 1.5,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              {formattedPrice}
            </motion.span>
          </motion.div>
        </CardContent>

        {/* Card footer with magnetic button effect */}
        <CardFooter className="px-0 pb-4 flex items-center justify-between border-t border-border mt-auto pt-4">
          <motion.div
            className="w-full"
            whileHover={{
              scale: 1.02,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
              },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="sm"
              variant="outline"
              disabled={isAddingToCart}
              className={cn(
                "h-12 rounded-none w-full px-5 font-semibold text-[12px] uppercase tracking-wider border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 bg-transparent relative overflow-hidden group/button",
                isProductInCart &&
                  "bg-primary text-primary-foreground border-primary",
                isAddingToCart && "cursor-not-allowed opacity-70",
              )}
              onClick={handleAddToCart}
            >
              {/* Button shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{
                  x: isHovered ? ["100%", "-100%"] : "-100%",
                }}
                transition={{
                  duration: 1.5,
                  repeat: isHovered ? Infinity : 0,
                  ease: "linear",
                }}
              />

              <span className="relative z-10 flex items-center justify-center">
                {isAddingToCart ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                  </motion.div>
                ) : (
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ x: 2 }}
                  >
                    <motion.div
                      animate={{
                        rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      <ShoppingCartIcon className="w-4 h-4 mr-2" />
                    </motion.div>
                    {isProductInCart ? "Bỏ khỏi giỏ hàng" : "Thêm vào giỏ hàng"}
                  </motion.div>
                )}
              </span>
            </Button>
          </motion.div>
        </CardFooter>
      </div>
    </motion.div>
  );
};

export default BlueprintCard;
