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



  const props = {
    action: `${process.env.REACT_APP_SERVER_URL}/upload-csv`,
    onChange: handleChange,
    multiple: false,
  };


  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: 'flex',
      }}
    >
      <p>Only .csv file acceptable</p>
      <p style={{color:'red',fontSize:'10rem'}}>(Demo version disabled upload function)</p>
      <Upload
        disabled
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
