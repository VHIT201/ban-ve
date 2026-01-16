export interface ContentResponse {
  _id: string;
  title?: string;
  description?: string;

  category?: {
    _id: string;
    name: string;
    slug: string;
    description: string;
  };

  images: string[];

  file_id?: {
    _id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  };
  price?: number;
  status?: string;
  createdBy?: {
    _id: string;
    username: string;
    email?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ContentProduct {
  _id: string;
  title?: string;
  description?: string;

  category?: {
    _id: string;
    name: string;
    slug: string;
    description: string;
  };

  images: string[];

  file_id?: {
    _id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  };
  price?: number;
  status?: string;
  createdBy?: {
    _id: string;
    username: string;
    email?: string;
  };
  createdAt?: string;
  updatedAt?: string;
  downloadCount?: number;
  purchaseCount?: number;
}

export interface ContentResponseDetail {
  _id: string;
  title: string;
  description: string;

  category_id: {
    _id: string;
    name: string;
    slug: string;
    description: string;
  };

  file_id: {
    _id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  };
  price: number;
  status: string;
  createdBy: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}
