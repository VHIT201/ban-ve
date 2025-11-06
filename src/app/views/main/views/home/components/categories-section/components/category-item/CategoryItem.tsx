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
  variant?: "default" | "compact" | "featured";
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

// Color schemes for different categories
const getCategoryColors = (slug: string) => {
  const colorSchemes = {
    residential: {
      bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
      border: "border-blue-200/60",
      icon: "text-blue-600",
      iconBg: "bg-blue-100",
      accent: "bg-blue-500",
    },
    commercial: {
      bg: "bg-gradient-to-br from-emerald-50 to-green-50",
      border: "border-emerald-200/60",
      icon: "text-emerald-600",
      iconBg: "bg-emerald-100",
      accent: "bg-emerald-500",
    },
    industrial: {
      bg: "bg-gradient-to-br from-orange-50 to-amber-50",
      border: "border-orange-200/60",
      icon: "text-orange-600",
      iconBg: "bg-orange-100",
      accent: "bg-orange-500",
    },
    education: {
      bg: "bg-gradient-to-br from-purple-50 to-violet-50",
      border: "border-purple-200/60",
      icon: "text-purple-600",
      iconBg: "bg-purple-100",
      accent: "bg-purple-500",
    },
    healthcare: {
      bg: "bg-gradient-to-br from-red-50 to-pink-50",
      border: "border-red-200/60",
      icon: "text-red-600",
      iconBg: "bg-red-100",
      accent: "bg-red-500",
    },
    landscape: {
      bg: "bg-gradient-to-br from-green-50 to-lime-50",
      border: "border-green-200/60",
      icon: "text-green-600",
      iconBg: "bg-green-100",
      accent: "bg-green-500",
    },
    default: {
      bg: "bg-gradient-to-br from-slate-50 to-gray-50",
      border: "border-slate-200/60",
      icon: "text-slate-600",
      iconBg: "bg-slate-100",
      accent: "bg-slate-500",
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

  return colorSchemes.default;
};

const CategoryItem = ({
  category,
  onClick,
  variant = "default",
  showDescription = true,
  className,
}: CategoryItemProps) => {
  const IconComponent = getCategoryIcon(category.name, category.slug);
  const colors = getCategoryColors(category.slug);

  const handleClick = () => {
    onClick?.(category);
  };

  if (variant === "compact") {
    return (
      <Button
        variant="ghost"
        className={cn(
          "h-auto p-3 justify-start group",
          "hover:bg-accent/50 transition-all duration-200",
          className
        )}
        onClick={handleClick}
      >
        <div className={cn("p-2 rounded-lg mr-3", colors.iconBg)}>
          <IconComponent className={cn("w-4 h-4", colors.icon)} />
        </div>
        <div className="text-left">
          <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
            {category.name}
          </p>
          {showDescription && category.description && (
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
              {category.description}
            </p>
          )}
        </div>
        <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </Button>
    );
  }

  if (variant === "featured") {
    return (
      <Card
        className={cn(
          "group cursor-pointer border-2 transition-all duration-300",
          "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10",
          "hover:-translate-y-1",
          colors.border,
          className
        )}
        onClick={handleClick}
      >
        <CardContent className={cn("p-6", colors.bg)}>
          <div className="flex items-start justify-between mb-4">
            <div className={cn("p-3 rounded-xl", colors.iconBg)}>
              <IconComponent className={cn("w-6 h-6", colors.icon)} />
            </div>
            <Badge variant="secondary" className="text-xs">
              Nổi bật
            </Badge>
          </div>

          <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
            {category.name}
          </h3>

          {showDescription && category.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {category.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className={cn("w-8 h-1 rounded-full", colors.accent)} />
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300",
        "hover:border-primary/40 hover:shadow-md hover:shadow-primary/5",
        "hover:-translate-y-0.5",
        colors.border,
        className
      )}
      onClick={handleClick}
    >
      <CardContent className={cn("p-4", colors.bg)}>
        <div className="flex items-center gap-3">
          <div className={cn("p-2.5 rounded-xl shrink-0", colors.iconBg)}>
            <IconComponent className={cn("w-5 h-5", colors.icon)} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {category.name}
            </h3>
            {showDescription && category.description && (
              <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                {category.description}
              </p>
            )}
          </div>

          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryItem;
