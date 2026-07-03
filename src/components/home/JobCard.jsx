import React from 'react';
import Link from 'next/link';

export default function JobCard({ job }) {
  return (
    <div className="bg-[#161616] rounded-3xl p-6 flex flex-col h-full border border-neutral-800 transition-transform hover:-translate-y-1">
      
      {/* Top Section flex-grow pushes the Apply button to the very bottom uniformly */}
      <div className="flex flex-col grow">
        
        {/* Header & Description */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">{job?.jobTitle}</h3>
          
          {/* line-clamp-2 forces exactly 2 lines of text visually, fixing the uneven heights */}
          <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">
            {job?.responsibilities || "Showcase your commitment to diversity and inclusion by highlighting initiatives"}
          </p>
        </div>

        {/* Pills Container */}
        <div className="flex flex-wrap gap-2 mb-8">
          
          {/* Location Pill */}
          <div className="bg-[#242424] text-neutral-300 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 max-w-full">
            <svg className="w-3.5 h-3.5 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            {/* truncate prevents super long locations from forcing ugly wraps */}
            <span className="truncate">
              {job?.isRemote ? 'Remote' : job?.location}
            </span>
          </div>
          
          {/* Work Type Pill (Fixed logic) */}
          <div className="bg-[#242424] text-neutral-300 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 whitespace-nowrap">
            <svg className="w-3.5 h-3.5 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            {job?.jobType?.replace('-', ' ')}
          </div>

          {/* Salary Pill */}
          <div className="bg-[#242424] text-neutral-300 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 whitespace-nowrap">
            <svg className="w-3.5 h-3.5 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {job?.currency === 'USD' ? '$' : job?.currency}{job?.minSalary}k - {job?.maxSalary}k/year
          </div>
        </div>
      </div>

      {/* Action Button locked to bottom */}
      <Link 
        href={`/jobs/${job?._id || '123'}`} 
        className="text-white text-sm font-semibold flex items-center gap-2 hover:text-purple-400 transition-colors w-fit mt-auto"
      >
        Apply Now 
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </Link>
    </div>
  );
}