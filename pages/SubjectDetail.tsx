
import React, { useState } from 'react';
import { Subject, Lesson, Exam } from '../types';

interface SubjectDetailProps {
  subject: Subject;
  lessons: Lesson[];
  exams: Exam[];
  onSelectLesson: (lesson: Lesson) => void;
  onSelectExam: (exam: Exam) => void;
  onSelectQuiz: () => void;
  onBack: () => void;
}

const SubjectDetail: React.FC<SubjectDetailProps> = ({ subject, lessons, exams, onSelectLesson, onSelectExam, onSelectQuiz, onBack }) => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'exercises' | 'assignments' | 'exams'>('lessons');

  const assignments = exams.filter(e => e.type === 'assignment');
  const officialExams = exams.filter(e => e.type !== 'assignment');

  const tabs = [
    { id: 'lessons', label: 'الدروس والملخصات', icon: 'fa-book-open' },
    { id: 'exercises', label: 'سلسلة تمارين', icon: 'fa-pencil-ruler' },
    { id: 'assignments', label: 'فروض محروسة', icon: 'fa-file-signature' },
    { id: 'exams', label: 'امتحانات إشهادية', icon: 'fa-graduation-cap' }
  ];

  return (
    <div className="py-12 bg-[#020617] min-h-screen text-right font-['Cairo'] animate-fade-in text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Navigation / Back Button */}
        <button 
          onClick={onBack}
          className="group text-blue-400 font-black mb-12 flex items-center gap-3 hover:gap-5 transition-all flex-row-reverse ml-auto"
        >
          <i className="fas fa-arrow-right"></i>
          <span>العودة لقائمة المواد</span>
        </button>

        {/* Header Section */}
        <div className="bg-slate-900/40 rounded-[3.5rem] p-10 md:p-16 border border-white/5 flex flex-col md:flex-row-reverse items-center gap-12 mb-16 relative overflow-hidden shadow-2xl">
          <div className="text-[10rem] md:text-[14rem] leading-none select-none drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">{subject.icon}</div>
          
          <div className="flex-grow text-center md:text-right relative z-10">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">{subject.name}</h1>
            <p className="text-slate-400 font-bold text-lg md:text-xl leading-relaxed max-w-3xl ml-auto">
              مجموعتك الكاملة للتفوق في {subject.name}. دروس ملخصة بعناية، سلاسل تمارين نموذجية، وأرشيف الامتحانات الرسمية.
            </p>
          </div>
          
          <div className="shrink-0">
            <button 
              onClick={onSelectQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-3xl font-black transition-all shadow-2xl shadow-blue-900/40 flex items-center gap-4 text-lg active:scale-95"
            >
              <span>اختبار ذكي</span>
              <i className="fas fa-magic"></i>
            </button>
          </div>
        </div>

        {/* Tab Navigation Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`p-6 rounded-[2rem] font-black text-sm md:text-lg transition-all border-2 flex flex-col items-center gap-4 ${
                activeTab === tab.id 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-900/20 -translate-y-1' 
                  : 'bg-slate-900/50 border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300'
              }`}
            >
              <i className={`fas ${tab.icon} text-2xl opacity-60`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="bg-slate-900/30 rounded-[3rem] border border-white/5 p-8 md:p-16 min-h-[500px]">
          {activeTab === 'lessons' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lessons.map((lesson) => (
                <div 
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson)}
                  className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/10 transition-all cursor-pointer flex flex-row-reverse items-center justify-between group shadow-lg"
                >
                  <div className="text-right">
                    <div className="text-[10px] text-blue-500 font-black mb-1 uppercase tracking-widest">{lesson.unit}</div>
                    <h4 className="font-black text-white text-xl md:text-2xl group-hover:text-blue-400 transition-colors">{lesson.title}</h4>
                  </div>
                  <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <i className="fas fa-play text-lg"></i>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'exercises' && (
            <div className="text-center py-24">
              <div className="text-6xl mb-8 opacity-40">📝</div>
              <h3 className="text-3xl font-black mb-4">تمارين تفاعلية قيد التطوير</h3>
              <p className="text-slate-500 font-bold text-lg">نقوم حالياً برفع سلاسل التمارين مع حلولها المفصلة بالذكاء الاصطناعي.</p>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-16">
              {[1, 2].map(sem => (
                <div key={sem}>
                  <h3 className="text-2xl font-black mb-8 border-r-4 border-blue-600 pr-4">الأسدس {sem === 1 ? 'الأول' : 'الثاني'}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {assignments.filter(a => a.semester === sem).map(model => (
                      <div
                        key={model.id}
                        onClick={() => onSelectExam(model)}
                        className="bg-white/5 border border-white/5 hover:border-blue-600 p-8 rounded-3xl transition-all text-right group cursor-pointer"
                      >
                        <div className="text-blue-500 font-black text-sm mb-4">الفرض {model.term}</div>
                        <div className="font-black text-white text-lg group-hover:text-blue-400 transition-colors">النموذج {model.model}</div>
                        {model.hasCorrection && <span className="mt-4 inline-block bg-emerald-900/30 text-emerald-400 text-[9px] px-2 py-1 rounded font-black">مرفق بالتصحيح</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'exams' && (
            <div className="overflow-x-auto rounded-3xl border border-white/5 bg-black/20">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-500 font-black text-xs">
                    <th className="p-6">الامتحان</th>
                    <th className="p-6">السنة</th>
                    <th className="p-6">النوع</th>
                    <th className="p-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {officialExams.map(exam => (
                    <tr key={exam.id} className="hover:bg-white/5 transition-all">
                      <td className="p-6 font-black text-white">{exam.title}</td>
                      <td className="p-6 text-slate-400 font-bold">{exam.year}</td>
                      <td className="p-6 text-blue-500 font-black uppercase text-xs">{exam.type}</td>
                      <td className="p-6">
                        <button onClick={() => onSelectExam(exam)} className="bg-white/10 hover:bg-white text-black text-white hover:text-black px-6 py-2 rounded-xl text-xs font-black transition-all">معاينة</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;
