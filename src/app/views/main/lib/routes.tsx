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
      path: app.payment.path,
      lazy: async () => {
        const { default: Payment } = await import("../views/payment/page");
        return {
          element: <Payment />,
        };
      },
    },
    { ...profileRoutes },
  ],
};

export default mainRoutes;
