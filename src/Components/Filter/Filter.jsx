import React, { useState } from 'react';
import {
  DatePicker,
  Space,
  Button,
  message,
} from 'antd';
import { GetOrdersByDate } from '../../request/api';

const Filter = (props) => {
   message.config({
     top: 150,
     duration: 2,
     maxCount: 3,
     rtl: true,
     prefixCls: 'my-message',
   });
  const [begin, setBegin] = useState('');
  const [end, setEnd] = useState('');
  const [dateNotNone, setDateNotNone] = useState(false);
  const { RangePicker } = DatePicker;

  const gotData = async () => {
    if (dateNotNone) {
      const data = {
        begin: begin,
        end: end,
      };
      const aOrderData = await GetOrdersByDate(data);

      if (aOrderData.data.length < 1) {
        message.info('No orders');
        props.setOrdersData(aOrderData.data);
        return
      } else {
        props.setOrdersData(aOrderData.data);
      }
    } else {
      message.info('Please select date!');
      return;
    }
  };

  const onChange = (date, dateString) => {
    if (dateString !== '') {
      setBegin(dateString[0]);
      setEnd(dateString[1]);
      setDateNotNone(true);
      return;
    } else {
      message.info('Date invalid, reselect date!');
      return;
    }
  };
  return (
    <div>
      <Space>
        <RangePicker
          className="report-datePicker"
          onChange={onChange}
          inputReadOnly={true}
        />
        <Button type="primary" onClick={gotData}>
          Search
        </Button>
      </Space>
    </div>
  );
};

export default Filter;
