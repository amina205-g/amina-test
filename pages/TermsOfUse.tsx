
import React from 'react';

const TermsOfUse: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <button 
          onClick={onBack}
          className="text-blue-600 font-bold mb-8 hover:mr-2 transition-all flex items-center gap-2"
        >
          → العودة للرئيسية
        </button>
        
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-6">شروط الاستخدام</h1>
          
          <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-6 text-lg">
            <section>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">1. قبول الشروط</h2>
              <p>بمجرد دخولك إلى موقع "أجي نتعلم"، فإنك توافق على الالتزام بشروط الاستخدام الموضحة أدناه وجميع القوانين واللوائح المعمول بها.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">2. حقوق الملكية الفكرية</h2>
              <p>جميع المحتويات الموجودة على الموقع من دروس، ملخصات، تمارين، وفيديوهات هي ملك لمنصة "أجي نتعلم" أو مرخصة لنا. يُمنع منعاً باتاً إعادة نشر المحتوى لأغراض تجارية دون إذن كتابي.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">3. استخدام المحتوى التعليمي</h2>
              <p>يُسمح للتلاميذ بتحميل ملفات PDF وطباعتها لأغراض الدراسة الشخصية فقط. لا يجوز تعديل هذه الملفات أو إزالة شعار الموقع منها.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">4. سلوك المستخدم</h2>
              <p>يجب على المستخدمين عدم استخدام الموقع لأي غرض غير قانوني، ويمنع محاولة اختراق الموقع أو تعطيل خدماته بأي شكل من الأشكال.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">5. إخلاء المسؤولية</h2>
              <p>بينما نسعى جاهدين لضمان دقة المعلومات والدروس، إلا أن المنصة لا تتحمل مسؤولية أي أخطاء مطبعية أو تغييرات مفاجئة في المقررات الدراسية الرسمية.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
