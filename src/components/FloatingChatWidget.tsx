import React, { useState } from 'react';
import { Bot, X, MessageSquare, Sparkles, Send, ArrowUpRight } from 'lucide-react';
import { NavSection } from '../types.ts';

interface FloatingChatWidgetProps {
  onOpenFullChat: () => void;
  onQuickAsk: (question: string) => void;
  currentSection: NavSection;
}

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({
  onOpenFullChat,
  onQuickAsk,
  currentSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickInput, setQuickInput] = useState('');

  // If already on the full chatbot section, we don't need the floating widget
  if (currentSection === 'chatbot') return null;

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    const q = quickInput.trim();
    setQuickInput('');
    setIsOpen(false);
    onQuickAsk(q);
  };

  const sampleChips = [
    'Who is Computer HOD?',
    'Computer Lab Room?',
    'Placement email?',
    'NBA Accreditation 2025?',
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Mini Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="p-4 bg-gradient-to-r from-blue-950 to-indigo-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-800 text-amber-300 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold">SNJB AI Enquiry Assistant</h4>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>English & मराठी Support</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800/60"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 bg-slate-50/50 text-xs">
            <p className="text-slate-600 font-medium">
              Ask anything about faculty, syllabus, timetables, laboratories, or placements:
            </p>

            <div className="flex flex-wrap gap-1">
              {sampleChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsOpen(false);
                    onQuickAsk(chip);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200 rounded-lg text-[11px] transition-colors shadow-2xs font-medium"
                >
                  {chip}
                </button>
              ))}
            </div>

            <form onSubmit={handleQuickSubmit} className="flex items-center gap-1.5 pt-1">
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="Ask in English or मराठी..."
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
              <button
                type="submit"
                disabled={!quickInput.trim()}
                className="p-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenFullChat();
              }}
              className="w-full py-1.5 text-center text-blue-700 hover:text-blue-900 font-bold text-[11px] flex items-center justify-center gap-1 pt-1"
            >
              <span>Open Full AI Chatbot Screen</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-white/20"
        title="Ask SNJB AI Assistant"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse border-2 border-blue-900" />
        </div>
        <span className="text-xs font-bold tracking-wide">
          {isOpen ? 'Close AI' : 'Ask AI Assistant'}
        </span>
      </button>
    </div>
  );
};
