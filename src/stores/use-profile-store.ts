// Core
import { isUndefined } from "lodash-es";
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

// App
import { createStorage } from "@/utils/storage";

interface States {
  id: string | null;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  role: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

// Actions
interface SetStoreActionValues {
  id?: States["id"];
  username?: States["username"];
  email?: States["email"];
  fullName?: States["fullName"];
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
  username: "Unknown User",
  email: "Unknown Email",
  fullName: "Unknown Full Name",
  avatar: "https://via.placeholder.com/150",
  role: null,
  createdAt: null,
  updatedAt: null,
};

// Define store
const profileStore: StateCreator<ProfileStore> = (set) => ({
  // States
  ...INITIAL_STATES,

  // Actions
  setStore: ({
    id,
    username,
    email,
    fullName,
    avatar,
    role,
    createdAt,
    updatedAt,
  }) =>
    set((state) => ({
      id: isUndefined(id) ? state.id : id,
      username: isUndefined(username) ? state.username : username,
      email: isUndefined(email) ? state.email : email,
      fullName: isUndefined(fullName) ? state.fullName : fullName,
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
    })
  )
);

export default useProfileStore;
