// src/views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/ContactUs Page/ContactUsForm.jsx

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
    .required("Schema is required")
    .test("is-json", "Schema must be valid JSON", (value) => {
      try {
        JSON.parse(value);
        return true;
      } catch {
        return false;
      }
    }),
  // redirect_301: yup.string().nullable(),
  //   redirect_302: yup.string().nullable(),
  //   old_redirect_url: yup.string().nullable(),

  section_1_heading: yup.string().required("Section 1 Heading is required"),
  section_1_description: yup
    .string()
    .required("Section 1 Description is required"),

  section_2_heading: yup.string().required("Section 2 Heading is required"),
  section_2_description: yup
    .string()
    .required("Section 2 Description is required"),
  section_2_phone: yup.string().required("Section 2 Phone is required"),
  section_2_website: yup.string().required("Section 2 Website is required"),
  section_2_email: yup.string().required("Section 2 Email is required"),

  section_3_heading: yup.string().required("Section 3 Heading is required"),
  section_3_description: yup
    .string()
    .required("Section 3 Description is required"),
  section_3_image: yup.mixed().nullable(),
  section_3_image_alt: yup.string().required("Section 3 Image Alt is required"),
  section_3_image_text: yup
    .string()
    .required("Section 3 Image Text is required"),

  social_media_links: yup.object().shape({
    twiter: yup.string().url().required("Enter Valid Url"),
    linkdin: yup.string().url().required("Enter Valid Url"),
    facebook: yup.string().url().required("Enter Valid Url"),
    instagram: yup.string().url().required("Enter Valid Url"),
  }),
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
  Banner_image: yup.array().of(
    yup.object().shape({
      image_file: yup.mixed().nullable(),
      image_alt: yup.string().required("Image Alt is required"),
      image_text: yup.string().required("Image Text is required"),
    })
  ),
});

const ContactUsForm = ({ editData, setStatus, setEditData, fetchData }) => {
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      Banner_image: [],
      social_media_links: {
        twiter: "",
        linkdin: "",
        facebook: "",
        instagram: "",
      },
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (editData) {
      const formattedData = {
        ...editData,
        schema: editData.schema ? JSON.stringify(editData.schema) : "",
        Banner_image: (editData?.Banner_image || []).map((item) => ({
          existingImage: item.image,
          image_alt: item.image_alt,
          image_text: item.image_text,
        })),
        footer_section_image_file: null,
        section_3_image: [],
      };

      reset(formattedData);
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // SEO Fields
      formData.append("slug", data.slug);
      formData.append("meta_title", data.meta_title);
      formData.append("meta_description", data.meta_description);
      formData.append("canonical_url", data.canonical_url);
      formData.append("focus_keyword", data.focus_keyword);
      formData.append("schema", data.schema);
      formData.append("redirect_301", data.redirect_301 || "");
      formData.append("redirect_302", data.redirect_302 || "");
      formData.append("old_redirect_url", data.old_redirect_url || "");

      // Section 1
      formData.append("section_1_heading", data.section_1_heading);
      formData.append("section_1_description", data.section_1_description);

      // Section 2
      formData.append("section_2_heading", data.section_2_heading);
      formData.append("section_2_description", data.section_2_description);
      formData.append("section_2_phone", data.section_2_phone);
      formData.append("section_2_website", data.section_2_website);
      formData.append("section_2_email", data.section_2_email);

      // Section 3
      formData.append("section_3_heading", data.section_3_heading);
      formData.append("section_3_description", data.section_3_description);
      formData.append("section_3_image_alt", data.section_3_image_alt);
      formData.append("section_3_image_text", data.section_3_image_text);
      formData.append("footer_section_title", data.footer_section_title);
      formData.append("footer_section_description", data.footer_section_description);
      formData.append("footer_section_image_alt", data.footer_section_image_alt);
      formData.append("footer_section_image_text", data.footer_section_image_text);
      formData.append("footer_section_btn_1_text", data.footer_section_btn_1_text);
      formData.append("footer_section_btn_1_link", data.footer_section_btn_1_link);
      formData.append("footer_section_btn_2_text", data.footer_section_btn_2_text);
      formData.append("footer_section_btn_2_link", data.footer_section_btn_2_link);

      // Append files if exist
      // if (data.footer_section_image_file && data.footer_section_image_file[0]) {
      //   formData.append("footer_section_image_file", data.footer_section_image_file[0]);
      // }
      if (data.footer_section_image_file?.[0]) {
  formData.append("footer_section_image_file", data.footer_section_image_file[0]);
}

      //  else {
      //   formData.append("footer_section_image[existingPath]", data.footer_section_image?.existingPath || "");
      // }
      if (data.section_3_image && data.section_3_image[0]) {
        formData.append("section_3_image", data.section_3_image[0]);
      }

      // Social Media
      formData.append(
        "social_media_links[twiter]",
        data.social_media_links.twiter
      );
      formData.append(
        "social_media_links[linkdin]",
        data.social_media_links.linkdin
      );
      formData.append(
        "social_media_links[instagram]",
        data.social_media_links.instagram
      );
      formData.append(
        "social_media_links[facebook]",
        data.social_media_links.facebook
      );

      // Banner Images
      data.Banner_image.forEach((item, index) => {
        if (item.image_file && item.image_file[0]) {
          formData.append(`Banner_image[${index}][image]`, item.image_file[0]);
        } else {
          formData.append(
            `Banner_image[${index}][existingImage]`,
            item.existingImage
          );
        }
        formData.append(`Banner_image[${index}][image_alt]`, item.image_alt);
        formData.append(`Banner_image[${index}][image_text]`, item.image_text);
      });

      const response = await axiosClient.post(
        `admin/contact_us_page/save`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.status === true) {
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
      <h2 className="text-3xl mb-4 font-semibold">Create Contact Us Page</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <SEOFields />
          <BannerFields control={methods.control} />
          <div className="flex flex-col space-y-6">
            {/* Section 1 */}
            <div className="flex flex-col">
              <InputField name="section_1_heading" label="Section 1 Heading" />
            </div>

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
            <div className="flex flex-col">
              <InputField name="section_2_heading" label="Section 2 Heading" />
            </div>

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

            <div className="flex flex-col">
              <InputField name="section_2_phone" label="Section 2 Phone" />
            </div>

            <div className="flex flex-col">
              <InputField name="section_2_website" label="Section 2 Website" />
            </div>

            <div className="flex flex-col">
              <InputField name="section_2_email" label="Section 2 Email" />
            </div>

            {/* Section 3 */}
            <div className="flex flex-col">
              <InputField name="section_3_heading" label="Section 3 Heading" />
            </div>

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

            {/* Social Media Links */}
            {/* <div className="flex flex-col">
              <InputField
                name="social_media_links.twiter"
                label="Twiter Link"
              />
            </div> */}
            {/* <div className="flex flex-col">
              <InputField
                name="social_media_links.linkdin"
                label="Linkdin Link"
              />
            </div> */}
            <div className="flex flex-col">
              <InputField
                name="social_media_links.facebook"
                label="Tiktok Link"
              />
            </div>
            <div className="flex flex-col">
              <InputField
                name="social_media_links.instagram"
                label="Instagram Link"
              />
            </div>
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

          <button type="submit" className="bg-blue-600 text-white p-3 rounded">
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

const getNestedError = (errors, name) => {
  return name.split(".").reduce((acc, part) => acc?.[part], errors);
};

const InputField = ({ name, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = getNestedError(errors, name);

  return (
    <div className="flex flex-col w-full">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        {...register(name)}
        placeholder={label}
        className={`rounded p-3 text-base border ${error ? "border-red-500" : "border-gray-300"
          }`}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
};

export default ContactUsForm;
