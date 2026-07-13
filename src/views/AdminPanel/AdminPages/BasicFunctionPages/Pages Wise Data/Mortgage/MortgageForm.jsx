// src/views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/MortgageForm.jsx

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

// Reusable input component
const InputField = ({ name, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col w-full">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        {...register(name)}
        placeholder={label}
        className={`rounded p-3 text-base border ${errors[name] ? "border-red-500" : "border-gray-300"
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

// Validation schema
const schema = yup.object().shape({
  slug: yup.string().required("Slug is required"),
  meta_title: yup.string().required("Meta Title is required"),
  meta_description: yup.string().required("Meta Description is required"),
  canonical_url: yup.string().required("Canonical URL is required"),
  focus_keyword: yup.string().required("Focus Keyword is required"),
  // redirect_301: yup.string().nullable(),
  // redirect_302: yup.string().nullable(),
  // old_redirect_url: yup.string().nullable(),
  schema: yup.string().test("is-json", "Schema must be valid JSON", (value) => {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }),

  Banner_image_alt: yup.string().required("Banner Image Alt is required"),
  Banner_image_text: yup.string().required("Banner Image Text is required"),
  section_1_heading: yup.string().required("Section 1 Heading is required"),
  section_1_description: yup
    .string()
    .required("Section 1 Description is required"),
  section_2_heading: yup.string().required("Section 2 Heading is required"),
  section_3_heading: yup.string().required("Section 3 Heading is required"),
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
  section_4_heading: yup.string().required("Section 4 Heading is required"),
  section_4_description: yup
    .string()
    .required("Section 4 Description is required"),

  // handle arrays separately
  section_1_points: yup.array().of(
    yup.object().shape({
      heading: yup.string().required(),
      description: yup.string().required(),
    })
  ),
  section_2_cards: yup.array().of(
    yup.object().shape({
      heading: yup.string().required(),
      description: yup.string().required(),
    })
  ),
  section_3_points: yup.array().of(
    yup.object().shape({
      heading: yup.string().required(),
      description: yup.string().required(),
      image_alt: yup.string(),
      image_text: yup.string(),
    })
  ),

  Banner_image: yup.mixed().nullable(),
  section_1_image: yup.mixed().nullable(),
  section_3_image: yup.mixed().nullable(),
});

const MortgageForm = ({ editData, fetchData, setEditData, setStatus }) => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      Banner_image: [],
      section_1_points: [{ heading: "", description: "" }],
      section_2_cards: [{ heading: "", description: "" }],
      section_3_points: [
        {
          heading: "",
          description: "",
          image: "",
          image_alt: "",
          image_text: "",
        },
      ],
    },
  });

  const { handleSubmit, reset, control } = methods;

  const section1Points = useFieldArray({ control, name: "section_1_points" });
  const section2Cards = useFieldArray({ control, name: "section_2_cards" });
  const section3Points = useFieldArray({ control, name: "section_3_points" });

  useEffect(() => {
    if (editData) {
      const formattedData = {
        ...editData,
        schema: editData.schema ? JSON.stringify(editData.schema) : "",
        Banner_image: [],
        section_1_image: [],
        section_3_image: [],
        footer_section_image_file: [],
        section_3_points:
          editData.section_3_points?.map((item) => ({
            existingImage: item.image,
            image_alt: item.image_alt,
            image_text: item.image_text,
            heading: item.heading,
            description: item.description,
          })) || [
            {
              existingImage: '',
              image_alt: '',
              image_text: '',
              heading: '',
              description: '',
            }
          ],
      };
      reset(formattedData);
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append simple fields
      Object.entries(data).forEach(([key, value]) => {
        if (
          ![
            "Banner_image",
            "section_1_image",
            "footer_section_image_file",
            "section_3_image",
            "section_1_points",
            "section_2_cards",
            "section_3_points",
            "section_7_options",
          ].includes(key)
        ) {
          formData.append(key, value);
        }
      });

      // Append single image files
      if (data.Banner_image?.[0])
        formData.append("Banner_image", data.Banner_image[0]);
      if (data.section_1_image?.[0])
        formData.append("section_1_image", data.section_1_image[0]);
      if (data.section_3_image?.[0])
        formData.append("section_3_image", data.section_3_image[0]);
      if (data.footer_section_image_file?.[0])
        formData.append("footer_section_image_file", data.footer_section_image_file[0]);
      // Handle section_1_points
      data.section_1_points?.forEach((item, index) => {
        formData.append(`section_1_points[${index}][heading]`, item.heading);
        formData.append(`section_1_points[${index}][description]`, item.description);
        formData.append(`section_1_points[${index}][image_alt]`, item.image_alt);
        formData.append(`section_1_points[${index}][image_text]`, item.image_text);
        if (item.image && item.image.length > 0) {
          formData.append(`section_1_points[${index}][image]`, item.image[0]);
        } else {
          formData.append(`section_1_points[${index}][existingImage]`, item.existingImage);
        }
      });

      // Handle section_2_cards
      data.section_2_cards?.forEach((item, index) => {
        formData.append(`section_2_cards[${index}][heading]`, item.heading);
        formData.append(`section_2_cards[${index}][description]`, item.description);
        formData.append(`section_2_cards[${index}][image_alt]`, item.image_alt);
        formData.append(`section_2_cards[${index}][image_text]`, item.image_text);
        if (item.image && item.image.length > 0) {
          formData.append(`section_2_cards[${index}][image]`, item.image[0]);
        } else {
          formData.append(`section_2_cards[${index}][existingImage]`, item.existingImage);
        }
      });

      // Handle section_3_points
      data.section_3_points?.forEach((item, index) => {
        formData.append(`section_3_points[${index}][heading]`, item.heading);
        formData.append(`section_3_points[${index}][description]`, item.description);
        formData.append(`section_3_points[${index}][image_alt]`, item.image_alt);
        formData.append(`section_3_points[${index}][image_text]`, item.image_text);
        if (item.image && item.image.length > 0) {
          formData.append(`section_3_points[${index}][image]`, item.image[0]);
        } else {
          formData.append(`section_3_points[${index}][existingImage]`, item.existingImage);
        }
      });

      // Handle section_7_options
      data.section_7_options?.forEach((item, index) => {
        formData.append(`section_7_options[${index}][heading]`, item.heading);
        formData.append(`section_7_options[${index}][image_alt]`, item.image_alt);
        formData.append(`section_7_options[${index}][image_text]`, item.image_text);
        if (item.image && item.image.length > 0) {
          formData.append(`section_7_options[${index}][image]`, item.image[0]);
        } else {
          formData.append(`section_7_options[${index}][existingImage]`, item.existingImage);
        }
      });

      // Schema
      formData.append("schema", data.schema || "{}");

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

      // Send request
      const response = await axiosClient.post(`admin/mortgage/save`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status) {
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
          text: typeof response.data?.message === "object"
            ? JSON.stringify(response.data?.message)
            : response.data?.message || "Failed!",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-3xl mb-4 font-semibold">Create Mortgage Page</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <SEOFields />

          <div className="grid grid-cols-2 gap-4">
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
            <InputField name="Banner_heading" label="Banner Heading" />
            <InputField name="Banner_button_text" label="Banner Button Text" />
          </div>

          <InputField name="section_1_heading" label="Section 1 Heading" />
          {/* <InputField
            name="section_1_description"
            label="Section 1 Description"
          /> */}
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
          {/* <input type="file" {...methods.register("section_1_image")} /> */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Section 1 Image File
            </label>
            <input type="file" {...methods.register("section_1_image")} />
            {methods.formState.errors.section_1_image && (
              <span className="text-red-500 text-sm mt-1">
                {methods.formState.errors.section_1_image.message}
              </span>
            )}
          </div>
          <InputField name="section_1_image_alt" label="Section 1 Image Alt" />
          <InputField name="section_1_image_text" label="Section 1 Image Text" />

          <div>
            <h3 className="text-lg font-semibold mb-2">Section 1 Points</h3>
            {section1Points.fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-2 gap-2 items-end mb-2"
              >
                <InputField
                  name={`section_1_points[${index}].heading`}
                  label="Heading"
                />
                {/* <InputField
                  name={`section_1_points[${index}].description`}
                  label="Description"
                /> */}
                <div className="flex flex-col">
                  <QuillField
                    control={methods.control}
                    name={`section_1_points[${index}].description`}
                    label="Description"
                    rules={{ required: "Required" }}
                  />
                  {methods.formState.errors?.section_1_points?.[index]?.description && (
                    <span className="text-red-500 text-sm mt-1">
                      {methods.formState.errors?.section_1_points[index]?.description.message}
                    </span>
                  )}
                </div>
                <div className="col-span-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => section1Points.remove(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    disabled={section1Points.fields.length === 1}
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      section1Points.append({ heading: "", description: "" })
                    }
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>

          <InputField name="section_2_heading" label="Section 2 Heading" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Section 2 Cards</h3>
            {section2Cards.fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-2 gap-2 items-end mb-2"
              >
                <InputField
                  name={`section_2_cards[${index}].heading`}
                  label="Heading"
                />
                {/* <InputField
                  name={`section_2_cards[${index}].description`}
                  label="Description"
                /> */}
                <div className="flex flex-col">
                  <QuillField
                    control={methods.control}
                    name={`section_2_cards[${index}].description`}
                    label="Description"
                    rules={{ required: "Required" }}
                  />
                  {methods.formState.errors?.section_2_cards?.[index]?.description && (
                    <span className="text-red-500 text-sm mt-1">
                      {methods.formState.errors?.section_2_cards[index]?.description.message}
                    </span>
                  )}
                </div>
                <div className="col-span-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => section2Cards.remove(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    disabled={section2Cards.fields.length === 1}
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                section2Cards.append({ heading: "", description: "" })
              }
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Add
            </button>
          </div>

          <InputField name="section_3_heading" label="Section 3 Heading" />
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
          <InputField name="section_3_image_alt" label="Image Alt" />
          <InputField name="section_3_image_text" label="Image Text" />
          <InputField name="section_3_button_text" label="Button Text" />

          <div>
            <h3 className="text-lg font-semibold mb-2">Section 3 Points</h3>
            {section3Points.fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-3 gap-2 items-end mb-2"
              >
                <InputField
                  name={`section_3_points[${index}].heading`}
                  label="Heading"
                />
                {/* <InputField
                  name={`section_3_points[${index}].description`}
                  label="Description"
                /> */}
                <div className="flex flex-col">
                  <QuillField
                    control={methods.control}
                    name={`section_3_points[${index}].description`}
                    label="Description"
                    rules={{ required: "Required" }}
                  />
                  {methods.formState.errors?.section_3_points?.[index]?.description && (
                    <span className="text-red-500 text-sm mt-1">
                      {methods.formState.errors?.section_3_points[index]?.description.message}
                    </span>
                  )}
                </div>
                <InputField
                  name={`section_3_points[${index}].image_alt`}
                  label="Image Alt"
                />
                <InputField
                  name={`section_3_points[${index}].image_text`}
                  label="Image Text"
                />
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Section 3 Image File
                  </label>
                  <input
                    type="file"
                    {...methods.register(`section_3_points[${index}].image`)}
                  />
                  {methods.formState.errors?.section_3_points?.[index]
                    ?.image && (
                      <span className="text-red-500 text-sm mt-1">
                        {
                          methods.formState.errors?.section_3_points[index]?.image
                            .message
                        }
                      </span>
                    )}
                </div>
                <div className="col-span-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => section3Points.remove(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    disabled={section3Points.fields.length === 1}
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      section3Points.append({
                        heading: "",
                        description: "",
                        image_alt: "",
                        image_text: "",
                      })
                    }
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>

          <InputField name="section_4_heading" label="Section 4 Heading" />
          {/* <InputField
            name="section_4_description"
            label="Section 4 Description"
          /> */}
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

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default MortgageForm;
