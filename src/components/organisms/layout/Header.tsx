import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex justify-between items-center p-3 mb-20">
      <Image src="/logo/header_logo.png" alt="ロゴ" width={180} height={100} />
      <nav className="md:flex hidden space-x-8 mx-7">
        <div className="p-2 hover:font-bold hover:cursor-pointer">
          <Link href="/" className="">
            商品一覧
          </Link>
        </div>
        <div className="p-2 hover:font-bold hover:cursor-pointer">
          <Link href="/items/cart">カート</Link>
        </div>
        <div className="p-2 hover:font-bold hover:cursor-pointer">
          <Link href="">新規登録</Link>
        </div>
      </nav>
      {isOpen || (
        <i
          className="fa-solid fa-bars text-2xl p-3 md:hidden hover:cursor-pointer"
          onClick={toggleOpen}
        ></i>
      )}
      {isOpen && (
        <nav className="">
          <div className="text-right">
            <i
              className="fa-solid fa-xmark text-2xl hover:cursor-pointer"
              onClick={toggleOpen}
            ></i>
          </div>
          <div className="p-2 hover:font-bold hover:cursor-pointer">
            <Link href="/" className="">
              商品一覧
            </Link>
          </div>
          <div className="p-2 hover:font-bold hover:cursor-pointer">
            <Link href="/items/cart">カート</Link>
          </div>
          <div className="p-2 hover:font-bold hover:cursor-pointer">
            <Link href="">新規登録</Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
