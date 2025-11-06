// Core
import { RouteObject } from "react-router-dom";

// App
import { ROUTE_PATHS } from "@/constants/paths";

// Auth route paths
const { auth } = ROUTE_PATHS;

// Auth routes
const authRoutes: RouteObject = {
  path: auth.path,
  lazy: async () => {
    const { default: Auth } = await import("../layout");
    return {
      element: <Auth />,
    };
  },
  children: [
    {
      index: true,
      path: auth.login.path,
      lazy: async () => {
        const { default: Login } = await import("../views/login/page");
        return {
          element: <Login />,
        };
      },
    },
    {
      path: auth.register.path,
      lazy: async () => {
        const { default: Register } = await import("../views/register/page");
        return {
          element: <Register />,
        };
      },
    },
  ],
};

export default authRoutes;
