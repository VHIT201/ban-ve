// Core
import { FC, Fragment } from "react";
import { useShallow } from "zustand/shallow";

// App
import { User } from "@/api/models";
import { Response, ResponseData } from "@/api/types/base";
import { useGetApiAuthMe } from "@/api/endpoints/auth";
import { useAuthStore, useProfileStore } from "@/stores";

// Internal
import { Props } from "./lib/types";

const AuthGate: FC<Props> = (props) => {
  // Stores
  const authStore = useAuthStore(
    useShallow(({ isSignedIn }) => ({ isSignedIn })),
  );
  const profileStore = useProfileStore(
    useShallow(({ setStore }) => ({ setStore })),
  );

  // Queries
  const getProfileUserQuery = useGetApiAuthMe({
    query: {
      staleTime: Infinity,
      enabled: authStore.isSignedIn,
      select: (data) => (data as unknown as ResponseData<User>).data,
    },
  });

  if (getProfileUserQuery.isSuccess) {
    profileStore.setStore({
      username: getProfileUserQuery.data.username,
      email: getProfileUserQuery.data.email,
      role: getProfileUserQuery.data.role,
      avatar: getProfileUserQuery.data.avatar,
      createdAt: getProfileUserQuery.data.createdAt
        ? new Date(getProfileUserQuery.data.createdAt)
        : null,
      updatedAt: getProfileUserQuery.data.updatedAt
        ? new Date(getProfileUserQuery.data.updatedAt)
        : null,
    });
  }

  return <Fragment>{props.children}</Fragment>;
};

export default AuthGate;
