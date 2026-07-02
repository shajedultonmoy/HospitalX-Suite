import { CalendarCheck, Database, Pill, Stethoscope, Users, ShieldAlert } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const metrics = [
  ['Departments', '6', Database],
  ['Doctors', '120+', Stethoscope],
  ['Medicines', '500+', Pill],
  ['Appointments', '42 pending', CalendarCheck],
  ['Users', 'Admin / Doctor / Patient', Users]
];

const AdminDashboard = ({ user }) => {
  if (!user || user.role !== 'Admin') {
    return (
      <div className="page-shell flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="mb-6 rounded-full bg-red-50 p-4 text-red-600">
          <ShieldAlert className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-950">Access Denied</h1>
        <p className="mt-4 max-w-md leading-7 text-slate-600">
          You do not have administrative privileges. Please sign in with an Admin account to access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <SectionHeader
        eyebrow="Admin dashboard"
        title="Manage hospital data from one operational view"
        description="The backend exposes protected CRUD endpoints for administrators to manage doctors, departments, medicines, appointments, and user roles."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {metrics.map(([label, value, Icon]) => (
          <article key={label} className="card p-5">
            <Icon className="mb-4 h-7 w-7 text-primary" />
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-extrabold text-slate-950">{value}</p>
          </article>
        ))}
      </div>
      <section className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-bold text-slate-950">Protected management modules</h2>
        </div>
        <div className="grid divide-y divide-slate-100">
          {['Doctor CRUD', 'Department CRUD', 'Medicine CRUD', 'Appointment status updates', 'Role-based route protection'].map((item) => (
            <div key={item} className="flex items-center justify-between px-5 py-4 text-sm">
              <span className="font-medium text-slate-700">{item}</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Ready</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
