import React from 'react';
import FeatureItem from './FeatureItem';

export default function FeaturesSection() {
  const featuresData = [
    {
      title: "Smart Search",
      description: "Find your ideal job with advanced filters.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.604 10.604Z" />
        </svg>
      )
    },
    {
      title: "Salary Insights",
      description: "Get real salary data to negotiate confidently.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
      )
    },
    {
      title: "Top Companies",
      description: "Apply to vetted companies that are hiring.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      )
    },
    {
      title: "Saved Jobs",
      description: "Manage apps & favorites on your dashboard.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
        </svg>
      )
    },
    {
      title: "One-Click Apply",
      description: "Simplify your job applications for an easier process!",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 9.152c.582.448 1.148.89 1.676 1.345m-1.676-1.345L12 6.75M15.042 9.152H18.75M16.718 10.497l2.25 1.748m-2.25-1.748v3.522m-4.718-7.272L9.75 5.25m2.25 1.5-1.748 2.25m1.748-2.25V3.75m-6.492 9 6-6M3.75 18.75l3.522-4.718m-3.522 4.718L5.25 15m-1.5 3.75V15" />
        </svg>
      )
    },
    {
      title: "Resume Builder",
      description: "Create professional resumes with modern templates.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm-1.214 6.33a3.75 3.75 0 0 0-4.822 0 1.125 1.125 0 0 0-.364.843v.47a.75.75 0 0 0 .75.75h5.25a.75.75 0 0 0 .75-.75v-.47a1.125 1.125 0 0 0-.364-.843Z" />
        </svg>
      )
    },
    {
      title: "Skill-Based Matching",
      description: "Discover jobs that match your skills and experience.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-5.25v9" />
        </svg>
      )
    },
    {
      title: "Career Growth Resources",
      description: "Boost your career with quick interview tips.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 1.218-5.932m-1.218 5.932-5.932-1.218" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-[#151516] text-white font-sans px-8 py-30 flex flex-col items-center justify-center">
      
      {/* Top Tag Header */}
      <div className="flex items-center justify-center space-x-2 text-[11px] font-bold tracking-[0.25em] text-[#3A3AF4] mb-4">
        <span>▪</span>
        <span className="text-[#8E8E93] uppercase font-semibold">Features Job</span>
        <span>▪</span>
      </div>

      {/* Main Title Head */}
      <h2 className="text-3xl md:text-5xl font-medium text-center tracking-tight max-w-2xl mb-20 leading-tight">
        Everything you need to succeed
      </h2>

      {/* Responsive Grid Layer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14 max-w-7xl w-full px-4">
        {featuresData.map((feature, index) => (
          <FeatureItem
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>

    </section>
  );
}