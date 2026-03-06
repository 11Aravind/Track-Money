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
    <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-auto min-w-[320px] max-w-[90%] z-50">
      <div className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-premium-lg rounded-full flex items-center justify-between px-3 py-2 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center transition-all duration-300 rounded-full px-3 py-1.5 min-w-[64px] ${
                isActive 
                  ? 'text-emerald-600 bg-emerald-50' 
                  : 'text-primary-gray-400 hover:text-primary-gray-600 hover:bg-primary-gray-50'
              }`}
            >
              {isActive && (
                <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full z-10" />
              )}
              
              <div className="relative z-10 flex flex-col items-center">
                <Icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2} 
                  className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}
                />
                <span className={`text-[10px] mt-1 font-semibold transition-all duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-0 h-0'
                }`}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
