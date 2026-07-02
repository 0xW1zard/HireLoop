'use client';
import React, { useState } from 'react';
import { Search, CheckCircle2, Cloud, MapPin, ArrowRight, Building2, Briefcase } from 'lucide-react';
import { getAllCompanies } from '@/lib/api/companies';
import CompanyCard from '@/components/home/AllCompany/CompanyCard';

// Sample data utilizing the company structures discussed
const company = await getAllCompanies();
console.log('from getAllCompanies: ', company);


export default function BrowseCompanies() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen text-white p-6 md:p-12 font-sans selection:bg-gray-700 mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Browse Companies</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Discover the world's leading technology and creative organizations. Filter by industry, size, and values to find your next professional home.
          </p>
        </div>

        {/* Search Bar Section */}
        <div className="flex items-center bg-[#1a1a1a] border border-gray-800 rounded-xl p-2 mb-12 shadow-sm focus-within:border-gray-600 transition-colors">
          <div className="flex-1 flex items-center px-4">
            <Search className="text-gray-500 w-5 h-5 mr-3" />
            <input 
              type="text" 
              placeholder="Search by name, industry, or location..."
              className="w-full bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none py-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-white hover:bg-gray-100 text-black font-medium py-3 px-6 rounded-lg transition-colors whitespace-nowrap">
            Find Companies
          </button>
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {company.map((company, index) => (
            <CompanyCard key={index} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
}