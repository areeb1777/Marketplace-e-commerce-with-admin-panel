'use client';
import { useRouter } from "next/navigation";
import AuthContextProvider, { useAuth } from "../../../contexts/AuthContext";
import AdminLayout from "./components/AdminLayout";
import { useEffect } from "react";
import { CircularProgress } from "@nextui-org/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <AdminChecking>{children}</AdminChecking>
    </AuthContextProvider>
  );
}

function AdminChecking({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <h1>Please Login First!</h1>
      </div>
    );
  }
  return <AdminLayout>{children}</AdminLayout>;
}
