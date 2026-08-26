"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useAuth() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const user = session?.user as { id: string; email: string; name: string; image: string } | undefined;
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  const login = useCallback(async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!result?.error) {
      router.push("/dashboard");
    }
    return result;
  }, [router]);

  const logout = useCallback(async () => {
    await signOut({ redirect: false, callbackUrl: "/" });
    router.push("/");
  }, [router]);

  const requireAuth = useCallback(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return { user, session, status, isAuthenticated, isLoading, login, logout, requireAuth, update };
}
