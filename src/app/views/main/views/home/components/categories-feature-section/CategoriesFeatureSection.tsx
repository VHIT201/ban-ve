import { Card, CardContent } from "@/components/ui/card";
import Image from "@/components/ui/image";

import cartCategoryIcon from "@/assets/image/categories/cart-icon.png";
import drawCategoryIcon from "@/assets/image/categories/draw-icon.png";
import tradeCategoryIcon from "@/assets/image/categories/trader-icon.png";
import userCategoryIcon from "@/assets/image/categories/user-icon.png";
import softwareCategoryIcon from "@/assets/image/categories/software-icon.png";
import { useNavigate } from "react-router-dom";
import { BASE_PATHS } from "@/constants/paths";

interface BestSellingProduct {
  id: number;
  title: string;
  image: string;
}

const bestSellingProducts: BestSellingProduct[] = [
  {
    id: 1,
    title: "Dữ Liệu Doanh Nghiệp",
    image: cartCategoryIcon,
  },
  {
    id: 2,
    title: "Dữ Liệu Người Dùng",
    image: userCategoryIcon,
  },
  {
    id: 3,
    title: "Dữ Liệu Thương Mại",
    image: tradeCategoryIcon,
  },
  {
    id: 4,
    title: "Dữ liệu CNTT",
    image: softwareCategoryIcon,
  },
  {
    id: 5,
    title: "Dữ liệu Bản Vẽ",
    image: drawCategoryIcon,
  },
];

const CategoriesFeatureSection = () => {
  // Hooks
  const navigate = useNavigate();

  return (
    <section className="max-w-[1500px] mx-auto">
      <div className="flex items-end justify-between pb-2">
        <h2 className="text-xl uppercase font-semibold tracking-widest text-[#1a1a1a]">
          Danh mục dữ liệu nổi bật
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {bestSellingProducts.map((product) => (
          <Card
            key={product.id}
            onClick={() => navigate(BASE_PATHS.app.collections.path)}
            className=" cursor-pointer flex relative flex-col bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 p-0 rounded-none"
          >
            <CardContent className="flex flex-col flex-1 p-2">
              {/* Product Image */}
              <Image
                src={product.image}
                alt={product.title}
                className="object-contain size-20 mx-auto"
              />

              {/* Product Details */}
              <h3 className="text-base font-semibold text-center text-foreground line-clamp-2 mb-2">
                {product.title}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CategoriesFeatureSection;
