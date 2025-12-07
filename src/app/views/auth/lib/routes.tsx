// Core
import { redirect, RouteObject } from "react-router-dom";

// App
import { ROUTE_PATHS } from "@/constants/paths";
import { useAuthStore } from "@/stores";

// Auth route paths
const { auth } = ROUTE_PATHS;

// Auth routes
const authRoutes: RouteObject = {
  path: auth.path,
  loader: () => {
    const isLoginedIn = useAuthStore.getState().isSignedIn;

    if (isLoginedIn) {
      return redirect(ROUTE_PATHS.app.path);
    }

    return null;
  },
  lazy: async () => {
    const { default: Auth } = await import("../layout");
    return {
      element: <Auth />,
    };
  },
  children: [
    {
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
    {
      path: auth.forgot.path,
      lazy: async () => {
        const { default: ForgotPassword } = await import("../views/forgot/page");
        return {
          element: <ForgotPassword />,
        };
      },
    },
   
  ],
};

export default authRoutes;
