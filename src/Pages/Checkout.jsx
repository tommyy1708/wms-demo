import React, { useEffect, useState, useContext } from 'react';
import { Table, Button, Typography, message } from 'antd';
import {
  PlusCircleTwoTone,
  MinusCircleTwoTone,
} from '@ant-design/icons';
import { newOrderSendApi, GetUserInfo } from '../request/api';
import CheckOutContent from '../store/CheckOutContent';
import SpinOverLay from '../Components/SpinOverLay/SpinOverLay';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;
const Checkout = () => {
  message.config({
    top: 150,
    duration: 2,
    maxCount: 3,
    rtl: true,
    prefixCls: 'my-message',
  });
  const navigate = useNavigate();
  const ctx = useContext(CheckOutContent);
  const [flag, setFlag] = useState(true);
  const [showSpin, setShowSpin] = useState(true);

  const fetchCategoryList = async () => {
    setShowSpin(true);
    const userId = localStorage.getItem('userId');

    const data = {
      userId: userId,
    };

    const response = await GetUserInfo(data);

    if (!response && response?.errCode !== 0) {
      message.error('token error, please login again');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      return;
    } else {
      setShowSpin(false);
      ctx.setUserInfo(response.data);
      return;
    }
  };

  const tempAmount = (item) => {
    const indexCode = item.item_code;
    const foundItem = ctx.cartData.items.find(
      (e) => e.item_code === indexCode
    );
    if (foundItem) {
      return foundItem.quantity;
    } else {
      return 0;
    }
  };

  const placeOrder = async () => {
    setShowSpin(true);
    const result = await newOrderSendApi({
      cartData: JSON.stringify(ctx.cartData),
      userId: localStorage.getItem('userId'),
    });
    if (result.errCode !== 0) {
      message.error('Something wrong, please contact us');
      setTimeout(() => {
        setShowSpin(false);
      }, [2500]);
      return;
    } else {
      ctx.setCartData(ctx.initialCartData);
      message.success('Thank for your shopping');
      setTimeout(() => {
        setShowSpin(false);
      }, [2500]);
      return;
    }
  };

  useEffect(() => {
    if (flag) {
      fetchCategoryList();
      setFlag(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);

  const columns = [
    {
      title: 'Item Description',
      key: 'item',
      dataIndex: 'item',
      width: '50%',
      render: (text, record) => (
        <span
          style={{
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <p>ItemCode:{record.item_code}</p>
          <p>{text}</p>
        </span>
      ),
    },
    {
      title: 'Price',
      key: 'msrp',
      dataIndex: 'price',
      width: '10%',
      render: (_, record) => (
        <>
          <p>{record.price}</p>
        </>
      ),
    },
    {
      title: 'Qt.',
      key: 'quantity',
      width: '10%',
      render: (_, record) => (
        <>
          <p>{tempAmount(record)}</p>
        </>
      ),
    },
    {
      title: 'Operation',
      key: 'operation',
      width: '20%',
      align: 'center',
      render: (_, record) => (
        <span className='buttonsFrame'>
          <span className="checkout-buttonsFrame">
            <MinusCircleTwoTone
              style={{ fontSize: '55rem', color: '#08c' }}
              onClick={() => ctx.subItemToCart(record)}
            />
          </span>
          <span>
            <PlusCircleTwoTone
              style={{ fontSize: '55rem', color: '#08c' }}
              onClick={() => ctx.addItemToCart(record)}
            />
          </span>
        </span>
      ),
    },
    // {
    //   title: ' ',
    //   key: 'add',
    //   width: '10%',
    //   align: 'center',
    //   colSpan: 0,
    //   render: (_, record) => (
    //     <span>
    //       <PlusCircleTwoTone
    //         style={{ fontSize: '55rem', color: '#08c' }}
    //         onClick={() => ctx.addItemToCart(record)}
    //       />
    //     </span>
    //   ),
    // },
  ];


    const dataSourceWithKey = ctx.cartData.items.map((item) => ({
      ...item,
      key: item.item_code,
    }));
  return (
    <div>
      <br />
      {showSpin ? (
        <SpinOverLay showSpin={showSpin} />
      ) : (
        <Table
          columns={columns}
          dataSource={dataSourceWithKey}
          pagination={false}
          bordered
          summary={(pageData) => {
            let totalRepayment = 0;
            pageData.forEach(({ price, quantity }) => {
              totalRepayment += quantity;
            });
            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>
                    Quantity
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} colSpan={6}>
                    <Text type="danger">{totalRepayment}</Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>
                    Total
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} colSpan={6}>
                    <Text type="danger">
                      $ {ctx.cartData.subtotal}
                    </Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={6}>
                    <div className="checkout-button-frame">
                      <Button
                        className="checkout-button"
                        type="primary"
                        onClick={() => navigate('/home')}
                      >
                        Add More
                      </Button>
                      <Button
                        className="checkout-button"
                        type="primary"
                        onClick={placeOrder}
                      >
                        Place Order
                      </Button>
                    </div>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default Checkout;
