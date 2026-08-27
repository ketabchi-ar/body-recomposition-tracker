import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  Sparkles, 
  Send, 
  Loader2, 
  Key, 
  FileText, 
  MessageSquare, 
  CheckCircle2, 
  Flame, 
  Award,
  Calendar
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { generateDailyAIReport, callGeminiAPI } from '../utils/aiService';
import { daysSchedule, workoutsData } from '../data/planData';
import { getPersianDateFormatted } from '../utils/jalali';

export const AICoachModal = () => {
  const { 
    aiCoachModal, 
    setAiCoachModal, 
    geminiApiKey, 
    setGeminiApiKey, 
    profile, 
    selectedDayId, 
    workoutLogs, 
    mealLogs, 
    mealNotes, 
    waterLogs, 
    activeDateKey, 
    workouts 
  } = useTracker();

  const [activeTab, setActiveTab] = useState(aiCoachModal.initialTab || 'daily');
  const [apiKeyInput, setApiKeyInput] = useState(geminiApiKey);
  const [isApiKeySaved, setIsApiKeySaved] = useState(Boolean(geminiApiKey));
  
  // Daily Report State
  const [dailyReport, setDailyReport] = useState('');
  const [isReportLoading, setIsReportLoading] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: `سلام ${profile.name || 'ورزشکار عزیز'}! من مربی هوش مصنوعی شما برای پایش ترکیب بدنی (Body Recomposition) و تمرینات هستم. هر سوالی درباره اجرای حرکات، تنظیم رژیم غذایی یا نکات سلامتی دیسک کمر دارید بپرسید.`
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  if (!aiCoachModal.isOpen) return null;

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    setGeminiApiKey(apiKeyInput.trim());
    setIsApiKeySaved(true);
  };

  const handleGenerateDailyReport = async () => {
    if (!geminiApiKey) {
      alert("لطفاً ابتدا کلید Gemini API خود را وارد کنید.");
      return;
    }
    setIsReportLoading(true);
    setDailyReport('');

    try {
      const currentDay = daysSchedule.find(d => d.id === selectedDayId);
      const workoutDetail = workouts[currentDay?.workoutId];

      const report = await generateDailyAIReport(geminiApiKey, {
        profile,
        dayName: currentDay?.dayName || 'امروز',
        workoutLogsToday: workoutLogs[activeDateKey],
        mealLogsToday: mealLogs[activeDateKey],
        waterToday: waterLogs[activeDateKey],
        mealNotesToday: mealNotes[activeDateKey],
        workoutDetail
      });
      setDailyReport(report);
    } catch (err) {
      alert(err.message || 'خطا در تولید گزارش هوش مصنوعی');
    } finally {
      setIsReportLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;
    if (!geminiApiKey) {
      alert("لطفاً ابتدا کلید Gemini API خود را وارد کنید.");
      return;
    }

    const userText = chatInput.trim();
    const newMessages = [...chatMessages, { role: 'user', text: userText }];
    setChatMessages(newMessages);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const systemInstruction = `شما یک مربی ارشد بدنسازی، بازسازی ترکیب بدنی و کارشناس تغذیه هستید. مخاطب شما ${profile.name || 'ورزشکار'} با قد ${profile.height}، وزن ${profile.weight} و هدف ${profile.goal} است. پاسخ‌ها دقیق، بیومکانیکی، به زبان فارسی و همراه با راهکارهای عملی باشد.`;
      const aiReply = await callGeminiAPI(geminiApiKey, userText, systemInstruction);
      setChatMessages([...newMessages, { role: 'assistant', text: aiReply }]);
    } catch (err) {
      setChatMessages([...newMessages, { role: 'assistant', text: `متاسفانه خطایی رخ داد: ${err.message}` }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  مربی و تحلیلگر هوش مصنوعی (Gemini AI Coach)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  AI PRO
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                تحلیل تخصصی عملکرد ورزشی، انحرافات تغذیه و راهکارهای فیزیولوژیک
              </p>
            </div>
          </div>

          <button
            onClick={() => setAiCoachModal({ isOpen: false, initialTab: 'daily' })}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* API Key Bar if missing */}
        <div className="p-3 bg-slate-950/90 border-b border-slate-800 text-xs">
          <form onSubmit={handleSaveApiKey} className="flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <input
              type="password"
              placeholder="کلید Gemini API خود را وارد کنید (اختیاری و رایگان از aistudio.google.com)"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono text-[11px]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold transition flex-shrink-0"
            >
              ذخیره کلید
            </button>
          </form>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center border-b border-slate-800 bg-slate-900/60 px-4 pt-2 gap-2 flex-shrink-0">
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
              activeTab === 'daily'
                ? 'border-emerald-400 text-emerald-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>گزارش و تحلیل روزانه</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
              activeTab === 'chat'
                ? 'border-emerald-400 text-emerald-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>گفتگو با مربی AI</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'daily' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>تحلیل عملکرد امروز ({getPersianDateFormatted()})</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    بررسی ست‌های ثبت‌شده، وعده‌ها، یادداشت‌های تغذیه و میزان آب مصرفی
                  </p>
                </div>

                <button
                  onClick={handleGenerateDailyReport}
                  disabled={isReportLoading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-bold transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex-shrink-0"
                >
                  {isReportLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>{dailyReport ? 'به‌روزرسانی تحلیل' : 'تولید گزارش هوشمند'}</span>
                </button>
              </div>

              {dailyReport ? (
                <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line space-y-2 animate-fadeIn shadow-xl">
                  {dailyReport}
                </div>
              ) : (
                !isReportLoading && (
                  <div className="p-8 text-center rounded-2xl bg-slate-950/40 border border-dashed border-slate-800 text-slate-400 text-xs space-y-2">
                    <Bot className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                    <p>هنوز تحلیلی برای امروز تولید نشده است.</p>
                    <p className="text-slate-500">برای دریافت تحلیل عمیق تمرین و تغذیه روی دکمه «تولید گزارش هوشمند» کلیک کنید.</p>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="flex flex-col h-[400px]">
              {/* Chat messages list */}
              <div className="flex-1 overflow-y-auto space-y-3 p-2">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0 mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`p-3.5 rounded-2xl max-w-[80%] leading-relaxed whitespace-pre-line ${
                        msg.role === 'user'
                          ? 'bg-emerald-600 text-white rounded-br-none'
                          : 'bg-slate-950 border border-slate-850 text-slate-200 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>مربی AI در حال فکر کردن و آماده‌سازی پاسخ...</span>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="سوال خود را بپرسید..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition disabled:opacity-40"
                >
                  <Send className="w-4 h-4 rotate-180" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
