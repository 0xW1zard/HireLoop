import React from 'react';

export default function FeatureItem({ title, description, icon }) {
  return (
    <div className="flex items-start space-x-4 group">
      {/* Icon Wrapper Box */}
      <div className="w-14 h-14 bg-[#0F0F11] border border-[#1F1F23] rounded-xl flex items-center justify-center shrink-0 shadow-inner transition-colors duration-300 group-hover:border-zinc-700">
        <span className="text-[#D6A3FF]">
          {icon}
        </span>
      </div>
      
      {/* Text Content */}
      <div className="flex flex-col space-y-1 pt-1">
        <h3 className="text-white text-sm font-medium tracking-wide">
          {title}
        </h3>
        <p className="text-[#8E8E93] text-[13px] leading-relaxed font-normal max-w-60">
          {description}
        </p>
      </div>
    </div>
  );
}