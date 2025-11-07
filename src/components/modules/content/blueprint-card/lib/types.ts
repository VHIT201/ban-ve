import { ContentResponse } from "@/api/types/content";

export interface Props {
  blueprint: ContentResponse;
  onViewDetails: (blueprint: ContentResponse) => void;
  onAddToCart: (blueprint: ContentResponse) => void;
}
