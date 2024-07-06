import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import RobotDashboard from './components/RobotDashboard';
import Login from './components/Login';

const AppContent = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-white text-2xl">Loading...</p>
    </div>;
  }

  return user ? <RobotDashboard /> : <Login />;
};

function App() {
  return (
    <AuthProvider>
      <div className="App min-h-screen bg-gray-100">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;