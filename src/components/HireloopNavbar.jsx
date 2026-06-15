"use client";

import React, { useState } from "react";
import Link from "next/link";

// Define navigation links here for easy management
const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export default function HireloopNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-transparent p-4 w-full flex justify-center">
      <nav className="bg-[#1a1a1c] rounded-2xl px-6 py-3 shadow-md w-full max-w-6xl flex flex-col md:flex-row justify-between items-center transition-all duration-300">
        
        {/* LEFT: Brand / Logo & Mobile Toggle */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link href="/" className="flex items-center gap-1 font-bold text-2xl tracking-tight">
            <span className="text-[#008ae6]">hire</span>
            <span className="text-[#ff6600]">loop</span>
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
        <div className={`${isMobileMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center gap-6 mt-6 md:mt-0 w-full md:w-auto`}>
          
          {/* Mapped Navigation Links */}
          <ul className="flex flex-col md:flex-row gap-6 items-center m-0 p-0 list-none w-full md:w-auto">
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
          <ul className="flex flex-col md:flex-row items-center gap-6 m-0 p-0 list-none w-full md:w-auto pb-4 md:pb-0">
            <li>
              <Link href="/login" className="text-[#8473ff] text-sm font-medium hover:text-indigo-300 transition-colors block">
                Sign In
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link 
                href="/signup" 
                className="bg-[#6b58ff] hover:bg-[#5a48e6] text-white rounded-xl text-sm font-medium px-6 py-2 transition-all shadow-lg shadow-indigo-500/20 flex justify-center w-full md:w-auto"
              >
                Get Started
              </Link>
            </li>
          </ul>

        </div>
      </nav>
    </header>
  );
}