import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';
const PostCount = () => {
    const {token} = useAuth()
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/getpostcount', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCount(data.count); // Assuming the response contains a "count" field
        } else {
          console.error('Failed to fetch post count.');
        }
      } catch (error) {
        console.error('Error fetching post count:', error);
      }
    };

    fetchPostCount(); // Initial fetch

    // Polling interval to fetch updated count every 30 seconds (adjust as needed)
    const intervalId = setInterval(fetchPostCount, 30000); // 30 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [token]); // Include token in the dependency array

  return <>{count}</>;
};

export default PostCount;
