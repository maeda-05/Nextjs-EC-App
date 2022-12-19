import { Item } from "types/item";
import React from "react";
import ItemDetail from "components/organisms/item/ItemDetail";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Layout from "components/template/Layout";
import { QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../nextjs-ec-app-firebase-adminsdk.json");
const admin = require("firebase-admin");

export const getStaticPaths: GetStaticPaths = async () => {
  //初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }

  const COLLECTION_NAME = "items";
  const db = getFirestore();
  const itemsCollection = db.collection(COLLECTION_NAME);

  const snapshot: Promise<QuerySnapshot<Item>> = await itemsCollection.get();
  const items = (await snapshot).docs.map(
    (doc: QueryDocumentSnapshot<Item>) => {
      const item = doc.data();
      return item;
    }
  );

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
  //初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }

  const COLLECTION_NAME = "items";
  const db = getFirestore();
  const itemsCollection = db.collection(COLLECTION_NAME);

  const id = params!.id;
  const snapshot: Promise<QuerySnapshot<Item>> = await itemsCollection.get();
  const items = (await snapshot).docs.map(
    (doc: QueryDocumentSnapshot<Item>) => {
      const item = doc.data();
      return item;
    }
  );
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
