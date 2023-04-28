import React, { ReactNode, useCallback, useMemo } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import FormFieldTemplate from "../Template";
import { useFormContext } from "../../FormContext";
import useIsFieldRequired from "../useIsFieldRequired";

export type UncontrolledFormFieldProps<T extends FieldValues> = {
  /* Name of the form field */
  name?: Path<T>;
  /* Label of the form field */
  label?: string;
  /* "register" object provided by invoking useForm */
  register?: UseFormRegister<T>;
  /* Error of the field */
  error?: FieldErrors<T>[keyof T];
  /* Input element that accepts register */
  children: ReactNode;
  /* Form options parameter to read if field is required*/
  options?: RegisterOptions;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * A component for uncontrolled form fields.
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
  name: nameFromField,
  register: registerFromProps,
  error: errorFromProps,
  children,
  options,
  ...rest
}: UncontrolledFormFieldProps<T>) => {
  const form = useFormContext<T>();
  const register = registerFromProps ?? form.register;
  const error =
    errorFromProps ??
    (nameFromField ? form.formState.errors[nameFromField] : undefined);
  const isRequired = useIsFieldRequired(options?.required);

  const registerChildren = useCallback(
    (children: ReactNode, hasMultiple: boolean): ReactNode => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          let newChildren: ReactNode = null;
          if (child.props.children) {
            hasMultiple = true;
            newChildren = registerChildren(child.props.children, hasMultiple);
          }

          const name = child.props.name || nameFromField;

          if (
            name === undefined ||
            !(
              child.type === "input" ||
              child.type === "select" ||
              typeof child.type === "function" ||
              typeof child.type === "object"
            )
          ) {
            // don't register without name
            // don't register elements that are not inputs, selects or custom components
            return React.cloneElement(child, child.props, newChildren);
          }

          const registerProps = register(name, options);

          return React.cloneElement(
            child,
            {
              id: hasMultiple ? undefined : nameFromField,
              error: error?.message ? true : undefined,
              ...registerProps,
              ...child.props,
            },
            newChildren
          );
        }
        return child;
      });
    },
    [error?.message, nameFromField, options, register]
  );

  const registeredChildren = registerChildren(children, false);

  return (
    <FormFieldTemplate
      name={nameFromField as string}
      label={label}
      required={isRequired}
      error={error?.message as React.ReactNode}
      {...rest}
    >
      {registeredChildren}
    </FormFieldTemplate>
  );
};

export default UncontrolledFormField;
