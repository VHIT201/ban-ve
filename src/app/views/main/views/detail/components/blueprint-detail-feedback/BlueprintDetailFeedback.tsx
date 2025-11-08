import { CommentProvider } from "@/components/modules/comments";
import { CommentList } from "@/components/modules/comments/comment-provider/shared";

const BlueprintDetailFeedback = () => {
  return (
    <div className="space-y-6">
      <h1>ĐÁNH GIÁ BẢN VẼ :</h1>

      <CommentProvider postId="blueprint-detail-001">
        <CommentList />
      </CommentProvider>
    </div>
  );
};

export default BlueprintDetailFeedback;
