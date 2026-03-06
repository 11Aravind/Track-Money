import { useAuth } from '../../context/AuthContext';
import { Menu, LogOut, Bell } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-brand-primary sticky top-0 z-40 shadow-md">
      <div className="flex items-center justify-between px-4 md:px-6 py-3.5">
        <div className="flex items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-white md:hidden">
            Trackify
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-blue-100">
              {user?.email}
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white"
            >
              <Menu size={22} />
            </button>

            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-premium-xl border border-surface-border z-20 animate-slide-down overflow-hidden">
                  <div className="p-4 border-b border-surface-border md:hidden">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-finance-expense hover:bg-finance-expense-light transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
