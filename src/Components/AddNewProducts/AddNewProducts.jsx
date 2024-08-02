import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { Product, GetCategoryApi } from '../../request/api';

const AddNewProducts = () => {
  notification.config({
    placement: 'topLeft',
    bottom: 50,
    duration: 3,
    rtl: true,
  });
  const [form] = Form.useForm();
  const [flag,setFlag] = useState(true)
  const [categoryList ,setCategoryList] = useState([])
  // Function to handle form submission
  const handleSubmit = async (data) => {
    const response = await Product(JSON.stringify(data));
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

  const fetchData = async () => {
    const response = await GetCategoryApi();
    if (response && response.errCode === 0) {
      const categoryData = response.data;
      setCategoryList(categoryData);
    } else {
      return
    }
  };

  useEffect(() => {
    fetchData();
    setFlag(false);
  }, [flag]);

  return (
    <div className="adminSubWindow">
      <p style={{ color: 'red', fontSize: '10rem' }}>
        (Demo version disabled upload or add new function)
      </p>
      <Form form={form} onFinish={handleSubmit} layout="horizontal">
        <Form.Item
          label="Item Code"
          name="item_code"
          rules={[
            {
              required: true,
              message: 'Please enter the Item Code',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Name"
          name="item"
          rules={[
            {
              required: true,
              message: 'Please enter the product name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Price"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please enter the product price',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Category"
          name="category"
          rules={[
            {
              required: true,
              message: 'Please enter the product category',
            },
          ]}
        >
          <Select
            style={{
              width: 120,
            }}
            options={categoryList.map((item) => ({
              value: item.categoryName,
              label: item.categoryName,
            }))}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewProducts;
