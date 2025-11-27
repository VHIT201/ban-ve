// Core
import { RouteObject } from "react-router-dom";

// App
import { ROUTE_PATHS } from "@/constants/paths";

// Content route paths
const {
  admin: { contents },
} = ROUTE_PATHS;

// Content routes
const contentRoutes: RouteObject = {
  path: contents.path,
  lazy: async () => {
    const { default: Content } = await import("../layout");
    return {
      element: <Content />,
    };
  },
  children: [
    {
      index: true,
      lazy: async () => {
        const { default: ContentList } = await import(
          "../views/content-list/page"
        );
        return {
          element: <ContentList />,
        };
      },
    },
    {
      path: contents.path,
      lazy: async () => {
        const { default: ContentList } = await import(
          "../views/content-list/page"
        );
        return {
          element: <ContentList />,
        };
      },
    },
    {
      path: contents.detail.path,
      lazy: async () => {
        const { default: ContentDetail } = await import(
          "../views/content-detail/page"
        );
        return {
          element: <ContentDetail />,
        };
      },
    },
    {
      path: contents.create.path,
      lazy: async () => {
        const { default: ContentCreate } = await import(
          "../views/content-create/page"
        );
        return {
          element: <ContentCreate />,
        };
      },
    },
  ],
};

export default contentRoutes;
