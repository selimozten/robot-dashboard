import React, { useState, useContext, useEffect } from 'react';
import { ChartBarIcon, BoltIcon, Battery100Icon, ScaleIcon, ExclamationTriangleIcon, BeakerIcon } from '@heroicons/react/24/solid';
import { Switch } from '@headlessui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { AuthContext } from '../context/AuthContext';
import { supabase } from '../services/supabase';
import { useRobotData } from '../hooks/useRobotData';
import DataCard from './DataCard';
import StatusIndicator from './StatusIndicator';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RobotDashboard = () => {
  const { user } = useContext(AuthContext);
  const { robotData, loading, error } = useRobotData();
  const [isRunning, setIsRunning] = useState(false);
  const [historicalData, setHistoricalData] = useState({
    labels: [],
    speedData: [],
    batteryData: []
  });

  useEffect(() => {
    if (!loading && !error) {
      updateHistoricalData(robotData);
    }
  }, [robotData, loading, error]);

  const updateHistoricalData = (newData) => {
    const now = new Date();
    setHistoricalData(prevData => {
      const newLabels = [...prevData.labels, now.toLocaleTimeString()].slice(-10);
      const newSpeedData = [...prevData.speedData, newData.speed].slice(-10);
      const newBatteryData = [...prevData.batteryData, newData.battery].slice(-10);
      return {
        labels: newLabels,
        speedData: newSpeedData,
        batteryData: newBatteryData
      };
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Robot Performance',
      },
    },
  };

  const chartData = {
    labels: historicalData.labels,
    datasets: [
      {
        label: 'Speed (m/s)',
        data: historicalData.speedData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Battery (%)',
        data: historicalData.batteryData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-white text-2xl">Loading...</p>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-red-500 text-2xl">{error}</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">KINETIKA Robot Dashboard</h1>
        <div className="text-2xl">{new Date().toLocaleTimeString()}</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DataCard icon={ChartBarIcon} title="Speed" value={robotData.speed} unit="m/s" />
        <DataCard icon={Battery100Icon} title="Battery" value={robotData.battery} unit="%" />
        <DataCard icon={BoltIcon} title="Current" value={robotData.current} unit="A" />
        <DataCard icon={ScaleIcon} title="Load Weight" value={robotData.weight} unit="kg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatusIndicator 
          icon={ExclamationTriangleIcon} 
          title="Obstacle" 
          status={!robotData.obstacleDetected}
          color="text-yellow-500"
        />
        <StatusIndicator 
          icon={BeakerIcon} 
          title="Temperature" 
          status={robotData.temperature < 40}
          color="text-red-500"
        />
        <StatusIndicator 
          icon={ExclamationTriangleIcon} 
          title="Gas Detection" 
          status={!robotData.gasDetected}
          color="text-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Performance Chart</h2>
          <Line options={chartOptions} data={chartData} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Controls</h2>
          <div className="flex flex-col space-y-4">
            <Switch
              checked={isRunning}
              onChange={setIsRunning}
              className={`${
                isRunning ? 'bg-blue-600' : 'bg-gray-700'
              } relative inline-flex h-12 w-full items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Enable robot</span>
              <span
                className={`${
                  isRunning ? 'translate-x-full' : 'translate-x-1'
                } inline-block h-10 w-10 transform rounded-full bg-white transition-transform`}
              />
              <span className={`absolute ${isRunning ? 'left-4' : 'right-4'} text-sm font-medium`}>
                {isRunning ? 'Running' : 'Stopped'}
              </span>
            </Switch>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Lifting Status:</span>
              <span className={`font-medium ${robotData.liftingStatus ? 'text-green-500' : 'text-red-500'}`}>
                {robotData.liftingStatus ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-right mt-4">
        <p className="mb-2">Logged in as: {user.email}</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default RobotDashboard;