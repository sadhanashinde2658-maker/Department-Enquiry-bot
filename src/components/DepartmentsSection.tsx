import React, { useState } from 'react';
import { Building2, Mail, Phone, Bot, Info, X, Check, Copy, ArrowRight, ExternalLink } from 'lucide-react';
import { DepartmentHead, NavSection } from '../types.ts';

interface DepartmentsSectionProps {
  departmentHeads: DepartmentHead[];
  onAskAI: (query: string) => void;
  onNavigate: (section: NavSection) => void;
}

export const DepartmentsSection: React.FC<DepartmentsSectionProps> = ({
  departmentHeads,
  onAskAI,
  onNavigate,
}) => {
  const [selectedDept, setSelectedDept] = useState<DepartmentHead | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Heading */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold mb-2">
          <Building2 className="w-3.5 h-3.5 text-amber-300" />
          <span>Section 4 • Academic Divisions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Engineering Departments</h2>
        <p className="text-blue-200 text-sm sm:text-base max-w-3xl mt-1 leading-relaxed">
          Official leadership, communication channels, and specialized profiles for all 7 academic wings at SNJB College of Engineering.
        </p>
      </div>

      {/* 7 Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departmentHeads.map((dept, index) => {
          const sectionNum = `4.${index + 1}`;
          return (
            <div
              key={dept.id || index}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                    Section {sectionNum}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Wing #{index + 1}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {dept.department}
                  </h3>
                  <div className="text-xs font-semibold text-blue-700 mt-1">
                    HOD: <span className="font-bold text-slate-800">{dept.name}</span>
                  </div>
                  {dept.qualification && (
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {dept.qualification}
                    </div>
                  )}
                </div>

                {/* Email & Phone */}
                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <a
                      href={`mailto:${dept.email}`}
                      className="flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-semibold truncate"
                      title="Send email"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span className="truncate">{dept.email}</span>
                    </a>
                    <button
                      onClick={() => handleCopyEmail(dept.email)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                      title="Copy email"
                    >
                      {copiedEmail === dept.email ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <a
                      href={`tel:${dept.phone}`}
                      className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900 font-bold"
                      title="Call direct line"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{dept.phone}</span>
                    </a>
                    <span className="text-[10px] text-slate-400">Official Mobile</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: View Details & Ask AI */}
              <div className="bg-slate-50 p-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedDept(dept)}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1"
                >
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() =>
                    onAskAI(
                      `Who is the HOD of ${dept.department}? What are their contact details, email, and areas of interest?`
                    )
                  }
                  className="px-3 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1"
                >
                  <Bot className="w-3.5 h-3.5 text-amber-300" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      {selectedDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 bg-gradient-to-r from-blue-950 to-indigo-950 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                  Department Information
                </span>
                <h3 className="text-lg font-bold text-white">{selectedDept.department}</h3>
              </div>
              <button
                onClick={() => setSelectedDept(null)}
                className="p-1 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  Head of Department (HOD)
                </div>
                <div className="text-base font-bold text-slate-900">{selectedDept.name}</div>
                <div className="text-blue-700 font-semibold">{selectedDept.designation}</div>
                {selectedDept.qualification && (
                  <div className="text-slate-600">
                    <strong>Qualification:</strong> {selectedDept.qualification}
                  </div>
                )}
              </div>

              {selectedDept.areasOfInterest && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    Areas of Interest & Specialization
                  </div>
                  <div className="text-slate-700 leading-relaxed font-medium">
                    {selectedDept.areasOfInterest}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl">
                  <span className="text-slate-500">Official Email:</span>
                  <a
                    href={`mailto:${selectedDept.email}`}
                    className="font-bold text-blue-700 hover:underline"
                  >
                    {selectedDept.email}
                  </a>
                </div>

                {selectedDept.additionalEmail && (
                  <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl">
                    <span className="text-slate-500">Alternate Email:</span>
                    <a
                      href={`mailto:${selectedDept.additionalEmail}`}
                      className="font-bold text-blue-700 hover:underline"
                    >
                      {selectedDept.additionalEmail}
                    </a>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl">
                  <span className="text-slate-500">Phone Contact:</span>
                  <a
                    href={`tel:${selectedDept.phone}`}
                    className="font-bold text-emerald-700 hover:underline"
                  >
                    {selectedDept.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  const deptName = selectedDept.department;
                  setSelectedDept(null);
                  onAskAI(`Tell me everything about the ${deptName} Department and its HOD.`);
                }}
                className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5 text-amber-300" />
                <span>Ask AI About This Dept</span>
              </button>

              <button
                onClick={() => setSelectedDept(null)}
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
