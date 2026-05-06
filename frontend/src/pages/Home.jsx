import { Link } from 'react-router-dom';
import { ArrowRight, CalendarPlus, HeartPulse, Pill, Shield, Stethoscope } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { departments, doctors, medicines } from '../data/hospitalData';

const stats = [
  ['30+', 'Medical sectors'],
  ['120+', 'Specialist doctors'],
  ['24/7', 'Emergency care'],
  ['15k+', 'Patients served']
];

const Home = () => {
  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="page-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              3-tier hospital information and care platform
            </p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              HospitalX Suite
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Explore departments, compare specialists, review medicine information, and book appointments through a clean, secure, and scalable healthcare experience.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/appointments" className="btn-primary">
                <CalendarPlus className="h-5 w-5" />
                Book Appointment
              </Link>
              <Link to="/doctors" className="btn-secondary">
                Find a Doctor
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card p-5">
              <HeartPulse className="mb-5 h-9 w-9 text-primary" />
              <h3 className="text-lg font-bold text-slate-950">Clinical Services</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{departments[0].description}</p>
            </div>
            <div className="card p-5 sm:mt-10">
              <Stethoscope className="mb-5 h-9 w-9 text-secondary" />
              <h3 className="text-lg font-bold text-slate-950">Doctor Directory</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{doctors[0].name}, {doctors[0].specialization}, available {doctors[0].schedule}.</p>
            </div>
            <div className="card p-5">
              <Pill className="mb-5 h-9 w-9 text-primary" />
              <h3 className="text-lg font-bold text-slate-950">Medicine Library</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{medicines[0].name}: {medicines[0].usage}</p>
            </div>
            <div className="card p-5 sm:mt-10">
              <Shield className="mb-5 h-9 w-9 text-secondary" />
              <h3 className="text-lg font-bold text-slate-950">Secure Access</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">JWT authentication with Admin, Doctor, and Patient role-based access.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-white p-6">
              <p className="text-3xl font-extrabold text-primary">{value}</p>
              <p className="mt-2 text-sm font-medium text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Quick navigation"
            title="Everything patients need, organized clearly"
            description="HospitalX Suite connects the presentation layer, application APIs, and relational data layer into a practical hospital management foundation."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['Departments', 'Browse clinical sectors and available service lines.', '/departments'],
              ['Doctors', 'Search specialists by name, department, schedule, and availability.', '/doctors'],
              ['Medicines', 'Review categories, usage notes, dosage guidance, and stock context.', '/medicines']
            ].map(([title, description, to]) => (
              <Link key={title} to={to} className="card p-6">
                <h3 className="text-xl font-bold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
