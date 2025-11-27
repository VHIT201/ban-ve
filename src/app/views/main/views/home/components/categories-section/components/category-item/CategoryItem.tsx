import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/api/models/category";
import {
  ArrowRight,
  Building2,
  Home,
  Factory,
  School,
  Hospital,
  ShoppingBag,
  TreePine,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryItemProps {
  category: Category;
  onClick?: (category: Category) => void;
  showDescription?: boolean;
  className?: string;
}

const getCategoryIcon = (categoryName: string, slug: string) => {
  const name = categoryName.toLowerCase();
  const slugLower = slug.toLowerCase();

  if (
    name.includes("nhà ở") ||
    name.includes("residential") ||
    slugLower.includes("residential")
  ) {
    return Home;
  }
  if (
    name.includes("thương mại") ||
    name.includes("commercial") ||
    slugLower.includes("commercial")
  ) {
    return ShoppingBag;
  }
  if (
    name.includes("công nghiệp") ||
    name.includes("industrial") ||
    slugLower.includes("industrial")
  ) {
    return Factory;
  }
  if (
    name.includes("giáo dục") ||
    name.includes("education") ||
    slugLower.includes("school")
  ) {
    return School;
  }
  if (
    name.includes("y tế") ||
    name.includes("hospital") ||
    slugLower.includes("hospital")
  ) {
    return Hospital;
  }
  if (
    name.includes("công viên") ||
    name.includes("landscape") ||
    slugLower.includes("landscape")
  ) {
    return TreePine;
  }
  if (
    name.includes("năng lượng") ||
    name.includes("energy") ||
    slugLower.includes("energy")
  ) {
    return Zap;
  }
  return Building2;
};

const CategoryItem = ({
  category,
  onClick,
  showDescription = true,
  className,
}: CategoryItemProps) => {
  const IconComponent = getCategoryIcon(category.name, category.slug);

  const handleClick = () => {
    onClick?.(category);
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 bg-white/50 backdrop-blur-sm",
        "h-full group cursor-pointer transition-all duration-300 ease-out",
        "hover:bg-white hover:shadow-xl hover:shadow-gray-200/30",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-gray-50/80 before:to-gray-100/40",
        "before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        className
      )}
      onClick={handleClick}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-100/60 to-gray-200/30 rounded-full blur-2xl -translate-y-8 translate-x-8 transition-all duration-500 group-hover:scale-150 group-hover:bg-gradient-to-br group-hover:from-gray-200/40 group-hover:to-gray-300/20" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-linear-to-tr from-gray-50/40 to-gray-100/20 rounded-full blur-xl translate-y-4 -translate-x-4 transition-all duration-500 group-hover:scale-125" />

      <CardContent className="relative z-10 p-6 flex flex-col h-full">
        {/* Icon Container */}
        <div className="mb-6 relative">
          <div className="size-16 flex items-center justify-center mx-auto relative">
            {/* Icon background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gray-400/20" />

            {/* Icon */}
            <IconComponent className="relative z-10 w-7 h-7 text-white transition-all duration-300 group-hover:scale-110" />

            {/* Shine effect */}
            <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col text-center">
          {/* Title */}
          <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 leading-tight transition-colors duration-300 group-hover:text-gray-800">
            {category.name}
          </h3>

          {/* Description */}
          <div className="flex-1 mb-4">
            {showDescription && category.description && (
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 transition-colors duration-300 group-hover:text-gray-700">
                {category.description}
              </p>
            )}
          </div>

          {/* Action indicator */}
          <div className="flex items-center justify-center mt-auto pt-2">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 transition-all duration-300 group-hover:text-gray-700 group-hover:gap-3">
              <span>Khám phá</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Hover border effect */}
      </CardContent>
    </Card>
  );
};

export default CategoryItem;
