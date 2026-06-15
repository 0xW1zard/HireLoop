'use client';
import React, { useState } from 'react';
import PricingCard from './PricingCard';

export default function PricingSection() {
    const [isYearly, setIsYearly] = useState(false);

    const plans = [
        {
            plan: "Starter",
            price: isYearly ? "0" : "0", // Add alternative pricing if needed
            isFeatured: false,
            icon: (
                <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
            ),
            features: [
                "Daily AI match brief (top 5)",
                "Verified salary bands",
                "Company insight dashboards",
                "1-click apply, unlimited"
            ]
        },
        {
            plan: "Growth",
            price: isYearly ? "12" : "17", // Dynamic calculation based on toggle state
            isFeatured: true,
            icon: (
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
                </svg>
            ),
            features: [
                "Daily AI match brief (top 5)",
                "Verified salary bands",
                "Company insight dashboards",
                "1-click apply, unlimited"
            ]
        },
        {
            plan: "Premium",
            price: isYearly ? "75" : "99",
            isFeatured: false,
            icon: (
                <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.972 9.5h5.392a.75.75 0 01.554 1.255l-8 8.5a.75.75 0 01-1.233-.708L11.028 11.5H5.636a.75.75 0 01-.554-1.255l8-8.5a.75.75 0 01.533-.15z" clipRule="evenodd" />
                </svg>
            ),
            features: [
                "Everything in Pro",
                "Multi-profile career portfolios",
                "Shared talent rooms",
                "Recruiter view (read-only)"
            ]
        }
    ];

    return (
        <div className="bg-[#09090B] min-h-screen text-white font-sans flex flex-col items-center justify-between">

            {/* ================= PRICING SECTION ================= */}
            <section className="w-full max-w-5xl px-6 pt-20 pb-16 flex flex-col items-center">
                {/* Top Tag */}
                <div className="flex items-center space-x-2 text-[11px] font-bold tracking-[0.25em] text-[#3A3AF4] mb-4">
                    <span>▪</span>
                    <span className="text-[#8E8E93] uppercase font-semibold">Pricing</span>
                    <span>▪</span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-medium text-center tracking-tight max-w-2xl mb-8 leading-tight">
                    Pay for the leverage,<br />not the listings
                </h2>

                {/* Billing Toggle Switch */}
                <div className="bg-[#141416] border border-[#232326] p-1 rounded-full flex items-center space-x-1 mb-14">
                    <button
                        onClick={() => setIsYearly(false)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 
              ${!isYearly ? 'bg-white text-black' : 'text-[#8E8E93] hover:text-white'}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setIsYearly(true)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center space-x-1.5
              ${isYearly ? 'bg-white text-black' : 'text-[#8E8E93] hover:text-white'}`}
                    >
                        <span>Yearly</span>
                        <span className="bg-[#BF5AF2] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                            25%
                        </span>
                    </button>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {plans.map((plan, idx) => (
                        <PricingCard key={idx} {...plan} />
                    ))}
                </div>
            </section>
        </div>
    );
}