import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import QuillField from "../../../AdminComponents/Inputs/QuillField";
import Swal from "sweetalert2";
import axiosClient from "../../../../../axiosClient";
import DropdownMenu from "../../../AdminComponents/Inputs/DropdownMenu";
import { useLocation, useNavigate } from "react-router-dom";

// Pages array
// const pages = [
//   { name: "Contact Us", id: "1" },
//   { name: "Developer List", id: "2" },
//   { name: "List Your Property", id: "3" },
//   { name: "FAQ Page", id: "4" },
//   { name: "Property Management", id: "5" },
//   { name: "Property Available", id: "6" },
// ];

  const pages = [
  { name: "Contact Us", id: "1" },
  { name: "Palm Jumeirah", id: "16" },
  { name: "Palm Jebel Ali", id: "7" },
  { name: "Dubai Island", id: "11" },
  { name: "Developer List", id: "5" },
  { name: "List You Property", id: "6" },
  { name: "FAQ Page", id: "2" },
  { name: "Property Management", id: "8" },
  { name: "Property Available", id: "9" }
];

// Example categories array (you should replace it with real data)
// const categories = [
//   { name: "General", id: "1" },
//   { name: "Buying", id: "2" },
//   { name: "Selling", id: "3" },
// ];

const schema = yup.object().shape({
  category_id: yup.string().nullable(),
  page_id: yup.string().required("Page selection is required"),
  faqs: yup.array().of(
    yup.object().shape({
      question: yup.string().required("Question is required"),
      answer: yup.string().required("Answer is required"),
    })
  ),
});

const CreateFaqs = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      page_id: "",
      category_id: "",
      faqs: [],
    },
  });

  const { fields: faqs, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });

  // Get page and category controllers
  const { field: pageField } = useController({ control, name: "page_id" });
  const { field: categoryField } = useController({ control, name: "category_id" });

  const [categories, setCategories] = useState([])
    const location = useLocation();
    const editData = location?.state?.data;
      const navigate = useNavigate();

useEffect(() => {
  if (editData) {
    const formattedData = {
      category_id: editData.category_id ? String(editData.category_id) : "",
      page_id: editData.page_id ? String(editData.page_id) : "", // Convert to string
      faqs: Array.isArray(editData.faqs) && editData.faqs.length > 0
        ? editData.faqs.map((faq) => ({
            question: faq.question || "",
            answer: faq.answer || "",
          }))
        : [
            {
              question: editData.question || "",
              answer: editData.answer || "",
            },
          ],
    };
    reset(formattedData);
  }
}, [editData, reset]);


    const fetchCategory = async () => {
      // setLoading(true);
      try {
        const token = localStorage.getItem("ACCESS_TOKEN");
        if (!token) return alert("No access token found");
        const res = await axiosClient.post("/admin/faqs-category");
        const formattedData = res.data.data.filter(item => item.status == 1).map((item, index) => ({
          id: item.id,
          name: item.name,
          status: item.status,
        }));
        setCategories(formattedData);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      fetchCategory();
    }, [])
    
  // const onSubmit = async (data) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("page_id", data.page_id);
  //     if (data.category_id) formData.append("category_id", data.category_id);

  //     data.faqs?.forEach((faq, index) => {
  //       formData.append(`faqs[${index}][question]`, faq.question);
  //       formData.append(`faqs[${index}][answer]`, faq.answer);
  //     });

  //     const res = await axiosClient.post("/admin/faqs/store", formData);
  //     if (res.data.success) {
  //       Swal.fire({ icon: "success", text: res.data?.message || "Data submitted successfully!" });
  //       reset();
  //     } else {
  //       Swal.fire({ icon: "error", text: res.data?.message || "Data submission failed" });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: error?.response?.data?.message || "Something went wrong",
  //     });
  //   }
  const onSubmit = async (data) => {
  try {
    const formData = new FormData();
    formData.append("page_id", data.page_id);
    if (data.category_id) formData.append("category_id", data.category_id);

    data.faqs?.forEach((faq, index) => {
      formData.append(`faqs[${index}][question]`, faq.question);
      formData.append(`faqs[${index}][answer]`, faq.answer);
    });

    const url = editData
      ? `/admin/faqs/${editData.id}/update`
      : "/admin/faqs/store";

    const res = await axiosClient.post(url, formData);

    if (res.data.success) {
      Swal.fire({
        icon: "success",
        text: res.data?.message || "Data submitted successfully!",
      });
      reset();
      navigate('/admin/faqs-list')
    } else {
      Swal.fire({
        icon: "error",
        text: res.data?.message || "Data submission failed",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: error?.response?.data?.message || "Something went wrong",
    });
  }
};

  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
        <div className="flex justify-between gap-4">
      {/* Page Dropdown */}
      <div className="flex flex-col w-1/2">
        <label className="mb-1 font-medium text-sm text-gray-700">
          Select Page <span className="text-red-500">*</span>
        </label>
        {/* <DropdownMenu
          label="Select Page"
          // value={pageField.id}
          value={pages.find(p => p.id === pageField.value) || null}

          onChange={(val) => pageField.onChange(val.id)}
          innerBtns={pages}
        /> */}
        {/* <DropdownMenu
  label="Select Page"
  value={pages.find(p => p.id == String(pageField.value)) || null}
  onChange={(val) => pageField.onChange(val.id)}
  innerBtns={pages}
/> */}
 <select
    {...pageField}
    className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none"
  >
    <option value="">-- Select Page --</option>
    {pages.map((p) => (
      <option key={p.id} value={p.id}>
        {p.name}
      </option>
    ))}
  </select>

        {errors.page_id && <p className="text-red-500 text-sm mt-1">{errors.page_id.message}</p>}
      </div>

{pageField.value == 7 && (
    <>
      {/* Category Dropdown */}
      <div className="flex flex-col w-1/2">
        <label className="mb-1 font-medium text-sm text-gray-700">
          Select FAQs Category
        </label>
        {/* <DropdownMenu
          label="Select Category"
          value={categoryField.value}
          onChange={(val) => categoryField.onChange(val.id)}
          innerBtns={categories}
        /> */}
            <select
      {...categoryField}
      className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none"
    >
      <option value="">-- Select Category --</option>
      {categories.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
        {errors.category_id && (
          <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>
        )}
      </div>
      </>
      )}

      </div>

      {/* FAQs List */}
      <h2 className="text-xl font-bold mt-6 mb-4">FAQs</h2>
      {faqs.map((item, index) => (
        <div key={item.id} className="flex flex-col gap-2 mb-6">
          <label className="text-sm font-medium text-gray-700">
            Question {index + 1} 
          </label>
          <input
            {...register(`faqs.${index}.question`)}
            placeholder="Question"
            className={`rounded p-3 text-base border outline-none w-full ${
              errors?.faqs?.[index]?.question ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors?.faqs?.[index]?.question && (
            <span className="text-red-500 text-sm mt-1">
              {errors.faqs[index].question.message}
            </span>
          )}

          <QuillField
            control={control}
            name={`faqs.${index}.answer`}
            label={`Answer ${index + 1}`}
            rules={{ required: "Answer is required" }}
          />

          {errors?.faqs?.[index]?.answer && (
            <span className="text-red-500 text-sm mt-1">
              {errors.faqs[index].answer.message}
            </span>
          )}

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 font-bold w-fit mt-2"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ question: "", answer: "" })}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add FAQ
      </button>

      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateFaqs;
