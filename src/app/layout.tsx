// Core
import "@github/spark/spark";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClientProvider } from "@tanstack/react-query";

// App
import { ErrorFallback } from "@/ErrorFallback";
import queryClient from "@/configs/query-client";
import { AuthGate } from "@/components/modules/auth";

// Component
const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Toaster richColors position="bottom-right" />
      <QueryClientProvider client={queryClient}>
        <AuthGate>
          <Outlet />
        </AuthGate>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
