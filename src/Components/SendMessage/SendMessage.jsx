import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { SendNewMessage } from '../../request/api';
import SpinOverLay from '../SpinOverLay/SpinOverLay';


const SendMessage = () => {
  const [form] = Form.useForm();
  const [showSpin, setShowSpin] = useState(false);

  message.config({
    top: 100,
    duration: 3,
    maxCount: 1,
  });


  const onFinish = async (values) => {
    const userInfo = {
      sender_id: localStorage.getItem('userId'),
      content: values.content,
    };

    const response = await SendNewMessage(userInfo);

  

    if (response.errCode !== 0) {
      setShowSpin(false);
      return message.error(response.message);
    }
    setShowSpin(false);
    form.resetFields();
    return message.success(response.message);
  };

  useEffect(() => {

    const initialUserId = () =>{
      if (localStorage && localStorage.length > 0) {
        return;

      } else {
        console.log('local empty');
        return message.error('User ID not found');
      }

    }

    initialUserId();
  }, []);


  return (
    <div className="send-message-frame">
      <SpinOverLay showSpin={showSpin}></SpinOverLay>
      <Form form={form} onFinish={onFinish}>
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
          <Button type="primary" htmlType="submit">
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SendMessage;
