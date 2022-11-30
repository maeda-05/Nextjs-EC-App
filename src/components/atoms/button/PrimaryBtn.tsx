import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  color: string;
};

const PrimaryBtn: FC<Props> = ({ children, onClick, color }) => {
  return (
    <button
      className={`${color} text-white font-bold rounded-full hover:cursor-pointer hover:opacity-70 p-2`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
