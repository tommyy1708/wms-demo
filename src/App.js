import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import moment from 'moment-timezone';
import CheckOutContent from './store/CheckOutContent';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Listing from './Components/Listing/Listing';
import Profile from './Pages/Profile';
import Checkout from './Pages/Checkout';
import Contact from './Pages/Contact';
import Admin from './Pages/Admin';
import AdminClients from './Pages/AdminClients';
import Layout from './Components/Layout/Layout';
import AdminBanner from './Components/AdminBanner/AdminBanner';
import ForgetPassword from './Pages/ForgetPassword';
import AdminProducts from './Pages/AdminProducts';
import ProductEdit from './Pages/ProductEdit';
import AdminCategoryList from './Pages/AdminCategoryList';
import Message from './Pages/Message';
import AdminMessages from './Pages/AdminMessages';
import { message } from 'antd';
import CategoryEdit from './Pages/CategoryEdit';
import TermsOfService from './Pages/TermsOfService';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import Support from './Pages/Support';

function App() {
  const oNmber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(
      3,
      '0'
    );
    const orderNumber = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    return orderNumber;
  };

  const initialCartData = {
    order_number: oNmber(),
    items: [],
    date: moment().tz('America/New_York').format('YYYY-MM-DD-HH:mm'),
    totalAmount: 0,
    subtotal: 0,
  };
  const [cartData, setCartData] = useState(initialCartData);
  const [userInfo, setUserInfo] = useState('');

  const addItemToCart = (itemToAdd) => {
    const existingItem = cartData.items.find(
      (item) => item.item_code === itemToAdd.item_code
    );
    if (
      existingItem &&
      existingItem.quantity > 0 &&
      existingItem.quantity >= itemToAdd.stock
    ) {
      return message.error('Out of stock');
    } else {
      setCartData((prevCartData) => {
        const existingItemIndex = prevCartData.items.findIndex(
          (item) => item.item_code === itemToAdd.item_code
        );
        const existingItem = prevCartData.items[existingItemIndex];

        let updatedItems;
        if (existingItem) {
          // Create a new item with updated amount
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          };
          // Create a new items array with the updated item
          updatedItems = [...prevCartData.items];
          updatedItems[existingItemIndex] = updatedItem;
        } else {
          // Add a new item to the cart
          updatedItems = [
            ...prevCartData.items,
            { ...itemToAdd, quantity: 1 },
          ];
        }

        // Calculate new subtotal, tax, totalAmount, and total
        let newSubtotal = 0;
        let newTotalAmount = 0;

        updatedItems.forEach((item) => {
          newSubtotal += item.price * item.quantity;
          newTotalAmount += item.quantity;
        });

        return {
          ...prevCartData,
          items: updatedItems,
          subtotal: newSubtotal,
          totalAmount: newTotalAmount,
        };
      });
    }
  };

  //minus quantity from shopping cart
  const subItemToCart = (itemToSubtract) => {
    setCartData((prevCartData) => {
      const existingItemIndex = prevCartData.items.findIndex(
        (item) => item.item_code === itemToSubtract.item_code
      );
      const existingItem = prevCartData.items[existingItemIndex];

      let updatedItems = [...prevCartData.items];

      if (existingItem && existingItem.quantity > 1) {
        // If the item exists and its quantity is greater than 1, decrease the quantity
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
      } else if (existingItem && existingItem.quantity === 1) {
        // If the item exists and its quantity is 1, remove it from the cart
        updatedItems.splice(existingItemIndex, 1);
      }

      // Recalculate subtotal, tax, totalAmount, and total
      let newSubtotal = 0;
      let newTotalQuantity = 0;
      updatedItems.forEach((item) => {
        newSubtotal += item.price * item.quantity;
        newTotalQuantity += item.quantity;
      });

      return {
        ...prevCartData,
        items: updatedItems,
        subtotal: newSubtotal,
        totalAmount: newTotalQuantity,
      };
    });
  };

  return (
    <Router>
      <CheckOutContent.Provider
        value={{
          cartData,
          userInfo,
          setCartData,
          setUserInfo,
          initialCartData,
          addItemToCart,
          subItemToCart,
        }}
      >
        <Routes>
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="home" element={<Home />} />
                  <Route path="category/:id" element={<Listing />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="messages" element={<Message />} />
                  <Route path="admin" element={<Admin />} />
                  <Route
                    path="admin/clients"
                    element={<AdminClients />}
                  ></Route>
                  <Route
                    path="admin/products"
                    element={<AdminProducts />}
                  />
                  <Route
                    path="admin/notice"
                    element={<AdminBanner />}
                  />
                  <Route
                    path="admin/messages"
                    element={<AdminMessages />}
                  />
                  <Route
                    path="admin/products/product-edit/:id"
                    element={<ProductEdit />}
                  />
                  <Route
                    path="admin/products/category-edit/:id"
                    element={<CategoryEdit />}
                  />
                  <Route
                    path="/admin/edit-category-list/:id"
                    element={<AdminCategoryList />}
                  />
                </Routes>
              </Layout>
            }
          />
          <Route index element={<Login />} />
          <Route
            path="/forget-password"
            element={<ForgetPassword />}
          />
          <Route
            path="/terms-of-service"
            element={<TermsOfService />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </CheckOutContent.Provider>
    </Router>
  );
}

export default App;
