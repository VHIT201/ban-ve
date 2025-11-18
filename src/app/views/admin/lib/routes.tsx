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
  children: [],
};

export default adminRoutes;
