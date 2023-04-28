import React, { ReactNode } from "react";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { FormContext } from "./FormContext";

type BaseProps<T extends FieldValues> = {
  children: ReactNode;
  /**
   * An optional instance of the useForm hook to be used to control form from outside component. */
  form?: UseFormReturn<T>;
  /**
   * Options parameter for the form inside component
   */
  options?: UseFormProps<T>;
  /**
   * Optional handler to be called when the form is submitted successfully.
   *
   */
  onSubmit?: SubmitHandler<T>;
  /**
   * Optional handler to be called when the form submission fails. */
  onError?: SubmitErrorHandler<T>;
};

type FormProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.HTMLAttributes<HTMLFormElement>, keyof BaseProps<T>>;

/**
 * A form element with child components that utilize the react-hook-form library
 * @example
 *<Form onSubmit={onSubmit}>
 *  <FormField label="Name" name="name" >
 *    <Input />
 *  </FormField>
 *  <FormField label="Email" name="email" >
 *    <Input />
 *  </FormField>
 *  <button type="submit">Submit</button>
 *</Form>
 */
const Form = <T extends FieldValues>({
  children,
  form: formFromProps,
  onSubmit,
  onError,
  options,
  ...rest
}: FormProps<T>) => {
  const form = useForm(options);
  const formMethods = formFromProps || form;
  const { handleSubmit } = formMethods;

  return (
    <FormContext.Provider value={{ form: formMethods }}>
      <form
        onSubmit={onSubmit ? handleSubmit(onSubmit, onError) : undefined}
        {...rest}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
