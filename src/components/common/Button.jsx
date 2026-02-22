const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger'
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
