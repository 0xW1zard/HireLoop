import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import TopBar from "@/components/dashboard/TopBar";
import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#09090B] overflow-hidden font-sans text-white">
      
      {/* 1. Sidebar on the left */}
      <DashboardSidebar />

      {/* 2. Main content area on the right */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Bar fixed to the top of this column */}
        <TopBar />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
        
      </div>
    </div>
  );
}