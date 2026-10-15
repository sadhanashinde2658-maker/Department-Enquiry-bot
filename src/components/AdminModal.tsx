import React, { useState } from 'react';
import {
  X,
  Lock,
  CheckCircle,
  AlertCircle,
  Save,
  Plus,
  Trash2,
  KeyRound,
  Building2,
  Users,
  Briefcase,
  FlaskConical,
  Award,
  BookOpen,
  CalendarDays,
  FileSpreadsheet,
} from 'lucide-react';
import { CollegeData } from '../types.ts';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  collegeData: CollegeData;
  onUpdateData: (newData: CollegeData) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  collegeData,
  onUpdateData,
}) => {
  const [passkey, setPasskey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'depts' | 'faculty' | 'syllabus' | 'timetables' | 'placements' | 'placement_records' | 'labs' | 'achievements' | 'college'
  >('depts');

  const [formData, setFormData] = useState<CollegeData>(() => JSON.parse(JSON.stringify(collegeData)));
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setIsAuthenticated(true);
        setFormData(JSON.parse(JSON.stringify(collegeData)));
      } else {
        setAuthError(json.message || 'Invalid passkey. Default is: snjb@admin2025');
      }
    } catch (err: any) {
      setAuthError('Error verifying passkey. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/admin/update-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': passkey,
        },
        body: JSON.stringify({ data: formData }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        onUpdateData(formData);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert(json.message || 'Failed to update college data');
      }
    } catch (err) {
      alert('Network error while saving data');
    } finally {
      setIsSaving(false);
    }
  };

  // Helper updates
  const updateHOD = (index: number, field: string, val: string) => {
    const updated = [...formData.departmentHeads];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, departmentHeads: updated });
  };

  const updateFaculty = (index: number, field: string, val: string) => {
    const updated = [...formData.computerFaculty];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, computerFaculty: updated });
  };

  const addFaculty = () => {
    const newFac = {
      id: 'comp-fac-' + Date.now(),
      name: 'New Faculty Member',
      designation: 'Assistant Professor',
      qualification: 'BE, ME (CSE)',
      areasOfInterest: 'Computer Engineering & Technology',
      email: 'faculty@snjb.org',
    };
    setFormData({ ...formData, computerFaculty: [...formData.computerFaculty, newFac] });
  };

  const removeFaculty = (id: string) => {
    setFormData({
      ...formData,
      computerFaculty: formData.computerFaculty.filter((f) => f.id !== id),
    });
  };

  const updateLab = (index: number, field: string, val: string) => {
    const updated = [...formData.laboratories];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, laboratories: updated });
  };

  const addAchievement = () => {
    const newAch = {
      id: 'ach-' + Date.now(),
      title: 'New Institutional Award',
      description: 'Award description and issuing authority.',
      year: new Date().getFullYear().toString(),
      programs: ['All Departments'],
      verifiedStatus: 'Verified Award',
    };
    setFormData({ ...formData, achievements: [...formData.achievements, newAch] });
  };

  const removeAchievement = (id: string) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((a) => a.id !== id),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 to-indigo-950 text-white flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">Administrator Data Management Portal</h3>
              <p className="text-xs text-blue-300">Authorized personnel access to update college database & chatbot grounding</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-900 mx-auto flex items-center justify-center border border-blue-200 shadow-inner">
              <KeyRound className="w-8 h-8 text-blue-700" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900">Enter Admin Passkey</h4>
              <p className="text-xs text-slate-500 mt-1">
                Security protection for SNJB college directory and syllabus modification.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter passkey (e.g. snjb@admin2025)"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white text-center font-mono"
              />

              {authError && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 flex items-center gap-1.5 justify-center">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || !passkey}
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-sm font-bold transition-all shadow-md disabled:opacity-50"
              >
                {isVerifying ? 'Verifying Credentials...' : 'Unlock Admin Portal'}
              </button>

              <div className="text-[11px] text-slate-400">
                Default authorization passkey: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">snjb@admin2025</code>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tab switch bar */}
            <div className="flex items-center gap-1.5 p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('depts')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'depts' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Department HODs</span>
              </button>

              <button
                onClick={() => setActiveTab('faculty')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'faculty' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Faculty</span>
              </button>

              <button
                onClick={() => setActiveTab('syllabus')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'syllabus' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Syllabus Docs</span>
              </button>

              <button
                onClick={() => setActiveTab('timetables')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'timetables' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Timetables & Notices</span>
              </button>

              <button
                onClick={() => setActiveTab('placements')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'placements' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Placements & Recruiters</span>
              </button>

              <button
                onClick={() => setActiveTab('placement_records')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'placement_records' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Placement PDFs</span>
              </button>

              <button
                onClick={() => setActiveTab('labs')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'labs' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Laboratories</span>
              </button>

              <button
                onClick={() => setActiveTab('achievements')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'achievements' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Achievements</span>
              </button>

              <button
                onClick={() => setActiveTab('college')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                  activeTab === 'college' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                College Contacts & Hours
              </button>
            </div>

            {/* Tab Editor Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
              {/* Tab 1: Department Heads */}
              {activeTab === 'depts' && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-500">
                    Modify names, qualifications, email addresses, and contact numbers of Department Heads.
                  </div>
                  {formData.departmentHeads.map((dept, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                      <div className="font-bold text-blue-900 text-sm flex items-center justify-between">
                        <span>{dept.department}</span>
                        <span className="text-xs text-slate-400">Section 4.{idx + 1}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">HOD Name</label>
                          <input
                            type="text"
                            value={dept.name}
                            onChange={(e) => updateHOD(idx, 'name', e.target.value)}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">Designation</label>
                          <input
                            type="text"
                            value={dept.designation}
                            onChange={(e) => updateHOD(idx, 'designation', e.target.value)}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">Email</label>
                          <input
                            type="email"
                            value={dept.email}
                            onChange={(e) => updateHOD(idx, 'email', e.target.value)}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">Phone</label>
                          <input
                            type="text"
                            value={dept.phone}
                            onChange={(e) => updateHOD(idx, 'phone', e.target.value)}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-slate-600 font-semibold mb-1">Areas of Interest</label>
                          <input
                            type="text"
                            value={dept.areasOfInterest || ''}
                            onChange={(e) => updateHOD(idx, 'areasOfInterest', e.target.value)}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Computer Faculty */}
              {activeTab === 'faculty' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Manage faculty members for Computer Engineering.</span>
                    <button
                      onClick={addFaculty}
                      className="px-3 py-1.5 bg-blue-900 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Faculty</span>
                    </button>
                  </div>

                  {formData.computerFaculty.map((fac, idx) => (
                    <div key={fac.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3 relative">
                      <button
                        onClick={() => removeFaculty(fac.id)}
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1"
                        title="Delete Faculty Member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pr-6">
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">Faculty Name</label>
                          <input
                            type="text"
                            value={fac.name}
                            onChange={(e) => updateFaculty(idx, 'name', e.target.value)}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">Designation</label>
                          <input
                            type="text"
                            value={fac.designation}
                            onChange={(e) => updateFaculty(idx, 'designation', e.target.value)}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">Qualification</label>
                          <input
                            type="text"
                            value={fac.qualification}
                            onChange={(e) => updateFaculty(idx, 'qualification', e.target.value)}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">Email</label>
                          <input
                            type="email"
                            value={fac.email}
                            onChange={(e) => updateFaculty(idx, 'email', e.target.value)}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-slate-600 font-semibold mb-1">Areas of Interest</label>
                          <input
                            type="text"
                            value={fac.areasOfInterest}
                            onChange={(e) => updateFaculty(idx, 'areasOfInterest', e.target.value)}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Syllabus Documents */}
              {activeTab === 'syllabus' && (
                <div className="space-y-4 text-xs">
                  <div className="text-slate-500">
                    Attach verified URLs or filenames for B.Tech First Year & Second Year branches.
                  </div>
                  {formData.syllabus.bTechRows.map((row, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <div className="font-bold text-slate-900">{row.branch}</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-600 font-medium mb-1">First Year B.Tech Doc URL</label>
                          <input
                            type="text"
                            value={row.firstYearDoc || ''}
                            placeholder="e.g. https://snjb.org/syllabus/fe.pdf"
                            onChange={(e) => {
                              const updated = [...formData.syllabus.bTechRows];
                              updated[idx].firstYearDoc = e.target.value;
                              setFormData({ ...formData, syllabus: { ...formData.syllabus, bTechRows: updated } });
                            }}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 font-medium mb-1">Second Year B.Tech Doc URL</label>
                          <input
                            type="text"
                            value={row.secondYearDoc || ''}
                            placeholder="e.g. https://snjb.org/syllabus/se.pdf"
                            onChange={(e) => {
                              const updated = [...formData.syllabus.bTechRows];
                              updated[idx].secondYearDoc = e.target.value;
                              setFormData({ ...formData, syllabus: { ...formData.syllabus, bTechRows: updated } });
                            }}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 4: Timetables & Examination Notices */}
              {activeTab === 'timetables' && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <h5 className="font-bold text-slate-900 text-sm">Active Examination Calendar URL</h5>
                    <input
                      type="text"
                      value={formData.timetableAndExamCalendar.calendarDocUrl || ''}
                      placeholder="e.g. https://snjb.org/exam/calendar-sem1.pdf"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          timetableAndExamCalendar: {
                            ...formData.timetableAndExamCalendar,
                            calendarDocUrl: e.target.value,
                          },
                        })
                      }
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-slate-900 text-sm">UG/PG MSE & SEE Timetable Links</h5>
                    {formData.timetableAndExamCalendar.ugPgRows.map((row, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="font-bold text-slate-800">{row.program} ({row.className})</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="MSE Timetable URL"
                            value={row.mseDoc || ''}
                            onChange={(e) => {
                              const updated = [...formData.timetableAndExamCalendar.ugPgRows];
                              updated[idx].mseDoc = e.target.value;
                              setFormData({
                                ...formData,
                                timetableAndExamCalendar: {
                                  ...formData.timetableAndExamCalendar,
                                  ugPgRows: updated,
                                },
                              });
                            }}
                            className="w-full p-1.5 bg-white border border-slate-300 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="SEE Timetable URL"
                            value={row.seeDoc || ''}
                            onChange={(e) => {
                              const updated = [...formData.timetableAndExamCalendar.ugPgRows];
                              updated[idx].seeDoc = e.target.value;
                              setFormData({
                                ...formData,
                                timetableAndExamCalendar: {
                                  ...formData.timetableAndExamCalendar,
                                  ugPgRows: updated,
                                },
                              });
                            }}
                            className="w-full p-1.5 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: Placements */}
              {activeTab === 'placements' && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <h5 className="font-bold text-slate-900 text-sm">Placement Officer Contact Details</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">In-Charge Name</label>
                        <input
                          type="text"
                          value={formData.placement.inCharge.name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              placement: {
                                ...formData.placement,
                                inCharge: { ...formData.placement.inCharge, name: e.target.value },
                              },
                            })
                          }
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Mobile</label>
                        <input
                          type="text"
                          value={formData.placement.inCharge.mobile}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              placement: {
                                ...formData.placement,
                                inCharge: { ...formData.placement.inCharge, mobile: e.target.value },
                              },
                            })
                          }
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-slate-600 font-semibold mb-1">TPO Email</label>
                        <input
                          type="email"
                          value={formData.placement.inCharge.email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              placement: {
                                ...formData.placement,
                                inCharge: { ...formData.placement.inCharge, email: e.target.value },
                              },
                            })
                          }
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Recruiter list editor */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <h5 className="font-bold text-slate-900 text-sm">Recruiters List (Comma Separated)</h5>
                    <textarea
                      rows={4}
                      value={formData.placement.recruiters.join(', ')}
                      onChange={(e) => {
                        const arr = e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean);
                        setFormData({
                          ...formData,
                          placement: { ...formData.placement, recruiters: arr },
                        });
                      }}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* Tab 6: Placement Record PDFs */}
              {activeTab === 'placement_records' && (
                <div className="space-y-3 text-xs">
                  <div className="text-slate-500">Attach official verified placement PDF documents for each academic year.</div>
                  {formData.placement.placementRecords.map((rec, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                      <div className="font-bold text-slate-900 w-32">AY {rec.academicYear}</div>
                      <input
                        type="text"
                        placeholder="Attach official PDF URL (e.g. https://snjb.org/placement/record.pdf)"
                        value={rec.docUrl || ''}
                        onChange={(e) => {
                          const updated = [...formData.placement.placementRecords];
                          updated[idx].docUrl = e.target.value;
                          setFormData({
                            ...formData,
                            placement: { ...formData.placement, placementRecords: updated },
                          });
                        }}
                        className="flex-1 p-2 bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 7: Labs */}
              {activeTab === 'labs' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-500">Update verified room numbers and floor locations.</div>
                  {formData.laboratories.map((lab, idx) => (
                    <div key={lab.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                      <div className="font-bold text-slate-900">{lab.name}</div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="block text-slate-500 font-medium mb-0.5">Floor</label>
                          <input
                            type="text"
                            value={lab.floor || ''}
                            onChange={(e) => updateLab(idx, 'floor', e.target.value)}
                            className="w-full p-1.5 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-500 font-medium mb-0.5">Room</label>
                          <input
                            type="text"
                            value={lab.room || ''}
                            onChange={(e) => updateLab(idx, 'room', e.target.value)}
                            className="w-full p-1.5 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-500 font-medium mb-0.5">Building</label>
                          <input
                            type="text"
                            value={lab.building || ''}
                            onChange={(e) => updateLab(idx, 'building', e.target.value)}
                            className="w-full p-1.5 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 8: Achievements */}
              {activeTab === 'achievements' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Add or edit verified awards and accreditations.</span>
                    <button
                      onClick={addAchievement}
                      className="px-3 py-1.5 bg-blue-900 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Achievement</span>
                    </button>
                  </div>

                  {formData.achievements.map((ach, idx) => (
                    <div key={ach.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-3 relative">
                      <button
                        onClick={() => removeAchievement(ach.id)}
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1"
                        title="Delete Milestone"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-6">
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">Title</label>
                          <input
                            type="text"
                            value={ach.title}
                            onChange={(e) => {
                              const updated = [...formData.achievements];
                              updated[idx].title = e.target.value;
                              setFormData({ ...formData, achievements: updated });
                            }}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">Year / Period</label>
                          <input
                            type="text"
                            value={ach.year}
                            onChange={(e) => {
                              const updated = [...formData.achievements];
                              updated[idx].year = e.target.value;
                              setFormData({ ...formData, achievements: updated });
                            }}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-slate-600 font-semibold mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={ach.description}
                            onChange={(e) => {
                              const updated = [...formData.achievements];
                              updated[idx].description = e.target.value;
                              setFormData({ ...formData, achievements: updated });
                            }}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 9: College Info */}
              {activeTab === 'college' && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <h5 className="font-bold text-slate-900 text-sm">General College Profile</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Official Name</label>
                        <input
                          type="text"
                          value={formData.college.name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              college: { ...formData.college, name: e.target.value },
                            })
                          }
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Campus Address</label>
                        <input
                          type="text"
                          value={formData.college.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              college: { ...formData.college, address: e.target.value },
                            })
                          }
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">Working Hours</label>
                          <input
                            type="text"
                            value={formData.college.workingHours}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                college: { ...formData.college, workingHours: e.target.value },
                              })
                            }
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">Principal Office Email</label>
                          <input
                            type="email"
                            value={formData.college.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                college: { ...formData.college, email: e.target.value },
                              })
                            }
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer with Save Button */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
              <div>
                {saveSuccess && (
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>College database updated & persisted to server!</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleSaveAll}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving Changes...' : 'Save & Update Knowledge Base'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
