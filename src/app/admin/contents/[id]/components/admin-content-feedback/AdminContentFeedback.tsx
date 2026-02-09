import { FC } from "react";
import { Props } from "./lib/types";
import { CommentProvider } from "@/components/modules/comments";
import { CommentList } from "@/components/modules/comments/comment-provider/shared";

const AdminContentFeedback: FC<Props> = (props) => {
  // Props
  const { content } = props;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Đánh giá & Nhận xét
        </h2>
        <p className="text-sm text-gray-600">
          Chia sẻ trải nghiệm của bạn về sản phẩm này
        </p>
      </div>

      <CommentProvider contentId={content._id}>
        <div className="space-y-8">
          <CommentList />
        </div>
      </CommentProvider>
    </div>
  );
};

export default AdminContentFeedback;
