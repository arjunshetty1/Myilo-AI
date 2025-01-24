"use client";
import CreateContextProvider from "@/context/global/GlobalContext";
import { Toaster } from "@/components/UI/shadcn-ui/toaster";
import { withAuth } from "@/utils/withAuth";

function ClientLayout({ children }) {
  return (
    <CreateContextProvider>
      {children}
      <Toaster />
    </CreateContextProvider>
  );
}

export default withAuth(ClientLayout);
