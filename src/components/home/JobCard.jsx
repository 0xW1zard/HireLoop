import React from 'react';

export default function JobCard({ 
  title = "Frontend Developer", 
  description = "Showcase your commitment to diversity and inclusion by highlighting initiatives", 
  location = "New York, USA", 
  type = "Hybrid", 
  rate = "€25–€40/hour" 
}) {
  return (
    <div className="bg-[#141416] border border-[#232326] rounded-2xl p-7 flex flex-col justify-between min-h-[290px] transition-all duration-300 hover:border-zinc-700">
      <div>
        {/* Job Title */}
        <h3 className="text-white text-xl font-semibold tracking-wide mb-2">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-[#8E8E93] text-[13px] leading-relaxed mb-6 font-normal">
          {description}
        </p>
        
        {/* Badges/Tags Container */}
        <div className="flex flex-wrap gap-2 items-center mb-6">
          {/* Location Badge */}
          <span className="inline-flex items-center bg-[#1D1D20] text-[#D1D1D6] text-xs px-3 py-1.5 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BF5AF2] mr-2"></span>
            {location}
          </span>

          {/* Job Type Badge */}
          <span className="inline-flex items-center bg-[#1D1D20] text-[#D1D1D6] text-xs px-3 py-1.5 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BF5AF2] mr-2"></span>
            {type}
          </span>
          
          {/* Line break spacer to force rate badge to next line if needed */}
          <div className="w-full h-0"></div>

          {/* Rate Badge */}
          <span className="inline-flex items-center bg-[#1D1D20] text-[#D1D1D6] text-xs px-3 py-1.5 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BF5AF2] mr-2"></span>
            {rate}
          </span>
        </div>
      </div>

      {/* Action Link */}
      <a 
        href="#apply" 
        className="group inline-flex items-center text-white text-sm font-medium hover:text-zinc-300 w-fit transition-colors"
      >
        Apply Now
        <svg 
          className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  );
}