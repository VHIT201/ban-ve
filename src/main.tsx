import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import "@github/spark/spark"

import { AppRouter } from './AppRouter';
import { ErrorFallback } from './ErrorFallback.tsx'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </ErrorBoundary>
)
