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
    useShallow(({ avatar, fullName, email, setStore }) => ({
      avatar,
      fullName,
      email,
      setStore,
    })),
  );

  const updateUserProfileMutation = usePutApiAuthUpdateProfile();

  const handleUpdateProfile = async (data: PersonalFormData) => {
    try {
      const response = await updateUserProfileMutation.mutateAsync({
        data: {
          fullname: data.fullname,
          email: data.email,
        },
      });

      // Cập nhật store với thông tin từ server
      if (response.data) {
        profileStore.setStore({
          avatar: response.data.avatar || profileStore.avatar,
          fullName: response.data.fullname,
          email: response.data.email,
        });
        toast.success("Cập nhật thông tin thành công");
      }
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
}

export default Personal;
