import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import Toast from '../components/Toast';

const Contact = () => {
  const [toast, setToast] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    setToast('Message received. Our care team will respond soon.');
  };

  return (
    <div className="page-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <Toast message={toast} onClose={() => setToast('')} />
      <section>
        <SectionHeader
          eyebrow="Contact"
          title="Reach HospitalX Suite"
          description="Connect with the hospital desk for general queries, appointment support, emergency routing, and service information."
        />
        <div className="grid gap-4">
          {[
            [Phone, '+1-555-HOSPITALX', 'Emergency and appointment desk'],
            [Mail, 'care@hospitalx.test', 'Patient support and records'],
            [MapPin, 'Medical Avenue, Care City', 'Main campus and specialist wing']
          ].map(([Icon, title, text]) => (
            <div key={title} className="card flex items-center gap-4 p-5">
              <div className="rounded-lg bg-blue-50 p-3 text-primary"><Icon className="h-6 w-6" /></div>
              <div>
                <p className="font-bold text-slate-950">{title}</p>
                <p className="text-sm text-slate-600">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <form onSubmit={handleSubmit} className="card grid gap-5 p-6 sm:p-8">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Name
          <input className="input" placeholder="Your full name" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Email
          <input className="input" type="email" placeholder="you@example.com" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Message
          <textarea className="input min-h-36 resize-y" placeholder="How can we help?" required />
        </label>
        <button className="btn-primary">
          <Send className="h-4 w-4" />
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
