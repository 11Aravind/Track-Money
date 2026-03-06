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
    { path: '/categories', icon: Grid3X3, label: 'Categories' },
    { path: '/reports', icon: PieChart, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-white border-t border-surface-border shadow-nav flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center transition-all duration-300 py-1.5 px-3 rounded-xl min-w-[56px] ${
                isActive 
                  ? 'text-brand-primary' 
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {isActive && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-brand-primary rounded-full" />
              )}
              
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 1.8} 
                className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}
              />
              <span className={`text-[10px] mt-0.5 font-medium transition-all duration-300 ${
                isActive ? 'text-brand-primary' : 'text-text-muted'
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
