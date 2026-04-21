import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Menu, LogOut, WifiOff, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import useOnlineStatus from '../../hooks/useOnlineStatus';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const isOnline = useOnlineStatus();

  const handleLogout = async () => {
    await logout();
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {!isOnline && (
        <div className="bg-red-600 text-white text-center py-2 text-sm font-medium animate-pulse sticky top-0 z-50 flex items-center justify-center gap-2">
          <WifiOff size={16} />
          <span>You are currently offline. Some features may be unavailable.</span>
        </div>
      )}
      <header className="bg-surface-card/70 backdrop-blur-md sticky top-0 z-40 border-b border-surface-border transition-all duration-300">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-heading font-black text-text-primary md:hidden uppercase tracking-tighter">
              Trackify<span className="text-cyber-accent-green">.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center bg-surface-card/40 border border-surface-border hover:border-cyber-accent-green hover:text-cyber-accent-green rounded-xl transition-all text-text-primary shadow-sm"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="text-right hidden md:block group cursor-default">
              <p className="text-[10px] font-bold text-cyber-accent-blue uppercase tracking-widest mb-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                System Authorized
              </p>
              <p className="text-xs font-mono text-text-secondary group-hover:text-text-primary transition-colors">
                {user?.email}
              </p>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 flex items-center justify-center bg-surface-card/40 border border-surface-border hover:border-cyber-accent-green hover:text-cyber-accent-green rounded-xl transition-all text-text-primary shadow-sm"
              >
                <Menu size={18} />
              </button>

              {showMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 mt-3 w-64 bg-surface-card/95 backdrop-blur-xl shadow-premium-xl rounded-2xl border border-surface-border z-20 animate-scale-in overflow-hidden">
                    <div className="p-5 border-b border-surface-border">
                      <p className="text-[10px] font-bold text-cyber-accent-blue uppercase tracking-[0.2em] mb-1.5 opacity-80">
                        Authorized Identity
                      </p>
                      <p className="text-xs font-mono text-text-secondary truncate">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-4 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-black/5 dark:hover:bg-white/5 hover:text-red-400 transition-all duration-200"
                    >
                      <LogOut size={16} />
                      <span>Terminate Session</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
