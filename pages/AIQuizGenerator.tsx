
import React, { useState } from 'react';
import { generateAIQuiz } from '../services/gemini';
import Quiz from './Quiz';

const AIQuizGenerator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('إعدادي');
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizData, setQuizData] = useState<any[] | null>(null);

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    const questions = await generateAIQuiz(topic, level);
    if (questions && questions.length > 0) {
      setQuizData(questions);
    } else {
      alert("عذراً، لم أستطع توليد تمارين لهذا الموضوع حالياً. جرب موضوعاً آخر.");
    }
    setIsGenerating(false);
  };

  if (quizData) {
    return (
      <Quiz 
        customQuestions={quizData}
        title={topic}
        onBack={() => setQuizData(null)}
      />
    );
  }

  return (
    <div className="py-16 bg-blue-50 min-h-screen text-right">
      <div className="container mx-auto px-4 max-w-2xl">
        <button onClick={onBack} className="text-blue-600 font-bold mb-8 flex items-center gap-2 hover:mr-2 transition-all">
          ← العودة للرئيسية
        </button>

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-100">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🧠</div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">مولد التمارين الذكي</h1>
            <p className="text-gray-600">اختر موضوعاً ودع ذكاءنا الاصطناعي يختبر معلوماتك فوراً</p>
          </div>

          <form onSubmit={handleStart} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-3">عن ماذا تريد التمرن اليوم؟</label>
              <input 
                type="text" 
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="مثلاً: التركيب الضوئي، الحرب العالمية الثانية، المعادلات..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-3">المستوى الدراسي</label>
              <div className="grid grid-cols-3 gap-3">
                {['ابتدائي', 'إعدادي', 'ثانوي'].map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLevel(l)}
                    className={`py-3 rounded-xl font-bold transition ${
                      level === l ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 rounded-2xl font-bold text-xl hover:shadow-lg transition-all transform hover:-translate-y-1 disabled:opacity-50"
            >
              {isGenerating ? 'جاري توليد التمارين...' : 'ابدأ الاختبار الذكي الآن'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex items-start gap-3">
            <span className="text-xl">💡</span>
            <p className="text-sm text-yellow-800 leading-relaxed">
              سيقوم المساعد الذكي بإنشاء 5 أسئلة مخصصة لك مع شرح مفصل لكل إجابة لضمان فهمك العميق للموضوع.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIQuizGenerator;
