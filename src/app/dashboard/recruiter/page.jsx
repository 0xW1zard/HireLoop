import StatCard from '@/components/dashboard/StatCard';
import React from 'react';
import {
    HiOutlineDocumentText,
    HiOutlineUsers,
    HiOutlineBolt,
    HiOutlineCheckCircle
} from "react-icons/hi2";

const page = () => {
    const statsData = [
        {
            title: "Total Job Posts",
            value: "48",
            icon: <HiOutlineDocumentText className="w-5 h-5" />
        },
        {
            title: "Total Applicants",
            value: "1,284",
            icon: <HiOutlineUsers className="w-5 h-5" />
        },
        {
            title: "Active Jobs",
            value: "18",
            icon: <HiOutlineBolt className="w-5 h-5" />
        },
        {
            title: "Jobs Closed",
            value: "32",
            icon: <HiOutlineCheckCircle className="w-5 h-5" />
        }
    ];
    return (
        <section>
            <div className="mb-8">
                <h1 className="text-white text-2xl md:text-3xl font-medium tracking-tight">
                    Welcome back, Himel
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                    <StatCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                    />
                ))}
            </div>
        </section>
    );
};

export default page;