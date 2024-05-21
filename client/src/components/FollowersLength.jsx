import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';
const FollowersLength = () => {
const {token} = useAuth()
  const [followersSize, setFollowersSize] = useState(0);

  const getFollowersLength = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/getfollowerslength`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch followers count');
      }

      const data = await response.json();

      if (!data || typeof data.data !== 'number') {
        throw new Error('Invalid response format');
      }

      const followersCount = data.data;
      console.log('Followers count:', followersCount);
      setFollowersSize(followersCount);
    } catch (error) {
      console.error('Error fetching followers count:', error);
      alert("Close the application, it's crashing!");
    }
  };

  useEffect(() => {
    getFollowersLength();
  }, []);

  return (
    <div>
      <p>{followersSize}</p>
    </div>
  );
};

export default FollowersLength;
