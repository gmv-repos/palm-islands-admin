import React, { useRef } from "react";
import JoditEditor from 'jodit-react';

const TextEditor = ({
  width,
  title,
  error,
  iserror,
  onchange,
}) => {
  const editor = useRef(null);
  return (
    <div className="flex flex-col gap-2 justfify-between  ">
      <label className="text-sm text-gray-700" >
        {title}
      </label>
      <div>
        <JoditEditor
          ref={editor}
          className={`${width}`}
          tabIndex={1}
          onChange={onchange}
        />
      </div>
    </div>
  );
};

export default TextEditor;
