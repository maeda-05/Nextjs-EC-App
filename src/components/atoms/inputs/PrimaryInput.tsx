import React, { ChangeEventHandler, FC, ReactNode, useState } from "react";

type Props = {
  type: "text" | "password" | "tel" | "email";
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string ) => void;
};

const PrimaryInput: FC<Props> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="p-2 mx-2 mt-4">
      <label htmlFor={name} className="text-sm block">
        {name}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-green-300 placeholder-gray-500 placeholder-opacity-50"
      />
    </div>
  );
};

export default PrimaryInput;
