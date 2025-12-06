export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

const KEY = 'fuv-session';

export function saveSession(token: string, user: SessionUser) {
  localStorage.setItem(KEY, JSON.stringify({ token, user }));
}

export function getSession(): { token: string; user: SessionUser } | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(KEY);
}
