import React from "react";

const DescriptionInput = ({
  width,
  title,
  error,
  iserror,
  value,
  onchange,
  req,
  rows
}) => {
  return (
    <div className="flex flex-col gap-2 justfify-between ">
      <label className="text-sm text-gray-700" >{title}</label>
      <div>
        <textarea
          name="meta_description"
          className={`rounded p-3 text-base border outline-none ${width}`}
          value={value}
          
          rows={rows}
          required={req}
          onchange={onchange}
        />
      </div>
    </div>
  );
};

export default DescriptionInput;
