import { useFieldArray, useFormContext } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";

const FormFieldArray = ({ name, label, renderField }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-lg font-semibold">{label}</label>

      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="relative  p-4 rounded-md space-y-4 bg-gray-50">
          {renderField(field, index)}
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
              <button
          type="button"
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          onClick={() => append({})}
        >
          Add
        </button>
    </div>
  );
};

export default FormFieldArray;
