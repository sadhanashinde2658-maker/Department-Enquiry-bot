import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini AI client with required header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const DATA_FILE_PATH = path.resolve(process.cwd(), 'server/data/collegeData.json');

// Read college data helper
function getCollegeData() {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const raw = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading collegeData.json:', err);
  }
  return {};
}

// Write college data helper
function saveCollegeData(data: any) {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving collegeData.json:', err);
    return false;
  }
}

// API Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'SNJB Department Enquiry Bot Server',
  });
});

app.get('/api/college-data', (_req: Request, res: Response) => {
  const data = getCollegeData();
  res.json(data);
});

// Admin Passkey validation
const ADMIN_PASSKEY = process.env.ADMIN_PASSKEY || 'snjb@admin2025';

app.post('/api/admin/verify', (req: Request, res: Response) => {
  const { passkey } = req.body;
  if (passkey === ADMIN_PASSKEY) {
    return res.json({ success: true, message: 'Admin authenticated' });
  }
  return res.status(401).json({ success: false, message: 'Invalid Admin Passkey' });
});

app.post('/api/admin/update-data', (req: Request, res: Response) => {
  const authHeader = req.headers['x-admin-key'];
  if (authHeader !== ADMIN_PASSKEY) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ success: false, message: 'No data provided' });
  }

  const saved = saveCollegeData(data);
  if (saved) {
    return res.json({ success: true, message: 'College database updated successfully' });
  } else {
    return res.status(500).json({ success: false, message: 'Failed to write data file' });
  }
});

// Gemini-powered chatbot endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    const collegeData = getCollegeData();

    // Construct grounded system instructions with complete verification constraints
    const systemInstruction = `
You are the official AI Assistant for "SNJB's Late Sau. Kantabai Bhavarlalji Jain College of Engineering" (Jain Gurukul Campus, Neminagar, Chandwad, Nashik, Maharashtra, India).
Your title is: "SNJB Department Enquiry Bot".
Subtitle: "Your Smart AI Assistant for SNJB College of Engineering, Chandwad".

=== GROUNDED KNOWLEDGE BASE ===
${JSON.stringify(collegeData, null, 2)}

=== STRICT POLICIES & ACCURACY RULES ===
1. LANGUAGE SUPPORT (English & Marathi):
   - Automatically detect the user's language (English or Marathi).
   - If the user asks in Marathi (e.g., using Devanagari script or Marathi words like "कोण आहेत", "कुठे आहे", "माहिती द्या"), respond in fluent, polite, natural Marathi.
   - If the user asks in English, respond in clear, professional, concise English.
   - Maintain appropriate honorifics (e.g., "Dr.", "प्रा.", "विभागप्रमुख").

2. TRUTHFULNESS & GROUNDING:
   - Answer strictly using the verified information provided in the knowledge base above.
   - Do NOT invent, assume, or hallucinate information.
   - If information is not in the knowledge base or is missing:
     In English respond: "Sorry, this information is not currently available in our verified college database. Please contact the relevant department for accurate information."
     In Marathi respond: "क्षमस्व, ही माहिती आमच्या पडताळणी केलेल्या महाविद्यालयीन डेटाबेसमध्ये सध्या उपलब्ध नाही. अचूक माहितीसाठी कृपया संबंधित विभागाशी संपर्क साधा."

3. EXAMINATION CELL & TIMETABLES:
   - Controller of Examination: Dr. Rajendra Chunilal Patil (Associate Professor and Controller of Examination).
   - Examination Email: deanexamcoe@snjb.org.
   - You MUST NOT invent examination dates, individual student results, hall ticket details, or live exam timetables.
   - All supplied examination schedules (May 2025, Dec 2024/Jan 2025, Jan 2025 re-exam) are HISTORICAL records. You MUST clearly state that they are historical records and direct students to the examination cell or official notice board for active schedules.

4. ACCREDITATION & AFFILIATION:
   - Mention NBA accreditation specifically for Civil Engineering, E&TC, and MBA as supplied in 2025. Do not claim accreditation beyond the verified period.
   - If asked about affiliation, clarify that the college was historically affiliated with University of Pune (SPPU), and note that current affiliation or autonomous status should be confirmed with the official college office.

5. PLACEMENTS:
   - Placement In-charge: Prof. H. S. Deore (tpocoe@snjb.org, 9420363431).
   - The recruiters list (Infosys, TCS, Cognizant, Wipro, Accenture, Capgemini, Bosch, etc.) is a supplied historical visiting recruiter list, not an absolute recruitment guarantee.
   - 2025-26 placement figures (215 placements, 270 offers) are reported figures pending final annual audit.
   - 2024-25 figures: Computer (66 placements, max ₹11.5 LPA), AI&DS (21 placements, max ₹6 LPA), Mech (40 placements, max ₹8 LPA), MBA (57 placements, max ₹6 LPA), Civil (19 placements, max ₹4.6 LPA), E&TC (16 placements, max ₹5 LPA). Total: 219.

6. LABORATORIES:
   - Only state the verified lab locations (e.g. Computer Science Lab is First Floor, Room 134; Engineering Chemistry is First Floor, Room 105 A, etc.). Never invent room numbers or laboratory equipment.

7. TONE & FORMATTING:
   - Helpful, structured, respectful, polite, and educational.
   - Use bullet points, bold highlights, and clean formatting for readability.
   - Always provide contact email or phone numbers where appropriate.
`;

    // Format chat history for multi-turn conversation
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      // Keep last 10 turns to stay within context
      const recentHistory = history.slice(-10);
      for (const turn of recentHistory) {
        if (turn.role === 'user' || turn.role === 'model') {
          contents.push({
            role: turn.role,
            parts: [{ text: String(turn.text || '') }],
          });
        }
      }
    }

    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.2, // Low temperature for high factual accuracy
      },
    });

    const botReply = response.text || 'Sorry, I could not generate a response at this moment. Please try again.';

    return res.json({
      reply: botReply,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Gemini Chat API Error (Activating Grounded Fallback Engine):', error?.message || error);

    // Resilient Grounded Fallback Engine: Answers strictly using the college database
    const collegeData = getCollegeData();
    const fallbackReply = generateFallbackKnowledgeResponse(req.body.message || '', collegeData);

    return res.json({
      reply: fallbackReply,
      timestamp: new Date().toISOString(),
      fallbackMode: true,
    });
  }
});

// Grounded fallback response generator for offline or 503 situations
function generateFallbackKnowledgeResponse(query: string, data: any): string {
  const q = query.toLowerCase();
  const isMarathi = /[\u0900-\u097F]/.test(query) || q.includes('ahet') || q.includes('kuthe') || q.includes('mahiti');

  // 1. Computer HOD
  if (q.includes('computer') && (q.includes('hod') || q.includes('head') || q.includes('विभागप्रमुख'))) {
    if (isMarathi) {
      return "Computer Engineering विभागाचे HOD Dr. K. M. Sanghavi आहेत. ईमेल: hodcompcoe@snjb.org. फोन: 9921343342.";
    }
    return "The Head of the Computer Engineering Department is Dr. K. M. Sanghavi. Email: hodcompcoe@snjb.org. Phone: 9921343342.";
  }

  // 2. AI&DS HOD
  if ((q.includes('ai') || q.includes('data science') || q.includes('aids')) && (q.includes('hod') || q.includes('head'))) {
    if (isMarathi) {
      return "Artificial Intelligence and Data Science विभागाचे HOD Dr. R. R. Bhandari आहेत. ईमेल: bhandari.rrcoe@snjb.org. फोन: 9404214914.";
    }
    return "The Head of the Artificial Intelligence and Data Science Department is Dr. R. R. Bhandari. Email: bhandari.rrcoe@snjb.org. Phone: 9404214914.";
  }

  // 3. Civil HOD
  if (q.includes('civil') && (q.includes('hod') || q.includes('head'))) {
    if (isMarathi) {
      return "Civil Engineering विभागाचे HOD Dr. K. L. Bidkar आहेत. ईमेल: hodcivilcoe@snjb.org. फोन: 8010577180.";
    }
    return "The Head of the Civil Engineering Department is Dr. K. L. Bidkar. Email: hodcivilcoe@snjb.org. Phone: 8010577180.";
  }

  // 4. E&TC HOD
  if ((q.includes('e&tc') || q.includes('entc') || q.includes('electronics')) && (q.includes('hod') || q.includes('head'))) {
    if (isMarathi) {
      return "Electronics and Telecommunications Engineering विभागाचे HOD Dr. R. K. Agrawal आहेत. ईमेल: hodentccoe@snjb.org. फोन: 9420967386.";
    }
    return "The Head of the Electronics and Telecommunications Engineering Department is Dr. R. K. Agrawal. Email: hodentccoe@snjb.org. Phone: 9420967386.";
  }

  // 5. First Year HOD
  if ((q.includes('first year') || q.includes('applied science') || q.includes('fe')) && (q.includes('hod') || q.includes('head'))) {
    if (isMarathi) {
      return "First Year Engineering विभागाचे HOD Dr. R. J. Nayak आहेत. ईमेल: hodappsccoe@snjb.org. फोन: 9890132909.";
    }
    return "The Head of the First Year Engineering Department is Dr. R. J. Nayak. Email: hodappsccoe@snjb.org. Phone: 9890132909.";
  }

  // 6. Mechanical HOD
  if (q.includes('mech') && (q.includes('hod') || q.includes('head'))) {
    if (isMarathi) {
      return "Mechanical Engineering विभागाचे HOD Dr. S. D. Sancheti आहेत. ईमेल: hodmechcoe@snjb.org. फोन: 7588175671.";
    }
    return "The Head of the Mechanical Engineering Department is Dr. S. D. Sancheti. Email: hodmechcoe@snjb.org. Phone: 7588175671.";
  }

  // 7. MBA HOD
  if (q.includes('mba') && (q.includes('hod') || q.includes('head'))) {
    if (isMarathi) {
      return "MBA विभागाचे HOD Dr. A. R. Murgai आहेत. ईमेल: hodmbacoe@snjb.org. फोन: 9890440576.";
    }
    return "The Head of the MBA Department is Dr. A. R. Murgai. Email: hodmbacoe@snjb.org. Phone: 9890440576.";
  }

  // 8. Controller of Examination
  if (q.includes('examination') || q.includes('exam cell') || q.includes('controller') || q.includes('परीक्ष')) {
    if (isMarathi) {
      return "परीक्षा नियंत्रक (Controller of Examination) Dr. Rajendra Chunilal Patil आहेत (Associate Professor and Controller of Examination). अधिकृत ईमेल: deanexamcoe@snjb.org. कृपया लक्षात घ्या: परीक्षा नियंत्रक कक्ष थेट परीक्षेचे निकाल किंवा वेळापत्रक स्वतः तयार करत नाही; अधिकृत सूचना फलक तपासा.";
    }
    return "The Controller of Examination is Dr. Rajendra Chunilal Patil (Associate Professor and Controller of Examination). Email: deanexamcoe@snjb.org. For verified examination schedules, please check official college notices or email the exam cell.";
  }

  // 9. Laboratories
  if (q.includes('computer science lab') || q.includes('computer lab')) {
    if (isMarathi) {
      return "Computer Science Laboratory ही First Floor, Room No. 134 वर आहे.";
    }
    return "The Computer Science Laboratory is located on the First Floor, Room No. 134.";
  }
  if (q.includes('chemistry')) {
    return "The Engineering Chemistry Laboratory is located on the First Floor, Room 105 A.";
  }
  if (q.includes('physics')) {
    return "The Engineering Physics Laboratory is located on the First Floor, Room 105 B.";
  }
  if (q.includes('electrical lab')) {
    return "The Basic Electrical Laboratory is located on the Second Floor, Room 210.";
  }
  if (q.includes('electronics lab')) {
    return "The Basic Electronics Laboratory is located on the Second Floor, Room 226.";
  }
  if (q.includes('drawing hall')) {
    return "The Drawing Hall is located on the Ground Floor, Room 019.";
  }
  if (q.includes('carpentry')) {
    return "The Carpentry Laboratory is located in the Workshop Building, Room 11.";
  }
  if (q.includes('welding')) {
    return "The Welding Laboratory is located in the Workshop Building, Room 7.";
  }
  if (q.includes('tin smithy')) {
    return "The Tin Smithy Laboratory is located in the Workshop Building, Room 9.";
  }
  if (q.includes('workshop')) {
    return "Workshop Building is the General workshop facility at SNJB College.";
  }

  // 10. Placement Cell & TPO
  if (q.includes('placement') || q.includes('tpo') || q.includes('recruit')) {
    if (isMarathi) {
      return "Training and Placement Cell चे प्रमुख Prof. H. S. Deore आहेत (Professor In-Charge, T&P Cell). ईमेल: tpocoe@snjb.org. मोबाईल: 9420363431. शैक्षणिक वर्ष 2024-25 मध्ये 219 विद्यार्थ्यांची निवड झाली (Computer साठी सर्वाधिक पॅकेज ₹11.50 लाख).";
    }
    return "The Training and Placement Cell email is tpocoe@snjb.org. The In-Charge is Prof. H. S. Deore (Mobile: 9420363431). In AY 2024–25, 219 students were placed with a maximum package of ₹11,50,000 for Computer Engineering. For AY 2025–26, 270 offers and 215 placements were reported.";
  }

  // 11. Working hours / timings
  if (q.includes('hour') || q.includes('timing') || q.includes('time') || q.includes('वेळ')) {
    if (isMarathi) {
      return "महाविद्यालयाची वेळ सोमवार ते शनिवार, सकाळी 9:20 ते दुपारी 4:40 अशी आहे.";
    }
    return "The supplied working hours are Monday to Saturday, 9:20 AM to 4:40 PM.";
  }

  // 12. Address / Contact number
  if (q.includes('address') || q.includes('phone') || q.includes('contact') || q.includes('पत्ता') || q.includes('क्रमांक')) {
    if (isMarathi) {
      return "महाविद्यालयाचा पत्ता: SNJB's Late Sau. K. B. Jain College of Engineering, Jain Gurukul Campus, Neminagar, Chandwad - 423101, Dist. Nashik, Maharashtra. फोन: (02556) 253750 / 8888491461. ईमेल: principalcoe@snjb.org.";
    }
    return "College Address: SNJB's Late Sau. Kantabai Bhavarlalji Jain College of Engineering, Jain Gurukul Campus, Neminagar, Chandwad - 423101, District Nashik, Maharashtra, India. Phone: (02556) 253750, 8888491461. Email: principalcoe@snjb.org.";
  }

  // 13. Accreditation / NBA
  if (q.includes('nba') || q.includes('accreditation') || q.includes('मान्यता')) {
    if (isMarathi) {
      return "NBA मान्यता: Civil Engineering, Electronics & Telecommunications (E&TC), आणि MBA यांना 2025 मध्ये NBA मान्यता प्राप्त झाल्याचे नमूद केले आहे.";
    }
    return "NBA accreditation was reported for Civil Engineering, Electronics and Telecommunications Engineering, and MBA in 2025.";
  }

  // 14. Branches / Programs
  if (q.includes('branch') || q.includes('course') || q.includes('program') || q.includes('शाखा')) {
    if (isMarathi) {
      return "महाविद्यालयात खालील शाखा उपलब्ध आहेत: 1. Computer Engineering 2. Artificial Intelligence and Data Science 3. Civil Engineering 4. Electronics and Telecommunications 5. Mechanical Engineering 6. MBA तसेच First Year Engineering.";
    }
    return "The college offers undergraduate engineering programs in Computer Engineering, Artificial Intelligence and Data Science, Civil Engineering, Electronics and Telecommunications Engineering, and Mechanical Engineering, along with MBA and First Year Engineering.";
  }

  // Default missing info response
  if (isMarathi) {
    return "क्षमस्व, ही माहिती आमच्या सध्याच्या महाविद्यालयीन डेटाबेसमध्ये उपलब्ध नाही. कृपया पडताळणी केलेल्या माहितीसाठी संबंधित विभागाशी संपर्क साधा.";
  }
  return "Sorry, this information is not available in our current college database. Please contact the relevant department for verified information.";
}

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: Number(PORT),
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
    console.log(`[Dev] Vite middleware attached.`);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log(`[Prod] Serving static files from dist.`);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`SNJB Department Enquiry Bot Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
