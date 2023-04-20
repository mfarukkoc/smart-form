import { SignupFormData } from "../Form/SignupForm";
import Button from "@/components/Button/Button";

interface Props {
  signupFormData: SignupFormData;
  onGoBack: () => void;
  onConfirm: () => void;
}

const SignupPreview = ({ signupFormData, onGoBack, onConfirm }: Props) => {
  const fields = [
    {
      label: "Username:",
      value: signupFormData.username,
    },
    {
      label: "Surname:",
      value: signupFormData.surname,
    },
    {
      label: "Address:",
      value: signupFormData.address,
    },
  ];

  return (
    <div className="border px-4 pb-4 pt-2 shadow-sm">
      <h2 className="pb-2 text-lg font-bold">Confirm Your Information</h2>
      <ul className="flex flex-col gap-2">
        {fields.map(({ label, value }) => (
          <li className={"flex"} key={label}>
            <span className="mr-2 block w-24 font-medium">{label}</span>
            <span className="block w-auto">{value}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between gap-4">
        <Button variant="secondary" onClick={onGoBack}>
          Go back
        </Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </div>
    </div>
  );
};

export default SignupPreview;
