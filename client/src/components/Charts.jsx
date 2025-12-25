import { useRef, useEffect } from 'react';

const Charts = ({ chartData, chartJsLoaded }) => {
  const chartInstances = useRef({});

  useEffect(() => {
    if (!chartJsLoaded || !chartData) return;

    const updateCharts = (chartData) => {
      if (!window.Chart || !chartData) return;

      if (chartInstances.current.bar) chartInstances.current.bar.destroy();
      if (chartInstances.current.doughnut) chartInstances.current.doughnut.destroy();

      const commonOptions = {
          responsive: true, 
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } }
      };

      const barCtx = document.getElementById('barChart');
      if (barCtx) {
        chartInstances.current.bar = new window.Chart(barCtx.getContext('2d'), {
          type: 'line',
          data: {
            labels: chartData.labels || [],
            datasets: [{
              label: 'New Users',
              data: chartData.users || [],
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderColor: 'rgb(59, 130, 246)',
              borderWidth: 2,
              tension: 0.4,
              fill: true
            }]
          },
          options: commonOptions
        });
      }

      const doughCtx = document.getElementById('doughnutChart');
      if (doughCtx) {
        chartInstances.current.doughnut = new window.Chart(doughCtx.getContext('2d'), {
          type: 'doughnut',
          data: {
            labels: ['Direct', 'Social', 'Referral'],
            datasets: [{
              data: [
                chartData.traffic?.Direct || 0,
                chartData.traffic?.Social || 0,
                chartData.traffic?.Referral || 0
              ],
              backgroundColor: [
                'rgb(59, 130, 246)',
                'rgb(16, 185, 129)',
                'rgb(245, 158, 11)'
              ],
              hoverOffset: 4
            }]
          },
          options: commonOptions
        });
      }
    };

    updateCharts(chartData);

    // Cleanup function to destroy charts on unmount
    return () => {
      if (chartInstances.current.bar) {
        chartInstances.current.bar.destroy();
      }
      if (chartInstances.current.doughnut) {
        chartInstances.current.doughnut.destroy();
      }
    };
  }, [chartJsLoaded, chartData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-700 dark:text-slate-200">User Growth</h3>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">Last 6 Months</span>
        </div>
        <div className="h-64 relative">
          {chartJsLoaded ? <canvas id="barChart"></canvas> : <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-500">Loading Chart...</div>}
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-700 dark:text-slate-200">Traffic Sources</h3>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">Live</span>
        </div>
        <div className="h-64 relative flex items-center justify-center">
          {chartJsLoaded ? <canvas id="doughnutChart"></canvas> : <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-500">Loading Chart...</div>}
        </div>
      </div>
    </div>
  );
};

export default Charts;

