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
          setCount(data.count);
        } else {
          console.error('Failed to fetch post count.');
        }
      } catch (error) {
        console.error('Error fetching post count:', error);
      }
    };

    fetchPostCount();

    const intervalId = setInterval(fetchPostCount, 30000);

    return () => clearInterval(intervalId);
  }, [token]);

  return <>{count}</>;
};

export default PostCount;
