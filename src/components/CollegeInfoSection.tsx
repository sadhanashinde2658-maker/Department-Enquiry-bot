import React from 'react';
import { Building, MapPin, Phone, Mail, Clock, ShieldCheck, Check, Copy, ArrowRight, Bot } from 'lucide-react';
import { CollegeOverview, DepartmentHead, NavSection } from '../types.ts';

interface CollegeInfoSectionProps {
  college: CollegeOverview;
  departmentHeads: DepartmentHead[];
  onAskAI: (query: string) => void;
  onNavigate: (section: NavSection) => void;
}

export const CollegeInfoSection: React.FC<CollegeInfoSectionProps> = ({
  college,
  departmentHeads,
  onAskAI,
  onNavigate,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Heading */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold mb-2">
          <Building className="w-3.5 h-3.5 text-amber-300" />
          <span>Section 13 • Official Directory</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          College Information and Contact Directory
        </h2>
        <p className="text-blue-200 text-sm sm:text-base max-w-3xl mt-1 leading-relaxed">
          Central administration contacts, office timings, campus address, and official department head communication directory.
        </p>
      </div>

      {/* General College Contact Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
              General College Contact
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {college.name}
            </h3>
            <p className="text-xs text-slate-500">{college.subtitle}</p>
          </div>
          <span className="text-xs px-3 py-1 bg-emerald-50 text-emerald-800 font-bold rounded-full border border-emerald-200 self-start sm:self-auto">
            Official Main Desk
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Campus & Address</span>
            </div>
            <div className="font-bold text-slate-900 pt-1">
              Campus: {college.campus}
            </div>
            <div className="text-slate-600">
              Address: {college.address}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Office Working Hours</span>
            </div>
            <div className="font-bold text-slate-900 pt-1">
              {college.workingHours}
            </div>
            <div className="text-slate-500 text-xs">
              Administrative offices open for student enquiries and document verification.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Telephone Lines</span>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              {college.phone.map((p, idx) => (
                <a
                  key={idx}
                  href={`tel:${p.replace(/[^0-9]/g, '')}`}
                  className="font-bold text-emerald-700 hover:text-emerald-900 hover:underline inline-flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-emerald-600" />
                  <span>{p}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>Principal Office Email</span>
            </div>
            <div className="pt-1">
              <a
                href={`mailto:${college.email}`}
                className="font-bold text-blue-700 hover:text-blue-900 hover:underline"
              >
                {college.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Department Contact Directory Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
              Department Contact Directory Table
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              HOD Directory & Direct Contact Details
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3.5 px-4 sm:px-6">Department</th>
                <th className="py-3.5 px-4">HOD</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4 sm:px-6">Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {departmentHeads.map((dept, idx) => (
                <tr key={dept.id || idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                    {dept.department}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-blue-950">
                    {dept.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs">
                    <a
                      href={`mailto:${dept.email}`}
                      className="text-blue-700 hover:text-blue-900 hover:underline inline-flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3 text-blue-600" />
                      <span>{dept.email}</span>
                    </a>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold">
                    <a
                      href={`tel:${dept.phone}`}
                      className="text-emerald-700 hover:text-emerald-900 hover:underline inline-flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-emerald-600" />
                      <span>{dept.phone}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
