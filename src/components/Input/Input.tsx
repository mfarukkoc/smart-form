import React, { forwardRef, InputHTMLAttributes } from "react";

type InputProps = { error?: boolean } & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={`focus:shadow-outline flex-auto border px-3 py-2 leading-tight text-gray-700 focus:outline-none ${
          error ? "border-red-500" : null
        }`}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
