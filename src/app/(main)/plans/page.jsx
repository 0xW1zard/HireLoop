"use client";

import React, { useState } from 'react';

const pricingData = {
    seekers: [
        {
            name: 'Free',
            price: '$0',
            period: '/forever',
            features: [
                'Browse & save up to 10 jobs',
                'Apply to up to 3 jobs per month',
                'Basic profile',
                'Email alerts'
            ],
            buttonText: 'Get Started',
            highlighted: false
        },
        {
            name: 'Pro',
            price: '$19',
            period: '/month',
            features: [
                'Apply to up to 30 jobs per month',
                'Unlimited saved jobs',
                'Application tracking',
                'Salary insights'
            ],
            buttonText: 'Upgrade to Pro',
            highlighted: true
        },
        {
            name: 'Premium',
            price: '$39',
            period: '/month',
            features: [
                'Everything in Pro + unlimited applications',
                'Profile boost to recruiters',
                'Early access to new jobs',
                'Priority support'
            ],
            buttonText: 'Upgrade to Premium',
            highlighted: false
        }
    ],
    recruiters: [
        {
            name: 'Free',
            price: '$0',
            period: '/forever',
            features: [
                'Up to 3 active job posts',
                'Basic applicant management',
                "Standard listing visibility (great for a company's first year of hiring)"
            ],
            buttonText: 'Start Hiring',
            highlighted: false
        },
        {
            name: 'Growth',
            price: '$49',
            period: '/month',
            features: [
                'Up to 10 active job posts',
                'Applicant tracking',
                'Basic analytics',
                'Email support'
            ],
            buttonText: 'Upgrade to Growth',
            highlighted: true
        },
        {
            name: 'Enterprise',
            price: '$149',
            period: '/month',
            features: [
                'Up to 50 active job posts',
                'Advanced analytics dashboard',
                'Featured job listings',
                'Team collaboration',
                'Custom branding',
                'Priority support'
            ],
            buttonText: 'Contact Sales',
            highlighted: false
        }
    ]
};

const faqs = [
    {
        question: "How do cancellations work?",
        answer: "You can cancel your subscription at any time from your account settings. Once canceled, you will retain access to your premium features until the end of your current billing cycle."
    },
    {
        question: "What is your refund policy?",
        answer: "We offer a 14-day money-back guarantee for all new subscriptions. If you are not satisfied within the first two weeks, contact support for a full refund."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express) as well as PayPal and Apple Pay."
    },
    {
        question: "Can I switch plans later?",
        answer: "Yes, you can upgrade or downgrade your plan at any time. Prorated charges or credits will be applied automatically to your account."
    }
];

export default function PricingPage() {
    const [activeTab, setActiveTab] = useState('seekers');

    return (
        // Added a subtle dark gradient background
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-[#0a0a0a] py-24 sm:py-32 selection:bg-blue-500/30">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="mx-auto max-w-4xl text-center">
                    <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Pricing plans for everyone
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-400">
                    Choose an affordable plan that's packed with the best features for engaging your audience, creating customer loyalty, and driving sales.
                </p>

                {/* Toggle / Tabs */}
                <div className="mt-16 flex justify-center">
                    <div className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-sm font-semibold leading-5 ring-1 ring-inset ring-gray-700 bg-gray-900/50 backdrop-blur-sm">
                        <button
                            onClick={() => setActiveTab('seekers')}
                            className={`cursor-pointer rounded-full px-8 py-2.5 transition-all duration-300 ${
                                activeTab === 'seekers' 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                        >
                            For Job Seekers
                        </button>
                        <button
                            onClick={() => setActiveTab('recruiters')}
                            className={`cursor-pointer rounded-full px-8 py-2.5 transition-all duration-300 ${
                                activeTab === 'recruiters' 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                        >
                            For Recruiters
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="isolate mx-auto mt-12 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {pricingData[activeTab].map((tier) => (
                        <div
                            key={tier.name}
                            // Added smooth transform and shadow on hover
                            className={`rounded-3xl p-8 xl:p-10 transition-all duration-300 hover:-translate-y-2 ring-1 ${
                                tier.highlighted 
                                ? 'bg-gray-800/80 ring-blue-500 shadow-2xl shadow-blue-900/20 hover:shadow-blue-500/30' 
                                : 'bg-gray-800/30 ring-white/10 hover:bg-gray-800/50 hover:ring-white/20 hover:shadow-xl'
                            }`}
                        >
                            <div className="flex items-center justify-between gap-x-4">
                                <h3 className={`text-lg font-semibold leading-8 ${tier.highlighted ? 'text-blue-400' : 'text-white'}`}>
                                    {tier.name}
                                </h3>
                                {tier.highlighted && (
                                    <p className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-400 ring-1 ring-inset ring-blue-500/20">
                                        Most popular
                                    </p>
                                )}
                            </div>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight text-white">{tier.price}</span>
                                <span className="text-sm font-semibold leading-6 text-gray-400">{tier.period}</span>
                            </p>
                            <button
                                aria-describedby={`tier-${tier.name}`}
                                // Added active scaling and glowing shadows for buttons
                                className={`mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 shadow-sm transition-all duration-300 active:scale-95 ${
                                    tier.highlighted 
                                        ? 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40' 
                                        : 'bg-white/5 text-white hover:bg-white/15 hover:ring-1 hover:ring-white/20'
                                }`}
                            >
                                {tier.buttonText}
                            </button>
                            <ul role="list" className="mt-8 space-y-4 text-sm leading-6 text-gray-300">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3 items-start">
                                        <svg className="h-6 w-5 flex-none text-blue-400 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mx-auto mt-32 max-w-3xl">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-white mb-8 text-center">Frequently asked questions</h2>
                    <dl className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                // Added a hover highlight box around each FAQ
                                className="group rounded-2xl p-6 transition-all duration-300 hover:bg-gray-800/40 border border-transparent hover:border-white/5"
                            >
                                <details className="group/details">
                                    <summary className="flex cursor-pointer items-start justify-between w-full text-left text-white marker:content-none select-none">
                                        <span className="text-base font-semibold leading-7 group-hover:text-blue-200 transition-colors">{faq.question}</span>
                                        <span className="ml-6 flex h-7 items-center">
                                            {/* Plus icon */}
                                            <svg className="h-6 w-6 group-open/details:hidden text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                            </svg>
                                            {/* Minus icon */}
                                            <svg className="h-6 w-6 hidden group-open/details:block text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <p className="mt-4 pr-12 text-base leading-7 text-gray-400 animate-in fade-in slide-in-from-top-2 duration-300">
                                        {faq.answer}
                                    </p>
                                </details>
                            </div>
                        ))}
                    </dl>
                </div>

            </div>
        </div>
    );
}