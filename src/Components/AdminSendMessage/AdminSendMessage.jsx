import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import { SendSelectMessages, GetUserList } from '../../request/api';

const { Option } = Select;

const AdminSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const response = await GetUserList();
        if (response.errCode === 0) {
          setUsers(response.data);
        }
      } catch (error) {
        message.error('Failed to fetch users');
      }
    };

    fetchUsers();

  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    let params = {
      receiver_ids: values.receiver_ids,
      content: values.content,
    }
    try {
      const response = await SendSelectMessages(params);


      if (response.errCode === 0) {
        message.success(response.message);
        form.resetFields();
      } else {
        message.error(response.error);
      }
    } catch (error) {
      message.error('Failed to send messages');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-sent-message-frame">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="receiver_ids"
          label="Select Users"
          rules={[
            {
              required: true,
              message: 'Please select at least one user',
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select users"
            allowClear
          >
            {users.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="content"
          label="Message To Admin"
          rules={[
            {
              required: true,
              type: 'string',
              min: 10,
              max: 450,
              message:
                'Content must be between 10 and 450 characters',
            },
          ]}
        >
          <Input.TextArea
            autoSize={{
              minRows: 8,
              maxRows: 15,
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminSendMessage;
