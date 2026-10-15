import React, { useState } from 'react';
import { Award, ShieldCheck, CheckCircle2, AlertTriangle, Plus, ChevronDown, ChevronUp, Bot } from 'lucide-react';
import { Achievement, NavSection } from '../types.ts';

interface AchievementsSectionProps {
  achievements: Achievement[];
  onOpenAdmin: () => void;
  onNavigate: (section: NavSection) => void;
  onAskAI: (query: string) => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
  onOpenAdmin,
  onNavigate,
  onAskAI,
}) => {
  const [isExpandableOpen, setIsExpandableOpen] = useState(true);

  const nbaPrograms = [
    {
      title: 'Civil Engineering — NBA Accreditation, 2025',
      dept: 'Civil Engineering',
      status: 'NBA Accredited (2025)',
      description: 'NBA accreditation was reported for Civil Engineering in 2025.',
    },
    {
      title: 'Electronics and Telecommunications Engineering — NBA Accreditation, 2025',
      dept: 'Electronics and Telecommunications Engineering',
      status: 'NBA Accredited (2025)',
      description: 'NBA accreditation was reported for Electronics and Telecommunications Engineering in 2025.',
    },
    {
      title: 'MBA — NBA Accreditation, 2025',
      dept: 'MBA Department',
      status: 'NBA Accredited (2025)',
      description: 'NBA accreditation was reported for MBA in 2025.',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Heading */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold mb-2">
          <Award className="w-3.5 h-3.5 text-amber-300" />
          <span>Section 3 • Institutional Honors</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Our Achievements</h2>
        <p className="text-blue-200 text-sm sm:text-base max-w-3xl mt-1 leading-relaxed">
          Verified academic accreditations, institutional milestones, and certifications for SNJB College of Engineering.
        </p>
      </div>

      {/* Main NBA Achievement Card */}
      <div className="bg-gradient-to-br from-amber-500/10 via-blue-50/40 to-white border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>National Board of Accreditation (NBA)</span>
          </div>
          <span className="text-xs font-bold text-slate-500">Academic Year: 2025</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900">
          NBA Accreditation for Civil, E&TC and MBA
        </h3>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
          "NBA accreditation was reported for Civil Engineering, Electronics and Telecommunications Engineering, and MBA in 2025."
        </p>

        {/* 3 Specified Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {nbaPrograms.map((prog, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs space-y-2 hover:border-amber-400 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Card #{idx + 1}
                </span>
                <span className="text-xs font-bold text-slate-500">2025</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {prog.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {prog.description}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{prog.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Verification & Expiry Disclaimer */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-2.5 mt-2">
          <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Supplied Verification Notice:</strong> Clearly identified as the achievement information supplied for the project. Do not imply accreditation is currently valid beyond its verified period.
          </div>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => onAskAI('Tell me about the NBA accreditation of SNJB College for Civil, E&TC, and MBA in 2025.')}
            className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Bot className="w-3.5 h-3.5 text-amber-300" />
            <span>Ask AI About Accreditation</span>
          </button>
        </div>
      </div>

      {/* Expandable Area for Future Achievements & Institutional Milestones */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <button
          onClick={() => setIsExpandableOpen(!isExpandableOpen)}
          className="w-full p-5 sm:p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
        >
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Future Achievements, Awards, Certifications & Milestones
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Configurable repository for verified institutional certifications and awards.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-blue-700">
              {isExpandableOpen ? 'Hide Section' : 'Expand Section'}
            </span>
            {isExpandableOpen ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {isExpandableOpen && (
          <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-900">NAAC Institutional Quality Assessment</span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">Institutional</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Recognized for ethical values, state-of-the-art laboratory infrastructure, and comprehensive technical delivery in rural Maharashtra.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-900">Industry Center of Excellence & Skill MoUs</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Ongoing</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Active collaborations with technical bodies, training partners, and industry recruiters for student employability enhancement.
                </p>
              </div>
            </div>

            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="text-slate-600">
                Authorized administrators can add new verified institutional awards and accreditation letters.
              </span>
              <button
                onClick={onOpenAdmin}
                className="px-3 py-1.5 bg-blue-900 text-white rounded-lg font-bold flex items-center gap-1 text-[11px]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Verified Milestone</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
