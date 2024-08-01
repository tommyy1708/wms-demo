import React from 'react';
import { Spin } from 'antd';
import styles from './SpinOverLay.module.css'
const SpinOverLay = ({showSpin}) => {

  return (
    <div>
      {showSpin && (
        <div>
          <Spin className={styles.spinOverlay} size="large" />
        </div>
      )}
    </div>
  );
}

export default SpinOverLay;
