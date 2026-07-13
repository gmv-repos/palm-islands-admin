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
  banner_image_url: yup
    .mixed()
    .nullable()
    .test("fileType", "Invalid file type", (value) => {
      if (!value || !value[0]) return true;
      return ["image/jpeg", "image/png", "image/webp"].includes(value[0].type);
    }),
});

const GuidePageSeoForm = ({ editData, setStatus, setEditData, fetchData }) => {
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      slug: "",
      meta_title: "",
      meta_description: "",
      canonical_url: "",
      focus_keyword: "",
      schema: "",
      redirect_301: "",
      redirect_302: "",
      old_redirect_url: "",
      banner_image_url: null,
    },
  });

  const { handleSubmit, reset, register, formState: { errors } } = methods;

  useEffect(() => {
    if (editData) {
      const formattedData = {
        ...editData,
        schema: editData.schema ? JSON.stringify(editData.schema) : "",
      };
      reset(formattedData);
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("slug", data.slug);
      formData.append("meta_title", data.meta_title);
      formData.append("meta_description", data.meta_description);
      formData.append("canonical_url", data.canonical_url);
      formData.append("focus_keyword", data.focus_keyword);
      formData.append("schema", JSON.stringify(JSON.parse(data.schema)));
      formData.append("redirect_301", data.redirect_301 || "");
      formData.append("redirect_302", data.redirect_302 || "");
      formData.append("old_redirect_url", data.old_redirect_url || "");

      if (data.banner_image_url && data.banner_image_url[0]) {
        formData.append("banner_image_url", data.banner_image_url[0]);
      }

      const response = await axiosClient.post(`admin/guid-page/save`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success === true) {
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
            {/* Banner Image Upload */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Banner Image File
              </label>
              <input
                type="file"
                {...register("banner_image_url")}
              />
              {errors.banner_image_url && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.banner_image_url.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end w-full">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default GuidePageSeoForm;
