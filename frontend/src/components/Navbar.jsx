import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Activity, CalendarPlus, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Departments', to: '/departments' },
  { label: 'Doctors', to: '/doctors' },
  { label: 'Medicines', to: '/medicines' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-blue-50 text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-primary'}`;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Activity className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-extrabold text-slate-950">Hospital<span className="text-secondary">X</span> Suite</span>
            </Link>
          </div>
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/appointments" className="btn-primary py-2">
              <CalendarPlus className="h-4 w-4" />
              Book
            </Link>
            <Link to="/login" className="btn-secondary py-2">Login</Link>
          </div>
          <button className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-slate-100 py-4 lg:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
              ))}
              <Link to="/appointments" onClick={() => setOpen(false)} className="btn-primary mt-2">
                <CalendarPlus className="h-4 w-4" />
                Book Appointment
              </Link>
              <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
