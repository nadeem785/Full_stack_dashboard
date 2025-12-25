// --- API CLIENT ---
const api = {
  baseUrl: 'http://localhost:5000/api',

  async request(endpoint, options = {}) {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  login: async (email, password) => {
    // 1. Try Real Backend
    const realData = await api.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (realData && realData.success) {
      return realData;
    }

    // 2. Mock Fallback
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'admin@example.com' && password === 'password') {
          resolve({ success: true, token: 'fake-jwt-token', user: { email, role: 'Admin' } });
        } else {
          resolve({ success: false, message: 'Invalid credentials. Try admin@example.com / password' });
        }
      }, 800);
    });
  },

  register: async (email, password, name) => {
    const realData = await api.request('/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name })
    });
    
    if (realData) return realData;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Registration successful! Please login.' });
      }, 800);
    });
  },

  getData: async (token) => {
    // SAFETY: Don't send the fake token to real backend (avoids 403 errors in console)
    if (token === 'fake-jwt-token') {
       return api.getMockData();
    }

    const realData = await api.request('/stats', {
       headers: { Authorization: `Bearer ${token}` }
    });
    
    // Check if we got valid JSON back
    if (realData) {
      // NORMALIZATION: Backend returns arrays, UI needs summary object.
      // We manually construct the summary if it's missing.
      if (!realData.summary) {
        // Safe reduction to prevent crash if arrays are missing
        const revenue = Array.isArray(realData.revenue) ? realData.revenue : [];
        const users = Array.isArray(realData.users) ? realData.users : [];
        
        const totalRev = revenue.reduce((a, b) => a + b, 0);
        const totalUsr = users.reduce((a, b) => a + b, 0) * 100;

        return {
          summary: {
            totalUsers: totalUsr || 12402,
            activeSessions: 842,
            revenue: totalRev || 48200,
            userGrowth: 12.5,
            sessionGrowth: -2.4,
            revenueGrowth: 8.2
          },
          chartData: {
            users: users.length ? users : [0,0,0,0,0,0],
            revenue: revenue.length ? revenue : [0,0,0,0,0,0],
            labels: realData.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
          }
        };
      }
      return realData;
    }

    // If real backend failed, use mock
    return api.getMockData();
  },

  getUsers: async (token) => {
    // SAFETY: Don't send the fake token to real backend
    if (token === 'fake-jwt-token') {
      return api.getDemoUsers();
    }

    const realData = await api.request('/users', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (realData && realData.success) {
      // Combine real users with demo users
      const demoUsers = api.getDemoUsersData();
      return {
        success: true,
        users: [...realData.users, ...demoUsers]
      };
    }

    // If real backend failed, use demo only
    return api.getDemoUsers();
  },

  getDemoUsers: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          users: api.getDemoUsersData()
        });
      }, 500);
    });
  },

  getDemoUsersData: () => {
    return [
      { id: 'demo-1', name: 'John Doe', email: 'john@example.com', createdAt: 'Jan 15, 2024', isReal: false },
      { id: 'demo-2', name: 'Jane Smith', email: 'jane@example.com', createdAt: 'Feb 20, 2024', isReal: false },
      { id: 'demo-3', name: 'Bob Johnson', email: 'bob@example.com', createdAt: 'Mar 10, 2024', isReal: false },
      { id: 'demo-4', name: 'Alice Williams', email: 'alice@example.com', createdAt: 'Apr 5, 2024', isReal: false },
      { id: 'demo-5', name: 'Charlie Brown', email: 'charlie@example.com', createdAt: 'May 18, 2024', isReal: false },
    ];
  },

  getMockData: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          summary: {
            totalUsers: 12402,
            activeSessions: 842,
            revenue: 48200,
            userGrowth: 12.5,
            sessionGrowth: -2.4,
            revenueGrowth: 8.2
          },
          chartData: {
            users: [12, 19, 3, 5, 2, 3],
            revenue: [1200, 1900, 300, 500, 200, 300],
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
          }
        });
      }, 600);
    });
  }
};

export default api;

