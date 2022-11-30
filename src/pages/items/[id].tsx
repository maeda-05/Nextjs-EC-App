import { Item } from "types/item";
import React from "react";
import ItemDetail from "components/organisms/item/ItemDetail";
import Header from "components/organisms/layout/Header";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Footer from "components/organisms/layout/Footer";
import Layout from "components/template/Layout";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://localhost:8000/items");
  const items: Item[] = await res.json();
  return {
    paths: items.map((item: Item) => {
      return { params: { id: item.id.toString() } };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const res = await fetch(`http://localhost:8000/items/${params!.id}`);
  const item = await res.json();
  return {
    props: { item },
  };
};

const ItemDetailPage = ({ item }: { item: Item }) => {
  return (
    <Layout title={item.name}>
      <ItemDetail item={item} />
    </Layout>
  );
};

export default ItemDetailPage;
