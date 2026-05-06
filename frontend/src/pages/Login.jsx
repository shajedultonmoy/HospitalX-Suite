import { useState } from 'react';
import { Activity, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import { apiRequest } from '../services/api';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Patient' });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const data = await apiRequest(endpoint, { method: 'POST', body: JSON.stringify(formData) });
      localStorage.setItem('token', data.token);
      localStorage.setItem('hospitalx_user', JSON.stringify(data.user));
      setToast(isLogin ? 'Signed in successfully.' : 'Account created successfully.');
      setTimeout(() => navigate('/'), 700);
    } catch (err) {
      setToast(err.message || 'Authentication failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-shell grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <Toast message={toast} onClose={() => setToast('')} />
      <section>
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-primary">
          <Activity className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-950">{isLogin ? 'Welcome back' : 'Create your HospitalX account'}</h1>
        <p className="mt-4 max-w-xl leading-7 text-slate-600">
          Sign in as Patient, Doctor, or Admin to access secure appointment workflows and management features.
        </p>
      </section>

      <section className="card p-6 sm:p-8">
        <form className="grid gap-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Full name
              <input className="input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Jane Doe" required />
            </label>
          )}
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Email address
            <input className="input" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@example.com" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Password
            <input className="input" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Minimum 6 characters" required />
          </label>
          {!isLogin && (
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Role
              <select className="input" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                <option>Patient</option>
                <option>Doctor</option>
                <option>Admin</option>
              </select>
            </label>
          )}
          <button type="submit" disabled={isLoading} className="btn-primary">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="mt-6 text-sm font-semibold text-primary hover:text-blue-700">
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Sign in'}
        </button>
      </section>
    </div>
  );
};

export default Login;
