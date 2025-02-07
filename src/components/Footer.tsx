"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/sanity/lib/getData";

const Footer: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    setIsClient(true);

    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data || []);
    };

    fetchCategories();
  }, []);

  const menuLinks = [
    { name: "New arrivals", href: "/new-arrivals" },
    { name: "Best sellers", href: "/best-sellers" },
    { name: "Recently viewed", href: "/recently-viewed" },
    { name: "Popular this week", href: "/popular-this-week" },
    { name: "All products", href: "/products" },
  ];

  const companyLinks = [
    { name: "About us", href: "/about" },
    { name: "Vacancies", href: "/vacancies" },
    { name: "Contact us", href: "/contact" },
    { name: "Privacy", href: "/privacy" },
    { name: "Returns policy", href: "/returns-policy" },
  ];

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/muhammad-areeb-a295192b5/",
      src: "/icons/linkedin.svg",
      alt: "LinkedIn",
    },
    {
      href: "https://web.facebook.com/Areebmalik7765",
      src: "/icons/facebook.svg",
      alt: "Facebook",
    },
    {
      href: "https://www.instagram.com/areeb_malik1777",
      src: "/icons/instagram.svg",
      alt: "Instagram",
    },
    { href: "https://www.skype.com", src: "/icons/skype.svg", alt: "Skype" },
    {
      href: "https://x.com/areeb_17777",
      src: "/icons/twitter.svg",
      alt: "Twitter",
    },
    {
      href: "https://www.pinterest.com",
      src: "/icons/pinterest.svg",
      alt: "Pinterest",
    },
  ];

  if (!isClient) {
    return null;
  }

  return (
    <div className="Footer w-full bg-[#2a254b] py-10 md:py-12 px-4 md:px-10">
      {/* Mobile View */}
      <div className="md:hidden bg-[#2a254b] cursor-pointer">
        <div className="flex flex-col w-full h-auto bg-[#2a254b] px-4">
          <div className="flex justify-between">
            <div className="flex flex-col gap-3">
              <div className="text-white text-base">Menu</div>
              {menuLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <div className="text-white text-sm">{link.name}</div>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-white text-base">Categories</div>
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/products?category=${category.name}`}
                >
                  <div className="text-white text-sm">{category.name}</div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-10 gap-3">
            <div className="text-white text-base">Our company</div>
            {companyLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <div className="text-white text-sm">{link.name}</div>
              </Link>
            ))}
          </div>
          <div className="flex flex-col mt-10 gap-3">
            <div className="text-white text-base">Join our mailing list</div>
            <div className="flex w-full mt-2">
              <input
                type="email"
                className="h-14 pl-8 pr-4 py-[17px] bg-white/20 text-white text-base flex-grow"
                placeholder="your@email.com"
              />
              <div className="px-1 py-3 bg-white border justify-center items-center flex cursor-pointer">
                <div className="text-[#2a254b] text-base leading-normal">
                  Sign up
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-t border-[#4e4c92] mt-10 pt-4 text-center">
            <div className="text-white text-sm">Copyright 2022 Avion LTD</div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex max-w-6xl mx-auto flex-col md:flex-row items-start gap-8">
        <div className="flex-1 flex-col justify-start items-start gap-3 cursor-pointer">
          <div className="text-white text-base">Menu</div>
          {menuLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <div className="text-white text-sm">{link.name}</div>
            </Link>
          ))}
        </div>
        <div className="flex-1 flex-col justify-start items-start gap-3">
          <div className="text-white text-base">Categories</div>
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/products?category=${category.name}`}
            >
              <div className="text-white text-sm">{category.name}</div>
            </Link>
          ))}
        </div>
        <div className="flex-1 flex-col justify-start items-start gap-3">
          <div className="text-white text-base">Our company</div>
          {companyLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <div className="text-white text-sm">{link.name}</div>
            </Link>
          ))}
        </div>
        <div className="flex-1 flex-col justify-center items-start gap-3">
          <div className="text-white text-base">Join our mailing list</div>
          <div className="flex w-full">
            <input
              type="email"
              className="h-14 pl-8 pr-4 py-[17px] bg-white/20 text-white text-base flex-grow"
              placeholder="your@email.com"
            />
            <div className="px-4 py-4 bg-white border justify-center items-center gap-2.5 flex cursor-pointer">
              <div className="text-[#2a254b] text-base leading-normal w-16">
                Sign up
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-between items-center w-full border-t border-[#4e4c92] pt-4 mt-8">
        <div className="text-white text-sm">Copyright 2022 Avion LTD</div>
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={link.src}
                alt={link.alt}
                width={24}
                height={24}
                priority={true}
                className="w-6 h-6 bg-transparent"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
