import React, { useState } from 'react';
import { CalendarDays, AlertTriangle, FileText, X, History, ExternalLink, Bot, CheckCircle2, Clock } from 'lucide-react';
import { TimetableAndExamCalendar, NavSection } from '../types.ts';

interface TimetableSectionProps {
  timetableData: TimetableAndExamCalendar;
  onAskAI: (query: string) => void;
  onNavigate: (section: NavSection) => void;
}

export const TimetableSection: React.FC<TimetableSectionProps> = ({
  timetableData,
  onAskAI,
  onNavigate,
}) => {
  const [viewDocModal, setViewDocModal] = useState<{ title: string; docUrl?: string } | null>(null);

  const handleView = (title: string, docUrl?: string) => {
    setViewDocModal({ title, docUrl });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Heading */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold mb-2">
          <CalendarDays className="w-3.5 h-3.5 text-amber-300" />
          <span>Section 7 • Academic Schedules</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Timetable and Academic Calendar</h2>
        <p className="text-blue-200 text-sm sm:text-base max-w-3xl mt-1 leading-relaxed">
          Examination calendars, mid-semester (MSE) & semester-end (SEE) timetables, and historical examination schedules.
        </p>
      </div>

      {/* Verified Notice Alert */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold block mb-0.5">Strict Examination Schedule Notice:</span>
          All past examination schedules are historical records. The Current Timetable section displays only verified active documents. The college chatbot and portal never treat past schedules as current dates.
        </div>
      </div>

      {/* Subsection 7.1: Examination Calendar AY 2025–26, Semester I */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              Subsection 7.1
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              Examination Calendar AY {timetableData.academicYear}, Semester {timetableData.semester}
            </h3>
            <p className="text-xs text-slate-500">
              Institutional academic and examination calendar framework.
            </p>
          </div>

          <button
            onClick={() =>
              handleView(
                `Examination Calendar AY ${timetableData.academicYear}, Semester ${timetableData.semester}`,
                timetableData.calendarDocUrl
              )
            }
            className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
          >
            <CalendarDays className="w-4 h-4 text-amber-300" />
            <span>View Calendar</span>
          </button>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
          <div className="font-bold text-slate-800">Calendar Framework Summary:</div>
          <p>
            Covers tentative commencement timelines for continuous assessment, internal MSE evaluations, practical external exams, and end-term SEE assessments.
          </p>
        </div>
      </div>

      {/* Subsection 7.2: UG/PG Timetable */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              Subsection 7.2
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              UG/PG Timetable (SY B.Tech & MBA-II)
            </h3>
            <p className="text-xs text-slate-500">
              MSE and SEE timetable documents by program.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3 px-4">Sr. No.</th>
                <th className="py-3 px-4">Program</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4 text-center">MSE Timetable</th>
                <th className="py-3 px-4 text-center">SEE Timetable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {timetableData.ugPgRows.map((row) => (
                <tr key={row.srNo} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-500">{row.srNo}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{row.program}</td>
                  <td className="py-3 px-4 text-blue-900 font-semibold">{row.className}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() =>
                        handleView(
                          `MSE Timetable for ${row.program} (${row.className})`,
                          row.mseDoc
                        )
                      }
                      className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 transition-colors inline-flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() =>
                        handleView(
                          `SEE Timetable for ${row.program} (${row.className})`,
                          row.seeDoc
                        )
                      }
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold border border-indigo-200 transition-colors inline-flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Timetables Grid (7.3, 7.4, 7.5) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subsection 7.3: SEE May 2025 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Historical (May 2025)
            </span>
            <History className="w-4 h-4 text-amber-600" />
          </div>
          <h4 className="text-base font-bold text-slate-900">
            7.3 SEE Timetable — May 2025
          </h4>
          <div className="space-y-2 text-xs">
            {timetableData.seeMay2025.map((rec, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700"
              >
                {rec}
              </div>
            ))}
          </div>
        </div>

        {/* Subsection 7.4: SEE Dec 2024 / Jan 2025 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Historical (Dec 2024 / Jan 2025)
            </span>
            <History className="w-4 h-4 text-amber-600" />
          </div>
          <h4 className="text-base font-bold text-slate-900">
            7.4 SEE Timetable — Dec 2024 / Jan 2025
          </h4>
          <div className="space-y-2 text-xs">
            {timetableData.seeDec2024Jan2025.map((rec, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700"
              >
                {rec}
              </div>
            ))}
          </div>
        </div>

        {/* Subsection 7.5: Exam & Re-exam Schedules */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Historical (Re-Exam)
            </span>
            <History className="w-4 h-4 text-amber-600" />
          </div>
          <h4 className="text-base font-bold text-slate-900">
            7.5 Exam & Re-examination Schedules
          </h4>
          <div className="space-y-2 text-xs">
            {timetableData.examReExamSchedules.map((rec, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700"
              >
                {rec}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Timetable Verified Section */}
      <div className="bg-gradient-to-br from-emerald-500/10 via-blue-50/40 to-white border border-emerald-300 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Verified Current Timetable Section
            </h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
            Active Records
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          This section displays only verified active session documents approved by the Examination Cell. If a new timetable is released, the Controller of Examination posts the notice here.
        </p>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="font-bold text-slate-900">Active Semester Circulars & Notice Desk</div>
            <div className="text-slate-500 mt-0.5">Contact deanexamcoe@snjb.org for official updates.</div>
          </div>
          <button
            onClick={() => onNavigate('exam_cell')}
            className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold self-start sm:self-auto transition-colors"
          >
            Visit Examination Cell
          </button>
        </div>
      </div>

      {/* Document View Modal */}
      {viewDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 bg-gradient-to-r from-blue-950 to-indigo-950 text-white flex items-center justify-between">
              <h4 className="text-sm font-bold text-white truncate pr-2">
                {viewDocModal.title}
              </h4>
              <button
                onClick={() => setViewDocModal(null)}
                className="p-1 rounded-lg text-blue-200 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 text-center space-y-4">
              {viewDocModal.docUrl ? (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-900">Timetable Document Configured</h5>
                  <a
                    href={viewDocModal.docUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Official Document</span>
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-900">Timetable document not yet added.</h5>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    The verified document has not been uploaded yet. Please check the college notice board or contact the Examination Cell.
                  </p>
                  <button
                    onClick={() => {
                      const t = viewDocModal.title;
                      setViewDocModal(null);
                      onAskAI(`Tell me about the examination schedule for ${t}.`);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-900 text-white text-xs font-bold rounded-xl"
                  >
                    <Bot className="w-3.5 h-3.5 text-amber-300" />
                    <span>Ask AI About This Timetable</span>
                  </button>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
              <button
                onClick={() => setViewDocModal(null)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-1.5"
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
