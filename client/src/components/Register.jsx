import { useState } from 'react';
import { User, Mail, Lock, RefreshCw } from 'lucide-react';
import api from '../utils/api';

const Register = ({ onSwitch }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await api.register(formData.email, formData.password, formData.name);
    setLoading(false);
    
    if (res.success) {
      setMessage('Account created! Redirecting to login...');
      setTimeout(onSwitch, 1500);
    } else {
      setMessage(res.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>
          <p className="text-slate-500 mt-2">Get started with your free account</p>
        </div>

        {message && (
          <div className={`p-3 text-sm rounded-lg border flex items-center gap-2 ${message.includes('created') ? 'text-green-600 bg-green-50 border-green-100' : 'text-red-600 bg-red-50 border-red-100'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <div className="relative group">
              <User className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input type="text" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="John Doe" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input type="email" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="john@example.com" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input type="password" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="••••••••" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow transition-all disabled:opacity-50 flex items-center justify-center gap-2">
             {loading ? <RefreshCw className="animate-spin" size={20} /> : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{' '}
          <button onClick={onSwitch} className="text-emerald-600 hover:underline font-medium hover:text-emerald-700">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;

