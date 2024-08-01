import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router';
import SpinOverLay from '../Components/SpinOverLay/SpinOverLay';
import { jwtDecode } from 'jwt-decode';
import { LoginApi } from '../request/api';
import DisplayBanner from '../Components/DIsplayBanner/DisplayBanner';

function Login() {
  const navigate = useNavigate();
  // const first_name = jwtDecode(loginResponse.userToken).first_name;
  const [showSpin, setShowSpin] = useState(false);

  const onSubmit = async (values) => {
    setShowSpin(true);
    try {
      console.log('values', process.env.REACT_APP_SERVER_URL);
      
      const loginResponse = await LoginApi(values);
    //  const response = await fetch(
    //    `http://${process.env.REACT_APP_SERVER_URL}/supplier-login`,
    //    {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(values),
    //    }
    //   );

    //   const loginResponse = await response.json();

      if (loginResponse.errCode !== 0) {
        setTimeout(() => {
          setShowSpin(false);
        }, [2500]);
        return message.info(loginResponse.message);
      } else {
        // userRol to determine RBAC
        const userRol = jwtDecode(loginResponse.userToken).admin;
        localStorage.setItem(
          'first_name',
          jwtDecode(loginResponse.userToken).first_name
        );
        localStorage.setItem(
          'last_name',
          jwtDecode(loginResponse.userToken).last_name
        );
        localStorage.setItem(
          'userId',
          jwtDecode(loginResponse.userToken).id
        );
        localStorage.setItem('token', loginResponse.userToken);

        if (userRol === 1) {
          navigate(`/admin`);
        } else {
          navigate('/home');
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const retrieveAccount = () => {
    navigate('/forget-password');
    return;
  };

  return (
    <div id="login">
      <SpinOverLay showSpin={showSpin} />
      <div className="login_announcement">
        <h3>{process.env.REACT_APP_NAME}Distribution System</h3>
      </div>
      <div className="login_box">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="link"
              htmlType="button"
              onClick={retrieveAccount}
            >
              Forget Password
            </Button>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <p>by {process.env.REACT_APP_COMPANY_NAME}</p>
      </div>
      <div className="login_banner">
        <DisplayBanner />
      </div>
    </div>
  );
}

export default Login;
