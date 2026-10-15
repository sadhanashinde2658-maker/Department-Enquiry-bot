import React, { useState } from 'react';
import { BarChart3, TrendingUp, Award, AlertCircle, Bot } from 'lucide-react';
import { PlacementData, NavSection } from '../types.ts';

interface PlacementStatisticsSectionProps {
  placementData: PlacementData;
  onAskAI: (query: string) => void;
  onNavigate: (section: NavSection) => void;
}

export const PlacementStatisticsSection: React.FC<PlacementStatisticsSectionProps> = ({
  placementData,
  onAskAI,
  onNavigate,
}) => {
  const [selectedChartTab, setSelectedChartTab] = useState<'2025_26' | '2024_25' | 'overall'>('2025_26');

  // Max Package highlights
  const maxPackages2024_25 = [
    { dept: 'Computer', max: '₹11,50,000' },
    { dept: 'Mechanical', max: '₹8,00,000' },
    { dept: 'AI&DS', max: '₹6,00,000' },
    { dept: 'MBA', max: '₹6,00,000' },
    { dept: 'E&TC', max: '₹5,00,000' },
    { dept: 'Civil', max: '₹4,60,000' },
  ];

  const maxPackages2025_26 = [
    { dept: 'Computer', max: '₹9,00,000' },
    { dept: 'Mechanical', max: '₹9,00,000' },
    { dept: 'AI&DS', max: '₹9,00,000' },
    { dept: 'E&TC', max: '₹8,00,000' },
    { dept: 'Civil', max: '₹6,00,000' },
    { dept: 'MBA', max: '₹5,00,000' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Heading */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold mb-2">
          <BarChart3 className="w-3.5 h-3.5 text-amber-300" />
          <span>Section 10 • Audited & Reported Statistics</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Placement Statistics</h2>
        <p className="text-blue-200 text-sm sm:text-base max-w-3xl mt-1 leading-relaxed">
          Comprehensive data tables, department comparison charts, academic year trends, and maximum package reports.
        </p>
      </div>

      {/* Visual Chart View Switcher */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-700" />
              <span>Interactive Placement Comparison Charts</span>
            </h3>
            <p className="text-xs text-slate-500">
              Visual bar charts comparing offers, placements, and academic year distributions.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setSelectedChartTab('2025_26')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedChartTab === '2025_26'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2025–26 (Offers vs Placed)
            </button>
            <button
              onClick={() => setSelectedChartTab('2024_25')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedChartTab === '2024_25'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2024–25 by Dept
            </button>
            <button
              onClick={() => setSelectedChartTab('overall')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedChartTab === 'overall'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Multi-Year Trends
            </button>
          </div>
        </div>

        {/* Chart View 1: 2025-26 Offers vs Placed */}
        {selectedChartTab === '2025_26' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-slate-700">Department Breakdown (AY 2025–26)</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-indigo-400" /> Offers
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-blue-900" /> Placements
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {placementData.departmentWise2025_26.map((dept, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>{dept.department}</span>
                    <span>
                      {dept.offers} Offers | {dept.placements} Placed ({dept.maxPackage})
                    </span>
                  </div>
                  <div className="h-6 w-full bg-slate-100 rounded-lg overflow-hidden flex gap-1 p-0.5">
                    {/* Offers bar */}
                    <div
                      style={{ width: `${(dept.offers / 90) * 100}%` }}
                      className="h-full bg-indigo-400 rounded-sm flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                    >
                      {dept.offers}
                    </div>
                    {/* Placements bar */}
                    <div
                      style={{ width: `${(dept.placements / 90) * 100}%` }}
                      className="h-full bg-blue-900 rounded-sm flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                    >
                      {dept.placements}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chart View 2: 2024-25 by Dept */}
        {selectedChartTab === '2024_25' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-slate-700">Placements by Department (AY 2024–25)</span>
              <span className="font-bold text-blue-900">Total: 219 Placements</span>
            </div>

            <div className="space-y-3 pt-2">
              {placementData.departmentWise2024_25.map((dept, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>{dept.department}</span>
                    <span>
                      {dept.placements} Placed • Max: {dept.maxPackage}
                    </span>
                  </div>
                  <div className="h-6 w-full bg-slate-100 rounded-lg overflow-hidden p-0.5">
                    <div
                      style={{ width: `${(dept.placements / 70) * 100}%` }}
                      className="h-full bg-emerald-600 rounded-sm flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                    >
                      {dept.placements}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chart View 3: Overall Multi-Year Trends */}
        {selectedChartTab === 'overall' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-slate-700">Academic Year Comparison (2022 to 2026)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {placementData.overallPlacementStats.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1"
                >
                  <div className="text-xs font-bold text-slate-500">AY {item.academicYear}</div>
                  <div className="text-3xl font-black text-blue-900">{item.placements}</div>
                  <div className="text-[10px] text-slate-400">Total Placed</div>
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Maximum Package Highlight Cards */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Maximum Package Secured by Branch</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {maxPackages2024_25.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1 hover:border-amber-400 transition-colors"
            >
              <div className="text-xs font-bold text-slate-700">{pkg.dept}</div>
              <div className="text-base font-black text-emerald-700">{pkg.max}</div>
              <div className="text-[10px] text-slate-400">AY 2024–25 Max</div>
            </div>
          ))}
        </div>
      </div>

      {/* 10.1 Overall Placements Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              Table 10.1
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              Overall Placements
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3 px-4 sm:px-6">Academic Year</th>
                <th className="py-3 px-4 sm:px-6 text-right">Number of Placements</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {placementData.overallPlacementStats.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">{item.academicYear}</td>
                  <td className="py-3 px-4 sm:px-6 text-right font-black text-blue-900 text-base">
                    {item.placements}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Required footnote note */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <span>
            *The 2025–26 figure is supplied data and should be verified before being treated as a final annual result.
          </span>
        </div>
      </div>

      {/* 10.2 Department-Wise Placement Summary — 2024–25 */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              Table 10.2
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              Department-Wise Placement Summary — 2024–25
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3 px-4 sm:px-6">Department</th>
                <th className="py-3 px-4 text-center">Placements</th>
                <th className="py-3 px-4 sm:px-6 text-right">Maximum Package</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {placementData.departmentWise2024_25.map((dept, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">{dept.department}</td>
                  <td className="py-3 px-4 text-center font-bold text-blue-900">{dept.placements}</td>
                  <td className="py-3 px-4 sm:px-6 text-right font-black text-emerald-700">
                    {dept.maxPackage}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50/80 font-bold text-slate-900 border-t-2 border-slate-300">
                <td className="py-3.5 px-4 sm:px-6">Total</td>
                <td className="py-3.5 px-4 text-center text-blue-950 font-black">
                  {placementData.total2024_25.placements}
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-right text-slate-500 font-normal">
                  {placementData.total2024_25.maxPackage}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 10.3 Department-Wise Placement and Offers Summary — 2025–26 */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              Table 10.3
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              Department-Wise Placement and Offers Summary — 2025–26
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3 px-4 sm:px-6">Department</th>
                <th className="py-3 px-4 text-center">Offers</th>
                <th className="py-3 px-4 text-center">Placements</th>
                <th className="py-3 px-4 sm:px-6 text-right">Maximum Package</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {placementData.departmentWise2025_26.map((dept, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">{dept.department}</td>
                  <td className="py-3 px-4 text-center font-bold text-indigo-700">{dept.offers}</td>
                  <td className="py-3 px-4 text-center font-bold text-blue-900">{dept.placements}</td>
                  <td className="py-3 px-4 sm:px-6 text-right font-black text-emerald-700">
                    {dept.maxPackage}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50/80 font-bold text-slate-900 border-t-2 border-slate-300">
                <td className="py-3.5 px-4 sm:px-6">Total</td>
                <td className="py-3.5 px-4 text-center text-indigo-950 font-black">
                  {placementData.total2025_26.totalOffers}
                </td>
                <td className="py-3.5 px-4 text-center text-blue-950 font-black">
                  {placementData.total2025_26.totalPlacements}
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-right text-slate-500 font-normal">
                  {placementData.total2025_26.maxPackage}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
