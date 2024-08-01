import React, { useState } from 'react';
import {
  AppstoreOutlined,
  PlusSquareOutlined,
  SearchOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import AddNewProducts from '../Components/AddNewProducts/AddNewProducts';
import SearchProduct from '../Components/SearchProduct/SearchProduct';
import AdminCategory from '../Components/AdminCategory/AdminCategory';
import AddNewCategory from '../Components/AddNewCategory/AddNewCategory';
import CsvUpload from '../Components/CsvUpload/CsvUpload';
const NewProducts = () => {
  const [current, setCurrent] = useState('0');

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const items = [
    {
      label: <span>Search and Delete</span>,
      key: '0',
      icon: <SearchOutlined />,
    },
    {
      label: <span>Add New Product</span>,
      key: '1',
      icon: <PlusSquareOutlined />,
    },
    {
      label: <span>Upload Products CSV</span>,
      key: '2',
      icon: <PlusSquareOutlined />,
    },
    {
      label: <span>Category</span>,
      key: '3',
      icon: <AppstoreOutlined />,
    },
    {
      label: <span>Add New Category</span>,
      key: '4',
      icon: <AppstoreAddOutlined />,
    },
  ];

  const componentsList = [
    <SearchProduct />,
    <AddNewProducts />,
    <CsvUpload/>,
    <AdminCategory />,
    <AddNewCategory />,
  ];

  const getComponentByKey = (key) => {

    const index = items.findIndex((item) => item.key === key);

    return componentsList[index];
  }

  return (
    <div className="admin-window">
      <div>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </div>
      {getComponentByKey(current)}
    </div>
  );
};

export default NewProducts;
