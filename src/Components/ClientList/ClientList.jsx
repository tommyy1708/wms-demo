import React, { useEffect, useState } from 'react';
import {
  Table,
  message,
  Input,
  Button,
  Popconfirm,
  notification,
  Switch,
} from 'antd';
import {
  GetUserList,
  CustomerDelete,
  ChangeAdmin,
  ChangePause,
} from '../../request/api';

const ClientList = () => {
  notification.config({
    placement: 'topLeft',
    bottom: 50,
    duration: 2,
    rtl: true,
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');

  const fetchData = async () => {
    const response = await GetUserList();
    if (response.errCode !== 0) {
      return message.error(response.message);
    } else {
      setUsers(response.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    // Fetch user data from the backend (replace with your actual API endpoint)
    fetchData();
  }, []);

  const toggleAdminStatus = async (userInfo) => {
    setLoading(true);
    const loginUserId = parseInt(localStorage.getItem('userId'));

    if (userInfo.id === loginUserId) {
      notification.error({
        message: "You can't change yourself value",
      });
      return setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    // Update the 'admin' property of the specific user in the state
    const response = await ChangeAdmin(userInfo);
    try {
      if (response && response.errCode === 0) {
        notification.success({
          message: response.message,
        });
        setUsers((prevUsers) => {
          return prevUsers.map((user) => {
            if (user.id === userInfo.id) {
              return { ...user, admin: user.admin === 0 ? 1 : 0 };
            }
            return user;
          });
        });
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      notification.error({
        message: response.message,
      });
    }
  };

  const togglePauseStatus = async (userInfo) => {
    setLoading(true);
    const loginUserId = parseInt(localStorage.getItem('userId'));
    if (userInfo.id === loginUserId) {
      notification.error({
        message: "You can't change yourself value",
      });
      return setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    // Update the 'admin' property of the specific user in the state
    const response = await ChangePause(userInfo);
    try {
      if (response && response.errCode === 0) {
        notification.success({
          message: response.message,
        });
        setUsers((prevUsers) => {
          return prevUsers.map((user) => {
            if (user.id === userInfo.id) {
              return { ...user, pause: user.pause === 0 ? 1 : 0 };
            }
            return user;
          });
        });
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      notification.error({
        message: response.message,
      });
    }
  };

  const filterUsers = () => {
    const filteredUsers = users.filter((user) => {
      const emailMatch = user.email
        .toLowerCase()
        .includes(searchEmail.toLowerCase());
      const phoneMatch = user.phone.includes(searchPhone);
      return emailMatch && phoneMatch;
    });
    setUsers(filteredUsers);
  };

  // Function to reset the search filters and fetch all users
  const resetFilters = async () => {
    setSearchEmail('');
    setSearchPhone('');
    setLoading(true);

    const response = await GetUserList();

    setUsers(response.data);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile_number',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Shipping Address',
      dataIndex: 'shipping_address',
    },
    {
      title: 'Admin',
      dataIndex: 'admin',
      render: (_, record) => (
        <Switch
          checked={record.admin === 1}
          onChange={() => toggleAdminStatus(record)}
        />
      ),
    },
    {
      title: 'Pause',
      dataIndex: 'pause',
      render: (_, record) => (
        <Switch
          checked={record.pause === 1}
          onChange={() => togglePauseStatus(record)}
        />
      ),
    },
    {
      title: 'Delete',
      key: 'Delete',
      render: (_, record) => (
        <>
          <Popconfirm
            title="Delete the item"
            description="Are you sure to delete this item?"
            onConfirm={() => confirm(record)}
            onCancel={() => cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger disabled>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  const confirm = async (e) => {
    const response = await CustomerDelete(e.id);

    if (response.errCode === 1) {
      notification.error({
        message: response.message,
      });
    } else {
      notification.success({
        message: response.message,
      });
      setTimeout(() => {
        fetchData();
      }, 2000);
    }
  };
  const cancel = () => {
    return;
  };

  return (
    <div className="customer-list-container">
      <div>
        <Input
          placeholder="Search by Email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <Input
          placeholder="Search by Phone"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />
        <Button type="primary" onClick={filterUsers}>
          Search
        </Button>
        <Button onClick={resetFilters}>Reset</Button>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey={(record) => record.id + record.phone}
      />
    </div>
  );
};

export default ClientList;
