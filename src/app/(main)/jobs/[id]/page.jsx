import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import JobCard from '@/components/home/JobCard';
import { getCompanyJobs, getJobById } from '@/lib/api/jobs';
import { getCompanyById } from '@/lib/api/companies';

export default async function JobDetailsPage({ params }) {
  const { id } = await params;
  
  const job = await getJobById(id);
  const relatedJobs = await getCompanyJobs(job.companyId);
  const company = await getCompanyById(job.companyId);
  
  const otherJobs = relatedJobs.filter((j) => j._id !== id).slice(0, 3);

  if (!job) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center text-xl font-bold text-white">
        Job not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] pt-30 text-neutral-300 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header Section */}
        <div className="bg-[#1C1C1C] rounded-2xl p-6 sm:p-8 border border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-[#111111] rounded-xl border border-neutral-800 flex items-center justify-center p-2 shrink-0">
              {/* Ensure you have a fallback if company.logo is missing */}
              <Image src={company.logo || '/default-logo.png'} alt={company.name} width={48} height={48} className="rounded-lg object-contain" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{job.jobTitle}</h1>
              <div className="flex items-center gap-3 mt-2 text-sm">
                <span className="text-neutral-400">{company.name}</span>
                <span className="text-neutral-600">•</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                  Verified Employer
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button className="p-3 bg-[#242424] text-neutral-400 rounded-lg hover:bg-[#2A2A2A] hover:text-white transition-colors border border-neutral-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button className="flex-1 sm:flex-none bg-white text-black px-6 py-2.5 rounded-lg font-medium hover:bg-neutral-200 transition-colors">
              Apply Now
            </button>
          </div>
        </div>

        {/* Four Info Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
            label="SALARY RANGE" 
            value={job.currency === 'USD' ? `$${job.minSalary}k - $${job.maxSalary}k` : `${job.minSalary}k - ${job.maxSalary}k ${job.currency}`} 
          />
          <StatCard 
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />}
            label="LOCATION" 
            value={job.isRemote ? 'Remote (US)' : job.location} 
          />
          <StatCard 
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
            label="JOB TYPE" 
            value={job.jobType.replace('-', ' ')} 
          />
          <StatCard 
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
            label="EXPERIENCE" 
            value="5+ Years" 
          />
        </div>

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Job Content */}
          <div className="lg:col-span-2 bg-[#1C1C1C] rounded-2xl p-8 border border-neutral-800 space-y-10">
            
            {/* Job Description */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Job Description</h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {/* Dynamically render job description if it exists, otherwise fall back */}
                At {company.name}, we are building the next generation of infrastructure monitoring tools. We are looking for a {job.jobTitle} who is passionate about translating complex technical workflows into elegant, intuitive interfaces. You will be a key member of our design team, working closely with engineering and product leadership to define the vision for our core platform experience.
              </p>
            </section>

            {/* Responsibilities */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Responsibilities</h2>
              <ul className="list-disc pl-5 text-sm text-neutral-400 leading-relaxed space-y-3 marker:text-neutral-600">
                {/* Map through your actual responsibilities array if you have one, or render text */}
                <li>Lead the end-to-end design process for major platform features, from discovery to high-fidelity implementation.</li>
                <li>Collaborate with cross-functional partners to understand user needs and translate them into functional design requirements.</li>
                <li>Maintain and evolve our design system, ensuring consistency and accessibility across the entire product suite.</li>
                <li>Conduct user research and usability testing to validate design decisions and iterate based on feedback.</li>
              </ul>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Requirements</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                <Tag text="Figma Expertise" icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />} />
                <Tag text="System Thinking" icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z M9 12h6 M12 9v6" />} />
                <Tag text="UI/UX Design" icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />} />
                <Tag text="Basic Frontend" icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />} />
              </div>
              <ul className="list-disc pl-5 text-sm text-neutral-400 leading-relaxed space-y-3 marker:text-neutral-600">
                <li>5+ years of experience designing complex B2B SaaS products or data-heavy applications.</li>
                <li>A strong portfolio showcasing your design process and problem-solving skills.</li>
              </ul>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-6">Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <BenefitCard 
                  title="Full Health & Dental" 
                  icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />} 
                />
                <BenefitCard 
                  title="Competitive 401k" 
                  icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />} 
                />
                <BenefitCard 
                  title="Latest Hardware Stipend" 
                  icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />} 
                />
                <BenefitCard 
                  title="Unlimited PTO" 
                  icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />} 
                />
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#1C1C1C] rounded-2xl p-6 border border-neutral-800">
              <h3 className="text-lg font-semibold text-white mb-6">Company Overview</h3>
              
              {/* Office Image Placeholder - Add your own image to public folder */}
              <div className="w-full h-40 bg-[#111111] rounded-xl mb-6 relative overflow-hidden border border-neutral-800">
                 {/* Replace src with an actual office image path if you have one */}
                <Image src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dcompany-office.jpg/" alt={`${company.name} office`} fill className="object-cover opacity-80" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
                  <span className="text-xs font-semibold text-neutral-500 tracking-wider">SIZE</span>
                  <span className="text-sm text-neutral-300">250 - 500 Employees</span>
                </div>
                <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
                  <span className="text-xs font-semibold text-neutral-500 tracking-wider">INDUSTRY</span>
                  <span className="text-sm text-neutral-300">SaaS / Artificial Intelligence</span>
                </div>
                <div className="pt-2 text-center">
                  <Link href={company.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-white transition-colors">
                    Visit Website
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Keeping your existing More Jobs logic intact */}
            {otherJobs.length > 0 && (
              <div className="pt-4">
                <h3 className="text-lg font-bold text-white mb-4">More from {company.name}</h3>
                <div className="flex flex-col gap-4">
                  {otherJobs.map((otherJob, idx) => (
                    <div key={idx}>
                      <JobCard job={otherJob} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// ---------------------------
// Helper Components
// ---------------------------

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-[#1C1C1C] rounded-2xl p-5 border border-neutral-800 flex flex-col gap-3">
      <div className="text-neutral-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <div>
        <div className="text-[10px] font-bold text-neutral-500 tracking-widest mb-1">{label}</div>
        <div className="text-sm font-medium text-white">{value}</div>
      </div>
    </div>
  );
}

function Tag({ icon, text }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#242424] border border-neutral-700 rounded-full text-xs font-medium text-neutral-300">
      <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icon}
      </svg>
      {text}
    </div>
  );
}

function BenefitCard({ icon, title }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-[#242424] border border-neutral-700 flex items-center justify-center shrink-0 text-neutral-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <span className="text-sm font-medium text-neutral-300">{title}</span>
    </div>
  );
}