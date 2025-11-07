// Core
import { RouteObject } from "react-router-dom";

// App
import { ROUTE_PATHS } from "@/constants/paths";

// Profile route paths
const {
  app: { profile },
} = ROUTE_PATHS;

// Profile routes
const ProfileRoutes: RouteObject = {
  path: profile.path,
  lazy: async () => {
    const { default: Profile } = await import("../layout");
    return {
      element: <Profile />,
    };
  },
  children: [
    {
      index: true,
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

export default ProfileRoutes;
