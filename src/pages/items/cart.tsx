import CartList from "components/organisms/item/CartList";
import Layout from "components/template/Layout";
import { adminDB } from "../../firebase/server";
import { GetServerSideProps } from "next";
import React from "react";
import { CartItemType } from "types/item";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const COLLECTION_NAME = "users";
  const SUBCOLLECTION_NAME = "cart";
  const usersCollection = adminDB.collection(COLLECTION_NAME);

  const subCollection = usersCollection
    .doc(`${query.uid}`)
    .collection(SUBCOLLECTION_NAME);
  const snapshot = await subCollection.orderBy("incartAt", "asc").get();
  const cartItemsData = snapshot.docs.map((doc) => {
    const cartData = doc.data();
    const jsDate = cartData.incartAt.toDate();
    return { ...cartData, documentid: doc.id, incartAt: jsDate };
  });
  const cartItems: CartItemType[] = JSON.parse(JSON.stringify(cartItemsData));

  return {
    props: { cartItems },
  };
};

const CartPage = ({ cartItems }: { cartItems: CartItemType[] }) => {
  return (
    <Layout title="ショッピングカート">
      <CartList cart={cartItems} />
    </Layout>
  );
};

export default CartPage;
