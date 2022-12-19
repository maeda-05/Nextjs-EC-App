import { GetStaticProps } from "next";
import { Item } from "types/item";
import ItemList from "components/organisms/item/ItemList";
import Layout from "components/template/Layout";
import { QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../nextjs-ec-app-firebase-adminsdk.json");
const admin = require("firebase-admin");


export const getStaticProps: GetStaticProps = async () => {
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
