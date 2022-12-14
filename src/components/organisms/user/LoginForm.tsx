import PrimaryBtn from "components/atoms/button/PrimaryBtn";
import PrimaryInput from "components/atoms/inputs/PrimaryInput";
import React, { useState } from "react";
import { app, googleProvider } from "../../../firebase/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || password.length < 6) {
      if (!email) {
        setEmailError("メールアドレスを入力してください");
      } else {
        setEmailError("");
      }
      if (!password) {
        setPasswordError("パスワードを入力してください");
      } else if (password.length < 6) {
        setPasswordError("パスワードは6文字以上で入力してください");
      } else {
        setPasswordError("");
      }
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => router.push("/"))
        .catch((e) => {
          if (e.code === "auth/user-not-found") {
            setEmailError("メールアドレスが間違っています");
          } else {
            setEmailError("");
          }
          if (e.code === "auth/wrong-password") {
            setPasswordError("パスワードが間違っています");
          } else {
            setPasswordError("");
          }
        });
    }
  };

  const handleLoginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider).then(() => router.push("/"));
  };

  return (
    <section className="mt-10 w-10/12 mx-auto md:p-8">
      <h1 className="font-bold my-16 text-4xl text-center">ログイン</h1>
      <form className="w-10/12 mx-auto md:max-w-md" onSubmit={handleLogin}>
        <PrimaryInput
          type="email"
          name="email"
          placeholder="メールアドレス"
          value={email}
          onChange={setEmail}
        />
        <p className="text-red-500 text-xs italic mx-4">{emailError}</p>
        <PrimaryInput
          type="password"
          name="パスワード"
          placeholder="パスワード"
          value={password}
          onChange={setPassword}
        />
        <p className="text-red-500 text-xs italic mx-4">{passwordError}</p>
        <div className="text-center md:text-right my-8">
          <PrimaryBtn color="bg-green-500">ログイン</PrimaryBtn>
        </div>
      </form>
      <div className="text-center">または</div>
      <div className="text-center my-8">
        <PrimaryBtn color="bg-blue-500" onClick={handleLoginWithGoogle}>
          Googleアカウントでログイン
        </PrimaryBtn>
      </div>
      <p className="text-center my-16 hover:text-blue-500 hover:cursor-pointer hover:underline">
        <Link href="/user/create">新規会員登録はこちら</Link>
      </p>
    </section>
  );
};

export default LoginForm;
