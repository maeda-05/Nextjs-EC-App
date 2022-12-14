import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "providers/AuthContext";
import React, { useEffect, useState } from "react";
import { app } from "../../../firebase/firebase";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginUserName, setLoginUserName] = useState<string | null>('ゲスト')
  const auth = getAuth(app);
  const { user } = useAuthContext();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    if (user) {
      if (user.providerData[0].providerId === "google.com") {
        setLoginUserName(user.displayName);
      }
      if (user.providerData[0].providerId === "password") {
        setLoginUserName(user.email);
      }
    } else {
        setLoginUserName("ゲスト");
      }
  }, [user]);

  return (
    <header className="flex justify-between items-center p-3 mb-20 relative">
      <div className="flex items-end">
        <Link href="/">
          <Image
            src="/logo/header_logo.png"
            alt="ロゴ"
            width={180}
            height={100}
          />
        </Link>
        <p className="ml-5 hidden md:block text-sm">
          ようこそ <span className="font-bold">{loginUserName}</span> さん
        </p>
      </div>
      <nav className="md:flex hidden space-x-5 mx-5">
        <div className="p-2 hover:font-bold hover:cursor-pointer">
          <Link href="/" className="">
            商品一覧
          </Link>
        </div>
        <div className="p-2 hover:font-bold hover:cursor-pointer">
          <Link href={`/items/cart?uid=${user?.uid}`}>カート</Link>
        </div>
        {!user && (
          <div className="p-2 hover:font-bold hover:cursor-pointer">
            <Link href="/user/create">新規登録</Link>
          </div>
        )}
        {user ? (
          <div
            className="p-2 text-blue-500 hover:font-bold hover:cursor-pointer"
            onClick={handleLogout}
          >
            ログアウト
          </div>
        ) : (
          <div className="p-2 text-red-500 hover:font-bold hover:cursor-pointer">
            <Link href="/user/login">ログイン</Link>
          </div>
        )}
      </nav>
      {isOpen || (
        <i
          className="fa-solid fa-bars text-2xl p-3 md:hidden hover:cursor-pointer"
          onClick={toggleOpen}
        ></i>
      )}
      {isOpen && (
        <nav className="absolute top-2 right-0 bg-white">
          <div className="text-right pr-2">
            <i
              className="fa-solid fa-xmark text-2xl hover:cursor-pointer"
              onClick={toggleOpen}
            ></i>
          </div>
          <p className="p-2 text-sm">
            ようこそ <span className="font-bold">{loginUserName}</span> さん
          </p>
          <div className="p-2 hover:font-bold hover:cursor-pointer">
            <Link href="/" className="">
              商品一覧
            </Link>
          </div>
          <div className="p-2 hover:font-bold hover:cursor-pointer">
            <Link href={`/items/cart?uid=${user?.uid}`}>カート</Link>
          </div>
          {!user && (
            <div className="p-2 hover:font-bold hover:cursor-pointer">
              <Link href="/user/create">新規登録</Link>
            </div>
          )}
          {user ? (
            <div
              className="p-2 text-blue-500 hover:font-bold hover:cursor-pointer"
              onClick={handleLogout}
            >
              ログアウト
            </div>
          ) : (
            <div className="p-2 text-red-500 hover:font-bold hover:cursor-pointer">
              <Link href="/user/login">ログイン</Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
