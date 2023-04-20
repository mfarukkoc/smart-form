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
    <div className="flex flex-col flex-wrap" {...rest}>
      <div className="flex w-full flex-col sm:flex-row sm:items-center">
        <label
          htmlFor={name as string}
          className="block pr-2 font-medium text-gray-700 sm:w-24 sm:text-right"
        >
          {<>{required && <span className="text-red-500">*&nbsp;</span>}</>}
          {label}
        </label>
        {children}
      </div>

      <span className="mb-2 w-auto text-sm text-red-500 sm:ml-24">
        {error || <>&nbsp;</>}
      </span>
    </div>
  );
};

export default FormFieldTemplate;
