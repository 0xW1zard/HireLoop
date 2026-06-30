import { getAllCompanies } from '@/lib/api/companies';
import React from 'react';

const page = async () => {
    const companyData = await getAllCompanies();
    const companies = companyData || [];
    console.log(companies);
    
    return (
        <div>
            this is the company page
        </div>
    );
};

export default page;