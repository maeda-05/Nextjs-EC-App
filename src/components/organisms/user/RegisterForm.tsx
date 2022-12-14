import PrimaryBtn from "components/atoms/button/PrimaryBtn";
import PrimaryInput from "components/atoms/inputs/PrimaryInput";
import { app } from "../../../firebase/firebase";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmationPasswordError, setConfirmationPasswordError] =
    useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmationPassword ||
      password !== confirmationPassword ||
      password.length < 6 ||
      confirmationPassword.length < 6
    ) {
      if (!name) {
        setNameError("名前を入力してください");
      } else {
        setNameError("");
      }
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
      if (!confirmationPassword) {
        setConfirmationPasswordError("確認用パスワードを入力してください");
      } else if (confirmationPassword.length < 6) {
        setConfirmationPasswordError("パスワードは6文字以上で入力してください");
      } else if (password !== confirmationPassword) {
        setConfirmationPasswordError("パスワードと一致しません");
      } else {
        setConfirmationPasswordError("");
      }
    } else {
      // Firebaseに登録
      await createUserWithEmailAndPassword(auth, email, password)
        .then((registerUserData) => {
          // バックエンドにユーザー情報を送信
          const userData = {
            uid: registerUserData.user.uid,
            name,
            email,
            password,
            confirmationPassword,
          };

          const parameter = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          };

          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`,
            parameter
          ).then(() => router.push("/"));
        })
        .catch((e) => {
          if (e.code === "auth/email-already-in-use") {
            setEmailError("すでにこのメールアドレスは使用されております");
          } else {
            setEmailError("");
          }
        });
    }
  };
  return (
    <section className="mt-10 w-10/12 mx-auto md:p-8">
      <h1 className="font-bold my-16 text-4xl text-center">新規会員登録</h1>
      <form className="w-10/12 mx-auto md:max-w-md" onSubmit={handleSubmit}>
        <PrimaryInput
          type="text"
          name="名前"
          placeholder="名前"
          value={name}
          onChange={setName}
        />
        <p className="text-red-500 text-xs italic mx-4">{nameError}</p>
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
        <PrimaryInput
          type="password"
          name="確認用パスワード"
          placeholder="確認用パスワード"
          value={confirmationPassword}
          onChange={setConfirmationPassword}
        />
        <p className="text-red-500 text-xs italic mx-4">
          {confirmationPasswordError}
        </p>
        <div className="text-center md:text-right my-8">
          <PrimaryBtn color="bg-green-500">登録する</PrimaryBtn>
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
