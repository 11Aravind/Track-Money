const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <div 
      className={`card ${!hover ? 'hover:shadow-premium' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
