import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { User, Mail, LogOut } from 'lucide-react';

const SettingsPage = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-black text-text-primary uppercase tracking-widest">
          System Control<span className="text-cyber-accent-blue">_</span>
        </h1>
        <p className="text-[10px] font-bold text-cyber-accent-blue tracking-[0.3em] uppercase mt-1 opacity-70">
          User Configuration & Telemetry
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        <Card className="bg-surface-overlay/20 border-surface-border-light">
          <h2 className="text-xs font-bold text-text-primary mb-6 uppercase tracking-widest">Core Identity</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-5 bg-surface-card/40 border border-surface-border rounded-2xl group transition-all duration-300 hover:border-cyber-accent-blue hover:bg-cyber-accent-blue/5">
              <div className="w-10 h-10 rounded-xl bg-surface-card border border-surface-border flex items-center justify-center text-cyber-accent-blue group-hover:scale-110 transition-transform">
                <Mail size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[8px] font-bold text-text-muted-40 uppercase tracking-widest mb-0.5">Primary Communication</p>
                <p className="text-sm font-mono text-text-primary">{user?.email}</p>
              </div>
            </div>
 
            <div className="flex items-center gap-4 p-5 bg-surface-card/40 border border-surface-border rounded-2xl group transition-all duration-300 hover:border-cyber-accent-green hover:bg-cyber-accent-green/5">
              <div className="w-10 h-10 rounded-xl bg-surface-card border border-surface-border flex items-center justify-center text-cyber-accent-green group-hover:scale-110 transition-transform">
                <User size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[8px] font-bold text-text-muted-40 uppercase tracking-widest mb-0.5">Internal Identifier</p>
                <p className="text-sm font-mono text-text-primary truncate max-w-[200px]">
                  {user?.uid}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-surface-overlay/20 border-surface-border-light">
          <h2 className="text-xs font-bold text-text-primary mb-6 uppercase tracking-widest">Session Operations</h2>
          
          <Button
            variant="danger"
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full sm:w-auto"
          >
            <LogOut size={16} />
            Termimate Session
          </Button>
        </Card>

        <Card className="bg-surface-overlay/20 border-surface-border-light">
          <h2 className="text-xs font-bold text-text-primary mb-6 uppercase tracking-widest">System Documentation</h2>
          <div className="space-y-4">
            <p className="text-xs leading-relaxed text-text-secondary font-medium">
              Trackify is a high-precision, theme-adaptive financial telemetry system designed for 
              real-time expense tracking and analytical projection.
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-surface-border">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyber-accent-green animate-pulse" />
                <span className="text-[10px] font-bold text-text-muted-70 uppercase tracking-widest">Module Status: Active</span>
              </div>
              <span className="text-[10px] font-mono text-text-muted-40">Build 1.0.0-Stable</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
