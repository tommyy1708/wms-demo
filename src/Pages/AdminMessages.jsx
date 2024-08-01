import React, { useState } from 'react';
import { Form, Input, Button, message, Menu } from 'antd';
import {
  AppstoreOutlined,
  PlusSquareOutlined,
  SearchOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';
import ReadMessage from '../Components/ReadMessage/ReadMessage';
import AdminSendMessage from '../Components/AdminSendMessage/AdminSendMessage';

export default function AdminMessages() {
  const [current, setCurrent] = useState('0');

  const items = [
    {
      label: <span>Read Message</span>,
      key: '0',
      icon: <SearchOutlined />,
    },
    {
      label: <span>Send Message</span>,
      key: '1',
      icon: <PlusSquareOutlined />,
    },
  ];

  const getComponentByKey = (key) => {
    const componentsList = [<ReadMessage />, <AdminSendMessage />];

    const index = items.findIndex((item) => item.key === key);

    return componentsList[index];
  };

  const onClick = (e) => {
    setCurrent(e.key);
  };

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
}
