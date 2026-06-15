import React from 'react';

const CtaSection = () => {
    return (
        <main
            className="w-full relative min-h-150 flex flex-col items-center justify-center text-center px-6 bg-cover bg-bottom bg-no-repeat"
            style={{
                backgroundImage: "url('/cta-bg.png')",
                backgroundPosition: "center",
                backgroundSize: "150% 200%",
                overflow: "hidden",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Top Radial Soft Shadow for Gradient Blending */}
            <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#09090B] to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4 leading-tight">
                    Your next role is<br />already looking for you
                </h2>
                <p className="text-[#8E8E93] text-sm md:text-base font-normal max-w-md mb-8 leading-relaxed">
                    Build a profile in three minutes. The matches start arriving tomorrow morning.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button className="w-full sm:w-auto bg-white text-black font-medium text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:bg-[#E5E5EA] active:scale-95 shadow-lg whitespace-nowrap">
                        Create a free account
                    </button>
                    <button className="w-full sm:w-auto bg-transparent text-white border border-[#2E2E33] font-medium text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:bg-white/5 active:scale-95 whitespace-nowrap">
                        View pricing
                    </button>
                </div>
            </div>
        </main>
    );
};

export default CtaSection;