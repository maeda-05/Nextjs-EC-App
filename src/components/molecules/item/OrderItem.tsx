import Image from "next/image";
import React, { FC } from "react";

type Props = {
  name: string;
  path: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

const OrderItem: FC<Props> = ({
  path,
  name,
  price,
  quantity,
  totalPrice,
}) => {
  return (
    <div className="flex space-x-3 justify-around items-center mx-auto mt-10 border-y-2 py-5">
      <Image src={path} width={80} height={80} alt={name} />
      <div className="w-52">
        <p className="text-sm">{name}</p>
        <p className="text-sm before:content-['¥']">{price}</p>
      </div>
      <p className="w-20 text-sm after:content-['個']">{quantity}</p>
      <p className="w-12 text-sm before:content-['¥']">
        {totalPrice.toLocaleString()}
      </p>
    </div>
  );
};

export default OrderItem;
