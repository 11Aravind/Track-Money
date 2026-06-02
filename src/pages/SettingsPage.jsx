import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useCategories from '../hooks/useCategories';
import { mergeCategories } from '../firebase/firestore';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { User, Mail, LogOut, ShieldCheck, Database, Zap } from 'lucide-react';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const { categories } = useCategories();
  const [merging, setMerging] = useState(false);
  const [status, setStatus] = useState(null);

  const handleLogout = async () => {
    await logout();
  };

  const findDuplicates = () => {
    if (!categories) return [];
    const seen = {};
    const duplicates = [];
    
    categories.forEach(cat => {
      // Trim whitespace and normalize to lowercase for matching
      const normalizedName = cat.name.trim().toLowerCase();
      const key = `${normalizedName}-${cat.type}`;
      
      if (seen[key]) {
        duplicates.push({ keep: seen[key], remove: cat });
      } else {
        seen[key] = cat;
      }
    });
    
    return duplicates;
  };

  const handleMergeDuplicates = async () => {
    const duplicates = findDuplicates();
    if (duplicates.length === 0) {
      setStatus({ type: 'success', message: 'No duplicate categories detected.' });
      return;
    }

    if (!window.confirm(`Detected ${duplicates.length} duplicate(s). Merge them now? (Transactions will be combined).`)) {
      return;
    }

    setMerging(true);
    setStatus({ type: 'info', message: 'Executing data migration...' });

    let mergedCount = 0;
    try {
      for (const dup of duplicates) {
        const result = await mergeCategories(user.uid, dup.keep.id, dup.remove.id);
        if (result.success) mergedCount++;
      }
      setStatus({ type: 'success', message: `Successfully merged ${mergedCount} category groups.` });
    } catch (error) {
      setStatus({ type: 'error', message: 'Migration failed. Check console for logs.' });
    } finally {
      setMerging(false);
    }
  };

  const duplicates = findDuplicates();

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
          <h2 className="text-xs font-bold text-text-primary mb-6 uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck size={14} className="text-cyber-accent-green" />
            Core Identity
          </h2>
          
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
          <h2 className="text-xs font-bold text-text-primary mb-6 uppercase tracking-widest flex items-center gap-2">
            <Database size={14} className="text-cyber-accent-blue" />
            Maintenance & Data Integrity
          </h2>
          
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black text-text-primary uppercase tracking-widest mb-1">Merge Duplicate Categories</p>
                <p className="text-[10px] text-text-muted-70 leading-relaxed max-w-sm">
                  Detects and combines categories with identical names. Transactions will be moved to a single category automatically.
                </p>
              </div>
              <Button
                variant={duplicates.length > 0 ? "primary" : "secondary"}
                onClick={handleMergeDuplicates}
                disabled={merging}
                className="whitespace-nowrap"
              >
                <Zap size={14} className={merging ? "animate-spin" : ""} />
                {merging ? 'Processing...' : duplicates.length > 0 ? `Merge ${duplicates.length} Duplicates` : 'Scan Integrity'}
              </Button>
            </div>

            {status && (
              <div className={`p-4 rounded-xl text-[10px] font-bold uppercase tracking-widest border ${
                status.type === 'success' ? 'bg-cyber-accent-green/10 border-cyber-accent-green/30 text-cyber-accent-green' :
                status.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-500' :
                'bg-cyber-accent-blue/10 border-cyber-accent-blue/30 text-cyber-accent-blue'
              }`}>
                {status.message}
              </div>
            )}
          </div>
        </Card>

        <Card className="bg-surface-overlay/20 border-surface-border-light">
          <h2 className="text-xs font-bold text-text-primary mb-6 uppercase tracking-widest flex items-center gap-2">
            <LogOut size={14} className="text-red-500" />
            Session Operations
          </h2>
          
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
          <h2 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
            <Zap size={14} className="text-cyber-accent-green" />
            System Documentation
          </h2>
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
