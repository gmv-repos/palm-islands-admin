// src/views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/AboutUs Page/FaqsForm.jsx

import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
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
  // redirect_302: yup.string(),
  // old_redirect_url: yup.string(),
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
  section_1_title: yup.string().required("Section 1 Title is required"),
  section_1_description: yup
    .string()
    .required("Section 1 Description is required"),
  section_2_title: yup.string().required("Section 2 Title is required"),
  section_2_description: yup
    .string()
    .required("Section 2 Description is required"),
  section_3_title: yup.string().required("Section 3 Title is required"),
  section_3_description: yup
    .string()
    .required("Section 3 Description is required"),

  section_1_image_file: yup
    .mixed().nullable(),
  section_1_image_alt: yup.string().required("Section 1 Image Alt is required"),
  section_1_image_text: yup
    .string()
    .required("Section 1 Image Text is required"),

  section_2_image_file: yup
    .mixed()
    .nullable(),
  section_2_image_alt: yup.string().required("Section 2 Image Alt is required"),
  section_2_image_text: yup
    .string()
    .required("Section 2 Image Text is required"),

  section_3_images: yup.array().of(
    yup.object().shape({
      image_file: yup
        .mixed()
        .nullable(),
      image_alt: yup.string().required("Image Alt is required"),
      image_text: yup.string().required("Image Text is required"),
    })
  ),

  Banner_image: yup.array().of(
    yup.object().shape({
      image_file: yup.mixed().nullable(),
      image_alt: yup.string().required("Image Alt is required"),
      image_text: yup.string().required("Image Text is required"),
    })
  ),
});

const FaqsForm = ({ editData, setStatus, setEditData, fetchData }) => {
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
      console.log('as', editData)
      const formattedData = {
        ...editData,

        // Top-level logo (logo_path is a string)
        schema: editData.schema ? JSON.stringify(editData.schema) : "",

        section_3_images: Array.isArray(editData?.section_3_images) && editData.section_3_images.length > 0
          ? editData.section_3_images.map(item => ({
            existingImage: item.image,
            image_alt: item.image_alt,
            image_text: item?.image_text,
          }))
          : [],

        Banner_image: Array.isArray(editData?.Banner_image) && editData.Banner_image.length > 0
          ? editData.Banner_image.map(item => ({
            existingImage: item.image,
            image_alt: item.image_alt,
            image_text: item?.image_text,
          }))
          : [],
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

      formData.append("section_1_title", data.section_1_title);
      formData.append("section_1_description", data.section_1_description);
      formData.append("section_1_image_alt", data.section_1_image_alt);
      formData.append("section_1_image_text", data.section_1_image_text);

      formData.append("section_2_title", data.section_2_title);
      formData.append("section_2_description", data.section_2_description);
      formData.append("section_2_image_alt", data.section_2_image_alt);
      formData.append("section_2_image_text", data.section_2_image_text);

      formData.append("section_3_title", data.section_3_title);
      formData.append("section_3_description", data.section_3_description);
      formData.append("footer_section_title", data.footer_section_title);
      formData.append("footer_section_description", data.footer_section_description);
      formData.append("footer_section_image_alt", data.footer_section_image_alt);
      formData.append("footer_section_image_text", data.footer_section_image_text);
      formData.append("footer_section_btn_1_text", data.footer_section_btn_1_text);
      formData.append("footer_section_btn_1_link", data.footer_section_btn_1_link);
      formData.append("footer_section_btn_2_text", data.footer_section_btn_2_text);
      formData.append("footer_section_btn_2_link", data.footer_section_btn_2_link);

      // Append files if exist
      if (data.footer_section_image_file && data.footer_section_image_file[0]) {
        formData.append("footer_section_image_file", data.footer_section_image_file[0]);
      }

      // Append files if exist
      if (data.section_1_image_file && data.section_1_image_file[0]) {
        formData.append("section_1_image", data.section_1_image_file[0]);
      }

      if (data.section_2_image_file && data.section_2_image_file[0]) {
        formData.append("section_2_image", data.section_2_image_file[0]);
      }

      // Append section_3_images array
      if (
        Array.isArray(data.section_3_images) &&
        data.section_3_images.length > 0
      ) {
        data.section_3_images.forEach((item, index) => {
          if (item.image_file && item.image_file[0]) {
            formData.append(
              `section_3_images[${index}][image]`,
              item.image_file[0]
            );
          } else {
            formData.append(
              `section_3_images[${index}][existingImage]`,
              item.existingImage
            );
          }
          formData.append(
            `section_3_images[${index}][image_alt]`,
            item.image_alt
          );
          formData.append(
            `section_3_images[${index}][image_text]`,
            item.image_text
          );
        });
      }

      // Append Banner_image array
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

      //   console.log("FormData prepared =>", formData);

      // Call your API here using axiosClient
      const response = await axiosClient.post(
        `admin/about-us/save`,
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
      <h2 className="text-3xl mb-4 font-semibold">Create About Us Page</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <SEOFields />
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Section 1 Title */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Section 1 Title
              </label>
              <input
                {...methods.register("section_1_title")}
                className={`rounded p-3 text-base border ${methods.formState.errors.section_1_title
                  ? "border-red-500"
                  : "border-gray-300"
                  } outline-none`}
              />
              {methods.formState.errors.section_1_title && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.section_1_title.message}
                </span>
              )}
            </div>

            {/* Section 1 Description - using Quill */}
            <div className="flex flex-col">
              <QuillField
                control={methods.control}
                name="section_1_description"
                label="Section 1 Description"
                rules={{ required: "Section 1 Description is required" }}
              />
              {methods.formState.errors.section_1_description && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.section_1_description.message}
                </span>
              )}
            </div>

            {/* Section 1 Image Fields */}

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Section 1 Image File
              </label>
              <input
                type="file"
                {...methods.register("section_1_image_file")}
              />
              {methods.formState.errors.section_1_image_file && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.section_1_image_file.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Section 1 Image Alt
              </label>
              <input
                {...methods.register("section_1_image_alt")}
                className="rounded p-3 border border-gray-300 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Section 1 Image Text
              </label>
              <input
                {...methods.register("section_1_image_text")}
                className="rounded p-3 border border-gray-300 outline-none"
              />
            </div>
            <div className="flex gap-4"></div>

            {/* Section 2 Title */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Section 2 Title
              </label>
              <input
                {...methods.register("section_2_title")}
                className={`rounded p-3 text-base border ${methods.formState.errors.section_2_title
                  ? "border-red-500"
                  : "border-gray-300"
                  } outline-none`}
              />
              {methods.formState.errors.section_2_title && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.section_2_title.message}
                </span>
              )}
            </div>

            {/* Section 2 Description - using Quill */}
            <div className="flex flex-col">
              <QuillField
                control={methods.control}
                name="section_2_description"
                label="Section 2 Description"
                rules={{ required: "Section 2 Description is required" }}
              />
              {methods.formState.errors.section_2_description && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.section_2_description.message}
                </span>
              )}
            </div>

            {/* Section 2 Image Fields */}

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Section 2 Image File
              </label>
              <input
                type="file"
                {...methods.register("section_2_image_file")}
              />
              {methods.formState.errors.section_2_image_file && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.section_2_image_file.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Section 2 Image Alt
              </label>
              <input
                {...methods.register("section_2_image_alt")}
                className="rounded p-3 border border-gray-300 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Section 2 Image Text
              </label>
              <input
                {...methods.register("section_2_image_text")}
                className="rounded p-3 border border-gray-300 outline-none"
              />
            </div>
            <div className="flex gap-4"></div>

            {/* Section 3 Title */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Section 3 Title
              </label>
              <input
                {...methods.register("section_3_title")}
                className={`rounded p-3 text-base border ${methods.formState.errors.section_3_title
                  ? "border-red-500"
                  : "border-gray-300"
                  } outline-none`}
              />
              {methods.formState.errors.section_3_title && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.section_3_title.message}
                </span>
              )}
            </div>

            {/* Section 3 Description - using Quill */}
            <div className="flex flex-col">
              <QuillField
                control={methods.control}
                name="section_3_description"
                label="Section 3 Description"
                rules={{ required: "Section 3 Description is required" }}
              />
              {methods.formState.errors.section_3_description && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.section_3_description.message}
                </span>
              )}
            </div>
          </div>

          {/* Section 3 Images Array */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Section 3 Images
            </label>

            {methods.watch("section_3_images", []).map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 mb-4 items-center"
              >
                <div>
                  <input
                    type="file"
                    {...methods.register(
                      `section_3_images.${index}.image_file`
                    )}
                  />
                  {methods.formState.errors.section_1_description && (
                    <span className="text-red-500 text-sm mt-1">
                      {methods.formState.errors.section_1_description.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Image Alt
                  </label>
                  <input
                    {...methods.register(`section_3_images.${index}.image_alt`)}
                    className="rounded p-3 border border-gray-300 outline-none"
                    placeholder="Image Alt"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Image Text
                  </label>
                  <input
                    {...methods.register(
                      `section_3_images.${index}.image_text`
                    )}
                    className="rounded p-3 border border-gray-300 outline-none"
                    placeholder="Image Text"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-1 rounded mt-6"
                    onClick={() => {
                      const currentImages =
                        methods.getValues("section_3_images");
                      const updatedImages = currentImages.filter(
                        (_, i) => i !== index
                      );
                      methods.setValue("section_3_images", updatedImages);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="bg-blue-500 text-white px-3 py-1 rounded w-fit"
              onClick={() => {
                methods.setValue("section_3_images", [
                  ...(methods.getValues("section_3_images") || []),
                  { image_file: null, image_alt: "", image_text: "" },
                ]);
              }}
            >
              Add Image
            </button>
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

          <BannerFields />
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

export default FaqsForm;
