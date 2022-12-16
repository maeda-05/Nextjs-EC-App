import OrderHistory from "components/organisms/order/OrderHistory";
import Layout from "components/template/Layout";
import { Timestamp } from "firebase/firestore";
import { GetServerSideProps } from "next";
import React from "react";
import { CartItemType } from "types/item";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order?uid=${query.uid}`
  );
  const orderItems = await res.json();
  return {
    props: { orderItems },
  };
};

const order_historyPage = ({
  orderItems,
}: {
  orderItems: {
    items: CartItemType[];
    orderAt: Date;
    order_id: string;
  }[];
}) => {
  return (
    <Layout title="注文履歴">
      <OrderHistory orderItems={orderItems} />
    </Layout>
  );
};

export default order_historyPage;
