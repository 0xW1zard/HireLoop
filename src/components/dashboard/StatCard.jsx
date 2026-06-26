import React from "react";

export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-[#141416] border border-[#232326] rounded-2xl p-6 flex flex-col justify-between min-h-[160px] transition-all duration-300 hover:border-zinc-700 hover:bg-[#18181a]">
      {/* Icon Container */}
      <div className="w-10 h-10 bg-[#1D1D20] border border-[#2E2E33] rounded-lg flex items-center justify-center text-[#A1A1AA] mb-4">
        {icon}
      </div>
      
      {/* Text Content */}
      <div className="mt-auto">
        <p className="text-[#8E8E93] text-[13px] font-medium mb-1.5 tracking-wide">
          {title}
        </p>
        <h3 className="text-white text-3xl font-semibold tracking-tight">
          {value}
        </h3>
      </div>
    </div>
  );
}