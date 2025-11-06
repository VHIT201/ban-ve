import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import App from './App';
import CheckoutPage from './pages/CheckoutPage';
import UploadPage from './pages/UploadPage';
import { useAuth } from './contexts/AuthContext';

// Import các trang mới

import { 
  DashboardPage,
  ApprovalsPage,
  CopyrightPage,
  CommentsPage,
  AnalyticsPage,
  PaymentsPage,
  CategoriesPage,
  AdminLayout,
  SocialPage,
  SettingsPage
} from './pages/admin';

// Wrapper component to protect admin routes
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

// Wrapper component to protect user routes
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

export function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<App />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/upload" element={<UploadPage />} />

        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout>
              <Outlet />
            </AdminLayout>
          </AdminRoute>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="approvals" element={<ApprovalsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="copyright" element={<CopyrightPage />} />
          <Route path="comments" element={<CommentsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="social" element={<SocialPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        {/* 404 - Keep this last */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
