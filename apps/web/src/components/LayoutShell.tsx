import { Link, useNavigate } from 'react-router-dom';
import { clearSession, getSession } from '../lib/session';
import React from 'react';

interface Props {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function LayoutShell({ children, requireAdmin }: Props) {
  const session = getSession();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!session) navigate('/login');
    if (session && requireAdmin && session.user.role !== 'admin') navigate('/app');
  }, [session, requireAdmin, navigate]);

  const links = [
    { to: '/app', label: 'Dashboard' },
    { to: '/requirements', label: 'Degree Requirements' },
    { to: '/courses', label: 'Course Explorer' },
    { to: '/planner', label: 'Planner' },
  ];

  if (session?.user.role === 'admin') {
    links.push({ to: '/admin', label: 'Admin' });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/app" className="font-semibold text-brand dark:text-brand-dark">
            FUV Planner
          </Link>
          <nav className="flex gap-4 text-sm text-slate-700">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-brand">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <span>{session?.user.name ?? 'Guest'}</span>
            {session && (
              <button
                className="text-brand underline"
                onClick={() => {
                  clearSession();
                  navigate('/');
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
