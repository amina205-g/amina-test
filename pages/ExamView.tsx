
import React, { useEffect, useState } from 'react';
import { Exam, Subject } from '../types';
import { generateMockExam } from '../services/gemini';

interface ExamViewProps {
  exam: Exam;
  subject: Subject;
  onBack: () => void;
}

const ExamView: React.FC<ExamViewProps> = ({ exam, subject, onBack }) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // هل الفرض ابتدائي؟ (لتغيير نظام الألوان إلى البرتقالي كما في الصورة)
  const isPrimary = exam.gradeId.startsWith('p');
  const themeColor = isPrimary ? 'orange' : 'blue';

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      try {
        if ((exam as any).contentPreview) {
          setContent((exam as any).contentPreview);
        } else {
          const mockData = await generateMockExam(subject.name, exam.year, exam.title);
          setContent(mockData || "نعتذر، واجهنا مشكلة في تحميل محتوى الامتحان.");
        }
      } catch (e) {
        setContent("خطأ في الاتصال بالخادم الذكي.");
      }
      setLoading(false);
    }
    loadContent();
  }, [exam, subject]);

  const handleDownload = () => {
    if (exam.fileUrl && exam.fileUrl !== '#') {
      window.open(exam.fileUrl, '_blank');
    } else {
      alert(`جاري تجهيز نسخة PDF عالية الجودة من: ${exam.title}\nسيبدأ التحميل تلقائياً خلال لحظات...`);
    }
  };

  return (
    <div className="py-12 bg-[#020617] min-h-screen text-right font-['Cairo'] text-white">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="flex justify-between items-center mb-12 flex-row-reverse">
          <button onClick={onBack} className={`text-${themeColor}-400 font-black flex items-center gap-3 hover:gap-5 transition-all`}>
             <i className="fas fa-arrow-right"></i>
             <span>العودة للمادة</span>
          </button>
          
          <div className="flex gap-4">
             <button onClick={() => window.print()} className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-2xl border border-white/10 font-black transition-all">
                <i className="fas fa-print ml-2"></i> طباعة
             </button>
             <button 
                onClick={handleDownload}
                className={`bg-${themeColor}-600 hover:bg-${themeColor}-700 text-white px-8 py-3 rounded-2xl font-black shadow-xl shadow-${themeColor}-900/40 transition-all active:scale-95`}
             >
                <i className="fas fa-download ml-2"></i> تحميل الفرض (PDF)
             </button>
          </div>
        </div>

        <div className={`bg-white rounded-[3rem] border-8 border-${themeColor}-500 overflow-hidden shadow-[0_0_60px_rgba(249,115,22,0.3)] text-slate-800`}>
          {/* Header Bar - مطابقة للصورة المرفقة */}
          <div className={`p-10 border-b-4 border-dashed border-${themeColor}-300 bg-${themeColor}-50 relative`}>
             {/* الشريط العلوي المقطع */}
             <div className="absolute top-0 left-0 w-full flex gap-2">
                {Array.from({length: 20}).map((_, i) => (
                  <div key={i} className={`flex-1 h-3 bg-${themeColor}-500 ${i % 2 === 0 ? 'opacity-100' : 'opacity-0'}`}></div>
                ))}
             </div>

             <div className="flex justify-between items-center flex-row-reverse mt-4">
                <div className="text-right">
                  <div className="relative inline-block mb-4">
                    <span className={`bg-${themeColor}-500 text-white px-10 py-3 rounded-xl font-black text-3xl shadow-lg`}>فرض محروس</span>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full border-2 border-white"></div>
                  </div>
                  <h1 className={`text-5xl md:text-6xl font-black text-${themeColor}-600 mb-2 drop-shadow-sm`}>{subject.name}</h1>
                  <p className="text-slate-600 font-black text-xl">{exam.title}</p>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-32 h-32 bg-white border-4 border-${themeColor}-500 rounded-2xl flex flex-col items-center justify-center text-center shadow-inner relative`}>
                    <span className="text-xs font-black text-slate-400 mb-1">نقطتي</span>
                    <div className="w-20 h-0.5 bg-slate-100 mb-2"></div>
                    <div className="w-16 h-12 bg-slate-50 rounded-lg"></div>
                  </div>
                </div>
             </div>

             {/* بيانات التلميذ */}
             <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-right px-4">
                <div className="text-2xl font-black border-b-4 border-dotted border-slate-300 pb-2">مدرستي: ...............................</div>
                <div className="text-2xl font-black border-b-4 border-dotted border-slate-300 pb-2">إسمي: ...................................</div>
             </div>
          </div>

          <div className="p-10 md:p-16 min-h-[700px] bg-white relative">
            {/* الدائرة الحمراء/البرتقالية للرقم 1 كما في الصورة */}
            <div className={`absolute top-12 left-12 w-20 h-20 bg-red-600 border-4 border-white rounded-full text-white flex items-center justify-center text-5xl font-black shadow-2xl`}>1</div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-40">
                <div className={`w-20 h-20 border-8 border-${themeColor}-600 border-t-transparent rounded-full animate-spin mb-6`}></div>
                <p className="text-slate-400 font-black text-xl">جاري تحضير ورقة الفرض...</p>
              </div>
            ) : (
              <div className="max-w-none text-right leading-[2.5] font-black text-xl">
                <div className="bg-white whitespace-pre-wrap">
                  {content?.split('\n').map((line, idx) => {
                    if (line.startsWith('####')) {
                      return (
                        <div key={idx} className="mt-12 mb-8">
                          <h4 className={`text-3xl font-black text-slate-800 flex items-center gap-4`}>
                            <span className={`text-${themeColor}-600`}>{line.replace('####', '').split('.')[0]}.</span>
                            <span>{line.replace('####', '').split('.').slice(1).join('.')}</span>
                          </h4>
                          <div className={`h-1.5 w-32 bg-${themeColor}-500 rounded-full mt-2`}></div>
                        </div>
                      );
                    }
                    if (line.startsWith('*')) {
                      return (
                        <div key={idx} className="mr-8 mb-4 text-slate-600 flex items-start gap-4 text-lg">
                          <span className={`w-4 h-4 mt-2 bg-yellow-400 rounded-lg border-2 border-${themeColor}-600 shrink-0`}></span>
                          <span className="font-bold">{line.replace('*', '')}</span>
                        </div>
                      );
                    }
                    return <p key={idx} className="mb-6 text-slate-700">{line}</p>
                  })}
                </div>
                
                {/* معاينة السبورة لفرض الأول ابتدائي */}
                {exam.gradeId === 'p1' && (
                  <div className="mt-20 relative group">
                    <div className="absolute -top-10 right-4 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-black">إطار الرسم</div>
                    <div className="border-8 border-slate-300 rounded-[3rem] p-4 bg-slate-50 shadow-inner">
                      <div className="border-4 border-slate-700 rounded-[2.5rem] bg-white h-80 flex flex-col items-center justify-center text-slate-200">
                         <i className="fas fa-chalkboard text-8xl mb-4"></i>
                         <p className="text-2xl font-black">أرسم الكرة هنا</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* تذييل الورقة ملون */}
          <div className={`bg-orange-600 p-6 flex justify-between items-center text-white px-12`}>
             <div className="flex items-center gap-4">
                <i className="fas fa-arrow-right text-2xl"></i>
                <div className="h-4 w-32 bg-white/20 rounded-full"></div>
             </div>
             <div className="text-xl font-black">من إعداد فريق "أجي نتعلم" — 2024</div>
             <div className="flex items-center gap-4">
                <div className="h-4 w-32 bg-white/20 rounded-full"></div>
                <i className="fas fa-arrow-left text-2xl"></i>
             </div>
          </div>
        </div>

        {/* تنبيه تعليمي */}
        <div className="mt-12 bg-white/5 border border-white/10 p-8 rounded-[2rem] text-center">
           <p className="text-slate-400 font-bold mb-4">هذا الفرض مصمم وفق التوجيهات التربوية للمنهاج المغربي.</p>
           <p className="text-orange-500 font-black text-sm">ajitnaalam.com - جودة بيداغوجية في كل ملف</p>
        </div>
      </div>
    </div>
  );
};

export default ExamView;
