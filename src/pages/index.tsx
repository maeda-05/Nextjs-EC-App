import { GetStaticProps } from "next";
import { Item } from "types/item";
import ItemList from "components/organisms/item/ItemList";
import Layout from "components/template/Layout";
import { useAuthContext } from "providers/AuthContext";


export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items`);
  const items = await res.json();
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
