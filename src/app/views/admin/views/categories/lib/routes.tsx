// Core
import { RouteObject, Navigate, redirect } from "react-router-dom";

// App
import { BASE_PATHS, ROUTE_PATHS } from "@/constants/paths";
import { useAuthStore } from "@/stores";

// Admin route paths
const {
  admin: { categories },
} = ROUTE_PATHS;

// Admin routes
const categoryRoutes: RouteObject = {
  path: categories.path,
  lazy: async () => {
    const { default: Categories } = await import("../layout");
    return {
      element: <Categories />,
    };
  },
  children: [
    {
      index: true,
      lazy: async () => {
        const { default: CategoryList } = await import("../views/list/page");
        return {
          element: <CategoryList />,
        };
      },
    },
    {
      path: categories.path,
      lazy: async () => {
        const { default: CategoryList } = await import("../views/list/page");
        return {
          element: <CategoryList />,
        };
      },
    },
    {
      path: categories.detail.path,
      lazy: async () => {
        const { default: CategoryList } = await import("../views/list/page");
        return {
          element: <CategoryList />,
        };
      },
    },
  ],
};

export default categoryRoutes;
