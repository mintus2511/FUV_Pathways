import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100">
      <header className="max-w-6xl mx-auto px-4 py-8 flex items-center justify-between">
        <div className="text-xl font-semibold text-brand">FUV Planner</div>
        <div className="space-x-4 text-sm text-slate-700">
          <Link to="/login" className="hover:text-brand">
            Log in
          </Link>
          <Link to="/login" className="px-4 py-2 rounded bg-brand text-white shadow">
            Sign up
          </Link>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-slate-900">Plan your journey at Fulbright with confidence.</h1>
          <p className="text-lg text-slate-700 leading-7">
            Track degree requirements, map out semesters, and stay aligned with core, exploratory, and major/minor expectations.
            Collaborate with classmates through course chats and keep everything synced in one place.
          </p>
          <div className="flex gap-3">
            <Link to="/login" className="px-5 py-3 rounded bg-brand text-white font-semibold shadow">
              Get started
            </Link>
            <Link to="/courses" className="px-5 py-3 rounded border border-slate-300 text-slate-800 font-semibold">
              Browse courses
            </Link>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-6 space-y-4 border border-slate-100">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>Credits toward 128</span>
            <span className="text-brand font-semibold">72</span>
          </div>
          <div className="w-full bg-slate-200 h-3 rounded-full">
            <div className="bg-brand h-3 rounded-full" style={{ width: '56%' }}></div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
            <div className="p-3 rounded border border-slate-200">
              <div className="font-semibold">Core Curriculum</div>
              <div>3 / 4 completed</div>
            </div>
            <div className="p-3 rounded border border-slate-200">
              <div className="font-semibold">Exploratory areas</div>
              <div>2 of 3 areas</div>
            </div>
            <div className="p-3 rounded border border-slate-200">
              <div className="font-semibold">Major progress</div>
              <div>65% done</div>
            </div>
            <div className="p-3 rounded border border-slate-200">
              <div className="font-semibold">Capstone</div>
              <div>Eligible next term</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
