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

const schema = yup.object().shape({
  slug: yup.string().required(),
  meta_title: yup.string().required(),
  meta_description: yup.string().required(),
  canonical_url: yup.string().required(),
  focus_keyword: yup.string().required(),
  // redirect_301: yup.string().nullable(),
  // redirect_302: yup.string().nullable(),
  schema: yup.string().required(),

  Banner_image_alt: yup.string().required(),
  Banner_image_text: yup.string().required(),
  Banner_heading: yup.string().required(),

  section_1_heading: yup.string().required(),
  section_1_description_1: yup.string().required(),
  section_1_description_2: yup.string().required(),

  section_1_options: yup.array().of(
    yup.object().shape({
      number: yup.string().required(),
      text: yup.string().required(),
    })
  ),
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



  old_redirect_url: yup.string().nullable(),
  Banner_image: yup.mixed().nullable(),
});

const MortgageCalculatorForm = ({ editData, setStatus, setEditData, fetchData }) => {
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
      footer_section_btn_1_text: "",
      footer_section_btn_1_link: "",
      footer_section_btn_2_text: "",
      footer_section_btn_2_link: "",
      footer_section_image_file: null,
      footer_section_image_alt: "",
      footer_section_image_text: "",
      Banner_image_alt: "",
      Banner_image_text: "",
      Banner_heading: "",
      section_1_heading: "",
      section_1_description_1: "",
      section_1_description_2: "",
      section_1_options: [{ number: "", text: "" }],
      old_redirect_url: "",
      Banner_image: null,
    },
  });

  const { handleSubmit, reset, control } = methods;
  const { fields, append, remove } = useFieldArray({ name: "section_1_options", control });

  useEffect(() => {
    if (editData) {
      const formattedData = {
        ...editData,
        schema: editData.schema ? JSON.stringify(editData.schema) : "",
        Banner_image_existing: editData?.Banner_image,
        footer_section_image_file: editData?.footer_section_image_file,
      };
      reset(formattedData);
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      if (data.Banner_image && data.Banner_image instanceof FileList && data.Banner_image.length > 0) {
        formData.append("Banner_image", data.Banner_image[0]);
      } else if (data.Banner_image_existing) {
        // formData.append("Banner_image", data.Banner_image_existing);
      }

      if (data.footer_section_image_file && data.footer_section_image_file instanceof FileList && data.footer_section_image_file.length > 0) {
        formData.append("footer_section_image_file", data.footer_section_image_file[0]);
      } else if (data.footer_section_image_file) {
        // formData.append("Banner_image", data.Banner_image_existing);
      }

      Object.entries(data).forEach(([key, value]) => {
        if (key !== "Banner_image" && key !== "Banner_image_existing" && key !== "footer_section_image_file") {
          if (key === "section_1_options") {
            value.forEach((item, index) => {
              formData.append(`section_1_options[${index}][number]`, item.number);
              formData.append(`section_1_options[${index}][text]`, item.text);
            });
          } else {
            formData.append(key, value);
          }
        }
      });

      const response = await axiosClient.post(
        `admin/mortgage-calculator/save`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.status) {
        Swal.fire({ icon: "success", text: response.data?.message || "Success!" });
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
      <form onSubmit={methods.handleSubmit(onSubmit)} className="gap-4">
        <SEOFields />

        <h3 className="col-span-2 text-xl font-bold mt-4">Banner Section</h3>
        <input type="file" {...methods.register("Banner_image")} />
        <InputField name="Banner_image_alt" label="Image Alt" />
        <InputField name="Banner_image_text" label="Image Text" />
        <InputField name="Banner_heading" label="Banner Heading" />

        <h3 className="col-span-2 text-xl font-bold mt-6">Section 1</h3>
        <InputField name="section_1_heading" label="Heading" />
        <QuillField name="section_1_description_1" label="Description 1" control={control} />
        <QuillField name="section_1_description_2" label="Description 2" control={control} />

        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Options</h4>
          {fields.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border p-4 rounded">
              <InputField name={`section_1_options.${index}.text`} label="Text" />
              <InputField name={`section_1_options.${index}.number`} label="Number" />
              <div className="col-span-2 text-right">
                <button type="button" onClick={() => remove(index)} className="text-red-600 text-sm">
                  Remove Option
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => append({ number: "", text: "" })} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Option
          </button>
        </div>

        <InputField name="old_redirect_url" label="Old Redirect URL" />

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


        <div className="flex justify-end">
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded mt-6">
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
        className={`rounded p-3 border ${errors[name] ? "border-red-500" : "border-gray-300"}`}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>
      )}
    </div>
  );
};

export default MortgageCalculatorForm;
