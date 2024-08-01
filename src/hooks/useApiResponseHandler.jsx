import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useApiResponseHandler = (apiFunction, ...args) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFunction(...args);
        // Handle the successful response here
        if (!response || response.error || response.errCode !== 0) {
          console.error(
            'API request failed, jumping to login page in 3 seconds'
          );
          const timeoutId = setTimeout(() => {
            navigate('/login');
          }, 3000);

          return () => clearTimeout(timeoutId);
        }
        console.log('API request successful:');
      } catch (error) {
        console.error('API request failed:', error.message);
        // Handle errors if needed
      }
    };

    fetchData(); // Call the fetchData function directly

    // No need for cleanup function here
  }, [apiFunction, args, navigate]);
};

export default useApiResponseHandler;
