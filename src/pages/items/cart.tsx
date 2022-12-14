import CartList from "components/organisms/item/CartList";
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

const CartPage = ({ cartItems }: { cartItems: CartItemType[] }) => {
  return (
    <Layout title="ショッピングカート">
      <CartList cart={cartItems} />
    </Layout>
  );
};

export default CartPage;
