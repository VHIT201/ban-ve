export interface ContentResponse {
  _id: string;
  title: string;
  description: string;
  
  category: {
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
