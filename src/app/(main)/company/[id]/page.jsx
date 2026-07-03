import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getJobs } from '@/lib/api/jobs';
import { getCompanyById } from '@/lib/api/companies';
import {
    Globe,
    MapPin,
    Users,
    ExternalLink,
    ArrowLeft
} from "lucide-react";

export default async function CompanyJobsPage({ params }) {
    // 1. Await params (Next.js 15 standard) and extract the company ID
    const { id } = await params;
    const company = await getCompanyById(id);
    const jobs = await getJobs(id, 'active');

    // Filter for publicly visible jobs
    const visibleJobs = jobs.filter(job => job.isPubliclyVisible);

    return (
        <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 mt-14">
            <div className="container mx-auto max-w-7xl space-y-8 pb-12">

                {/* Navigation Breadcrumb */}
                <div>
                    <Link
                        href="/jobs"
                        className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors inline-flex items-center gap-2"
                    >
                        <ArrowLeft size={16} />
                        Back to all jobs
                    </Link>
                </div>

                {/* 1. HERO BANNER SECTION */}
                <div className="relative w-full rounded-2xl bg-zinc-950 border border-zinc-800/60 overflow-hidden min-h-80 flex flex-col justify-end p-8 mt-6">

                    {/* Make sure you have a globe.png in your public folder */}
                    <Image src="/globe.png" alt="Company Cover" fill priority className="object-cover opacity-70 pointer-events-none z-0 " />

                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none z-0" />

                    {/* Content Container */}
                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex items-center gap-6">
                            {/* Company Logo Box */}
                            <div className="w-24 h-24 rounded-2xl bg-[#111113] border border-purple-600/30 flex items-center justify-center shrink-0 overflow-hidden shadow-2xl">
                                {company?.logo ? (
                                    <Image src={company.logo} alt={company.name} width={96} height={96} className="object-cover w-full h-full" />
                                ) : (
                                    <span className="text-3xl font-bold text-purple-500">{company?.name?.charAt(0) || "C"}</span>
                                )}
                            </div>

                            {/* Title & Tagline */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-3xl font-bold text-white tracking-tight">{company?.name || 'Company Name'}</h1>
                                </div>
                                <p className="text-sm text-zinc-400 max-w-2xl">{company?.industry || 'Technology & Innovation'}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 shrink-0">
                            {company?.websiteUrl && (
                                <a href={company.websiteUrl} target="_blank" rel="noreferrer">
                                    <button className="bg-white text-black hover:bg-zinc-200 rounded-lg px-6 font-medium h-10 flex items-center gap-2 transition-colors">
                                        <Globe size={16} /> Visit Website
                                    </button>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. MAIN CONTENT GRID (2 Columns) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- LEFT COLUMN (Wider Content Area) --- */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* About Section */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-white tracking-tight">About {company?.name?.split(' ')[0] || 'Us'}</h2>
                            <div className="text-zinc-400 text-sm leading-relaxed space-y-4">
                                <p>{company?.description || `${company?.name} is exploring new frontiers in their industry. Explore their open roles to join the team.`}</p>
                            </div>
                        </section>

                        {/* Stats Grid */}
                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold text-white tracking-tight">Company Stats</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/* Stat Card 1 */}
                                <div className="bg-[#111113] border border-zinc-800/50 p-5 rounded-xl space-y-3">
                                    <Users size={20} className="text-zinc-500" />
                                    <div>
                                        <div className="text-xl font-bold text-white">{company?.employeeCount || 'Growing'}</div>
                                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">Employees</div>
                                    </div>
                                </div>
                                {/* Stat Card 2 */}
                                <div className="bg-[#111113] border border-zinc-800/50 p-5 rounded-xl space-y-3">
                                    <MapPin size={20} className="text-zinc-500" />
                                    <div>
                                        <div className="text-xl font-bold text-white truncate">{company?.location || 'Global'}</div>
                                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">Headquarters</div>
                                    </div>
                                </div>
                                {/* Stat Card 3 */}
                                <div className="bg-[#111113] border border-zinc-800/50 p-5 rounded-xl space-y-3">
                                    <Globe size={20} className="text-zinc-500" />
                                    <div>
                                        <div className="text-xl font-bold text-white">{visibleJobs.length}</div>
                                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">Active Roles</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* --- RIGHT COLUMN (Side Panel Area) --- */}
                    <div className="space-y-6">

                        {/* Active Roles Panel */}
                        <div className="bg-[#111113] border border-zinc-800/50 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-base font-semibold text-white">Active Roles</h3>
                                <span className="bg-zinc-800 text-zinc-300 text-xs px-2 py-0.5 rounded-md font-medium">
                                    {visibleJobs.length}
                                </span>
                            </div>

                            {visibleJobs.length > 0 ? (
                                <div className="space-y-6">
                                    {visibleJobs.map((job) => (
                                        <div key={job.id || job._id} className="group border-b border-zinc-800/50 pb-5 last:border-0 last:pb-0">
                                            <Link href={`/jobs/${job.id || job._id}`} className="block">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="text-sm font-medium text-zinc-200 group-hover:text-purple-400 transition-colors cursor-pointer">
                                                        {job.jobTitle}
                                                    </h4>
                                                    <ExternalLink size={14} className="text-zinc-600 shrink-0 ml-2 group-hover:text-purple-400 transition-colors" />
                                                </div>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    <span className="bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-[10px] px-2 py-1 rounded-md truncate max-w-[120px]">
                                                        {job.isRemote ? 'Remote' : job.location}
                                                    </span>
                                                    <span className="bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-[10px] px-2 py-1 rounded-md">
                                                        {job.currency === 'USD' ? '$' : job.currency}{job.minSalary}k - {job.maxSalary}k
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <span className="text-[10px] text-zinc-500 font-medium capitalize">
                                                            {job.jobType.replace('-', ' ')}
                                                        </span>
                                                    </div>
                                                    <button className="bg-white text-black h-7 px-3 rounded text-xs font-semibold hover:bg-zinc-200 transition-colors">
                                                        Apply
                                                    </button>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center">
                                    <p className="text-sm text-zinc-500">No active roles right now.</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}