import OrderList from "components/organisms/order/OrderList";
import Layout from "components/template/Layout";
import { GetServerSideProps } from "next";
import React from "react";
import { CartItemType } from "types/item";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart?uid=${query.uid}`
  );
  const cartItems = await res.json();
  return {
    props: { cartItems },
  };
};

const OrderPage = ({ cartItems }: { cartItems: CartItemType[] }) => {
  return (
    <Layout title="ご注文確認">
      <OrderList cart={cartItems} />
    </Layout>
  );
};

export default OrderPage;
