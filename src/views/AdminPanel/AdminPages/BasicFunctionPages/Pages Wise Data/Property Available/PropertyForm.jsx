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
  slug: yup.string().required("Slug is required"),
  meta_title: yup.string().required("Meta Title is required"),
  meta_description: yup.string().required("Meta Description is required"),
  canonical_url: yup.string().required("Canonical URL is required"),
  focus_keyword: yup.string().required("Focus Keyword is required"),
  // redirect_301: yup.string(),
  // redirect_302: yup.string(),
  // old_redirect_url: yup.string(),
  schema: yup.string().required("Schema is required"),

  Banner_image_alt: yup.string().required("Banner Image Alt is required"),
  Banner_image_text: yup.string().required("Banner Image Text is required"),


  section_1_heading: yup.string().required("Section 1 Heading is required"),
  section_1_description: yup.string().required("Section 1 Description is required"),

  section_2_heading: yup.string().required("Section 2 Heading is required"),
  section_2_description: yup.string().required("Section 2 Description is required"),

  section_2_cards: yup.array().of(
    yup.object().shape({
      image: yup
        .mixed(),
      image_alt: yup.string().required("Image Alt is required"),
      image_text: yup.string().required("Image Text is required"),
      heading: yup.string().required("Heading is required"),
      description: yup.string().required("Description is required"),
    })
  ),

  section_3_heading: yup.string().required("Section 3 Heading is required"),
  section_3_description: yup.string().required("Section 3 Description is required"),

  section_3_images: yup.array().of(
    yup.object().shape({
      image: yup
        .mixed(),
      image_alt: yup.string().required("Image Alt is required"),
      image_text: yup.string().required("Image Text is required"),
    })
  ),

  section_4_heading: yup.string().required("Section 4 Heading is required"),
  section_4_description: yup.string().required("Section 4 Description is required"),

  section_5_heading: yup.string().required("Section 5 Heading is required"),
  section_5_description: yup.string().required("Section 5 Description is required"),
  section_5_image_alt: yup.string().required("Section 5 Image Alt is required"),
  section_5_image_text: yup.string().required("Section 5 Image Text is required"),

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


  Banner_image: yup
    .mixed(),

  section_5_image: yup
    .mixed(),
  section_4_items: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Button Name is required"),
      items: yup.array().of(
        yup.object().shape({
          h: yup.string().required("Heading is required"),
          t1: yup.string().required("Text 1 is required"),
          t2: yup.string().required("Text 2 is required"),
        })
      ),
    })
  ),
});

const PropertyForm = ({ editData, setStatus, setEditData, fetchData }) => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      section_2_cards: [{}],
      section_3_images: [{}],
    },
  });

  const { handleSubmit, reset, control } = methods;

  const section2Cards = useFieldArray({ control, name: "section_2_cards" });
  const section3Images = useFieldArray({ control, name: "section_3_images" });
  const {
    fields: s4Fields,
    append: s4Append,
    remove: s4Remove,
  } = useFieldArray({ control, name: "section_4_items" });

  useEffect(() => {
    if (editData) {
      const formattedData = {
        ...editData,
        schema: editData.schema ? JSON.stringify(editData.schema) : "",
        Banner_image: [],
        // section_5_image: [],
        section_2_cards:
          Array.isArray(editData?.section_2_cards) &&
            editData.section_2_cards.length > 0
            ? editData.section_2_cards.map((item) => ({
              existingImage: item.image,
              image_alt: item.image_alt,
              image_text: item?.image_text,
              description: item?.description,
              heading: item?.heading,
            }))
            : [],
        section_3_images:
          Array.isArray(editData?.section_3_images) &&
            editData.section_3_images.length > 0
            ? editData.section_3_images.map((item) => ({
              existingImage: item.image,
              image_alt: item.image_alt,
              image_text: item?.image_text,
            }))
            : [],
        section_5_image: [],
      };
      reset(formattedData);
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      console.log("dsd", data);
      // Handle normal fields
      Object.entries(data).forEach(([key, value]) => {
        if (
          key !== "section_2_cards" &&
          key !== "section_3_images" &&
          key !== "Banner_image" &&
          key !== "section_5_image" &&
          key !== "footer_section_image_file" &&
          key !== "section_4_items"
        ) {
          formData.append(key, value);
        }
      });

      // Handle Banner_image
      if (data.Banner_image && data.Banner_image.length > 0) {
        formData.append("Banner_image", data.Banner_image[0]);
      }

      // Handle section_5_image
      if (data.section_5_image && data.section_5_image.length > 0) {
        formData.append("section_5_image", data.section_5_image[0]);
      }

      if (data.footer_section_image_file && data.footer_section_image_file.length > 0) {
        formData.append("footer_section_image_file", data.footer_section_image_file[0]);
      }

      // Handle section_2_cards array
      if (data.section_2_cards && Array.isArray(data.section_2_cards)) {
        data.section_2_cards.forEach((item, index) => {
          formData.append(`section_2_cards[${index}][heading]`, item.heading);
          formData.append(
            `section_2_cards[${index}][description]`,
            item.description
          );
          formData.append(
            `section_2_cards[${index}][image_alt]`,
            item.image_alt
          );
          formData.append(
            `section_2_cards[${index}][image_text]`,
            item.image_text
          );
          if (item.image && item.image.length > 0) {
            formData.append(`section_2_cards[${index}][image]`, item.image[0]);
          } else {
            formData.append(
              `section_2_cards[${index}][existingImage]`,
              item.existingImage
            );
          }
        });
      }

      // Handle section_3_images array
      if (data.section_3_images && Array.isArray(data.section_3_images)) {
        data.section_3_images.forEach((item, index) => {
          formData.append(
            `section_3_images[${index}][image_alt]`,
            item.image_alt
          );
          formData.append(
            `section_3_images[${index}][image_text]`,
            item.image_text
          );
          if (item.image && item.image.length > 0) {
            formData.append(`section_3_images[${index}][image]`, item.image[0]);
          } else {
            formData.append(
              `section_3_images[${index}][existingImage]`,
              item.existingImage
            );
          }
        });
      }

      // Handle section_4_items
      if (data.section_4_items && Array.isArray(data.section_4_items)) {
        data.section_4_items.forEach((item, index) => {
          formData.append(`section_4_items[${index}][name]`, item.name);
          if (item.items && Array.isArray(item.items)) {
            item.items.forEach((inner, subIndex) => {
              formData.append(
                `section_4_items[${index}][items][${subIndex}][h]`,
                inner.h
              );
              formData.append(
                `section_4_items[${index}][items][${subIndex}][t1]`,
                inner.t1
              );
              formData.append(
                `section_4_items[${index}][items][${subIndex}][t2]`,
                inner.t2
              );
            });
          }
        });
      }


      const response = await axiosClient.post(
        `admin/property-available/save`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
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
          <h3 className="text-xl font-semibold">SEO Fields</h3>
          <SEOFields />

          <h3 className="text-xl font-semibold">Banner Section</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* <div className="flex flex-col">
              <label>Banner Image</label>
              <input type="file" {...methods.register("Banner_image")} />
            </div> */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Image File
              </label>
              <input type="file" {...methods.register(`Banner_image`)} />
              {methods.formState.errors.Banner_image && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.Banner_image.message}
                </span>
              )}
            </div>
            <InputField name="Banner_image_alt" label="Banner Image Alt" />
            <InputField name="Banner_image_text" label="Banner Image Text" />
          </div>

          <h3 className="text-xl font-semibold">Section 1</h3>
          <InputField name="section_1_heading" label="Section 1 Heading" />
          <QuillField
            name="section_1_description"
            label="Section 1 Description"
            control={control}
          />

          <h3 className="text-xl font-semibold">Section 2</h3>
          <InputField name="section_2_heading" label="Section 2 Heading" />
          <QuillField
            name="section_2_description"
            label="Section 2 Description"
            control={control}
          />

          <h4 className="text-lg font-semibold">Section 2 Cards</h4>
          {section2Cards.fields.map((item, index) => (
            <div key={item.id} className="border p-3 my-3 rounded">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input
                  type="file"
                  {...methods.register(`section_2_cards[${index}].image`)}
                />
                {methods.formState.errors.section_2_cards?.[index]?.image && (
                  <span className="text-red-500 text-sm mt-1">
                    {
                      methods.formState.errors.section_2_cards[index].image
                        .message
                    }
                  </span>
                )}
              </div>

              <InputField
                name={`section_2_cards[${index}].image_alt`}
                label="Image Alt"
              />
              <InputField
                name={`section_2_cards[${index}].image_text`}
                label="Image Text"
              />
              <InputField
                name={`section_2_cards[${index}].heading`}
                label="Heading"
              />
              {/* <InputField name={`section_2_cards[${index}].description`} label="Description" /> */}
              <QuillField
                name={`section_2_cards[${index}].description`}
                label="Description"
                control={control}
              />
              <button
                type="button"
                onClick={() => section2Cards.remove(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => section2Cards.append({})}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Add Card
          </button>

          <h3 className="text-xl font-semibold">Section 3</h3>
          <InputField name="section_3_heading" label="Section 3 Heading" />
          <QuillField
            name="section_3_description"
            label="Section 3 Description"
            control={control}
          />

          <h4 className="text-lg font-semibold">Section 3 Images</h4>
          {section3Images.fields.map((item, index) => (
            <div key={item.id} className="border p-3 my-3 rounded">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input
                  type="file"
                  {...methods.register(`section_3_images[${index}].image`)}
                />
                {methods.formState.errors.section_3_images?.[index]?.image && (
                  <span className="text-red-500 text-sm mt-1">
                    {
                      methods.formState.errors.section_3_images[index].image
                        .message
                    }
                  </span>
                )}
              </div>
              <InputField
                name={`section_3_images[${index}].image_alt`}
                label="Image Alt"
              />
              <InputField
                name={`section_3_images[${index}].image_text`}
                label="Image Text"
              />
              <button
                type="button"
                onClick={() => section3Images.remove(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => section3Images.append({})}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Add Image
          </button>

          <h3 className="text-xl font-semibold">Section 4</h3>
          <InputField name="section_4_heading" label="Section 4 Heading" />
          <QuillField
            name="section_4_description"
            label="Section 4 Description"
            control={control}
          />
          {s4Fields.map((field, index) => (
            <div key={field.id} className="border p-4">
              <InputField
                name={`section_4_items[${index}].name`}
                label="Button Name"
              />
              <S4Items
                nestIndex={index}
                control={control}
                register={methods.register}
              />

              <button
                onClick={() => s4Remove(index)}
                className="text-red-600 underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => s4Append({ name: "", items: [] })}
            className="bg-blue-500 text-white px-2 py-1 rounded w-fit"
          >
            Add Item
          </button>

          <h3 className="text-xl font-semibold">Section 5</h3>
          <InputField name="section_5_heading" label="Section 5 Heading" />
          <QuillField
            name="section_5_description"
            label="Section 5 Description"
            control={control}
          />
          {/* <div className="flex flex-col">
            <label>Section 5 Image</label>
            <input type="file" {...methods.register("section_5_image")} />
          </div> */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Section 5 Image
            </label>
            <input type="file" {...methods.register(`section_5_image`)} />
            {methods.formState.errors.section_5_image && (
              <span className="text-red-500 text-sm mt-1">
                {methods.formState.errors.section_5_image.message}
              </span>
            )}
          </div>
          <InputField name="section_5_image_alt" label="Section 5 Image Alt" />
          <InputField
            name="section_5_image_text"
            label="Section 5 Image Text"
          />

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
              className="bg-green-500 text-white px-6 py-2 rounded"
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
const S4Items = ({ control, nestIndex, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `section_4_items[${nestIndex}].items`,
  });

  return (
    <div className="space-y-4 mt-2">
      {fields.map((item, k) => (
        <div key={item.id} className="border p-3 bg-gray-50 rounded">
          <InputField
            name={`section_4_items[${nestIndex}].items[${k}].h`}
            label="Item Heading"
          />
          <InputField
            name={`section_4_items[${nestIndex}].items[${k}].t1`}
            label="Item T1"
          />
          <InputField
            name={`section_4_items[${nestIndex}].items[${k}].t2`}
            label="Item T2"
          />
          <button
            type="button"
            onClick={() => remove(k)}
            className="text-red-600 underline mt-2"
          >
            Remove Item
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ h: "", t1: "", t2: "" })}
        className="text-blue-600 underline"
      >
        Add Item
      </button>
    </div>
  );
};

export default PropertyForm;
