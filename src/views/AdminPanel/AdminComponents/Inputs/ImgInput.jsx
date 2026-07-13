import React, { useState } from "react";

const ImgInput = ({
  title,
  error,
  accept,
  width,
  iserror,
  ismulti,
  req,
  onchange,
  name
}) => {
  return (
    <div className="flex flex-col gap-2 justfify-between  ">
      <label className="text-sm text-gray-700" >
        {title}
      </label>
      <div>
        <input
          type="file"
          className={`rounded p-3 border outline-none text-sm text-gray-700 ${width} `}
          accept={accept}
          name={name}
          onChange={onchange}
          multiple={ismulti ? "multiple": ""}
          required={req}
        />
      </div>
    </div>
  );
};

export default ImgInput;
