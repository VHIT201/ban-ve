import { ErrorBoundary } from "react-error-boundary";
import "@github/spark/spark";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorFallback } from "@/ErrorFallback";

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
