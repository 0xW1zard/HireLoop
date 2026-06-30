"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
import { showToastSuccess } from "./Toasts";

// Define navigation links here for easy management
const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export default function HireloopNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = authClient.useSession()
  const { user } = session || {}
  const router = useRouter();
  const name = user?.name.split(" ")[0]
  console.log(user)


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
    <header className="fixed top-0 w-full flex justify-center z-50 p-1 transition-all">
      <nav className="rounded-2xl px-6 py-3 w-full max-w-7xl flex flex-col md:flex-row justify-between items-center transition-all duration-300">

        {/* LEFT: Brand / Logo & Mobile Toggle */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link href="/" className="backdrop-blur-sm rounded-xl py-1.5 px-2">
            <Image src="/logo.png" alt="HireLoop Logo" width={100} height={100} />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden text-zinc-300 hover:text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* RIGHT: Navigation Links & Auth */}
        <div className={`${isMobileMenuOpen ? "flex" : "hidden"} backdrop-blur-md  py-2 px-3 rounded-xl md:flex flex-col md:flex-row items-center gap-6 mt-3 md:mt-0 w-full md:w-auto`}>

          {/* Mapped Navigation Links */}
          <ul className="flex flex-col md:flex-row gap-6 items-center m-0 p-4 sm:p-1 list-none w-full md:w-auto">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-zinc-300 text-sm font-medium hover:text-white transition-colors block">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Vertical Separator (Desktop) */}
          <div className="hidden md:block h-5 w-px bg-zinc-700"></div>

          {/* Horizontal Separator (Mobile) */}
          <div className="md:hidden w-full h-px bg-zinc-700 my-2"></div>

          {/* Auth & CTA */}
          {
            user ? (
              <div className="flex items-center gap-2.5">
              <button onClick={() => router.push(`/dashboard/${user.role}`)} aria-label="Dashboard" className="text-[15px] py-1.5 px-2 bg-indigo-600 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-all duration-200">Dashboard</button>
                <Image src={user?.image || "/avatar.jpg"} alt="User Avatar" width={40} height={40} className="rounded-xl border-2 p-0.5 border-[#6b58ff]" />
                <span className="text-sm text-zinc-300">{name}</span>
                <button onClick={handleLogout} aria-label="Logout" className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200">
                  <MdLogout size={18} />
                </button>
              </div>
            ) : (
              <ul className="flex flex-col md:flex-row items-center gap-6 m-0 p-0 list-none w-full md:w-auto pb-4 md:pb-0">
                <li>
                  <Link href="/login" className="text-[#8473ff] text-sm font-medium hover:text-indigo-300 transition-colors block">
                    Sign In
                  </Link>
                </li>
                <li className="w-full md:w-auto">
                  <Link href="/signup" className="bg-[#6b58ff] hover:bg-[#5a48e6] text-white rounded-lg text-sm font-medium px-6 py-2 transition-all shadow-lg shadow-indigo-500/20 flex justify-center w-full md:w-auto" >
                    Get Started
                  </Link>
                </li>
              </ul>
            )
          }

        </div>
      </nav>
    </header>
  );
}