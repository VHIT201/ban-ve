// Core
import { RouteObject } from "react-router-dom";

// App
import { ROUTE_PATHS } from "@/constants/paths";
import contentRoutes from "../views/contents/lib/routes";
import copyRightRoutes from "../views/copy-right/lib/routes";
import collaboratorRoutes from "../views/collaborators/lib/routes";

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
    {
      path: admin.resources.path,
      lazy: async () => {
        const { default: Resources } = await import("../views/resources/page");
        return {
          element: <Resources />,
        };
      },
    },
    contentRoutes,
    copyRightRoutes,
    collaboratorRoutes,
  ],
};

export default adminRoutes;
