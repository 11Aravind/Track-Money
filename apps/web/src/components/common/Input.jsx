import { Calendar } from 'lucide-react';

const Input = ({ 
  label, 
  type = 'text', 
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  className = '',
  onClick,
  ...props 
}) => {
  const isDate = type === 'date';

  const handleContainerClick = (e) => {
    if (isDate) {
      const input = e.currentTarget.querySelector('input');
      if (input && input.showPicker) {
        input.showPicker();
      }
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="label">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div 
        className="relative group cursor-pointer"
        onClick={handleContainerClick}
      >
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`input ${error ? 'border-red-500 focus:ring-red-500' : ''} ${
            isDate ? 'pr-10 !cursor-pointer flex-row-reverse' : ''
          } ${className}`}
          {...props}
        />
        {isDate && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted-40 group-hover:text-cyber-accent-blue transition-colors pointer-events-none">
            <Calendar size={16} />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-[10px] font-bold text-red-500 uppercase tracking-widest">{error}</p>
      )}
    </div>
  );
};

export default Input;
