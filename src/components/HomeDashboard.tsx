import React from 'react';
import {
  Building2,
  GraduationCap,
  Calendar,
  Award,
  Briefcase,
  ShieldAlert,
  Search,
  ArrowRight,
  Bot,
  Users,
  BookOpen,
  FlaskConical,
  PhoneCall,
  Clock,
  Sparkles,
} from 'lucide-react';
import { CollegeData, NavSection } from '../types.ts';

interface HomeDashboardProps {
  collegeData: CollegeData;
  onNavigate: (section: NavSection) => void;
  onOpenSearch: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  collegeData,
  onNavigate,
  onOpenSearch,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-blue-800 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 border border-blue-700/60 text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Academic Portal • Bilingual Support (English & मराठी)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Welcome to SNJB Department Enquiry Bot
          </h2>
          <p className="text-sm sm:text-base text-blue-200 leading-relaxed font-medium">
            Your smart assistant for college information, faculty, syllabus, examinations, laboratories, placements, and student support.
          </p>

          {/* Search Bar in Hero */}
          <div className="pt-3">
            <button
              onClick={onOpenSearch}
              className="w-full sm:w-auto min-w-[340px] flex items-center justify-between gap-3 px-4 py-3 bg-white text-slate-700 rounded-2xl shadow-lg hover:shadow-xl hover:ring-2 hover:ring-amber-400 transition-all text-sm font-medium"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-blue-600" />
                <span className="text-slate-500 text-xs sm:text-sm">Search any college record, faculty, syllabus, lab...</span>
              </div>
              <span className="text-[11px] bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded-lg border border-blue-200">
                Search
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Core Information Cards */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-1">
          Key Institutional Overview Cards
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Total Engineering Departments */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">Engineering Divisions</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-blue-950">5 Departments</div>
            <p className="text-xs text-slate-600 mt-1">
              Computer, AI&DS, Civil, E&TC, and Mechanical Engineering (+ MBA & First Year).
            </p>
          </div>

          {/* Card 2: Academic Programs */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">Academic Programs</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">B.Tech, M.Tech, MBA</div>
            <p className="text-xs text-slate-600 mt-1">
              Undergraduate and Postgraduate curricula approved by AICTE & DTE Maharashtra.
            </p>
          </div>

          {/* Card 3: College Established */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">Founding Year</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">Established 2004</div>
            <p className="text-xs text-slate-600 mt-1">
              Over two decades of academic excellence in rural technical education at Chandwad.
            </p>
          </div>

          {/* Card 4: Latest Achievement Provided */}
          <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs hover:shadow-md transition-all bg-gradient-to-br from-amber-50/50 to-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-800">Latest Achievement Provided</span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-lg font-extrabold text-amber-950 leading-snug">
              NBA Accreditation in 2025
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Accreditation reported for Civil Engineering, E&TC, and MBA programs in 2025.
            </p>
          </div>

          {/* Card 5: Placement Cell Contact */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">Placement Cell Contact</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <a
              href={`mailto:${collegeData.placement.inCharge.email}`}
              className="text-base font-bold text-blue-700 hover:text-blue-900 hover:underline block truncate"
            >
              {collegeData.placement.inCharge.email}
            </a>
            <p className="text-xs text-slate-600 mt-1">
              In-Charge: {collegeData.placement.inCharge.name} (Mob: {collegeData.placement.inCharge.mobile})
            </p>
          </div>

          {/* Card 6: Examination Cell Contact */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">Examination Cell Contact</span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <a
              href={`mailto:${collegeData.examinationCell.email}`}
              className="text-base font-bold text-blue-700 hover:text-blue-900 hover:underline block truncate"
            >
              {collegeData.examinationCell.email}
            </a>
            <p className="text-xs text-slate-600 mt-1">
              Controller of Examination: {collegeData.examinationCell.controllerOfExamination}
            </p>
          </div>
        </div>
      </div>

      {/* Quick-Access Buttons (All Required) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Quick-Access Shortcuts</h3>
          <p className="text-xs text-slate-500">
            One-click navigation into any specific college division or enquiry resource.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <button
            onClick={() => onNavigate('departments')}
            className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/70 text-left transition-all group flex flex-col justify-between"
          >
            <Building2 className="w-5 h-5 text-blue-700 mb-2 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-slate-900">Explore Departments</div>
              <div className="text-[10px] text-slate-500">7 Academic Wings</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('faculty')}
            className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/70 text-left transition-all group flex flex-col justify-between"
          >
            <Users className="w-5 h-5 text-indigo-700 mb-2 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-slate-900">View Faculty</div>
              <div className="text-[10px] text-slate-500">Profiles & Research</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('syllabus')}
            className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/70 text-left transition-all group flex flex-col justify-between"
          >
            <BookOpen className="w-5 h-5 text-emerald-700 mb-2 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-slate-900">Explore Syllabus</div>
              <div className="text-[10px] text-slate-500">AY 2024–28 B.Tech</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('exam_cell')}
            className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/70 text-left transition-all group flex flex-col justify-between"
          >
            <ShieldAlert className="w-5 h-5 text-rose-700 mb-2 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-slate-900">Examination Info</div>
              <div className="text-[10px] text-slate-500">Policies & Notices</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('placement_stats')}
            className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/70 text-left transition-all group flex flex-col justify-between"
          >
            <Briefcase className="w-5 h-5 text-amber-700 mb-2 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-slate-900">Placement Statistics</div>
              <div className="text-[10px] text-slate-500">Packages & Trends</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('laboratories')}
            className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/70 text-left transition-all group flex flex-col justify-between"
          >
            <FlaskConical className="w-5 h-5 text-purple-700 mb-2 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-slate-900">Laboratory Info</div>
              <div className="text-[10px] text-slate-500">12 Campus Labs</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('chatbot')}
            className="p-3.5 rounded-2xl border border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100 text-left transition-all group flex flex-col justify-between"
          >
            <Bot className="w-5 h-5 text-emerald-700 mb-2 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-emerald-950">Ask AI Assistant</div>
              <div className="text-[10px] text-emerald-700">English + मराठी</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/70 text-left transition-all group flex flex-col justify-between"
          >
            <PhoneCall className="w-5 h-5 text-blue-700 mb-2 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-slate-900">Contact College</div>
              <div className="text-[10px] text-slate-500">Offices & Timings</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
