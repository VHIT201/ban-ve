import { cn } from "@/utils/ui";
import { StarIcon } from "lucide-react";
import { FC, useState } from "react";

interface Props {
  view?: boolean;
  value?: number;
  onChange?: (value: number) => void;
  className?: {
    icon?: string;
    container?: string;
  };
}

const RatingStar: FC<Props> = (props) => {
  // Props
  const { value = 0, onChange, className, view = false } = props;

  // States
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className={cn("flex gap-1", className?.container)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          className={cn("transition-transform", !view && "hover:scale-110")}
          key={star}
          onClick={() => (view ? undefined : onChange?.(star))}
          onMouseEnter={() => !view && setHoverRating(star)}
          onMouseLeave={() => !view && setHoverRating(0)}
          type="button"
        >
          <StarIcon
            strokeWidth={1.5}
            className={cn(
              view ? "cursor-default select-none " : "cursor-pointer",
              "h-8 w-8 transition-colors",
              (hoverRating || value) >= star
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground/50",
              className?.icon,
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default RatingStar;
