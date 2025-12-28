
import React, { useState } from 'react';

const FAQ: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const faqs = [
    {
      q: "كيف يمكنني الوصول إلى الامتحانات الوطنية؟",
      a: "يمكنك الوصول إليها عبر اختيار المستوى 'الثانية باكالوريا' ثم اختيار المادة، أو عبر التوجه مباشرة إلى 'المكتبة الرقمية' من القائمة الرئيسية."
    },
    {
      q: "هل خدمة المساعد الذكي مجانية؟",
      a: "نعم، حالياً جميع خدمات الذكاء الاصطناعي بما فيها المساعد الذكي ومولد التمارين متاحة مجاناً لجميع تلاميذ منصة أجي نتعلم."
    },
    {
      q: "كيف أستخدم مولد التمارين الذكي؟",
      a: "من الصفحة الرئيسية، اضغط على 'جرب المولد الذكي'، ثم اكتب اسم الدرس أو المفهوم الذي تريد التدرب عليه، وسيقوم النظام بإنشاء أسئلة مخصصة لك."
    },
    {
      q: "لماذا تظهر المواد العلمية بالفرنسية؟",
      a: "لأن المنصة تدعم المسالك الدولية (BIOF) في المغرب والعالم العربي، حيث يتم تدريس المواد العلمية باللغة الفرنسية في السلكين الإعدادي والثانوي."
    },
    {
      q: "هل يمكنني تحميل الدروس لمراجعتها دون إنترنت؟",
      a: "بالتأكيد، يمكنك ضغط زر 'تحميل PDF' الموجود في صفحة كل درس أو امتحان لحفظ الملف على جهازك."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-16 bg-gray-50 min-h-screen text-right">
      <div className="container mx-auto px-4 max-w-3xl">
        <button 
          onClick={onBack}
          className="text-blue-600 font-bold mb-8 hover:mr-2 transition-all flex items-center gap-2"
        >
          → العودة للرئيسية
        </button>
        
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">الأسئلة الشائعة</h1>
          <p className="text-gray-600">كل ما تحتاج معرفته حول منصة أجي نتعلم وكيفية الاستفادة منها.</p>
        </header>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-right font-bold text-lg text-gray-800 hover:bg-gray-50 transition"
              >
                <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>▼</span>
                <span>{faq.q}</span>
              </button>
              {openIndex === index && (
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-600 rounded-3xl p-8 text-white text-center shadow-xl">
          <h3 className="text-xl font-bold mb-2">لم تجد إجابتك؟</h3>
          <p className="mb-6 text-blue-100">فريق الدعم الخاص بنا جاهز لمساعدتك في أي وقت.</p>
          <button 
            onClick={() => window.location.hash = 'contact'} // Or logic to navigate to contact
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition"
          >
            راسلنا الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
