"use client";

import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import Layout from "./components/Layout";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./app/context/AuthContext";

const ClientLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isLogin } = useAuth();
  // Define paths that do not require login
  const publicPaths = ["/login", "/support"];
  useEffect(() => {
    // Skip login check for public paths
    if (!publicPaths.includes(pathname)) {
      if (isLogin == "false") {
        router.push("/login"); // Redirect to login if not logged in
      } else if (isLogin && pathname === "/login") {
        router.push("/"); // Redirect to dashboard if already logged in
      }
    }
  }, [isLogin, pathname, publicPaths, router]);

  const isLoginPage = pathname === "/login";
  const isSupportPage = pathname === "/support";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoginPage || isSupportPage ? (
        // Render children without the layout for login or support pages
        <>{children}</>
      ) : (
        // Render the full layout for authenticated pages
        <Layout>{children}</Layout>
      )}
    </ThemeProvider>
  );
};

export default ClientLayout;
