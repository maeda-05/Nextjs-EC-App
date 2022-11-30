import { GetStaticProps } from "next";
import { Item } from "types/item";
import ItemList from "components/organisms/item/ItemList";
import Header from "components/organisms/layout/Header";
import Footer from "components/organisms/layout/Footer";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:8000/items");
  const items = await res.json();
  return {
    props: { items },
  };
};

export default function Home({ items }: { items: Item[] }) {
  return (
    <>
      <Header />
      <ItemList items={items} />
      <Footer />
    </>
  );
}
