// Core
import { isUndefined } from "lodash-es";
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

// App
import { createStorage } from "@/utils/storage";

interface States {
  id: string | null;
  fullName: string | undefined;
  email: string | undefined;
  avatar: string;
  role: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

// Actions
interface SetStoreActionValues {
  id?: States["id"];
  fullName?: States["fullName"];
  email?: States["email"];
  avatar?: States["avatar"];
  role?: States["role"];
  createdAt?: States["createdAt"];
  updatedAt?: States["updatedAt"];
}

interface Actions {
  setStore: (values: SetStoreActionValues) => void;
  resetStore: () => void;
}

// Store
export type ProfileStore = States & Actions;

// Constants
export const INITIAL_STATES: States = {
  id: null,
  fullName: undefined,
  email: undefined,
  avatar: "",
  role: null,
  createdAt: null,
  updatedAt: null,
};

// Define store
const profileStore: StateCreator<ProfileStore> = (set) => ({
  // States
  ...INITIAL_STATES,

  // Actions
  setStore: ({ id, fullName, email, avatar, role, createdAt, updatedAt }) =>
    set((state) => ({
      id: isUndefined(id) ? state.id : id,
      fullName: isUndefined(fullName) ? state.fullName : fullName,
      email: isUndefined(email) ? state.email : email,
      avatar: isUndefined(avatar) ? state.avatar : avatar,
      role: isUndefined(role) ? state.role : role,
      createdAt: isUndefined(createdAt) ? state.createdAt : createdAt,
      updatedAt: isUndefined(updatedAt) ? state.updatedAt : updatedAt,
    })),
  resetStore: () => set({ ...INITIAL_STATES }),
});

export const useProfileStore = create<ProfileStore>()(
  devtools(
    persist(profileStore, {
      name: "blue-market-profile-store",
      storage: createStorage<States>(),
    }),
  ),
);

export default useProfileStore;
