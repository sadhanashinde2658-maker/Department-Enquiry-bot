import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Trash2,
  Sparkles,
  Bot,
  User,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Copy,
  Check,
  Building,
  Phone,
  Mail,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';
import { ChatMessage, CollegeData } from '../types.ts';

interface ChatSectionProps {
  collegeData: CollegeData;
  onNavigateTab: (tab: any) => void;
  initialQuestion?: string;
  onClearInitialQuestion?: () => void;
}

const WELCOME_TEXT = `Hello! Welcome to SNJB College of Engineering, Chandwad.

I can help you with:

* College information
* Department details
* HOD and faculty information
* Syllabus
* Timetables
* Examination cell
* Training and placements
* Placement statistics
* Laboratories
* College contact information

You can ask questions in English or Marathi.`;

const SUGGESTED_QUESTIONS = [
  { text: 'Who is the HOD of Computer Engineering?', lang: 'en', category: 'Departments' },
  { text: 'मला Computer Engineering च्या HOD ची माहिती द्या.', lang: 'mr', category: 'मराठी' },
  { text: 'Who is the Controller of Examination?', lang: 'en', category: 'Exams' },
  { text: 'Where is the Computer Science Laboratory?', lang: 'en', category: 'Labs' },
  { text: 'Computer Lab कुठे आहे?', lang: 'mr', category: 'मराठी' },
  { text: 'How can I contact the Training and Placement Cell?', lang: 'en', category: 'Placements' },
  { text: 'Placement Cell चा ईमेल काय आहे?', lang: 'mr', category: 'मराठी' },
  { text: 'What branches are available at the college?', lang: 'en', category: 'Academics' },
  { text: 'What is the placement record for Computer Engineering?', lang: 'en', category: 'Placements' },
  { text: 'Where can I find the B.Tech syllabus?', lang: 'en', category: 'Syllabus' },
  { text: 'What are the college working hours?', lang: 'en', category: 'College' },
  { text: 'कॉलेजचा पत्ता आणि संपर्क क्रमांक सांगा.', lang: 'mr', category: 'मराठी' },
  { text: "What are the faculty members' areas of interest?", lang: 'en', category: 'Faculty' },
  { text: 'Tell me about NBA accreditation for the college.', lang: 'en', category: 'Accreditation' },
];

export const ChatSection: React.FC<ChatSectionProps> = ({
  collegeData,
  onNavigateTab,
  initialQuestion,
  onClearInitialQuestion,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome-1',
        sender: 'bot',
        text: WELCOME_TEXT,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const speechRecognitionRef = useRef<any>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle initial prompt passed from another tab
  useEffect(() => {
    if (initialQuestion && initialQuestion.trim()) {
      handleSendMessage(initialQuestion);
      if (onClearInitialQuestion) {
        onClearInitialQuestion();
      }
    }
  }, [initialQuestion]);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRec =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN'; // defaults to Indian English, handles accents well

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      speechRecognitionRef.current = recognition;
    }
  }, []);

  const toggleSpeechRecognition = () => {
    if (!speechRecognitionRef.current) {
      alert('Voice recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        speechRecognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Text-to-speech
  const handleSpeak = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isSpeaking === id) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Marathi detection heuristic
    const isMarathi = /[\u0900-\u097F]/.test(text);
    utterance.lang = isMarathi ? 'mr-IN' : 'en-IN';
    utterance.rate = 1.0;

    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);

    setIsSpeaking(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(null);
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        sender: 'bot',
        text: WELCOME_TEXT,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const questionText = typeof textToSend === 'string' ? textToSend : input;
    if (!questionText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: questionText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history payload
      const historyPayload = messages
        .filter((m) => !m.isError)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          text: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: questionText.trim(),
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      const botReply = data.reply || 'Sorry, no response was received. Please try again.';

      setMessages((prev) => [
        ...prev,
        {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'bot',
          text:
            '⚠️ An error occurred while communicating with the server. Please verify your connection or try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Render markdown-like elements (links, bold, lists, emails, phone)
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');

    return (
      <div className="space-y-1.5 text-sm sm:text-[15px] leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          // Bullet line
          const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ');
          const lineContent = isBullet ? line.trim().substring(2) : line;

          // Convert inline markdown: bold, mailto, phone, links
          const parts = lineContent.split(/(\*\*.*?\*\*|mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\b\d{10}\b|\b02556-\d{6}\b)/g);

          const formattedLine = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-blue-950 dark:text-blue-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }

            // Email check
            if (part.includes('@') && !part.includes(' ')) {
              const cleanEmail = part.replace(/^mailto:/, '');
              return (
                <a
                  key={pIdx}
                  href={`mailto:${cleanEmail}`}
                  className="inline-flex items-center gap-0.5 text-blue-700 underline font-medium hover:text-blue-900 bg-blue-50/70 px-1 py-0.2 rounded"
                >
                  <Mail className="w-3 h-3 inline mr-0.5" />
                  {cleanEmail}
                </a>
              );
            }

            // Phone check (10 digits or STD code)
            if (/^\d{10}$/.test(part) || /^02556-\d{6}$/.test(part)) {
              return (
                <a
                  key={pIdx}
                  href={`tel:${part}`}
                  className="inline-flex items-center gap-0.5 text-emerald-700 underline font-medium hover:text-emerald-900 bg-emerald-50 px-1 py-0.2 rounded"
                >
                  <Phone className="w-3 h-3 inline mr-0.5" />
                  {part}
                </a>
              );
            }

            return part;
          });

          if (isBullet) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-blue-600 font-bold mt-1 text-xs">•</span>
                <span className="flex-1">{formattedLine}</span>
              </div>
            );
          }

          return <div key={idx}>{formattedLine}</div>;
        })}
      </div>
    );
  };

  // Filter suggested questions
  const filteredSuggestions =
    selectedCategory === 'All'
      ? SUGGESTED_QUESTIONS
      : SUGGESTED_QUESTIONS.filter((q) => q.category === selectedCategory);

  const categories = ['All', 'मराठी', 'Departments', 'Exams', 'Placements', 'Labs', 'Syllabus', 'Faculty'];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 py-4 sm:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Chat Area (8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden min-h-[640px] max-h-[820px]">
          {/* Chat Header */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between border-b border-blue-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-800/80 border border-blue-400/30 flex items-center justify-center text-amber-300 shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold flex items-center gap-1.5">
                  <span>SNJB AI Department Enquiry Assistant</span>
                  <span className="px-1.5 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 rounded-full font-medium">
                    Online
                  </span>
                </h2>
                <p className="text-xs text-blue-200">
                  Grounding: 100% Verified SNJB College Knowledge Base
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClearChat}
                className="p-2 text-blue-200 hover:text-white hover:bg-blue-800/60 rounded-lg transition-colors text-xs flex items-center gap-1"
                title="Clear Chat History"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-3.5 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((message) => {
              const isUser = message.sender === 'user';
              return (
                <div
                  key={message.id}
                  className={`flex items-start gap-2.5 sm:gap-3 ${
                    isUser ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm ${
                      isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-950 text-amber-300 border border-blue-800'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble Container */}
                  <div className={`max-w-[85%] sm:max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3.5 sm:p-4 rounded-2xl shadow-xs ${
                        isUser
                          ? 'bg-blue-600 text-white rounded-tr-xs'
                          : message.isError
                          ? 'bg-red-50 border border-red-200 text-red-900 rounded-tl-xs'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                      }`}
                    >
                      {isUser ? (
                        <p className="text-sm sm:text-[15px] whitespace-pre-wrap">{message.text}</p>
                      ) : (
                        renderFormattedText(message.text)
                      )}
                    </div>

                    {/* Metadata & Message Actions Bar */}
                    <div className="flex items-center gap-2 mt-1 px-1 text-[11px] text-slate-400">
                      <span>{message.timestamp}</span>

                      {!isUser && !message.isError && (
                        <>
                          <span>•</span>
                          <button
                            onClick={() => handleSpeak(message.id, message.text)}
                            className="hover:text-blue-600 flex items-center gap-0.5 transition-colors"
                            title={isSpeaking === message.id ? 'Stop reading' : 'Read aloud'}
                          >
                            {isSpeaking === message.id ? (
                              <>
                                <VolumeX className="w-3 h-3 text-red-500 animate-pulse" />
                                <span className="text-red-600">Stop</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3 h-3" />
                                <span>Listen</span>
                              </>
                            )}
                          </button>

                          <span>•</span>
                          <button
                            onClick={() => handleCopy(message.id, message.text)}
                            className="hover:text-blue-600 flex items-center gap-0.5 transition-colors"
                            title="Copy reply text"
                          >
                            {copiedId === message.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading / Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5 sm:gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-950 text-amber-300 border border-blue-800 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 animate-spin text-blue-300" />
                </div>
                <div className="bg-white border border-slate-200 p-3.5 rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">Checking verified college repository</span>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions Tray */}
          <div className="p-3 bg-slate-100/90 border-t border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Suggested Questions (English & मराठी):</span>
              </span>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[60%]">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-blue-900 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
              {filteredSuggestions.map((sq, i) => (
                <button
                  key={i}
                  disabled={isLoading}
                  onClick={() => handleSendMessage(sq.text)}
                  className="text-xs bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200/80 hover:border-blue-300 rounded-lg px-2.5 py-1 transition-all text-left shadow-2xs disabled:opacity-50 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>{sq.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              {/* Mic button */}
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`p-2.5 rounded-xl border transition-all ${
                  isListening
                    ? 'bg-red-500 text-white border-red-600 animate-pulse'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
                title={isListening ? 'Listening... click to stop' : 'Speak your question'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask in English or Marathi (उदा. Computer Dept HOD कोण आहेत?)..."
                disabled={isLoading}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="inline-flex items-center justify-center p-2.5 sm:px-5 sm:py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-semibold text-sm transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 flex-shrink-0"
              >
                <Send className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Ask AI</span>
              </button>
            </form>
            <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400 px-1">
              <span>Press <strong>Enter</strong> to send. Press Mic to dictate.</span>
              <span className="text-emerald-700 font-medium">Bilingual English + Marathi Supported</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Quick Directory & Emergency Desk (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick Department Directory Card */}
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-700" />
                <span>Department Directory</span>
              </h3>
              <button
                onClick={() => onNavigateTab('departments')}
                className="text-xs text-blue-700 hover:underline font-semibold flex items-center gap-0.5"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs mt-2 max-h-[300px] overflow-y-auto">
              {collegeData.departmentHeads.map((dept, idx) => (
                <div key={idx} className="py-2.5 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">{dept.department}</span>
                    <button
                      onClick={() => handleSendMessage(`Who is the HOD of ${dept.department}?`)}
                      className="text-[10px] text-blue-600 hover:underline font-medium"
                    >
                      Ask Bot
                    </button>
                  </div>
                  <div className="text-slate-600 font-medium">{dept.name}</div>
                  <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                    <a
                      href={`mailto:${dept.email}`}
                      className="hover:text-blue-700 flex items-center gap-1 truncate"
                    >
                      <Mail className="w-3 h-3 text-blue-600 flex-shrink-0" />
                      <span className="truncate">{dept.email}</span>
                    </a>
                    <a
                      href={`tel:${dept.phone}`}
                      className="hover:text-emerald-700 flex items-center gap-1 flex-shrink-0"
                    >
                      <Phone className="w-3 h-3 text-emerald-600" />
                      <span>{dept.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Exam Cell & Placement Highlight */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-2xl border border-blue-200/80 p-4">
            <h3 className="font-bold text-blue-950 text-sm mb-2 flex items-center gap-1.5">
              <span>Examination & T&P Contacts</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-2xs">
                <div className="font-semibold text-slate-900">Controller of Examination</div>
                <div className="text-slate-600">{collegeData.examinationCell.controllerOfExamination}</div>
                <a
                  href={`mailto:${collegeData.examinationCell.email}`}
                  className="mt-1 inline-flex items-center gap-1 text-blue-700 font-medium hover:underline"
                >
                  <Mail className="w-3 h-3 text-blue-600" />
                  <span>{collegeData.examinationCell.email}</span>
                </a>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-2xs">
                <div className="font-semibold text-slate-900">Training & Placement In-Charge</div>
                <div className="text-slate-600">{collegeData.placement.inCharge.name}</div>
                <div className="flex items-center justify-between mt-1 text-slate-500">
                  <a
                    href={`mailto:${collegeData.placement.inCharge.email}`}
                    className="inline-flex items-center gap-1 text-blue-700 font-medium hover:underline"
                  >
                    <Mail className="w-3 h-3 text-blue-600" />
                    <span>{collegeData.placement.inCharge.email}</span>
                  </a>
                  <a
                    href={`tel:${collegeData.placement.inCharge.mobile}`}
                    className="inline-flex items-center gap-1 text-emerald-700 font-medium hover:underline"
                  >
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>{collegeData.placement.inCharge.mobile}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Campus Location Card */}
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">Campus Working Hours</h3>
            <p className="text-slate-600 mb-2">
              <strong>{collegeData.college.workingHours}</strong>
            </p>
            <p className="text-slate-500 leading-relaxed mb-3">
              {collegeData.college.address}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigateTab('laboratories')}
                className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold text-center transition-colors"
              >
                12 Campus Labs
              </button>
              <button
                onClick={() => onNavigateTab('syllabus')}
                className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg font-semibold text-center transition-colors"
              >
                B.Tech Syllabus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
