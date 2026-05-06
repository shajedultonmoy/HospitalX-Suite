import { useState } from 'react';
import { CalendarPlus, Loader2 } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import Toast from '../components/Toast';
import { doctors } from '../data/hospitalData';
import { apiRequest } from '../services/api';

const Appointment = () => {
  const [form, setForm] = useState({ doctor_id: doctors[0].id, date: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiRequest('/appointments', { method: 'POST', body: JSON.stringify(form) });
      setToast('Appointment request submitted.');
      setForm({ doctor_id: doctors[0].id, date: '', notes: '' });
    } catch (error) {
      setToast(error.message === 'Authentication required' ? 'Please sign in before booking an appointment.' : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <Toast message={toast} onClose={() => setToast('')} />
      <section>
        <SectionHeader
          eyebrow="Appointment booking"
          title="Request a visit with the right specialist"
          description="Patients can submit appointment requests securely. Admins and doctors can confirm, update, or cancel appointments through protected APIs."
        />
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-blue-900">
          Sign in first to book through the live API. The form still shows the complete booking workflow and validation states.
        </div>
      </section>
      <form onSubmit={handleSubmit} className="card grid gap-5 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-50 p-3 text-secondary">
            <CalendarPlus className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-950">Book Appointment</h2>
        </div>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Doctor
          <select className="input" value={form.doctor_id} onChange={(e) => setForm({ ...form, doctor_id: Number(e.target.value) })}>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialization}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Preferred date and time
          <input className="input" type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Notes
          <textarea className="input min-h-32 resize-y" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Briefly describe symptoms or appointment purpose" />
        </label>
        <button disabled={loading} className="btn-primary">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default Appointment;
