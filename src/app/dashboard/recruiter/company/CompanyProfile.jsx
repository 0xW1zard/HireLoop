'use client';

import React, { useState } from 'react';
import { Form, Fieldset, TextField, TextArea, Label, Input, FieldError, Select, ListBox, Button, toast } from '@heroui/react';
import { ArrowUpToLine, Globe, Factory, Pencil, ChevronDown } from 'lucide-react'; // Switched to lucide-react to match your EmptyState, change back to gravity-ui if preferred
import { createCompany, updateCompany } from '@/lib/actions/companies';
import EmptyState from '@/components/dashboard/EmptyState';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import CompanyProfileView from '@/components/dashboard/CompanyProfileView';

// Layout Shared Style Constants matching your design image
const textInputClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";
const selectBoxClass = "w-full flex flex-col gap-1";
const triggerClasses = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-zinc-700";
const popoverClasses = "bg-zinc-950 border border-zinc-800 rounded-lg p-1 shadow-xl min-w-[200px]";
const listItemClasses = "text-zinc-300 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-900 hover:text-white outline-none data-[focused=true]:bg-zinc-900";
const textAreaClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
    // 1. Core State
    const [company, setCompany] = useState(recruiterCompany);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    // Auxiliary Upload States
    const [logoUrl, setLogoUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // 2. Client side Imgbb Upload Handler
    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Simple Validation
        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, logo: "File size exceeds 5MB limit" }));
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                setLogoUrl(data.data.url);
                setErrors(prev => ({ ...prev, logo: null }));
            } else {
                setErrors(prev => ({ ...prev, logo: "Upload failed. Try again." }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, logo: "Network error during logo upload" }));
        } finally {
            setIsUploading(false);
        }
    };

    // 3. Submit Profile Form Data
    // 3. Submit Profile Form Data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const companyName = formData.get('companyName');
        const websiteUrl = formData.get('websiteUrl');
        const industry = formData.get('industry');
        const location = formData.get('location');
        const employeeCount = formData.get('employeeCount');
        const description = formData.get('description');

        // Simple validation checks
        const newErrors = {};
        if (!companyName) newErrors.companyName = "Company name is required";
        if (!websiteUrl) newErrors.websiteUrl = "Website link is required";
        if (!location) newErrors.location = "Location coordinates required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Commit state updates
        const newCompanyData = {
            name: companyName,
            websiteUrl,
            industry: industry || 'Technology',
            location,
            employeeCount: employeeCount || '1-10 employees',
            description,
            logo: logoUrl || (company ? company.logo : ''),
            status: company ? company.status : 'Pending',
            recruiterId: recruiter.id
        };

        try {
            // CHECK: Are we updating an existing company or creating a new one?
            if (company?._id) {
                // Keep the existing ID in our local state object
                newCompanyData._id = company._id;

                // Call your update server action here 
                // You will need to import 'updateCompany' at the top of your file
                await updateCompany(company._id, newCompanyData);
                toast.success("Company profile updated successfully!");

            } else {
                // Call your create server action
                const payload = await createCompany(newCompanyData);

                if (payload.insertedId) {
                    // Attach the newly generated MongoDB ID to our local state
                    // so subsequent edits in the same session don't create duplicates!
                    newCompanyData._id = payload.insertedId;
                    toast.success("Company profile created successfully!");

                }
            }

            // Update the UI with the latest data
            setCompany(newCompanyData);
            setErrors({});
            setIsEditing(false);
            router.refresh();

        } catch (error) {
            console.error("Error saving company:", error);
            // toast.error("Failed to save company profile.");
            alert("Failed to save company profile. Please try again later.");
        }
    };

    // 4. State Toggle helper triggers
    const startRegistration = () => {
        setLogoUrl('');
        setIsEditing(true);
    };

    const startEditing = () => {
        setLogoUrl(company.logo);
        setIsEditing(true);
    };

    // --- SUB-VIEW 1: Empty Profile view state ---
    if (!company?._id && !isEditing) {
        return (
            <EmptyState startRegistration={startRegistration} />
        );
    }

    // --- SUB-VIEW 2: Render Presentation Dashboard view mode ---
    if (company && !isEditing) {
        const getStatusStyles = (status) => {
            switch (status) {
                case 'Approved': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                case 'Rejected': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
                default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            }
        };

        return (
            <CompanyProfileView company={company} getStatusStyles={getStatusStyles} startEditing={setIsEditing} />
        );
    }

    // --- SUB-VIEW 3: Form Editing & Registration View Structure ---
    return (
        <div className="max-w-3xl mx-auto my-8 bg-zinc-950 p-8 border border-zinc-900 rounded-xl">
            <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior="aria">
                <Fieldset className="space-y-6 w-full">
                    <legend className="text-xl font-semibold text-zinc-200 border-b border-zinc-900 w-full pb-3 mb-2">
                        {company ? 'Update Company Profile' : 'Configure Workspace Platform'}
                    </legend>

                    {/* ROW 1: Company Name + Industry */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="companyName" defaultValue={company?.name || ''} isInvalid={!!errors.companyName} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Company Name</Label>
                            <Input placeholder="e.g. Acme Corp" className={textInputClass} />
                            {errors.companyName && <FieldError className="text-xs text-danger mt-1">{errors.companyName}</FieldError>}
                        </TextField>

                        <Select className={selectBoxClass} name="industry" defaultSelectedKeys={[company?.industry || 'technology']}>
                            <Label className="text-zinc-400 font-medium text-sm mb-1 block">Industry / Category</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value className="text-white placeholder:text-zinc-600" />
                                <Select.Indicator><ChevronDown size={16} className="text-zinc-500" /></Select.Indicator>
                            </Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox className="outline-none">
                                    <ListBox.Item id="technology" className={listItemClasses} textValue="Technology">Technology</ListBox.Item>
                                    <ListBox.Item id="design" className={listItemClasses} textValue="Design">Design</ListBox.Item>
                                    <ListBox.Item id="marketing" className={listItemClasses} textValue="Marketing">Marketing</ListBox.Item>
                                    <ListBox.Item id="finance" className={listItemClasses} textValue="Finance">Finance</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* ROW 2: Website URL + Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* FIX APPLIED HERE: Removed stray 'Linda' text from props */}
                        <TextField name="websiteUrl" defaultValue={company?.websiteUrl || ''} isInvalid={!!errors.websiteUrl} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Website URL</Label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 text-zinc-600 text-sm font-medium select-none pointer-events-none border-r border-zinc-800 pr-2">
                                    https://
                                </span>
                                <Input placeholder="www.company.com" className={`${textInputClass} pl-20`} />
                            </div>
                            {errors.websiteUrl && <FieldError className="text-xs text-danger mt-1">{errors.websiteUrl}</FieldError>}
                        </TextField>

                        <TextField name="location" defaultValue={company?.location || ''} isInvalid={!!errors.location} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Location</Label>
                            <div className="relative flex items-center">
                                <Globe size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                <Input placeholder="City, Country" className={`${textInputClass} pl-10`} />
                            </div>
                            {errors.location && <FieldError className="text-xs text-danger mt-1">{errors.location}</FieldError>}
                        </TextField>
                    </div>

                    {/* ROW 3: Employee Count + Custom File Logo Upload Block */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <Select className={selectBoxClass} name="employeeCount" defaultSelectedKeys={[company?.employeeCount || '1-10']}>
                            <Label className="text-zinc-400 font-medium text-sm mb-1 block">Employee Count Range</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value className="text-white" />
                                <Select.Indicator><ChevronDown size={16} className="text-zinc-500" /></Select.Indicator>
                            </Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox className="outline-none">
                                    <ListBox.Item id="1-10" className={listItemClasses} textValue="1-10 employees">1-10 employees</ListBox.Item>
                                    <ListBox.Item id="11-50" className={listItemClasses} textValue="11-50 employees">11-50 employees</ListBox.Item>
                                    <ListBox.Item id="51-200" className={listItemClasses} textValue="51-200 employees">51-200 employees</ListBox.Item>
                                    <ListBox.Item id="201+" className={listItemClasses} textValue="201+ employees">201+ employees</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        {/* Custom Styled Upload Block matching attachment blueprint exactly */}
                        <div className="flex flex-col gap-1 w-full">
                            <span className="text-zinc-400 font-medium text-sm">Company Logo</span>
                            <div className="flex items-center gap-4 mt-1">
                                <label className="w-14 h-14 border border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={handleLogoUpload}
                                        className="hidden"
                                    />
                                    {logoUrl ? (
                                        <Image src={logoUrl} alt="Logo Preview" width={56} height={56} className="w-full h-full object-cover" />
                                    ) : (
                                        <ArrowUpToLine size={18} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                                    )}
                                </label>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-zinc-300">
                                        {isUploading ? 'Uploading file...' : 'Upload image'}
                                    </span>
                                    <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                                    {errors.logo && <span className="text-xs text-danger mt-1">{errors.logo}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ROW 4: Full-Width TextArea Brief Description */}
                    <TextField name="description" defaultValue={company?.description || ''} className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-400 font-medium text-sm">Brief Description</Label>
                        <TextArea
                            placeholder="Tell us about your company's mission and culture..."
                            rows={4}
                            className={textAreaClass}
                        />
                    </TextField>
                </Fieldset>

                {/* Form Navigation Action Area controls */}
                <div className="flex justify-end gap-3 pt-5 border-t border-zinc-900 w-full">
                    {company && (
                        <Button
                            type="button"
                            variant="bordered"
                            onPress={() => setIsEditing(false)}
                            className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 rounded-lg px-5 font-medium h-11"
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11"
                    >
                        {company ? 'Save Updates' : 'Complete Setup'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}