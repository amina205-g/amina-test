
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import GradeSelection from './pages/GradeSelection';
import LevelSubjects from './pages/LevelSubjects';
import SubjectDetail from './pages/SubjectDetail';
import LessonView from './pages/LessonView';
import ExamView from './pages/ExamView';
import Quiz from './pages/Quiz';
import AIQuizGenerator from './pages/AIQuizGenerator';
import Login from './pages/Login';
import Library from './pages/Library';
import ContactUs from './pages/ContactUs';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import SmartAssistant from './components/SmartAssistant';
import { fetchSiteData } from './services/dataService';

const App: React.FC = () => {
  const [siteData, setSiteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  
  // Navigation State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<any | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<any | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
  const [selectedExam, setSelectedExam] = useState<any | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await fetchSiteData();
      setSiteData(data);
      setLoading(false);
    }
    loadData();
  }, []);

  // Ensure scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string, params?: any) => {
    if (page === 'grade-selection') {
      setSelectedCategory(params);
    }
    setCurrentPage(page);
    setIsAssistantOpen(false); // Close assistant on navigation
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#020617]">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <span className="font-black text-white animate-pulse">جاري تحميل أجي نتعلم...</span>
    </div>
  );

  const renderPage = () => {
    switch(currentPage) {
      case 'home': 
        return <Home 
          levels={siteData?.levelCategories} 
          onSelectLevel={(id) => { setSelectedCategory(id); setCurrentPage('grade-selection'); }} 
          onNavigate={handleNavigate} 
          onOpenAssistant={() => setIsAssistantOpen(true)} 
          onOpenQuiz={() => setCurrentPage('ai-quiz-gen')} 
        />;
      
      case 'grade-selection': 
        return <GradeSelection 
          categoryName={selectedCategory === 'primary' ? 'التعليم الابتدائي' : selectedCategory === 'middle' ? 'التعليم الإعدادي' : 'التعليم الثانوي التأهيلي'} 
          grades={siteData?.grades.filter((g: any) => g.category === selectedCategory)} 
          onSelectGrade={(g) => { setSelectedGrade(g); setCurrentPage('level-subjects'); }} 
          onBack={() => setCurrentPage('home')} 
        />;

      case 'level-subjects': 
        return <LevelSubjects 
          level={selectedGrade?.id} 
          levelName={selectedGrade?.name} 
          subjects={siteData?.subjects.filter((s: any) => s.gradeIds.includes(selectedGrade?.id))} 
          onSelectSubject={(s) => { setSelectedSubject(s); setCurrentPage('subject-detail'); }} 
          onBack={() => setCurrentPage('grade-selection')} 
        />;

      case 'subject-detail': 
        return <SubjectDetail 
          subject={selectedSubject!} 
          lessons={siteData?.lessons.filter((l: any) => l.subjectId === selectedSubject.id && l.gradeId === selectedGrade.id)} 
          exams={siteData?.exams.filter((e: any) => e.subjectId === selectedSubject.id && e.gradeId === selectedGrade.id)} 
          onSelectLesson={(l) => { setSelectedLesson(l); setCurrentPage('lesson-view'); }} 
          onSelectExam={(e) => { setSelectedExam(e); setCurrentPage('exam-view'); }} 
          onSelectQuiz={() => setCurrentPage('quiz')} 
          onBack={() => setCurrentPage('level-subjects')}
        />;

      case 'lesson-view': 
        return <LessonView lesson={selectedLesson!} onBack={() => setCurrentPage('subject-detail')} />;
      
      case 'exam-view': 
        return <ExamView exam={selectedExam!} subject={selectedSubject!} onBack={() => setCurrentPage('subject-detail')} />;
      
      case 'quiz': 
        return <Quiz subject={selectedSubject} levelName={selectedGrade?.name} onBack={() => setCurrentPage('subject-detail')} />;
      
      case 'library': 
        return <Library resources={siteData?.libraryResources} onBack={() => setCurrentPage('home')} onSelectExam={(e, subId) => {
          const sub = siteData?.subjects.find((s: any) => s.id === subId);
          setSelectedSubject(sub);
          setSelectedExam(e);
          setCurrentPage('exam-view');
        }} />;
      
      case 'ai-quiz-gen': 
        return <AIQuizGenerator onBack={() => setCurrentPage('home')} />;
      
      case 'login': 
        return <Login onLogin={() => setCurrentPage('home')} />;
      
      case 'contact': 
        return <ContactUs onBack={() => setCurrentPage('home')} />;
      
      case 'faq': 
        return <FAQ onBack={() => setCurrentPage('home')} />;
      
      case 'privacy': 
        return <PrivacyPolicy onBack={() => setCurrentPage('home')} />;
      
      case 'terms': 
        return <TermsOfUse onBack={() => setCurrentPage('home')} />;

      case 'about':
        return (
          <div className="container mx-auto px-4 py-20 text-right">
             <h1 className="text-5xl font-black mb-10">من نحن؟</h1>
             <p className="text-xl text-slate-400 font-bold leading-relaxed max-w-4xl">
               أجي نتعلم هي منصة تعليمية رقمية مغربية تهدف إلى تبسيط المناهج الدراسية وتقديمها بأسلوب تفاعلي يعتمد على أحدث تقنيات الذكاء الاصطناعي.
             </p>
          </div>
        );

      default: 
        return <Home 
          levels={siteData?.levelCategories} 
          onSelectLevel={(id) => { setSelectedCategory(id); setCurrentPage('grade-selection'); }} 
          onNavigate={handleNavigate} 
          onOpenAssistant={() => setIsAssistantOpen(true)} 
          onOpenQuiz={() => setCurrentPage('ai-quiz-gen')} 
        />;
    }
  };

  return (
    <Layout onNavigate={handleNavigate} currentPage={currentPage}>
      <div className="animate-fade-in min-h-[70vh]">
        {renderPage()}
      </div>
      <SmartAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </Layout>
  );
};

export default App;
