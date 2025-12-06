import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiPost } from '../lib/api';
import { saveSession } from '../lib/session';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name') as string;
    const email = form.get('email') as string;
    const password = form.get('password') as string;
    try {
      const data = await apiPost<{ token: string; user: any }>(
        mode === 'login' ? '/auth/login' : '/auth/register',
        { name, email, password }
      );
      saveSession(data.token, data.user);
      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white shadow rounded-xl w-full max-w-md p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-900">{mode === 'login' ? 'Log in' : 'Create account'}</h1>
          <button className="text-brand text-sm" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? 'Need an account?' : 'Have an account?'}
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-sm text-slate-700">Full name</label>
              <input name="name" required className="w-full border rounded px-3 py-2" placeholder="Your name" />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-sm text-slate-700">Email</label>
            <input type="email" name="email" required className="w-full border rounded px-3 py-2" placeholder="you@fulbright.edu.vn" />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-700">Password</label>
            <input type="password" name="password" required className="w-full border rounded px-3 py-2" placeholder="••••••••" />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button type="submit" className="w-full bg-brand text-white rounded py-2 font-semibold">
            {mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>
        <p className="text-xs text-slate-500">
          Signing up defaults to the student role. Admins can update roles via the dashboard.
        </p>
        <Link to="/" className="text-sm text-brand underline">
          Back to landing
        </Link>
      </div>
    </div>
  );
}
