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
  // redirect_301: yup.string(),
  // redirect_302: yup.string(),
  // old_redirect_url: yup.string(),
  schema: yup.string().test("is-json", "Schema must be valid JSON", (value) => {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
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
  Banner_image_alt: yup.string().required(),
  Banner_image_text: yup.string().required(),
  Banner_heading: yup.string().required(),
  Banner_button_text: yup.string().required(),
  Banner_description: yup.string().required(),

  section_2_heading: yup.string().required(),
  section_2_cards: yup.array().of(
    yup.object().shape({
      image: yup.mixed().nullable(),
      image_alt: yup.string().required(),
      image_text: yup.string().required(),
      heading: yup.string().required(),
      description: yup.string().required(),
    })
  ),

  section_3_heading: yup.string().required(),
  section_3_description: yup.string().required(),
  section_3_image: yup.mixed().nullable(),
  section_3_image_alt: yup.string().required(),
  section_3_image_text: yup.string().required(),

  section_4_heading: yup.string().required(),
  section_4_cards: yup.array().of(
    yup.object().shape({
      image: yup.mixed().nullable(),
      image_alt: yup.string().required(),
      image_text: yup.string().required(),
      heading: yup.string().required(),
      description: yup.string().required(),
    })
  ),

  section_5_heading: yup.string().required(),
  section_5_description: yup.string().required(),
  section_5_button_text: yup.string().required(),
  section_5_image: yup.mixed().nullable(),
  section_5_image_alt: yup.string().required(),
  section_5_image_text: yup.string().required(),

  Banner_image: yup.mixed().nullable(),
});

const PropertyForm = ({ editData, setStatus, setEditData, fetchData }) => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      section_2_cards: [{}],
      section_4_cards: [{}],
    },
  });

  const { handleSubmit, reset, control, register, formState: { errors }, watch } = methods;
  const section1Cards = useFieldArray({ control, name: "section_1_points" });
  const section2Cards = useFieldArray({ control, name: "section_2_cards" });
  // const section4Cards = useFieldArray({ control, name: "section_4_cards" });
  const section4Cards = useFieldArray({ control, name: "section_4_cards" });

  useEffect(() => {
    if (editData) {
      const formattedData = {
        ...editData,
        schema: editData.schema ? JSON.stringify(editData.schema) : "",
        Banner_image: [],
        section_3_image: [],
        section_5_image: [],
        footer_section_image_file: [],
        section_1_points: Array.isArray(editData?.section_1_points)
          ? editData.section_1_points.map((item) => ({
            existingImage: item.image,
            image_alt: item.image_alt,
            image_text: item.image_text,
            heading: item.heading,
            description: item.description,
          }))
          : [],

        section_2_cards: Array.isArray(editData?.section_2_cards)
          ? editData.section_2_cards.map((item) => ({
            existingImage: item.image,
            image_alt: item.image_alt,
            image_text: item.image_text,
            heading: item.heading,
            description: item.description,
          }))
          : [],

        section_4_cards: Array.isArray(editData?.section_4_cards)
          ? editData.section_4_cards.map((item) => ({
            existingImage: item.image,
            image_alt: item.image_alt,
            image_text: item.image_text,
            heading: item.heading,
            description: item.description,
          }))
          : [],
      };
      reset(formattedData);
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (!["section_1_points", "section_2_cards", "section_4_cards", "Banner_image", "section_5_image", "section_3_image"].includes(key)) {
          formData.append(key, value);
        }
      });

      if (data.Banner_image?.length > 0) formData.append("Banner_image", data.Banner_image[0]);
      if (data.section_3_image?.length > 0) formData.append("section_3_image", data.section_3_image[0]);
      if (data.section_5_image?.length > 0) formData.append("section_5_image", data.section_5_image[0]);

      data.section_1_points.forEach((item, index) => {
        formData.append(`section_1_points[${index}][heading]`, item.heading);
        formData.append(`section_1_points[${index}][description]`, item.description);
        formData.append(`section_1_points[${index}][image_alt]`, item.image_alt);
        formData.append(`section_1_points[${index}][image_text]`, item.image_text);
        if (item.image?.length > 0) {
          formData.append(`section_1_points[${index}][image]`, item.image[0]);
        } else {
          formData.append(
            `section_1_points[${index}][existingImage]`,
            item.existingImage
          );
        }
      });

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
      data.section_2_cards.forEach((item, index) => {
        formData.append(`section_2_cards[${index}][heading]`, item.heading);
        formData.append(`section_2_cards[${index}][description]`, item.description);
        formData.append(`section_2_cards[${index}][image_alt]`, item.image_alt);
        formData.append(`section_2_cards[${index}][image_text]`, item.image_text);
        if (item.image?.length > 0) {
          formData.append(`section_2_cards[${index}][image]`, item.image[0]);
        } else {
          formData.append(
            `section_2_cards[${index}][existingImage]`,
            item.existingImage
          );
        }
      });

      data.section_4_cards.forEach((item, index) => {
        formData.append(`section_4_cards[${index}][heading]`, item.heading);
        formData.append(`section_4_cards[${index}][description]`, item.description);
        formData.append(`section_4_cards[${index}][image_alt]`, item.image_alt);
        formData.append(`section_4_cards[${index}][image_text]`, item.image_text);
        if (item.image?.length > 0) {
          formData.append(`section_4_cards[${index}][image]`, item.image[0]);
        } else {
          formData.append(
            `section_4_cards[${index}][existingImage]`,
            item.existingImage
          );
        }
      });

      const response = await axiosClient.post(`admin/list-your-property/save`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status) {
        Swal.fire({ icon: "success", text: response.data?.message || "Success!" });
        reset();
        fetchData();
        setEditData(null);
        setStatus(1);
      } else {
        Swal.fire({ icon: "error", text: response.data?.message || "Failed!" });
      }
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-3xl mb-4 font-semibold">Property Form</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* SEO Fields */}
          <SEOFields />

          {/* Banner Image */}
          <div className="flex flex-col gap-3">
            <div>Banner Image:</div>
            <input type="file" {...register("Banner_image")} />
            <InputField name="Banner_image_alt" label="Image Alt" />
            <InputField name="Banner_image_text" label="Image Text" />
            <InputField name="Banner_heading" label="Banner Heading" />
            <InputField name="Banner_button_text" label="Banner Button Text" />
            <div className="flex flex-col">
              <QuillField
                control={methods.control}
                name={`Banner_description`}
                label="Description"
                rules={{ required: "Required" }}
              />
              {methods.formState.errors?.Banner_description && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors?.Banner_description.message}
                </span>
              )}
            </div>
          </div>

          {/* Section 1 */}
          <h3 className="text-xl font-semibold">Section 1</h3>

          <InputField name="section_1_heading" label="Section 1 Heading" />
          <InputField name="section_1_form_heading" label="Section 1 Form Heading" />

          {/* Section 1 Cards */}
          {section1Cards.fields.map((item, index) => (
            <div key={item.id} className="border p-3 mb-3 rounded relative">

              <InputField name={`section_1_points[${index}].heading`} label="Card Heading" />
              {/* <InputField name={`section_1_points[${index}].description`} label="Card Description" /> */}
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
              <InputField name={`section_1_points[${index}].image_alt`} label="Image Alt" />
              <InputField name={`section_1_points[${index}].image_text`} label="Image Text" />

              <div>Image:</div>
              <input type="file" {...register(`section_1_points[${index}].image`)} />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => section1Cards.remove(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Add Button */}
          <button
            type="button"
            onClick={() =>
              section1Cards.append({
                heading: "",
                description: "",
                image: null,
                image_alt: "",
                image_text: "",
              })
            }
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Add Card
          </button>


          {/* Section 2 */}
          <h3 className="text-xl font-semibold">Section 2</h3>
          <InputField name="section_2_heading" label="Section 2 Heading" />
          {section2Cards.fields.map((item, index) => (
            <div key={item.id} className="border p-3 mb-3">
              <InputField name={`section_2_cards[${index}].heading`} label="Card Heading" />
              {/* <InputField name={`section_2_cards[${index}].description`} label="Card Description" /> */}
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
              <InputField name={`section_2_cards[${index}].image_alt`} label="Image Alt" />
              <InputField name={`section_2_cards[${index}].image_text`} label="Image Text" />
              <div>Image:</div>
              <input type="file" {...register(`section_2_cards[${index}].image`)} />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => section2Cards.remove(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              section2Cards.append({
                heading: "",
                description: "",
                image: null,
                image_alt: "",
                image_text: "",
              })
            }
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Add Card
          </button>

          {/* Section 3 */}
          <h3 className="text-xl font-semibold">Section 3</h3>
          <InputField name="section_3_heading" label="Section 3 Heading" />
          {/* <InputField name="section_3_description" label="Section 3 Description" /> */}
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
          <InputField name="section_3_image_alt" label="Image Alt" />
          <InputField name="section_3_image_text" label="Image Text" />
          <div>Image:</div>
          <input type="file" {...register("section_3_image")} />

          {/* Section 4 */}
          <h3 className="text-xl font-semibold">Section 4</h3>
          <InputField name="section_4_heading" label="Section 4 Heading" />
          <div className="mb-4">

          </div>

          {section4Cards.fields.map((item, index) => (
            <div key={item.id} className="border p-3 mb-3 relative">
              {/* Remove Button */}
              <button
                type="button"
                className="absolute top-2 right-2 text-red-500"
                onClick={() => section4Cards.remove(index)}
              >
                Remove
              </button>

              <InputField name={`section_4_cards[${index}].heading`} label="Card Heading" />

              <div className="flex flex-col">
                <QuillField
                  control={methods.control}
                  name={`section_4_cards[${index}].description`}
                  label="Description"
                  rules={{ required: "Required" }}
                />
                {methods.formState.errors?.section_4_cards?.[index]?.description && (
                  <span className="text-red-500 text-sm mt-1">
                    {methods.formState.errors?.section_4_cards[index]?.description.message}
                  </span>
                )}
              </div>

              <InputField name={`section_4_cards[${index}].image_alt`} label="Image Alt" />
              <InputField name={`section_4_cards[${index}].image_text`} label="Image Text" />
              <div>Image:</div>
              <input type="file" {...register(`section_4_cards[${index}].image`)} />
            </div>
          ))}

          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            onClick={() => section4Cards.append({ heading: "", description: "", image_alt: "", image_text: "", image: null })}
          >
            Add Card
          </button>


          {/* Section 5 */}
          <h3 className="text-xl font-semibold">Section 5</h3>
          <InputField name="section_5_heading" label="Heading" />
          {/* <InputField name="section_5_description" label="Description" /> */}
          <div className="flex flex-col">
            <QuillField
              control={methods.control}
              name="section_5_description"
              label="Section 5 Description"
              rules={{ required: "Required" }}
            />
            {methods.formState.errors.section_1_description && (
              <span className="text-red-500 text-sm mt-1">
                {methods.formState.errors.section_1_description.message}
              </span>
            )}
          </div>
          <InputField name="section_5_button_text" label="Button Text" />
          <InputField name="section_5_image_alt" label="Image Alt" />
          <InputField name="section_5_image_text" label="Image Text" />
          <div>Image:</div>
          <input type="file" {...register("section_5_image")} />


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
            <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded">Save</button>
          </div>




        </form>
      </FormProvider>
    </div>
  );
};

// InputField Component
const InputField = ({ name, label }) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="mb-3">
      <label className="block mb-1 font-medium">{label}</label>
      <input {...register(name)} className={`w-full p-2 border rounded ${errors[name] ? 'border-red-500' : 'border-gray-300'}`} />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
    </div>
  );
};

export default PropertyForm;
