import React, { useEffect, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import theme    from "assets/theme";
import routes   from "routes";
import Loading  from "layouts/components/loading";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location.pathname]);

  const renderRoutes = (items) =>
    items.map(
      (
        { route, path, component: Component, element, children, index },
        i
      ) => {
        if (index)
          return (
            <Route key={i} index element={element ?? (Component && <Component />)} />
          );

        const currentPath  = route ?? path;
        const currentElem  = element ?? (Component && <Component />);

        return currentPath ? (
          <Route key={i} path={currentPath} element={currentElem}>
            {children && renderRoutes(children)}
          </Route>
        ) : null;
      }
    );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="bottom-right" />

      <AnimatePresence mode="wait">
        <Suspense fallback={<Loading />}>
          <Routes location={location} key={location.pathname}>
            {renderRoutes(routes)}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
}
