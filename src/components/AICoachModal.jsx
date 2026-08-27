import React, { useState, useEffect } from 'react';
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
  Settings2,
  Calendar,
  AlertCircle,
  Check,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { AI_PROVIDERS, callAIProvider, generateDailyAIReport, testAIConnection, fetchAvailableModels } from '../utils/aiService';
import { getPersianDateFormatted } from '../utils/jalali';

export const AICoachModal = () => {
  const { 
    aiCoachModal, 
    setAiCoachModal, 
    aiConfig, 
    setAiConfig, 
    profile, 
    selectedDayId, 
    workoutLogs, 
    mealLogs, 
    mealNotes, 
    waterLogs, 
    activeDateKey, 
    daysSchedule, 
    workouts 
  } = useTracker();

  const [activeTab, setActiveTab] = useState(aiCoachModal.initialTab || 'daily');
  
  // Provider Config local form
  const [provider, setProvider] = useState(aiConfig.provider || 'gemini');
  const [apiKey, setApiKey] = useState(aiConfig.apiKey || '');
  const [model, setModel] = useState(aiConfig.model || 'gemini-1.5-flash');
  const [customBaseUrl, setCustomBaseUrl] = useState(aiConfig.customBaseUrl || '');
  
  // Connection Test State
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState({ success: false, msg: '' });
  const [modelsList, setModelsList] = useState([]);
  const [isFetchingModels, setIsFetchingModels] = useState(false);

  // Daily Report State
  const [dailyReport, setDailyReport] = useState('');
  const [isReportLoading, setIsReportLoading] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: `سلام ${profile.name || 'ورزشکار عزیز'}! من مربی هوش مصنوعی شما هستم. هر سوالی درباره اجرای حرکات، تنظیم رژیم غذایی یا نکات سلامتی دیسک کمر دارید بپرسید.`
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const selectedProviderInfo = AI_PROVIDERS.find(p => p.id === provider) || AI_PROVIDERS[0];

  // Auto fetch models when provider changes or key changes
  const handleFetchModels = async () => {
    if (!apiKey) return;
    setIsFetchingModels(true);
    try {
      const list = await fetchAvailableModels(provider, apiKey, customBaseUrl);
      if (list && list.length > 0) {
        setModelsList(list);
      } else {
        setModelsList(selectedProviderInfo.popularModels || []);
      }
    } catch {
      setModelsList(selectedProviderInfo.popularModels || []);
    } finally {
      setIsFetchingModels(false);
    }
  };

  const handleSaveConfig = (e) => {
    e?.preventDefault();
    setAiConfig({
      provider,
      apiKey: apiKey.trim(),
      model: model || selectedProviderInfo.defaultModel,
      customBaseUrl: customBaseUrl.trim()
    });
    setTestResult({ success: true, msg: 'تنظیمات هوش مصنوعی ذخیره شد! ✅' });
    setTimeout(() => setTestResult({ success: false, msg: '' }), 3000);
  };

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, msg: 'لطفاً ابتدا کلید API را وارد کنید.' });
      return;
    }
    setIsTesting(true);
    setTestResult({ success: false, msg: '' });

    try {
      const reply = await testAIConnection(provider, apiKey.trim(), model, customBaseUrl);
      setTestResult({ success: true, msg: `اتصال با موفقیت برقرار شد! پاسخ مدل: ${reply}` });
      handleSaveConfig();
      handleFetchModels();
    } catch (err) {
      setTestResult({ success: false, msg: `خطا در اتصال: ${err.message}` });
    } finally {
      setIsTesting(false);
    }
  };

  if (!aiCoachModal.isOpen) return null;

  const handleGenerateDailyReport = async () => {
    if (!aiConfig.apiKey) {
      alert("لطفاً ابتدا کلید API خود را در تب تنظیمات هوش مصنوعی وارد نمایید.");
      setActiveTab('settings');
      return;
    }
    setIsReportLoading(true);
    setDailyReport('');

    try {
      const currentDay = daysSchedule.find(d => d.id === selectedDayId);
      const workoutDetail = workouts[currentDay?.workoutId];

      const report = await generateDailyAIReport(aiConfig, {
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
    if (!aiConfig.apiKey) {
      alert("لطفاً ابتدا کلید API خود را در تب تنظیمات هوش مصنوعی وارد کنید.");
      setActiveTab('settings');
      return;
    }

    const userText = chatInput.trim();
    const newMessages = [...chatMessages, { role: 'user', text: userText }];
    setChatMessages(newMessages);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const systemInstruction = `شما مربی ارشد تناسب اندام و متخصص تغذیه بالینی هستید. مخاطب شما ${profile.name || 'ورزشکار'} است. پاسخ‌ها صمیمی، دقیق، به زبان فارسی و با نکات بیومکانیک ارائه شود.`;
      const aiReply = await callAIProvider({
        ...aiConfig,
        prompt: userText,
        systemInstruction
      });
      setChatMessages([...newMessages, { role: 'assistant', text: aiReply }]);
    } catch (err) {
      setChatMessages([...newMessages, { role: 'assistant', text: `خطا: ${err.message}` }]);
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
                  مربی و تحلیلگر هوش مصنوعی (AI Fitness Hub)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {selectedProviderInfo.name}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                پشتیبانی از Gemini، OpenRouter، OpenAI، AvalAI و GapGPT
              </p>
            </div>
          </div>

          <button
            onClick={() => setAiCoachModal({ isOpen: false, initialTab: 'daily' })}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center border-b border-slate-800 bg-slate-900/60 px-4 pt-2 gap-2 flex-shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
              activeTab === 'daily'
                ? 'border-emerald-400 text-emerald-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>تحلیل عملکرد روزانه</span>
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
            <span>چت با مربی AI</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
              activeTab === 'settings'
                ? 'border-emerald-400 text-emerald-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings2 className="w-4 h-4" />
            <span>تنظیمات شرکت‌ها و کلید API</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
          
          {/* TAB 1: DAILY REPORT */}
          {activeTab === 'daily' && (
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
          )}

          {/* TAB 2: CHAT */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-[400px]">
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
                    <span>مربی AI در حال پاسخ...</span>
                  </div>
                )}
              </div>

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

          {/* TAB 3: PROVIDER & API KEY SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              {/* Provider Selector Cards */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  انتخاب شرکت ارائه‌دهنده هوش مصنوعی:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {AI_PROVIDERS.map(p => {
                    const isSelected = provider === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setProvider(p.id);
                          setModel(p.defaultModel);
                          setCustomBaseUrl('');
                        }}
                        className={`p-3 rounded-2xl border text-right transition flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <span className="font-black text-xs block">{p.name}</span>
                        <span className="text-[10px] text-slate-500 line-clamp-1 mt-1">{p.description}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* API Key Input */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-200">
                    کلید API برای {selectedProviderInfo.name}:
                  </label>
                  <a
                    href={selectedProviderInfo.getKeyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>دریافت کلید API</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <input
                  type="password"
                  placeholder="کلید API خود را وارد کنید..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-[11px] focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Model Selector & Custom Base URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-300">مدل هوش مصنوعی:</label>
                    <button
                      type="button"
                      onClick={handleFetchModels}
                      disabled={isFetchingModels || !apiKey}
                      className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className={`w-3 h-3 ${isFetchingModels ? 'animate-spin' : ''}`} />
                      <span>لود لیست مدل‌ها</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    list="models-list"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder={selectedProviderInfo.defaultModel}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-[11px]"
                  />
                  <datalist id="models-list">
                    {(modelsList.length > 0 ? modelsList : selectedProviderInfo.popularModels).map((m, idx) => (
                      <option key={idx} value={m} />
                    ))}
                  </datalist>
                </div>

                {provider !== 'gemini' && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-300">
                      Base URL سفارشی (اختیاری):
                    </label>
                    <input
                      type="text"
                      placeholder={selectedProviderInfo.defaultEndpoint}
                      value={customBaseUrl}
                      onChange={(e) => setCustomBaseUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-[11px]"
                    />
                  </div>
                )}
              </div>

              {/* Connection Test Result */}
              {testResult.msg && (
                <div className={`p-3 rounded-xl border flex items-center gap-2 ${
                  testResult.success
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                }`}>
                  {testResult.success ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span>{testResult.msg}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTesting || !apiKey.trim()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold transition disabled:opacity-50"
                >
                  {isTesting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  <span>تست اتصال کلید</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black transition shadow-lg shadow-emerald-500/20"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>ذخیره تنظیمات هوش مصنوعی</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
