import React from 'react';
import {
  Sparkles,
  X,
  Send,
  ShieldAlert,
  AlertTriangle,
  Bot,
  User,
  KeyRound,
  RotateCcw,
  Check,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';
import { ChatMessage } from '../types';
import { generateLocalAssistantResponse } from '../utils/localAssistant';

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  customApiKey: string;
  onSaveCustomApiKey: (key: string) => void;
  keySettingsOpen: boolean;
  onCloseKeySettings: () => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({
  isOpen,
  onClose,
  language,
  customApiKey,
  onSaveCustomApiKey,
  keySettingsOpen,
  onCloseKeySettings,
}) => {
  const t = TRANSLATIONS[language];

  // User consent state
  const [hasConsented, setHasConsented] = React.useState<boolean>(() => {
    return localStorage.getItem('healthpulse_consent') === 'true';
  });

  // Chat state
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        language === 'ne'
          ? 'नमस्ते! म HealthPulse AI हुँ — नेपालको डिजिटल स्वास्थ्य सहायक। म तपाईंलाई अस्पताल खुल्ने समय, ओपीडी विवरण, विपन्न नागरिक उपचार कोष, प्राथमिक उपचार र अस्पताल सिफारिसमा सहयोग गर्न सक्छु। कृपया आफ्नो जिज्ञासा राख्नुहोस्।'
          : 'Hello! I am HealthPulse AI — your Nepali Healthcare Assistant. I can assist you with hospital operating hours, OPD schedules, Bipanna Nagarik Fund, first aid guidance, and department triage. How may I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [tempApiKey, setTempApiKey] = React.useState<string>(customApiKey);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleConsent = () => {
    localStorage.setItem('healthpulse_consent', 'true');
    setHasConsented(true);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const envApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
      const effectiveKey = customApiKey || envApiKey || undefined;

      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
          language,
          customApiKey: effectiveKey,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botReply: ChatMessage = {
        id: String(Date.now() + 1),
        role: 'assistant',
        content: data.reply || 'No response generated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err: any) {
      console.warn('API route unavailable or error encountered, providing local intelligence response:', err);
      // Fallback for static hosts or network errors
      const fallbackText = generateLocalAssistantResponse(text, language);
      const fallbackMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: 'assistant',
        content: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'local_guidance_fallback',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick prompt pills
  const quickPrompts = [
    {
      en: 'Rabies vaccine location in Kathmandu?',
      ne: 'काठमाडौंमा रेबिज खोप कहाँ पाइन्छ?',
    },
    {
      en: 'How to apply for Bipanna Nagarik Fund?',
      ne: 'विपन्न नागरिक उपचार कोष कसरी पाउने?',
    },
    {
      en: 'Is Bir Hospital OPD open on Saturday?',
      ne: 'शनिबार वीर अस्पतालको ओपीडी खुल्छ?',
    },
    {
      en: 'First aid for snake bite in Terai?',
      ne: 'सर्पदंशको प्राथमिक उपचार के हो?',
    },
    {
      en: 'Where to go for sudden chest pain?',
      ne: 'छाती बेसरी दुखेमा कुन अस्पताल जाने?',
    },
  ];

  return (
    <>
      {/* Floating Action Button (FAB) */}
      {!isOpen && (
        <button
          onClick={onClose} // acts as toggle
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 text-white font-bold text-sm shadow-xl shadow-blue-600/35 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group"
          aria-label="Open HealthPulse AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <span>HealthPulse AI</span>
        </button>
      )}

      {/* Main Chat Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full sm:max-w-xl h-[85vh] sm:h-[650px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden">
            {/* Drawer Top Header */}
            <div className="p-4 bg-gradient-to-r from-blue-800 via-sky-800 to-teal-800 text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/10 text-emerald-300">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
                      {t.aiAssistantTitle}
                    </h3>
                    <span className="text-[10px] font-bold bg-teal-400/20 text-teal-200 px-2 py-0.5 rounded-full border border-teal-300/30">
                      Gemini 3.8
                    </span>
                  </div>
                  <p className="text-[11px] text-blue-200 font-medium">
                    {language === 'ne' ? 'नेपाली स्वास्थ्य तथा अस्पताल सहयोगी' : 'Nepal Health & Hospital Guide'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setMessages([messages[0]]);
                  }}
                  className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
                  title="Clear Chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Medical Disclaimer Alert Bar */}
            <div className="px-4 py-2 bg-amber-50 border-b border-amber-200/80 text-[11px] text-amber-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <p className="leading-tight">
                {language === 'ne'
                  ? 'यो एआई केवल जानकारीका लागि हो। गम्भीर बिरामीको अवस्थामा तुरुन्त १०२ एम्बुलेन्समा फोन गर्नुहोस्।'
                  : 'For informational guidance only. In critical emergencies, immediately dial 102.'}
              </p>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {/* Explicit User Consent Guard */}
              {!hasConsented ? (
                <div className="my-auto p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
                  <ShieldAlert className="w-12 h-12 text-blue-600 mx-auto" />
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {language === 'ne' ? 'प्रयोगकर्ता सहमति (User Consent)' : 'User Consent Required'}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.aiDisclaimerNotice}
                  </p>
                  <button
                    onClick={handleConsent}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    {t.aiConsentAgree}
                  </button>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-blue-600 text-white rounded-tr-none shadow-xs'
                            : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-2xs whitespace-pre-line'
                        }`}
                      >
                        {msg.content}
                        <div
                          className={`text-[9px] mt-1.5 ${
                            msg.role === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'
                          }`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-2.5 justify-start items-center text-xs text-slate-500">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                        <span className="text-xs font-semibold text-slate-500 ml-1">
                          {language === 'ne' ? 'स्वास्थ्य जानकारी संकलन गर्दै...' : 'Consulting HealthPulse AI...'}
                        </span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Quick Prompt Chips */}
            {hasConsented && (
              <div className="p-2 bg-slate-100/90 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
                {quickPrompts.map((qp, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(language === 'ne' ? qp.ne : qp.en)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-[11px] font-medium transition-colors"
                  >
                    {language === 'ne' ? qp.ne : qp.en}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            {hasConsented && (
              <div className="p-3 bg-white border-t border-slate-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={t.askAiPlaceholder}
                    disabled={isLoading}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white shadow-xs transition-colors shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom API Key Modal */}
      {keySettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                <KeyRound className="w-5 h-5 text-blue-600" />
                <span>{t.customApiKeyTitle}</span>
              </div>
              <button
                onClick={onCloseKeySettings}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t.customApiKeyDesc}
            </p>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Gemini API Key
              </label>
              <input
                type="password"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setTempApiKey('');
                  onSaveCustomApiKey('');
                  onCloseKeySettings();
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                {t.clearKey}
              </button>
              <button
                onClick={() => {
                  onSaveCustomApiKey(tempApiKey.trim());
                  onCloseKeySettings();
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
              >
                {t.saveKey}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
