// Core
import { RouteObject } from "react-router-dom";

// App
import { ROUTE_PATHS } from "@/constants/paths";
import contentRoutes from "../views/contents/lib/routes";
import copyRightRoutes from "../views/copy-right/lib/routes";
import collaboratorRoutes from "../views/collaborators/lib/routes";
import paymentRoutes from "../views/payment/lib/routes";

import { Settings } from "lucide-react";
// Admin route paths
const { admin } = ROUTE_PATHS;

// Admin routes
const adminRoutes: RouteObject = {
  path: admin.path,
  lazy: async () => {
    const { default: Admin } = await import("../layout");
    return {
      element: <Admin />,
    };
  },
  children: [
    {
      index: true,
      lazy: async () => {
        const { default: Dashboard } = await import("../views/dashboard/page");
        return {
          element: <Dashboard />,
        };
      },
    },
    {
      path: admin.categories.path,
      lazy: async () => {
        const { default: Categories } = await import(
          "../views/categories/page"
        );
        return {
          element: <Categories />,
        };
      },
    },
    {
      path: admin.resources.path,
      lazy: async () => {
        const { default: Resources } = await import("../views/resources/page");
        return {
          element: <Resources />,
        };
      },
    },
    paymentRoutes,
    contentRoutes,
    copyRightRoutes,
    collaboratorRoutes,
    {
      path: "social",
      lazy: async () => {
        const { default: Social } = await import("../views/social/page");
        return {
          element: <Social />,
        };
      },
    },
    {
      path: "settings",
      children: [
        {
          path: "",
          lazy: async () => ({
            Component: (await import("../views/settings/page")).default,
          }),
        },
        {
          path: "account",
          lazy: async () => ({
            Component: (await import("../views/settings/account/page")).default,
          }),
        },
        {
          path: "appearance",
          lazy: async () => ({
            Component: (await import("../views/settings/appearance/page"))
              .default,
          }),
        },
        {
          path: "notifications",
          lazy: async () => ({
            Component: (await import("../views/settings/notifications/page"))
              .default,
          }),
        },
        {
          path: "display",
          lazy: async () => ({
            Component: (await import("../views/settings/display/page")).default,
          }),
        },
      ],
    },
  ],
};

export default adminRoutes;
