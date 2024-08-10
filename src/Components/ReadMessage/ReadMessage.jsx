import React, { useEffect, useState, useContext } from 'react';
import { message, Table, Badge, Button, Modal } from 'antd';
import {
  GetMessages,
  MessageRead,
  DeleteSelectedMessages,
} from '../../request/api';
import SpinOverLay from '../SpinOverLay/SpinOverLay';

export default function ReadMessage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [rowsSelected, setRowsSelected] = useState([]);
  const [showSpin, setShowSpin] = useState(false);

  message.config({
    top: 100,
    duration: 3,
    maxCount: 1,
  });

  const showModal = async (content, messageId) => {
    setModalContent(content);
    setIsModalVisible(true);
    // setSelectedMessageId(messageId);

    // Update the message status to read
    try {
      await MessageRead(messageId);

      // Update the local state to mark the message as read
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, is_read: 1 } : msg
        )
      );
    } catch (error) {
      message.error('Failed to update message status');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalContent('');
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const receiverId = localStorage.getItem('userId');
      let params = {
        receiver_id: receiverId,
      };

      try {
        const response = await GetMessages(params);
        if (response.errCode === 0) {
          // message.success(response.message);
          setMessages(response.data);
        } else {
          message.error(response.message);
        }
      } catch (error) {
        message.error('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      setRowsSelected(selectedRows);
    },
  };

  const handleDelete = async (ids) => {
    setShowSpin(true);
    if (ids.length === 0) {
      return message.error('Please select at least one message');
    }
    const data = {
      message_ids: ids,
    };
    await DeleteSelectedMessages(data);
    message.success('Messages deleted successfully');
    const newMessages = messages.filter(
      (msg) => !selectedRowKeys.includes(msg.id)
    );
    setMessages(newMessages);
    setSelectedRowKeys([]);
    setShowSpin(false);
  };

  const columns = [
    {
      title: 'Messages',
      width: 150,
      ellipsis: true,
      render: (_, record) => (
        <span>
          {!record.is_read && (
            <Badge
              count="New"
              style={{ backgroundColor: '#f5222d', marginRight: 8 }}
            />
          )}
          <Button
            type="link"
            onClick={() => showModal(record.content, record.id)}
            style={{
              fontWeight: `${record.is_read ? 'normal' : 'bold'}`,
              padding: 0,
              border: 'none',
            }}
          >
            {record.content.length > 10
              ? `${record.content.substring(0, 30)}...`
              : record.content}
            {/* {record.content} */}
          </Button>
        </span>
      ),
    },
    {
      title: 'Sender',
      width: 100,
      render: (_, record) => (
        <span>
          {record.sender_first_name + ' ' + record.sender_last_name}
        </span>
      ),
    },
    {
      title: 'Date',
      width: 70,
      dataIndex: 'created_at',
      sorter: (a, b) =>
        new Date(b.created_at) - new Date(a.created_at),
      defaultSortOrder: 'ascend',
      render: (_, record) => {
        const date = new Date(record.created_at);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
      },
    },
  ];

  return (
    <div>
      <SpinOverLay showSpin={showSpin} />
      <Table
        scroll={{
          y: 700,
        }}
        rowKey={(record) => record.id}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={messages}
        pagination={{ pageSize: 7 }}
      />
      <Modal
        title="Message Content"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="80%"
      >
        <p>{modalContent}</p>
      </Modal>
      <div
        style={{
          display:
            selectedRowKeys && selectedRowKeys.length > 0
              ? 'block'
              : 'none',
          overflow: 'hidden',
        }}
      >
        <Button danger onClick={() => handleDelete(selectedRowKeys)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
