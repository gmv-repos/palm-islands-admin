// src/components/common/BannerFields.jsx
import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

const BannerFields = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Banner_image",
  });

  return (
    <div className="mt-8">
      <h3 className="font-semibold mb-3">Banner Images</h3>

      {fields.map((item, index) => (
        <div key={item.id} className="border p-4 rounded mb-4">
          <div className="flex flex-col w-96 mb-3">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Image File
            </label>
            <input
              type="file"
              {...register(`Banner_image[${index}].image_file`)}
            />
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col w-96 mb-3">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Alt
              </label>
              <input
                {...register(`Banner_image[${index}].image_alt`)}
                placeholder="Alt"
                className="rounded p-3 text-base border border-gray-300 outline-none"
              />
            </div>

            <div className="flex flex-col w-96 mb-3">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Text
              </label>
              <input
                {...register(`Banner_image[${index}].image_text`)}
                placeholder="Text"
                className="rounded p-3 text-base border border-gray-300 outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-500 text-white text-sm px-2 py-1.5 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({})}
        className="bg-blue-500 text-white text-sm px-2 py-1.5 rounded"
      >
        Add Banner Image
      </button>
    </div>
  );
};

export default BannerFields;
