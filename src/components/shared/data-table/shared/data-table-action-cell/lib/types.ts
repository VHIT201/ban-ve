import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface Action {
  label: string;
  icon: LucideIcon;
  onAction: () => void;
}

export interface Props {
  rowName?: string;
  actions?: Action[];
  extraActions?: ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
}
