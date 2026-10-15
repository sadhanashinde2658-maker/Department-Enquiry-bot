import React, { useState } from 'react';
import { Users, Search, Mail, Phone, Award, BookOpen, Bot, Check, Copy } from 'lucide-react';
import { FacultyMember, NavSection } from '../types.ts';

interface FacultySectionProps {
  facultyList: FacultyMember[];
  onAskAI: (query: string) => void;
  onNavigate: (section: NavSection) => void;
}

export const FacultySection: React.FC<FacultySectionProps> = ({
  facultyList,
  onAskAI,
  onNavigate,
}) => {
  const [search, setSearch] = useState('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const filtered = facultyList.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.designation.toLowerCase().includes(search.toLowerCase()) ||
      f.qualification.toLowerCase().includes(search.toLowerCase()) ||
      f.areasOfInterest.toLowerCase().includes(search.toLowerCase()) ||
      f.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Heading */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold mb-2">
              <Users className="w-3.5 h-3.5 text-amber-300" />
              <span>Section 5 • Academic Faculty Repository</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Computer Engineering Faculty
            </h2>
            <p className="text-blue-200 text-sm sm:text-base max-w-2xl mt-1 leading-relaxed">
              Searchable faculty directory containing official academic credentials, designations, and areas of interest.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search faculty name, qualification, research..."
              className="w-full bg-white text-slate-900 pl-10 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-400 shadow-md placeholder-slate-400 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Searchable Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Faculty Records Table
            </h3>
            <p className="text-xs text-slate-500">
              Showing {filtered.length} verified faculty members in Computer Engineering.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3.5 px-4 sm:px-6">Name</th>
                <th className="py-3.5 px-4">Designation</th>
                <th className="py-3.5 px-4">Qualification</th>
                <th className="py-3.5 px-4">Areas of Interest</th>
                <th className="py-3.5 px-4 sm:px-6">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((fac, idx) => (
                <tr key={fac.id || idx} className="hover:bg-blue-50/50 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                    {fac.name}
                  </td>
                  <td className="py-3.5 px-4 text-blue-900 font-medium">
                    {fac.designation}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {fac.qualification}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 max-w-xs">
                    {fac.areasOfInterest}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono text-xs">
                    <a
                      href={`mailto:${fac.email}`}
                      className="text-blue-700 hover:text-blue-900 underline font-medium"
                    >
                      {fac.email}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Individual Faculty Profile Cards */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Faculty Profile Cards
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((fac, idx) => (
            <div
              key={fac.id || idx}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 text-[11px] font-bold border border-blue-100">
                    Faculty #{idx + 1}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Comp. Engg.
                  </span>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">
                    {fac.name}
                  </h4>
                  <p className="text-xs font-semibold text-blue-700 mt-0.5">
                    {fac.designation}
                  </p>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    <strong>Qualification:</strong> {fac.qualification}
                  </p>
                </div>

                {/* Areas of Interest */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Areas of Interest:
                  </div>
                  <div className="text-slate-700 leading-relaxed font-medium">
                    {fac.areasOfInterest}
                  </div>
                </div>

                {/* Contact detail */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <a
                      href={`mailto:${fac.email}`}
                      className="flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-semibold truncate"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span className="truncate">{fac.email}</span>
                    </a>
                    <button
                      onClick={() => handleCopyEmail(fac.email)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                      title="Copy Email"
                    >
                      {copiedEmail === fac.email ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {fac.phone && (
                    <div className="flex items-center justify-between">
                      <a
                        href={`tel:${fac.phone}`}
                        className="flex items-center gap-1.5 text-emerald-700 font-bold"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{fac.phone}</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() =>
                    onAskAI(
                      `Tell me about ${fac.name}, their qualifications, designation, and research areas of interest.`
                    )
                  }
                  className="w-full py-2 px-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5"
                >
                  <Bot className="w-3.5 h-3.5 text-amber-300" />
                  <span>Ask AI About {fac.name.split(' ')[1] || fac.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
