
import React, { useState } from 'react';
import { Lesson } from '../types';
import { explainConcept } from '../services/gemini';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson, onBack }) => {
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAiAsk = async () => {
    if (!searchTerm) return;
    setIsAiLoading(true);
    const result = await explainConcept(searchTerm);
    setAiResponse(result || null);
    setIsAiLoading(false);
  };

  const handleDownload = (url?: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    } else {
      alert("عذراً، ملف PDF الخاص بهذا الدرس غير متوفر حالياً.");
    }
  };

  return (
    <div className="py-12 bg-[#020617] min-h-screen text-right font-['Cairo'] text-white animate-fade-in">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <button 
          onClick={onBack}
          className="group text-blue-400 font-black mb-12 flex items-center gap-3 hover:gap-5 transition-all flex-row-reverse ml-auto"
        >
          <i className="fas fa-arrow-right"></i>
          <span>العودة لصفحة المادة</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          {/* Main Lesson Content */}
          <div className="lg:col-span-3 space-y-10">
            <div className="bg-slate-900/40 rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl">
              <div className="mb-10">
                <span className="text-blue-500 font-black text-xs bg-blue-500/10 px-4 py-2 rounded-full mb-6 inline-block uppercase tracking-widest">{lesson.unit}</span>
                <h1 className="text-3xl md:text-5xl font-black mb-8 leading-tight">{lesson.title}</h1>
              </div>
              
              {lesson.videoUrl && lesson.videoUrl !== '#' ? (
                <div className="aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/5 mb-12">
                  <iframe width="100%" height="100%" src={lesson.videoUrl} title={lesson.title} frameBorder="0" allowFullScreen></iframe>
                </div>
              ) : (
                <div className="aspect-video bg-slate-800/50 rounded-[2rem] mb-12 flex flex-col items-center justify-center text-center p-10 border border-dashed border-white/10">
                  <div className="text-5xl mb-6 opacity-20"><i className="fas fa-video-slash"></i></div>
                  <h3 className="text-xl font-bold text-slate-400">فيديو الشرح قيد المعالجة</h3>
                </div>
              )}

              <article className="prose prose-invert max-w-none text-slate-300">
                <div className="bg-white/5 p-8 rounded-3xl border border-white/5 whitespace-pre-wrap font-medium leading-loose">
                  {lesson.content}
                </div>
              </article>

              <div className="mt-12 pt-10 border-t border-white/5 flex flex-wrap gap-4 justify-end">
                <button onClick={() => handleDownload(lesson.pdfUrl)} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black transition-all shadow-xl shadow-blue-900/40 flex items-center gap-4">
                  تحميل الدرس PDF <i className="fas fa-download"></i>
                </button>
              </div>
            </div>
          </div>

          {/* AI Side Panel */}
          <div className="lg:col-span-1 space-y-6 sticky top-24">
            <div className="bg-gradient-to-br from-indigo-950 to-blue-950 rounded-[2.5rem] p-8 text-white border border-white/10 shadow-2xl">
              <div className="flex items-center gap-4 mb-6 flex-row-reverse">
                <div className="text-3xl">🤖</div>
                <h3 className="text-xl font-black">المعلم الذكي</h3>
              </div>
              <p className="text-slate-400 text-xs font-bold mb-8 leading-relaxed">أي جزء لم تفهمه في هذا الدرس؟ اكتب المفهوم هنا وسأقوم بتبسيطه لك فوراً.</p>
              
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="مثال: اشرح لي النهاية في +∞"
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 text-sm outline-none focus:border-blue-500 mb-4 text-right"
              />
              <button onClick={handleAiAsk} disabled={isAiLoading} className="w-full bg-blue-600 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all disabled:opacity-50">
                {isAiLoading ? 'جاري التحليل...' : 'اطلب الشرح'}
              </button>

              {aiResponse && (
                <div className="mt-8 p-6 bg-black/30 rounded-2xl text-xs font-bold text-blue-100 leading-relaxed border border-white/5 max-h-96 overflow-y-auto custom-scrollbar">
                  {aiResponse}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
