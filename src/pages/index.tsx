import { GetStaticProps } from "next";
import { Item } from "types/item";
import ItemList from "components/organisms/item/ItemList";
import Layout from "components/template/Layout";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:8000/items");
  const items = await res.json();
  return {
    props: { items },
  };
};

export default function Home({ items }: { items: Item[] }) {
  return (
    <Layout title="商品一覧">
      <ItemList items={items} />
    </Layout>
  );
}
