import PrimaryBtn from "components/atoms/button/PrimaryBtn";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ChangeEventHandler, useState } from "react";
import { Item } from "types/item";

const ItemDetail = ({ item }: { item: Item }) => {
  const router = useRouter();
  // 商品数をカウント
  const [quantity, setQuantity] = useState("1");
  const onChangeCount: ChangeEventHandler<HTMLSelectElement> = (e) =>
    setQuantity(e.target.value);

  const addItem = async () => {
    // カートに商品データをpost
    const cartItem = {
      ...item,
      quantity: parseInt(quantity),
      totalPrice: parseInt(quantity) * item.price,
    };

    const parameter = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    };

    await fetch(`http://localhost:8000/cart`, parameter);

    router.push("/items/cart");
  };

  return (
    <section className="mt-10 w-10/12 mx-auto">
      <h1 className="text-center font-bold my-16 text-4xl">商品ページ</h1>
      <div className="flex flex-wrap justify-around items-center">
        <Image src={item.image_path} alt={item.name} width={400} height={400} />
        <div className="text-center space-y-8 ml-2">
          <p className="font-bold text-3xl mt-6">{item.name}</p>
          <p className="font-bold text-2xl before:content-['¥']">
            {item.price}
          </p>
          <div className="flex justify-center space-x-3">
            <p>数量</p>
            <select
              className="border border-gray-500 rounded"
              onChange={onChangeCount}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </div>
          <p className="underline">
            合計金額：
            <span className="font-bold text-3xl before:content-['¥']">
              {(parseInt(quantity) * item.price).toLocaleString()}
            </span>
          </p>
          <PrimaryBtn color="bg-green-500" onClick={addItem}>
            カートに追加
          </PrimaryBtn>
        </div>
      </div>
      <h2 className="text-gray-500 mt-12">商品説明</h2>
      <p className="mt-6">{item.description}</p>
    </section>
  );
};

export default ItemDetail;
