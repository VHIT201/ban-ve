import { LucideIcon } from "lucide-react";

export interface Action {
  label: string;
  icon: LucideIcon;
  tooltip: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  onAction: () => void;
}

export interface Props {
  entityName: string;
  actions: Action[];
}
