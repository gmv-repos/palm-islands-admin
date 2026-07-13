import React, { useEffect } from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  useFieldArray,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from "../../../../../../axiosClient";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SEOFields from "../Components/SEOFields";
import QuillField from "../../../../AdminComponents/Inputs/QuillField";
// import InputField from "../../../../AdminComponents/Inputs/InputField"; // Assuming you have InputField component

// Validation Schema
const schema = yup.object().shape({
  slug: yup.string().required(),
  meta_title: yup.string().required(),
  meta_description: yup.string().required(),
  canonical_url: yup.string().required(),
  focus_keyword: yup.string().required(),
  // redirect_301: yup.string(),
  // redirect_302: yup.string(),
  schema: yup.string().required(),
  // footer_section_title: yup.string().required("footer section Title is required"),
  // footer_section_description: yup
  //   .string()
  //   .required("footer section Description is required"),
  // footer_section_btn_1_text: yup.string().required("footer section button 1 text"),
  // footer_section_btn_1_link: yup.string().required("footer section button 1 link"),
  // footer_section_btn_2_text: yup.string().required("footer section button 2 text"),
  // footer_section_btn_2_link: yup.string().required("footer section button 2 link"),
  // footer_section_image_file: yup
  //   .mixed().nullable(),
  // footer_section_image_alt: yup.string().required("footer Section Image Alt is required"),
  // footer_section_image_text: yup
  //   .string()
  //   .required("footer section Image Text is required"),
  Banner_image_alt: yup.string().required(),
  Banner_image_name: yup.string().required(),
  Banner_heading: yup.string().required(),
  // Optional, since they're not in your payload
  Banner_image: yup.mixed().nullable(),
});


const FaqSeoForm = ({
  editData,
  setStatus,
  setEditData,
  fetchData,
}) => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      slug: "",
      meta_title: "",
      meta_description: "",
      canonical_url: "",
      focus_keyword: "",
      redirect_301: "",
      redirect_302: "",
      schema: "",
      footer_section_title: "",
      footer_section_description: "", 
      footer_section_image_file: null,
      footer_section_image_alt: "",
      footer_section_image_text: "",
      footer_section_btn_1_text: "",
      footer_section_btn_1_link: "",
      footer_section_btn_2_text: "",
      footer_section_btn_2_link: "",
      Banner_image_alt: "",
      Banner_image_text: "",
      Banner_heading: "",
      Banner_image: null,
    },
  });

  const { handleSubmit, reset, control } = methods;


  useEffect(() => {
    if (editData) {
      const formattedData = {
        ...editData,
        schema: editData.schema ? editData.schema : "",
        Banner_image: [],
        Banner_image_existing: editData?.Banner_image,
      };
      reset(formattedData);
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();


      // Append files if exist
      if (
  data.footer_section_image_file &&
  data.footer_section_image_file.length > 0
) {
  const file = data.footer_section_image_file[0];
  if (file instanceof File || (file && file.type && file.type.startsWith("image/"))) {
    formData.append("footer_section_image_file", file);
  }
}

      // Handle file condition
      if (data.Banner_image?.[0]) {
        formData.append("Banner_image", data.Banner_image[0]); // ✅ append first file manually
      }


      // Handle rest of the fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "footer_section_image_file" && key !== "Banner_image" && key !== "Banner_image_existing" && key !== "updated_at" && key !== "created_at" && key !== "status") {
          formData.append(key, value);
        }
      });

      const response = await axiosClient.post(
        `admin/faqs-pages/save`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success == true) {
        Swal.fire({
          icon: "success",
          text: response.data?.message || "Success!",
        });
        reset();
        fetchData();
        setEditData(null);
        setStatus(1);
      } else {
        Swal.fire({
          icon: "error",
          text:
            typeof response.data?.message === "object"
              ? JSON.stringify(response.data?.message)
              : response.data?.message || "Failed!",
        });
      }
    } catch (error) {
      console.error("Submit Error:", error);
      Swal.fire({ icon: "error", text: error?.message || "Failed!" });
    }
  };


  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className=" gap-4">
        <SEOFields />

        <hr />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Footer Section Title
            </label>
            <input
              {...methods.register("footer_section_title")}
              placeholder="footer section title"
              className={`rounded p-3 text-base border ${methods.formState.errors.footer_section_title
                ? "border-red-500"
                : "border-gray-300"
                } outline-none`}
            />
            {methods.formState.errors.footer_section_title && (
              <span className="text-red-500 text-sm mt-1">
                {methods.formState.errors.footer_section_title.message}
              </span>
            )}
          </div>

          {/* Section 1 Description - using Quill */}
          <div className="flex flex-col">
            <QuillField
              control={methods.control}
              name="footer_section_description"
              label="footer Section Description"
              rules={{ required: "footer section Description is required" }}
            />
            {methods.formState.errors.footer_section_description && (
              <span className="text-red-500 text-sm mt-1">
                {methods.formState.errors.footer_section_description.message}
              </span>
            )}
          </div>

          {/* Footer Section Image Fields */}

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              footer section Image File
            </label>
            <input
              type="file"
              {...methods.register("footer_section_image_file")}
            />
            {methods.formState.errors.footer_section_image_file && (
              <span className="text-red-500 text-sm mt-1">
                {methods.formState.errors.footer_section_image_file.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              footer section Image Alt
            </label>
            <input
              placeholder="footer section image alt"
              {...methods.register("footer_section_image_alt")}
              className="rounded p-3 border border-gray-300 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              footer Section Image Text
            </label>
            <input
              placeholder="footer section img text"
              {...methods.register("footer_section_image_text")}
              className="rounded p-3 border border-gray-300 outline-none"
            />
          </div>

          {/* Footer Section Button Feilds */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              footer Btn 1 Text
            </label>
            <input
              placeholder="footer Btn 1 text"
              {...methods.register("footer_section_btn_1_text")}
              className="rounded p-3 border border-gray-300 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              footer Btn 1 link
            </label>
            <input
              placeholder="footer Btn 1 link"
              {...methods.register("footer_section_btn_1_link")}
              className="rounded p-3 border border-gray-300 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              footer Btn 2 Text
            </label>
            <input
              {...methods.register("footer_section_btn_2_text")}
              placeholder="footer Btn 2 text"
              className="rounded p-3 border border-gray-300 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              footer Btn 2 link
            </label>
            <input
              {...methods.register("footer_section_btn_2_link")}
              placeholder="footer Btn 2 link"
              className="rounded p-3 border border-gray-300 outline-none"
            />
          </div>

        </div>

        <hr />

        {/* Banner Section */}
        <h3 className="col-span-2 text-xl font-bold mt-4">Banner Section</h3>
        <input type="file" {...methods.register("Banner_image")} />
        <InputField name="Banner_image_alt" label="Image Alt" />
        <InputField name="Banner_image_name" label="Image Text" />
        <InputField name="Banner_heading" label="Banner Heading" />


        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded mt-2"
          >
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

const InputField = ({ name, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        {...register(name)}
        className={`rounded p-3 border ${errors[name] ? "border-red-500" : "border-gray-300"
          }`}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export default FaqSeoForm;
