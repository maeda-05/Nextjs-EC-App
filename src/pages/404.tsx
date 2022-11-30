import React from "react";
import PrimaryBtn from "components/atoms/button/PrimaryBtn";
import { useRouter } from "next/router";

const Custom404 = () => {
  const router = useRouter();
  const toItemPage = () => router.push("/");
  return (
    <div className="text-center mt-20 space-y-10 mx-8">
      <p className="text-3xl font-bold">ページが見つかりませんでした</p>
      <PrimaryBtn color="bg-blue-500" onClick={toItemPage}>
        買い物を続ける
      </PrimaryBtn>
    </div>
  );
};

export default Custom404;
