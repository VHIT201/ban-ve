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

const getCategoryColors = () => {
  return {
    bg: "bg-white",
    border: "border-gray-200/60",
    icon: "text-white",
    iconBg: "bg-primary",
    title: "text-gray-900",
    description: "text-gray-600",
    hover: {
      shadow: "hover:shadow-sm",
      icon: "group-hover:text-white",
      iconBg: "group-hover:-translate-y-2 transition-transform duration-500",
      border: "hover:border-gray-300/60",
      transform: "hover:-translate-y-0.5",
      bg: "hover:bg-primary/30 backdrop-blur-sm",
    },
  };
};

const CategoryItem = ({
  category,
  onClick,
  showDescription = true,
  className,
}: CategoryItemProps) => {
  const IconComponent = getCategoryIcon(category.name, category.slug);
  const colors = getCategoryColors();

  const handleClick = () => {
    onClick?.(category);
  };

  return (
    <Card
      className={cn(
        "border",
        "h-full flex flex-col",
        "group cursor-pointer transition-all duration-200",
        colors.bg,
        colors.border,
        colors.hover.bg,
        colors.hover.border,
        colors.hover.shadow,
        colors.hover.transform,
        className
      )}
      onClick={handleClick}
    >
      <CardContent className="p-5 flex flex-col h-full items-center justify-center">
        {/* Icon */}
        <div
          className={cn(
            "mb-4 shadow-lg size-12 flex items-center justify-center mx-auto",
            "p-2.5 rounded-full",
            colors.iconBg,
            colors.hover.iconBg
          )}
        >
          <IconComponent
            className={cn("w-5 h-5", colors.icon, colors.hover.icon)}
          />
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-semibold text-base mb-2",
            colors.title,
            "line-clamp-2 leading-tight"
          )}
        >
          {category.name}
        </h3>

        {/* Description - flexible height */}
        <div className="flex-1 mb-4  ">
          {showDescription && category.description && (
            <p
              className={cn(
                "text-sm leading-relaxed line-clamp-2 text-center",
                colors.description
              )}
            >
              {category.description}
            </p>
          )}
        </div>

        {/* Subtle arrow indicator - always at bottom */}
        <div className="flex justify-end mt-auto">
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all duration-200 opacity-0 group-hover:opacity-100" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryItem;
