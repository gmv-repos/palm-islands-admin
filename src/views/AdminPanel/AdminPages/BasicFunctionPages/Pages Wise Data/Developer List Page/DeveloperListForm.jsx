// src/views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/AboutUs Page/DeveloperListForm.jsx

import React, { useEffect } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SEOFields from "../Components/SEOFields";
import BannerFields from "../Components/BannerFields";
import QuillField from "../../../../AdminComponents/Inputs/QuillField";
import axiosClient from "../../../../../../axiosClient";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  slug: yup.string().required("Slug is required"),
  meta_title: yup.string().required("Meta Title is required"),
  meta_description: yup.string().required("Meta Description is required"),
  canonical_url: yup.string().required("Canonical URL is required"),
  focus_keyword: yup.string().required("Focus Keyword is required"),
  schema: yup
    .string()
    .required()
    .test("is-json", "Schema must be valid JSON", (value) => {
      try {
        JSON.parse(value);
        return true;
      } catch (e) {
        return false;
      }
    }),
  // redirect_301: yup.string(),
  // redirect_302: yup.string(), // This maps to Banner_image_alt as per your api key, but keeping key name same as form key

  Banner_image_alt: yup.string().required("Banner Image Alt is required"),
  Banner_image_text: yup.string().required("Banner Image Text is required"),

  section_1_title: yup.string().required("Section 1 Title is required"),
  section_1_description: yup
    .string()
    .required("Section 1 Description is required"),

  section_2_title: yup.string().required("Section 2 Title is required"),
  section_2_description: yup
    .string()
    .required("Section 2 Description is required"),
  section_2_image_alt: yup.string().required("Section 2 Image Alt is required"),
  section_2_image_text: yup
    .string()
    .required("Section 2 Image Text is required"),
  section_2_email: yup
    .string()
    .email("Invalid Email")
    .required("Email is required"),
  section_2_phone: yup
    .string()
    .matches(
      /^\+?[0-9]{10,15}$/,
      "Phone number must be 10 to 15 digits and may start with '+'"
    )
    .required("Phone is required"),


  section_3_title: yup.string().required("Section 3 Title is required"),
  section_3_description: yup
    .string()
    .required("Section 3 Description is required"),
  section_3_image_alt: yup.string().required("Section 3 Image Alt is required"),
  section_3_image_text: yup
    .string()
    .required("Section 3 Image Text is required"),

  section_4_title: yup.string().required("Section 4 Title is required"),
  section_4_description: yup
    .string()
    .required("Section 4 Description is required"),
  section_4_image_alt: yup.string().required("Section 4 Image Alt is required"),
  section_4_image_text: yup
    .string()
    .required("Section 4 Image Text is required"),
  section_5_title: yup
    .string()
    .required("Section 5 Title is required"),
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
  section_1_image: yup.mixed().nullable(),
  section_2_image: yup.mixed().nullable(),
  section_3_image: yup.mixed().nullable(),
  section_4_image: yup.mixed().nullable(),
  Banner_image: yup.mixed().nullable(),
});

const DeveloperListForm = ({ editData, setStatus, setEditData, fetchData }) => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      Banner_image: [],
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (editData) {
      console.log("as", editData);
      const formattedData = {
        ...editData,

        schema: editData.schema ? JSON.stringify(editData.schema) : "",
        section_4_image: [],
        section_3_image: [],
        section_2_image: [],
        Banner_image: [],
      };

      reset(formattedData);
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append normal text fields
      formData.append("slug", data.slug);
      formData.append("meta_title", data.meta_title);
      formData.append("meta_description", data.meta_description);
      formData.append("canonical_url", data.canonical_url);
      formData.append("focus_keyword", data.focus_keyword);
      formData.append("schema", data.schema);
      formData.append("redirect_301", data.redirect_301 || "");
      formData.append("redirect_302", data.redirect_302 || "");
      formData.append("old_redirect_url", data.old_redirect_url || "");

      formData.append("Banner_image_alt", data.Banner_image_alt);
      formData.append("Banner_image_text", data.Banner_image_text);

      formData.append("section_1_title", data.section_1_title);
      formData.append("section_1_description", data.section_1_description);

      formData.append("section_2_title", data.section_2_title);
      formData.append("section_2_description", data.section_2_description);
      formData.append("section_2_image_alt", data.section_2_image_alt);
      formData.append("section_2_image_text", data.section_2_image_text);
      formData.append("section_2_email", data.section_2_email);
      formData.append("section_2_phone", data.section_2_phone);
      // formData.append("section_2_form_heading", data.section_2_form_heading);
      // formData.append("section_2_form_text", data.section_2_form_text);

      formData.append("section_3_title", data.section_3_title);
      formData.append("section_3_description", data.section_3_description);
      formData.append("section_3_image_alt", data.section_3_image_alt);
      formData.append("section_3_image_text", data.section_3_image_text);

      formData.append("section_4_title", data.section_4_title);
      formData.append("section_4_description", data.section_4_description);
      formData.append("section_4_image_alt", data.section_4_image_alt);
      formData.append("section_4_image_text", data.section_4_image_text);

      formData.append("section_5_title", data.section_5_title);
      formData.append("footer_section_title", data.footer_section_title);
      formData.append("footer_section_description", data.footer_section_description);
      formData.append("footer_section_image_alt", data.footer_section_image_alt);
      formData.append("footer_section_image_text", data.footer_section_image_text);
      formData.append("footer_section_btn_1_text", data.footer_section_btn_1_text);
      formData.append("footer_section_btn_1_link", data.footer_section_btn_1_link);
      formData.append("footer_section_btn_2_text", data.footer_section_btn_2_text);
      formData.append("footer_section_btn_2_link", data.footer_section_btn_2_link);

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




      // Append files if exist
      if (data.Banner_image && data.Banner_image[0]) {
        formData.append("Banner_image", data.Banner_image[0]);
      }
      if (data.section_2_image && data.section_2_image[0]) {
        formData.append("section_2_image", data.section_2_image[0]);
      }
      if (data.section_3_image && data.section_3_image[0]) {
        formData.append("section_3_image", data.section_3_image[0]);
      }
      if (data.section_4_image && data.section_4_image[0]) {
        formData.append("section_4_image", data.section_4_image[0]);
      }

      const response = await axiosClient.post(
        `admin/developer-list/save`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status == true) {
        Swal.fire({
          icon: "success",
          text: response.data?.message || "Data submitted successfully!",
        });
        reset();
        fetchData();
        setEditData(null);
        setStatus(1);
      } else {
        Swal.fire({
          icon: "error",
          text: response.data?.message || "Data submission failed",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-3xl mb-4 font-semibold">Developer List Page</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* SEO Fields */}
          <SEOFields />

          <hr />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Banner Image File
              </label>
              <input type="file" {...methods.register("Banner_image")} />
              {methods.formState.errors.Banner_image && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.Banner_image.message}
                </span>
              )}
            </div>
            <InputField name="Banner_image_alt" label="Banner Image Alt" />
            <InputField name="Banner_image_text" label="Banner Image Text" />

            {/* Section 1 */}
            <InputField name="section_1_title" label="Section 1 Title" />
            <div className="flex flex-col">
              <QuillField
                control={methods.control}
                name="section_1_description"
                label="Section 1 Description"
                rules={{ required: "Required" }}
              />
              {methods.formState.errors.section_1_description && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.section_1_description.message}
                </span>
              )}
            </div>

            {/* Section 2 */}
            <InputField name="section_2_title" label="Section 2 Title" />
            <div className="flex flex-col">
              <QuillField
                control={methods.control}
                name="section_2_description"
                label="Section 2 Description"
                rules={{ required: "Required" }}
              />
              {methods.formState.errors.section_2_description && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.section_2_description.message}
                </span>
              )}
            </div>
            {/* <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Section 2 Image File
              </label>
              <input type="file" {...methods.register("section_2_image")} />
              {methods.formState.errors.section_2_image && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.section_2_image.message}
                </span>
              )}
            </div> */}
            {/* <InputField
              name="section_2_image_alt"
              label="Section 2 Image Alt"
            />
            <InputField
              name="section_2_image_text"
              label="Section 2 Image Text"
            /> */}
            <InputField name="section_2_email" label="Section 2 Email" />
            <InputField name="section_2_phone" label="Section 2 Phone" />
            {/* <InputField
              name="section_2_form_heading"
              label="Section 2 Form Heading"
            />
            <InputField
              name="section_2_form_text"
              label="Section 2 Form Text"
            /> */}

            <div></div>

            {/* Section 3 */}
            <InputField name="section_3_title" label="Section 3 Title" />
            <div className="flex flex-col">
              <QuillField
                control={methods.control}
                name="section_3_description"
                label="Section 3 Description"
                rules={{ required: "Required" }}
              />
              {methods.formState.errors.section_3_description && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.section_3_description.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Section 3 Image File
              </label>
              <input type="file" {...methods.register("section_3_image")} />
              {methods.formState.errors.section_3_image && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.section_3_image.message}
                </span>
              )}
            </div>
            <InputField
              name="section_3_image_alt"
              label="Section 3 Image Alt"
            />
            <InputField
              name="section_3_image_text"
              label="Section 3 Image Text"
            />

            {/* Section 4 */}
            <InputField name="section_4_title" label="Section 4 Title" />
            <div className="flex flex-col">
              <QuillField
                control={methods.control}
                name="section_4_description"
                label="Section 4 Description"
                rules={{ required: "Required" }}
              />
              {methods.formState.errors.section_4_description && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.section_4_description.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Section 4 Image File
              </label>
              <input type="file" {...methods.register("section_4_image")} />
              {methods.formState.errors.section_4_image && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.section_4_image.message}
                </span>
              )}
            </div>
            <InputField
              name="section_4_image_alt"
              label="Section 4 Image Alt"
            />
            <InputField
              name="section_4_image_text"
              label="Section 4 Image Text"
            />
          </div>

          <hr />
          <div className="flex flex-col">
            <InputField
              name="section_5_title"
              label="Section 5 Title"
            />
          </div>
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

          <div className="flex justify-end w-full">
            <button
              type="submit"
              className="bg-green-500 text-white px-2 py-1.5 rounded w-fit"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
const InputField = ({ name, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col w-80">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        {...register(name)}
        placeholder={label}
        className={`rounded p-3 text-base border ${errors[name] ? "border-red-500" : "border-gray-300"
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

export default DeveloperListForm;
