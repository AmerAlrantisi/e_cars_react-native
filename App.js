import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/screens/navigation/MyStack';
import Preloader from './src/components/Preloader';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process (e.g., fetching data, initializing app)
    setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds delay
  }, []);

  return (
    <>
      <Preloader visible={loading} />
      {!loading && (
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
