import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Building2, Users, BookOpen, FlaskConical, Briefcase, CalendarDays, ArrowRight } from 'lucide-react';
import { CollegeData, NavSection } from '../types.ts';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  collegeData: CollegeData;
  onNavigate: (section: NavSection, queryParam?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  collegeData,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Search Results
  const results: {
    section: NavSection;
    title: string;
    subtitle: string;
    category: string;
    icon: React.ReactNode;
  }[] = [];

  if (q.length > 0) {
    // 1. Departments
    collegeData.departmentHeads.forEach((d) => {
      if (
        d.department.toLowerCase().includes(q) ||
        d.name.toLowerCase().includes(q) ||
        (d.areasOfInterest && d.areasOfInterest.toLowerCase().includes(q)) ||
        d.email.toLowerCase().includes(q) ||
        d.phone.includes(q)
      ) {
        results.push({
          section: 'departments',
          title: d.department,
          subtitle: `HOD: ${d.name} • Email: ${d.email} • Ph: ${d.phone}`,
          category: 'Department',
          icon: <Building2 className="w-4 h-4 text-blue-600" />,
        });
      }
    });

    // 2. Faculty
    collegeData.computerFaculty.forEach((f) => {
      if (
        f.name.toLowerCase().includes(q) ||
        f.qualification.toLowerCase().includes(q) ||
        f.areasOfInterest.toLowerCase().includes(q) ||
        f.email.toLowerCase().includes(q)
      ) {
        results.push({
          section: 'faculty',
          title: f.name,
          subtitle: `${f.designation} • ${f.qualification} • ${f.areasOfInterest}`,
          category: 'Faculty',
          icon: <Users className="w-4 h-4 text-indigo-600" />,
        });
      }
    });

    // 3. Laboratories
    collegeData.laboratories.forEach((lab) => {
      if (
        lab.name.toLowerCase().includes(q) ||
        (lab.room && lab.room.toLowerCase().includes(q)) ||
        (lab.floor && lab.floor.toLowerCase().includes(q)) ||
        lab.department.toLowerCase().includes(q)
      ) {
        results.push({
          section: 'laboratories',
          title: lab.name,
          subtitle: `Room: ${lab.room || 'Not provided'} • Floor: ${lab.floor || 'Not provided'} • ${lab.department}`,
          category: 'Laboratory',
          icon: <FlaskConical className="w-4 h-4 text-purple-600" />,
        });
      }
    });

    // 4. Syllabus
    collegeData.syllabus.bTechRows.forEach((row) => {
      if (row.branch.toLowerCase().includes(q)) {
        results.push({
          section: 'syllabus',
          title: `${row.branch} Syllabus`,
          subtitle: 'B.Tech Curriculum for First Year & Second Year (AY 2024–28)',
          category: 'Syllabus',
          icon: <BookOpen className="w-4 h-4 text-emerald-600" />,
        });
      }
    });

    collegeData.syllabus.secondYearCommonCourses.forEach((c) => {
      if (c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) {
        results.push({
          section: 'syllabus',
          title: `SY Course: ${c.name}`,
          subtitle: c.description,
          category: 'Syllabus',
          icon: <BookOpen className="w-4 h-4 text-emerald-600" />,
        });
      }
    });

    // 5. Recruiters & Placements
    collegeData.placement.recruiters.forEach((rec) => {
      if (rec.toLowerCase().includes(q)) {
        results.push({
          section: 'placement',
          title: `Recruiter: ${rec}`,
          subtitle: 'Supplied visiting recruiter list at SNJB T&P Cell',
          category: 'Placements',
          icon: <Briefcase className="w-4 h-4 text-amber-600" />,
        });
      }
    });

    // 6. Examination Cell
    if (
      collegeData.examinationCell.controllerOfExamination.toLowerCase().includes(q) ||
      collegeData.examinationCell.email.toLowerCase().includes(q) ||
      'examination cell'.includes(q) ||
      'controller'.includes(q)
    ) {
      results.push({
        section: 'exam_cell',
        title: `Controller of Examination: ${collegeData.examinationCell.controllerOfExamination}`,
        subtitle: `Email: ${collegeData.examinationCell.email} • Official Examination Cell`,
        category: 'Exam Cell',
        icon: <CalendarDays className="w-4 h-4 text-rose-600" />,
      });
    }

    // 7. General College
    if ('working hours'.includes(q) || 'timing'.includes(q) || 'phone'.includes(q) || 'address'.includes(q)) {
      results.push({
        section: 'college_info',
        title: 'College Working Hours & General Information',
        subtitle: `${collegeData.college.workingHours} • Ph: ${collegeData.college.phone.join(', ')}`,
        category: 'College Info',
        icon: <Building2 className="w-4 h-4 text-blue-700" />,
      });
    }
  }

  const handleSelectResult = (section: NavSection) => {
    onNavigate(section);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-6 pt-16 sm:pt-20">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across all 15 college sections (e.g. Sanghavi, 105 A, AI&DS, Placements)..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-800 focus:outline-hidden placeholder-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold"
          >
            Esc
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {q.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-300" />
              <p className="font-medium text-slate-500">
                Type any faculty name, department, lab number, or syllabus keyword.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                {['Computer', 'Dr. Sanghavi', 'Room 105 A', 'Controller of Exam', 'Infosys', 'MBA Syllabus'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-900 rounded-lg text-[11px] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs space-y-1">
              <p className="font-semibold text-slate-700">No exact matches found for "{query}".</p>
              <p className="text-slate-400">
                Try searching for department names, faculty members, room numbers, or ask our AI Enquiry Bot!
              </p>
              <button
                onClick={() => {
                  onNavigate('chatbot');
                  onClose();
                }}
                className="mt-3 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
              >
                <span>Ask AI Enquiry Bot Instead</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Found {results.length} Matching Records
              </div>
              {results.map((res, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectResult(res.section)}
                  className="w-full p-3 rounded-2xl hover:bg-blue-50/70 border border-transparent hover:border-blue-100 flex items-start justify-between gap-3 text-left transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {res.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-900">
                          {res.title}
                        </h4>
                        <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-slate-100 text-slate-600">
                          {res.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {res.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 flex-shrink-0 mt-1" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
