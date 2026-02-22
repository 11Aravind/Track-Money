import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  FolderOpen, 
  BarChart3, 
  Settings 
} from 'lucide-react';

const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/transactions', icon: Receipt, label: 'Transactions' },
    { path: '/categories', icon: FolderOpen, label: 'Categories' },
    { path: '/reports', icon: BarChart3, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-primary-gray-200 z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
                isActive 
                  ? 'text-primary-black' 
                  : 'text-primary-gray-500 hover:text-primary-gray-700'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
