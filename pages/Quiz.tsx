
import React, { useState, useEffect } from 'react';
import { generateAIQuiz } from '../services/gemini';
import { Subject } from '../types';

interface QuizProps {
  subject?: Subject;
  levelName?: string;
  customQuestions?: any[];
  title?: string;
  onBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ subject, levelName, customQuestions, title, onBack }) => {
  const [questions, setQuestions] = useState<any[]>(customQuestions || []);
  const [loading, setLoading] = useState(!customQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const loadQuestions = async () => {
    if (customQuestions) return;
    setLoading(true);
    const aiQuestions = await generateAIQuiz(subject?.name || "", levelName || "");
    if (aiQuestions && aiQuestions.length > 0) {
      setQuestions(aiQuestions);
    } else {
      alert("عذراً، لم أستطع توليد الأسئلة الآن.");
      onBack();
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!customQuestions) {
      loadQuestions();
    }
  }, [subject, levelName]);

  const handleCheck = () => {
    if (selectedOption === null) return;
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center bg-blue-50 min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-blue-900 italic">مساعدنا الذكي يجهز لك تحدياً جديداً...</h2>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="py-20 text-center container mx-auto px-4">
        <div className="bg-white p-12 rounded-2xl shadow-lg max-w-2xl mx-auto border border-blue-100">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-3xl font-bold mb-4">انتهى الاختبار!</h2>
          <p className="text-xl text-gray-600 mb-8 font-semibold">
            نتيجتك هي: <span className="text-blue-600 text-3xl">{score}</span> من <span className="text-gray-400">{questions.length}</span>
          </p>
          <div className="flex gap-4 justify-center">
            <button 
                onClick={onBack}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
            >العودة</button>
            {!customQuestions && (
              <button 
                  onClick={() => {
                    setCurrentQuestion(0);
                    setIsFinished(false);
                    setScore(0);
                    setSelectedOption(null);
                    setShowResult(false);
                    loadQuestions();
                  }}
                  className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
              >أسئلة جديدة</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="py-12 bg-gray-50 min-h-screen text-right">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex justify-between items-center mb-8 flex-row-reverse">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{title || 'تمرين تفاعلي'}</h2>
            <p className="text-blue-600 font-semibold">{subject?.name || 'موضوع خاص'}</p>
          </div>
          <span className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold shadow-md">
             {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
          <h3 className="text-2xl font-bold text-gray-800 mb-10 leading-relaxed">{q.question}</h3>
          
          <div className="space-y-4">
            {q.options.map((opt: string, i: number) => (
              <button
                key={i}
                onClick={() => !showResult && setSelectedOption(i)}
                className={`w-full text-right p-5 rounded-2xl border-2 transition-all font-bold text-lg flex justify-between items-center ${
                  showResult 
                    ? i === q.correctAnswer 
                      ? 'bg-green-50 border-green-500 text-green-700' 
                      : i === selectedOption ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white border-gray-100 opacity-50'
                    : selectedOption === i ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-white border-gray-100 hover:border-blue-200'
                }`}
              >
                <span>{opt}</span>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 animate-fade-in">
              <h4 className="font-bold text-blue-800 mb-2">💡 شرح المساعد الذكي:</h4>
              <p className="text-blue-700 leading-relaxed">{q.explanation}</p>
            </div>
          )}

          <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
            {!showResult ? (
              <button 
                onClick={handleCheck}
                disabled={selectedOption === null}
                className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50"
              >تحقق من الإجابة</button>
            ) : (
              <button 
                onClick={handleNext}
                className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-indigo-700"
              >{currentQuestion < questions.length - 1 ? 'السؤال التالي' : 'النتيجة النهائية'}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
