// Core
import { RouteObject } from "react-router-dom";

// App
import { ROUTE_PATHS } from "@/constants/paths";
import { useAuthStore } from "@/stores";

// Profile route paths
const {
  app: { profile },
} = ROUTE_PATHS;

// Profile routes
const profileRoutes: RouteObject = {
  path: profile.path,
  lazy: async () => {
    const { default: Profile } = await import("../layout");
    return {
      element: <Profile />,
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
      path: profile.personal.path,
      lazy: async () => {
        const { default: Personal } = await import("../views/personal/page");
        return {
          element: <Personal />,
        };
      },
    },
    {
      path: profile.history.path,
      lazy: async () => {
        const { default: History } = await import("../views/history/page");
        return {
          element: <History />,
        };
      },
    },
  ],
};

export default profileRoutes;
