"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getAllProducts, getCategories } from "@/sanity/lib/getData";
import { Product } from "@/app/types/Product";
import { LogOut, Package, User, Search, ShoppingCart } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { getUserRole } from "../../lib/firebase"; // Import function to get user role

const TopNav: React.FC = () => {
  const { state } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false); // State to check if user is admin
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const fetchCategoriesAndProducts = async () => {
    const [categoryData, productData] = await Promise.all([
      getCategories(),
      getAllProducts(),
    ]);
    setCategories(categoryData || []);
    setProducts(productData || []);
  };

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node) && !searchInputRef.current?.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setQuery("");
      }
      if (mobileMenuButtonRef.current && !mobileMenuButtonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (user) {
        const role = await getUserRole(user.uid); // Fetch user role from Firebase
        setIsAdmin(role === "admin"); // Set isAdmin based on role
      }
    };
    checkAdminRole();
  }, [user]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const filteredProducts = products.filter(
    (product) => product.title && product.title.toLowerCase().includes(query.toLowerCase())
  );

  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const renderUserProfile = user ? (
    <div className="relative" ref={profileRef}>
      <div onClick={toggleProfile} className="flex items-center cursor-pointer p-2 text-gray-700 hover:text-gray-900">
        <Image src={user.photoURL || "/icons/default-profile.png"} alt="Profile" width={40} height={40} className="rounded-full" />
        {isProfileOpen && (
          <div className="absolute right-0 mt-48 w-48 bg-white rounded-md shadow-lg z-50 p-2">
            <div className="flex items-center space-x-2 mb-2">
              <Image src={user.photoURL || "/icons/default-profile.png"} alt="Profile" width={32} height={32} className="rounded-full" />
              <span className="font-medium">{user.displayName}</span>
            </div>
            <div className="border-t pt-2">
              <Link href="/profile" className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded">
                <User size={16} />
                <span>Profile</span>
              </Link>
              <button onClick={handleSignOut} className="flex items-center space-x-2 w-full text-left px-2 py-1 hover:bg-gray-100 rounded">
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
              {isAdmin && ( // Render admin link if user is admin
                <Link href="/admin" className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded">
                  <span>Admin Dashboard</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Link href="/login">
      <User size={24} className="rounded-full" />
    </Link>
  );

  return (
    <div>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button onClick={toggleSearch} className="p-2 text-gray-700 hover:text-gray-900">
                <Search size={24} />
              </button>
            </div>
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Avion
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/cart" className="relative p-2 text-gray-700 hover:text-gray-900">
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              {user && (
                <Link href="/tracking" className="p-2 text-gray-700 hover:text-gray-900">
                  <Package size={24} />
                </Link>
              )}
              {renderUserProfile}
              <button onClick={toggleMenu} className="md:hidden p-2 text-gray-700 hover:text-gray-900" ref={mobileMenuButtonRef}>
                <Image src="/icons/menu.svg" alt="Menu" width={24} height={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-white border-t hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-9 py-4">
            {categories.map((category) => (
              <Link href={`/products?category=${category.name}`} key={category._id} className="text-gray-700 hover:text-gray-900">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {categories.map((category) => (
              <Link href={`/products?category=${category.name}`} key={category._id} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {isSearchOpen && (
        <div className="bg-white border-b shadow-sm" ref={searchRef} onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsSearchOpen(false);
            setQuery("");
          }
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center">
              <input type="text" value={query} onChange={handleSearch} placeholder="Search products..." className="w-full p-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-500" ref={searchInputRef} />
              <button onClick={toggleSearch} className="ml-2 text-gray-700 hover:text-gray-900">
                <Search size={24} />
              </button>
            </div>
            {query && (
              <div className="mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow">
                {filteredProducts.map((product) => (
                  <Link href={`/products/${product.slug?.current ?? ""}`} key={product._id} className="block p-3 hover:bg-gray-50">
                    {product.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNav;
