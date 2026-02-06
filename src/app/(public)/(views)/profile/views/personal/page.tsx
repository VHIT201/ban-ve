"use client";

import { usePutApiAuthUpdateProfile } from "@/api/endpoints/auth";
import { PersonalFormView } from "./components";
import { useProfileStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import { PersonalFormData } from "./components/personal-form-view/PersonalFormView";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/error";

function Personal() {
  const profileStore = useProfileStore(
    useShallow(({ avatar, setStore }) => ({
      avatar,
      setStore,
    })),
  );

  const updateUserProfileMutation = usePutApiAuthUpdateProfile();

  const handleUpdateProfile = async (data: PersonalFormData) => {
    try {
      await updateUserProfileMutation.mutateAsync({
        data: {
          avatar: profileStore.avatar,
          fullname: data.fullname,
          email: data.email,
        },
      });

      profileStore.setStore({
        avatar: profileStore.avatar,
        fullName: data.fullname,
        email: data.email,
      });
    } catch (error) {
      toast.error(
        extractErrorMessage(error) || "Cập nhật ảnh đại diện thất bại",
      );
    }
  };

  return (
    <div className="space-y-6">
      <PersonalFormView onSubmit={handleUpdateProfile} />
    </div>
  );
}

export default Personal;
