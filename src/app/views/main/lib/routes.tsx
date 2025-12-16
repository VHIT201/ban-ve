// Core
import { RouteObject } from "react-router-dom";

// App
import { ROUTE_PATHS } from "@/constants/paths";
import profileRoutes from "../views/profile/lib/routes";

// Main route paths
const { app } = ROUTE_PATHS;

// Main routes
const mainRoutes: RouteObject = {
  path: app.path,
  lazy: async () => {
    const { default: Main } = await import("../layout");
    return {
      element: <Main />,
    };
  },
  children: [
    {
      index: true,
      lazy: async () => {
        const { default: Home } = await import("../views/home/page");
        return {
          element: <Home />,
        };
      },
    },
    {
      path: app.detail.path,
      lazy: async () => {
        const { default: Detail } = await import("../views/detail/page");
        return {
          element: <Detail />,
        };
      },
    },
    {
      path: app.collections.path,
      lazy: async () => {
        const { default: Collections } = await import(
          "../views/collections/page"
        );
        return {
          element: <Collections />,
        };
      },
    },
    {
      path: app.search.path,
      lazy: async () => {
        const { default: SearchResults } = await import("../views/search/SearchResults");
        return {
          element: <SearchResults />,
        };
      },
    },
    {
      path: app.setting.path,
      lazy: async () => {
        const { default: Settings } = await import("../pages/setting/page");
        return {
          element: <Settings />,
        };
      },
    },
    {
      path: app.payment.path,
      lazy: async () => {
        const { default: Payment } = await import("../views/payment/page");
        return {
          element: <Payment />,
        };
      },
    },
    {
      path: app.terms.path,
      lazy: async () => {
        const { default: Terms } = await import("../views/terms/page");
        return {
          element: <Terms />,
        };
      },
    },
    { ...profileRoutes },
  ],
};

export default mainRoutes;
