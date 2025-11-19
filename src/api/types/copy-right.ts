export interface CopyRightReport {
  _id: string;
  reporterId: {
    _id: string;
    username: string;
    email: string;
  };
  contentId: {
    _id: string;
    title: string;
  };
  violationType: "copyright" | "other" | string;
  description: string;
  status: "pending" | "approved" | "rejected" | string;
  evidence: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
