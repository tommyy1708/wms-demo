import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { PasswordUpdate, GetUserInfo } from '../request/api';
import CheckOutContent from '../store/CheckOutContent';
import SpinOverLay from '../Components/SpinOverLay/SpinOverLay';

const Profile = () => {
  const ctx = useContext(CheckOutContent);
  const [flag, setFlag] = useState(true);
  const [showSpin, setShowSpin] = useState(true);
  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');
  const userId = localStorage.getItem('userId');
  const [changedFields, setChangedFields] = useState({});
  const handleFieldChange = (changedValues) => {
    setChangedFields({ ...changedFields, ...changedValues });
  };

  const onFinish = async (values) => {
    const newPassWord = values.passWord;
    if (newPassWord && newPassWord.length < 8) {
      return message.error('new password not short than 8');
    }
    const data = {
      userId: userId,
      ...changedFields,
    };
    const result = await PasswordUpdate(data);

    if (result.errCode !== 0) {
      message.error('Something wrong, please contact manager');
      return;
    }

    message.success('Password update success!');
    setTimeout(() => {
      fetchUserInfo();
    }, 2000);
    return;
  };

  message.config({
    top: 50,
    duration: 2,
    maxCount: 2,
  });
  const onFinishFailed = (errorInfo) => {
    const errorMessage = errorInfo.errorFields[0].errors[0];
    message.error(errorMessage);
  };

  const fetchUserInfo = async () => {
    const userId = localStorage.getItem('userId');
    const data = {
      userId: userId,
    };
    const response = await GetUserInfo(data);
    if (response.errCode !== 0) {
      return message.error('server error');
    } else {
      setShowSpin(false);
      ctx.setUserInfo(response.data);
      return;
    }
  };

  useEffect(() => {
    if (flag) {
      fetchUserInfo();
      setFlag(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);

  return (
    <div className="profileFrame">
      {showSpin ? (
        <SpinOverLay showSpin={showSpin} />
      ) : (
        <Form
          name="userInfoForm"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 8,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={handleFieldChange}
        >
          <Form.Item label="Name">
            <span defaultValue={``} />
            <span>{`${firstName} ${lastName}`}</span>
          </Form.Item>
          <Form.Item label="Email">
            <span>{`${ctx.userInfo.email}`}</span>
          </Form.Item>
          <Form.Item label="New Password" name="passWord">
            <Input placeholder={ctx.userInfo.passWord}></Input>
          </Form.Item>
          <Form.Item label="Phone Number" name="phone">
            <Input placeholder={ctx.userInfo.phone} />
          </Form.Item>
          <Form.Item label="Mobile Number" name="mobile_number">
            <Input placeholder={ctx.userInfo.mobile_number} />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input placeholder={ctx.userInfo.address} />
          </Form.Item>
          <Form.Item label="Shipping Address" name="shipping_address">
            <Input placeholder={ctx.userInfo.shipping_address} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Profile;
