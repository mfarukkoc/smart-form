import React, { useState, lazy, Suspense } from "react";
import { useForm } from "react-hook-form";
import SignupForm, { initialFormData } from "./Form/SignupForm";
const SignupPreview = lazy(() => import("./Preview/SignupPreview"));

const Signup = () => {
  const form = useForm({
    defaultValues: initialFormData,
  });
  const [showPreview, setShowPreview] = useState(false);
  return (
    <>
      {showPreview ? (
        <Suspense fallback={"Loading..."}>
          <SignupPreview
            signupFormData={form.getValues()}
            onGoBack={() => setShowPreview(false)}
            onConfirm={() => alert("form submitted")}
          />
        </Suspense>
      ) : (
        <SignupForm form={form} onSubmit={() => setShowPreview(true)} />
      )}
    </>
  );
};

export default Signup;
