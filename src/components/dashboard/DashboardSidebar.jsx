"use client";
import React from "react";
import Link from "next/link";
import { LayoutSideContentLeft, Briefcase, Envelope, Gear, House, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Image from "next/image";

export function DashboardSidebar() {
    // Note: I added an 'isActive' flag to demonstrate the styling of the active route
    const navItems = [
        { icon: House, href: "/dashboard", label: "Dashboard", isActive: true },
        { icon: Briefcase, href: "/dashboard/company", label: "My Company", isActive: false },
        { icon: Briefcase, href: "/dashboard/jobs", label: "Manage Jobs", isActive: false },
        { icon: Envelope, href: "/dashboard/applications", label: "Applications", isActive: false },
        { icon: Gear, href: "/dashboard/settings", label: "Settings", isActive: false },
    ];

    const navContent = (
        <div className="flex flex-col h-full bg-[#09090B]">
            {/* Logo */}
            <div className="px-6 pt-8 pb-10">
                <h1 className="text-2xl font-bold tracking-tight text-white">HireLoop</h1>
            </div>

            {/* User Profile Card */}
            <div className="px-6 mb-8 flex items-start gap-3">
                <Image
                    src="https://i.pravatar.cc/150?u=alex" 
                    alt="Alex Sterling"  width={200} height={200}
                    className="w-10 h-10 rounded-full border border-[#232326] object-cover shrink-0"
                />
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-white leading-tight">Alex Sterling</span>
                    <span className="text-xs text-[#8E8E93] mb-1.5 mt-0.5">Recruiter</span>
                    <span className="text-[9px] font-bold tracking-wider text-[#A1A1AA] bg-[#1D1D20] px-2 py-0.5 rounded-sm w-fit border border-[#2E2E33]">
                        PREMIUM ACCOUNT
                    </span>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1 px-3">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-3 text-[13px] font-medium transition-all group relative
                            ${item.isActive 
                                ? "text-white bg-[#1A1A1D] rounded-lg" 
                                : "text-[#8E8E93] hover:text-white hover:bg-[#141416] rounded-lg"
                            }
                        `}
                    >
                        <item.icon className={`w-5 h-5 ${item.isActive ? "text-white" : "text-[#8E8E93] group-hover:text-white"}`} />
                        {item.label}
                        
                        {/* Active State Right Border Indicator */}
                        {item.isActive && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-l-full"></div>
                        )}
                    </Link>
                ))}
            </nav>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 shrink-0 border-r border-[#232326] bg-[#09090B] h-screen flex-col">
                {navContent}
            </aside>

            {/* Mobile Drawer */}
            <Drawer>
                <Button className="lg:hidden fixed bottom-4 right-4 z-50 bg-white text-black shadow-xl" variant="solid" radius="full" isIconOnly>
                    <LayoutSideContentLeft className="w-5 h-5" />
                </Button>
                <Drawer.Backdrop className="bg-black/60 backdrop-blur-sm">
                    <Drawer.Content placement="left" className="bg-[#09090B] border-r border-[#232326] w-72">
                        <Drawer.Dialog className="h-full">
                            <Drawer.CloseTrigger className="absolute top-4 right-4 text-[#8E8E93] hover:text-white z-50" />
                            <Drawer.Body className="p-0 h-full">
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}