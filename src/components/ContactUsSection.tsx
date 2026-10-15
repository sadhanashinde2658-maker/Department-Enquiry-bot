import React, { useState } from 'react';
import { PhoneCall, MapPin, Phone, Mail, Clock, Send, Bot, CheckCircle2, Building, ShieldCheck } from 'lucide-react';
import { CollegeOverview, NavSection } from '../types.ts';

interface ContactUsSectionProps {
  college: CollegeOverview;
  onAskAI: (query: string) => void;
  onNavigate: (section: NavSection) => void;
}

export const ContactUsSection: React.FC<ContactUsSectionProps> = ({
  college,
  onAskAI,
  onNavigate,
}) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryMessage.trim()) return;

    // Send query to AI or show confirmation
    setSubmitted(true);
    setTimeout(() => {
      onAskAI(inquiryMessage);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Heading */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold mb-2">
          <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
          <span>Section 14 • Communication Desk</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Contact Us</h2>
        <p className="text-blue-200 text-sm sm:text-base max-w-3xl mt-1 leading-relaxed">
          Get in touch with admissions, department heads, examination controller, or placement officer.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Office */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Building className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Principal Office</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Administrative inquiries, official institutional verifications, and regulatory matters.
          </p>
          <div className="pt-2 border-t border-slate-100 text-xs space-y-1.5">
            <div>
              <span className="text-slate-400">Email: </span>
              <a href={`mailto:${college.email}`} className="font-bold text-blue-700 hover:underline">
                {college.email}
              </a>
            </div>
            <div>
              <span className="text-slate-400">Phone: </span>
              <a href={`tel:${college.phone[0]}`} className="font-bold text-emerald-700 hover:underline">
                {college.phone[0]}
              </a>
            </div>
          </div>
        </div>

        {/* Training & Placement Desk */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <PhoneCall className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Training & Placement Desk</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            In-Charge: Prof. H. S. Deore. Corporate drives, internships, and recruiter relations.
          </p>
          <div className="pt-2 border-t border-slate-100 text-xs space-y-1.5">
            <div>
              <span className="text-slate-400">Email: </span>
              <a href="mailto:tpocoe@snjb.org" className="font-bold text-blue-700 hover:underline">
                tpocoe@snjb.org
              </a>
            </div>
            <div>
              <span className="text-slate-400">Mobile: </span>
              <a href="tel:9420363431" className="font-bold text-emerald-700 hover:underline">
                9420363431
              </a>
            </div>
          </div>
        </div>

        {/* Examination Cell Desk */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Examination Cell</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Controller: Dr. Rajendra Chunilal Patil. Hall tickets, result verifications, and schedules.
          </p>
          <div className="pt-2 border-t border-slate-100 text-xs space-y-1.5">
            <div>
              <span className="text-slate-400">Email: </span>
              <a href="mailto:deanexamcoe@snjb.org" className="font-bold text-blue-700 hover:underline">
                deanexamcoe@snjb.org
              </a>
            </div>
            <div>
              <span className="text-slate-400">Hours: </span>
              <span className="font-semibold text-slate-700">{college.workingHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Address & Direct Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Address and Timings Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <h3 className="text-lg font-bold text-slate-900">Campus Location & Timings</h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900">Campus Address</div>
                <div className="text-slate-600 mt-1 leading-relaxed">{college.address}</div>
                <div className="text-[11px] text-slate-400 mt-1">Campus: {college.campus}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900">Working Hours</div>
                <div className="text-slate-700 font-semibold mt-1">{college.workingHours}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Academic & Administrative offices open Monday through Saturday.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900">Telephone Lines</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {college.phone.map((p, idx) => (
                    <a
                      key={idx}
                      href={`tel:${p.replace(/[^0-9]/g, '')}`}
                      className="font-bold text-emerald-700 hover:underline"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Instant Enquiry Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-700" />
            <h3 className="text-lg font-bold text-slate-900">Instant Student Enquiry Form</h3>
          </div>
          <p className="text-xs text-slate-500">
            Submit your question. Our grounded AI assistant responds in seconds in English or Marathi.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                placeholder="Student or visitor name..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email / Phone</label>
              <input
                type="text"
                value={inquiryEmail}
                onChange={(e) => setInquiryEmail(e.target.value)}
                placeholder="Your contact email or phone..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Enquiry Question</label>
              <textarea
                rows={3}
                required
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                placeholder="Ask about departments, syllabus, placements, labs, or exam cell..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Submit & Ask AI Assistant</span>
            </button>

            {submitted && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Redirecting your question to the AI Enquiry Bot...</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
