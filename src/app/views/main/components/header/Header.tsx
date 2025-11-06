import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Ruler,
  LogIn,
  Sparkles,
  DraftingCompassIcon,
  UserIcon,
} from "lucide-react";
import { CartItem } from "@/lib/types";
import { useKV } from "@github/spark/hooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { HeaderShoppingCart, HeaderUserProfile } from "./components";
import { useAuthStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import { Link } from "react-router-dom";
import { BASE_PATHS } from "@/constants/paths";
import { cn } from "@/lib/utils";

const Header = () => {
  // Stores
  const authStore = useAuthStore(
    useShallow(({ isSignedIn }) => ({
      isSignedIn,
    }))
  );

  // Hooks
  const [cart, setCart] = useKV<CartItem[]>("blueprint-cart", []);
  const cartItems = cart ?? [];
  const [searchQuery, setSearchQuery] = useState("");
  const [isSlideDown, setIsSlideDown] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY > 200 && currentScrollY > lastScrollY) {
            setIsSlideDown(true);
          } else if (currentScrollY <= lastScrollY || currentScrollY <= 100) {
            setIsSlideDown(false);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateLocalCart = (newCart: CartItem[]) => {
    try {
      localStorage.setItem("local-cart", JSON.stringify(newCart));
    } catch (error) {
      console.error("Error saving cart to localStorage: ", error);
    }
  };

  const handleUpdateQuantity = (blueprintId: string, quantity: number) => {
    setCart((currentCart) => {
      const cartItems = Array.isArray(currentCart) ? [...currentCart] : [];
      const newCart = cartItems.map((item) =>
        item.blueprint.id === blueprintId ? { ...item, quantity } : item
      );

      // Cập nhật localStorage
      updateLocalCart(newCart);
      return newCart;
    });
  };

  const handleRemoveItem = (blueprintId: string) => {
    setCart((currentCart) => {
      const cartItems = Array.isArray(currentCart) ? [...currentCart] : [];
      const newCart = cartItems.filter(
        (item) => item.blueprint.id !== blueprintId
      );

      // Cập nhật localStorage
      updateLocalCart(newCart);

      // Hiển thị thông báo
      const removedItem = cartItems.find(
        (item) => item.blueprint.id === blueprintId
      );
      if (removedItem) {
        toast.info("Đã xóa khỏi giỏ hàng", {
          description: removedItem.blueprint.title,
        });
      }

      return newCart;
    });
  };

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống");
      return;
    }
    navigate("/checkout");
  };

  return (
    <header>
      {/* Dynamic Header */}
      <div
        className={cn(
          "fixed top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-border/40 supports-backdrop-filter:bg-background/60",
          "transition-transform duration-300 ease-in-out",
          isSlideDown ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-18">
            {/* Logo Section */}
            <Link
              to="/"
              className="flex items-center gap-3 group transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="relative">
                <div className="flex items-center justify-center size-10 rounded-full bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300">
                  <DraftingCompassIcon strokeWidth={2} className="size-6" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                  Marketplace Blueprint
                </h1>
                <p className="text-xs text-muted-foreground/80 font-medium">
                  Premium Blueprints
                </p>
              </div>
            </Link>
            {/* Search Section */}
            <div className="flex-1 max-w-xl mx-6">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm bản vẽ..."
                  className={cn(
                    "pl-10 pr-4 h-10 rounded-full border-border/40 bg-background/50",
                    "focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/40",
                    "placeholder:text-muted-foreground/60 transition-all duration-200",
                    "hover:border-border/60 hover:bg-background/80"
                  )}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            {/* Actions Section */}
            <div className="flex items-center gap-3">
              {authStore.isSignedIn ? (
                <HeaderUserProfile />
              ) : (
                <Button
                  onClick={() => navigate(BASE_PATHS.auth.login.path)}
                  size="sm"
                  variant="outline"
                  className={cn(
                    "gap-2 h-10 px-4 rounded-full border-border/40",
                    "hover:bg-primary hover:border-border/60",
                    "transition-all duration-200 font-medium",
                    "shadow-sm hover:shadow-md"
                  )}
                >
                  <UserIcon className="size-4" />
                  <span className="hidden sm:inline">Đăng nhập</span>
                </Button>
              )}
              <HeaderShoppingCart
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Static Header */}
      <div
        className={cn(
          "relative top-0 z-50 w-full bg-white backdrop-blur-xl border-b border-border/40 supports-backdrop-filter:bg-background/60",
          "transition-transform duration-300 ease-in-out"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <Link
              to="/"
              className="flex items-center gap-3 group transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="relative">
                <div className="flex items-center justify-center size-10 md:size-12 rounded-full bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300">
                  <DraftingCompassIcon strokeWidth={2} className="size-8" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                  Marketplace Blueprint
                </h1>
                <p className="text-xs text-muted-foreground/80 font-medium">
                  Premium Blueprints
                </p>
              </div>
            </Link>
            {/* Search Section */}
            <div className="flex-1 max-w-xl mx-6">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm bản vẽ..."
                  className={cn(
                    "pl-10 pr-4 h-10 rounded-full border-border/40 bg-background/50",
                    "focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/40",
                    "placeholder:text-muted-foreground/60 transition-all duration-200",
                    "hover:border-border/60 hover:bg-background/80"
                  )}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            {/* Actions Section */}
            <div className="flex items-center gap-3">
              {authStore.isSignedIn ? (
                <HeaderUserProfile />
              ) : (
                <Button
                  onClick={() => navigate(BASE_PATHS.auth.login.path)}
                  size="sm"
                  variant="outline"
                  className={cn(
                    "gap-2 h-10 px-4 rounded-full border-border/40",
                    "hover:bg-primary hover:border-border/60",
                    "transition-all duration-200 font-medium",
                    "shadow-sm hover:shadow-md"
                  )}
                >
                  <UserIcon className="size-4" />
                  <span className="hidden sm:inline">Đăng nhập</span>
                </Button>
              )}
              <HeaderShoppingCart
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
