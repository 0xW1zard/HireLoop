'use client';
import React, { useState, useEffect } from 'react';
// 1. Remove the useDisclosure import completely
import JobCard from '@/components/home/JobCard';
import { getJobs } from '@/lib/api/jobs';

export default function BrowseJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


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
      <div className="min-h-screen flex items-center justify-center ">
        <p className="text-gray-500 text-lg">Loading jobs...</p>
      </div>
    );
  }

  const visibleJobs = jobs.filter(job => job.status === 'active' && job.isPubliclyVisible);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="container mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-200">Explore Open Roles</h1>
          <p className="mt-2 text-gray-600">Find your next opportunity from our curated list of jobs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleJobs.map((job, index) => (
            <JobCard
              key={job.id || index} 
              job={job}
            />
          ))}
        </div>

      </div>
    </div>
  );
}