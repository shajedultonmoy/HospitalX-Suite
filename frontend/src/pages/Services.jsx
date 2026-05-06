import { useEffect, useMemo, useState } from 'react';
import { Baby, Bone, Brain, Eye, HeartPulse, Search, Shield } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { departments as fallbackDepartments } from '../data/hospitalData';
import { fetchWithFallback } from '../services/api';

const iconMap = { Cardiology: HeartPulse, Neurology: Brain, Pediatrics: Baby, Orthopedics: Bone, Ophthalmology: Eye, 'General Medicine': Shield };

const Services = () => {
  const [departments, setDepartments] = useState(fallbackDepartments);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithFallback('/services', fallbackDepartments).then((data) => {
      setDepartments(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => departments.filter((department) =>
    `${department.name} ${department.description}`.toLowerCase().includes(search.toLowerCase())
  ), [departments, search]);

  return (
    <div className="page-shell">
      <SectionHeader
        eyebrow="Medical sectors"
        title="Departments and hospital services"
        description="Search structured service information by department, clinical focus, and availability."
      />
      <div className="mb-8 flex max-w-xl items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <Search className="h-5 w-5 text-slate-400" />
        <input className="w-full outline-none" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search departments or services" />
      </div>
      {loading && <p className="mb-5 text-sm text-slate-500">Loading departments...</p>}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((department) => {
          const Icon = iconMap[department.name] || Shield;
          return (
            <article key={department.id} className="card p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-950">{department.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{department.description}</p>
              <p className="mt-5 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                {department.availability || 'Specialist care available'}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
