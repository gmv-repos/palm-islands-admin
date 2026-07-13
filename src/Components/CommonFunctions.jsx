import React from 'react';
import Swal from 'sweetalert2';

// InputField Component
const InputField = ({ label, name, value, onChange, error, type, loading, required }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium mb-1">{label}</label>
        <input
            type={type}
            className={`border rounded-lg p-2 w-full ${error ? 'border-red-500' : ''}`}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={loading}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
);

// SelectInput Component
const SelectInput = ({ label, name, options, value, onChange, disabled, error, required }) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <select
            className={`border rounded-lg p-2 w-full ${error ? 'border-red-500' : ''}`}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
        >
            <option value="">Select {label}</option>
            {options.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
            ))}
        </select>
        {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
);

// HandleError utility to display error messages
const HandleError = (err) => {
    const errors = err.response?.data?.errors || {};
    const errorMessage = Object.keys(errors)
        .map((field) => `${field}: ${errors[field].join(', ')}`)
        .join('\n');

    Swal.fire({
        title: 'Validation Error',
        text: errorMessage || 'Failed to save the area. Please try again.',
        icon: 'error',
    });
};

// Named exports of both components
export { SelectInput, InputField, HandleError };
