"use client";

import { submitApplication } from '@/lib/actions/application';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const JobApply = ({ job, applicant }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        message: '',
        portfolioLink: '',
        resumeLink: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {

            const SubmissonData = {
                jobId: job?._id,
                jobTitle: job?.jobTitle,
                applicantId: applicant?.id,
                applicantName: applicant?.name,
                applicantEmail: applicant?.email,
                ...formData
            };
            console.log("Submitting application:", SubmissonData);

            // Simulate an API call
            const res = await submitApplication(SubmissonData)

            if (res.insertedId) {
                alert('Application submitted successfully!');
                setFormData({
                    message: '',
                    portfolioLink: '',
                    resumeLink: ''
                });
                router.push(`/jobs/${job?._id}`);
            }
        } catch (error) {
            console.error("Failed to submit application:", error);
            alert('Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className=" flex justify-center items-center max-w-3xl mx-auto pb-24 px-4 sm:px-6 lg:px-8">
            {/* Dark mode card container */}
            <div className="bg-[#14181a] shadow-xl ring-1 ring-white/10 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                    <div className="mb-8">
                        {/* Title & Subtitle text adjusted for dark mode */}
                        <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                            Apply for {job?.jobTitle || 'this position'}
                        </h2>
                        {applicant && (
                            <p className="mt-2 text-sm text-gray-400">
                                Applying as: <span className="font-semibold text-gray-100">{applicant.name}</span> ({applicant.email})
                            </p>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Motivation Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-200">
                                Why do you want to join this job? <span className="text-red-400">*</span>
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 bg-[#14181a] text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 px-3 transition-colors"
                                    placeholder="Tell us about your background and why you're a great fit..."
                                />
                            </div>
                        </div>

                        {/* Portfolio Link */}
                        <div>
                            <label htmlFor="portfolioLink" className="block text-sm font-medium leading-6 text-gray-200">
                                Portfolio Link
                            </label>
                            <div className="mt-2">
                                <input
                                    type="url"
                                    name="portfolioLink"
                                    id="portfolioLink"
                                    value={formData.portfolioLink}
                                    onChange={handleChange}
                                    placeholder="https://yourportfolio.com"
                                    className="block w-full rounded-md border-0 py-1.5 bg-[#14181a] text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 px-3 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Resume Link */}
                        <div>
                            <label htmlFor="resumeLink" className="block text-sm font-medium leading-6 text-gray-200">
                                Resume Link (Google Drive, Dropbox, etc.) <span className="text-red-400">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    type="url"
                                    name="resumeLink"
                                    id="resumeLink"
                                    required
                                    value={formData.resumeLink}
                                    onChange={handleChange}
                                    placeholder="https://link-to-your-resume.pdf"
                                    className="block w-full rounded-md border-0 py-1.5 bg-[#14181a] text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 px-3 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Submit Button Area */}
                        <div className="pt-4 flex items-center justify-end gap-x-6">
                            <button
                                type="button"
                                className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="rounded-md bg-blue-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobApply;