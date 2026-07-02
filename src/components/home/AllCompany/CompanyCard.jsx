import { ArrowRight, CheckCircle2, Cloud, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const CompanyCard = ({ company , index}) => {
    return (
        <div
            key={index}
            className="bg-[#1c1c1c] border border-gray-800 hover:border-gray-700 rounded-2xl p-6 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
        >

            {/* Card Header: Logo & Badge */}
            <div className="flex justify-between items-start mb-5">
                <div className="w-14 h-14 bg-[#262626] rounded-md flex items-center justify-center p-1.5 border border-gray-700">
                    <Image src={company.logo} alt={`${company.name} logo`} width={100} height={100} className="object-contain rounded" />
                </div>
                <div className="flex items-center gap-1.5 bg-green-950/40 border border-green-900/50 text-green-500 px-2.5 py-1 rounded-full text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>VERIFIED</span>
                </div>
            </div>

            {/* Card Body: Info */}
            <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{company.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {company.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <div className="flex items-center gap-1.5 border border-gray-700 bg-[#222222] text-gray-300 px-3 py-1.5 rounded-full text-xs font-medium">
                        <Cloud className="w-3.5 h-3.5 text-gray-400" />
                        {company.industry}
                    </div>
                    <div className="flex items-center gap-1.5 border border-gray-700 bg-[#222222] text-gray-300 px-3 py-1.5 rounded-full text-xs font-medium">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {company.location}
                    </div>
                </div>
            </div>

            {/* Card Footer */}
            <div className="pt-5 border-t border-gray-800 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                    <span>{company.activeJobs} Active Jobs</span>
                </div>
                <a href="#" className="flex items-center gap-1 text-sm text-white font-medium hover:text-gray-300 transition-colors group">
                    View Openings
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>

        </div>
    );
};

export default CompanyCard;