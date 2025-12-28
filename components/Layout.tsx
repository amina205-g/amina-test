
import React, { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string, params?: any) => void;
  currentPage: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'secondary', label: 'الثانوي', icon: 'fa-graduation-cap' },
    { id: 'middle', label: 'الإعدادي', icon: 'fa-book-open' },
    { id: 'primary', label: 'الابتدائي', icon: 'fa-child' },
    { id: 'library', label: 'المكتبة', icon: 'fa-vault' },
  ];

  const socialLinks = [
    { id: 'facebook', icon: 'facebook-f', url: 'https://facebook.com/ajitnaalam', label: 'فيسبوك', hoverColor: 'hover:bg-blue-600' },
    { id: 'youtube', icon: 'youtube', url: 'https://youtube.com/@ajitnaalam', label: 'يوتيوب', hoverColor: 'hover:bg-red-600' },
    { id: 'instagram', icon: 'instagram', url: 'https://instagram.com/ajitnaalam', label: 'إنستغرام', hoverColor: 'hover:bg-pink-600' },
    { id: 'whatsapp', icon: 'whatsapp', url: 'https://wa.me/212600000000', label: 'واتساب', hoverColor: 'hover:bg-green-600' },
    { id: 'telegram', icon: 'telegram', url: 'https://t.me/ajitnaalam', label: 'تليجرام', hoverColor: 'hover:bg-blue-400' }
  ];

  const handleLinkClick = (page: string, params?: any) => {
    onNavigate(page, params);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-['Cairo'] bg-[#020617] text-white selection:bg-blue-500/30">
      {/* --- PROFESSIONAL HEADER --- */}
      <header 
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          scrolled ? 'bg-[#020617]/80 backdrop-blur-xl py-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] border-b border-white/5' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Left: Desktop Login */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => handleLinkClick('login')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-2xl font-black transition-all shadow-xl shadow-blue-900/20 active:scale-95 text-sm"
            >
              تسجيل الدخول
            </button>
            <div className="w-[1px] h-6 bg-white/10 mx-2"></div>
            <button onClick={() => handleLinkClick('contact')} className="text-slate-400 hover:text-white transition font-bold text-sm">اتصل بنا</button>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => handleLinkClick('home')} 
              className={`font-black text-sm transition-all relative group ${currentPage === 'home' ? 'text-blue-500' : 'text-slate-400 hover:text-white'}`}
            >
              الرئيسية
              {currentPage === 'home' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full"></span>}
            </button>
            {navLinks.map(link => (
              <button 
                key={link.id} 
                onClick={() => handleLinkClick(link.id === 'library' ? 'library' : 'grade-selection', link.id)} 
                className={`font-black text-sm transition-all flex items-center gap-2 relative group ${
                  currentPage === link.id || (currentPage === 'grade-selection' && link.id !== 'library') ? 'text-blue-500' : 'text-slate-400 hover:text-white'
                }`}
              >
                <i className={`fas ${link.icon} text-xs opacity-70`}></i>
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right: Logo */}
          <div onClick={() => handleLinkClick('home')} className="flex items-center gap-4 cursor-pointer group">
            <div className="text-right">
              <h1 className="text-xl md:text-2xl font-black group-hover:text-blue-400 transition-colors tracking-tighter">أجي نتعلم</h1>
              <p className="text-[9px] text-emerald-400 font-black uppercase tracking-[0.3em] leading-none">ajitnaalam.com</p>
            </div>
            <div className="w-10 h-12 bg-red-600 rounded-xl flex items-center justify-center relative shadow-2xl border border-red-500/20 group-hover:scale-110 transition-transform duration-500">
               <div className="w-7 h-9 bg-white rounded-sm"></div>
               <div className="absolute top-0 right-1.5 w-1.5 h-4 bg-emerald-500 rounded-b-sm shadow-sm"></div>
            </div>
            
            {/* Mobile Toggle */}
            <button 
              onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} 
              className="lg:hidden w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors ml-2"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times text-red-500' : 'fa-bars-staggered'} text-lg`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE SIDEBAR --- */}
      <div className={`fixed inset-0 z-[150] lg:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[#030712] p-8 border-l border-white/5 transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
               <div className="w-8 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <div className="w-5 h-7 bg-white rounded-sm"></div>
               </div>
               <h3 className="text-xl font-black">أجي نتعلم</h3>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center"><i className="fas fa-times"></i></button>
          </div>
          
          <div className="flex flex-col gap-5">
            <button onClick={() => handleLinkClick('home')} className="text-right font-black text-xl text-slate-400 hover:text-blue-500 py-3 border-b border-white/5 flex items-center justify-end gap-4">
               الرئيسية <i className="fas fa-home text-sm"></i>
            </button>
            {navLinks.map(l => (
              <button 
                key={l.id} 
                onClick={() => handleLinkClick(l.id === 'library' ? 'library' : 'grade-selection', l.id)} 
                className="text-right font-black text-xl text-slate-400 hover:text-blue-500 py-3 border-b border-white/5 flex items-center justify-end gap-4"
              >
                {l.label} <i className={`fas ${l.icon} text-sm`}></i>
              </button>
            ))}
            <button onClick={() => handleLinkClick('login')} className="bg-blue-600 py-4 rounded-2xl font-black mt-8 shadow-xl shadow-blue-900/20">تسجيل الدخول</button>
            <div className="grid grid-cols-2 gap-3 mt-4">
               <button onClick={() => handleLinkClick('contact')} className="bg-white/5 py-3 rounded-xl text-sm font-bold">اتصل بنا</button>
               <button onClick={() => handleLinkClick('faq')} className="bg-white/5 py-3 rounded-xl text-sm font-bold">مساعدة</button>
            </div>
          </div>

          <div className="mt-12 flex justify-center gap-4">
            {socialLinks.slice(0, 4).map(social => (
              <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400">
                <i className={`fab fa-${social.icon}`}></i>
              </a>
            ))}
          </div>

          <div className="absolute bottom-10 left-0 w-full px-8 text-center text-slate-600 text-[10px] font-black uppercase tracking-widest">
             ajitnaalam.com — 2024 🇲🇦
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow pt-24">{children}</main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#030712] border-t border-white/5 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 text-right mb-20">
            {/* Column 1: Brand */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 justify-end">
                <h3 className="text-3xl font-black text-white">أجي نتعلم</h3>
                <div className="w-10 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-2xl">
                  <div className="w-7 h-9 bg-white rounded-sm"></div>
                </div>
              </div>
              <p className="text-slate-400 text-base leading-relaxed font-medium">المنصة التعليمية الرقمية الأقوى في المغرب، تجمع بين المنهج الرسمي وتقنيات الذكاء الاصطناعي لضمان تفوقك.</p>
              <div className="flex justify-end gap-5">
                {socialLinks.map(social => (
                  <a 
                    key={social.id} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.label}
                    className={`w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white ${social.hoverColor} transition-all transform hover:-translate-y-1 shadow-lg`}
                  >
                    <i className={`fab fa-${social.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h4 className="text-white font-black text-lg mb-8 border-r-4 border-blue-600 pr-4">روابط سريعة</h4>
              <div className="flex flex-col gap-4">
                <button onClick={() => handleLinkClick('home')} className="text-slate-500 hover:text-blue-500 text-right text-sm font-black transition-colors">الرئيسية</button>
                <button onClick={() => handleLinkClick('library')} className="text-slate-500 hover:text-blue-500 text-right text-sm font-black transition-colors">المكتبة الرقمية</button>
                <button onClick={() => handleLinkClick('ai-quiz-gen')} className="text-slate-500 hover:text-blue-500 text-right text-sm font-black transition-colors">الاختبارات الذكية</button>
                <button onClick={() => handleLinkClick('login')} className="text-slate-500 hover:text-blue-500 text-right text-sm font-black transition-colors">بوابة التلميذ</button>
              </div>
            </div>

            {/* Column 3: Levels */}
            <div>
              <h4 className="text-white font-black text-lg mb-8 border-r-4 border-emerald-500 pr-4">الأسلاك الدراسية</h4>
              <div className="flex flex-col gap-4">
                {navLinks.slice(0,3).map(l => (
                  <button key={l.id} onClick={() => handleLinkClick('grade-selection', l.id)} className="text-slate-500 hover:text-emerald-500 text-right text-sm font-black transition-colors">{l.label}</button>
                ))}
                <button onClick={() => handleLinkClick('grade-selection', 'secondary')} className="text-slate-500 hover:text-blue-500 text-right text-sm font-black transition-colors">التحضير للبكالوريا</button>
              </div>
            </div>

            {/* Column 4: Legal & Support */}
            <div>
              <h4 className="text-white font-black text-lg mb-8 border-r-4 border-red-500 pr-4">المساعدة والقانون</h4>
              <div className="flex flex-col gap-4">
                <button onClick={() => handleLinkClick('about')} className="text-slate-500 hover:text-white text-right text-sm font-black transition-colors">من نحن</button>
                <button onClick={() => handleLinkClick('faq')} className="text-slate-500 hover:text-white text-right text-sm font-black transition-colors">الأسئلة الشائعة</button>
                <button onClick={() => handleLinkClick('contact')} className="text-slate-500 hover:text-white text-right text-sm font-black transition-colors">اتصل بنا</button>
                <button onClick={() => handleLinkClick('privacy')} className="text-slate-500 hover:text-white text-right text-sm font-black transition-colors">سياسة الخصوصية</button>
              </div>
            </div>
          </div>

          {/* Bottom Branding */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4 text-slate-600 font-black text-[10px] uppercase tracking-widest">
              <span>صنع بـ ❤️ في المغرب</span>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              <span>ajitnaalam.com</span>
            </div>
            <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.4em]">جميع الحقوق محفوظة © 2024 - أجي نتعلم الرقمية</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
