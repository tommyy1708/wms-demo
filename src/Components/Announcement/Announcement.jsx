import React, { useState, useEffect } from 'react';
import { GetAnnouncement } from '../../request/api';

const Announcement = () => {
  const [announcement, setAnnouncement] = useState('');
  const fetchData = async () => {
    const response = await GetAnnouncement();

    setAnnouncement(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="announcement-container">
      <p>{announcement}</p>
    </div>
  );
};

export default Announcement;
