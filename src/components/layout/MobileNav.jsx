import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ArrowLeftRight, 
  Grid3X3, 
  PieChart, 
  Settings 
} from 'lucide-react';

const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
    { path: '/reports', icon: PieChart, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-cyber-surface/90 backdrop-blur-xl border-t border-cyber-border shadow-nav flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center transition-all duration-300 py-1.5 px-3 rounded-xl min-w-[56px] ${
                isActive 
                  ? 'text-cyber-accent-green' 
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {isActive && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyber-accent-green rounded-full shadow-[0_0_8px_rgba(204,255,0,0.6)]" />
              )}
              
              <Icon 
                size={20} 
                strokeWidth={isActive ? 2.5 : 1.8} 
                className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}
              />
              <span className={`text-[8px] mt-1 font-bold uppercase tracking-widest transition-all duration-300 ${
                isActive ? 'text-cyber-accent-green' : 'text-text-muted'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
