// Core
import { RouteObject, Navigate, redirect, Outlet } from "react-router-dom";

// App
import { BASE_PATHS, ROUTE_PATHS } from "@/constants/paths";

import { useAuthStore } from "@/stores";
// Admin route paths
const { admin } = ROUTE_PATHS;

// Admin routes
const adminRoutes: RouteObject = {
  path: admin.path,
  loader: () => {
    const isSignedIn = useAuthStore.getState().isSignedIn;
    if (!isSignedIn) {
      return redirect(BASE_PATHS.auth.login.path);
    }

    return null;
  },
  lazy: async () => {
    const { default: Admin } = await import("../layout");
    return {
      element: (
        <Admin>
          <Outlet />
        </Admin>
      ),
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
      path: "",
      children: [
        {
          path: admin.categories.path,
          lazy: async () => {
            const { default: Categories } =
              await import("../views/categories/layout");
            return {
              element: (
                <Categories>
                  <Outlet />
                </Categories>
              ),
            };
          },
        },
        {
          path: `${admin.categories.path}/detail/:id`,
          lazy: async () => {
            const { default: CategoryDetail } =
              await import("../views/categories/components/category-detail");
            return {
              element: <CategoryDetail />,
            };
          },
        },
      ],
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
