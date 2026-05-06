import { useEffect, useMemo, useState } from 'react';
import { Calendar, Filter, Phone, Search, Star, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { departments, doctors as fallbackDoctors } from '../data/hospitalData';
import { fetchWithFallback } from '../services/api';

const normalizeDoctor = (doctor) => ({
  ...doctor,
  department: doctor.department || doctor.Department?.name || 'General Medicine',
  availability: doctor.availability || 'Available on request',
  experience: doctor.experience || 'Experienced',
  rating: doctor.rating || '4.7'
});

const Doctors = () => {
  const [doctors, setDoctors] = useState(fallbackDoctors);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [sort, setSort] = useState('name');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithFallback('/doctors', fallbackDoctors).then((data) => {
      setDoctors(data.map(normalizeDoctor));
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return doctors
      .filter((doctor) => department === 'All' || doctor.department === department)
      .filter((doctor) => `${doctor.name} ${doctor.specialization} ${doctor.department}`.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => String(a[sort] || '').localeCompare(String(b[sort] || '')));
  }, [doctors, search, department, sort]);

  return (
    <div className="page-shell">
      <SectionHeader
        eyebrow="Doctor directory"
        title="Find specialists by department, availability, and care focus"
        description="Detailed doctor profiles help patients choose the right specialist before booking an appointment."
      />

      <div className="mb-8 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px_180px]">
        <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3">
          <Search className="h-5 w-5 text-slate-400" />
          <input className="w-full outline-none" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search doctor or specialty" />
        </label>
        <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3">
          <Filter className="h-5 w-5 text-slate-400" />
          <select className="w-full bg-white outline-none" value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option>All</option>
            {departments.map((item) => <option key={item.id}>{item.name}</option>)}
          </select>
        </label>
        <select className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name">Sort by name</option>
          <option value="department">Sort by department</option>
          <option value="availability">Sort by availability</option>
        </select>
      </div>

      {loading && <p className="mb-5 text-sm text-slate-500">Loading doctors...</p>}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((doctor) => (
          <article key={doctor.id} className="card p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
                <User className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-950">{doctor.name}</h2>
                <p className="mt-1 text-sm font-semibold text-primary">{doctor.specialization}</p>
                <p className="mt-1 text-sm text-slate-500">{doctor.department}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-slate-600">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-secondary" /> {doctor.schedule}</span>
              <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-secondary" /> {doctor.contact}</span>
              <span className="flex items-center gap-2"><Star className="h-4 w-4 text-amber-500" /> {doctor.rating} rating · {doctor.experience}</span>
            </div>
            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{doctor.availability}</span>
              <Link to="/appointments" className="btn-primary px-4 py-2">Book</Link>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && <p className="py-12 text-center text-slate-500">No doctors match your search.</p>}
    </div>
  );
};

export default Doctors;
