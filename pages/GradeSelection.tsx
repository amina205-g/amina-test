
import React from 'react';
import { Grade, LevelCategory } from '../types';

interface GradeSelectionProps {
  categoryName: string;
  grades: Grade[];
  onSelectGrade: (grade: Grade) => void;
  onBack: () => void;
}

const GradeSelection: React.FC<GradeSelectionProps> = ({ categoryName, grades, onSelectGrade, onBack }) => {
  return (
    <div className="py-12 md:py-24 bg-[#020617] min-h-screen font-['Cairo'] text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Back Button (Prominent) */}
        <div className="flex justify-end mb-10">
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-blue-400 font-black hover:bg-white/10 transition-all active:scale-95"
          >
            <span className="text-sm">العودة للرئيسية</span>
            <i className="fas fa-arrow-left"></i>
          </button>
        </div>

        {/* Page Header */}
        <header className="mb-12 md:mb-20 text-center md:text-right">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-xs font-black mb-4">اختيار المستوى</div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">{categoryName}</h1>
          <p className="text-slate-500 font-bold max-w-2xl md:ml-0 md:mr-auto">اختر السنة الدراسية المناسبة للوصول إلى كافة الموارد التعليمية المتاحة.</p>
        </header>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {grades.length > 0 ? (
            grades.map((grade) => (
              <div 
                key={grade.id}
                onClick={() => onSelectGrade(grade)}
                className="group relative bg-slate-900/40 p-8 rounded-[2rem] border border-white/5 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-500 cursor-pointer overflow-hidden shadow-lg"
              >
                {/* Decoration */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform"></div>
                
                <div className="flex flex-col md:flex-row-reverse items-center justify-between text-center md:text-right gap-6 relative z-10">
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-4xl shadow-2xl group-hover:scale-110 transition-transform group-hover:bg-blue-600/20 group-hover:text-blue-500">
                    {grade.icon}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black mb-2 group-hover:text-blue-400 transition-colors">{grade.name}</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">تصفح المحتوى الكامل</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-white/5">
              <i className="fas fa-box-open text-4xl text-slate-700 mb-6 block"></i>
              <p className="text-slate-500 font-black italic">قريباً سيتم إضافة المواد لهذا القسم...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradeSelection;
