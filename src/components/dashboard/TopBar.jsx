"use client";
import React from "react";
import { Bell, Magnifier, House, Gear } from "@gravity-ui/icons";
import { MdLogout } from "react-icons/md"; // Using your react-icons import
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// import { authClient } from "@/lib/auth-client"; 

export default function TopBar() {
  const router = useRouter();

  const handleLogout = async () => {
    // BetterAuth Logout Logic
    // await authClient.signOut();
    router.push("/signin");
  };

  return (
    <header className="h-22 flex items-center justify-between px-8 border-b border-[#232326] bg-[#09090B] shrink-0">
      
      {/* Global Search Bar */}
      <div className="flex-1 max-w-3xl">
        <div className="relative group flex items-center">
          <Magnifier className="absolute left-4 w-4 h-4 text-[#8E8E93] group-focus-within:text-white transition-colors" />
          <input 
            type="text" 
            placeholder="Search applications, jobs, or talent..." 
            className="w-full bg-[#141416] border border-[#232326] text-white text-sm rounded-xl pl-11 pr-4 py-3 outline-none focus:border-zinc-600 focus:bg-[#1A1A1D] transition-all placeholder:text-[#8E8E93]"
          />
        </div>
      </div>

      {/* Right Actions Container */}
      <div className="flex items-center space-x-4 ml-6">
        
        {/* Notification Bell */}
        <button 
          title="Notifications"
          className="relative p-2 text-[#8E8E93] hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#09090B]"></span>
        </button>

        <div className="h-6 w-px bg-[#232326]"></div>

        {/* Quick Action Icons */}
        <div className="flex items-center gap-1">
          <Link 
            href="/" 
            title="Go to Home"
            className="p-2 text-[#8E8E93] hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <House className="w-5 h-5" />
          </Link>
          
          <Link 
            href="/dashboard/settings" 
            title="Account Settings"
            className="p-2 text-[#8E8E93] hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <Gear className="w-5 h-5" />
          </Link>

          <button 
            onClick={handleLogout}
            title="Log Out"
            className="p-2 text-[#8E8E93] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200"
          >
            <MdLogout size={20} />
          </button>
        </div>

        <div className="h-6 w-px bg-[#232326]"></div>

        {/* User Profile (Static Display) */}
        <div className="flex items-center gap-3 pl-2">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-white">Alex Sterling</span>
            <span className="text-[11px] text-[#8E8E93]">TechFlow Inc.</span>
          </div>
          <Image
            src="https://i.pravatar.cc/150?u=alex" 
            alt="Alex Sterling" 
            width={36}
            height={36}
            className="w-9 h-9 rounded-full border border-[#232326] object-cover"
          />
        </div>
        
      </div>
    </header>
  );
}