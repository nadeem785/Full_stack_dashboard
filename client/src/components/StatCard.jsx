import { ArrowUp, ArrowDown } from 'lucide-react';

const StatCard = ({ title, value, growth, icon: Icon, loading, colorScheme = 'blue' }) => {
  const colorSchemes = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20',
      iconBg: 'bg-blue-500 dark:bg-blue-600',
      iconColor: 'text-white',
      border: 'border-blue-200 dark:border-blue-700',
      title: 'text-blue-700 dark:text-blue-300',
      value: 'text-blue-900 dark:text-blue-100',
      shadow: 'shadow-blue-100 dark:shadow-blue-900/50'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20',
      iconBg: 'bg-purple-500 dark:bg-purple-600',
      iconColor: 'text-white',
      border: 'border-purple-200 dark:border-purple-700',
      title: 'text-purple-700 dark:text-purple-300',
      value: 'text-purple-900 dark:text-purple-100',
      shadow: 'shadow-purple-100 dark:shadow-purple-900/50'
    },
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/20',
      iconBg: 'bg-emerald-500 dark:bg-emerald-600',
      iconColor: 'text-white',
      border: 'border-emerald-200 dark:border-emerald-700',
      title: 'text-emerald-700 dark:text-emerald-300',
      value: 'text-emerald-900 dark:text-emerald-100',
      shadow: 'shadow-emerald-100 dark:shadow-emerald-900/50'
    }
  };

  const scheme = colorSchemes[colorScheme] || colorSchemes.blue;

  return (
    <div className={`relative overflow-hidden ${scheme.bg} p-6 rounded-2xl border ${scheme.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${scheme.shadow} shadow-lg`}>
      {/* Decorative gradient overlay */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${scheme.iconBg} opacity-10 rounded-full blur-3xl -mr-16 -mt-16`}></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className={`${scheme.title} text-sm font-semibold mb-2 uppercase tracking-wide`}>
              {title}
            </div>
            {loading ? (
              <div className="h-10 w-32 bg-white/50 dark:bg-slate-700/50 animate-pulse rounded-lg"></div>
            ) : (
              <div className={`${scheme.value} text-4xl font-bold mb-1`}>{value}</div>
            )}
          </div>
          <div className={`${scheme.iconBg} p-3 rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-200`}>
            <Icon className={`${scheme.iconColor}`} size={28} />
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/30 dark:border-slate-600/30 flex items-center gap-2 text-sm">
          {loading ? (
            <div className="h-4 w-20 bg-white/50 dark:bg-slate-700/50 animate-pulse rounded"></div>
          ) : (
            <>
              {growth >= 0 ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-semibold text-xs">
                  <ArrowUp size={14} className="font-bold" /> {growth}%
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 font-semibold text-xs">
                  <ArrowDown size={14} className="font-bold" /> {Math.abs(growth)}%
                </span>
              )}
              <span className="text-slate-600 dark:text-slate-400 text-xs font-medium">vs last month</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

