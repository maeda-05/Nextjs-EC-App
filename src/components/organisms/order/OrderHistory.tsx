import OrderItem from "components/molecules/item/OrderItem";
import React from "react";
import { CartItemType } from "types/item";

const OrderHistory = ({
  orderItems,
}: {
  orderItems: {
    items: CartItemType[];
    orderAt: Date;
    order_id: string;
  }[];
}) => {
  return (
    <section className="mt-10 w-10/12 mx-auto md:p-8">
      <h1 className="font-bold my-16 text-4xl text-center">注文履歴</h1>
      {orderItems.length === 0 ? (
        <p className="text-center md:text-left m-3">注文履歴はございません</p>
      ) : (
        <div className="space-y-10">
          {orderItems.map((orderItem, index) => {
            const orderDate = new Date(orderItem.orderAt);
            const year = orderDate.getFullYear();
            const month = orderDate.getMonth() + 1;
            const day = orderDate.getDate();
            const hour = orderDate.getHours();
            const minute = orderDate.getMinutes();
            return (
              <div
                className="border border-gray-300 rounded-xl p-3"
                key={index}
              >
                <p className="m-2">{`注文日時：${year}年${month}月${day}日${hour}時${minute}分`}</p>
                <p className="m-2">{`注文ID：${orderItem.order_id}`}</p>
                {orderItem.items.map((item) => {
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
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default OrderHistory;
