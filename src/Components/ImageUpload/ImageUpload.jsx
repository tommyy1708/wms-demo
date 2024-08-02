import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadImage } from '../../request/api';
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return false;
    }

    const isLt150KB = file.size / 1024 < 500;
    if (!isLt150KB) {
      message.error('Image must be smaller than 150KB!');
      return false;
    }

    return isJpgOrPng && isLt150KB;
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const imageUrl = await UploadImage(file);
      setImageUrl({imageUrl});
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  const updateAddress = async () => {
    // Implement the logic to update the address based on the date from the database
    // Example: axios.put('/api/updateAddress', { imageUrl, date });
  };

const uploadButton = (
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
);
  return (
    <>
      <Upload
        disabled
        name="avatar"
        className="avatar-uploader"
        listType="picture-card"
        customRequest={customRequest}
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default ImageUpload;
