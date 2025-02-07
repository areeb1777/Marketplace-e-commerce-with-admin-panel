"use client";

import React, { ReactNode, useEffect, useState, useRef } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useAdmins } from "../../../../lib/useAdmins";
import { useRouter } from "next/navigation";
import AccessDenied from "./AccessDenied";

interface LayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { data: admins, error, isLoading } = useAdmins();

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        router.push("/api/auth/signin");
      }
    });
  }, [router]);

  if (!user || isLoading) return <div>Loading...</div>;

  const isAdmin = admins?.some((admin) => admin.email === user.email);
  if (!isAdmin) {
    return <AccessDenied />;
  }

  if (error) return <div>Failed to load admins: {error}</div>;

  return (
    <main className="relative flex">
      <div className="hidden md:block">
        <SideBar />
      </div>
      <div
        ref={sidebarRef}
        className={`fixed md:hidden ease-in-out transition-all duration-400 z-50 ${isOpen ? "translate-x-0" : "-translate-x-[260px]"}`}
      >
        <SideBar />
      </div>
      <section className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header toggleSideBar={toggleSideBar} />
        <section className="flex-1 bg-[#eff3f4] pt-16">{children}</section>
      </section>
    </main>
  );
}
