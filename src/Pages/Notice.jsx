import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { GetAnnouncement, UpdateAnnouncement } from '../request/api';

const Notice = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [announcement, setAnnouncement] = useState(''); // State to store the announcement

  const onFinish = async (values) => {
    if (!values.content) {
      message.info('The announcement can not be empty');
      return;
    }
    setLoading(true);
    const response = await UpdateAnnouncement(values.content);
    setLoading(false);

    if (response.errCode === 2) {
      message.info(response.message);
    } else if (response.errCode === 1) {
      message.error(response.message);
    } else {
      message.success(response.message);
      setAnnouncement(values.content); // Update the announcement in the state
      form.resetFields(); // Optionally reset the form fields
    }
  };

  const fetchData = async () => {
    const response = await GetAnnouncement();
    if (response.errCode === 0 && response.data) {
      setAnnouncement(response.data);
    } else {
      message.error('Failed to fetch announcement');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="notice-editor-container">
      <h6>
        If you don't want to display any notice on the Login page,
        please keep input empty then submit
        <br />
      </h6>
      <Form form={form} onFinish={onFinish} initialValues={{ content: announcement }}>
        <Form.Item name="content" label="Content">
          <Input.TextArea
            rows={4}
            placeholder={'Make new announcement here'}
            maxLength={300}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Notice
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Notice;
