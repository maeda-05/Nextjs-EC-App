import PrimaryBtn from "components/atoms/button/PrimaryBtn";
import CartItem from "components/molecules/item/CartItem";
import { useRouter } from "next/router";
import { useAuthContext } from "providers/AuthContext";
import React, { useState } from "react";
import { CartItemType } from "types/item";

const CartList = ({ cart }: { cart: CartItemType[] }) => {
  const { user } = useAuthContext();
  const router = useRouter();

  const cartItemsQuantity = cart.map((cartItem) => cartItem.quantity);
  const totalCartItemsQuantity = cartItemsQuantity.reduce(
    (a: number, b: number) => a + b,
    0
  );
  const [cartItemsCount, setCartItemsCount] = useState(totalCartItemsQuantity);

  const removeItem = async (uid: string, documentid: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, documentid }),
    });
    setCartItemsCount(totalCartItemsQuantity);
    router.reload();
  };

  const totalPrices = cart.map((cartItem) => cartItem.totalPrice);
  const total = totalPrices.reduce((a: number, b: number) => a + b, 0);

  const toOrderPage = () => router.push(`/items/order?uid=${user?.uid}`);
  const toItemPage = () => router.push("/");
  return (
    <section className="mt-10 text-center w-10/12 mx-auto md:p-8">
      <h1 className="font-bold my-16 text-4xl">ショッピングカート</h1>
      <div className="mb-12">
        <p className="md:text-left">
          カートに入っている商品: {cartItemsCount} 点
        </p>
        {cart.map((item: CartItemType) => {
          return (
            <CartItem
              key={item.documentid}
              name={item.name}
              path={item.image_path}
              price={item.price}
              quantity={item.quantity}
              totalPrice={item.totalPrice}
              onClick={() => removeItem(item.uid, item.documentid)}
            />
          );
        })}
        <p className="underline mt-9 md:text-right">
          合計金額：
          <span className="font-bold text-3xl before:content-['¥']">
            {total.toLocaleString()}
          </span>
        </p>
      </div>
      <div className="md:text-right">
        {cartItemsCount === 0 ? (
          <PrimaryBtn color="bg-blue-500" onClick={toItemPage}>
            買い物を続ける
          </PrimaryBtn>
        ) : (
          <div className="space-y-10 md:flex md:space-y-0 md:justify-end md:space-x-10">
            <div>
              <PrimaryBtn color="bg-blue-500" onClick={toItemPage}>
                買い物を続ける
              </PrimaryBtn>
            </div>
            <div>
              <PrimaryBtn color="bg-green-500" onClick={toOrderPage}>
                ご注文手続きへ進む
              </PrimaryBtn>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartList;
