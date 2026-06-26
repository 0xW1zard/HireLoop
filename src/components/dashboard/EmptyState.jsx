import { Button } from "@heroui/react";
import { Store, Plus } from "lucide-react";

export default function EmptyState({ startRegistration }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-200 w-full text-white p-8 font-sans">
      
      <div className="relative mb-10 flex items-center justify-center">
        <div className="absolute inset-0 bg-white/5 blur-[50px] rounded-full -z-10 scale-[2] pointer-events-none" />

        <div className="relative w-48 h-48 bg-[#18181b] rounded-3xl border border-[#27272a] shadow-2xl flex flex-col items-center p-6 transform -rotate-3">
          <div className="w-10 h-10 bg-[#27272a] rounded-lg self-start mb-5" />
          <div className="w-full h-2.5 bg-[#27272a] rounded-full mb-3" />
          <div className="w-3/4 h-2.5 bg-[#27272a] rounded-full self-start mb-6" />
          <div className="w-full h-2.5 bg-[#27272a] rounded-full mb-3" />
          <div className="w-5/6 h-2.5 bg-[#27272a] rounded-full self-start" />
        </div>

        <div className="absolute -top-2 -right-4 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
          <div className="relative text-black flex items-center justify-center hover:scale-110 hover:-rotate-6 transition-transform">
            <Store size={22} strokeWidth={2.5} />
            <div className="absolute -bottom-1 -right-2 bg-white rounded-full">
              <Plus size={14} strokeWidth={4} />
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-[22px] font-semibold text-zinc-100 tracking-tight">
        Company not registered yet
      </h2>
      <p className="text-zinc-400 max-w-105 text-center mt-3 text-sm leading-relaxed">
        Set up your business profile to start posting high-performance job listings and manage your talent loop.
      </p>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-8">
        <Button 
          className="bg-white text-black font-medium hover:bg-zinc-200 px-6 h-11 rounded-lg transition-colors"
          onPress={startRegistration}
        >
          Register your company
        </Button>
        
        <Button 
          variant="bordered"
          className="border border-zinc-800 text-zinc-300 hover:bg-zinc-900 bg-transparent px-6 h-11 rounded-lg font-medium transition-colors"
        >
          View FAQ
        </Button>
      </div>

      {/* Footer Text */}
      <p className="text-zinc-600 text-xs mt-16 font-medium">
        Need specialized assistance? Contact our enterprise support team.
      </p>
      
    </div>
  );
}