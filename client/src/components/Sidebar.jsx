import { LayoutDashboard, Activity, Users, Database } from 'lucide-react';

const Sidebar = ({ activeSection, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Database },
  ];

  const handleClick = (sectionId) => {
    onNavigate(sectionId);
  };

  return (
    <aside className="w-64 bg-slate-900 dark:bg-slate-950 text-white hidden md:flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <LayoutDashboard className="text-blue-400" /> Admin
        </h2>
      </div>
      <nav className="mt-6 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive
                  ? 'bg-slate-800 dark:bg-slate-800 border-r-4 border-blue-500 text-white'
                  : 'hover:bg-slate-800 dark:hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Icon size={20} /> {item.label}
            </button>
          );
        })}
      </nav>
      <div className="p-6 border-t border-slate-800 dark:border-slate-700">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          Database Connected
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

