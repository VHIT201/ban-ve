"use client";

import { usePutApiAuthUpdateProfile } from "@/api/endpoints/auth";
import { PersonalFormView, type PersonalFormData } from "./components";
import { useProfileStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/error";

const Personal = () => {
  // Stores
  const profileStore = useProfileStore(
    useShallow(({ avatar, setStore }) => ({
      avatar,
      setStore,
    })),
  );

  // Mutations
  const updateUserProfileMutation = usePutApiAuthUpdateProfile();

  // Methods
  const handleUpdateProfile = async (data: PersonalFormData) => {
    try {
      await updateUserProfileMutation.mutateAsync({
        data: {
          avatar: profileStore.avatar,
          username: data.username,
          email: data.email,
        },
      });

      profileStore.setStore({
        avatar: profileStore.avatar,
        fullName: data.username,
        email: data.email,
      });
    } catch (error) {
      toast.error(
        extractErrorMessage(error) || "Cập nhật thông tin thất bại",
      );
    }
  };

  return (
    <div className="space-y-6">
      <PersonalFormView onSubmit={handleUpdateProfile} />
    </div>
  );
};

export default Personal;
