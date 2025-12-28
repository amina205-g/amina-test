
import React, { useState, useMemo } from 'react';

interface LibraryResource {
  id: string;
  title: string;
  subject: string;
  level: string;
  type: 'Summary' | 'Exam' | 'PDF' | string;
  fileUrl: string;
  subjectId?: string;
  gradeId?: string;
}

interface LibraryProps {
  resources: LibraryResource[];
  onBack: () => void;
  onSelectExam?: (exam: any, subjectId: string) => void;
}

const Library: React.FC<LibraryProps> = ({ resources = [], onBack, onSelectExam }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const resourceTypes = [
    { id: 'all', label: 'الكل', icon: 'fa-layer-group', color: 'blue' },
    { id: 'Summary', label: 'ملخصات', icon: 'fa-file-lines', color: 'emerald' },
    { id: 'Exam', label: 'امتحانات', icon: 'fa-graduation-cap', color: 'indigo' },
    { id: 'PDF', label: 'كتب PDF', icon: 'fa-book', color: 'red' },
  ];

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           res.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'all' || res.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [resources, searchTerm, activeFilter]);

  const handleDownload = (url: string, title: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    } else {
      alert("عذراً، هذا الملف متاح للمعاينة فقط في النسخة التجريبية حالياً.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 animate-fade-in font-['Cairo']">
      {/* Premium Hero Header */}
      <section className="relative pt-24 pb-40 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-48 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <button 
            onClick={onBack}
            className="group mb-12 flex items-center gap-3 text-blue-600 font-black transition-all hover:gap-5 flex-row-reverse mr-auto"
          >
            <i className="fas fa-arrow-right"></i>
            <span>العودة للرئيسية</span>
          </button>

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-6 py-2 rounded-full text-xs font-black mb-8 border border-blue-100 shadow-sm">
              <i className="fas fa-sparkles"></i>
              أكبر مستودع رقمي للمناهج المغربية
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 leading-[1.1]">
              اكتشف عالم <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">المعرفة الرقمية</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium mb-16 leading-relaxed max-w-2xl mx-auto">
              تصفح آلاف الموارد التعليمية المصنفة بدقة عالية لمساعدتك في رحلة النجاح والتفوق.
            </p>

            {/* Smart Floating Search Bar */}
            <div className="relative max-w-3xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-[3rem] blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white/80 backdrop-blur-2xl p-3 rounded-[2.5rem] shadow-2xl shadow-blue-100 border border-white flex items-center gap-2 transition-all">
                <div className="w-16 h-14 flex items-center justify-center text-slate-300 text-2xl group-focus-within:text-blue-600 transition-colors">
                  <i className="fas fa-search"></i>
                </div>
                <input 
                  type="text" 
                  placeholder="ابحث عن دروس، امتحانات، أو ملخصات..."
                  className="flex-grow bg-transparent border-none py-4 px-2 text-xl outline-none font-bold text-slate-800 text-right placeholder-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="hidden lg:flex gap-2 ml-2">
                  <span className="bg-slate-50 text-slate-400 px-4 py-3 rounded-2xl text-xs font-black border border-slate-100">
                    {filteredResources.length} نتيجة
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Filter System */}
      <section className="container mx-auto px-4 -mt-16 mb-20 relative z-20">
        <div className="flex flex-wrap justify-center gap-4">
          {resourceTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setActiveFilter(type.id)}
              className={`flex items-center gap-4 px-10 py-5 rounded-[2rem] font-black transition-all border-2 ${
                activeFilter === type.id 
                ? 'bg-slate-900 border-slate-900 text-white shadow-2xl shadow-slate-200 -translate-y-2' 
                : 'bg-white border-white text-slate-400 hover:border-blue-100 hover:text-blue-600 shadow-lg shadow-slate-100'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeFilter === type.id ? 'bg-white/10' : 'bg-slate-50'}`}>
                <i className={`fas ${type.icon} ${activeFilter === type.id ? 'text-white' : ''}`}></i>
              </div>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Resources Masonry Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredResources.map((res, index) => (
            <div 
              key={res.id} 
              className="group bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 flex flex-col relative overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Glassmorphism Badge */}
              <div className="absolute top-8 left-8 z-10">
                <div className={`px-4 py-2 rounded-2xl backdrop-blur-md font-black text-[10px] uppercase tracking-widest ${
                  res.type === 'PDF' ? 'bg-red-50 text-red-600' : 
                  res.type === 'Exam' ? 'bg-blue-50 text-blue-600' : 
                  'bg-emerald-50 text-emerald-600'
                }`}>
                  {res.type}
                </div>
              </div>

              {/* Decorative Icon Background */}
              <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full opacity-5 group-hover:scale-150 group-hover:rotate-12 transition-transform duration-700 ${
                res.type === 'PDF' ? 'bg-red-500' : res.type === 'Exam' ? 'bg-blue-500' : 'bg-emerald-500'
              }`}></div>

              <div className="mb-10 relative z-10 flex flex-col items-end">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-inner ${
                  res.type === 'PDF' ? 'bg-red-50 text-red-600' : 
                  res.type === 'Exam' ? 'bg-blue-50 text-blue-600' : 
                  'bg-emerald-50 text-emerald-600'
                }`}>
                  <i className={`fas ${
                    res.type === 'PDF' ? 'fa-file-pdf' : 
                    res.type === 'Exam' ? 'fa-graduation-cap' : 
                    'fa-book-open-reader'
                  }`}></i>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-2">
                    <span className="text-blue-600 font-black text-xs">{res.level}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-tighter">{res.subject}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                    {res.title}
                  </h3>
                </div>
              </div>

              {/* Interactive Footer Actions */}
              <div className="mt-auto pt-8 border-t border-slate-50 flex gap-4 relative z-10">
                <button 
                  onClick={() => handleDownload(res.fileUrl, res.title)}
                  className="flex-1 bg-slate-50 text-slate-600 py-5 rounded-[1.8rem] font-black hover:bg-slate-100 transition-all flex items-center justify-center gap-3 group/btn"
                >
                  <i className="fas fa-download text-sm group-hover/btn:translate-y-1 transition-transform"></i>
                  <span>تحميل</span>
                </button>
                <button 
                  onClick={() => {
                    if (onSelectExam) {
                      onSelectExam({
                        id: res.id,
                        title: res.title,
                        year: 2024,
                        type: 'national',
                        fileUrl: res.fileUrl || '#',
                        subjectId: res.subjectId || 'math_fr',
                        gradeId: res.gradeId || 's3'
                      }, res.subjectId || 'math_fr');
                    }
                  }}
                  className="flex-[1.5] bg-blue-600 text-white py-5 rounded-[1.8rem] font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3"
                >
                  <i className="fas fa-eye text-sm"></i>
                  <span>معاينة ذكية</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Redesign */}
        {filteredResources.length === 0 && (
          <div className="max-w-3xl mx-auto text-center py-40 px-10 bg-white rounded-[4rem] border-4 border-dashed border-slate-100">
            <div className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center text-7xl mx-auto mb-10 animate-bounce">
              <i className="fas fa-search-minus text-blue-200"></i>
            </div>
            <h3 className="text-4xl font-black text-slate-800 mb-6">عذراً، لم نجد ما تبحث عنه</h3>
            <p className="text-slate-400 font-bold text-xl mb-12 leading-relaxed">
              تأكد من كتابة الكلمات بشكل صحيح أو جرب اختيار تصنيف مختلف من القائمة العلوية.
            </p>
            <button 
              onClick={() => {setSearchTerm(''); setActiveFilter('all');}}
              className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
            >
              عرض كافة الموارد المتاحة
            </button>
          </div>
        )}
      </section>

      {/* Global Education Stats Section */}
      <section className="container mx-auto px-4 mt-32 mb-12">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10 text-center">
            <div className="space-y-4">
              <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600">+5K</div>
              <div className="text-blue-200 font-black text-sm uppercase tracking-[0.3em]">ملف تعليمي</div>
              <p className="text-slate-400 text-sm font-medium">محتوى متجدد يومياً لمواكبة المقرر</p>
            </div>
            <div className="space-y-4">
              <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-600">100%</div>
              <div className="text-emerald-200 font-black text-sm uppercase tracking-[0.3em]">دقة وموثوقية</div>
              <p className="text-slate-400 text-sm font-medium">محتوى مراجع من قبل أساتذة مختصين</p>
            </div>
            <div className="space-y-4">
              <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-purple-600">AI</div>
              <div className="text-purple-200 font-black text-sm uppercase tracking-[0.3em]">دعم ذكي</div>
              <p className="text-slate-400 text-sm font-medium">معاينة ذكية وشروحات فورية للمحتوى</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="container mx-auto px-4 text-center text-slate-400 py-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <span className="font-black text-slate-600">أجي نتعلم - المكتبة</span>
        </div>
        <p className="text-xs font-bold uppercase tracking-widest">تطوير مستمر لخدمة تلميذ المغرب 🇲🇦</p>
      </footer>
    </div>
  );
};

export default Library;
