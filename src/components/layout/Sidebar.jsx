import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Receipt, 
  FolderOpen, 
  BarChart3, 
  Settings,
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/transactions', icon: Receipt, label: 'Transactions' },
    { path: '/categories', icon: FolderOpen, label: 'Categories' },
    { path: '/reports', icon: BarChart3, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-primary-gray-200 min-h-screen">
      <div className="p-6 border-b border-primary-gray-200">
        <h1 className="text-2xl font-bold text-primary-black">Trackify</h1>
        <p className="text-sm text-primary-gray-600 mt-1">Expense Tracker</p>
      </div>

      <nav className="flex-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link mb-2 ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary-gray-200">
        <button
          onClick={handleLogout}
          className="nav-link w-full text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
