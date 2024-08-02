import React, { useEffect, useState } from 'react';
import { GetBanner } from '../../request/api';
import {Image} from 'antd'
const DisplayBanner = () => {
  const [showBanner, setShowBanner] = useState(false)
  const [bannerUrl, setBannerUrl] = useState('')
  const fetchData = async () => {
    const response = await GetBanner();
    if (response.data !== 'empty') {
      setBannerUrl(response.data);
      setShowBanner(true);
    }
    return
  }
  // useEffect(() => {
  //   fetchData();
  // },[])
  return (
    <>
      {showBanner && <Image width={'100%'} height={'100%'} src={bannerUrl} alt="#" preview={false} />}
    </>
  );
}

export default DisplayBanner;
