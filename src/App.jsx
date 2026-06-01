import React from "react";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { RateLimitProvider } from "./context/RateLimitContext";
import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import RateLimitBanner from "./components/ui/RateLimitBanner";
import Preloader from "./components/ui/Preloader";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <RateLimitProvider>
            <HashRouter>
              <Preloader />
              <RateLimitBanner />
              <AppRoutes />
            </HashRouter>
          </RateLimitProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;