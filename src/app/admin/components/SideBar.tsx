'use client';

import {
  Cat,
  Layers2,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  PackageOpen,
  ShieldCheck,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../../lib/firebase";
import toast from "react-hot-toast";

interface TabProps {
  item: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  };
}

function Tab({ item }: TabProps) {
  const pathName = usePathname();
  const isSelected = pathName === item.link;
  return (
    <Link
      href={item.link}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold w-full transition-all duration-300 ${
        isSelected ? "bg-[#879fff] text-white" : "bg-white text-black"
      }`}
    >
      {item.icon} <span>{item.name}</span>
    </Link>
  );
}

interface MenuItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

const menuList: MenuItem[] = [
  {
    name: "Dashboard",
    link: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    name: "Products",
    link: "/admin/products",
    icon: <PackageOpen className="h-5 w-5" />,
  },
  {
    name: "Categories",
    link: "/admin/categories",
    icon: <Layers2 className="h-5 w-5" />,
  },
  {
    name: "Brands",
    link: "/admin/brands",
    icon: <Cat className="h-5 w-5" />,
  },
  {
    name: "Orders",
    link: "/admin/orders",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    name: "Customers",
    link: "/admin/customers",
    icon: <User className="h-5 w-5" />,
  },
  {
    name: "Reviews",
    link: "/admin/reviews",
    icon: <Star className="h-5 w-5" />,
  },
  {
    name: "Collections",
    link: "/admin/collections",
    icon: <LibraryBig className="h-5 w-5" />,
  },
  {
    name: "Admins",
    link: "/admin/admins",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

export default function SideBar() {
  return (
    <section className="sticky top-0 flex flex-col gap-7 bg-white border-r px-5 py-3 h-screen overflow-hidden w-[260px]">
      <Link href={"/"}>
      <header className="font-bold text-xl text-center">Avion</header>
      </Link>
      <ul className="flex-1 flex flex-col gap-3 overflow-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        {menuList.map((item) => (
          <li
            key={item.link}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold w-full"
          >
            <Tab item={item} />
          </li>
        ))}
      </ul>
      <div className="flex justify-center sticky bottom-0 bg-white">
        <button 
          onClick={async () => {
            try {
              await toast.promise(signOut(auth), {
                loading: "Logging out...",
                success: "Logged out successfully",
                error: (e: any) => e.message,
              });
            } catch (error: any) {
              toast.error(error.message);
            }
          }}
          className="flex gap-2 items-center px-3 py-2 hover:bg-indigo-100 rounded-xl w-full justify-center transition-all duration-400"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </section>
  );
}
