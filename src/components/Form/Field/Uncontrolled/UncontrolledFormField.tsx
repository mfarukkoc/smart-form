import React, { ReactNode, useCallback } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import FormFieldTemplate from "../Template";

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

  const registerChildren = (
    children: ReactNode,
    hasMultiple: boolean
  ): ReactNode => {
    if (register === undefined) {
      return children;
    }
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
  };

  const registeredChildren = registerChildren(children, false);

  return (
    <FormFieldTemplate
      name={nameFromField as string}
      label={label}
      required={isRequired()}
      error={error?.message as React.ReactNode}
      {...rest}
    >
      {registeredChildren}
    </FormFieldTemplate>
  );
};

export default UncontrolledFormField;
