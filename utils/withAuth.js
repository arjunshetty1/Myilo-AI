"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      const token = localStorage.getItem("tk");

      const publicPaths = [
        "/Login",
        "/",
        "/earlyaccess",
        "/terms-of-service",
        "/contact-us",
        "/select-template"
      ];
      const publicPatterns = [{ pattern: /^\/s\/.+/ }];

      const isPublicPath = publicPaths.includes(pathname);
      const matchesPublicPattern = publicPatterns.some(({ pattern }) =>
        pattern.test(pathname)
      );

      if (!token && !isPublicPath && !matchesPublicPattern) {
        router.push("/Login");
      }
    }, [router, pathname]);

    return <WrappedComponent {...props} />;
  };
}
