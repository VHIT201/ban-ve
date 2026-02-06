import { CommentProvider } from "@/components/modules/comments";
import {
  CommentCreationForm,
  CommentList,
} from "@/components/modules/comments/comment-provider/shared";
import { FC } from "react";
import { Props } from "./lib/types";
import { useAuthStore } from "@/stores";
import { useShallow } from "zustand/shallow";

const BlueprintDetailFeedback: FC<Props> = (props) => {
  // Props
  const { content } = props;

  // Stores
  const authStore = useAuthStore(
    useShallow(({ isSignedIn }) => ({ isSignedIn }))
  );

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
          {authStore.isSignedIn && (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <CommentCreationForm />
            </div>
          )}
          <CommentList />
        </div>
      </CommentProvider>
    </div>
  );
};

export default BlueprintDetailFeedback;
