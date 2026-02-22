import { useAuth } from '../../context/AuthContext';
import { Menu, LogOut } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white border-b border-primary-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-primary-black md:hidden">
            Trackify
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-primary-black">
              {user?.email}
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-primary-gray-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>

            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-premium-lg border border-primary-gray-200 z-20 animate-slide-down">
                  <div className="p-4 border-b border-primary-gray-200 md:hidden">
                    <p className="text-sm font-medium text-primary-black truncate">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
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
