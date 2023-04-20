import React from "react";
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  UseControllerReturn,
  useController,
} from "react-hook-form";
import FormFieldTemplate from "../Template";

export type ControlledFormFieldProps<T extends FieldValues> = {
  /* 	"control" object provided by invoking useForm */
  control?: Control<T>;
  /* Name of the form field */
  name: Path<T>;
  /* Label of the form field */
  label?: string;
  /* Passes children the object returned by invoking useController */
  children: React.FC<UseControllerReturn<T>>;
  /* Options parameter for the field */
  options?: RegisterOptions;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;

/**
 * A component that provides a controlled form field using 3rd party or custom input components.
 *
 * This component should not be used separately, use the FormField interface.
 * @example
 *
 * <FormField
 *  controlled
 *  label="username"
 *  name="username"
 *  options={{
 *    required: "Please input your username!",
 *  }}
 *>
 *  {(props) => (
 *    <Input
 *      value={props.field.value}
 *      onChange={(e) => props.field.onChange(e.target.value)}
 *    />
 *  )}
 *</FormField>
 */
const ControlledFormField = <T extends FieldValues>({
  control,
  name,
  label,
  children,
  options,
  ...rest
}: ControlledFormFieldProps<T>) => {
  const controller = useController({
    control,
    name,
    rules: options,
  });

  const { fieldState } = controller;
  return (
    <FormFieldTemplate
      name={name}
      label={label}
      error={fieldState.error?.message as React.ReactNode}
      {...rest}
    >
      {children(controller)}
    </FormFieldTemplate>
  );
};

export default ControlledFormField;
