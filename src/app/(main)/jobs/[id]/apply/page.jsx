import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import { getApplicationsById } from '@/lib/actions/application';
import Link from 'next/link';

const page = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();
    console.log(user);

    if (!user) {
        redirect(`/login?redirect=/jobs/${id}/apply`);
    }

    // State 1: Wrong Role
    if (user && user.role !== 'seeker') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
                <div className="bg-gray-800 p-8 rounded-xl shadow-xl ring-1 ring-white/10 max-w-md w-full">
                    <h1 className="text-2xl font-bold text-white mb-4">You are not a job seeker</h1>
                    <p className="text-gray-400 mb-6">
                        You do not have permission to access this page. Please sign in with a job seeker account.
                    </p>
                </div>
            </div>
        );
    }

    const applications = await getApplicationsById(user.id);
    const hasApplied = applications.some(app => app.jobId === id);

    // State 2: Already Applied
    if (hasApplied) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
                <div className="bg-gray-800 p-8 rounded-xl shadow-xl ring-1 ring-white/10 max-w-md w-full">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-4">Already Applied</h1>
                    <p className="text-gray-400 mb-8">
                        You have already submitted an application for this position. You cannot apply for the same job more than once.
                    </p>
                    <Link 
                        href={`/jobs/${id}`} 
                        className="inline-block w-full rounded-md bg-gray-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 transition-colors"
                    >
                        Go back to job details
                    </Link>
                </div>
            </div>
        );
    }

    const plan = {
        name: 'Free',
        maxApplications: 3,
    };
    
    const job = await getJobById(id);

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Application Counter Banner */}
                <div className="mb-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30">
                            {plan.name} Plan
                        </span>
                        <span className="text-sm text-gray-300">Monthly Usage</span>
                    </div>
                    <div className="text-sm text-gray-300">
                        Applications used: <span className="text-white font-bold ml-1">{applications.length}</span> 
                        <span className="text-gray-500 mx-1">/</span> 
                        {plan.maxApplications}
                    </div>
                </div>

                {/* State 3: Limit Reached vs. Show Form */}
                {applications.length >= plan.maxApplications ? (
                    <div className="bg-gray-800 p-8 rounded-xl shadow-xl ring-1 ring-white/10 text-center mt-12">
                        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-4">Application Limit Reached</h1>
                        <p className="text-gray-400 mb-8">
                            You have reached your limit of {plan.maxApplications} applications for this month on the {plan.name} plan.
                        </p>
                        <Link 
                            href={`/plans`} 
                            className="inline-block rounded-md bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
                        >
                            Upgrade Plan to Apply
                        </Link>
                    </div>
                ) : (
                    // We remove the layout padding from JobApply since this page handles it now
                    <div className="-mx-4 sm:mx-0">
                        <JobApply job={job} applicant={user} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;