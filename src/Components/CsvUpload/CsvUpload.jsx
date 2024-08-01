import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload, message } from 'antd';
import { UpdateCsv } from '../../request/api';

const CsvUpload = () => {
  const [isDisable, setIsDisable] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [fileUrl, setFileUrl] = useState('');

  const submit_csv = async () => {
    const response = await UpdateCsv(fileUrl);
    if (response.errCode !== 0) {
      return message.error(`${response.message}`);
    } else {
      message.success(`${response.message}`);
      // Reset the state after successful submit
      setIsDisable(true);
      setFileList([]);
      setFileUrl('');
    }
  };

  const beforeUpload = (file) => {
    // custom validation logic here if needed
    return true;
  };

  const handleChange = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-1);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        // file.url = file.response.path;
        setFileUrl(file.response.url);
      }
      setIsDisable(false);
      return file;
    });
    setFileList(newFileList);
  };

// const handleChange = (info) => {
//   if (info.file.status === 'uploading') {
//     setIsDisable(true);
//     return;
//   }
//   if (info.file.status === 'done' && info.file.response) {
//     // Assuming the server response includes the file URL under `url` key
//     setFileUrl(info.file.response.url);
//     setIsDisable(false);
//     message.success(`${info.file.name} file uploaded successfully`);
//   } else if (info.file.status === 'error') {
//     message.error(`${info.file.name} file upload failed.`);
//     setIsDisable(true);
//   }

  // Update the fileList state to include only the last uploaded file
//   setFileList(info.fileList.slice(-1));
// };


  const props = {
    action: `${process.env.REACT_APP_SERVER_URL}/upload-csv`,
    onChange: handleChange,
    multiple: false,
  };
  // const props = {
  //   action: `${process.env.REACT_APP_SERVER_URL}/upload-csv`,
  //   onChange: handleChange,
  //   beforeUpload: beforeUpload,
  //   multiple: false,
  // };


  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: 'flex',
      }}
    >
      <p>Only .csv file acceptable</p>
      <Upload
        maxCount={1}
        listType="text"
        {...props}
        fileList={fileList}
        onChange={handleChange}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <Button
        onClick={submit_csv}
        type="primary"
        disabled={isDisable}
      >
        Submit
      </Button>
    </Space>
  );
};

export default CsvUpload;
