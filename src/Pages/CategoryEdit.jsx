import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, message, Upload, notification } from 'antd';
import { UploadImage } from '../request/api';
import SpinOverLay from '../Components/SpinOverLay/SpinOverLay';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export default function CategoryEdit() {
  const { id } = useParams();
  const [changedFields, setChangedFields] = useState({});
  const [category, setCategory] = useState([]);
  const [showSpin, setShowSpin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [imageName, setImageName] = useState();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const handleFieldChange = (changedValues) => {
    setChangedFields({ ...changedFields, ...changedValues });
  };

  const onFinishFailed = (errorInfo) => {
    const errorMessage = errorInfo.errorFields[0].errors[0];
    message.error(errorMessage);
  };

  const onFinish = async (values) => {
    setShowSpin(true);

    message.success('Product update success!');
    setTimeout(() => {
      navigate(-1);
    }, 2000);
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
      {imageName ? (
        <span style={{ color: 'blue' }}>{imageName}</span>
      ) : null}
    </div>
  );

  return (
    <>
      {/* <SpinOverLay showSpin={showSpin} /> */}
      <div className="adminSubWindow">
        <Form
          layout="horizontal"
          name="categoryEditForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={handleFieldChange}
          initialValues={{
            category_name: category.categoryName,
            category_img: category.image,
          }}
        >
          <Form.Item label="Category Name" name="category_name">
            <span>{`${category.categoryName}`}</span>
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
            <Button onClick={goBack}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
