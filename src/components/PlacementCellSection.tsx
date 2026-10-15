import React, { useState } from 'react';
import { Briefcase, Mail, Phone, Search, Users, AlertTriangle, ArrowRight, Bot, ExternalLink, BookOpen } from 'lucide-react';
import { PlacementData, NavSection } from '../types.ts';

interface PlacementCellSectionProps {
  placementData: PlacementData;
  onAskAI: (query: string) => void;
  onNavigate: (section: NavSection) => void;
}

export const PlacementCellSection: React.FC<PlacementCellSectionProps> = ({
  placementData,
  onAskAI,
  onNavigate,
}) => {
  const [teamSearch, setTeamSearch] = useState('');
  const [recruiterSearch, setRecruiterSearch] = useState('');
  const [prepModal, setPrepModal] = useState<string | null>(null);

  const filteredTeam = placementData.team.filter(
    (m) =>
      m.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
      m.designation.toLowerCase().includes(teamSearch.toLowerCase())
  );

  const filteredRecruiters = placementData.recruiters.filter((r) =>
    r.toLowerCase().includes(recruiterSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Heading */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold mb-2">
          <Briefcase className="w-3.5 h-3.5 text-amber-300" />
          <span>Section 9 • Training and Placement</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">About Placement Cell</h2>
        <p className="text-blue-200 text-sm sm:text-base max-w-3xl mt-1 leading-relaxed">
          Dedicated Training & Placement Cell empowering students with employability enhancement, industry connect, and campus placement drives.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full inline-block border border-amber-200">
            Vision
          </div>
          <h3 className="text-lg font-bold text-slate-900">Training & Placement Vision</h3>
          <p className="text-sm text-slate-700 italic font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
            "{placementData.vision}"
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full inline-block border border-blue-200">
            Mission
          </div>
          <h3 className="text-lg font-bold text-slate-900">Training & Placement Mission</h3>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700 font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {placementData.mission.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Placement Contact Profile & 5 Action Buttons */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Placement Contact
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              {placementData.inCharge.name}
            </h3>
            <p className="text-sm font-bold text-blue-700">
              {placementData.inCharge.designation}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${placementData.inCharge.email}`}
              className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200 inline-flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-4 h-4 text-blue-700" />
              <span>{placementData.inCharge.email}</span>
            </a>
            <a
              href={`tel:${placementData.inCharge.mobile}`}
              className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200 inline-flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>{placementData.inCharge.mobile}</span>
            </a>
          </div>
        </div>

        {/* 5 Required Action Buttons */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Placement Cell Action Shortcuts:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <a
              href={`mailto:${placementData.inCharge.email}`}
              className="p-3 bg-blue-900 hover:bg-blue-800 text-white rounded-2xl text-xs font-bold text-center transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Cell</span>
            </a>

            <button
              onClick={() => onNavigate('placement_stats')}
              className="p-3 bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-900 rounded-2xl text-xs font-bold border border-slate-200 text-center transition-colors"
            >
              View Statistics
            </button>

            <a
              href="#recruiters-section"
              className="p-3 bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-900 rounded-2xl text-xs font-bold border border-slate-200 text-center transition-colors"
            >
              View Recruiters
            </a>

            <button
              onClick={() => setPrepModal('internship')}
              className="p-3 bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-900 rounded-2xl text-xs font-bold border border-slate-200 text-center transition-colors"
            >
              Internship Prep
            </button>

            <button
              onClick={() => setPrepModal('resources')}
              className="p-3 bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-900 rounded-2xl text-xs font-bold border border-slate-200 text-center transition-colors"
            >
              Placement Prep
            </button>
          </div>
        </div>
      </div>

      {/* Training and Placement Team Searchable Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Training and Placement Team
            </h3>
            <p className="text-xs text-slate-500">
              Principal, TPO, and department placement coordinators.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={teamSearch}
              onChange={(e) => setTeamSearch(e.target.value)}
              placeholder="Search team member..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-9 pr-3 py-2 rounded-xl text-xs focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3 px-4 sm:px-6">Sr. No.</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4 sm:px-6">Designation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTeam.map((m) => (
                <tr key={m.srNo} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-semibold text-slate-500">{m.srNo}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{m.name}</td>
                  <td className="py-3 px-4 sm:px-6 text-blue-900 font-medium">{m.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recruiters Searchable Directory (All 34 Supplied Names) */}
      <div id="recruiters-section" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Visiting Recruiters Directory ({placementData.recruiters.length} Companies)
            </h3>
            <p className="text-xs text-slate-500">
              Supplied list of corporate campus recruiters.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={recruiterSearch}
              onChange={(e) => setRecruiterSearch(e.target.value)}
              placeholder="Search company name..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-9 pr-3 py-2 rounded-xl text-xs focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            <strong>Recruiter Listing Disclaimer:</strong> {placementData.recruiterDisclaimer}
          </span>
        </div>

        {/* Recruiter Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-2">
          {filteredRecruiters.map((r, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-900 border border-slate-200 text-xs font-semibold text-center transition-colors truncate"
              title={r}
            >
              {r}
            </div>
          ))}
        </div>
      </div>

      {/* Internship & Preparation Modal */}
      {prepModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <h4 className="text-lg font-bold text-slate-900">
              {prepModal === 'internship' ? 'Internship Preparation' : 'Placement Preparation Resources'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The T&P Cell organizes technical aptitude training, soft skills workshops, resume building sessions, and mock technical interviews for Third Year & Final Year engineering and MBA students.
            </p>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-900 font-medium">
              For upcoming industrial internship schedules and preparation modules, contact <strong>Prof. H. S. Deore</strong> at <strong>tpocoe@snjb.org</strong>.
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setPrepModal(null);
                  onAskAI(`What placement preparation and internship guidance does the T&P Cell offer?`);
                }}
                className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
              >
                Ask AI Assistant
              </button>
              <button
                onClick={() => setPrepModal(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
