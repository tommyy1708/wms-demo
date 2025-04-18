import request from './request';

export const LoginApi = (params) =>
  request.post('/api/supplier-login', params);

export const GetUserInfo = (params) =>
  request.get('/api/supplier-user', { params });

export const User = (data) =>
  request.post('/api/supplier-user', { params: data });

export const Category = (params) =>
  request.post('/api/supplier-category', { params });

export const PostBanner = (params) =>
  request.post('/api/supplier-banner', { params });

export const GetBanner = () => request.get('/api/supplier-get-banner');

export const CustomerDelete = (id) =>
  request.delete(`/api/supplier-user/${id}`);

export const Product = (params) =>
  request.post('/api/supplier-product', { params });

export const ProductUpdate = (params) =>
  request.put('/api/supplier-product', { params });

export const ProductDelete = (itemCode) =>
  request.delete(`/api/supplier-product/${itemCode}`);

export const GetProduct = (params) =>
  request.get('/api/supplier-product', { params });

export const GetUserList = () => request.get('/api/supplier-user-list');

export const GetOrders = () => {
  return request.get(`/api/supplier-orders`);
};

export const GetCategoryApi = () => request.get('/api/supplier-category');

export const CategoryUpdate = (params) =>
  request.put('/api/supplier-category', { params });

export const CategoryDelete = (categoryName) =>
  request.delete(`/api/supplier-category/${categoryName}`);

export const GetCategoryList = (params) =>
  request.get(`/api/supplier-category/${params}`);

export const PasswordUpdate = (params) =>
  request.put('/api/passwordUpdate', params);

export const UpdateAnnouncement = (content) =>
  request.post(`/api/supplier-announcement`, { content });

export const DeleteAnnouncement = (content) =>
  request.post(`/api/supplier-delete-announcement`, { content });

export const GetAnnouncement = () =>
  request.get(`/api/supplier-announcement`);

export const ChangeAdmin = (params) =>
  request.put(`/api/supplier-admin-change`, params);

export const ChangePause = (params) =>
  request.put(`/api/supplier-pause-change`, params);

export const newOrderSendApi = (params) => {
  return request.post(`/api/supplier-addNewOrder`, params);
};

export const GetOrdersByDate = (params) =>
  request.get(`/api/supplier-ordersbydate`, { params });

export const SendVerifyCode = (params) =>
  request.post(`/api/password-retrieval`, params);

export const UploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return request.post('/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const UploadCsv = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return request.post('/upload-csv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const UpdateCsv = (fileUrl) =>
  request.post(`/api/update-csv`, { fileUrl });

export const ReplyOrder = (params) =>
  request.put(`/api/supplier-received`, params);

export const SendNewMessage = (params) =>
  request.post(`/api/supplier-message`, { params });

export const GetMessages = (params) =>
  request.get(`/api/supplier-messages`, { params });

export const MessageRead = (messageId) =>
  request.put(`/api/supplier-messages/read/${messageId}`);

export const SendSelectMessages = (params) =>
  request.post(`/api/supplier-select-message`, { params });

export const DeleteSelectedMessages = (params) => {
  request.delete(`/api/supplier-select-messages`, { data: params });
};

export const VerifyToken = () =>
  request.get(`/api/supplier-verify-token`);

export const TestApi = (params) =>
  request.get(`/api/test-api`, { params });
