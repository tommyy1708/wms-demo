import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  PlusSquareOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import ReadMessage from '../Components/ReadMessage/ReadMessage';
import SendMessage from '../Components/SendMessage/SendMessage';

const SendMessageForm = () => {
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

  const componentsList = [<ReadMessage />, <SendMessage />];

  const getComponentByKey = (key) => {
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
};

export default SendMessageForm;
