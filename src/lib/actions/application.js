'use server'

import { serverFetch, serverMutation } from "../core/server"

export const submitApplication = async (applicationData) => {
    return serverMutation('/api/applications', applicationData);
}

export const getApplicationsById = async (applicantId) => {
    return serverFetch(`/api/applications?applicantId=${applicantId}`);
}