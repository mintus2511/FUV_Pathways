const groups = [
  { name: 'Core Curriculum', description: '4 required courses including QUEST.', credits: 16 },
  { name: 'Exploratory – Arts & Humanities', description: '8 credits minimum.', credits: 8 },
  { name: 'Exploratory – Social Sciences', description: '8 credits minimum.', credits: 8 },
  { name: 'Exploratory – STEM', description: '8 credits minimum.', credits: 8 },
  { name: 'Major foundation', description: 'Configured per major in admin.', credits: 24 },
  { name: 'Minor', description: 'Optional minor pathway.', credits: 16 },
  { name: 'MOET', description: 'Politics, Military Training, PE (do not count toward 128).', credits: 0 },
  { name: 'ELP', description: 'At least 4 credits for legacy cohorts.', credits: 4 },
];

export default function DegreeRequirements() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Degree requirements</h1>
        <p className="text-sm text-slate-600">Dynamic data will be loaded from the API and requirement mapping tables.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {groups.map((group) => (
          <div key={group.name} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">{group.name}</div>
                <div className="text-sm text-slate-600">{group.description}</div>
              </div>
              <div className="text-brand font-semibold">{group.credits} cr</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
