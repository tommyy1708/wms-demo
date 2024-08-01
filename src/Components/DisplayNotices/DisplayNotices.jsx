import React, { useState, useEffect } from 'react';
import { Alert } from 'antd';
import styles from './DisplayNotices.module.css';
import { GetAnnouncement } from '../../request/api';
const DisplayNotices = () => {
  const [notices, setNotices] = useState([]);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  // const fetchData = async () => {
  //   const announceList = await GetAnnouncement();
  //   setNotices(announceList.data);
  // };
  const fetchData = async () => {
    try {
      const announceList = await GetAnnouncement();
      setNotices(announceList.data);
      indexInterval();
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };
  const indexInterval = () => {
    let displayChange = setInterval(changeIndex, 5000);
    function changeIndex() {
      const maxLength = notices.length;
      if (maxLength === 0) {
        clearInterval(displayChange);
      }
      let num = 0;
      if (num < maxLength) {
        setCurrentNoticeIndex(num + 1);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.noticeDisplay}>
      {notices.length > 0 ? (
        <Alert
          message={notices[currentNoticeIndex].content}
          type="info"
          showIcon
        />
      ) : null}
    </div>
  );
};

export default DisplayNotices;
