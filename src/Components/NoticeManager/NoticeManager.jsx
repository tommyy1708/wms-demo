import React, { useEffect, useState } from 'react';
import { Input, Button, List, message } from 'antd';
import {
  UpdateAnnouncement,
  GetAnnouncement,
  DeleteAnnouncement,
} from '../../request/api';
const NoticeManager = () => {
  const [announcements, setAnnouncements] = useState();
  const [newAnnouncement, setNewAnnouncement] = useState('');

  const addAnnouncement = async () => {
    if (newAnnouncement.trim() !== '') {
      const response = await UpdateAnnouncement(newAnnouncement);
      if (response.errCode !== 0) {
        message.error(response.message);
         return;
      }
      const announceList = await GetAnnouncement();
      setAnnouncements(announceList.data);
      setNewAnnouncement('');
    }
  };

  const deleteAnnouncement = async (index) => {
    const response = await DeleteAnnouncement(index);
    setAnnouncements(response.data);
  };

  const fetchData = async () => {
    const response = await GetAnnouncement();
    setAnnouncements(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Announcement Manager</h2>
      <Input
        placeholder="Enter new announcement"
        value={newAnnouncement}
        onChange={(e) => setNewAnnouncement(e.target.value)}
      />
      <Button type="primary" onClick={addAnnouncement}>
        Add Announcement
      </Button>
      <List
        dataSource={announcements}
        renderItem={(item) => (
          <List.Item key={item.id}>
            {item.content}
            <Button
              danger
              type="text"
              onClick={() => deleteAnnouncement(item.id)}
            >
              Delete
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default NoticeManager;
