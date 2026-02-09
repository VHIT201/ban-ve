export interface CategoryDetailProps {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  subcategories?: CategoryDetailProps[];
  createdAt?: string;
  updatedAt?: string;
}
