// Core
import { RouteObject } from "react-router-dom";

// App
import { ROUTE_PATHS } from "@/constants/paths";

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
  ],
};

export default adminRoutes;
