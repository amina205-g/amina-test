
import React, { useState } from 'react';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="py-20 flex justify-center items-center px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">👋</div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {isRegistering ? 'إنشاء حساب جديد' : 'مرحباً بك مجدداً'}
          </h2>
          <p className="text-gray-500">انضم إلى آلاف الطلاب المتفوقين في أجي نتعلم</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          {isRegistering && (
            <div>
              <label className="block text-gray-700 font-bold mb-2">الاسم الكامل</label>
              <input 
                type="text" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="أدخل اسمك الكامل"
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-bold mb-2">البريد الإلكتروني</label>
            <input 
              type="email" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="example@mail.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">كلمة المرور</label>
            <input 
              type="password" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="••••••••"
            />
          </div>
          
          {!isRegistering && (
            <div className="text-left">
              <a href="#" className="text-blue-600 text-sm font-bold hover:underline">نسيت كلمة المرور؟</a>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg transform hover:-translate-y-1"
          >
            {isRegistering ? 'سجل الآن' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-600 mb-4">
            {isRegistering ? 'لديك حساب بالفعل؟' : 'ليس لديك حساب؟'}
          </p>
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-600 font-bold hover:underline"
          >
            {isRegistering ? 'سجل دخولك من هنا' : 'ابدأ بإنشاء حساب مجاني'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
