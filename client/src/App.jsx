import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

export default function App() {
  const [view, setView] = useState('login'); 
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleLogin = (userData, token) => {
    setUser(userData);
    setToken(token);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setView('login');
  };

  return (
    <>
      {view === 'login' && <Login onSwitch={() => setView('register')} onLogin={handleLogin} />}
      {view === 'register' && <Register onSwitch={() => setView('login')} />}
      {view === 'dashboard' && <Dashboard user={user} token={token} onLogout={handleLogout} />}
    </>
  );
}
