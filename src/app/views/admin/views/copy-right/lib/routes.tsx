// Core
import { RouteObject } from "react-router-dom";

// App
import { ROUTE_PATHS } from "@/constants/paths";

// Content route paths
const {
  admin: { copyRight },
} = ROUTE_PATHS;

// Content routes
const copyRightRoutes: RouteObject = {
  path: copyRight.path,
  lazy: async () => {
    const { default: CopyRight } = await import("../layout");
    return {
      element: <CopyRight />,
    };
  },
  children: [
    {
      index: true,
      lazy: async () => {
        const { default: CopyRightList } = await import(
          "../views/copy-right-list/page"
        );
        return {
          element: <CopyRightList />,
        };
      },
    },
    {
      path: copyRight.detail.path,
      lazy: async () => {
        const { default: CopyRightDetail } = await import(
          "../views/copy-right-detail/page"
        );
        return {
          element: <CopyRightDetail />,
        };
      },
    },
  ],
};

export default copyRightRoutes;
