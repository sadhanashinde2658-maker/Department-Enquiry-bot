import React from 'react';
import { Building, Calendar, ShieldCheck, AlertCircle, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { CollegeOverview, NavSection } from '../types.ts';

interface AboutCollegeSectionProps {
  college: CollegeOverview;
  onNavigate: (section: NavSection) => void;
}

export const AboutCollegeSection: React.FC<AboutCollegeSectionProps> = ({
  college,
  onNavigate,
}) => {
  const branches = [
    {
      title: 'Computer Engineering',
      desc: 'Established in 2004. Focuses on computation, software engineering, intelligent systems, and networks.',
      nav: 'departments' as NavSection,
    },
    {
      title: 'Artificial Intelligence and Data Science',
      desc: 'Introduced in 2020. Cutting-edge specialization in machine learning, deep learning, big data, and analytics.',
      nav: 'departments' as NavSection,
    },
    {
      title: 'Civil Engineering',
      desc: 'Established in 2004. Advanced infrastructure design, structural analysis, environmental engg, and surveying.',
      nav: 'departments' as NavSection,
    },
    {
      title: 'Electronics and Telecommunications Engineering',
      desc: 'Established in 2004. VLSI design, signal processing, IoT integration, embedded systems, and communication.',
      nav: 'departments' as NavSection,
    },
    {
      title: 'Mechanical Engineering',
      desc: 'Established in 2004. Thermal sciences, CAD/CAM automation, manufacturing technology, and robotics.',
      nav: 'departments' as NavSection,
    },
    {
      title: 'MBA',
      desc: 'Introduced in 2010. Postgraduate management education in marketing, finance, HR, and business operations.',
      nav: 'departments' as NavSection,
    },
    {
      title: 'First Year Engineering',
      desc: 'Foundational engineering science, mathematics, basic electrical, electronics, mechanics, and chemistry.',
      nav: 'departments' as NavSection,
    },
  ];

  const timeline = [
    {
      year: '2004',
      title: 'Establishment of the Engineering College',
      desc: 'Commenced operations with four core engineering branches: Mechanical, Computer, Electronics and Telecommunications, and Civil Engineering.',
    },
    {
      year: '2010',
      title: 'Introduction of the MBA Program',
      desc: 'Expanded postgraduate education with the Master of Business Administration to nurture managerial leaders.',
    },
    {
      year: '2020',
      title: 'Introduction of Artificial Intelligence and Data Science',
      desc: 'Inaugurated B.Tech in AI & Data Science to meet rapid technological evolutions in data-driven computing.',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Heading */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold mb-2">
          <Building className="w-3.5 h-3.5 text-amber-300" />
          <span>Section 2 • Institutional Profile</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">About SNJB</h2>
        <p className="text-blue-200 text-sm sm:text-base max-w-3xl mt-1 leading-relaxed">
          {college.name} • Jain Gurukul Campus, Chandwad
        </p>
      </div>

      {/* Main Supplied Overview Text */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Institutional Background & History</h3>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Jain Gurukul campus has various faculties, including SNJB's Late Sau. Kantabai Bhavarlalji Jain College of Engineering.
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          The college was established in <strong>2004</strong> with four engineering branches:
        </p>

        <ol className="list-decimal list-inside space-y-1 text-sm font-semibold text-slate-800 pl-2">
          <li>Mechanical Engineering</li>
          <li>Computer Engineering</li>
          <li>Electronics and Telecommunications Engineering</li>
          <li>Civil Engineering</li>
        </ol>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          The MBA program was introduced in <strong>2010</strong>, and a new branch of <strong>Artificial Intelligence and Data Science</strong> was established in <strong>2020</strong>.
        </p>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          The institution is approved by the <strong>All India Council for Technical Education (AICTE), New Delhi</strong>, and the <strong>Government of Maharashtra</strong>. The supplied institutional information also mentions affiliation with the <strong>University of Pune</strong>.
        </p>

        {/* Configurable Affiliation & Autonomous Status Notice */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3 mt-4">
          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">Verified Accreditation & Affiliation Policy:</span>
            <span>
              {college.affiliationNotice}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline Component */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-700" />
          <span>Historical Growth Timeline</span>
        </h3>

        <div className="relative border-l-2 border-blue-200 ml-4 pl-6 space-y-6">
          {timeline.map((item, index) => (
            <div key={index} className="relative">
              <span className="absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-blue-700 ring-4 ring-blue-100" />
              <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Year {item.year}
              </div>
              <h4 className="text-base font-bold text-slate-900 mt-0.5">{item.title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7 Individual Branch Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Academic Engineering & Management Branches (7 Wings)
          </h3>
          <button
            onClick={() => onNavigate('departments')}
            className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
          >
            <span>View All Department HODs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {branches.map((b, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  Branch #{idx + 1}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-2">{b.title}</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{b.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('departments')}
                  className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>Department Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigate('syllabus')}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Syllabus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
