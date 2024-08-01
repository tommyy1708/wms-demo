import axios from 'axios';

//settings
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  timeout: 5000,
});

//add request interceptor
instance.interceptors.request.use(
 config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    //action for request error
    console.error(error);

Promise.reject(error);
    return ;
  }
);

//add response interceptor
instance.interceptors.response.use(
  function (response) {
    try {
      if (!response) {

        return response.message;
      } else {

        return response.data;
      }
    } catch (error) {
      return error;
    }
  },
  function (error) {
    //action for response error
    // Promise.reject(error);
    return ;
  }
);

export default instance;
