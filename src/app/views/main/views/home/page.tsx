import { Blueprint, CartItem, Category } from "@/lib/types";
import { useKV } from "@github/spark/hooks";
import { Fragment, useMemo, useState } from "react";
import { blueprints } from "@/lib/data";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Magnet } from "lucide-react";
import { BlueprintCard } from "@/components/BlueprintCard";
import { BannerSection, CategoriesSection } from "./components";

const Home = () => {
  const [cart, setCart] = useKV<CartItem[]>("blueprint-cart", []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All"
  );

  const filteredBlueprints = useMemo(() => {
    return blueprints.filter((blueprint) => {
      const matchesSearch =
        searchQuery === "" ||
        blueprint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blueprint.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        blueprint.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || blueprint.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const updateLocalCart = (newCart: CartItem[]) => {
    try {
      localStorage.setItem("local-cart", JSON.stringify(newCart));
    } catch (error) {
      console.error("Error saving cart to localStorage : ", error);
    }
  };

  const handleAddToCart = (blueprint: Blueprint) => {
    setCart((currentCart) => {
      const cartItems = Array.isArray(currentCart) ? [...currentCart] : [];
      const existingItem = cartItems.find(
        (item) => item.blueprint.id === blueprint.id
      );
      let newCart;

      if (existingItem) {
        newCart = cartItems.map((item) =>
          item.blueprint.id === blueprint.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        toast.success("Đã cập nhật giỏ hàng", {
          description: `Tăng số lượng ${blueprint.title}`,
        });
      } else {
        newCart = [...cartItems, { blueprint, quantity: 1 }];
        toast.success("Đã thêm vào giỏ hàng", {
          description: blueprint.title,
        });
      }

      // Cập nhật localStorage
      updateLocalCart(newCart);
      return newCart;
    });
  };

  const handleViewDetails = (blueprint: Blueprint) => {
    setDialogOpen(true);
  };

  return (
    <Fragment>
      <BannerSection />
      <CategoriesSection />
      <main className="container mx-auto px-4 pt-4 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Bản Vẽ Nổi Bật
            </h2>
            <p className="text-muted-foreground">
              Tìm thấy {filteredBlueprints.length}{" "}
              {filteredBlueprints.length === 1 ? "thiết kế" : "thiết kế"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-lg">
              Sắp xếp: Mới nhất
            </Button>
          </div>
        </div>
        {filteredBlueprints.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBlueprints.map((blueprint) => (
              <BlueprintCard
                key={blueprint.id}
                blueprint={blueprint}
                onViewDetails={handleViewDetails}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-muted/30 rounded-2xl">
            <div className="bg-muted p-4 rounded-full mb-4">
              <Magnet size={32} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              Không tìm thấy bản vẽ
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Chúng tôi không tìm thấy bản vẽ nào phù hợp với tìm kiếm của bạn.
              Vui lòng điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Xóa tất cả bộ lọc
            </Button>
          </div>
        )}
      </main>
    </Fragment>
  );
};

export default Home;
