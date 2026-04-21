import { X } from 'lucide-react';
import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'md:max-w-sm',
    md: 'md:max-w-md',
    lg: 'md:max-w-lg',
    xl: 'md:max-w-xl',
    '2xl': 'md:max-w-2xl'
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-content ${sizeClasses[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 md:p-8 border-b border-surface-border flex-shrink-0">
          <h2 className="text-xl md:text-2xl font-heading font-black text-text-primary uppercase tracking-tight">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex border border-surface-border items-center justify-center bg-surface-card/40 hover:bg-surface-card hover:border-cyber-accent-blue rounded-xl transition-all text-text-muted-70 hover:text-cyber-accent-blue shadow-sm"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5 md:p-8 overflow-y-auto flex-1 scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
