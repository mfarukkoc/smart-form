import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button = ({ variant = "primary", ...rest }: ButtonProps) => {
  const className = `rounded font-bold px-4 py-2 text-white ${
    variant === "primary"
      ? "bg-blue-500 hover:bg-blue-700"
      : "bg-gray-500 hover:bg-gray-700"
  }`;

  return (
    <button className={className} {...rest}>
      {rest.children}
    </button>
  );
};

export default Button;
