import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryItemProps {
  category: Category;
  onClick?: (category: Category) => void;
  showDescription?: boolean;
  className?: string;
}

// Icon mapping for different category types
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
  return Building2; // Default icon
};

// Simple gradient colors inspired by the image
const getCategoryColors = (slug: string) => {
  const colorSchemes = {
    residential: {
      bg: "bg-linear-to-br from-sky-100/80 to-blue-200/60",
      icon: "text-blue-700",
      iconBg: "bg-white/90 backdrop-blur-sm",
    },
    commercial: {
      bg: "bg-linear-to-br from-emerald-100/80 to-green-200/60",
      icon: "text-emerald-700",
      iconBg: "bg-white/90 backdrop-blur-sm",
    },
    industrial: {
      bg: "bg-linear-to-br from-orange-100/80 to-amber-200/60",
      icon: "text-orange-700",
      iconBg: "bg-white/90 backdrop-blur-sm",
    },
    education: {
      bg: "bg-linear-to-br from-purple-100/80 to-violet-200/60",
      icon: "text-purple-700",
      iconBg: "bg-white/90 backdrop-blur-sm",
    },
    healthcare: {
      bg: "bg-linear-to-br from-rose-100/80 to-pink-200/60",
      icon: "text-rose-700",
      iconBg: "bg-white/90 backdrop-blur-sm",
    },
    landscape: {
      bg: "bg-linear-to-br from-green-100/80 to-lime-200/60",
      icon: "text-green-700",
      iconBg: "bg-white/90 backdrop-blur-sm",
    },
    energy: {
      bg: "bg-linear-to-br from-yellow-100/80 to-amber-200/60",
      icon: "text-yellow-700",
      iconBg: "bg-white/90 backdrop-blur-sm",
    },
    infrastructure: {
      bg: "bg-linear-to-br from-slate-100/80 to-gray-200/60",
      icon: "text-slate-700",
      iconBg: "bg-white/90 backdrop-blur-sm",
    },
    default: {
      bg: "bg-linear-to-br from-gray-100/80 to-slate-200/60",
      icon: "text-gray-700",
      iconBg: "bg-white/90 backdrop-blur-sm",
    },
  };

  const slugLower = slug.toLowerCase();

  if (slugLower.includes("residential") || slugLower.includes("nha-o"))
    return colorSchemes.residential;
  if (slugLower.includes("commercial") || slugLower.includes("thuong-mai"))
    return colorSchemes.commercial;
  if (slugLower.includes("industrial") || slugLower.includes("cong-nghiep"))
    return colorSchemes.industrial;
  if (slugLower.includes("education") || slugLower.includes("giao-duc"))
    return colorSchemes.education;
  if (slugLower.includes("healthcare") || slugLower.includes("y-te"))
    return colorSchemes.healthcare;
  if (slugLower.includes("landscape") || slugLower.includes("cong-vien"))
    return colorSchemes.landscape;
  if (slugLower.includes("energy") || slugLower.includes("nang-luong"))
    return colorSchemes.energy;
  if (slugLower.includes("infrastructure") || slugLower.includes("ha-tang"))
    return colorSchemes.infrastructure;

  return colorSchemes.default;
};

const CategoryItem = ({
  category,
  onClick,
  showDescription = true,
  className,
}: CategoryItemProps) => {
  const IconComponent = getCategoryIcon(category.name, category.slug);
  const colors = getCategoryColors(category.slug);

  const handleClick = () => {
    onClick?.(category);
  };

  // Single design variant - simple card with gradient background
  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 border-0 shadow-sm",
        "hover:shadow-lg hover:-translate-y-1",
        colors.bg,
        className
      )}
      onClick={handleClick}
    >
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white text-lg truncate">
            {category.name}
          </h3>
          <div className={cn("p-2 rounded-lg shrink-0", colors.iconBg)}>
            <IconComponent className={cn("w-5 h-5", colors.icon)} />
          </div>
        </div>

        {showDescription && category.description && (
          <p className="text-white/80 text-sm line-clamp-2">
            {category.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryItem;
