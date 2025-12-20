// Core
import { RouteObject } from "react-router-dom";

// App
import { ROUTE_PATHS } from "@/constants/paths";
import { useAuthStore } from "@/stores";

// Order route paths
const {
  app: {
    profile: { order },
  },
} = ROUTE_PATHS;

// Order routes
const orderRoutes: RouteObject = {
  path: order.path,
  lazy: async () => {
    const { default: Order } = await import("../layout");
    return {
      element: <Order />,
    };
  },
  loader: () => {
    const isLoginedIn = useAuthStore.getState().isSignedIn;
    console.log("Is login : ", isLoginedIn);

    if (isLoginedIn) {
      return null;
    }

    throw new Response("Not Found", { status: 404 });
  },
  children: [
    {
      index: true,
      lazy: async () => {
        const { default: List } = await import("../views/order-list/page");
        return {
          element: <List />,
        };
      },
    },
    {
      path: order.list.path,
      lazy: async () => {
        const { default: List } = await import("../views/order-list/page");
        return {
          element: <List />,
        };
      },
    },
  ],
};

export default orderRoutes;
