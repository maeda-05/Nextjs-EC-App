import Footer from 'components/organisms/layout/Footer';
import Header from 'components/organisms/layout/Header';
import OrderList from 'components/organisms/order/OrderList';
import { GetServerSideProps } from 'next';
import React from 'react'
import { CartItemType } from 'types/item';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:8000/cart");
  const cartItems = await res.json();
  return {
    props: { cartItems },
  };
};

const OrderPage = ({ cartItems }: { cartItems: CartItemType[] }) => {
  return (
    <>
      <Header />
      <OrderList cart={cartItems} />
      <Footer />
    </>
  );
};

export default OrderPage;
