import React, { useState } from 'react';
import {
  Upload,
  Form,
  Button,
  notification,
  message,
} from 'antd';
import { UploadImage, PostBanner } from '../../request/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const AdminBanner = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imageName, setImageName] = useState();

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file');
      return false;
    }

    const isLt150KB = file.size / 1024 < 2500;
    if (!isLt150KB) {
      message.error('Image must be smaller than 750KB');
      return false;
    }

    return isJpgOrPng && isLt150KB;
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const response = await UploadImage(file);

      if (response && response.errCode === 0) {
        setImageUrl(response.data.url);
        setImageName(response.data.originName);
        onSuccess();
        setFileList((prevFileList) => [
          ...prevFileList,
          {
            ...file,
            thumbUrl: response.data.url,
            url: response.data.url,
          },
        ]);
      } else {
        notification.error({
          message: response.error,
        });
      }
    } catch (error) {
      onError(error);
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setFileList((prevFileList) => [...prevFileList, info.file]);
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const nonUploadButton = (
    <div>
      <img
        src={imageUrl}
        alt="avatar"
        style={{
          width: '100%',
        }}
      />
      {imageName ? (
        <span style={{ color: 'blue' }}>{imageName}</span>
      ) : null}
    </div>
  );
  const uploadButton = (
    <>
      <button
        style={{
          border: 0,
          background: 'none',
        }}
        type="button"
      >
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </button>
    </>
  );

  const handleSubmit = async (data) => {
    const dataToDeliver = { url: imageUrl };

    const response = await PostBanner(dataToDeliver);
    if (response) {
      notification.success({
        message: response.message,
      });
      // Resetting state to clear the form or refresh component state
      setImageUrl(null);
      setImageName(null);
      setFileList([]);
      setLoading(false);
      // Optionally, call a function to fetch latest data if the component displays data from a server
    } else {
      notification.error({
        message: response.message,
      });
      setLoading(false);
    }
  };


  return (
    <div>
      <h3>Upload picture here to display on the login page</h3>
      <p style={{ color: 'red', fontSize: '10rem' }}>
        (Demo version disabled upload and add new function)
      </p>
      <Form onFinish={handleSubmit} layout="horizontal">
        <Form.Item>
          <Upload
            disabled
            name="banner"
            className="banner-uploader"
            listType="picture-card"
            customRequest={customRequest}
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            fileList={fileList}
          >
            {imageUrl ? nonUploadButton : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminBanner;
