import { create } from "domain";

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
    collections: { path: "collections" },
    payment: { path: "payment" },
  },

  admin: {
    path: "admin",
    categories: { path: "categories" },
    contents: {
      path: "contents",
      create: { path: "create" },
      detail: { path: "edit/:id" },
    },
    resources: { path: "resources" },
    copyRight: { path: "copy-right", detail: { path: "detail/:id" } },
    collaborators: { path: "collaborators", detail: { path: "detail/:id" } },
  },
};

export const BASE_PATHS = {
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
  admin: {
    path: "/admin",
    categories: { path: "/admin/categories" },
    contents: {
      path: "/admin/contents",
      create: { path: "/admin/contents/create" },
      detail: { path: "/admin/contents/:id" },
    },
    resources: { path: "/admin/resources" },
    copyRight: { path: "/admin/copy-right" },
  },
};
