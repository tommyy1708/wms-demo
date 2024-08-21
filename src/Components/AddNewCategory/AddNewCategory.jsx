import React, { useState } from 'react';
import {
  Upload,
  Form,
  Input,
  Button,
  notification,
  message,
} from 'antd';
import { Category, UploadImage } from '../../request/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const AddNewCategory = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [imageName, setImageName] = useState();
  const [fileList, setFileList] = useState([]);
  notification.config({
    placement: 'topLeft',
    bottom: 50,
    duration: 3,
    rtl: true,
  });
  const [form] = Form.useForm();

  // Function to handle form submission
  const handleSubmit = async (data) => {

    const dataToDeliver = {
      categoryName: data.categoryName,
      url: imageUrl,
    };

    const response = await Category(dataToDeliver);

    if (response) {
      notification.success({
        message: response.message,
      });
      setTimeout(() => {
        setLoading(false);
        setImageUrl();
        form.resetFields();
      },2000)
    } else {
      notification.error({
        message: response.message,
      });
    }
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

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file');
      return false;
    }

    const isLt150KB = file.size / 1024 < 500;
    if (!isLt150KB) {
      message.error('Image must be smaller than 150KB');
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
             { ...file, thumbUrl: response.data.url, url: response.data.url },
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

  const nonUploadButton = (
    <div>
      <img
        src={imageUrl}
        alt="avatar"
        style={{
          width: '100%',
        }}
      />
      {imageName ? <span style={{ color: 'blue' }}>{imageName}</span> : null}
    </div>
  );

  return (
    <div className="adminSubWindow">
      <p style={{ color: 'red', fontSize: '1.5rem' }}>
        (Demo version disabled upload function)
      </p>
      <Form form={form} onFinish={handleSubmit} layout="horizontal">
        <Form.Item
          label="Category Name"
          name="categoryName"
          rules={[
            {
              required: true,
              message: 'Please enter the Category Name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category Image"
          name="image"
          rules={[
            {
              required: true,
              message: 'Please upload the Category image',
            },
          ]}
        >
          <Upload
            disabled
            name="avatar"
            className="avatar-uploader"
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
            Add Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewCategory;
