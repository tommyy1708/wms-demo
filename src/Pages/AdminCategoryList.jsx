import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { GetCategoryList } from '../request/api';
import { useEffect, useState } from 'react';
import {
  InputNumber,
  Form,
  Button,
  Input,
  Popconfirm,
  Table,
  message,
  Typography,
  notification,
  Pagination,
} from 'antd';
export default function AdminCategoryList() {
  notification.config({
    placement: 'topLeft',
    bottom: 50,
    duration: 3,
    rtl: true,
  });
  const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  const params = useParams();

  const fetchData = async () => {
    let categoryName = params.id;
    const categoryList = await GetCategoryList(categoryName);
    if (categoryList.errCode !== 0) {
      return message.error(categoryList.message);
    } else {
      setItemsData(categoryList.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (flag) {
      fetchData();
      setFlag(false);
    }
  }, [flag]);

  const columns = [
    {
      title: 'Item Code',
      key: 'item',
      dataIndex: 'item_code',
      editable: false,
      width: '20%',
      render: (text, record) => (
        <span
          style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
        >
          <p>{text}</p>
          <p>{record.item}</p>
        </span>
      ),
    },
    {
      title: 'Category',
      key: 'category',
      dataIndex: 'categoryName',
      width: '10%',
      editable: false,
      render: (_, record) => <p>{record.category}</p>,
    },
    {
      title: 'Price',
      key: 'msrp',
      dataIndex: 'price',
      width: '10%',
      editable: isEditable,
      render: (_, record) => (
        <>
          <p>${record.price}</p>
        </>
      ),
    },
    {
      title: 'Stock',
      key: 'stock',
      dataIndex: 'stock',
      width: '10%',
      editable: isEditable,
      sorter: (a, b) => a.stock - b.stock,
      defaultSortOrder: 'ascend',
      render: (text, record) => (
        <div style={text <= 0 ? { backgroundColor: 'red',color:'#fff' } : null}>
          {record.stock}
        </div>
      ),
    },
    {
      title: 'Operation',
      key: 'operation',
      width: '10%',
      render: (text, record) => (
        <Link to={`/admin/products/product-edit/${record.item_code}`}>
          Edit
        </Link>
      ),
    },
  ];

  return (
    <div className="inquiry_table">
      <Table
        title={() => <Button onClick={goBack}>Back</Button>}
        footer={() =>
          <Button onClick={goBack}>Back</Button>}
        bordered
        columns={columns}
        dataSource={itemsData}
        rowKey="item_code"
        pagination={true}
        loading={loading}
      />
    </div>
  );
}
