import CartList from "components/organisms/item/CartList";
import Footer from "components/organisms/layout/Footer";
import Header from "components/organisms/layout/Header";
import Layout from "components/template/Layout";
import { GetServerSideProps } from "next";
import React from "react";
import { CartItemType } from "types/item";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:8000/cart");
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
