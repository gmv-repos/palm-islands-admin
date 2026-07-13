import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Controller } from 'react-hook-form';

const QuillField = ({ control, name, label, rules }) => (
  <div className="w-full mb4">
    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <ReactQuill
          {...field}
          theme="snow"
          onChange={field.onChange}
          value={field.value || ''}
          className="bg-white"
        />
      )}
    />
  </div>
);


export default QuillField;
