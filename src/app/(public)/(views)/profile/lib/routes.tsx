// Core
import { RouteObject } from "react-router-dom";

// App
import { ROUTE_PATHS } from "@/constants/paths";
import { useAuthStore } from "@/stores";
import orderRoutes from "../views/order/lib/routes";

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
      path: profile.collaborator.path,
      lazy: async () => {
        const { default: Collaborator } = await import(
          "../views/collaborator/page"
        );
        return {
          element: <Collaborator />,
        };
      },
    },
    {
      path: `${profile.collaborator.path}/content-create`,
      lazy: async () => {
        const { default: CollaboratorContentCreate } = await import(
          "../views/collaborator-content-create/page"
        );
        return {
          element: <CollaboratorContentCreate />,
        };
      },
    },
    {
      path: `${profile.collaborator.path}/content-edit/:id`,
      lazy: async () => {
        const { default: CollaboratorContentEdit } = await import(
          "../views/collaborator-content-edit/[id]/page"
        );
        return {
          element: <CollaboratorContentEdit />,
        };
      },
    },
    {
      path: profile.history.path,
      lazy: async () => {
        const { default: History } = await import(
          "../views/history/page"
        );
        return {
          element: <History />,
        };
      },
    },
    orderRoutes,
  ],
};

export default profileRoutes;
