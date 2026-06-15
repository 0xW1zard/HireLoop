import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
      <main className="relative text-white flex flex-col items-center justify-center text-center flex-1 px-4 pt-30 w-full min-h-screen overflow-hidden">

        {/* SVG Noise/Particle/Globe Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-50 bg-cover pointer-events-none h-500"
          style={{
            backgroundImage: "url('/globe.png')",
            backgroundPosition: "center",
            backgroundSize: "100% auto",
            overflow: "hidden",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="z-10 flex flex-col items-center w-full max-w-6xl mt-20">

          {/* Top Badge */}
          <div className="flex items-center justify-center w-full max-w-3xl mx-auto py-10">
            <div className="h-px flex-1 bg-linear-to-r from-transparent to-indigo-500/30"></div>
            <div className="bg-[#111113] px-4 py-2 rounded-full flex items-center gap-2.5 shadow-lg border border-indigo-500/50">
              <svg className="w-5 h-5 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-.89l1-9A1 1 0 0017 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm sm:text-base font-bold text-white">50,000+</span>
                <span className="text-xs sm:text-sm font-medium text-zinc-400 uppercase tracking-wide">NEW JOBS THIS MONTH</span>
              </div>
            </div>
            <div className="h-px flex-1 bg-linear-to-l from-transparent to-indigo-500/30"></div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mt-6 max-w-4xl text-white tracking-tight leading-tight">
            Find Your Dream Job Today
          </h1>

          {/* Description */}
          <p className="text-zinc-400 mt-6 max-w-2xl text-lg leading-relaxed font-medium">
            HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
          </p>

          {/* Search Bar */}
          <div className="bg-[#111113] mt-12 w-full max-w-3xl flex flex-col sm:flex-row items-center rounded-xl sm:rounded-2xl shadow-2xl shadow-indigo-500/10 border border-zinc-800 p-2 sm:gap-2">

            {/* Job Search Input */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 sm:py-2 border-b sm:border-b-0 sm:border-r border-zinc-800 w-full">
              <svg className="w-5 h-5 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Job title, skill or company"
                className="bg-transparent text-zinc-200 placeholder:text-zinc-600 focus:outline-none w-full text-sm font-medium"
              />
            </div>

            {/* Location Input */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 sm:py-2 w-full">
              <svg className="w-5 h-5 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                placeholder="Location or Remote"
                className="bg-transparent text-zinc-200 placeholder:text-zinc-600 focus:outline-none w-full text-sm font-medium"
              />
            </div>

            {/* Search Button */}
            <button className="bg-[#6b58ff] hover:bg-[#5a48e6] w-full sm:w-auto p-4 rounded-2xl flex items-center justify-center transition-colors shadow-lg shadow-indigo-500/20 mt-2 sm:mt-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Trending Positions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 text-zinc-400">
            <span className="text-sm font-medium mb-2 sm:mb-0">Trending Position</span>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/jobs?q=Product+Designer" className="text-xs sm:text-sm bg-[#111113] border border-zinc-800 px-4 py-1.5 rounded-full hover:bg-zinc-800 hover:text-white transition-colors">
                Product Designer
              </Link>
              <Link href="/jobs?q=AI+Engineering" className="text-xs sm:text-sm bg-[#111113] border border-zinc-800 px-4 py-1.5 rounded-full hover:bg-zinc-800 hover:text-white transition-colors">
                AI Engineering
              </Link>
              <Link href="/jobs?q=Dev-ops+Engineer" className="text-xs sm:text-sm bg-[#111113] border border-zinc-800 px-4 py-1.5 rounded-full hover:bg-zinc-800 hover:text-white transition-colors">
                Dev-ops Engineer
              </Link>
            </div>
          </div>

          {/* === NEW GLOBE TEXT SECTION === */}
          <div className="mt-64 mb-10">
            <h2 className="text-3xl sm:text-4xl text-zinc-300 font-normal leading-snug">
              Assisting over <span className="font-semibold text-white">15,000 job seekers</span> <br className="hidden sm:block"/> find their dream positions.
            </h2>
          </div>

          {/* === NEW STATISTICS CARDS === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl pb-10">
            
            {/* Card 1: Active Jobs */}
            <div className="border border-zinc-800/60 rounded-2xl p-6 flex flex-col items-start text-left shadow-2xl shadow-gray-100/10 backdrop-blur-sm">
              <svg className="w-6 h-6 text-zinc-400 mb-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">50K</h3>
              <p className="text-zinc-400 text-sm mt-2 font-medium">Active Jobs</p>
            </div>

            {/* Card 2: Companies */}
            <div className="border border-zinc-800/60 rounded-2xl p-6 flex flex-col items-start text-left shadow-2xl shadow-gray-100/10 backdrop-blur-sm">
              <svg className="w-6 h-6 text-zinc-400 mb-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">12K</h3>
              <p className="text-zinc-400 text-sm mt-2 font-medium">Companies</p>
            </div>

            {/* Card 3: Job Seekers */}
            <div className="border border-zinc-800/60 rounded-2xl p-6 flex flex-col items-start text-left shadow-2xl shadow-gray-100/10 backdrop-blur-sm">
              <svg className="w-6 h-6 text-zinc-400 mb-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              <h3 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">2M</h3>
              <p className="text-zinc-400 text-sm mt-2 font-medium">Job Seekers</p>
            </div>

            {/* Card 4: Satisfaction Rate */}
            <div className="border border-zinc-800/60 rounded-2xl p-6 flex flex-col items-start text-left shadow-2xl shadow-gray-100/10 backdrop-blur-sm">
              <svg className="w-6 h-6 text-zinc-400 mb-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <h3 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">97%</h3>
              <p className="text-zinc-400 text-sm mt-2 font-medium">Satisfaction Rate</p>
            </div>

          </div>

        </div>
      </main>
  );
}