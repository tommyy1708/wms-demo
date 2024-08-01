import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Select, message, InputNumber } from 'antd';
import {
  GetProduct,
  GetCategoryApi,
  ProductUpdate,
} from '../request/api';
import SpinOverLay from '../Components/SpinOverLay/SpinOverLay';

export default function ProductEdit() {
  const { id } = useParams();
  const [changedFields, setChangedFields] = useState({});
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState([]);
  const [showSpin, setShowSpin] = useState(true);
  const navigate = useNavigate();

  const goBack = () => { navigate(-1);}


  useEffect(() => {
    const fetchProduct = async () => {
      const data = {
        keyWord: id,
      };

      const res_Product = await GetProduct(data);

      if (res_Product.data.length < 1) {
        let msg = `Product ${data.keyWord} not found in your database`;
        return message.info(msg);
      }

      const res_Category = await GetCategoryApi();

      if (res_Category && res_Category.errCode === 0) {
        const categoryData = res_Category.data;
        setCategory(categoryData);
      }

      setProduct(res_Product.data[0]);
      setShowSpin(false);
      return;
    };
    fetchProduct();
  }, [id]);


    const handleFieldChange = (changedValues) => {
      setChangedFields({ ...changedFields, ...changedValues });
    };

  const onFinishFailed = (errorInfo) => {
    const errorMessage = errorInfo.errorFields[0].errors[0];
    message.error(errorMessage);
  };

  const onFinish = async (values) => {
    setShowSpin(true);
    if (!product.item_code) {
      return message.error('Product not found');
    }
    let data = {
      item_code: product.item_code,
      ...changedFields
    };
    const response = await ProductUpdate(data);

    if (response.errCode !== 0) {
      message.error('Something wrong, please contact manager');
      return;
    }
    message.success('Product update success!');
    setTimeout(() => {
      navigate(-1);
    }, 2000);

  };

  return product.item_code ? (
    <>
      <SpinOverLay showSpin={showSpin} />
      <Form
        name="productEditForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={handleFieldChange}
        initialValues={{
          item_code: product.item_code,
          item: product.item,
          stock: product.stock,
          price: product.price,
          category: product.category,
        }}
      >
        <Form.Item label="Item Code" name="item_code">
          <span>{`${product.item_code}`}</span>
        </Form.Item>
        <Form.Item label="Item" name="item">
          <span>{`${product.item}`}</span>
        </Form.Item>
        <Form.Item label="Stock" name="stock">
          <InputNumber min={1} max={100000} />
        </Form.Item>
        <Form.Item label="Price $" name="price">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select style={{ width: 120 }}>
            {category.map((item) => (
              <Select.Option
                key={item.id}
                value={String(item.categoryName)}
              >
                {item.categoryName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={goBack}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  ) : (
    <p>Loading...</p>
  );
}
