import React, { useState } from 'react';
import { FlaskConical, MapPin, Search, Bot, Building, Compass } from 'lucide-react';
import { Laboratory, NavSection } from '../types.ts';

interface LaboratoriesSectionProps {
  laboratories: Laboratory[];
  onAskAI: (query: string) => void;
  onNavigate: (section: NavSection) => void;
}

export const LaboratoriesSection: React.FC<LaboratoriesSectionProps> = ({
  laboratories,
  onAskAI,
  onNavigate,
}) => {
  const [search, setSearch] = useState('');

  const filtered = laboratories.filter((lab) => {
    const q = search.toLowerCase();
    const nameMatch = lab.name.toLowerCase().includes(q);
    const floorMatch = lab.floor ? lab.floor.toLowerCase().includes(q) : false;
    const roomMatch = lab.room ? lab.room.toLowerCase().includes(q) : false;
    const buildingMatch = lab.building ? lab.building.toLowerCase().includes(q) : false;
    const facilityMatch = lab.facility ? lab.facility.toLowerCase().includes(q) : false;
    return nameMatch || floorMatch || roomMatch || buildingMatch || facilityMatch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Heading */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold mb-2">
              <FlaskConical className="w-3.5 h-3.5 text-amber-300" />
              <span>Section 12 • Campus Practical Infrastructure</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Laboratories and Facilities</h2>
            <p className="text-blue-200 text-sm sm:text-base max-w-2xl mt-1 leading-relaxed">
              Official campus laboratory directory with verified floor levels, room numbers, and workshop facilities.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by lab name, floor, room..."
              className="w-full bg-white text-slate-900 pl-10 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-400 shadow-md placeholder-slate-400 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Grid of All 12 Laboratory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((lab, idx) => (
          <div
            key={lab.id || idx}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                  Lab #{idx + 1}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {lab.department}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {lab.name}
              </h4>

              {/* Exact Location Fields (Displaying 'Not provided' for missing details) */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
                {lab.floor && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Floor:</span>
                    <span className="font-bold text-slate-800">{lab.floor}</span>
                  </div>
                )}
                {!lab.floor && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Floor:</span>
                    <span className="font-semibold text-slate-400 italic">Not provided</span>
                  </div>
                )}

                {lab.room && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Room:</span>
                    <span className="font-bold text-blue-900 bg-white px-2 py-0.5 rounded border border-blue-100">
                      {lab.room}
                    </span>
                  </div>
                )}
                {!lab.room && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Room:</span>
                    <span className="font-semibold text-slate-400 italic">Not provided</span>
                  </div>
                )}

                {lab.building && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Building:</span>
                    <span className="font-bold text-slate-800">{lab.building}</span>
                  </div>
                )}
                {!lab.building && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Building:</span>
                    <span className="font-semibold text-slate-400 italic">Not provided</span>
                  </div>
                )}

                {lab.facility && (
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                    <span className="text-slate-500 font-medium">Facility:</span>
                    <span className="font-bold text-purple-900">{lab.facility}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() =>
                  onAskAI(
                    `Where is the ${lab.name} located? Give its exact room number, floor, and building directions.`
                  )
                }
                className="w-full py-2 px-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5 text-amber-300" />
                <span>Ask AI Directions</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-500">
            No laboratories match your query "{search}".
          </p>
        </div>
      )}
    </div>
  );
};
