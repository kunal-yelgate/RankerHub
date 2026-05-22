import React from "react";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./components/ui/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
