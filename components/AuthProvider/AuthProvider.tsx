"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession, logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

const privateRoutes = ["/notes", "/profile"];

export default function AuthProvider({ children }: AuthProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function verifySession() {
      try {
        const user = await checkSession();

        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();

          if (privateRoutes.some((route) => pathname.startsWith(route))) {
            await logout();
            router.replace("/sign-in");
          }
        }
      } finally {
        setIsChecking(false);
      }
    }

    verifySession();
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (isChecking) {
    return <p>Loading, please wait...</p>;
  }

  return <>{children}</>;
}