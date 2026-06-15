import React from 'react';
import JobCard from './JobCard';

export default function JobSection() {
  // Creating an array of 6 identical objects to recreate the grid layout
  const jobData = Array(6).fill({
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    rate: "€25–€40/hour"
  });

  return (
    <div className="bg-[#09090B] min-h-screen text-white font-sans px-6 pt-48 pb-20 flex flex-col items-center">
      
      {/* Subtitle Accent Header */}
      <div className="flex items-center justify-center space-x-2 text-[11px] font-bold tracking-[0.25em] text-[#3A3AF4] mb-4">
        <span>▪</span>
        <span className="text-[#8E8E93] uppercase font-semibold">Smart Job Discovery</span>
        <span>▪</span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl md:text-5xl font-medium text-center tracking-tight max-w-2xl mb-14 leading-tight">
        The roles you'd never find by searching
      </h1>

      {/* Responsive Grid System */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mb-14">
        {jobData.map((job, index) => (
          <JobCard 
            key={index}
            title={job.title}
            description={job.description}
            location={job.location}
            type={job.type}
            rate={job.rate}
          />
        ))}
      </div>

      {/* Bottom Action Button */}
      <button className="bg-white text-black font-medium text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:bg-[#E5E5EA] active:scale-95 shadow-lg">
        View all job open
      </button>

    </div>
  );
}