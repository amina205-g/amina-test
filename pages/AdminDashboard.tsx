
import React, { useState } from 'react';

const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeForm, setActiveForm] = useState<'lesson' | 'exam' | 'deploy'>('lesson');
  const [generatedJson, setGeneratedJson] = useState('');

  const [lessonForm, setLessonForm] = useState({
    id: '', subjectId: '', gradeId: '', unit: '', title: '', content: '', pdfUrl: ''
  });

  const [examForm, setExamForm] = useState({
    id: '', subjectId: '', gradeId: '', title: '', year: 2024, semester: 1, term: 1, model: 1, type: 'assignment', fileUrl: '', hasCorrection: true
  });

  const generateLesson = () => {
    const json = JSON.stringify(lessonForm, null, 2);
    setGeneratedJson(json);
  };

  const generateExam = () => {
    const json = JSON.stringify(examForm, null, 2);
    setGeneratedJson(json);
  };

  return (
    <div className="py-12 bg-gray-900 min-h-screen text-right text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-10 flex-row-reverse">
          <h1 className="text-3xl font-black">إدارة المحتوى والرفع</h1>
          <button onClick={onBack} className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20">خروج</button>
        </div>

        <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
          <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 flex-row-reverse overflow-x-auto">
            <button 
              onClick={() => setActiveForm('lesson')}
              className={`px-6 py-2 rounded-full font-bold transition whitespace-nowrap ${activeForm === 'lesson' ? 'bg-blue-600' : 'bg-white/10'}`}
            >إضافة درس</button>
            <button 
              onClick={() => setActiveForm('exam')}
              className={`px-6 py-2 rounded-full font-bold transition whitespace-nowrap ${activeForm === 'exam' ? 'bg-blue-600' : 'bg-white/10'}`}
            >إضافة فرض/امتحان</button>
            <button 
              onClick={() => setActiveForm('deploy')}
              className={`px-6 py-2 rounded-full font-bold transition whitespace-nowrap ${activeForm === 'deploy' ? 'bg-green-600' : 'bg-white/10'}`}
            >دليل الرفع (Hostinger)</button>
          </div>

          {activeForm !== 'deploy' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right" dir="rtl">
              {activeForm === 'lesson' ? (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1 opacity-60">معرف الدرس (فريد)</label>
                      <input className="w-full bg-white/10 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="l_math_1" onChange={e => setLessonForm({...lessonForm, id: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 opacity-60">معرف المادة (مثل math_fr)</label>
                      <input className="w-full bg-white/10 rounded-lg p-3 outline-none" placeholder="math_fr" onChange={e => setLessonForm({...lessonForm, subjectId: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 opacity-60">معرف المستوى (مثل s3)</label>
                      <input className="w-full bg-white/10 rounded-lg p-3 outline-none" placeholder="s3" onChange={e => setLessonForm({...lessonForm, gradeId: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1 opacity-60">عنوان الوحدة</label>
                      <input className="w-full bg-white/10 rounded-lg p-3 outline-none" placeholder="الجبر" onChange={e => setLessonForm({...lessonForm, unit: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 opacity-60">عنوان الدرس</label>
                      <input className="w-full bg-white/10 rounded-lg p-3 outline-none" placeholder="الأعداد العقدية" onChange={e => setLessonForm({...lessonForm, title: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 opacity-60">رابط PDF</label>
                      <input className="w-full bg-white/10 rounded-lg p-3 outline-none" placeholder="https://..." onChange={e => setLessonForm({...lessonForm, pdfUrl: e.target.value})} />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <button onClick={generateLesson} className="w-full bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-700 transition">توليد كود الدرس</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1 opacity-60">العنوان</label>
                      <input className="w-full bg-white/10 rounded-lg p-3 outline-none" placeholder="الفرض 1 النموذج 1" onChange={e => setExamForm({...examForm, title: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 opacity-60">الدورة (1 أو 2)</label>
                      <input type="number" className="w-full bg-white/10 rounded-lg p-3 outline-none" onChange={e => setExamForm({...examForm, semester: Number(e.target.value) as 1|2})} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 opacity-60">رقم الفرض (1، 2، 3)</label>
                      <input type="number" className="w-full bg-white/10 rounded-lg p-3 outline-none" onChange={e => setExamForm({...examForm, term: Number(e.target.value)})} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1 opacity-60">رابط الملف</label>
                      <input className="w-full bg-white/10 rounded-lg p-3 outline-none" placeholder="https://..." onChange={e => setExamForm({...examForm, fileUrl: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 opacity-60">السنة</label>
                      <input type="number" className="w-full bg-white/10 rounded-lg p-3 outline-none" defaultValue={2024} onChange={e => setExamForm({...examForm, year: Number(e.target.value)})} />
                    </div>
                    <div className="flex items-center gap-4 py-4">
                      <input type="checkbox" checked={examForm.hasCorrection} onChange={e => setExamForm({...examForm, hasCorrection: e.target.checked})} />
                      <label>يحتوي على تصحيح؟</label>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <button onClick={generateExam} className="w-full bg-green-600 py-4 rounded-xl font-bold hover:bg-green-700 transition">توليد كود الفرض/الامتحان</button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6 text-right" dir="rtl">
              <h2 className="text-2xl font-bold text-green-400">دليل الرفع على Hostinger</h2>
              <div className="bg-black/30 p-6 rounded-xl space-y-4 text-gray-300 leading-relaxed">
                <p>1. قم بتحميل كافة الملفات البرمجية من المنصة.</p>
                <p>2. سجل دخولك إلى لوحة hPanel في هوستنجر.</p>
                <p>3. اذهب إلى <span className="text-white font-bold">File Manager</span> ثم مجلد <span className="text-white font-bold">public_html</span>.</p>
                <p>4. ارفع كافة الملفات هناك مباشرة.</p>
                <p>5. الموقع سيعمل تلقائياً بمجرد طلب الرابط الخاص بك.</p>
              </div>
              <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-xl text-yellow-200 text-sm">
                ملاحظة: تأكد من أن ملف <strong>index.html</strong> موجود في المجلد الرئيسي للاستضافة.
              </div>
            </div>
          )}

          {generatedJson && activeForm !== 'deploy' && (
            <div className="mt-10">
              <label className="block text-sm mb-2 text-yellow-400 font-bold">قم بنسخ هذا الكود وأضفه إلى مصفوفة الدروس أو الامتحانات في ملف data.json:</label>
              <pre className="bg-black/50 p-6 rounded-xl overflow-x-auto text-sm text-blue-300 border border-white/10">
                {generatedJson}
              </pre>
              <button 
                onClick={() => { navigator.clipboard.writeText(generatedJson); alert('تم النسخ!'); }}
                className="mt-4 bg-white/10 px-6 py-2 rounded-lg text-sm hover:bg-white/20"
              >نسخ الكود</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
