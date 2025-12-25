import { Users, Activity, Database } from 'lucide-react';
import StatCard from './StatCard';
import Charts from './Charts';

const DashboardView = ({ data, loading, chartJsLoaded }) => {
  const summary = data.summary || {};

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Users" 
          value={summary.totalUsers?.toLocaleString() || '0'} 
          growth={summary.userGrowth || 0} 
          icon={Users} 
          loading={loading}
          colorScheme="blue"
        />
        <StatCard 
          title="Active Sessions" 
          value={summary.activeSessions?.toLocaleString() || '0'} 
          growth={summary.sessionGrowth || 0} 
          icon={Activity} 
          loading={loading}
          colorScheme="purple"
        />
        <StatCard 
          title="Total Revenue" 
          value={`$${summary.revenue?.toLocaleString() || '0'}`} 
          growth={summary.revenueGrowth || 0} 
          icon={Database} 
          loading={loading}
          colorScheme="emerald"
        />
      </div>

      <Charts chartData={data.chartData} chartJsLoaded={chartJsLoaded} />
    </div>
  );
};

export default DashboardView;

