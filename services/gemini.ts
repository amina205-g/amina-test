
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askAssistant(prompt: string, context?: string) {
  try {
    const systemInstruction = `أنت "مساعد أجي نتعلم الذكي" (Pro Edition). خبير في المنهج المغربي.
    - قدم شروحات بيداغوجية عميقة ومبسطة.
    - للمواد العلمية، استخدم المصطلحات الفرنسية والرموز الرياضية بدقة.
    - كن مشجعاً واستخدم أمثلة من الواقع المغربي لتسهيل الفهم.
    - نسق مخرجاتك باستخدام Markdown، استخدم العناوين والخط العريض للجمل الهامة.
    ${context ? `سياق الدرس الحالي: ${context}` : ""}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
        thinkingConfig: { thinkingBudget: 8000 }
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "عذراً يا بطل، واجهت مشكلة تقنية بسيطة. أعد المحاولة بعد قليل.";
  }
}

export async function generateAIQuiz(topic: string, level: string) {
  try {
    const prompt = `Generate 5 high-quality MCQ for "${topic}" at level "${level}". 
    The questions should follow the Moroccan standard curriculum style.
    Include 4 options for each question and a pedagogical explanation for the correct answer.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a senior education officer. Return ONLY a valid JSON array.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Quiz Generator Error:", error);
    return null;
  }
}

export async function explainConcept(concept: string) {
  return askAssistant(`اشرح لي مفهوم "${concept}" بتبسيط شديد مع مثال توضيحي.`);
}

// FIX: Added generateMockExam function to provide exam content preview as expected by ExamView.tsx
export async function generateMockExam(subject: string, year: number, title: string) {
  try {
    const prompt = `أريد توليد معاينة نصية دقيقة لامتحان في مادة ${subject}. 
    العنوان: ${title}
    السنة: ${year}
    يجب أن يتضمن الامتحان أسئلة نموذجية (مثلاً: الجزء الأول: استرداد المعارف، الجزء الثاني: الاستدلال العلمي...). 
    للمواد العلمية، استخدم المصطلحات الفرنسية والرموز الرياضية.
    نسق المحتوى باستخدام Markdown.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: "أنت خبير في وضع الامتحانات للمنهاج المغربي. قم بتوليد محتوى امتحان واقعي وشامل للمستوى المطلوب.",
        temperature: 0.7
      }
    });

    return response.text;
  } catch (error) {
    console.error("Mock Exam Generator Error:", error);
    return null;
  }
}
