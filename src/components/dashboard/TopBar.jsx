"use client";

import React from "react";
import { Bell, Magnifier, House, Gear } from "@gravity-ui/icons";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { showToastSuccess } from "../Toasts";

export default function TopBar({ company }) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          showToastSuccess("Logged out successfully!");
          router.push("/"); 
        },
      },
    });
  }

  return (
    <header className="h-20 flex items-center justify-between px-4 md:px-8 border-b border-[#232326] bg-[#09090B] shrink-0 gap-4">

      {/* Global Search Bar */}
      <div className="flex-1 w-full">
        <div className="relative group flex items-center">
          <Magnifier className="absolute left-4 w-4 h-4 text-[#8E8E93] group-focus-within:text-white transition-colors" />
          <input
            type="text"
            aria-label="Global Search"
            placeholder="Search applications, jobs, or talent..."
            className="w-full bg-[#141416] border border-[#232326] text-white text-sm rounded-xl pl-11 pr-4 py-2.5 outline-none focus:border-zinc-600 focus:bg-[#1A1A1D] transition-all placeholder:text-[#8E8E93]"
          />
        </div>
      </div>

      {/* Right Actions Container */}
      <div className="flex items-center space-x-2 md:space-x-4">

        {/* Notification Bell */}
        <button
          title="Notifications"
          aria-label="View Notifications"
          className="relative p-2 text-[#8E8E93] hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#09090B]"></span>
        </button>

        <div className="hidden sm:block h-6 w-px bg-[#232326]"></div>

        {/* Quick Action Icons */}
        <div className="hidden sm:flex items-center gap-1">
          <Link
            href="/"
            title="Go to Home"
            aria-label="Home"
            className="p-2 text-[#8E8E93] hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <House className="w-5 h-5" />
          </Link>

          <Link
            href="/dashboard/settings"
            title="Account Settings"
            aria-label="Settings"
            className="p-2 text-[#8E8E93] hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <Gear className="w-5 h-5" />
          </Link>

          <button
            onClick={handleLogout}
            title="Log Out"
            aria-label="Log Out"
            className="p-2 text-[#8E8E93] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200"
          >
            <MdLogout size={20} />
          </button>
        </div>

        <div className="hidden sm:block h-6 w-px bg-[#232326]"></div>

        {/* User Profile (Static Display) */}
        {company ? (
          <div className="flex items-center gap-3 pl-1 md:pl-2">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium text-white truncate max-w-37.5">{company?.name}</span>
              <span className="text-[11px] text-[#8E8E93] truncate max-w-37.5">{company?.industry}</span>
            </div>

            {/* FIX: Check if company.logo exists and is not an empty string */}
            {company?.logo ? (
              <Image
                src={company.logo}
                alt={`${company?.name} Logo`}
                width={36}
                height={36}
                className="w-9 h-9 rounded-full border border-[#232326] object-cover shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full border border-[#232326] bg-[#141416] flex items-center justify-center shrink-0 text-[#8E8E93] font-medium text-sm uppercase">
                {/* Fallback avatar with the first letter of the company name */}
                {company?.name?.charAt(0) || "C"}
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm font-medium text-[#8E8E93] pl-2 hover:text-white transition-colors cursor-pointer">
            <span>Create Company</span>
          </div>
        )}

      </div>
    </header>
  );
}