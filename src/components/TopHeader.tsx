import React from 'react';
import { Menu, Search, Phone, Mail, Bot, Sparkles, MapPin, ShieldCheck, Lock } from 'lucide-react';
import { CollegeOverview, NavSection } from '../types.ts';

interface TopHeaderProps {
  college: CollegeOverview;
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  onOpenChat: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  college,
  onToggleSidebar,
  onOpenSearch,
  onOpenChat,
  onOpenAdmin,
  isAdminLoggedIn,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
      {/* College Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
          {/* Left: College full name and subtitle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="p-1.5 rounded-lg bg-blue-800/80 hover:bg-blue-700 text-white lg:hidden"
              title="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-800/70 border border-blue-600/40 text-[10px] font-bold text-amber-300">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>Approved by AICTE & Govt. of Maharashtra • NBA Accredited 2025</span>
              </div>
              <h1 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight leading-snug">
                {college.name}
              </h1>
              <div className="text-xs text-blue-200 font-medium flex items-center gap-2">
                <span>{college.subtitle}</span>
                <span className="text-blue-400">•</span>
                <span className="text-amber-300 font-bold">SNJB Department Enquiry Bot</span>
              </div>
            </div>
          </div>

          {/* Right: Quick actions */}
          <div className="flex items-center gap-2.5 self-end md:self-auto text-xs">
            <a
              href={`tel:${college.phone[0]}`}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-xs transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{college.phone[0]}</span>
            </a>

            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask AI Bot</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className={`p-1.5 rounded-lg border text-xs font-semibold ${
                isAdminLoggedIn
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-blue-900/50 text-blue-200 border-blue-700 hover:bg-blue-800'
              }`}
              title="Administrator Management"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Global Search Bar & Quick Navigation Row */}
      <div className="px-4 sm:px-6 py-2.5 bg-slate-50 border-t border-slate-200/60 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-bold text-slate-700 hidden sm:inline whitespace-nowrap">
            Website Search:
          </span>
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 hover:border-blue-500 rounded-xl text-xs text-slate-500 hover:text-slate-800 transition-all shadow-2xs w-64 sm:w-80 text-left"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">Search departments, faculty, labs, syllabus...</span>
            <kbd className="hidden sm:inline-block ml-auto text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
              /
            </kbd>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="hidden md:inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Online & Grounded</span>
          </span>
          <span className="text-[11px] font-medium text-slate-600 hidden sm:inline">
            Hours: 9:20 AM – 4:40 PM
          </span>
        </div>
      </div>
    </header>
  );
};
