'use client';
import React, { useState, useEffect } from 'react';
import { getJobs } from '@/lib/api/jobs';
import JobCardFlat from '@/components/home/JobCardFlat';

export default function BrowseJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search, Filters & Sort State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState('recent'); // 'recent' or 'oldest'

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Handle Checkbox Toggles
  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
    setCurrentPage(1); // Reset to first page on filter change
  };

  // 1. Filter Logic
  const filteredJobs = jobs.filter(job => {
    if (job.status !== 'active' || !job.isPubliclyVisible) return false;

    // Search filter
    const matchesSearch =
      job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Sidebar Checkbox filter
    if (selectedTypes.length > 0) {
      const normalizedJobType = job.jobType?.toLowerCase() || '';
      const matchesType = selectedTypes.some(type => normalizedJobType.includes(type.toLowerCase()));
      if (!matchesType) return false;
    }

    return true;
  });

  // 2. Sort Logic (Applied after filtering)
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    // Assuming your jobs have a 'createdAt' or similar date field. 
    // If not, replace 'createdAt' with your actual timestamp field.
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);

    return sortBy === 'recent' ? dateB - dateA : dateA - dateB;
  });

  // 3. Pagination Logic (Applied after sorting)
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);
  const currentJobs = sortedJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111111]">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] py-8 px-4 sm:px-6 lg:px-8 pt-30 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Search Bar */}
        <div className="bg-[#1A1A1A] p-3 rounded-2xl border border-neutral-800 flex items-center shadow-lg shadow-black/50">
          <div className="pl-4 pr-3 text-neutral-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by job title, keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-neutral-500 focus:outline-none py-2"
          />
          <button className="bg-white text-black px-6 py-2.5 rounded-xl font-semibold hover:bg-neutral-200 transition-colors ml-4">
            Search Jobs
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Sidebar: Filters */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="bg-[#1A1A1A] border border-neutral-800 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Filters</h2>

              <div>
                <h3 className="text-sm font-medium text-neutral-300 mb-4">Job Type</h3>
                <div className="space-y-4">
                  <FilterCheckbox
                    label="Full-time"
                    count="1.2k"
                    isChecked={selectedTypes.includes('full-time')}
                    onChange={() => handleTypeToggle('full-time')}
                  />
                  <FilterCheckbox
                    label="Contract"
                    count="432"
                    isChecked={selectedTypes.includes('contract')}
                    onChange={() => handleTypeToggle('contract')}
                  />
                  <FilterCheckbox
                    label="Freelance"
                    count="156"
                    isChecked={selectedTypes.includes('freelance')}
                    onChange={() => handleTypeToggle('freelance')}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Content */}
          <main className="flex-1 flex flex-col min-h-150 ">

            {/* Header / Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-2xl font-bold text-white">
                Found {sortedJobs.length.toLocaleString()} Professional Jobs
              </h1>
              <div className="flex items-center gap-2 mt-4 sm:mt-0 text-sm">
                <span className="text-neutral-500">Sort by:</span>

                {/* Fixed Sort Button */}
                <button
                  onClick={() => setSortBy(prev => prev === 'recent' ? 'oldest' : 'recent')}
                  className="text-neutral-300 font-medium flex items-center gap-1 hover:text-white transition-colors"
                >
                  {sortBy === 'recent' ? 'Most Recent' : 'Oldest First'}
                  <svg className={`w-4 h-4 transition-transform ${sortBy === 'oldest' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Jobs List */}
            <div className="space-y-4 flex-1 ">
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <JobCardFlat key={job._id || job.id} job={job} />
                ))
              ) : (
                <div className="text-center py-20 bg-[#1A1A1A] border border-neutral-800 rounded-2xl">
                  <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
                  <p className="text-neutral-400">Try adjusting your search or filters.</p>
                  <button
                    onClick={() => { setSearchTerm(''); setSelectedTypes([]); }}
                    className="mt-4 text-purple-400 hover:text-purple-300 font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2 pb-8">
                <PaginationButton
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </PaginationButton>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <PaginationButton
                        key={page}
                        isActive={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationButton>
                    );
                  }
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="text-neutral-500 px-1">...</span>;
                  }
                  return null;
                })}

                <PaginationButton
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </PaginationButton>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}

// ---------------------------
// Reusable Sub-components
// ---------------------------

function FilterCheckbox({ label, count, isChecked, onChange }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      {/* CRITICAL FIX: Added a visually hidden native checkbox element. 
        This is required so the browser actually triggers the onChange event when the label is clicked. 
      */}
      <input
        type="checkbox"
        className="hidden"
        checked={isChecked}
        onChange={onChange}
      />

      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isChecked
          ? 'bg-white border-white'
          : 'bg-transparent border-neutral-600 group-hover:border-neutral-400'
          }`}>
          {isChecked && (
            <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className={`text-sm ${isChecked ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-300'}`}>
          {label}
        </span>
      </div>
      <span className="text-xs text-neutral-600 font-medium">{count}</span>
    </label>
  );
}

function PaginationButton({ children, isActive, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed text-neutral-600 border border-neutral-800' : 'cursor-pointer'}
        ${isActive
          ? 'bg-white text-black'
          : 'bg-[#1A1A1A] text-neutral-400 border border-neutral-800 hover:border-neutral-500 hover:text-white'}
      `}
    >
      {children}
    </button>
  );
}