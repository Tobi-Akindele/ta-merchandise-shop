import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { userRequest } from '../requestMethods';

const Success = () => {
  const location = useLocation();
  const data = location.state?.stripeData;
  const cart = location.state?.products;
  const total = location.state?.total;
  const currentUser = useSelector((state) => state.login?.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post('/order', {
          userId: currentUser.id,
          products: cart.products.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
          amount: total,
          address: data.card?.address_line1,
        });
        setOrderId(res.data.id);
      } catch (error) {}
    };
    data && createOrder();
  }, [cart, data, currentUser, total]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to='/'>
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  );
};

export default Success;
