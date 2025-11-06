import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LucideMessageCircleQuestion,
  Ruler,
  Star,
  Upload,
  UserIcon,
} from "lucide-react";
import { ShoppingCart } from "@/components/ShoppingCart";
import { Blueprint, CartItem, Category } from "@/lib/types";
import { useKV } from "@github/spark/hooks";
import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { toast } from "sonner";
import { AuthDialog } from "@/components/modules/auth";
import { HeaderShoppingCart, HeaderUserProfile } from "./components";
import { useAuthStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import { Link } from "react-router-dom";
import { BASE_PATHS } from "@/constants/paths";

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <Ruler size={24} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight">
                Blueprint Marketplace
              </h1>
              <p className="text-xs text-muted-foreground">
                Premium Architectural Drawings
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-2xl px-4">
            <div className="relative">
              <LucideMessageCircleQuestion className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search blueprints by title, description or category..."
                className="pl-10 pr-4 py-2 rounded-xl border-border/50 focus-visible:ring-2 focus-visible:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center gap-4">
              {authStore.isSignedIn ? (
                <HeaderUserProfile />
              ) : (
                <Button
                  onClick={() => navigate(BASE_PATHS.auth.login.path)}
                  size="sm"
                  variant="outline"
                  className="gap-2 h-9 px-4 rounded-full border-border/40 hover:bg-accent/80 transition-colors"
                >
                  <UserIcon size={16} />
                  <span className="hidden sm:inline">Đăng nhập / Đăng ký</span>
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
