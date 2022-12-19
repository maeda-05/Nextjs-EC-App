import OrderHistory from "components/organisms/order/OrderHistory";
import Layout from "components/template/Layout";
import { adminDB } from "../../firebase/server";
import { GetServerSideProps } from "next";
import React from "react";
import { CartItemType } from "types/item";
import { OrderType } from "types/order";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const COLLECTION_NAME = "order";
  const orderCollection = adminDB.collection(COLLECTION_NAME);

  const orderSnapshot = await orderCollection.orderBy("orderAt", "desc").get();
  const orders: OrderType[] = orderSnapshot.docs.map((doc: any) => {
    const order = { ...doc.data(), order_id: doc.id };
    return order;
  });
  const orderOfLoginUser = orders.filter(
    (order: OrderType) => order.uid === query.uid
  );
  const orderItemsOfLoginUser = orderOfLoginUser.map((order: OrderType) => {
    const jsDate = order.orderAt.toDate();
    return {
      items: order.items,
      orderAt: jsDate,
      order_id: order.order_id,
    };
  });
  const orderItems = JSON.parse(JSON.stringify(orderItemsOfLoginUser));

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
