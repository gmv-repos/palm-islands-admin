import { useFormContext } from 'react-hook-form';

const InputField = ({ name, label }) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="mb-3">
      <label className="block mb-1 font-medium">{label}</label>
      <input {...register(name)} className={`w-full p-2 border rounded ${errors[name] ? 'border-red-500' : 'border-gray-300'}`} />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
    </div>
  );
};


export default InputField;
