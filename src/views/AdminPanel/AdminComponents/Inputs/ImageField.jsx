import { useFormContext } from "react-hook-form";

const ImageField = ({ name, label, altName, nameName }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const file = watch(`${name}.file`);

  return (
    <div className="space-y-2">
      <label className="font-medium">{label}</label>
      <input
        type="file"
        onChange={(e) => {
          setValue(`${name}.file`, e.target.files[0]);
        }}
      />
      {file && <p className="text-sm text-gray-500">{file.name}</p>}

      <input
        type="text"
        placeholder="Alt text"
        {...register(altName)}
        className="w-full p-2 border rounded"
      />
      {errors?.[name]?.alt && (
        <p className="text-red-500 text-sm">{errors[name].alt.message}</p>
      )}

      <input
        type="text"
        placeholder="Image name"
        {...register(nameName)}
        className="w-full p-2 border rounded"
      />
      {errors?.[name]?.name && (
        <p className="text-red-500 text-sm">{errors[name].name.message}</p>
      )}
    </div>
  );
};

export default ImageField;
