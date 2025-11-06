// Core
import { isUndefined } from "lodash-es";
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

// App
import { createStorage } from "@/utils/storage";

// Types
// States
interface States {
  isSignedIn: boolean;
  ssid: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiredAt: Date | null;
  storedUsername: string | null;
  storedPassword: string | null;
}

// Actions
interface SetStoreActionValues {
  isSignedIn?: States["isSignedIn"];
  ssid?: States["ssid"];
  accessToken?: States["accessToken"];
  refreshToken?: States["refreshToken"];
  expiredAt?: States["expiredAt"];
  storedUsername?: States["storedUsername"];
  storedPassword?: States["storedPassword"];
}

interface Actions {
  setStore: (values: SetStoreActionValues) => void;
  resetStore: () => void;
}

// Store
type Store = States & Actions;

// Constants
const INITIAL_STATES: States = {
  isSignedIn: false,
  ssid: null,
  accessToken: null,
  refreshToken: null,
  expiredAt: null,
  storedUsername: null,
  storedPassword: null,
};

// Define store
const authStore: StateCreator<Store> = (set) => ({
  // States
  ...INITIAL_STATES,

  // Methods
  setStore: ({
    isSignedIn,
    ssid,
    accessToken,
    refreshToken,
    expiredAt,
    storedUsername,
    storedPassword,
  }) =>
    set((state) => ({
      isSignedIn: isUndefined(isSignedIn) ? state.isSignedIn : isSignedIn,
      ssid: isUndefined(ssid) ? state.ssid : ssid,
      accessToken: isUndefined(accessToken) ? state.accessToken : accessToken,
      refreshToken: isUndefined(refreshToken)
        ? state.refreshToken
        : refreshToken,
      expiredAt: isUndefined(expiredAt) ? state.expiredAt : expiredAt,
      storedUsername: isUndefined(storedUsername)
        ? state.storedUsername
        : storedUsername,
      storedPassword: isUndefined(storedPassword)
        ? state.storedPassword
        : storedPassword,
    })),
  resetStore: () =>
    set({
      isSignedIn: INITIAL_STATES.isSignedIn,
      ssid: INITIAL_STATES.ssid,
      accessToken: INITIAL_STATES.accessToken,
      refreshToken: INITIAL_STATES.refreshToken,
      expiredAt: INITIAL_STATES.expiredAt,
    }),
});

const useAuthStore = create<Store>()(
  devtools(
    persist(authStore, {
      name: "auth-store",
      storage: createStorage<States>(),
    })
  )
);

export default useAuthStore;
