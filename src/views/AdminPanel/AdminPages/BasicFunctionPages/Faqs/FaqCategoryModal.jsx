import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});

const FaqCategoryModal = ({
  setIsOpenModal,
  isOpen,
  onClose,
  onSubmit,
  isEdit,
  selectedCategory,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const dropdownRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpenModal]);

  // Populate or clear form on modal open
  useEffect(() => {
    if (isEdit && selectedCategory) {
      reset({ name: selectedCategory.name });
    } else {
      reset({ name: "" });
    }
  }, [isOpen, isEdit, selectedCategory, reset]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data); // Wait for API success
    reset(); // Clear form after success
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 bg-opacity-90">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative" ref={dropdownRef}>
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">
          {isEdit ? "Edit" : "Add"} FAQ Category
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Category Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#5DAABA] text-white rounded"
            >
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FaqCategoryModal;
