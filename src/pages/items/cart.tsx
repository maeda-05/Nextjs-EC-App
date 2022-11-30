import CartList from "components/organisms/item/CartList";
import Footer from "components/organisms/layout/Footer";
import Header from "components/organisms/layout/Header";
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
    <>
      <Header />
      <CartList cart={cartItems} />
      <Footer />
    </>
  );
};

export default CartPage;
