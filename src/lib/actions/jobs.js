'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createJob = async (newJobData) =>{
    const res = await fetch(`${baseUrl}/api/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJobData),
    });

    if (!res.ok) {
        throw new Error('Failed to create job');
    }

    return res.json();
}
    