import React, { useState } from 'react';
import { BookOpen, FileText, AlertCircle, X, ExternalLink, Bot, CheckCircle2 } from 'lucide-react';
import { SyllabusData, NavSection } from '../types.ts';

interface SyllabusSectionProps {
  syllabus: SyllabusData;
  onAskAI: (query: string) => void;
  onNavigate: (section: NavSection) => void;
}

export const SyllabusSection: React.FC<SyllabusSectionProps> = ({
  syllabus,
  onAskAI,
  onNavigate,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'btech' | 'common' | 'mtech' | 'mba'>('btech');
  const [viewDocModal, setViewDocModal] = useState<{ title: string; docUrl?: string } | null>(null);

  const handleViewDoc = (title: string, docUrl?: string) => {
    setViewDocModal({ title, docUrl });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Heading */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          <span>Section 6 • Academic Curriculum</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Branch-Wise Syllabus</h2>
        <p className="text-blue-200 text-sm sm:text-base max-w-3xl mt-1 leading-relaxed">
          Structured academic syllabus documentation for Undergraduate (B.Tech 2024–28) and Postgraduate (M.Tech & MBA 2024–26) programs.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveSubTab('btech')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'btech'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          6.1 B.Tech Syllabus (2024–28)
        </button>

        <button
          onClick={() => setActiveSubTab('common')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'common'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          6.2 Common Second Year Courses
        </button>

        <button
          onClick={() => setActiveSubTab('mtech')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'mtech'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          6.3 M.Tech Syllabus (2024–26)
        </button>

        <button
          onClick={() => setActiveSubTab('mba')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'mba'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          6.4 MBA Syllabus (FYMBA & SYMBA)
        </button>
      </div>

      {/* Tab 6.1: B.Tech Syllabus */}
      {activeSubTab === 'btech' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                B.Tech Syllabus — Academic Year 2024–28
              </h3>
              <p className="text-xs text-slate-500">
                Curriculum matrix for 5 undergraduate engineering branches.
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-900 font-bold border border-blue-200 self-start sm:self-auto">
              AY 2024–28 Framework
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="py-3.5 px-4 sm:px-6">Branch</th>
                  <th className="py-3.5 px-4 text-center">First Year B.Tech (2024–25)</th>
                  <th className="py-3.5 px-4 text-center">Second Year B.Tech (2025–26)</th>
                  <th className="py-3.5 px-4 text-right">Ask AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {syllabus.bTechRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                      {idx + 1}. {row.branch}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() =>
                          handleViewDoc(
                            `${row.branch} - First Year B.Tech (2024–25) Syllabus`,
                            row.firstYearDoc
                          )
                        }
                        className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 transition-colors inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View First Year</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() =>
                          handleViewDoc(
                            `${row.branch} - Second Year B.Tech (2025–26) Syllabus`,
                            row.secondYearDoc
                          )
                        }
                        className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold border border-indigo-200 transition-colors inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Second Year</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() =>
                          onAskAI(
                            `Provide detailed syllabus and subjects for ${row.branch} B.Tech (First Year & Second Year).`
                          )
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-blue-900 text-white text-xs font-bold hover:bg-blue-800 transition-colors"
                      >
                        Ask AI
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6.2: Common Courses for Second Year */}
      {activeSubTab === 'common' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Common Courses for Second Year B.Tech
              </h3>
              <p className="text-xs text-slate-500">
                Academic Year: 2025–26 specialized learning buckets.
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-900 font-bold border border-indigo-200 self-start sm:self-auto">
              AY 2025–26
            </span>
          </div>

          <div className="space-y-3">
            {syllabus.secondYearCommonCourses.map((c, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-900 text-white text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">{c.name}</h4>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 pl-7">{c.description}</p>
                </div>

                <div className="pl-7 sm:pl-0 flex items-center gap-2">
                  <button
                    onClick={() => handleViewDoc(`${c.name} Course Document`, c.docUrl)}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-blue-50 text-blue-900 text-xs font-bold border border-slate-300 transition-colors shadow-2xs inline-flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => onAskAI(`Explain what ${c.name} includes in Second Year B.Tech at SNJB.`)}
                    className="px-3 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-colors"
                  >
                    Ask AI
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6.3: M.Tech Syllabus */}
      {activeSubTab === 'mtech' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                PG Syllabus — Academic Year 2024–26 (M.Tech)
              </h3>
              <p className="text-xs text-slate-500">
                Postgraduate curriculum for Computer Engineering and Mechanical Engineering.
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-purple-50 text-purple-900 font-bold border border-purple-200 self-start sm:self-auto">
              AY 2024–26 (PG)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="py-3.5 px-4 sm:px-6">Branch</th>
                  <th className="py-3.5 px-4 text-center">First Year M.Tech (2024–25, Old)</th>
                  <th className="py-3.5 px-4 text-center">First Year M.Tech (2024–25, Revised)</th>
                  <th className="py-3.5 px-4 text-center">Second Year M.Tech (2025–26)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {syllabus.mTechRows.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                      {m.branch} Engineering
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() =>
                          handleViewDoc(
                            `M.Tech ${m.branch} - First Year (2024–25, Old)`,
                            m.fyOldDoc
                          )
                        }
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-colors inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View (Old)</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() =>
                          handleViewDoc(
                            `M.Tech ${m.branch} - First Year (2024–25, Revised)`,
                            m.fyRevisedDoc
                          )
                        }
                        className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 transition-colors inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View (Revised)</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() =>
                          handleViewDoc(
                            `M.Tech ${m.branch} - Second Year (2025–26)`,
                            m.syDoc
                          )
                        }
                        className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold border border-indigo-200 transition-colors inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View (SY)</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6.4: MBA Syllabus */}
      {activeSubTab === 'mba' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                MBA Syllabus Options
              </h3>
              <p className="text-xs text-slate-500">
                Curriculum documentation for Master of Business Administration.
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 font-bold border border-emerald-200 self-start sm:self-auto">
              MBA Program
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {syllabus.mbaRows.map((mba, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                    Postgraduate Management Track
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-1">{mba.program}</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Specialized coursework in managerial economics, marketing management, organizational behavior, business research, and analytics.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => handleViewDoc(`${mba.program} Syllabus Document`, mba.fyDoc || mba.syDoc)}
                    className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Syllabus</span>
                  </button>
                  <button
                    onClick={() => onAskAI(`What subjects are covered in ${mba.program} at SNJB?`)}
                    className="text-xs font-bold text-blue-700 hover:underline"
                  >
                    Ask AI
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Configurable Document View Modal (Prevents fake links!) */}
      {viewDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 bg-gradient-to-r from-blue-950 to-indigo-950 text-white flex items-center justify-between">
              <h4 className="text-sm font-bold text-white leading-snug truncate pr-2">
                {viewDocModal.title}
              </h4>
              <button
                onClick={() => setViewDocModal(null)}
                className="p-1 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 text-center space-y-4">
              {viewDocModal.docUrl ? (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-900">Verified Syllabus Document Found</h5>
                  <p className="text-xs text-slate-500">
                    An official curriculum document is attached to this record.
                  </p>
                  <a
                    href={viewDocModal.docUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 text-white text-xs font-bold hover:bg-blue-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Configured Document</span>
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center border border-amber-200">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-900">Syllabus document not yet added.</h5>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    The official PDF has not been uploaded yet by the college administrator. Please consult the department office or ask our AI assistant for subject breakdowns.
                  </p>
                  <button
                    onClick={() => {
                      const t = viewDocModal.title;
                      setViewDocModal(null);
                      onAskAI(`What is the syllabus structure for ${t}?`);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    <Bot className="w-3.5 h-3.5 text-amber-300" />
                    <span>Ask AI About This Syllabus</span>
                  </button>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
              <button
                onClick={() => setViewDocModal(null)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-1.5"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
