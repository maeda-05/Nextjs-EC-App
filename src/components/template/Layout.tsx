import Footer from "components/organisms/layout/Footer";
import Header from "components/organisms/layout/Header";
import Head from "next/head";
import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};

const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
