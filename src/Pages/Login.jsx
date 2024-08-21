import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router';
import SpinOverLay from '../Components/SpinOverLay/SpinOverLay';
import { LoginApi } from '../request/api';
import DisplayBanner from '../Components/DisplayBanner/DisplayBanner';
import styles from './Login.module.css'; // Import your CSS module

function Login() {
  const navigate = useNavigate();
  const [showSpin, setShowSpin] = useState(false);

  const onSubmit = async (values) => {
    setShowSpin(true);
    try {
      const loginResponse = await LoginApi(values);

      if (loginResponse.errCode !== 0) {
        setTimeout(() => {
          setShowSpin(false);
        }, 2500);
        return message.info(loginResponse.message);
      } else {
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

        {/* Demo Accounts Section */}
        <div className={styles.demoAccounts}>
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

        <p>by {process.env.REACT_APP_COMPANY_NAME}</p>
      </div>
      <div className="login_banner">
        <DisplayBanner />
      </div>
    </div>
  );
}

export default Login;
