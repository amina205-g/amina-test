
import React from 'react';
import { LevelCategory, Subject } from '../types';

interface LevelSubjectsProps {
  level: LevelCategory;
  levelName?: string;
  subjects: Subject[];
  onSelectSubject: (subject: Subject) => void;
  onBack: () => void;
}

const LevelSubjects: React.FC<LevelSubjectsProps> = ({ level, levelName, subjects, onSelectSubject, onBack }) => {
  // Mapping for subject descriptions to make them feel more "complete"
  const getSubjectDesc = (subjectName: string) => {
    if (subjectName.includes('الرياضيات')) return 'دروس الجبر، الهندسة، والتحليل مع تمارين تطبيقية.';
    if (subjectName.includes('الفيزياء')) return 'تجارب علمية، ميكانيك، وكهرباء بأسلوب مبسط.';
    if (subjectName.includes('علوم الحياة')) return 'اكتشف أسرار الطبيعة، الجيولوجيا، والبيولوجيا.';
    if (subjectName.includes('اللغة العربية')) return 'إتقان النحو، الصرف، وفنون الأدب العربي.';
    if (subjectName.includes('Français')) return 'Maîtrisez la langue française avec nos cours interactifs.';
    if (subjectName.includes('التربية الإسلامية')) return 'تعميق الفهم الديني والقيم الأخلاقية السامية.';
    if (subjectName.includes('الاجتماعيات')) return 'رحلة عبر التاريخ والجغرافيا بخرائط تفاعلية.';
    return 'دروس، ملخصات، تمارين وامتحانات مصححة لضمان التفوق.';
  };

  return (
    <div className="py-12 bg-[#020617] min-h-screen text-right font-['Cairo'] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-emerald-600/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Navigation / Breadcrumbs */}
        <nav className="mb-12 flex items-center gap-4 text-sm font-black flex-row-reverse ml-auto bg-white/5 w-fit px-6 py-3 rounded-2xl border border-white/5 backdrop-blur-md">
          <button 
            className="text-slate-400 hover:text-white transition-colors"
            onClick={onBack}
          >العودة للمستويات</button>
          <i className="fas fa-chevron-left text-[10px] text-slate-700"></i>
          <span className="text-blue-500">{levelName}</span>
        </nav>

        {/* Page Header */}
        <header className="mb-16 md:pr-4">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            المواد <span className="text-blue-600">الدراسية</span>
          </h1>
          <p className="text-xl text-slate-400 font-bold max-w-2xl">
            استكشف عالم المعرفة في <span className="text-white underline decoration-blue-500 underline-offset-8">{levelName}</span>. اختر مادة للبدء.
          </p>
        </header>

        {/* Enhanced Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {subjects.map((subject, index) => (
            <div 
              key={subject.id}
              onClick={() => onSelectSubject(subject)}
              className="group relative bg-slate-900/40 rounded-[3rem] p-1 border border-white/5 hover:border-blue-500/50 transition-all duration-700 cursor-pointer shadow-2xl hover:-translate-y-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Inner with Glassmorphism */}
              <div className="bg-[#0f172a]/80 backdrop-blur-xl rounded-[2.8rem] p-10 h-full flex flex-col items-center text-center overflow-hidden relative">
                
                {/* Decorative Glow on Hover */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/30 transition-all duration-700"></div>
                
                {/* Icon Section */}
                <div className="relative mb-8">
                   <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center text-6xl shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10">
                    {subject.icon}
                  </div>
                  <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                </div>

                {/* Subject Info */}
                <h3 className={`text-2xl font-black mb-4 group-hover:text-blue-400 transition-colors ${subject.color || 'text-white'}`}>
                  {subject.name}
                </h3>
                
                <p className="text-slate-400 text-sm font-bold mb-8 leading-relaxed line-clamp-2">
                  {getSubjectDesc(subject.name)}
                </p>
                
                {/* Action Button */}
                <div className="mt-auto w-full">
                  <div className="w-full bg-white/5 group-hover:bg-blue-600 py-4 rounded-2xl font-black text-white transition-all flex items-center justify-center gap-3 border border-white/5 group-hover:border-blue-500 group-hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)]">
                    <span>ابدأ التعلم</span>
                    <i className="fas fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </div>

              {/* Top Right Label (AI Ready) */}
              <div className="absolute top-6 right-8 bg-blue-500/10 text-blue-500 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                AI Enhanced
              </div>
            </div>
          ))}
        </div>

        {/* Empty State if no subjects */}
        {subjects.length === 0 && (
          <div className="py-40 text-center bg-slate-900/20 rounded-[4rem] border-2 border-dashed border-white/5 animate-fade-in">
             <div className="text-8xl mb-8 opacity-20"><i className="fas fa-folder-open"></i></div>
             <h3 className="text-3xl font-black text-slate-500 mb-4">قريباً... سنرفع المحتوى</h3>
             <p className="text-slate-600 font-bold max-w-lg mx-auto leading-relaxed">فريقنا يعمل حالياً على تجهيز أفضل الملخصات والامتحانات لهذه السنة الدراسية.</p>
             <button onClick={onBack} className="mt-12 bg-blue-600 px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-blue-700 transition-all">العودة للخلف</button>
          </div>
        )}
      </div>

      {/* Page Footer Branding */}
      <div className="container mx-auto px-6 mt-32 text-center opacity-30 pointer-events-none">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">ajitnaalam.com — Excellence Education</p>
      </div>
    </div>
  );
};

export default LevelSubjects;
