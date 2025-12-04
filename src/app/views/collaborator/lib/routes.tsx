// Core
import { RouteObject, Navigate } from "react-router-dom";

// App
import { ROUTE_PATHS } from "@/constants/paths";

// Collaborator route paths
const { collaborator } = ROUTE_PATHS;

// Collaborator routes
const collaboratorRoutes: RouteObject = {
  path: collaborator.path,
  lazy: async () => {
    const { default: CollaboratorLayout } = await import("../layout/CollaboratorLayout");
    return {
      element: <CollaboratorLayout />,
    };
  },
  children: [
    {
      index: true,
      lazy: async () => {
        const { default: Documents } = await import("../views/documents/page");
        return {
          element: <Documents />,
        };
      },
    },
    {
      path: collaborator.documents.path,
      element: <Navigate to="/collaborator" replace />,
    },
    {
      path: collaborator.upload.path,
      lazy: async () => {
        const { default: Upload } = await import("../views/upload/page");
        return {
          element: <Upload />,
        };
      },
    },
    {
      path: collaborator.salesStats.path,
      lazy: async () => {
        const { default: SalesStats } = await import("../views/sales-stats/page");
        return {
          element: <SalesStats />,
        };
      },
    },
    {
      path: collaborator.earnings.path,
      lazy: async () => {
        const { default: Earnings } = await import("../views/earnings/page");
        return {
          element: <Earnings />,
        };
      },
    },
    {
      path: collaborator.settings.path,
      lazy: async () => {
        const { default: Settings } = await import("../views/settings/page");
        return {
          element: <Settings />,
        };
      },
    },
    {
      path: collaborator.payments.path,
      lazy: async () => {
        const { default: Payments } = await import("../views/payments/page");
        return {
          element: <Payments />,
        };
      },
    },
  ],
};

export default collaboratorRoutes;
