
import React, { useState } from 'react';

const ContactUs: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const socialPlatforms = [
    { name: 'واتساب', icon: 'fa-whatsapp', color: 'bg-[#25D366]', text: 'تواصل فوري', url: 'https://wa.me/212600000000' },
    { name: 'فيسبوك', icon: 'fa-facebook-f', color: 'bg-[#1877F2]', text: 'تابع جديدنا', url: '#' },
    { name: 'إنستغرام', icon: 'fa-instagram', color: 'bg-[#E4405F]', text: 'كواليس المنصة', url: '#' },
    { name: 'تليجرام', icon: 'fa-telegram', color: 'bg-[#26A5E4]', text: 'مجموعات الدعم', url: '#' }
  ];

  return (
    <div className="py-16 bg-[#020617] min-h-screen text-right font-['Cairo'] text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-500 px-6 py-2 rounded-full text-xs font-black mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
            نحن هنا من أجلكم
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">تواصل معنا</h1>
          <p className="text-slate-500 max-w-xl mx-auto text-lg font-bold">نسعد باستقبال تساؤلاتكم، اقتراحاتكم، أو أي مشكلة فنية تواجهكم.</p>
        </header>

        {/* Social Grid for Direct Contact */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {socialPlatforms.map((platform, idx) => (
            <a 
              key={idx} 
              href={platform.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/5 p-6 rounded-[2rem] hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center group"
            >
              <div className={`w-14 h-14 ${platform.color} rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <i className={`fab ${platform.icon} text-white`}></i>
              </div>
              <h3 className="font-black text-white mb-1">{platform.name}</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{platform.text}</p>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 text-center lg:text-right relative overflow-hidden group">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-600/5 rounded-full group-hover:scale-150 transition-transform"></div>
              <div className="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-xl flex items-center justify-center text-2xl mx-auto lg:mx-0 mb-6 relative z-10">
                <i className="fas fa-envelope"></i>
              </div>
              <h3 className="text-xl font-black mb-2 relative z-10">البريد الإلكتروني</h3>
              <p className="text-slate-500 mb-4 text-sm font-bold">للاستفسارات والطلبات الرسمية:</p>
              <a href="mailto:support@ajitnaalam.com" className="text-blue-500 font-black text-lg hover:underline relative z-10">support@ajitnaalam.com</a>
            </div>

            <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 text-center lg:text-right relative overflow-hidden group">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-600/5 rounded-full group-hover:scale-150 transition-transform"></div>
              <div className="w-12 h-12 bg-emerald-600/20 text-emerald-500 rounded-xl flex items-center justify-center text-2xl mx-auto lg:mx-0 mb-6 relative z-10">
                <i className="fas fa-phone"></i>
              </div>
              <h3 className="text-xl font-black mb-2 relative z-10">الدعم الهاتفي</h3>
              <p className="text-slate-500 mb-4 text-sm font-bold">من الإثنين إلى الجمعة (9ص - 6م):</p>
              <span className="text-white font-black text-lg block relative z-10" dir="ltr">+212 5XX XX XX XX</span>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/40 p-10 md:p-14 rounded-[3.5rem] border border-white/5 shadow-2xl">
              {submitted ? (
                <div className="text-center py-20 animate-fade-in">
                  <div className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-8">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h2 className="text-3xl font-black text-white mb-4">تم الإرسال بنجاح!</h2>
                  <p className="text-slate-500 text-lg font-bold">شكراً لتواصلك معنا، سيتواصل معك أحد أفراد فريقنا قريباً.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-10 bg-white/5 px-10 py-4 rounded-2xl font-black hover:bg-white/10 transition-all border border-white/5">إرسال رسالة أخرى</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-black text-slate-400 mr-2">الاسم الكامل</label>
                      <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white font-bold" placeholder="أحمد محمد" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-black text-slate-400 mr-2">البريد الإلكتروني</label>
                      <input required type="email" className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white font-bold" dir="ltr" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-400 mr-2">موضوع الرسالة</label>
                    <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white font-bold" placeholder="ما هو استفسارك؟" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-400 mr-2">تفاصيل الرسالة</label>
                    <textarea required className="w-full bg-black/40 border border-white/10 rounded-3xl py-5 px-6 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white font-bold min-h-[200px]" placeholder="اكتب رسالتك هنا..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-blue-900/40 transform hover:-translate-y-1 active:scale-95">
                    إرسال الطلب الآن
                    <i className="fas fa-paper-plane mr-3"></i>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
