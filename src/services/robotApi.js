// This is a mock API for demonstration purposes
export const fetchRobotData = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
  
    return {
      speed: Math.random() * 10,
      battery: Math.random() * 100,
      current: Math.random() * 30,
      weight: Math.random() * 100,
      obstacleDetected: Math.random() > 0.7,
      temperature: Math.random() * 50,
      gasDetected: Math.random() > 0.9,
      liftingStatus: Math.random() > 0.5
    };
  };