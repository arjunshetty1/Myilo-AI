"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/utils/supabaseConfig";

export function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

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
    
          // ✅ Allow logged-in users to visit "/" (landing page)
          if (session && pathname === "/") {
            return; // Do nothing, let them stay on the landing page
          }
    
          // ✅ Redirect logged-in users away from "/Login" to "/Application"
          if (session && pathname === "/Login") {
            router.replace("/Application");
            return;
          }
    
          setIsAuthChecked(true);
        } catch (error) {
          console.error("Error checking authentication:", error);
          router.replace("/Login");
        }
      };
    
      checkAuth();
    }, [pathname, router]);
    

    // Show nothing while checking auth
    if (!isAuthChecked) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
