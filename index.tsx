
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// --- قاعدة البيانات الشاملة لجميع الأسلاك التعليمية ---
const DATA = {
  levels: [
    { id: 'primary', name: 'التعليم الابتدائي', icon: 'fa-child', color: 'bg-emerald-500' },
    { id: 'middle', name: 'التعليم الثانوي الإعدادي', icon: 'fa-book', color: 'bg-[#8e44ad]' },
    { id: 'secondary', name: 'التعليم الثانوي التأهيلي', icon: 'fa-graduation-cap', color: 'bg-indigo-700' }
  ],
  primaryGrades: [
    { id: 'p1', name: 'الأولى ابتدائي' }, { id: 'p2', name: 'الثانية ابتدائي' },
    { id: 'p3', name: 'الثالثة ابتدائي' }, { id: 'p4', name: 'الرابعة ابتدائي' },
    { id: 'p5', name: 'الخامسة ابتدائي' }, { id: 'p6', name: 'السادسة ابتدائي' }
  ],
  middleGrades: [
    { id: 'm1', name: 'الأولى إعدادي' }, { id: 'm2', name: 'الثانية إعدادي' }, { id: 'm3', name: 'الثالثة إعدادي' }
  ],
  secondaryGrades: [
    { id: 's1', name: 'الجذع المشترك' }, { id: 's2', name: 'السنة الأولى باكالوريا' }, { id: 's3', name: 'السنة الثانية باكالوريا' }
  ],
  subjects: {
    // ابتدائي
    p1: generatePrimarySubjects('الأولى'), p2: generatePrimarySubjects('الثانية'),
    p3: generatePrimarySubjects('الثالثة'), p4: generatePrimarySubjects('الرابعة'),
    p5: generatePrimarySubjects('الخامسة'), p6: generatePrimarySubjects('السادسة'),
    // إعدادي
    m1: generateMiddleSubjects('الأولى'), m2: generateMiddleSubjects('الثانية'), m3: generateMiddleSubjects('الثالثة'),
    // ثانوي
    s1: generateSecondarySubjects('الجذع المشترك'),
    s2: generateSecondarySubjects('الأولى باك'),
    s3: generateSecondarySubjects('الثانية باك')
  }
};

function generatePrimarySubjects(gradeName: string) {
  return [
    { id: `arab_p_${gradeName}`, name: 'اللغة العربية', fullName: 'اللغة العربية', icon: '📖' },
    { id: `math_p_${gradeName}`, name: 'الرياضيات', fullName: 'الرياضيات', icon: '🔢' },
    { id: `fren_p_${gradeName}`, name: 'اللغة الفرنسية', fullName: 'اللغة الفرنسية', icon: '🇫🇷' },
    { id: `sci_p_${gradeName}`, name: 'النشاط العلمي', fullName: 'النشاط العلمي', icon: '💡' }
  ];
}

function generateMiddleSubjects(gradeName: string) {
  return [
    { id: `math_m_${gradeName}`, name: 'الرياضيات', fullName: 'الرياضيات (BIOF)', icon: '📐' },
    { id: `pc_m_${gradeName}`, name: 'الفيزياء والكيمياء', fullName: 'الفيزياء والكيمياء (BIOF)', icon: '🧪' },
    { id: `svt_m_${gradeName}`, name: 'علوم الحياة والأرض', fullName: 'علوم الحياة والأرض (SVT)', icon: '🌱' },
    { id: `arab_m_${gradeName}`, name: 'اللغة العربية', fullName: 'اللغة العربية', icon: '📖' }
  ];
}

function generateSecondarySubjects(gradeName: string) {
  return [
    { id: `math_s_${gradeName}`, name: 'الرياضيات', fullName: 'الرياضيات (BIOF)', icon: '📉' },
    { id: `pc_s_${gradeName}`, name: 'الفيزياء والكيمياء', fullName: 'الفيزياء والكيمياء (BIOF)', icon: '⚛️' },
    { id: `svt_s_${gradeName}`, name: 'علوم الحياة والأرض', fullName: 'علوم الحياة والأرض (BIOF)', icon: '🔬' },
    { id: `philo_s_${gradeName}`, name: 'الفلسفة', fullName: 'الفلسفة', icon: '🧠' },
    { id: `engl_s_${gradeName}`, name: 'اللغة الإنجليزية', fullName: 'اللغة الإنجليزية', icon: '🇬🇧' },
    { id: `fren_s_${gradeName}`, name: 'اللغة الفرنسية', fullName: 'اللغة الفرنسية', icon: '🇫🇷' },
    { id: `islm_s_${gradeName}`, name: 'التربية الإسلامية', fullName: 'التربية الإسلامية', icon: '🕌' }
  ];
}

const Layout = ({ children, onNavigate }: { children?: React.ReactNode, onNavigate: (v: string) => void }) => {
  return (
    <div className="min-h-screen bg-white font-['Cairo'] text-gray-800 selection:bg-[#8e44ad] selection:text-white">
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-white border-b border-gray-100 py-1.5 overflow-hidden">
        <div className="container mx-auto px-4 flex justify-start gap-6 text-[12px] font-bold text-[#8e44ad]">
          <button onClick={() => onNavigate('home')} className="hover:underline">الرئيسية</button>
          <button onClick={() => alert('قريباً')} className="hover:underline">عن المنصة</button>
          <button onClick={() => alert('قريباً')} className="hover:underline">اتصل بنا</button>
        </div>
      </div>

      {/* 2. LOGO SECTION */}
      <div className="bg-white py-8 border-b-2 border-[#8e44ad] cursor-pointer" onClick={() => onNavigate('home')}>
        <div className="container mx-auto px-4 flex flex-row items-center justify-start gap-6">
             <div className="relative w-20 h-20 shrink-0">
                <div className="absolute inset-0 border-[6px] border-emerald-500 rounded-full opacity-70 rotate-12"></div>
                <div className="absolute inset-0 border-[6px] border-blue-500 rounded-full opacity-70 -rotate-12 translate-x-2"></div>
                <div className="absolute inset-0 border-[6px] border-orange-500 rounded-full opacity-70 rotate-45 translate-y-1"></div>
                <div className="flex items-center justify-center h-full gap-1">
                   <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                   <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
             </div>
             <div className="text-right">
                <h1 className="text-5xl font-black text-[#8e44ad] mb-1 tracking-tighter">أجي نتعلم</h1>
                <p className="text-blue-500 text-lg font-bold">بوابتك الرقمية نحو التميز الدراسي</p>
             </div>
        </div>
      </div>

      {/* 3. MAIN NAV BAR */}
      <nav className="bg-[#8e44ad] shadow-lg sticky top-0 z-50 py-1 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-start gap-4">
          <div className="flex w-full md:w-auto items-center bg-white rounded overflow-hidden shadow-inner">
             <button className="bg-gray-200 text-gray-600 px-3 py-1.5 hover:bg-gray-300 border-l border-gray-300">
                <i className="fas fa-search"></i>
             </button>
             <input type="text" placeholder="بحث عن دروس أو تمارين..." className="px-3 py-1 text-right outline-none text-sm font-bold w-48 text-gray-700" />
          </div>
          <div className="flex flex-row items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
             <button onClick={() => onNavigate('home')} className="bg-white/10 hover:bg-white/20 p-2 rounded text-white transition mr-2 active:scale-90">
                <i className="fas fa-home"></i>
             </button>
             {DATA.levels.map(l => (
               <button key={l.id} onClick={() => onNavigate(`${l.id}-home`)} className="flex items-center gap-1 bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded text-[13px] md:text-sm font-black transition whitespace-nowrap shadow-sm ml-1 active:scale-95">
                 <i className="fas fa-caret-down text-[10px]"></i>
                 {l.name}
               </button>
             ))}
          </div>
        </div>
      </nav>

      <main className="bg-gray-50 pt-1 min-h-[60vh]">{children}</main>

      <footer className="bg-gray-800 text-white py-12 mt-20 border-t-8 border-[#8e44ad]">
        <div className="container mx-auto px-4 text-center">
           <p className="font-bold text-sm">جميع الحقوق محفوظة © 2024 - منصة أجي نتعلم الرقمية 🇲🇦</p>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('home');
  const [selectedGrade, setSelectedGrade] = useState<any>(null);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);

  const handleDownload = (num: number) => {
    // الرابط المخصص للفرض الأول في مادة الرياضيات للمستوى الأول ابتدائي (النموذج 1)
    if (selectedGrade?.id === 'p1' && selectedSubject?.id.includes('math') && num === 1) {
      window.open('https://drive.google.com/file/d/1wHSld2YYfV-JoknCJ6WVCW2l9qyn3CkA/view?usp=drive_link', '_blank');
    } else {
      alert(`جاري تجهيز تحميل النموذج ${num}...`);
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <div className="container mx-auto px-4 py-16 animate-fade-in text-center">
            <h2 className="text-4xl font-black text-gray-800 mb-12">مرحباً بك في أجي نتعلم! اختر سلكك التعليمي:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {DATA.levels.map(l => (
                <div key={l.id} onClick={() => setView(`${l.id}-home`)} className="bg-white p-10 rounded-[2rem] border-b-8 border-[#8e44ad] shadow-xl hover:-translate-y-2 transition-all cursor-pointer group">
                  <div className={`w-20 h-20 ${l.color} text-white rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg`}>
                    <i className={`fas ${l.icon}`}></i>
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 mb-4">{l.name}</h3>
                  <button className="text-blue-600 font-bold group-hover:underline">تصفح الآن ←</button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'primary-home':
      case 'middle-home':
      case 'secondary-home':
        const currentLevel = DATA.levels.find(l => `${l.id}-home` === view);
        const grades = view === 'primary-home' ? DATA.primaryGrades : view === 'middle-home' ? DATA.middleGrades : DATA.secondaryGrades;
        
        return (
          <div className="container mx-auto px-4 py-6 animate-fade-in text-right">
            <p className="text-[16px] md:text-lg font-bold text-gray-700 mb-8 mt-4 leading-relaxed">
              دروس، تمارين، فروض، امتحانات جاهزة للتحميل لتلاميذ {currentLevel?.name}.
            </p>
            
            <div className="w-full border-b-[3px] border-[#8e44ad] mb-12 relative h-10">
              <div className="bg-[#8e44ad] text-white px-8 py-2 rounded-t-md font-black text-lg w-fit absolute bottom-0 right-0">
                المرجو اختيار قسم فرعي:
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {grades.map(grade => (
                <div 
                  key={grade.id} 
                  className="bg-[#f3e5f5] p-6 flex items-center justify-center rounded border border-[#8e44ad]/10 hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1 active:scale-95 shadow-sm"
                  onClick={() => { setSelectedGrade(grade); setView('subjects'); }}
                >
                  <div className="text-gray-800 px-4 py-2 font-black text-lg text-center">
                    {grade.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'subjects':
        const gradeSubjects = DATA.subjects[selectedGrade?.id as keyof typeof DATA.subjects] || [];
        return (
          <div className="container mx-auto px-4 py-10 animate-fade-in text-right">
            <h2 className="text-2xl font-black text-gray-700 mb-8 leading-relaxed">
               مواد {selectedGrade?.name} المتاحة للتحميل مجاناً وبجودة عالية.
            </h2>

            <div className="flex justify-start">
              <div className="bg-[#8e44ad] text-white px-8 py-2.5 rounded-t-sm font-black text-lg w-fit">مواضيع هذا القسم:</div>
            </div>
            <div className="border-t-2 border-[#8e44ad] mb-0"></div>

            <div className="bg-white shadow-sm border-x border-b border-gray-100">
               {gradeSubjects.map((s, idx) => (
                  <div key={s.id} className={`p-5 flex items-center justify-start gap-4 hover:bg-gray-50 cursor-pointer transition-all ${idx !== gradeSubjects.length - 1 ? 'border-b border-dotted border-gray-300' : ''}`}
                    onClick={() => { setSelectedSubject(s); setView('exam-samples'); }}>
                      <span className="text-2xl">{s.icon}</span>
                      <span className="text-lg font-bold text-gray-700 hover:text-[#8e44ad]">فروض {s.name} للمستوى {selectedGrade?.name}</span>
                  </div>
               ))}
            </div>

            <button onClick={() => setView('home')} className="mt-12 text-[#8e44ad] font-black flex items-center gap-2 text-sm active:scale-95">العودة للرئيسية <i className="fas fa-arrow-left"></i></button>
          </div>
        );

      case 'exam-samples':
        const isPrimaryExam = selectedGrade?.id.startsWith('p');
        const themeColor = isPrimaryExam ? 'orange' : 'blue';
        const borderColor = isPrimaryExam ? 'border-orange-400' : 'border-blue-400';
        const textColor = isPrimaryExam ? 'text-orange-600' : 'text-blue-600';

        return (
          <div className="container mx-auto px-4 py-6 animate-fade-in text-right">
            <div className={`relative bg-white border-2 ${borderColor} rounded-lg p-8 mb-10 overflow-hidden shadow-sm`} style={{ 
              backgroundImage: `repeating-linear-gradient(${isPrimaryExam ? '#fff7ed' : '#f0f7ff'} 0px, ${isPrimaryExam ? '#fff7ed' : '#f0f7ff'} 1px, transparent 1px, transparent 30px)`,
              backgroundSize: '100% 30px'
            }}>
              <div className={`absolute left-10 top-0 bottom-0 w-[2px] ${isPrimaryExam ? 'bg-orange-200' : 'bg-blue-200'}`}></div>
              <div className="relative z-10 text-center">
                <h2 className="text-2xl font-black text-[#8e44ad] mb-2">نماذج فروض المراقبة المستمرة في مادة</h2>
                <h3 className={`text-3xl font-black ${textColor} mb-2`}>«{selectedSubject?.fullName}»</h3>
                <h4 className="text-xl font-black text-[#8e44ad]">للمستوى {selectedGrade?.name}</h4>
              </div>
            </div>

            <h3 className="text-2xl font-black text-[#8e44ad] mb-4 pr-2 border-r-4 border-[#8e44ad] mr-1">فروض الأسدوس الأول:</h3>

            <div className="overflow-x-auto rounded-md border border-gray-200 shadow-lg mb-10">
              <table className="w-full text-right border-collapse">
                <thead className="bg-[#8e44ad] text-white">
                  <tr>
                    <th className="p-4 border-l border-white/20 font-black">النموذج</th>
                    <th className="p-4 border-l border-white/20 font-black text-center">التحميل</th>
                    <th className="p-4 font-black text-center">مرات التحميل</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {[1, 2, 3, 4].map((num) => (
                    <tr key={num} className={`hover:bg-orange-50 border-b border-gray-100 ${num % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="p-4 border-l border-gray-100 font-bold text-gray-700 text-[15px]">
                        الفرض الأول في مادة «{selectedSubject?.name}» - (النموذج {num})
                        {selectedGrade?.id === 'p1' && selectedSubject?.id.includes('math') && num === 1 && (
                          <span className="mr-2 bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full border border-orange-200 animate-pulse">جديد</span>
                        )}
                      </td>
                      <td className="p-4 border-l border-gray-100 text-center">
                        <button 
                          onClick={() => handleDownload(num)} 
                          className={`text-gray-600 hover:${textColor} active:scale-90 transition-colors`}
                        >
                          <i className={`fas fa-download text-xl ${selectedGrade?.id === 'p1' && selectedSubject?.id.includes('math') && num === 1 ? 'text-orange-500 scale-110' : ''}`}></i>
                        </button>
                      </td>
                      <td className="p-4 text-center font-bold text-gray-600 text-sm">{(Math.random() * 10000 + 500).toFixed(0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button onClick={() => setView('subjects')} className="text-[#8e44ad] font-black flex items-center gap-2 text-sm active:scale-95 bg-white px-4 py-2 rounded border border-[#8e44ad]/20 shadow-sm">
                 <i className="fas fa-arrow-right"></i> العودة لقائمة مواد {selectedGrade?.name}
            </button>
          </div>
        );

      default: return null;
    }
  };

  return (
    <Layout onNavigate={(v) => { setView(v); setSelectedGrade(null); setSelectedSubject(null); }}>
      {renderContent()}
    </Layout>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
