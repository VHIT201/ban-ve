import { CommentProvider } from "@/components/modules/comments";
import { CommentList } from "@/components/modules/comments/comment-provider/shared";

const BlueprintDetailFeedback = () => {
  return (
    <div className="space-y-10 md:space-y-16">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        ĐÁNH GIÁ BẢN VẼ :
      </h2>

      <CommentProvider postId="blueprint-detail-001">
        <CommentList />
      </CommentProvider>
    </div>
  );
};

export default BlueprintDetailFeedback;
