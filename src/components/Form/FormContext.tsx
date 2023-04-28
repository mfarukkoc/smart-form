import { createContext, useContext } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export type FormContextType<T extends FieldValues> =
  | {
      form: UseFormReturn<T>;
    }
  | undefined;

export const FormContext = createContext<FormContextType<any>>(undefined);

export function useFormContext<T extends FieldValues>() {
  const context = useContext(FormContext) as FormContextType<T>;
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormContextProvider");
  }
  return context.form;
}
