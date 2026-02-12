"use client";

import React, { ReactNode, useEffect, useState, useRef } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { useAuth } from "../../../../contexts/AuthContext";
import { useAdmins } from "../../../../lib/useAdmins";
import AccessDenied from "./AccessDenied";

interface LayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
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

  if (!user || isLoading) return <div>Loading...</div>;

  if (error) return <div>Failed to load admins: {error}</div>;

  const isAdmin = admins?.some((admin) => admin.email === user.email);
  if (!isAdmin) {
    return <AccessDenied />;
  }

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
