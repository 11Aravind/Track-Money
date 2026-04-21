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
    { path: '/reports', icon: PieChart, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-surface-card/80 backdrop-blur-xl border-r border-surface-border min-h-screen sticky top-0 transition-all duration-500">
      <div className="p-8 border-b border-surface-border">
        <h1 className="text-2xl font-heading font-black text-text-primary tracking-tighter uppercase">
          Trackify<span className="text-cyber-accent-green">.</span>
        </h1>
        <p className="text-[10px] font-bold text-cyber-accent-blue tracking-[0.2em] uppercase mt-1 opacity-80">
          Precision Finance
        </p>
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

      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-[10px] font-bold tracking-widest text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 uppercase rounded-xl"
        >
          <LogOut size={16} />
          <span>Logout System</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
