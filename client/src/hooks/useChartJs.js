import { useState, useEffect } from 'react';

// --- PREVIEW ENVIRONMENT HELPER (DO NOT USE IN VITE) ---
const useChartJs = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.Chart) {
      setLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  }, []);

  return loaded;
};

export default useChartJs;

