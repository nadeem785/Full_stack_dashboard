import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import useChartJs from '../hooks/useChartJs';
import api from '../utils/api';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardView from './DashboardView';
import Users from './Users';
import Settings from './Settings';

const Dashboard = ({ user, token, onLogout }) => {
  // Safety check to prevent blank page crash if user data is missing
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="animate-spin text-blue-600 dark:text-blue-400" size={32} />
          <p className="text-slate-600 dark:text-slate-300 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const [activeSection, setActiveSection] = useState('dashboard');
  const chartJsLoaded = useChartJs();
  const [loading, setLoading] = useState(true);
  
  // ROBUST INITIAL STATE: Ensures data.summary is never undefined
  const [data, setData] = useState({
    summary: { totalUsers: 0, activeSessions: 0, revenue: 0, userGrowth: 0, sessionGrowth: 0, revenueGrowth: 0 },
    chartData: { users: [], revenue: [], labels: [] }
  });

  const fetchData = async () => {
    setLoading(true);
    const result = await api.getData(token);
    
    // Only update if we have a valid result object
    if (result && result.summary) {
      setData(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (chartJsLoaded && activeSection === 'dashboard') {
      fetchData();
    }
  }, [chartJsLoaded, activeSection]);

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'users':
        return 'Users Management';
      case 'settings':
        return 'Settings';
      case 'dashboard':
      default:
        return 'Overview';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <Users token={token} />;
      case 'settings':
        return <Settings />;
      case 'dashboard':
      default:
        return <DashboardView data={data} loading={loading} chartJsLoaded={chartJsLoaded} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex font-sans">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />

      <main className="flex-1 overflow-y-auto">
        <Header 
          user={user} 
          onRefresh={() => activeSection === 'dashboard' && fetchData()} 
          onLogout={onLogout} 
          loading={loading}
          sectionTitle={getSectionTitle()}
        />

        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;

