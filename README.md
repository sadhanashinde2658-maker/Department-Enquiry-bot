# SNJB Department Enquiry Bot 🎓🤖
> **"Your Smart AI Assistant for SNJB College of Engineering, Chandwad"**

An intelligent, bilingual (English & मराठी), AI-powered enquiry assistant and academic explorer for **SNJB's Late Sau. Kantabai Bhavarlalji Jain College of Engineering**, Jain Gurukul Campus, Neminagar, Chandwad, District Nashik, Maharashtra, India.

---

## 🌟 Key Features

1. **Grounded AI Chatbot (Gemini 3.8 Flash)**
   - Answers questions strictly using verified college repository records.
   - **Automatic Language Detection**: Detects and responds in English or natural Marathi (मराठी).
   - Voice dictation (Speech-to-Text) and audio read-aloud (Text-to-Speech) capabilities.
   - Suggested question chips, clear chat, markdown formatting, and copy responses.

2. **Verified Academic Leadership Directory**
   - Head of Departments (HODs) for:
     - Computer Engineering (Dr. K. M. Sanghavi)
     - Artificial Intelligence and Data Science (Dr. R. R. Bhandari)
     - Civil Engineering (Dr. K. L. Bidkar)
     - Electronics and Telecommunications Engineering (Dr. R. K. Agrawal)
     - First Year Engineering / Applied Science (Dr. R. J. Nayak)
     - Mechanical Engineering (Dr. S. D. Sancheti)
     - MBA Department (Dr. A. R. Murgai)

3. **Computer Engineering Faculty Directory**
   - Detailed profiles with designations, academic qualifications, and research areas of interest for professors and faculty members.

4. **Curriculum & Syllabus Explorer (AY 2024–28)**
   - Covers B.Tech First Year & Second Year branches (AI&DS, Civil, Comp, E&TC, Mech) and PG programs (Computer, Mech, MBA).
   - Highlights 2nd Year B.Tech curriculum buckets: Open Electives, Multidisciplinary Minors, Double Minors, Honors, and Modern Languages.

5. **Examination Cell & Official Timetables**
   - Controller of Examination: Dr. Rajendra Chunilal Patil (`deanexamcoe@snjb.org`).
   - Strict anti-hallucination policy (never invents dates, hall tickets, or marks).
   - Historical timetable archives clearly labeled as non-current.

6. **Training and Placement (T&P) Cell**
   - In-charge: Prof. H. S. Deore (`tpocoe@snjb.org`, `9420363431`).
   - Overall placement statistics (2022-23 to 2025-26).
   - Department-wise breakdown with maximum packages (e.g., Computer Engineering ₹11.50 LPA).
   - 34+ visiting recruiter companies database.

7. **Campus Laboratories Locator (12 Labs)**
   - Exact room numbers and floor designations for all 12 college laboratories and workshop buildings.

8. **Accreditations & Institutional Honors**
   - Highlights NBA accreditation awarded in 2025 for Civil, E&TC, and MBA programs.

9. **Administrator Management Portal**
   - Protected with an administrative passkey (`snjb@admin2025`).
   - Real-time updates to department heads, faculty, labs, placement stats, and achievements, persisted to `server/data/collegeData.json`.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Node.js & Express (`server.ts`) with Vite Middleware
- **AI Engine**: Google Gemini API via `@google/genai` TypeScript SDK (`gemini-3.8-flash`)
- **Persistence**: Server-side JSON storage (`server/data/collegeData.json`)

---

## 🚀 Setup & Execution

### 1. Environment Configuration

Create a `.env` file in the project root based on `.env.example`:

```bash
# Required for Gemini AI API calls
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Optional: Custom admin passkey (defaults to snjb@admin2025)
ADMIN_PASSKEY="snjb@admin2025"

# Port (defaults to 3000)
PORT=3000
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### 4. Running Locally on Windows (PowerShell / Command Prompt)

To run easily on Windows:
```powershell
# In PowerShell:
$env:GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
npm install
npm run dev
```

Or using standard Command Prompt (cmd.exe):
```cmd
set GEMINI_API_KEY=YOUR_GEMINI_API_KEY
npm install
npm run dev
```

The web application and API will be live at `http://localhost:3000`.

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 📑 15 Distinct Functional Sections
1. **Home Dashboard**: Welcome message, 6 key institutional cards, and quick shortcuts.
2. **About College**: Establishment in 2004, growth timeline, approved branches, and affiliation notice.
3. **Our Achievements**: NBA Accreditation 2025 for Civil, E&TC, and MBA, with expandable milestone repository.
4. **Departments**: Dedicated cards for all 7 academic departments (4.1 to 4.7) with HOD details, View Details modal, and direct AI question triggers.
5. **HOD & Faculty**: Searchable faculty table and cards for Computer Engineering faculty members.
6. **Syllabus**: B.Tech (2024–28), Common Second Year courses, M.Tech (Old/Revised/SY), and MBA options.
7. **Timetable**: Examination calendar AY 2025–26 Sem I, UG/PG MSE/SEE table, historical schedules, and verified current circulars.
8. **Examination Cell**: Controller of Examination Dr. Rajendra Chunilal Patil and official communication desk.
9. **Training & Placement**: Vision, mission, in-charge Prof. H. S. Deore, T&P team table, and 34 recruiters directory.
10. **Placement Statistics**: Interactive bar charts, tables 10.1, 10.2, 10.3, and max package cards.
11. **Placement Records**: Historical annual records (2017–18 through 2022–23).
12. **Laboratories**: Complete directory of all 12 labs with room numbers, floors, and workshop facilities.
13. **College Information**: General contact directory and HOD phone/email table.
14. **Contact Us**: Official campus addresses, office hours, and instant enquiry form.
15. **AI Department Enquiry Chatbot**: Grounded assistant with automatic language detection (English + मराठी).

---

## 💬 Sample Questions for Testing

### English Prompts
1. *Who is the HOD of Computer Engineering?*
2. *Who is the Controller of Examination and what is their email?*
3. *What is the college contact number and address?*
4. *Where is the Computer Science Laboratory located?*
5. *How can I contact the Training and Placement Cell?*
6. *What was the maximum placement package for Computer Engineering in 2024–25?*
7. *What branches are available at SNJB College?*
8. *What are the college working hours?*
9. *What is the NBA accreditation status of the college?*

### Marathi Prompts (मराठी प्रश्न)
1. *Computer Engineering चे HOD कोण आहेत?*
2. *कॉलेजचा पत्ता आणि संपर्क क्रमांक सांगा.*
3. *Placement Cell चा ईमेल काय आहे?*
4. *Computer Lab कुठे आहे?*
5. *कॉलेजमध्ये कोणत्या इंजिनिअरिंग शाखा उपलब्ध आहेत?*
6. *परीक्षा नियंत्रक (Controller of Examination) कोण आहेत?*

---

## 🔐 Security & Grounding Policy

- **Server-Side API Proxy**: The Gemini API key is accessed exclusively via `process.env.GEMINI_API_KEY` on the server. No secret keys are exposed to the client.
- **Strict Grounding**: The assistant answers only from the verified college knowledge base. If any unverified or missing detail is requested, it politely directs the inquirer to the respective department.
- **Zero Hallucination on Sensitive Data**: Examination dates, hall ticket downloads, individual marks, and recruiter guarantees are never hallucinated.
