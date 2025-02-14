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
    
          if (!session && requiresAuth) {
            router.replace("/Login");
            return;
          }
    
          if (session && pathname === "/Login") {
            router.replace("/Application");
            return;
          }
    
          setIsLoading(false);
        } catch (error) {
          console.error("Error checking authentication:", error);
          // On error, if the path requires auth, redirect to login
          const isPublicPath = [
            "/Login",
            "/",
            "/earlyaccess",
            "/terms-of-service",
            "/contact-us",
            "/credits",
            "/privacy-policy",
          ].includes(pathname);
          
          const isPublicPattern = [
            /^\/s\/.+/,
            /^\/unsubscribe\/.+/,
            /^\/unsubscribe$/,
          ].some(pattern => pattern.test(pathname));
          
          if (!isPublicPath && !isPublicPattern) {
            router.replace("/Login");
          } else {
            setIsLoading(false);
          }
        }
      };
    
      checkAuth();
    }, [pathname, router]);
    
    // Show loading indicator
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
}