// In d:\banve\ban-ve\src\app\lib\routes.tsx
import { RouteObject } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/paths";
import { RouterErrorBoundary, RouterHydrateFallbackElement } from "../components";
import mainRoutes from "../views/main/lib/routes";
import authRoutes from "../views/auth/lib/routes";
import adminRoutes from "../views/admin/lib/routes";


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
        children: [mainRoutes, adminRoutes, authRoutes], 
      },
    ],
    errorElement: <RouterErrorBoundary />,
    hydrateFallbackElement: <RouterHydrateFallbackElement />,
  },
];

export default appRoutes;