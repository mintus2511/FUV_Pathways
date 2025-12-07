const statCards = [
  { title: 'Credits toward 128', value: '72', helper: 'Excludes MOET credits' },
  { title: 'Core requirements', value: '3 / 4', helper: 'Finish QUEST to complete core' },
  { title: 'Exploratory areas', value: '2 / 3', helper: 'Complete 8 credits in each area' },
  { title: 'Major progress', value: '65%', helper: 'On track for CS foundation' },
  { title: 'ELP credits', value: '4', helper: 'Minimum met for legacy cohorts' },
  { title: 'Capstone', value: 'Eligible next term', helper: 'Need ≥80 credits + core' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Student dashboard</h1>
        <p className="text-slate-600">At-a-glance progress toward graduation and key requirements.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <div key={card.title} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="text-sm text-slate-500">{card.title}</div>
            <div className="text-2xl font-semibold text-slate-900">{card.value}</div>
            <div className="text-xs text-slate-500 mt-1">{card.helper}</div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">Upcoming semesters</h2>
        <p className="text-sm text-slate-600">We will fetch your personalized planner once connected to the API.</p>
        <ul className="list-disc pl-5 text-sm text-slate-700 mt-2 space-y-1">
          <li>Drag courses to semesters and change status (completed / in-progress / planned).</li>
          <li>Progress recalculates credits, exploratory areas, and capstone eligibility automatically.</li>
          <li>Shared helpers enforce double counting limits and cross-listed equivalence.</li>
        </ul>
      </div>
    </div>
  );
}
