"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import {
    Globe,
    MapPin,
    Users,
    Plus,
    ExternalLink,
} from "lucide-react";

export default function CompanyProfileView({ company, startEditing, getStatusStyles }) {
    // Fallback data for the mockup elements that might not be in your DB yet
    const aboutText = company?.description || `Founded in 2014, ${company?.name || 'The company'} has emerged as a global leader in high-performance cloud infrastructure... (Update your description to see it here!)`;

    // Mock jobs data (you would pass this as a prop or fetch it in reality)
    const activeRoles = [
        { id: 1, title: "Senior Distributed Systems Engineer", loc: "SF / Remote", pay: "$180k - $240k", applicants: "+12" },
        { id: 2, title: "Product Design Lead", loc: "New York", pay: "$160k - $210k", applicants: "+3" },
        { id: 3, title: "DevOps Architect (Infra)", loc: "Remote", pay: "$190k+", applicants: "+20" },
    ];

    return (
        <div className=" mx-auto w-full space-y-8 pb-12 px-1 md:px-8">

            {/* 1. HERO BANNER SECTION */}
            <div className="relative w-full rounded-2xl bg-zinc-950 border border-zinc-800/60 overflow-hidden min-h-80 flex flex-col justify-end p-8 mt-6">

                <Image src="/globe.png" alt="Company Cover" fill priority className="object-cover opacity-70 pointer-events-none z-0 "/>


                {/* Dark Vignette Overlay (Crucial for keeping text readable over custom images) */}
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none z-0" />

                {/* Content Container (Needs z-10 to sit above the absolute images/gradients) */}
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex items-center gap-6">
                        {/* Company Logo Box */}
                        <div className="w-24 h-24 rounded-2xl bg-[#111113] border border-yellow-600/30 flex items-center justify-center shrink-0 overflow-hidden shadow-2xl">
                            {company?.logo ? (
                                <Image src={company.logo} alt={company.name} width={96} height={96} className="object-cover w-full h-full" />
                            ) : (
                                <span className="text-3xl font-bold text-yellow-500">{company?.name?.charAt(0) || "C"}</span>
                            )}
                        </div>

                        {/* Title & Tagline */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold text-white tracking-tight">{company?.name || 'Company Name'}</h1>
                                <span className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-semibold ${getStatusStyles(company?.status || 'Pending')}`}>
                                    {company?.status || 'Pending'}
                                </span>
                            </div>
                            <p className="text-sm text-zinc-400 max-w-2xl">{company?.industry || 'Industry not specified'}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 shrink-0">
                        {company?.websiteUrl && (
                            <a href={company.websiteUrl} target="_blank" rel="noreferrer">
                                <Button className="bg-white text-black hover:bg-zinc-200 rounded-lg px-6 font-medium h-10 flex items-center gap-2 transition-colors">
                                    <Globe size={16} /> Visit Website
                                </Button>
                            </a>
                        )}
                        <Button
                            onPress={startEditing}
                            variant="bordered"
                            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-lg px-6 font-medium h-10 flex items-center gap-2 transition-colors"
                        >
                            <Plus size={16} /> Edit Profile
                        </Button>

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
                            <p>{company?.description || 'No description available.'}</p>
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
                                    <div className="text-xl font-bold text-white">{company?.employeeCount || '12,400+'}</div>
                                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">Employees</div>
                                </div>
                            </div>
                            {/* Stat Card 2 */}
                            <div className="bg-[#111113] border border-zinc-800/50 p-5 rounded-xl space-y-3">
                                <MapPin size={20} className="text-zinc-500" />
                                <div>
                                    <div className="text-xl font-bold text-white truncate">{company?.location || 'San Francisco'}</div>
                                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">Headquarters</div>
                                </div>
                            </div>
                            {/* Stat Card 3 */}
                            <div className="bg-[#111113] border border-zinc-800/50 p-5 rounded-xl space-y-3">
                                <Globe size={20} className="text-zinc-500" />
                                <div>
                                    <div className="text-xl font-bold text-white"> 24 Countries</div>
                                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">Presence</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Gallery Section */}

                </div>

                {/* --- RIGHT COLUMN (Side Panel Area) --- */}
                <div className="space-y-6">

                    {/* Active Roles Panel */}
                    <div className="bg-[#111113] border border-zinc-800/50 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-base font-semibold text-white">Active Roles</h3>
                            <span className="bg-zinc-800 text-zinc-300 text-xs px-2 py-0.5 rounded-md font-medium">14</span>
                        </div>

                        <div className="space-y-6">
                            {activeRoles.map((role) => (
                                <div key={role.id} className="group border-b border-zinc-800/50 pb-5 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-sm font-medium text-zinc-200 group-hover:text-blue-400 transition-colors cursor-pointer">{role.title}</h4>
                                        <ExternalLink size={14} className="text-zinc-600 shrink-0 ml-2" />
                                    </div>

                                    <div className="flex gap-2 mb-4">
                                        <span className="bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-[10px] px-2 py-1 rounded-md">{role.loc}</span>
                                        <span className="bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-[10px] px-2 py-1 rounded-md">{role.pay}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        {/* Mock Avatar Stack */}
                                        <div className="flex items-center">
                                            <div className="flex -space-x-2">
                                                <div className="w-6 h-6 rounded-full bg-zinc-700 border-2 border-[#111113]" />
                                                <div className="w-6 h-6 rounded-full bg-zinc-600 border-2 border-[#111113]" />
                                            </div>
                                            <span className="text-[10px] text-zinc-500 ml-2 font-medium">{role.applicants}</span>
                                        </div>
                                        <Button className="bg-white text-black h-7 px-3 rounded text-xs font-semibold hover:bg-zinc-200 transition-colors">
                                            Check
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-6 py-3 border-t border-zinc-800/80 text-xs font-medium text-zinc-400 hover:text-white transition-colors">
                            See all 14 openings
                        </button>
                    </div>



                </div>
            </div>
        </div>
    );
}