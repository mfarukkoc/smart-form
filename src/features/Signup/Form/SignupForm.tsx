import Form from "@/components/Form/Form";
import FormField from "@/components/Form/Field/FormField";
import Input from "@/components/Input/Input";
import { UseFormReturn } from "react-hook-form";
import { containsCharacters, startsWithCapital } from "./validations";
import Button from "@/components/Button/Button";

export const initialFormData = {
  username: "",
  surname: "",
  address: "",
};

export type SignupFormData = typeof initialFormData;

interface SignupFormProps {
  form: UseFormReturn<SignupFormData>;
  onSubmit: (data: SignupFormData) => void;
}

const SignupForm = ({ form, onSubmit }: SignupFormProps) => {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormField
        label="Username:"
        name="username"
        options={{
          required: "Please input your username!",
          validate: {
            startsWithCapital: (value) =>
              startsWithCapital(value, "Should start with capital letter."),
          },
        }}
      >
        <Input />
      </FormField>
      <FormField
        label="Surname:"
        name="surname"
        options={{
          required: "Please input your surname!",
          validate: {
            startsWithCapital: (value) =>
              startsWithCapital(value, "Should start with capital letter."),
            containsCharacters: (value) =>
              containsCharacters(value, "Please input a valid surname."),
          },
        }}
      >
        <Input />
      </FormField>
      <FormField
        label="Address:"
        name="address"
        options={{
          required: "Please input your address!",
        }}
      >
        <Input />
      </FormField>

      <FormField>
        <Button>Submit</Button>
      </FormField>
    </Form>
  );
};

export default SignupForm;
