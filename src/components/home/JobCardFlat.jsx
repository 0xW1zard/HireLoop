import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function JobCardFlat({ job }) {
    // Format salary
    const formatSalary = () => {
        if (!job.minSalary || !job.maxSalary) return 'Salary Undisclosed';
        const currency = job.currency === 'USD' ? '$' : (job.currency || '$');
        return `${currency}${job.minSalary}k - ${currency}${job.maxSalary}k`;
    };

    // Determine special tag based on job properties (Mock logic based on image tags)
    const getSpecialTag = () => {
        if (job?.isHot || job?.tags?.includes('hot')) {
            return (
                <Link href={`/jobs/${job?._id || '123'}`} rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                    </svg>
                    Hot Job
                </Link>
            );
        }
        else {
            return (
                <Link href={`/jobs/${job?._id || '123'}`} rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-medium hover:bg-green-500/30 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Easy Apply <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            );
        }
        return null;
    };

    return (
        <div className="flex items-center justify-between p-6 bg-[#1A1A1A] border border-neutral-800 rounded-2xl hover:border-neutral-600 transition-colors cursor-pointer group">

            <div className="flex items-start gap-5">
                {/* Company Logo */}
                <div className="w-14 h-14 bg-[#242424] border border-neutral-700 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                    {job.companyLogo ? (
                        <Image src={job.companyLogo} alt={job.companyName} width={40} height={40} className="object-contain" />
                    ) : (
                        <div className="text-neutral-500 font-bold text-xl">
                            {(job.companyName || 'C').charAt(0)}
                        </div>
                    )}
                </div>

                {/* Job Details */}
                <div className="space-y-3">
                    <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                            {job.jobTitle}
                        </h3>
                        <p className="text-sm text-neutral-400 mt-1">
                            {job.companyName} • {job.location} {job.isRemote && '(Remote)'}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Salary Tag */}
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2A2A2A] text-neutral-300 text-xs font-medium">
                            <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {formatSalary()}
                        </div>

                        {/* Job Type Tag */}
                        {job.jobType && (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2A2A2A] text-neutral-300 text-xs font-medium capitalize">
                                <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {job.jobType.replace('-', ' ')}
                            </div>
                        )}

                        {
                            job.location == 'Remote' ? (
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2A2A2A] text-neutral-300 text-xs font-medium">
                                    Remote
                                </div>
                            ) : (
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2A2A2A] text-neutral-300 text-xs font-medium">
                                    OnSite
                                </div>
                            )
                        }

                        {/* Dynamic Special Tag (Easy Apply / Hot Job) */}
                        {getSpecialTag()}

                    </div>
                </div>
            </div>

            {/* Bookmark Icon */}
            <button className="text-neutral-500 hover:text-white transition-colors self-start p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
            </button>

        </div>
    );
}