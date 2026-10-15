import React from 'react';
import {
  Home,
  Info,
  Award,
  Building2,
  Users,
  BookOpen,
  CalendarDays,
  ShieldAlert,
  Briefcase,
  BarChart3,
  FileSpreadsheet,
  FlaskConical,
  Building,
  PhoneCall,
  Bot,
  Lock,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { NavSection } from '../types.ts';

interface SidebarProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  isOpen,
  onCloseMobile,
  onOpenAdmin,
  isAdminLoggedIn,
}) => {
  const menuItems: {
    id: NavSection;
    label: string;
    sectionNumber: number;
    icon: React.ReactNode;
    badge?: string;
    badgeColor?: string;
  }[] = [
    {
      id: 'home',
      label: 'Home Dashboard',
      sectionNumber: 1,
      icon: <Home className="w-4 h-4" />,
    },
    {
      id: 'about',
      label: 'About College',
      sectionNumber: 2,
      icon: <Info className="w-4 h-4" />,
    },
    {
      id: 'achievements',
      label: 'Our Achievements',
      sectionNumber: 3,
      icon: <Award className="w-4 h-4" />,
      badge: 'NBA 2025',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: 'departments',
      label: 'Departments',
      sectionNumber: 4,
      icon: <Building2 className="w-4 h-4" />,
      badge: '7 Depts',
      badgeColor: 'bg-blue-100 text-blue-900',
    },
    {
      id: 'faculty',
      label: 'HOD & Faculty',
      sectionNumber: 5,
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 'syllabus',
      label: 'Syllabus',
      sectionNumber: 6,
      icon: <BookOpen className="w-4 h-4" />,
      badge: '2024–28',
      badgeColor: 'bg-indigo-100 text-indigo-900',
    },
    {
      id: 'timetable',
      label: 'Timetable',
      sectionNumber: 7,
      icon: <CalendarDays className="w-4 h-4" />,
    },
    {
      id: 'exam_cell',
      label: 'Examination Cell',
      sectionNumber: 8,
      icon: <ShieldAlert className="w-4 h-4" />,
    },
    {
      id: 'placement',
      label: 'Training & Placement',
      sectionNumber: 9,
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: 'placement_stats',
      label: 'Placement Statistics',
      sectionNumber: 10,
      icon: <BarChart3 className="w-4 h-4" />,
      badge: 'Charts',
      badgeColor: 'bg-emerald-100 text-emerald-900',
    },
    {
      id: 'placement_records',
      label: 'Placement Records',
      sectionNumber: 11,
      icon: <FileSpreadsheet className="w-4 h-4" />,
    },
    {
      id: 'laboratories',
      label: 'Laboratories',
      sectionNumber: 12,
      icon: <FlaskConical className="w-4 h-4" />,
      badge: '12 Labs',
      badgeColor: 'bg-purple-100 text-purple-900',
    },
    {
      id: 'college_info',
      label: 'College Information',
      sectionNumber: 13,
      icon: <Building className="w-4 h-4" />,
    },
    {
      id: 'contact',
      label: 'Contact Us',
      sectionNumber: 14,
      icon: <PhoneCall className="w-4 h-4" />,
    },
    {
      id: 'chatbot',
      label: 'AI Department Enquiry Bot',
      sectionNumber: 15,
      icon: <Bot className="w-4 h-4" />,
      badge: 'Bilingual',
      badgeColor: 'bg-emerald-500 text-white font-bold',
    },
  ];

  const handleItemClick = (id: NavSection) => {
    onSelectSection(id);
    onCloseMobile();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 text-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-blue-900/60 bg-blue-950/80">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 flex-shrink-0 shadow-md">
              <div className="w-full h-full bg-blue-950 rounded-[14px] flex flex-col items-center justify-center text-white">
                <span className="text-[9px] font-extrabold text-amber-300 leading-none">SNJB</span>
                <span className="text-[7px] font-bold text-blue-200">COE</span>
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider truncate">
                Jain Gurukul Campus
              </div>
              <h2 className="text-xs font-bold text-white truncate leading-tight">
                SNJB Department Enquiry
              </h2>
              <div className="text-[10px] text-blue-300 truncate">
                Chandwad, Dist. Nashik
              </div>
            </div>
          </div>
        </div>

        {/* AI Quick Banner in Sidebar */}
        <div className="px-3 pt-3">
          <button
            onClick={() => handleItemClick('chatbot')}
            className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
              activeSection === 'chatbot'
                ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                : 'bg-blue-900/40 hover:bg-blue-800/50 border-blue-700/50 text-blue-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold leading-none flex items-center gap-1.5">
                  <span>AI Enquiry Assistant</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] text-blue-200 mt-0.5">
                  Ask in English or मराठी
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-blue-300" />
          </button>
        </div>

        {/* Navigation Menu List (15 Sections) */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 text-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400/80 px-2.5 py-1">
            Website Sections (1–15)
          </div>

          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                  isActive
                    ? 'bg-blue-700 text-white font-bold shadow-md ring-1 ring-blue-500'
                    : 'text-slate-300 hover:text-white hover:bg-blue-900/40 font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={isActive ? 'text-amber-300' : 'text-blue-400'}>
                    {item.icon}
                  </span>
                  <span className="truncate">
                    <span className="text-[10px] text-blue-300 mr-1 opacity-70 font-mono">
                      {item.sectionNumber}.
                    </span>
                    {item.label}
                  </span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold flex-shrink-0 border ${
                      item.badgeColor || 'bg-blue-800 text-blue-200 border-blue-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer with Admin Portal Access */}
        <div className="p-3 border-t border-blue-900/60 bg-blue-950/90 text-xs space-y-2">
          <button
            onClick={() => {
              onOpenAdmin();
              onCloseMobile();
            }}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
              isAdminLoggedIn
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30'
                : 'bg-blue-900/40 text-blue-200 border-blue-800 hover:bg-blue-800/60'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAdminLoggedIn ? 'Admin Panel (Active)' : 'Admin Login Panel'}</span>
          </button>

          <div className="text-[10px] text-blue-400/80 text-center leading-snug">
            SNJB COE Chandwad • Grounded AI
          </div>
        </div>
      </aside>
    </>
  );
};
