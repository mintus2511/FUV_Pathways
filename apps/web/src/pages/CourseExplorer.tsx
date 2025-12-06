const courses = [
  {
    code: 'CS102',
    title: 'Data Structures',
    credits: 4,
    description: 'Core CS foundation covering arrays, trees, and graphs.',
    requirements: ['CS Foundation', 'STEM Exploratory'],
  },
  {
    code: 'HIST210',
    title: 'Modern Vietnamese Culture & Society',
    credits: 4,
    description: 'Core curriculum course satisfying Vietnamese society requirement.',
    requirements: ['Core Curriculum'],
  },
  {
    code: 'ART130',
    title: 'Design and Systems Thinking',
    credits: 4,
    description: 'Studio-based course exploring design process and systems thinking.',
    requirements: ['Core Curriculum', 'Arts & Humanities Exploratory'],
  },
];

export default function CourseExplorer() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Course explorer</h1>
          <p className="text-sm text-slate-600">Search and filter courses. Backend exposes /courses for live data.</p>
        </div>
        <input className="border rounded px-3 py-2" placeholder="Search courses" />
      </div>
      <div className="grid gap-3">
        {courses.map((course) => (
          <div key={course.code} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">{course.code}</div>
                <div className="text-lg font-semibold text-slate-900">{course.title}</div>
                <div className="text-sm text-slate-600 mt-1">{course.description}</div>
              </div>
              <div className="text-right">
                <div className="text-brand font-semibold">{course.credits} credits</div>
                <button className="mt-2 px-3 py-2 rounded bg-brand text-white text-sm">Add to planner</button>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-brand">
              {course.requirements.map((req) => (
                <span key={req} className="px-2 py-1 rounded-full bg-teal-50 border border-teal-200">
                  {req}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
