import React, { useState } from 'react';
import { FileSpreadsheet, AlertCircle, FileText, X, ExternalLink, Bot, CheckCircle2 } from 'lucide-react';
import { PlacementData, NavSection } from '../types.ts';

interface PlacementRecordsSectionProps {
  placementData: PlacementData;
  onAskAI: (query: string) => void;
  onNavigate: (section: NavSection) => void;
}

export const PlacementRecordsSection: React.FC<PlacementRecordsSectionProps> = ({
  placementData,
  onAskAI,
  onNavigate,
}) => {
  const [selectedRecord, setSelectedRecord] = useState<{ year: string; url?: string } | null>(null);

  const handleClickHere = (year: string, url?: string) => {
    setSelectedRecord({ year, url });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Heading */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold mb-2">
          <FileSpreadsheet className="w-3.5 h-3.5 text-amber-300" />
          <span>Section 11 • Placement Archives</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Previous Placement Records</h2>
        <p className="text-blue-200 text-sm sm:text-base max-w-3xl mt-1 leading-relaxed">
          Historical placement record archives across academic years from AY 2017–18 to AY 2022–23.
        </p>
      </div>

      {/* Main Records Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Annual Placement Lists
            </h3>
            <p className="text-xs text-slate-500">
              Verified graduate recruitment rosters as supplied.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-900 font-bold border border-blue-200">
            6 Archival Sessions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3.5 px-4 sm:px-6">Sr. No.</th>
                <th className="py-3.5 px-4 sm:px-6">Academic Year</th>
                <th className="py-3.5 px-4 sm:px-6 text-center">Placement List</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {placementData.placementRecords.map((item) => (
                <tr key={item.srNo} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-500">{item.srNo}</td>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">{item.academicYear}</td>
                  <td className="py-3.5 px-4 sm:px-6 text-center">
                    <button
                      onClick={() => handleClickHere(item.academicYear, item.docUrl)}
                      className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-2xs inline-flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-300" />
                      <span>Click Here</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note on document configuration */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5 mt-4">
          <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Document Integrity Notice:</strong> Since the actual document URLs have not been supplied in the baseline dataset, the system displays "Placement document not yet added" until the authorized administrator uploads a verified file. No fake download links are generated.
          </div>
        </div>
      </div>

      {/* Document View Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 bg-gradient-to-r from-blue-950 to-indigo-950 text-white flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">
                Placement Record: AY {selectedRecord.year}
              </h4>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1 rounded-lg text-blue-200 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 text-center space-y-4">
              {selectedRecord.url ? (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-900">Verified Placement Document</h5>
                  <p className="text-xs text-slate-500">
                    Official recruitment document for AY {selectedRecord.year}.
                  </p>
                  <a
                    href={selectedRecord.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Verified File</span>
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center border border-amber-200">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-base">
                    Placement document not yet added.
                  </h5>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    The placement roster for AY {selectedRecord.year} has not been uploaded to the database yet. Authorized administrators can attach the verified PDF from the Admin Desk.
                  </p>
                  <button
                    onClick={() => {
                      const yr = selectedRecord.year;
                      setSelectedRecord(null);
                      onAskAI(`Tell me about the placement statistics for AY ${yr}.`);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
                  >
                    <Bot className="w-3.5 h-3.5 text-amber-300" />
                    <span>Ask AI About AY {selectedRecord.year}</span>
                  </button>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
              <button
                onClick={() => setSelectedRecord(null)}
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
