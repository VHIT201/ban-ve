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
  const handleClick = () => {
    onClick?.(category);
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden bg-white border border-gray-200/60",
        "h-full group cursor-pointer transition-all duration-300",
        "hover:border-gray-300 hover:shadow-lg hover:-translate-y-1",
        className,
      )}
      onClick={handleClick}
    >
      <CardContent className="p-6 flex flex-col h-full">
        {/* Content */}
        <div className="flex-1 flex flex-col text-center">
          {/* Title */}
          <h3 className="font-semibold text-base text-gray-900 mb-2 line-clamp-2 leading-snug">
            {category.name}
          </h3>

          {/* Description */}
          {showDescription && category.description && (
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
              {category.description}
            </p>
          )}

          {/* Action indicator */}
          <div className="flex items-center justify-center mt-auto pt-3 border-t border-gray-100 group-hover:border-gray-200 transition-colors">
            <span className="text-xs font-medium text-gray-600 flex items-center gap-1.5 transition-all duration-300 group-hover:text-gray-900 group-hover:gap-2">
              Xem thêm
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryItem;
