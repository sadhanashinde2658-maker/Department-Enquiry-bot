import React from 'react';
import { ShieldAlert, Mail, AlertTriangle, FileText, CheckCircle2, Bot, Calendar, Clock } from 'lucide-react';
import { ExaminationCellInfo, NavSection } from '../types.ts';

interface ExaminationCellSectionProps {
  examinationCell: ExaminationCellInfo;
  onAskAI: (query: string) => void;
  onNavigate: (section: NavSection) => void;
}

export const ExaminationCellSection: React.FC<ExaminationCellSectionProps> = ({
  examinationCell,
  onAskAI,
  onNavigate,
}) => {
  const cards = [
    {
      title: 'Examination Cell Contact',
      description: 'Official communication desk for examination applications, transcript issuance, and student grievances.',
      badge: 'Official Desk',
    },
    {
      title: 'Mid-Semester Examination (MSE)',
      description: 'Continuous assessment evaluation conducted mid-term for both undergraduate B.Tech and postgraduate programs.',
      badge: 'Internal Assessment',
    },
    {
      title: 'Semester End Examination (SEE)',
      description: 'Comprehensive end-semester summative evaluation. Official timetables are published by circular.',
      badge: 'End-Term',
    },
    {
      title: 'Practical Examinations',
      description: 'Laboratory performance evaluations, external viva voce, project reviews, and oral examinations.',
      badge: 'Lab Practical',
    },
    {
      title: 'Re-examination Schedules',
      description: 'Backlog makeup sessions and remedial examinations scheduled as per university/autonomous regulations.',
      badge: 'Remedial',
    },
    {
      title: 'Examination Notices',
      description: 'Official examination circulars, exam fee submission dates, hall ticket notifications, and instructions.',
      badge: 'Notices',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Heading */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold mb-2">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
          <span>Section 8 • Controller of Examination</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Examination Cell</h2>
        <p className="text-blue-200 text-sm sm:text-base max-w-3xl mt-1 leading-relaxed">
          Autonomous examination cell administration, student assessments, evaluations, and official verification desk.
        </p>
      </div>

      {/* Prominent Controller of Examination Card */}
      <div className="bg-white rounded-3xl border border-blue-200 shadow-md p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/60 rounded-bl-full pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Controller of Examination Desk
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              {examinationCell.controllerOfExamination}
            </h3>

            <p className="text-sm font-bold text-blue-700">
              {examinationCell.designation}
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="text-slate-500">Official Examination Email:</span>
              <a
                href={`mailto:${examinationCell.email}`}
                className="font-bold text-blue-700 hover:text-blue-900 underline"
              >
                {examinationCell.email}
              </a>
            </div>
          </div>

          {/* Action Button: Contact Examination Cell */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${examinationCell.email}`}
              className="px-6 py-3.5 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-amber-300" />
              <span>Contact Examination Cell</span>
            </a>

            <button
              onClick={() => onAskAI('Who is the Controller of Examination and how can I contact the Exam Cell?')}
              className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-900 font-bold text-xs sm:text-sm border border-slate-200 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-blue-700" />
              <span>Ask AI</span>
            </button>
          </div>
        </div>

        {/* Anti-Hallucination Disclaimer */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3 mt-4">
          <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Strict Examination Integrity Policy:</strong> {examinationCell.strictGuidelines}
          </div>
        </div>
      </div>

      {/* 6 Examination Information Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          Examination Framework & Student Services (6 Cards)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    Card #{idx + 1}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {c.badge}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 pt-1">{c.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{c.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onAskAI(`Explain about ${c.title} at SNJB College of Engineering.`)}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
                >
                  <Bot className="w-3.5 h-3.5 text-amber-500" />
                  <span>Ask AI Details</span>
                </button>
                <a
                  href={`mailto:${examinationCell.email}`}
                  className="text-xs text-slate-400 hover:text-slate-700 font-semibold"
                >
                  Email Desk
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
