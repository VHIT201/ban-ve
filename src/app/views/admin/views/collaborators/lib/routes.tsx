// Core
import { RouteObject } from "react-router-dom";

// App
import { ROUTE_PATHS } from "@/constants/paths";

// Content route paths
const {
  admin: { collaborators },
} = ROUTE_PATHS;

// Content routes
const collaboratorRoutes: RouteObject = {
  path: collaborators.path,
  lazy: async () => {
    const { default: Collaborator } = await import("../layout");
    return {
      element: <Collaborator />,
    };
  },
  children: [
    {
      index: true,
      lazy: async () => {
        const { default: CollaboratorList } = await import(
          "../views/collaborator-list/page"
        );
        return {
          element: <CollaboratorList />,
        };
      },
    },
    {
      path: collaborators.detail.path,
      lazy: async () => {
        const { default: CollaboratorDetail } = await import(
          "../views/collaborator-detail/page"
        );
        return {
          element: <CollaboratorDetail />,
        };
      },
    },
  ],
};

export default collaboratorRoutes;
