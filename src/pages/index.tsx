import { GetStaticProps } from "next";
import { Item } from "types/item";
import ItemList from "components/organisms/item/ItemList";
import Layout from "components/template/Layout";
import { adminDB } from "../firebase/server";

export const getStaticProps: GetStaticProps = async () => {
  const COLLECTION_NAME = "items";
  const itemsCollection = adminDB.collection(COLLECTION_NAME);

  const snapshot = await itemsCollection.get();
  const items = snapshot.docs.map((doc) => {
    const item = doc.data();
    return item;
  });

  return {
    props: { items },
  };
};

export default function Home({ items }: { items: Item[] }) {
  // 全商品を追加
  // const addclick = () => {
  //   const add = async () => {
  //     await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items`, { method: "POST" });
  //   };
  //   add();
  // }
  return (
    <Layout title="商品一覧">
      <ItemList items={items} />
    </Layout>
  );
}
