import { Item } from "types/item";
import React from "react";
import ItemDetail from "components/organisms/item/ItemDetail";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Layout from "components/template/Layout";
import { adminDB } from "../../firebase/server";

export const getStaticPaths: GetStaticPaths = async () => {
  const COLLECTION_NAME = "items";
  const itemsCollection = adminDB.collection(COLLECTION_NAME);

  const snapshot = await itemsCollection.get();
  const items = snapshot.docs.map((doc) => {
    const item = doc.data();
    return item as Item;
  });

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
  const COLLECTION_NAME = "items";
  const itemsCollection = adminDB.collection(COLLECTION_NAME);

  const id = params!.id;
  const snapshot = await itemsCollection.get();
  const items = snapshot.docs.map((doc) => {
    const item = doc.data();
    return item as Item;
  });
  const item = items.find((item: Item) => item.id === Number(id));

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
