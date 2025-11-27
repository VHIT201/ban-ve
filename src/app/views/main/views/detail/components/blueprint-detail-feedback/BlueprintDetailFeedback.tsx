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
    <div className="space-y-10 md:space-y-16">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        ĐÁNH GIÁ BẢN VẼ :
      </h2>

      <CommentProvider contentId={content._id}>
        {authStore.isSignedIn && <CommentCreationForm />}
        <CommentList />
      </CommentProvider>
    </div>
  );
};

export default BlueprintDetailFeedback;
