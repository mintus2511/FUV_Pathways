const metrics = [
  { label: 'Users', value: '142' },
  { label: 'Active courses', value: '86' },
  { label: 'Requirement groups', value: '24' },
  { label: 'Pending imports', value: '2' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Admin dashboard</h1>
        <p className="text-sm text-slate-600">Secure tools for course data, requirements, PDF import, and user management.</p>
      </div>
      <div className="grid md:grid-cols-4 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="text-sm text-slate-500">{m.label}</div>
            <div className="text-xl font-semibold text-slate-900">{m.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">PDF upload placeholder</h2>
        <p className="text-sm text-slate-600">
          Drag-and-drop parsing will live here. The backend exposes a stub endpoint to accept files and return extracted text for
          manual cleanup before saving.
        </p>
        <button className="px-3 py-2 rounded bg-brand text-white text-sm">Upload PDF</button>
      </div>
    </div>
  );
}
