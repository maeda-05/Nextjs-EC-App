import PrimaryBtn from "components/atoms/button/PrimaryBtn";
import PrimaryInput from "components/atoms/inputs/PrimaryInput";
import OrderItem from "components/molecules/item/OrderItem";
import { useRouter } from "next/router";
import { useAuthContext } from "providers/AuthContext";
import React, { SyntheticEvent, useState } from "react";
import { CartItemType } from "types/item";

const OrderList = ({ cart }: { cart: CartItemType[] }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [tel, setTel] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [zipcodeError, setZipcodeError] = useState("");
  const [prefectureError, setPrefectureError] = useState("");
  const [cityError, setCityError] = useState("");
  const [telError, setTelError] = useState("");

  const cartItemsQuantity = cart.map((cartItem) => cartItem.quantity);
  const totalCartItemsQuantity = cartItemsQuantity.reduce(
    (a: number, b: number) => a + b,
    0
  );

  const totalPrices = cart.map((cartItem) => cartItem.totalPrice);
  const total = totalPrices.reduce((a: number, b: number) => a + b, 0);

  const onSubmitOrderData = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!name || !email || !zipcode || !prefecture || !city || !tel) {
      if (!name) {
        setNameError("名前を入力してください");
      } else {
        setNameError("");
      }
      if (!email) {
        setEmailError("メールアドレスを入力してください");
      } else {
        setEmailError("");
      }
      if (!zipcode) {
        setZipcodeError("郵便番号を入力してください");
      } else {
        setZipcodeError("");
      }
      if (!prefecture) {
        setPrefectureError("都道府県を入力してください");
      } else {
        setPrefectureError("");
      }
      if (!city) {
        setCityError("市区町村を入力してください");
      } else {
        setCityError("");
      }
      if (!tel) {
        setTelError("電話番号を入力してください");
      } else {
        setTelError("");
      }
    } else {
      // 注文データを送信
      const orderData = {
        items: cart,
        name,
        email,
        zipcode,
        prefecture,
        city,
        tel,
        uid: user?.uid
      };

      const parameter = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      };
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order`,
        parameter
      );

      // 注文完了後カートの商品を削除
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: user?.uid }),
      });

      // 注文完了画面へ遷移
      toOrderCompletePage();
    }
  };

  const toOrderCompletePage = () => router.push("/items/ordercomplete");

  return (
    <section
      className="mt-10 w-10/12 mx-auto md:p-8"
      onSubmit={onSubmitOrderData}
    >
      <h1 className="font-bold my-16 text-4xl text-center">ご注文確認</h1>
      <div className="mb-20 text-center">
        <div className="mb-12">
          <p className="md:text-left">
            カートに入っている商品: {totalCartItemsQuantity} 点
          </p>
          {cart.map((item: CartItemType) => {
            return (
              <OrderItem
                key={item.documentid}
                name={item.name}
                path={item.image_path}
                price={item.price}
                quantity={item.quantity}
                totalPrice={item.totalPrice}
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
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold m-10 text-center">お届け先</h2>
        <form className="w-10/12 mx-auto md:max-w-md">
          <PrimaryInput
            type="text"
            name="名前"
            placeholder="名前"
            value={name}
            onChange={setName}
          />
          <p className="text-red-500 text-xs italic mx-4">{nameError}</p>
          <PrimaryInput
            type="email"
            name="email"
            placeholder="メールアドレス"
            value={email}
            onChange={setEmail}
          />
          <p className="text-red-500 text-xs italic mx-4">{emailError}</p>
          <PrimaryInput
            type="text"
            name="郵便番号"
            placeholder="郵便番号"
            value={zipcode}
            onChange={setZipcode}
          />
          <p className="text-red-500 text-xs italic mx-4">{zipcodeError}</p>
          <PrimaryInput
            type="text"
            name="住所1(都道府県)"
            placeholder="都道府県"
            value={prefecture}
            onChange={setPrefecture}
          />
          <p className="text-red-500 text-xs italic mx-4">{prefectureError}</p>
          <PrimaryInput
            type="text"
            name="住所2(市区町村)"
            placeholder="市区町村"
            value={city}
            onChange={setCity}
          />
          <p className="text-red-500 text-xs italic mx-4">{cityError}</p>
          <PrimaryInput
            type="tel"
            name="電話番号"
            placeholder="電話番号"
            value={tel}
            onChange={setTel}
          />
          <p className="text-red-500 text-xs italic mx-4">{telError}</p>
          <div className="text-center md:text-right my-8">
            <PrimaryBtn color="bg-green-500">注文する</PrimaryBtn>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderList;
