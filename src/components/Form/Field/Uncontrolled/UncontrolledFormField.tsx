import React, { useCallback } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegisterReturn,
} from "react-hook-form";
import FormFieldTemplate from "../Template";

export type UncontrolledFormFieldProps<T extends FieldValues> = {
  /* Name of the form field */
  name?: Path<T>;
  /* Label of the form field */
  label?: string;
  /* "register" object provided by invoking useForm */
  register?: UseFormRegisterReturn;
  /* Error of the field */
  error?: FieldErrors<T>[keyof T];
  /* Input element that accepts register */
  children: React.ReactElement;
  /* Form options parameter to read if field is required*/
  options?: RegisterOptions;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * A component for uncontrolled for fields.
 *
 * This component should not be used separately, use the FormField interface.
 * @example
 *
 *<FormField
 *  label="username"
 *  name="username"
 *  options={{
 *    required: "Please input your username!",
 *  }}
 *>
 *    <Input />
 *</FormField>
 */
const UncontrolledFormField = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  children,
  options,
  ...rest
}: UncontrolledFormFieldProps<T>) => {
  const isRequired = useCallback(() => {
    const req = options?.required;
    if (req !== undefined) {
      if (typeof req === "string") {
        return true;
      } else if (typeof req === "boolean") {
        return req;
      } else {
        return req.value;
      }
    }
    return false;
  }, [options?.required]);

  return (
    <FormFieldTemplate
      name={name as string}
      label={label}
      required={isRequired()}
      error={error?.message as React.ReactNode}
      {...rest}
    >
      {React.cloneElement(children, {
        id: name,
        name,
        error: error?.message ? true : undefined,
        ...register,
      })}
    </FormFieldTemplate>
  );
};

export default UncontrolledFormField;
