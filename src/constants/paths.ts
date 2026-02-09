export const ROUTE_PATHS = {
  auth: {
    path: "auth",
    login: { path: "login" },
    register: { path: "register" },
    forgot: { path: "forgot" },
  },

  app: {
    path: "/",
    profile: {
      path: "profile",
      personal: { path: "personal" },
      collaborator: { path: "collaborator" },
      history: { path: "history" },
      order: {
        path: "order",
        list: { path: "list" },
        detail: { path: "detail/:id" },
      },
    },
    downloads: { path: "downloads" },
    detail: { path: "detail/:id" },
    collections: { path: "collections" },
    payment: { path: "payment" },
    setting: { path: "setting" },
    search: { path: "search" },
    terms: { path: "terms" },
    privacy: { path: "privacy" },
    contact: { path: "contact" },
    cookiePolicy: { path: "cookie-policy" },
  },

  admin: {
    path: "admin",
    dashboard: { path: "dashboard" },
    categories: { path: "categories", detail: { path: ":id" } },
    contents: {
      path: "contents",
      create: { path: "create" },
      detail: { path: "edit/:id" },
    },
    resources: { path: "resources" },
    copyRight: { path: "copy-right", detail: { path: "detail/:id" } },
    collaborators: {
      path: "collaborators",
      detail: { path: "detail/:id" },
      edit: { path: "edit/:id" },
    },
    payments: { path: "payments" },
  },

  collaborator: {
    path: "collaborator",
    upload: { path: "upload" },
    documents: { path: "documents" },
    salesStats: { path: "sales-stats" },
    earnings: { path: "earnings" },
    payments: { path: "payments" },
    settings: { path: "settings" },
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
      collaborator: { path: "/profile/collaborator" },
      history: { path: "/profile/history" },
      order: {
        path: "/profile/order",
        list: { path: "/profile/order/list" },
        detail: { path: "/profile/order/detail/:id" },
      },
    },
    detail: { path: "/detail/:id" },
    collections: { path: "/collections" },
    search: { path: "/search" },
    setting: { path: "/setting" },
    payment: { path: "/payment" },
  },
  home: { path: "/" },
  checkout: { path: "/checkout" },
  upload: { path: "/upload" },
  admin: {
    path: "/admin",
    dashboard: { path: "/admin/dashboard" },
    categories: { path: "/admin/categories" },
    contacts: { path: "/admin/contacts" },
    contents: {
      path: "/admin/contents",
      create: { path: "/admin/contents/create" },
      detail: { path: "/admin/contents/:id" },
      edit: { path: "/admin/contents/edit/:id" },
    },
    resources: { path: "/admin/resources" },
    copyRight: { path: "/admin/copy-right" },
    collaborators: {
      path: "/admin/collaborators",
      detail: { path: "/admin/collaborators/detail/:id" },
      edit: { path: "/admin/collaborators/edit/:id" },
    },
    payments: { path: "/admin/payments" },
  },
};
