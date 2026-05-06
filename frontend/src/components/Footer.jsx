import { Activity, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-12 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-secondary" />
            <span className="ml-2 text-2xl font-bold">Hospital<span className="text-secondary">X</span> Suite</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            A scalable hospital information platform for departments, doctors, medicines, appointments, and secure role-based workflows.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Navigation</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            <Link className="hover:text-white" to="/departments">Departments</Link>
            <Link className="hover:text-white" to="/doctors">Doctors</Link>
            <Link className="hover:text-white" to="/medicines">Medicines</Link>
            <Link className="hover:text-white" to="/appointments">Appointments</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1-555-HOSPITALX</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> care@hospitalx.test</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Medical Avenue, Care City</span>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} HospitalX Suite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
