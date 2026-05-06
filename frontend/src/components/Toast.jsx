import { CheckCircle2, X } from 'lucide-react';

const Toast = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex max-w-sm items-center gap-3 rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-xl">
      <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary" />
      <span>{message}</span>
      <button onClick={onClose} className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close notification">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;
