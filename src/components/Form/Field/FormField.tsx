import { FieldValues } from "react-hook-form";
import ControlledFormField, {
  ControlledFormFieldProps,
} from "./Controlled/ControlledFormField";
import UncontrolledFormField, {
  UncontrolledFormFieldProps,
} from "./Uncontrolled/UncontrolledFormField";

export type FormFieldProps<T extends FieldValues> = { controlled?: boolean } & (
  | (ControlledFormFieldProps<T> & { controlled: true })
  | (UncontrolledFormFieldProps<T> & { controlled?: false })
);

/**
 * A component that can be used for both controlled and uncontrolled form fields.
 * The behavior is determined by the "controlled" prop.
 *
 * This component provides a consistent API for both types of form fields, making it easier to switch between them if needed.
 * @example
 *
 *<FormField
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
const FormField = <T extends FieldValues>(props: FormFieldProps<T>) => {
  const { controlled, ...rest } = props;
  if (controlled) {
    return <ControlledFormField {...(rest as ControlledFormFieldProps<T>)} />;
  } else {
    return (
      <UncontrolledFormField {...(rest as UncontrolledFormFieldProps<T>)} />
    );
  }
};

export default FormField;
