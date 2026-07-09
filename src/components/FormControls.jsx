export function Input({ label, value, onChange, type = "text", readOnly = false }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input readOnly={readOnly} type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export function Select({ label, value, onChange, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>{children}</select>
    </label>
  );
}
