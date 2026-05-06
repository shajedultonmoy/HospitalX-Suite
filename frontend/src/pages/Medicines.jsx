import { useEffect, useMemo, useState } from 'react';
import { Package, Pill, Search } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { medicines as fallbackMedicines } from '../data/hospitalData';
import { fetchWithFallback } from '../services/api';

const Medicines = () => {
  const [medicines, setMedicines] = useState(fallbackMedicines);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetchWithFallback('/medicines', fallbackMedicines).then(setMedicines);
  }, []);

  const categories = ['All', ...new Set(medicines.map((item) => item.category).filter(Boolean))];
  const filtered = useMemo(() => medicines.filter((medicine) => {
    const matchesSearch = `${medicine.name} ${medicine.category} ${medicine.usage} ${medicine.description}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || medicine.category === category;
    return matchesSearch && matchesCategory;
  }), [medicines, search, category]);

  return (
    <div className="page-shell">
      <SectionHeader
        eyebrow="Medicine information"
        title="Search categorized medicine details"
        description="Browse medicine categories, common usage notes, dosage context, and stock information. This content is informational and not a substitute for medical advice."
      />
      <div className="mb-8 grid gap-3 md:grid-cols-[1fr_220px]">
        <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
          <Search className="h-5 w-5 text-slate-400" />
          <input className="w-full outline-none" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search medicines, usage, or category" />
        </label>
        <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((medicine) => (
          <article key={medicine.id} className="card p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-secondary">
                <Pill className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary">{medicine.category}</span>
            </div>
            <h2 className="mt-5 text-xl font-bold text-slate-950">{medicine.name}</h2>
            <p className="mt-3 text-sm font-semibold text-slate-700">Usage: {medicine.usage}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{medicine.description}</p>
            <div className="mt-5 grid gap-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
              <span>Dosage: {medicine.dosage || 'Consult physician'}</span>
              <span className="flex items-center gap-2"><Package className="h-4 w-4 text-secondary" /> Stock: {medicine.stock ?? 'Available'}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Medicines;
