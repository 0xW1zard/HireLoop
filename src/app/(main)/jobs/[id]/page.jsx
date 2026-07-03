import React from 'react';
import Link from 'next/link';
import JobCard from '@/components/home/JobCard'; 
import { getCompanyJobs, getJobById } from '@/lib/api/jobs';
import { getCompanyById } from '@/lib/api/companies';
import Image from 'next/image';

export default async function JobDetailsPage({ params }) {
  const {id} = await params;
  console.log("Fetching details for job ID:", id); 
  
  const job = await getJobById(id);
  const relatedJobs = await getCompanyJobs(job.companyId); 
  const company = await getCompanyById(job.companyId);
  console.log(company);
  
  // Filter out the current job so it doesn't show in the "More jobs" section
  const otherJobs = relatedJobs.filter(j => j._id !== id).slice(0, 3);

  if (!job) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-xl font-bold text-white">Job not found.</div>;
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 mt-14">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Job Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Section */}
          <div className="bg-[#161616] rounded-3xl p-8 border border-neutral-800">
            <h1 className="text-3xl font-bold text-white mb-6">{job.jobTitle}</h1>
            
            {/* Pills styled exactly like the JobCard */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="bg-[#242424] text-neutral-300 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {job.isRemote ? 'Remote' : job.location}
              </div>

              <div className="bg-[#242424] text-neutral-300 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 capitalize whitespace-nowrap">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                {job.jobType.replace('-', ' ')}
              </div>

              <div className="bg-[#242424] text-neutral-300 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 whitespace-nowrap">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {job.currency === 'USD' ? '$' : job.currency}{job.minSalary}k - {job.maxSalary}k/year
              </div>
            </div>

            {/* High contrast apply button for the dark theme */}
            <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
              Apply for this role
            </button>
          </div>

          {/* Description Content */}
          <div className="bg-[#161616] rounded-3xl p-8 border border-neutral-800 space-y-8">
            <section>
              <h3 className="text-xl font-bold text-white mb-4">Responsibilities</h3>
              <p className="text-neutral-400 leading-relaxed whitespace-pre-wrap">
                {job.responsibilities}
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-white mb-4">Requirements</h3>
              <p className="text-neutral-400 leading-relaxed whitespace-pre-wrap">
                {job.requirements}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Benefits</h3>
              <p className="text-neutral-400 leading-relaxed whitespace-pre-wrap">
                {job.benefits}
              </p>
            </section>
          </div>
        </div>

        {/* Right Column: Company & More Jobs Sidebar */}
        <div className="space-y-6">
          
          {/* Company Card adjusted for dark theme */}
          <div className="bg-[#161616] rounded-3xl p-6 border border-neutral-800 sticky top-6">
            <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">About the Company</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-1 border-1 border-neutral-700 rounded-md w-16 h-16 flex items-center justify-center">
                <Image src={company.logo} alt={company.name} className='rounded w-fit h-fit' width={64} height={64} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{company.name}</h4>
                <a href="#" className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors">View company profile</a>
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              We are a global leader in our industry, connecting millions of users with incredible digital experiences.
            </p>
          </div>

          {/* More Jobs from this Company */}
          {otherJobs.length > 0 && (
            <div className="pt-4">
              <h3 className="text-lg font-bold text-white mb-4">More from {company.name}</h3>
              <div className="flex flex-col gap-4">
                {otherJobs.map((otherJob, idx) => (
                  <div key={idx} className="scale-95 origin-top">
                    <JobCard job={otherJob} />
                  </div>
                ))}
              </div>
              <div className="mt-2 text-center">
                <Link 
                  href={`/companies/${job.companyId}`}
                  className="text-sm text-purple-400 font-medium hover:text-purple-300 transition-colors"
                >
                  View all {company.name} open roles →
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}