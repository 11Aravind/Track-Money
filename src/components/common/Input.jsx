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
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="label">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`input ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
