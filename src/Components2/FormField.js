import { forwardRef, useState } from "react";
import MyInput from "./MyInput";

const FormField = forwardRef(function FormField({ label, isRequired }, ref) {
  const [value, setValue] = useState("");
  return (
    <>
      <MyInput
        ref={ref}
        label={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {isRequired && value === "" && <i style={{ color: "red" }}>*</i>}
    </>
  );
});

export default FormField;
