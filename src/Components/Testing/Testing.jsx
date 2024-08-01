import React from 'react';
import { TestApi } from '../../request/api';
const Testing = () => {
  const handling = async () => {
    let params = {
      category: 'bundles',
    }
    const response = await TestApi(params);
  };
  return (
    <div>
        <button onClick={handling}>redis</button>
    </div>
  );
}

export default Testing;
