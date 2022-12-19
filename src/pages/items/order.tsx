import OrderList from "components/organisms/order/OrderList";
import Layout from "components/template/Layout";
import { GetServerSideProps } from "next";
import React from "react";
import { CartItemType } from "types/item";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../nextjs-ec-app-firebase-adminsdk.json");
const admin = require("firebase-admin");

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  //初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }

  const COLLECTION_NAME = "users";
  const SUBCOLLECTION_NAME = "cart";
  const db = getFirestore();
  const usersCollection = db.collection(COLLECTION_NAME);

  const subCollection = usersCollection
    .doc(`${query.uid}`)
    .collection(SUBCOLLECTION_NAME);
  const snapshot = await subCollection.orderBy("incartAt", "asc").get();
  const cartItemsData = (await snapshot).docs.map((doc: any) => {
    const cartData = doc.data();
    const jsDate = cartData.incartAt.toDate();
    return { ...cartData, documentid: doc.id, incartAt: jsDate };
  });
  const cartItems = JSON.parse(JSON.stringify(cartItemsData));

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
