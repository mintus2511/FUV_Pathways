const plan = [
  { semester: 'Fall 2025', courses: ['CS102 Data Structures', 'ELP Practicum'], credits: 8 },
  { semester: 'Spring 2026', courses: ['STAT201 Probability', 'ECON210 Microeconomics'], credits: 8 },
];

export default function Planner() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Planner</h1>
          <p className="text-sm text-slate-600">Assign courses per term and track completion.</p>
        </div>
        <button className="px-3 py-2 bg-brand text-white rounded text-sm">Add course</button>
      </div>
      <div className="grid gap-3">
        {plan.map((term) => (
          <div key={term.semester} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-slate-900">{term.semester}</div>
              <div className="text-sm text-slate-600">{term.credits} credits</div>
            </div>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              {term.courses.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div className="mt-3 text-xs text-slate-500">
              Update status, grade, and requirement mapping in the connected API workflow.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
