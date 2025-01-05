"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import CreateContextProvider from "@/context/global/GlobalContext";
import { Toaster } from "@/components/UI/shadcn-ui/toaster";
import { withAuth } from "@/utils/withAuth";

function ClientLayout({ children }) {
  return (
    <GoogleOAuthProvider clientId="281163685575-bsalvq26n77e8kcvahul393vd5rlps04.apps.googleusercontent.com">
      <CreateContextProvider>
        {children}
        <Toaster />
      </CreateContextProvider>
    </GoogleOAuthProvider>
  );
}

export default withAuth(ClientLayout);