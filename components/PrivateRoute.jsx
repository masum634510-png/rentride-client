"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  // Sync state with authentication context changes
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(`/login?redirect=${pathname}`);
      } else {
        setIsReady(true);
      }
    }
  }, [user, loading, router, pathname]);

  // Render loading state if auth is active or validation is not yet complete
  if (loading || (!isReady && !user)) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <LoadingSpinner />
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
