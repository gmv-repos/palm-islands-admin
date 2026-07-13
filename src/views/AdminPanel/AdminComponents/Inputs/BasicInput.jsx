import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const BasicInput = ({
  width,
  name,
  title,
  error,
  placeholder,
  iserror,
  value,
  type,
  isrequire,
  onchange,
  inputName
}) => {
  // const InputSchema = yup.object().shape({
  //    name: yup
  //   .string()
  //   .trim()
  //   .required(`${title} is required`)
  // });

  // const {
  //   register: inputFeild,
  //   handleSubmit: handleSubmitLogin,
  //   formState: { errors: errorsLogin },
  // } = useForm({
  //   resolver: yupResolver(InputSchemaSchema),
  // });

  return (
    <div className="flex flex-col gap-2 justfify-between  ">
      <label className="text-sm text-gray-700">{title} {isrequire ? <span className="text-red-500">*</span> : <></>}</label>
      <div>
        <input
          required={isrequire ? "required" : ""}
          className={`rounded p-3 text-base border outline-none border-gray-300 ${width} `}
          value={value}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onchange}
        />
      </div>
    </div>
  );
};

export default BasicInput;
