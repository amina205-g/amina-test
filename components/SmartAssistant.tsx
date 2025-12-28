
import React, { useState, useRef, useEffect } from 'react';
import { askAssistant } from '../services/gemini';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface SmartAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const SmartAssistant: React.FC<SmartAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'مرحباً يا بطل! 👋 أنا مساعدك التعليمي الذكي. يمكنني شرح أي درس، حل تمرين، أو حتى محاكاة امتحان معك. كيف أساعدك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const response = await askAssistant(userMessage);
    setMessages(prev => [...prev, { role: 'assistant', text: response || 'عذراً، لم أستطع فهم ذلك.' }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] md:inset-auto md:bottom-8 md:left-8 w-full md:w-[450px] animate-fade-in flex flex-col pointer-events-none">
      <div className="bg-white/95 backdrop-blur-2xl rounded-none md:rounded-[2rem] shadow-2xl border border-blue-100 overflow-hidden flex flex-col h-full md:h-[650px] pointer-events-auto">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-3xl shadow-inner">🤖</div>
            <div>
              <h3 className="font-black text-lg">المساعد الذكي</h3>
              <div className="flex items-center gap-2 text-[10px] opacity-80">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                متصل الآن ومستعد للمساعدة
              </div>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 w-10 h-10 rounded-full flex items-center justify-center transition">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end animate-fade-in'}`}>
              <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
              }`}>
                {msg.text.split('\n').map((line, idx) => (
                  <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-end animate-pulse">
              <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-slate-100 flex gap-1.5">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Tips */}
        {messages.length < 3 && (
          <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
            {['اشرح لي درس النهايات', 'تمارين في الفيزياء', 'نصيحة للمذاكرة'].map((tip, idx) => (
              <button 
                key={idx}
                onClick={() => setInput(tip)}
                className="bg-white border border-blue-100 text-blue-600 text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-blue-50 transition"
              >
                {tip}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-6 bg-white border-t border-slate-100">
          <div className="flex gap-3 bg-slate-50 border border-slate-200 rounded-[1.5rem] p-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اكتب سؤالك هنا..."
              className="flex-grow bg-transparent border-none px-4 py-2 text-sm outline-none text-right"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white w-12 h-12 rounded-[1.2rem] flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:shadow-none"
            >
              <i className="fas fa-paper-plane transform -rotate-45"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAssistant;
