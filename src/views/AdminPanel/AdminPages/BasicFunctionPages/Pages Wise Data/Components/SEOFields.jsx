// src/components/common/SEOFields.jsx
import React from 'react';
import { useFormContext } from 'react-hook-form';

const InputField = ({ name, label }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col w-80">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        {...register(name)}
        placeholder={label}
        className={`rounded p-3 text-base border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } outline-none`}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

const SEOFields = () => {
  return (
    <div className="flex flex-wrap gap-5">
     <InputField name="slug" label="Slug" />
      <InputField name="meta_title" label="Meta Title" />
      <InputField name="meta_description" label="Meta Description" />
      <InputField name="canonical_url" label="Canonical URL" />
      <InputField name="focus_keyword" label="Focus Keyword" />
      <InputField name="schema" label="Schema" />
      <InputField name="redirect_301" label="Redirect 301" />
      <InputField name="redirect_302" label="Redirect 302" />
      <InputField name="old_redirect_url" label="Old Redirect URL" />
    </div>
  );
};

export default SEOFields;
