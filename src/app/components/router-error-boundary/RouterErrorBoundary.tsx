// Core
import { useMemo } from "react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

// App
import { Button } from "@/components/ui/button";
import { BASE_PATHS } from "@/constants/paths";
import { Badge } from "@/components/ui/badge";

// Component
const RouterErrorBoundary = () => {
  // Hooks
  const error = useRouteError();
  const navigate = useNavigate();
  const isRouteError = isRouteErrorResponse(error);

  // Memos
  const routerError = useMemo(() => {
    console.error(error);

    if (isRouteError) {
      switch (error.status) {
        case 404:
          return {
            code: 404,
            title: "Page Not Found",
            message:
              "Oops! The page you're looking for doesn't exist or has been moved.",
          };
        case 403:
          return {
            code: 403,
            title: "Access Denied",
            message: "You do not have permission to view this page.",
          };
        default:
          return {
            code: error.status,
            title: `Error ${error.status}`,
            message: "An unexpected error occurred.",
          };
      }
    }

    return {
      code: 500,
      title: "Internal Server Error",
      message: "Something went wrong on our end. Please try again later.",
    };
  }, [isRouteError, error]);

  // Template
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#f9fafb] to-[#f0f4f8] p-4 dark:from-[#0f172a] dark:to-[#1e293b]">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center overflow-hidden lg:flex-row">
          <div
            data-aos="fade-right"
            className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 p-8 md:h-[400px] md:p-12 dark:bg-gray-800"
          >
            <div className="space-y-6 text-center">
              <div>
                <Badge className="x-4 inline-flex items-center rounded-full py-1 text-sm font-medium">
                  Error {routerError.code}
                </Badge>
                <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                  {routerError.title}
                </h1>
              </div>

              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {routerError.message}
              </p>

              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  ← Go Back
                </Button>
                <Button
                  onClick={() => navigate(BASE_PATHS.app.path)}
                  className="w-full sm:w-auto"
                >
                  Home Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouterErrorBoundary;
