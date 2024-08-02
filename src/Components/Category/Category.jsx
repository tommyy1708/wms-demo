import React, { useEffect, useState } from 'react';
import { Card, message, Image, Spin } from 'antd';
import styles from './Category.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { GetCategoryApi } from '../../request/api';
const Category = () => {

  const [aCategory, setACategory] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const aCategory = await GetCategoryApi();
      setACategory(aCategory.data);
      setLoading(false);
    } catch (error) {
      message.error('error');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);



  return (
    <>
      <div className={styles.cardsFrame}>
        {aCategory ? (
          aCategory.map((e, index) => (
            <div
              key={e.id}
              className={`${styles.categoryCards}`}
              style={{ width: '48%'}}
              onClick={() => navigate(`/category/${e.categoryName}`)}
            >
              <Card
                title={e.categoryName}
                className={`${styles.cards}`}
                hoverable
                loading={loading}
                bordered={false}
                cover={
                  <Image
                    preview={false}
                    alt={e.categoryName}
                    src={`${e.image}`}
                  />
                }
              >

              </Card>
            </div>
          ))
        ) : (
          <Spin size="large" delay="200" fullscreen="true" />
        )}
      </div>
    </>
  );};

export default Category;
