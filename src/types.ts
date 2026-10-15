export type NavSection =
  | 'home'
  | 'about'
  | 'achievements'
  | 'departments'
  | 'faculty'
  | 'syllabus'
  | 'timetable'
  | 'exam_cell'
  | 'placement'
  | 'placement_stats'
  | 'placement_records'
  | 'laboratories'
  | 'college_info'
  | 'contact'
  | 'chatbot';

export interface CollegeOverview {
  name: string;
  shortName: string;
  subtitle: string;
  campus: string;
  address: string;
  phone: string[];
  email: string;
  workingHours: string;
  established: number;
  establishedBranches: string[];
  subsequentAdditions: { program: string; year: number }[];
  approvals: string;
  affiliationNotice: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  programs: string[];
  verifiedStatus: string;
}

export interface DepartmentHead {
  id: string;
  department: string;
  name: string;
  designation: string;
  qualification?: string;
  areasOfInterest?: string;
  email: string;
  additionalEmail?: string;
  phone: string;
  description?: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  areasOfInterest: string;
  email: string;
  departmentContact?: string;
  phone?: string;
}

export interface ExaminationCellInfo {
  controllerOfExamination: string;
  designation: string;
  email: string;
  strictGuidelines: string;
  noticeCategories: {
    title: string;
    description: string;
  }[];
}

export interface BTechSyllabusRow {
  branch: string;
  firstYearDoc?: string;
  secondYearDoc?: string;
}

export interface MTechSyllabusRow {
  branch: string;
  fyOldDoc?: string;
  fyRevisedDoc?: string;
  syDoc?: string;
}

export interface MBASyllabusRow {
  program: string;
  fyDoc?: string;
  syDoc?: string;
}

export interface SyllabusData {
  academicYearRange: string;
  undergraduateBranches: string[];
  levelsCovered: string;
  bTechRows: BTechSyllabusRow[];
  secondYearCommonCourses: {
    name: string;
    description: string;
    docUrl?: string;
  }[];
  mTechRows: MTechSyllabusRow[];
  mbaRows: MBASyllabusRow[];
}

export interface TimetableRow {
  srNo: number;
  program: string;
  className: string;
  mseDoc?: string;
  seeDoc?: string;
}

export interface HistoricalTimetableRecord {
  session: string;
  nature: string;
  details: string;
  docUrl?: string;
}

export interface TimetableAndExamCalendar {
  notice: string;
  calendarFramework: string;
  academicYear: string;
  semester: string;
  calendarDocUrl?: string;
  ugPgRows: TimetableRow[];
  seeMay2025: string[];
  seeDec2024Jan2025: string[];
  examReExamSchedules: string[];
  currentTimetableNotices: {
    title: string;
    date: string;
    docUrl?: string;
  }[];
}

export interface PlacementStatsYear {
  academicYear: string;
  placements: number;
  status: string;
}

export interface DeptPlacement2024_25 {
  department: string;
  placements: number;
  maxPackage: string;
}

export interface DeptPlacement2025_26 {
  department: string;
  offers: number;
  placements: number;
  maxPackage: string;
}

export interface PlacementRecordDoc {
  srNo: number;
  academicYear: string;
  docUrl?: string;
}

export interface PlacementData {
  vision: string;
  mission: string[];
  inCharge: {
    name: string;
    designation: string;
    email: string;
    mobile: string;
  };
  team: { srNo: number; name: string; designation: string }[];
  recruiters: string[];
  recruiterDisclaimer: string;
  overallPlacementStats: PlacementStatsYear[];
  departmentWise2024_25: DeptPlacement2024_25[];
  total2024_25: { placements: number; maxPackage: string };
  departmentWise2025_26: DeptPlacement2025_26[];
  total2025_26: { totalOffers: number; totalPlacements: number; maxPackage: string };
  placementRecords: PlacementRecordDoc[];
}

export interface Laboratory {
  id: string;
  name: string;
  floor?: string;
  room?: string;
  building?: string;
  facility?: string;
  department: string;
}

export interface CollegeData {
  college: CollegeOverview;
  achievements: Achievement[];
  departmentHeads: DepartmentHead[];
  computerFaculty: FacultyMember[];
  examinationCell: ExaminationCellInfo;
  syllabus: SyllabusData;
  timetableAndExamCalendar: TimetableAndExamCalendar;
  placement: PlacementData;
  laboratories: Laboratory[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  language?: 'en' | 'mr';
  isError?: boolean;
}
