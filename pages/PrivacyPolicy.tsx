
import React from 'react';

const PrivacyPolicy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
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
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-6">سياسة الخصوصية</h1>
          
          <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-6 text-lg">
            <section>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">1. مقدمة</h2>
              <p>نحن في "أجي نتعلم" نولي أهمية قصوى لخصوصية طلابنا. تهدف هذه السياسة إلى توضيح كيفية جمع واستخدام وحماية بياناتك الشخصية عند استخدام منصتنا التعليمية.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">2. المعلومات التي نجمعها</h2>
              <ul className="list-disc pr-6 space-y-2">
                <li>المعلومات الشخصية: الاسم والبريد الإلكتروني عند إنشاء حساب.</li>
                <li>بيانات الاستخدام: الدروس التي تمت مشاهدتها، والنتائج في الاختبارات التفاعلية.</li>
                <li>ملفات تعريف الارتباط (Cookies): لتحسين تجربة المستخدم وحفظ تفضيلات اللغة والمستوى الدراسي.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">3. كيف نستخدم معلوماتك</h2>
              <p>نستخدم البيانات لتحسين المحتوى التعليمي، وتخصيص تجربة التعلم، وإرسال تنبيهات حول الدروس الجديدة أو تحديثات الامتحانات الوطنية.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">4. حماية البيانات</h2>
              <p>نستخدم تقنيات تشفير متطورة لحماية بيانات الطلاب، ولا نقوم ببيع أو مشاركة أي بيانات شخصية مع أطراف ثالثة لأغراض تجارية.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">5. خصوصية القاصرين</h2>
              <p>نظراً لأن منصتنا موجهة لتلاميذ الابتدائي والإعدادي والثانوي، فنحن نحث أولياء الأمور على مراقبة نشاط أبنائهم التعليمي عبر الإنترنت.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
