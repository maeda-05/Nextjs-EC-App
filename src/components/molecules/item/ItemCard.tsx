import React from "react";
import Image from "next/image";
import Link from "next/link";

type itemData = {
  id: number;
  name: string;
  price: number;
  path: string;
};

const ItemCard = ({ id, name, price, path }: itemData) => {
  return (
    <div className="text-center">
      <Link
        href={`items/${id}`}
        className="cursor-pointer space-y-2 block w-48 mx-auto"
      >
        <Image
          src={path}
          alt={name}
          width={192}
          height={192}
          className="rounded-lg"
        />
        <p>{name}</p>
        <p className="font-bold before:content-['¥']">{price}</p>
      </Link>
    </div>
  );
};

export default ItemCard;
