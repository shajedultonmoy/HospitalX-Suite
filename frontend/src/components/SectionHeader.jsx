const SectionHeader = ({ eyebrow, title, description, align = 'left' }) => (
  <div className={`mb-8 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'}`}>
    {eyebrow && (
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-secondary">{eyebrow}</p>
    )}
    <h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">{title}</h1>
    {description && <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>}
  </div>
);

export default SectionHeader;
