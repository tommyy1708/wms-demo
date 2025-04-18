import axios from 'axios';

//settings
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

//add request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    //action for request error
    console.error(error);

    return Promise.reject(error);
  }
);

//add response interceptor
instance.interceptors.response.use(
  function (response) {
    return response?.data ?? response;
  },
  function (error) {

   if (error.response?.status === 401) {
     localStorage.clear();
     window.location.replace('/login');
   }
   return Promise.reject(error);

  }
);

export default instance;
