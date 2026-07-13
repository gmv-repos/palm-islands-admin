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
  // old_redirect_url: yup.string(),
  schema: yup.string().required(),

  Banner_image_alt: yup.string().required(),
  Banner_image_text: yup.string().required(),
  Banner_heading: yup.string().required(),
  Banner_button_text: yup.string().required(),
  section_1_heading: yup.string().required(),

  section_2_heading: yup.string().required(),
  section_2_description: yup.string().required(),
  section_2_image_alt: yup.string().required(),
  section_2_image_text: yup.string().required(),
  section_2_button_text: yup.string().required(),
  section_3_heading: yup.string().required(),
  section_3_description: yup.string().required(),
  section_3_image_text: yup.string().required(),
  section_3_image_alt: yup.string().required(),
  section_4_heading: yup.string().required(),
  section_4_description: yup.string().required(),
  section_5_heading: yup.string().required(),
  section_5_description: yup.string().required(),
  section_5_image_alt: yup.string().required(),
  section_5_image_text: yup.string().required(),
  section_5_button_text: yup.string().required(),
  section_7_heading: yup.string().required(),
  section_7_description: yup.string().required(),
  section_10_heading: yup.string().required(),
  section_10_description: yup.string().required(),

  section_2_points: yup.array().of(
    yup.object().shape({
      image: yup.mixed().nullable(),
      image_alt: yup.string().required(),
      image_text: yup.string().required(),
      heading: yup.string().required(),
      description: yup.string().required(),
    })
  ),
  section_4_options: yup.array().of(
    yup.object().shape({
      image: yup.mixed().nullable(),
      image_alt: yup.string().required(),
      image_text: yup.string().required(),
      heading: yup.string().required(),
    })
  ),
  section_6_steps: yup.array().of(
    yup.object().shape({
      heading: yup.string().required(),
      description: yup.string().required(),
    })
  ),
  section_7_options: yup.array().of(
    yup.object().shape({
      image: yup.mixed().nullable(),
      image_alt: yup.string().required(),
      image_text: yup.string().required(),
      heading: yup.string().required(),
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

  Banner_image: yup.mixed().nullable(),
  section_3_image: yup.mixed().nullable(),
  section_5_image: yup.mixed().nullable(),
  section_7_image: yup.mixed().nullable(),
});

const PropertyManagementForm = ({
  editData,
  setStatus,
  setEditData,
  fetchData,
}) => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      section_2_points: [{}],
      section_4_options: [{}],
      section_6_steps: [{}],
      section_7_options: [{}],
    },
  });

  const { handleSubmit, reset, control } = methods;

  const section2Points = useFieldArray({ control, name: "section_2_points" });
  const section4Options = useFieldArray({ control, name: "section_4_options" });
  const section6Steps = useFieldArray({ control, name: "section_6_steps" });
  const section7Options = useFieldArray({ control, name: "section_7_options" });

  useEffect(() => {
    if (editData) {
      const formattedData = {
        ...editData,
        schema: editData.schema ? JSON.stringify(editData.schema) : "",
        Banner_image: [],
        section_2_image: [],
        section_3_image: [],
        section_5_image: [],
        section_7_image: [],
        footer_section_image_file: [],
        section_2_points:
          editData.section_2_points?.map((item) => ({
            existingImage: item.image,
            image_alt: item.image_alt,
            image_text: item.image_text,
            heading: item.heading,
            description: item.description,
          })) || [],
        section_4_options:
          editData.section_4_options?.map((item) => ({
            existingImage: item.image,
            image_alt: item.image_alt,
            image_text: item.image_text,
            heading: item.heading,
          })) || [],
        // section_6_steps: editData.section_6_steps || [],
        section_6_steps: editData.section_6_steps
          ? editData.section_6_steps.map((step) => ({
            heading: step.heading,
            description: step.description || step.content || "",
          }))
          : [],

        section_7_options:
          editData.section_7_options?.map((item) => ({
            existingImage: item.image,
            image_alt: item.image_alt,
            image_text: item.image_text,
            heading: item.heading,
          })) || [],
      };
      reset(formattedData);
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (
          ![
            "section_2_image",
            "section_2_points",
            "section_4_options",
            "section_6_steps",
            "section_7_options",
            "Banner_image",
            "section_3_image",
            "footer_section_image_file",
            "section_5_image",
            "section_7_image",
          ].includes(key)
        ) {
          formData.append(key, value);
        }
      });

      const handleFileField = (fieldName) => {
        if (data[fieldName] && data[fieldName].length > 0) {
          formData.append(fieldName, data[fieldName][0]);
        }
      };

      handleFileField("Banner_image");
      handleFileField("section_2_image");
      handleFileField("section_3_image");
      handleFileField("section_5_image");
      handleFileField("footer_section_image_file");
      handleFileField("section_7_image");

      data.section_2_points?.forEach((item, index) => {
        formData.append(`section_2_points[${index}][heading]`, item.heading);
        formData.append(
          `section_2_points[${index}][description]`,
          item.description
        );
        formData.append(
          `section_2_points[${index}][image_alt]`,
          item.image_alt
        );
        formData.append(
          `section_2_points[${index}][image_text]`,
          item.image_text
        );
        if (item.image && item.image.length > 0) {
          formData.append(`section_2_points[${index}][image]`, item.image[0]);
        } else {
          formData.append(
            `section_2_points[${index}][existingImage]`,
            item.existingImage
          );
        }
      });

      data.section_4_options?.forEach((item, index) => {
        formData.append(`section_4_options[${index}][heading]`, item.heading);
        formData.append(
          `section_4_options[${index}][image_alt]`,
          item.image_alt
        );
        formData.append(
          `section_4_options[${index}][image_text]`,
          item.image_text
        );
        if (item.image && item.image.length > 0) {
          formData.append(`section_4_options[${index}][image]`, item.image[0]);
        } else {
          formData.append(
            `section_4_options[${index}][existingImage]`,
            item.existingImage
          );
        }
      });

      data.section_6_steps?.forEach((item, index) => {
        formData.append(`section_6_steps[${index}][heading]`, item.heading);
        formData.append(
          `section_6_steps[${index}][description]`,
          item.description
        );
      });

      data.section_7_options?.forEach((item, index) => {
        formData.append(`section_7_options[${index}][heading]`, item.heading);
        formData.append(
          `section_7_options[${index}][image_alt]`,
          item.image_alt
        );
        formData.append(
          `section_7_options[${index}][image_text]`,
          item.image_text
        );
        if (item.image && item.image.length > 0) {
          formData.append(`section_7_options[${index}][image]`, item.image[0]);
        } else {
          formData.append(
            `section_7_options[${index}][existingImage]`,
            item.existingImage
          );
        }
      });

      const response = await axiosClient.post(
        `admin/property-management/save`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.status) {
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
          icon: "error", text: typeof response.data?.message === "object"
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

        {/* Banner Section */}
        <h3 className="col-span-2 text-xl font-bold">Banner Section</h3>
        <input type="file" {...methods.register("Banner_image")} />
        <InputField name="Banner_image_alt" label="Image Alt" />
        <InputField name="Banner_image_text" label="Image Text" />
        <InputField name="Banner_heading" label="Banner Heading" />
        <InputField name="Banner_button_text" label="Banner Button Text" />

        <div className="grid col-2 gap-4">
          {/* Section 2 */}
          <h3 className="col-span-2 text-xl font-bold">Section 1</h3>

          {/* Heading */}
          <InputField name="section_1_heading" label="Heading" />
        </div>
        <div className="grid col-2 gap-4">
          {/* Section 2 */}
          <h3 className="col-span-2 text-xl font-bold">Section 2</h3>

          {/* Heading */}
          <InputField name="section_2_heading" label="Heading" />

          {/* Description */}
          <QuillField
            name="section_2_description"
            label="Description"
            control={control}
          />

          <input type="file" {...methods.register("section_2_image")} />

          {/* Image Alt */}
          <InputField name="section_2_image_alt" label="Image Alt" />

          {/* Image Text */}
          <InputField name="section_2_image_text" label="Image Text" />

          {/* Button Text */}
          <InputField name="section_2_button_text" label="Button Text" />

          {/* Section 2 Points */}
          <h3 className="col-span-2 text-xl font-bold mt-6">
            Section 2 Points
          </h3>

          {section2Points.fields.map((item, index) => (
            <div key={item.id} className="border p-3 rounded col-span-2">
              {/* Image File */}
              <div className="flex flex-col mb-3">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input
                  type="file"
                  {...methods.register(`section_2_points[${index}].image`)}
                />
                {methods.formState.errors.section_2_points?.[index]?.image && (
                  <span className="text-red-500 text-sm mt-1">
                    {
                      methods.formState.errors.section_2_points[index].image
                        .message
                    }
                  </span>
                )}
              </div>

              {/* Image Alt */}
              <InputField
                name={`section_2_points[${index}].image_alt`}
                label="Image Alt"
              />

              {/* Image Text */}
              <InputField
                name={`section_2_points[${index}].image_text`}
                label="Image Text"
              />

              {/* Heading */}
              <InputField
                name={`section_2_points[${index}].heading`}
                label="Heading"
              />

              {/* Description */}
              <QuillField
                name={`section_2_points[${index}].description`}
                label="Description"
                control={control}
              />

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => section2Points.remove(index)}
                className="text-red-500 mt-2"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Add Point Button */}
          <button
            type="button"
            onClick={() => section2Points.append({})}
            className="bg-blue-500 w-fit text-white px-4 py-1 rounded"
          >
            Add Point
          </button>

          {/* Section 3 */}
          <h3 className="col-span-2 text-xl font-bold mt-6">Section 3</h3>

          {/* Heading */}
          <InputField name="section_3_heading" label="Section 3 Heading" />

          {/* Description */}
          <QuillField
            name="section_3_description"
            label="Section 3 Description"
            control={control}
          />

          {/* Image Upload */}
          <div className="flex flex-col mb-3">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Image File
            </label>
            <input type="file" {...methods.register("section_3_image")} />
            {methods.formState.errors.section_3_image && (
              <span className="text-red-500 text-sm mt-1">
                {methods.formState.errors.section_3_image.message}
              </span>
            )}
          </div>

          {/* Image Alt */}
          <InputField name="section_3_image_alt" label="Section 3 Image Alt" />

          {/* Image Text */}
          <InputField
            name="section_3_image_text"
            label="Section 3 Image Text"
          />

          {/* Section 4 Heading */}
          <h3 className="col-span-2 text-xl font-bold mt-6">Section 4</h3>

          <InputField name="section_4_heading" label="Section 4 Heading" />

          <QuillField
            name="section_4_description"
            label="Section 4 Description"
            control={control}
          />

          {/* Section 4 Options */}
          <h3 className="col-span-2 text-xl font-bold mt-4">
            Section 4 Options
          </h3>

          {section4Options.fields.map((item, index) => (
            <div key={item.id} className="border p-3 rounded col-span-2">
              {/* Image File Upload */}
              <div className="flex flex-col mb-3">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input
                  type="file"
                  {...methods.register(`section_4_options[${index}].image`)}
                />
                {methods.formState.errors?.section_4_options?.[index]
                  ?.image && (
                    <span className="text-red-500 text-sm mt-1">
                      {
                        methods.formState.errors.section_4_options[index].image
                          .message
                      }
                    </span>
                  )}
              </div>

              {/* Image Alt */}
              <InputField
                name={`section_4_options[${index}].image_alt`}
                label="Image Alt"
              />

              {/* Image Text */}
              <InputField
                name={`section_4_options[${index}].image_text`}
                label="Image Text"
              />

              {/* Heading */}
              <InputField
                name={`section_4_options[${index}].heading`}
                label="Heading"
              />

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => section4Options.remove(index)}
                className="text-red-500 mt-2"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Add Button */}
          <button
            type="button"
            onClick={() => section4Options.append({})}
            className="bg-blue-500 w-fit text-white px-4 py-1 rounded"
          >
            Add Option
          </button>

          {/* Section 5 Heading & Description */}
          <h3 className="col-span-2 text-xl font-bold mt-6">Section 5</h3>

          <InputField name="section_5_heading" label="Section 5 Heading" />
          <QuillField
            name="section_5_description"
            label="Section 5 Description"
            control={control}
          />

          {/* Section 5 Image */}
          <div className="flex flex-col mb-3">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Image File
            </label>
            <input type="file" {...methods.register("section_5_image")} />
            {methods.formState.errors.section_5_image && (
              <span className="text-red-500 text-sm mt-1">
                {methods.formState.errors.section_5_image.message}
              </span>
            )}
          </div>

          {/* Section 5 Image Alt */}
          <InputField name="section_5_image_alt" label="Section 5 Image Alt" />

          {/* Section 5 Image Text */}
          <InputField
            name="section_5_image_text"
            label="Section 5 Image Text"
          />

          {/* Section 5 Button Text */}
          <InputField
            name="section_5_button_text"
            label="Section 5 Button Text"
          />

          {/* Section 6 Steps */}
          <h3 className="col-span-2 text-xl font-bold">Section 6 Steps</h3>
          {section6Steps.fields.map((item, index) => (
            <div key={item.id} className="border p-3 rounded col-span-2">
              <InputField
                name={`section_6_steps[${index}].heading`}
                label="Heading"
              />
              <QuillField
                name={`section_6_steps[${index}].description`}
                label="Description"
                control={control}
              />
              <button
                type="button"
                onClick={() => section6Steps.remove(index)}
                className="text-red-500 mt-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => section6Steps.append({})}
            className="bg-blue-500 w-fit text-white px-4 py-1 rounded"
          >
            Add Step
          </button>

          {/* Section 7 Heading and Description */}
          <h3 className="col-span-2 text-xl font-bold mt-6">Section 7</h3>
          <InputField name="section_7_heading" label="Section 7 Heading" />
          <QuillField
            name="section_7_description"
            label="Section 7 Description"
            control={control}
          />

          {/* Section 7 Image */}
          <div className="flex flex-col mb-3">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Image File
            </label>
            <input type="file" {...methods.register("section_7_image")} />
            {methods.formState.errors.section_7_image && (
              <span className="text-red-500 text-sm mt-1">
                {methods.formState.errors.section_7_image.message}
              </span>
            )}
          </div>

          <InputField name="section_7_image_alt" label="Section 7 Image Alt" />
          <InputField name="section_7_image_text" label="Section 7 Image Text" />


          {/* Section 7 Options */}
          <h3 className="col-span-2 text-lg font-semibold mt-4">
            Section 7 Options
          </h3>
          {section7Options.fields.map((item, index) => (
            <div key={item.id} className="border p-3 rounded col-span-2">
              {/* Image input */}
              <div className="flex flex-col mb-3">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input
                  type="file"
                  {...methods.register(`section_7_options[${index}].image`)}
                />
                {methods.formState.errors.section_7_options?.[index]?.image && (
                  <span className="text-red-500 text-sm mt-1">
                    {
                      methods.formState.errors.section_7_options[index].image
                        .message
                    }
                  </span>
                )}
              </div>

              <InputField
                name={`section_7_options[${index}].image_alt`}
                label="Image Alt"
              />
              <InputField
                name={`section_7_options[${index}].image_text`}
                label="Image Text"
              />
              <InputField
                name={`section_7_options[${index}].heading`}
                label="Heading"
              />

              <button
                type="button"
                onClick={() => section7Options.remove(index)}
                className="text-red-500 mt-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => section7Options.append({})}
            className="bg-blue-500 w-fit text-white px-4 py-1 rounded"
          >
            Add Option
          </button>

          {/* Section 10 Heading */}
          <h3 className="col-span-2 text-xl font-bold mt-6">
            Section 10 Heading
          </h3>
          <InputField name="section_10_heading" label="Section 10 Heading" />
          <QuillField
            name={`section_10_description`}
            label="Description"
            control={control}
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

export default PropertyManagementForm;
