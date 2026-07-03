'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Renamed for clarity, since it can now get ALL jobs or specific company jobs
export const getJobs = async (companyId = null, status = 'active') => {
    const url = new URL(`${baseUrl}/api/jobs`);
    
    if (companyId) {
        url.searchParams.append('companyId', companyId);
    }
    
    if (status) {
        url.searchParams.append('status', status);
    }

    const res = await fetch(url.toString());
    
    if (!res.ok) {
        throw new Error(`Failed to fetch jobs: ${res.statusText}`);
    }
    
    return res.json();
}

export const getJobById = async (jobId) => {
    const res = await fetch(`${baseUrl}/api/jobs/${jobId}`);
    
    if (!res.ok) {
        throw new Error(`Failed to fetch job by ID: ${res.statusText}`);
    }
    
    return res.json();
}

export const getCompanyJobs = async (companyId) => {
    return getJobs(companyId);
}