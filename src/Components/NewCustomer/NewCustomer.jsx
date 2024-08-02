import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { User } from '../../request/api';
// Create a new customer form component
const NewCustomer = () => {
  // State to store form values
  const [form] = Form.useForm();
  notification.config({
    placement: 'topLeft',
    bottom: 50,
    duration: 3,
    rtl: true,
  });
  // Function to handle form submission
  const handleSubmit = async (data) => {
    const response = await User(JSON.stringify(data));
    if (response) {
      notification.success({
        message: response.message,
      });
    } else {
      notification.error({
        message: response.message,
      });
    }
    form.resetFields();
  };
  // const [formLayout, setFormLayout] = useState('horizontal');
  // const formItemLayout =
  //   formLayout === 'horizontal'
  //     ? {
  //         labelCol: {
  //           span: 4,
  //         },
  //         wrapperCol: {
  //           span: 14,
  //         },
  //       }
  //     : null;

  return (
    <div className="adminSubWindow">
      <Form form={form} onFinish={handleSubmit} layout={'horizontal'}>
        {/* Customer Name */}
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[
            {
              required: true,
              message: 'Please enter the customer name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[
            {
              required: true,
              message: 'Please enter the customer name',
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter the customer email',
            },
            {
              type: 'email',
              message: 'Please enter a valid email address',
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Phone Number */}
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Please enter the phone number',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Mobile" name="mobile_number">
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: 'Please enter the phone number',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Shipping Address" name="shipping_address">
          <Input />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" >
            Add Customer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewCustomer;
