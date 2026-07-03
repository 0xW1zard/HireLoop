'use client';
import React, { useState, useEffect } from 'react';
import JobCard from '@/components/home/JobCard';
import { getJobs } from '@/lib/api/jobs';

export default function BrowseJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Add state for the search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [workMode, setWorkMode] = useState('all'); // 'all', 'remote', 'onsite'

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        console.log("Fetched jobs:", data); 
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-neutral-500 text-lg font-medium">Loading jobs...</p>
      </div>
    );
  }

  // 2. Combine your base filters with the new search and dropdown filters
  const filteredJobs = jobs.filter(job => {
    // Check base visibility first
    if (job.status !== 'active' || !job.isPubliclyVisible) return false;

    // Search filter (checks job title or company name)
    const matchesSearch = 
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (job.companyId && job.companyId.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (!matchesSearch) return false;

    // Work mode dropdown filter
    if (workMode === 'remote' && !job.isRemote) return false;
    if (workMode === 'onsite' && job.isRemote) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 mt-14">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Explore Open Roles</h1>
          <p className="mt-2 text-neutral-400">Find your next opportunity from our curated list of jobs.</p>
        </div>

        {/* 3. Search and Filter Bar */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4">
          
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#161616] border border-neutral-800 text-white rounded-2xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors placeholder-neutral-500"
            />
          </div>

          {/* Work Mode Dropdown */}
          <div className="sm:w-64">
            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
              className="w-full bg-[#161616] border border-neutral-800 text-white rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors appearance-none cursor-pointer"
              style={{
                // Custom dropdown arrow for a cleaner look
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a3a3a3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.2em 1.2em'
              }}
            >
              <option value="all">All Locations</option>
              <option value="remote">Remote Only</option>
              <option value="onsite">On-Site Only</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-sm font-medium text-neutral-400">
          Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'role' : 'roles'}
        </div>

        {/* Job Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job, index) => (
              <JobCard
                key={job.id || index} 
                job={job}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-[#161616] border border-neutral-800 rounded-3xl">
            <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
            <p className="text-neutral-400">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => { setSearchTerm(''); setWorkMode('all'); }}
              className="mt-6 text-purple-400 font-medium hover:text-purple-300 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}