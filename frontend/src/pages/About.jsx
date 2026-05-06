import { Database, Layers, Monitor, Server, Shield } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const layers = [
  {
    title: 'Presentation Layer',
    icon: Monitor,
    items: 'React, Tailwind CSS, responsive pages, reusable cards, search, filters, toast notifications.'
  },
  {
    title: 'Application Layer',
    icon: Server,
    items: 'Express REST APIs, JWT authentication, RBAC, validation, error handling, appointment workflows.'
  },
  {
    title: 'Data Layer',
    icon: Database,
    items: 'MySQL relational schema with normalized users, doctors, departments, medicines, and appointments.'
  }
];

const About = () => (
  <div className="page-shell">
    <SectionHeader
      eyebrow="About HospitalX"
      title="A modern hospital information suite built for clarity and scale"
      description="HospitalX Suite is designed around a clean 3-tier architecture so the user interface, API logic, and database layer can evolve independently."
    />
    <div className="grid gap-5 lg:grid-cols-3">
      {layers.map(({ title, icon: Icon, items }) => (
        <article key={title} className="card p-6">
          <Icon className="mb-5 h-9 w-9 text-primary" />
          <h2 className="text-xl font-bold text-slate-950">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{items}</p>
        </article>
      ))}
    </div>
    <section className="mt-10 rounded-lg border border-slate-200 bg-white p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-emerald-50 p-3 text-secondary">
          <Shield className="h-7 w-7" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-950">Healthcare-first operating principles</h2>
          <p className="mt-3 leading-7 text-slate-600">
            The app prioritizes readable medical information, role-aware access, normalized relationships, and focused user workflows for patients, doctors, and administrators.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default About;
