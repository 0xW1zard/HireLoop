import React from "react";
import Link from "next/link";
import Image from "next/image";

// Define footer links data at the top for easy management
const FOOTER_DATA = {
  product: [
    { label: "Job discovery", href: "/jobs" },
    { label: "Worker AI", href: "/ai" },
    { label: "Companies", href: "/companies" },
    { label: "Salary data", href: "/salaries" },
  ],
  navigations: [
    { label: "Help center", href: "/help" },
    { label: "Career library", href: "/library" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Brand Guideline", href: "/brand" },
    { label: "Newsroom", href: "/news" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black w-full pt-16 pb-8 px-6 flex justify-center border-t border-zinc-900">
      <div className="w-full max-w-6xl">
        
        {/* TOP SECTION: Links and Brand */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
          
          {/* Brand & Description (Takes up more space on desktop) */}
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="flex items-center gap-1 font-bold text-3xl tracking-tight">
              <Image src="/logo.png" alt="HireLoop Logo" width={120} height={120} className="w-auto h-auto" />
            </Link>
            <p className="text-zinc-500 text-sm mt-4 max-w-xs leading-relaxed font-medium">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Links Columns Container */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Product Column */}
            <div>
              <h3 className="text-[#5a48e6] font-medium mb-6">Product</h3>
              <ul className="flex flex-col gap-4 m-0 p-0 list-none">
                {FOOTER_DATA.product.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigations Column */}
            <div>
              <h3 className="text-[#5a48e6] font-medium mb-6">Navigations</h3>
              <ul className="flex flex-col gap-4 m-0 p-0 list-none">
                {FOOTER_DATA.navigations.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-[#5a48e6] font-medium mb-6">Resources</h3>
              <ul className="flex flex-col gap-4 m-0 p-0 list-none">
                {FOOTER_DATA.resources.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: Socials & Copyright */}
        <div className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href="#" className="bg-[#111113] hover:bg-[#1a1a1c] text-zinc-400 hover:text-white p-2.5 rounded-lg transition-all" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="bg-[#5a48e6] hover:bg-[#6b58ff] text-white p-2.5 rounded-lg transition-all" aria-label="Pinterest">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z" />
              </svg>
            </a>
            <a href="#" className="bg-[#111113] hover:bg-[#1a1a1c] text-zinc-400 hover:text-white p-2.5 rounded-lg transition-all" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          {/* Legal / Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-zinc-600 text-sm font-medium">
            <p>Copyright 2024 —Programming Hero</p>
            <p className="hidden sm:block">|</p>
            <div className="flex gap-2">
              <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms & Policy</Link>
              <span>-</span>
              <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Guideline</Link>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}