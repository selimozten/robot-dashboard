import { useState, useEffect } from 'react';
import { fetchRobotData } from '../services/robotApi';

export const useRobotData = () => {
  const [robotData, setRobotData] = useState({
    speed: 0,
    battery: 0,
    current: 0,
    weight: 0,
    obstacleDetected: false,
    temperature: 0,
    gasDetected: false,
    liftingStatus: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRobotData();
        setRobotData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch robot data');
        setLoading(false);
      }
    };

    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return { robotData, loading, error };
};