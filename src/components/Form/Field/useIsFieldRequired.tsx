import { useMemo } from "react";
import { RegisterOptions } from "react-hook-form";

const useIsFieldRequired = (required?: RegisterOptions["required"]) => {
  return useMemo(() => {
    if (required !== undefined) {
      if (typeof required === "string") {
        return true;
      } else if (typeof required === "boolean") {
        return required;
      } else {
        return required.value;
      }
    }
    return false;
  }, [required]);
};

export default useIsFieldRequired;
