import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar.tsx';
import { TopHeader } from './components/TopHeader.tsx';
import { GlobalSearchModal } from './components/GlobalSearchModal.tsx';
import { FloatingChatWidget } from './components/FloatingChatWidget.tsx';
import { AdminModal } from './components/AdminModal.tsx';

// All 15 Section Components
import { HomeDashboard } from './components/HomeDashboard.tsx';
import { AboutCollegeSection } from './components/AboutCollegeSection.tsx';
import { AchievementsSection } from './components/AchievementsSection.tsx';
import { DepartmentsSection } from './components/DepartmentsSection.tsx';
import { FacultySection } from './components/FacultySection.tsx';
import { SyllabusSection } from './components/SyllabusSection.tsx';
import { TimetableSection } from './components/TimetableSection.tsx';
import { ExaminationCellSection } from './components/ExaminationCellSection.tsx';
import { PlacementCellSection } from './components/PlacementCellSection.tsx';
import { PlacementStatisticsSection } from './components/PlacementStatisticsSection.tsx';
import { PlacementRecordsSection } from './components/PlacementRecordsSection.tsx';
import { LaboratoriesSection } from './components/LaboratoriesSection.tsx';
import { CollegeInfoSection } from './components/CollegeInfoSection.tsx';
import { ContactUsSection } from './components/ContactUsSection.tsx';
import { ChatSection } from './components/ChatSection.tsx';

import { defaultCollegeData } from './data/defaultCollegeData.ts';
import { CollegeData, NavSection } from './types.ts';
import { ShieldCheck, Clock } from 'lucide-react';

export default function App() {
  const [collegeData, setCollegeData] = useState<CollegeData>(defaultCollegeData);
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [initialQuestion, setInitialQuestion] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Sync with backend on mount
  useEffect(() => {
    fetch('/api/college-data')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Failed to load server data');
      })
      .then((data) => {
        if (data && data.college && data.departmentHeads) {
          setCollegeData(data);
        }
      })
      .catch((err) => {
        console.warn('Using client baseline college data:', err);
      });
  }, []);

  // Keyboard shortcut '/' to trigger global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAskAIWithPrompt = (question: string) => {
    setInitialQuestion(question);
    setActiveSection('chatbot');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (section: NavSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateCollegeData = (newData: CollegeData) => {
    setCollegeData(newData);
    setIsAdminLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex font-sans selection:bg-blue-200 selection:text-blue-900">
      {/* 1. Left Sidebar Navigation Menu (Fixed on desktop, drawer on mobile) */}
      <Sidebar
        activeSection={activeSection}
        onSelectSection={handleNavigateSection}
        isOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Content Area (Offset for lg:ml-72) */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <TopHeader
          college={collegeData.college}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenChat={() => handleNavigateSection('chatbot')}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
          isAdminLoggedIn={isAdminLoggedIn}
        />

        {/* Dynamic Section Rendering */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeSection === 'home' && (
            <HomeDashboard
              collegeData={collegeData}
              onNavigate={handleNavigateSection}
              onOpenSearch={() => setIsSearchOpen(true)}
            />
          )}

          {activeSection === 'about' && (
            <AboutCollegeSection
              college={collegeData.college}
              onNavigate={handleNavigateSection}
            />
          )}

          {activeSection === 'achievements' && (
            <AchievementsSection
              achievements={collegeData.achievements}
              onOpenAdmin={() => setIsAdminModalOpen(true)}
              onNavigate={handleNavigateSection}
              onAskAI={handleAskAIWithPrompt}
            />
          )}

          {activeSection === 'departments' && (
            <DepartmentsSection
              departmentHeads={collegeData.departmentHeads}
              onAskAI={handleAskAIWithPrompt}
              onNavigate={handleNavigateSection}
            />
          )}

          {activeSection === 'faculty' && (
            <FacultySection
              facultyList={collegeData.computerFaculty}
              onAskAI={handleAskAIWithPrompt}
              onNavigate={handleNavigateSection}
            />
          )}

          {activeSection === 'syllabus' && (
            <SyllabusSection
              syllabus={collegeData.syllabus}
              onAskAI={handleAskAIWithPrompt}
              onNavigate={handleNavigateSection}
            />
          )}

          {activeSection === 'timetable' && (
            <TimetableSection
              timetableData={collegeData.timetableAndExamCalendar}
              onAskAI={handleAskAIWithPrompt}
              onNavigate={handleNavigateSection}
            />
          )}

          {activeSection === 'exam_cell' && (
            <ExaminationCellSection
              examinationCell={collegeData.examinationCell}
              onAskAI={handleAskAIWithPrompt}
              onNavigate={handleNavigateSection}
            />
          )}

          {activeSection === 'placement' && (
            <PlacementCellSection
              placementData={collegeData.placement}
              onAskAI={handleAskAIWithPrompt}
              onNavigate={handleNavigateSection}
            />
          )}

          {activeSection === 'placement_stats' && (
            <PlacementStatisticsSection
              placementData={collegeData.placement}
              onAskAI={handleAskAIWithPrompt}
              onNavigate={handleNavigateSection}
            />
          )}

          {activeSection === 'placement_records' && (
            <PlacementRecordsSection
              placementData={collegeData.placement}
              onAskAI={handleAskAIWithPrompt}
              onNavigate={handleNavigateSection}
            />
          )}

          {activeSection === 'laboratories' && (
            <LaboratoriesSection
              laboratories={collegeData.laboratories}
              onAskAI={handleAskAIWithPrompt}
              onNavigate={handleNavigateSection}
            />
          )}

          {activeSection === 'college_info' && (
            <CollegeInfoSection
              college={collegeData.college}
              departmentHeads={collegeData.departmentHeads}
              onAskAI={handleAskAIWithPrompt}
              onNavigate={handleNavigateSection}
            />
          )}

          {activeSection === 'contact' && (
            <ContactUsSection
              college={collegeData.college}
              onAskAI={handleAskAIWithPrompt}
              onNavigate={handleNavigateSection}
            />
          )}

          {activeSection === 'chatbot' && (
            <ChatSection
              collegeData={collegeData}
              onNavigateTab={(tab) => {
                const sectionMap: Record<string, NavSection> = {
                  departments: 'departments',
                  laboratories: 'laboratories',
                  syllabus: 'syllabus',
                };
                handleNavigateSection(sectionMap[tab] || 'home');
              }}
              initialQuestion={initialQuestion}
              onClearInitialQuestion={() => setInitialQuestion('')}
            />
          )}
        </main>

        {/* Global Footer */}
        <footer className="bg-blue-950 text-blue-200 border-t border-blue-900/60 pt-8 pb-8 text-xs mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-blue-900/60">
              <div className="space-y-1.5">
                <div className="font-extrabold text-white text-sm">
                  {collegeData.college.name}
                </div>
                <p className="text-blue-300/80 leading-relaxed text-xs">
                  {collegeData.college.campus}, {collegeData.college.address}. Approved by AICTE, New Delhi & Govt. of Maharashtra.
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-amber-300 text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>NBA Accredited (Civil, E&TC, MBA - 2025)</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-blue-300">
                <div className="font-bold text-white">Office Hours</div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{collegeData.college.workingHours}</span>
                </div>
                <div>Principal: {collegeData.college.email}</div>
                <div>T&P Cell: {collegeData.placement.inCharge.email}</div>
              </div>

              <div className="space-y-1.5 text-xs text-blue-300">
                <div className="font-bold text-white">Quick Navigation</div>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <button onClick={() => handleNavigateSection('departments')} className="hover:underline">Departments</button>
                  <span>•</span>
                  <button onClick={() => handleNavigateSection('faculty')} className="hover:underline">Faculty</button>
                  <span>•</span>
                  <button onClick={() => handleNavigateSection('syllabus')} className="hover:underline">Syllabus</button>
                  <span>•</span>
                  <button onClick={() => handleNavigateSection('placement_stats')} className="hover:underline">Placements</button>
                  <span>•</span>
                  <button onClick={() => handleNavigateSection('chatbot')} className="hover:underline text-emerald-400 font-bold">AI Bot</button>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-blue-400">
              <div>
                © {new Date().getFullYear()} SNJB's KBJ College of Engineering, Chandwad. All rights reserved.
              </div>
              <div>
                SNJB Department Enquiry Bot • Grounded Bilingual AI Assistant
              </div>
            </div>
          </div>
        </footer>

        {/* Floating Chat Widget (Visible across all 14 non-chatbot sections) */}
        <FloatingChatWidget
          onOpenFullChat={() => handleNavigateSection('chatbot')}
          onQuickAsk={handleAskAIWithPrompt}
          currentSection={activeSection}
        />

        {/* Global Search Modal */}
        <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          collegeData={collegeData}
          onNavigate={(sec) => handleNavigateSection(sec)}
        />

        {/* Protected Administrator Modal */}
        <AdminModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          collegeData={collegeData}
          onUpdateData={handleUpdateCollegeData}
        />
      </div>
    </div>
  );
}
