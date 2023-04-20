import React from "react";

export type FormFieldTemplateProps = {
  name: string;
  label?: string;
  error?: React.ReactNode;
  children: React.ReactNode;
  required?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * A template component for a form field. It renders a label and an error message for the input.
 */
const FormFieldTemplate = ({
  name,
  label,
  children,
  error,
  required,
  ...rest
}: FormFieldTemplateProps) => {
  return (
    <div className="flex flex-col" {...rest}>
      <div className="flex w-full items-center">
        <label
          htmlFor={name as string}
          className="block w-24 pr-2 text-right font-medium text-gray-700"
        >
          {<>{required && <span className="text-red-500">*&nbsp;</span>}</>}
          {label}
        </label>
        {children}
      </div>

      <span className="mb-2 ml-24 w-auto text-xs text-red-500">
        {error || <>&nbsp;</>}
      </span>
    </div>
  );
};

export default FormFieldTemplate;
