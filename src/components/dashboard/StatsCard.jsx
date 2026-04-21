import { formatCurrency } from '../../utils/formatters';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, trend, type = 'neutral', className = '', tags }) => {
  const colorMap = {
    income: 'text-cyber-accent-green bg-cyber-accent-green/10 border-cyber-accent-green/20',
    expense: 'text-cyber-accent-blue bg-cyber-accent-blue/10 border-cyber-accent-blue/20',
    savings: 'text-cyber-accent-blue bg-cyber-accent-blue/10 border-cyber-accent-blue/20',
    lent: 'text-cyber-accent-green bg-cyber-accent-green/10 border-cyber-accent-green/20',
    borrow: 'text-cyber-accent-blue bg-cyber-accent-blue/10 border-cyber-accent-blue/20',
    neutral: 'text-text-primary bg-surface-card/5 border-surface-border'
  };

  return (
    <div className={`stats-card group overflow-hidden ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="stats-label">{title}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="stats-value text-text-primary font-heading">
              {formatCurrency(value).split(/(\d+)/).map((part, i) => (
                /\d+/.test(part) ? <span key={i} className="font-mono-numbers">{part}</span> : part
              ))}
            </h3>
          </div>
        </div>
        <div className={`p-3 rounded-xl border transition-all duration-500 group-hover:scale-110 ${colorMap[type]}`}>
          <Icon size={20} />
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        {trend && (
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
            {trend > 0 ? (
              <>
                <TrendingUp size={12} className="text-cyber-accent-green" />
                <span className="text-cyber-accent-green">+{trend}%</span>
              </>
            ) : trend < 0 ? (
              <>
                <TrendingDown size={12} className="text-cyber-accent-blue" />
                <span className="text-cyber-accent-blue">{trend}%</span>
              </>
            ) : null}
            <span className="text-text-muted-40 ml-1 italic lowercase">vs prev</span>
          </div>
        )}

        {tags && Object.entries(tags).map(([tag, amount]) => amount > 0 && (
          <div key={tag} className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-card/5 border border-surface-border-light">
            <span className="text-[8px] font-black text-text-muted-40 uppercase tracking-tighter">{tag}:</span>
            <span className="text-[9px] font-mono-numbers text-text-secondary tracking-tighter">{formatCurrency(amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;
