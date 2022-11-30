import ItemCard from "components/molecules/item/ItemCard";
import React from "react";
import { Item } from "types/item";

const ItemList = ({ items }: { items: Item[] }) => {
  return (
    <section>
      <h1 className="text-center font-bold my-16 text-4xl">商品一覧</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => {
          return (
            <ItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              path={item.image_path}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ItemList;
