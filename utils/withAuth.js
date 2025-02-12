"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      // Wrap in try-catch in case localStorage is not available
      try {
        const token = localStorage.getItem("sb-qurridsqflqlsyzcftye-auth-token");
        
        const publicPaths = [
          "/Login",
          "/",
          "/earlyaccess",
          "/terms-of-service",
          "/contact-us",
          "/credits",
          "/privacy-policy"
        ];
        const publicPatterns = [{ pattern: /^\/s\/.+/ }];

        const isPublicPath = publicPaths.includes(pathname);
        const matchesPublicPattern = publicPatterns.some(({ pattern }) =>
          pattern.test(pathname)
        );

        const requiresAuth = !isPublicPath && !matchesPublicPattern;

        if (!token && requiresAuth) {
          // Force immediate redirect
          window.location.href = "/Login";
          return null; // Prevent component render while redirecting
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Handle error case - redirect to login
        window.location.href = "/Login";
        return null;
      }
    }, [pathname]); // Remove router from dependencies since we're using window.location

    return <WrappedComponent {...props} />;
  };
}