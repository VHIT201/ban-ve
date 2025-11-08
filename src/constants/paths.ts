export const ROUTE_PATHS = {
  auth: {
    path: "auth",
    login: { path: "login" },
    register: { path: "register" },
  },

  app: {
    path: "/",
    profile: {
      path: "profile",
      personal: { path: "personal" },
      history: { path: "history" },
    },
    detail: { path: "detail/:id" },
  },
};

export const BASE_PATHS = {
  admin: { path: "/admin" },
  auth: {
    path: "/auth",
    login: { path: "/auth/login" },
    register: { path: "/auth/register" },
    forgot: { path: "/auth/forgot" },
  },
  app: {
    path: "/",
    profile: {
      path: "/profile",
      personal: { path: "/profile/personal" },
      history: { path: "/profile/history" },
    },
    setting: { path: "/setting" },
  },
  home: { path: "/" },
  checkout: { path: "/checkout" },
  upload: { path: "/upload" },
};
