import { RefreshCw, LogOut } from 'lucide-react';

const Header = ({ user, onRefresh, onLogout, loading, sectionTitle = 'Overview' }) => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm h-16 flex items-center justify-between px-8 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
      <div className="font-semibold text-slate-700 dark:text-slate-200">{sectionTitle}</div>
      <div className="flex items-center gap-4">
        <button 
          onClick={onRefresh}
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-full transition-all"
          title="Refresh Data"
          disabled={loading}
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
        <span className="text-sm text-slate-600 dark:text-slate-300 hidden sm:block">
          <span className="font-bold">{user?.email || 'User'}</span>
        </span>
        <button 
          onClick={onLogout}
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 rounded-full transition-all"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;

