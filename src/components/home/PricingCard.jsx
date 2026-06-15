import React from 'react';

export default function PricingCard({ plan, price, features, icon, isFeatured }) {
  return (
    <div className={`rounded-2xl p-6 flex flex-col justify-between border transition-all duration-300 min-h-[460px] 
      ${isFeatured 
        ? 'bg-[#121214] border-[#3a3a3c] shadow-2xl shadow-purple-950/10' 
        : 'bg-[#0F0F11] border-[#1F1F23] hover:border-zinc-800'
      }`}
    >
      <div>
        {/* Card Header: Title & Price */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1D1D20] flex items-center justify-center text-zinc-400">
              {icon}
            </div>
            <h3 className="text-white text-base font-medium tracking-wide">{plan}</h3>
          </div>
          <div className="flex items-baseline text-white">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-4xl font-semibold tracking-tight">{price}</span>
            <span className="text-[#8E8E93] text-xs ml-1">/month</span>
          </div>
        </div>

        {/* Feature List Title */}
        <p className="text-white text-xs font-medium mb-4 tracking-wide">
          Start building your insights hub:
        </p>

        {/* Feature List */}
        <ul className="space-y-3.5 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start space-x-3 text-[13px] text-[#8E8E93]">
              <span className="w-4 h-4 rounded border border-[#3A3AF4] flex items-center justify-center shrink-0 mt-0.5 text-[#3A3AF4] font-bold text-[10px]">
                ＋
              </span>
              <span className="leading-tight font-normal">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <button className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-medium transition-all duration-200 group active:scale-[0.98]
        ${isFeatured 
          ? 'bg-white text-black hover:bg-[#E5E5EA]' 
          : 'bg-[#242427] text-white hover:bg-[#2C2C2E]'
        }`}
      >
        <span>Choose This Plan</span>
        <svg 
          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>
  );
}