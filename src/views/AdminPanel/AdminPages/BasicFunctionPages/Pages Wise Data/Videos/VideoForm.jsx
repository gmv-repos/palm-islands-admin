import React, { useEffect } from "react";
import { useForm, FormProvider, useFormContext, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SEOFields from "../Components/SEOFields";
import axiosClient from "../../../../../../axiosClient";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import QuillField from "../../../../AdminComponents/Inputs/QuillField";


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
  Banner_image_alt: yup.string().required("Banner Image Alt is required"),
  Banner_image_text: yup.string().required("Banner Image Text is required"),
  Banner_image: yup.mixed().nullable(),
  Banner_heading: yup.string().required("Banner Heading is required"),
  main_heading: yup.string().required("Main Heading is required"),
  video: yup.array().of(
    yup.object().shape({
      url: yup.string().required("Video Url is required"),
      title: yup.string().required("Video Title is required"),
    })
  ),
});

const VideoForm = ({ editData, setStatus, setEditData, fetchData }) => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { Banner_image: [], video: [] },
  });

  const { handleSubmit, reset, register, watch, formState: { errors }, control, setValue, getValues } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "video" });

  useEffect(() => {
    if (editData) {
      const formattedData = {
        ...editData,
        schema: editData.schema ? JSON.stringify(editData.schema) : "",
        Banner_image: [],
        video: editData.video || [],
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
      formData.append("main_heading", data.main_heading);
      formData.append("Banner_heading", data.Banner_heading || "");
      formData.append("Banner_image_alt", data.Banner_image_alt || "");
      formData.append("Banner_image_text", data.Banner_image_text || "");
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


      if (data.Banner_image && data.Banner_image.length > 0) {
        formData.append("Banner_image", data.Banner_image[0]);
      }

      if (Array.isArray(data.video) && data.video.length > 0) {
        data.video.forEach((item, index) => {
          formData.append(`video[${index}][url]`, item.url);
          formData.append(`video[${index}][title]`, item.title);
        });
      }

      const response = await axiosClient.post(`admin/video/save`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status === true) {
        Swal.fire({ icon: "success", text: response.data?.message || "Data submitted successfully!" });
        reset();
        fetchData();
        setEditData(null);
        setStatus(1);
      } else {
        Swal.fire({ icon: "error", text: response.data?.message || "Data submission failed" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-3xl mb-4 font-semibold">Create Video Page</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <SEOFields />
          <hr />

   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
            <InputField name="footer_section_title" label="Footer Section Title" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <h3 className="col-span-2 text-xl font-bold">Banner Section</h3>

            {/* Banner Image with validation */}
            <div className="flex flex-col w-full">
              <label className="mb-1 text-sm font-medium text-gray-700">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("Banner_image")}
                className={`rounded p-3 text-base border ${errors.Banner_image ? "border-red-500" : "border-gray-300"} outline-none`}
              />
              {errors.Banner_image && (
                <span className="text-red-500 text-sm mt-1">{errors.Banner_image.message}</span>
              )}
            </div>

            <InputField name="Banner_image_alt" label="Image Alt" />
            <InputField name="Banner_image_text" label="Image Text" />
            <InputField name="Banner_heading" label="Banner Heading" />
            <InputField name="main_heading" label="Main Heading" />

  {/* <hr /> */}

       

          {/* <hr /> */}

            {/* Videos */}
            <div className="col-span-2 flex flex-col">
              <h3 className="text-lg font-semibold mb-2">Videos</h3>

              {fields.map((item, index) => (
                <div key={item.id} className="border p-4 rounded mb-4">

                  <div className="flex flex-col mb-3">
                    <label className="mb-1 text-sm font-medium text-gray-700">Video URL</label>
                    <input
                      {...register(`video.${index}.url`)}
                      className={`rounded p-3 border ${errors.video?.[index]?.url ? "border-red-500" : "border-gray-300"} outline-none`}
                      placeholder="Video Url"
                    />
                    {errors.video?.[index]?.url && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.video[index].url.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col mb-3">
                    <label className="mb-1 text-sm font-medium text-gray-700">Video Title</label>
                    <input
                      {...register(`video.${index}.title`)}
                      className={`rounded p-3 border ${errors.video?.[index]?.title ? "border-red-500" : "border-gray-300"} outline-none`}
                      placeholder="Video Title"
                    />
                    {errors.video?.[index]?.title && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.video[index].title.message}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))}

              <button
                type="button"
                onClick={() => append({ url: "", title: "" })}
                className="bg-blue-500 text-white px-3 py-1 rounded w-fit"
              >
                Add Video
              </button>
            </div>

          </div>

          <hr />

          <div className="flex justify-end w-full">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>

        </form>
      </FormProvider>
    </div>
  );
};

const InputField = ({ name, label }) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        {...register(name)}
        className={`rounded p-3 border ${errors[name] ? "border-red-500" : "border-gray-300"}`}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>
      )}
    </div>
  );
};

export default VideoForm;
