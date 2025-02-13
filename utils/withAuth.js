"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
      // Add a small delay to allow token setting to complete
      const checkAuth = setTimeout(() => {
        try {
          const token = localStorage.getItem("sb-qurridsqflqlsyzcftye-auth-token");
          
          const publicPaths = [
            "/Login",
            "/",
            "/earlyaccess",
            "/terms-of-service",
            "/contact-us",
            "/credits",
            "/privacy-policy",
            "/unsubscribe"
          ];
          const publicPatterns = [{ pattern: /^\/s\/.+/ }];

          const isPublicPath = publicPaths.includes(pathname);
          const matchesPublicPattern = publicPatterns.some(({ pattern }) =>
            pattern.test(pathname)
          );

          const requiresAuth = !isPublicPath && !matchesPublicPattern;

          if (!token && requiresAuth) {
            window.location.href = "/Login";
            return;
          }
          
          setIsAuthChecked(true);
        } catch (error) {
          console.error("Error checking authentication:", error);
          window.location.href = "/Login";
        }
      }, 1500); // Small delay to allow token setting

      return () => clearTimeout(checkAuth);
    }, [pathname]);

    // Show nothing while checking auth
    if (!isAuthChecked) {
      return null; // Or return a loading spinner component
    }

    return <WrappedComponent {...props} />;
  };
}