import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  ArrowLeftRight, 
  Grid3X3, 
  PieChart, 
  Settings,
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
    { path: '/categories', icon: Grid3X3, label: 'Categories' },
    { path: '/reports', icon: PieChart, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-brand-primary min-h-screen">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white">Trackify</h1>
        <p className="text-sm text-blue-200/70 mt-1">Expense Tracker</p>
      </div>

      <nav className="flex-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link mb-1 ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="nav-link w-full text-red-300 hover:bg-red-500/20 hover:text-red-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
