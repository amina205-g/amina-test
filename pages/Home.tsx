
import React from 'react';
import { LevelCategory } from '../types';

interface HomeProps {
  levels: any[];
  onSelectLevel: (level: LevelCategory) => void;
  onNavigate: (page: string, params?: any) => void;
  onOpenAssistant: () => void;
  onOpenQuiz: () => void;
}

const Home: React.FC<HomeProps> = ({ onSelectLevel, onNavigate, onOpenAssistant, levels }) => {
  return (
    <div className="bg-[#020617] min-h-screen text-white font-['Cairo'] pb-20">
      {/* Hero */}
      <div className="container mx-auto px-4 pt-16 pb-32 text-center lg:text-right flex flex-col lg:flex-row-reverse items-center justify-between gap-12">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-6 py-2 rounded-full text-[10px] font-black mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
            المنصة التعليمية الشاملة للمغرب 🇲🇦
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">بوابتك للتميز <span className="text-blue-500">الدراسي</span></h1>
          <p className="text-slate-400 text-lg md:text-2xl font-bold mb-10 max-w-2xl lg:ml-0 lg:mr-auto">دروس تفاعلية، شروحات ذكية، وأكبر بنك للامتحانات الوطنية في مكان واحد.</p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
            <button onClick={() => onNavigate('ai-quiz-gen')} className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-2xl font-black shadow-xl transition-all hover:-translate-y-1">ابدأ الاختبار الذكي</button>
            <button onClick={onOpenAssistant} className="bg-white/5 border border-white/10 px-10 py-4 rounded-2xl font-black hover:bg-white/10 transition-all">تحدث مع المساعد Pro</button>
          </div>
        </div>
        <div className="hidden lg:block w-1/3">
           <i className="fas fa-graduation-cap text-[15rem] text-blue-600/20"></i>
        </div>
      </div>

      {/* Levels Selection */}
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-black text-right mb-12">اختر سلكك التعليمي</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels?.map((l) => (
            <div 
              key={l.id} 
              onClick={() => onSelectLevel(l.id)}
              className={`group bg-slate-900/40 p-10 rounded-[3rem] border-r-8 ${l.color} border border-white/5 cursor-pointer hover:bg-slate-800 transition-all shadow-2xl text-right overflow-hidden relative`}
            >
              <div className="text-6xl mb-6 relative z-10">{l.icon}</div>
              <h3 className="text-3xl font-black mb-4 relative z-10">{l.name}</h3>
              <p className="text-slate-500 font-bold mb-8 relative z-10">{l.description}</p>
              <button className="text-blue-500 font-black flex items-center gap-2 justify-end w-full group-hover:gap-4 transition-all">
                تصفح الآن <i className="fas fa-arrow-left"></i>
              </button>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full group-hover:scale-150 transition-transform"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
