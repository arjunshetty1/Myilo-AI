"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/utils/supabaseConfig";

export function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const {
            data: { session },
          } = await supabase.auth.getSession();
    
          const publicPaths = [
            "/Login",
            "/",
            "/earlyaccess",
            "/terms-of-service",
            "/contact-us",
            "/credits",
            "/privacy-policy",
          ];
    
          const publicPatterns = [
            { pattern: /^\/s\/.+/ },
            { pattern: /^\/unsubscribe\/.+/ },
            { pattern: /^\/unsubscribe$/ },
          ];
    
          const isPublicPath = publicPaths.includes(pathname);
          const matchesPublicPattern = publicPatterns.some(({ pattern }) =>
            pattern.test(pathname)
          );
    
          const requiresAuth = !isPublicPath && !matchesPublicPattern;
    
          // Redirect logic:
          // 1. If user is not logged in and page requires auth, go to Login
          if (!session && requiresAuth) {
            router.replace("/Login");
            return;
          }
    
          // 2. If user is logged in and tries to access Login page, go to Application
          if (session && pathname === "/Login") {
            router.replace("/Application");
            return;
          }
    
          // 3. For all other cases, just render the component (including homepage)
          setIsLoading(false);
        } catch (error) {
          console.error("Error checking authentication:", error);
          setIsLoading(false);
        }
      };
    
      checkAuth();
    }, [pathname, router]);
    
    // Show a simple loading indicator while auth check is in progress
    if (isLoading) {
      return <div>Loading...</div>;
    }

    // Once loading is complete, render the wrapped component
    return <WrappedComponent {...props} />;
  };
}