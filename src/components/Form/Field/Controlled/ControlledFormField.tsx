import React, { useMemo } from "react";
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  UseControllerReturn,
  useController,
} from "react-hook-form";
import FormFieldTemplate from "../Template";
import { useFormContext } from "../../FormContext";
import useIsFieldRequired from "../useIsFieldRequired";

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
  name,
  label,
  children,
  options,
  ...rest
}: ControlledFormFieldProps<T>) => {
  const form = useFormContext<T>();

  const controller = useController({
    control: form.control,
    name,
    rules: options,
  });

  const isRequired = useIsFieldRequired(options?.required);

  const { fieldState } = controller;
  return (
    <FormFieldTemplate
      name={name}
      label={label}
      error={fieldState.error?.message as React.ReactNode}
      required={isRequired}
      {...rest}
    >
      {children(controller)}
    </FormFieldTemplate>
  );
};

export default ControlledFormField;
