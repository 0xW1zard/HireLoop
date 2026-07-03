import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/companies';
import { getJobs } from '@/lib/api/jobs';

const CompanyPage = async () => {

    const user = await getUserSession();
    const company = await getRecruiterCompany(user?.id);
    const jobs = await getJobs(company?._id, 'active');

    return (
        <div>
            <CompanyProfile recruiter={user} recruiterCompany={company} jobs={jobs}></CompanyProfile>
        </div>
    );
};

export default CompanyPage;