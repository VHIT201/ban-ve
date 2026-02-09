// Contact interface
export interface Contact {
  _id?: string;
  full_name: string;
  phone?: string;
  email?: string;
  title?: string;
  message?: string;
  is_read?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type ContactTableRow = Contact & { name: string };

export interface useContactTableColumnsProps {
  onDelete?: (contact: ContactTableRow) => void;
  onMarkAsRead?: (contact: ContactTableRow) => void;
  onViewDetails?: (contact: ContactTableRow) => void;
}
