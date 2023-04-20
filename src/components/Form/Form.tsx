import React, { ReactNode } from "react";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import FormField, { FormFieldProps } from "./Field/FormField";

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
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = formMethods;

  const isFormField = (
    child: ReactNode
  ): child is React.ReactElement<FormFieldProps<T>> => {
    return (child as React.ReactElement).type === FormField;
  };

  const registerChildren = (children: ReactNode): ReactNode => {
    return React.Children.map(children, (child) => {
      if (isFormField(child)) {
        const props = child.props;
        const newChildren = registerChildren(props.children as ReactNode);
        const clonedChild = React.cloneElement(
          child,
          {
            ...props,
          },
          newChildren
        );
        if (props.controlled) {
          // Controlled Field case
          const { control: controlFromProps, ...rest } = props;
          return React.cloneElement<FormFieldProps<T>>(clonedChild, {
            control: controlFromProps || control,
            ...rest,
          });
        } else {
          // Uncontrolled Field case
          const {
            register: registerFromProps,
            error: errorFromProps,
            ...rest
          } = props;
          const error = props.name ? errors[props.name] : undefined;

          return React.cloneElement<FormFieldProps<T>>(clonedChild, {
            register: registerFromProps ?? register,
            error: errorFromProps ?? error,
            ...rest,
          });
        }
      } else if (React.isValidElement(child) && child.props.children) {
        // Has children case
        const newChildren = registerChildren(child.props.children);
        return React.cloneElement(
          child,
          {
            ...child.props,
          },
          newChildren
        );
      }
      return child;
    });
  };

  const clonedChildren = registerChildren(children);

  return (
    <form
      onSubmit={onSubmit ? handleSubmit(onSubmit, onError) : undefined}
      {...rest}
    >
      {clonedChildren}
    </form>
  );
};

export default Form;
