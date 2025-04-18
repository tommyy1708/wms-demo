import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router';
import SpinOverLay from '../Components/SpinOverLay/SpinOverLay';
import { jwtDecode } from 'jwt-decode';
import { LoginApi } from '../request/api';
import DisplayBanner from '../Components/DIsplayBanner/DisplayBanner';
function Login() {
  const navigate = useNavigate();

  const [showSpin, setShowSpin] = useState(false);
  const onSubmit = async (values) => {
    setShowSpin(true);
    try {
      const loginResponse = await LoginApi(values);
      console.log(loginResponse);

      if (loginResponse.errCode !== 0) {
        setTimeout(() => {
          setShowSpin(false);
        }, [2500]);
        return message.info(loginResponse.message);
      } else {
        // userRol to determine RBAC

       const { admin: userRol, id: userId, email } = jwtDecode(
         loginResponse.userToken
       );
       localStorage.setItem('userId', userId);
       localStorage.setItem('email', email);

        localStorage.setItem('token', loginResponse.userToken);

        navigate(userRol === 1 ? '/admin' : '/home');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const retrieveAccount = () => {
    navigate('/forget-password');
    return;
  };

  const facebook_url = process.env.REACT_APP_FACEBOOK_URL;
  const instagram_url = process.env.REACT_APP_INSTAGRAM_URL;

  return (
    <div id="login">
      <SpinOverLay showSpin={showSpin} />
      <div className="login-page-info">
        <div className="login_announcement">
          <h3>{process.env.REACT_APP_NAME} Distribution System</h3>
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
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
            <Button
              type="link"
              htmlType="button"
              onClick={retrieveAccount}
            >
              Forget Password?
            </Button>
          </Form>
          <div className='demoAccounts'>
            <h4>Demo Accounts:</h4>
            <ul>
              <li>
                <strong>Admin Account:</strong> admin@demo.com
              </li>
              <li>
                <strong>Client Account:</strong> client@demo.com
              </li>
              <li>
                <strong>Password:</strong> 12345678
              </li>
            </ul>
          </div>
          <p>
            © {new Date().getFullYear()}{' '}
            {process.env.REACT_APP_COMPANY_NAME}. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="/terms-of-service">Terms of Service</a> |
            <a href="/privacy-policy">Privacy Policy</a> |
            <a href="/support">Support</a>
          </div>
        </div>
        <div className="social-links">
          <a
            href={facebook_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href={instagram_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className="login-page-image login_banner">
        <DisplayBanner />
      </div>
    </div>
  );
}

export default Login;

