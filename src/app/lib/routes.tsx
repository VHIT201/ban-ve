// Core
import { RouteObject } from "react-router-dom";

// App
import { ROUTE_PATHS } from "@/constants/paths";

// Internal
import {
  RouterErrorBoundary,
  RouterHydrateFallbackElement,
} from "../components";
import mainRoutes from "../views/main/lib/routes";

// App routes
const appRoutes: RouteObject[] = [
  {
    children: [
      // App
      {
        path: ROUTE_PATHS.app.path,
        lazy: async () => {
          const { default: App } = await import("../layout");
          return {
            element: <App />,
          };
        },
        children: [mainRoutes],
      },
    ],
    errorElement: <RouterErrorBoundary />,
    hydrateFallbackElement: <RouterHydrateFallbackElement />,
  },
];

export default appRoutes;
