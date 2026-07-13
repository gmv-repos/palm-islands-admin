import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import QuillField from "../../../AdminComponents/Inputs/QuillField";
import * as yup from "yup";
import axios from "../../../../../Utils/axios";
import Swal from "sweetalert2";
import axiosClient from "../../../../../axiosClient";

const schema = yup.object().shape({
  name: yup.string().required(),
  slug: yup.string().required(),
  meta_title: yup.string().required(),
  meta_description: yup.string().required(),
  canonical_url: yup.string().required(),
  focus_keyword: yup.string().required(),
  // redirect_301: yup.string(),
  // redirect_302: yup.string(),
  // old_redirect_url: yup.string(),
  description: yup.string().required(),
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
  email: yup.string().email().required(),
  phone_no: yup
    .string()
    .matches(
      /^\+?[0-9]{10,15}$/,
      "Phone number must be 10 to 15 digits and may start with '+'"
    )
    .required(),
  location: yup.string().required(),
  main_image: yup.object().shape({
    alt: yup.string().required(),
    name: yup.string().required(),
    file: yup
      .mixed()
      .required("Main image file is required")
      .test("fileExists", "Please upload a file", (value) => {
        return value && value.length > 0;
      })
      .test("fileType", "Unsupported File Format", (value) => {
        return (
          value &&
          value.length > 0 &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value[0]?.type
          )
        );
      })
      .test("fileSize", "File is too large (max 5MB)", (value) => {
        return value && value[0]?.size <= 5 * 1024 * 1024;
      }),
  }),
  s1_heading: yup.string().required(),
  s1_description: yup.string().required(),
  s1_text: yup.string().required(),
  s2_heading: yup.string().required(),
  s2_description: yup.string().required(),
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


  s2_image: yup.object().shape({
    alt: yup.string().required(),
    name: yup.string().required(),
    file: yup
      .mixed()
      .required("Main image file is required")
      .test("fileExists", "Please upload a file", (value) => {
        return value && value.length > 0;
      })
      .test("fileType", "Unsupported File Format", (value) => {
        return (
          value &&
          value.length > 0 &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value[0]?.type
          )
        );
      })
      .test("fileSize", "File is too large (max 5MB)", (value) => {
        return value && value[0]?.size <= 5 * 1024 * 1024;
      }),
  }),
  s2_images: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      alt: yup.string().required(),
      file: yup
        .mixed()
        .required("Main image file is required")
        .test("fileExists", "Please upload a file", (value) => {
          return value && value.length > 0;
        })
        .test("fileType", "Unsupported File Format", (value) => {
          return (
            value &&
            value.length > 0 &&
            ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
              value[0]?.type
            )
          );
        })
        .test("fileSize", "File is too large (max 5MB)", (value) => {
          return value && value[0]?.size <= 5 * 1024 * 1024;
        }),
    })
  ),
  s3_heading: yup.string().required(),

  s4_heading: yup.string().required(),
  s4_image: yup.object().shape({
    alt: yup.string().required(),
    name: yup.string().required(),
    file: yup
      .mixed()
      .required("Main image file is required")
      .test("fileExists", "Please upload a file", (value) => {
        return value && value.length > 0;
      })
      .test("fileType", "Unsupported File Format", (value) => {
        return (
          value &&
          value.length > 0 &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value[0]?.type
          )
        );
      })
      .test("fileSize", "File is too large (max 5MB)", (value) => {
        return value && value[0]?.size <= 5 * 1024 * 1024;
      }),
  }),
  s4_items: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      text: yup.string().required(),
      alt: yup.string().required(),
      alt_name: yup.string().required(),
      file: yup
        .mixed()
        .required("Main image file is required")
        .test("fileExists", "Please upload a file", (value) => {
          return value && value.length > 0;
        })
        .test("fileType", "Unsupported File Format", (value) => {
          return (
            value &&
            value.length > 0 &&
            ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
              value[0]?.type
            )
          );
        })
        .test("fileSize", "File is too large (max 5MB)", (value) => {
          return value && value[0]?.size <= 5 * 1024 * 1024;
        }),
    })
  ),
  s5_heading: yup.string().required(),
  s5_sub_heading: yup.string().required(),
  s5_items: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      alt: yup.string().required(),
      alt_name: yup.string().required(),
      text: yup.string().required(),
      file: yup
        .mixed()
        .required("Main image file is required")
        .test("fileExists", "Please upload a file", (value) => {
          return value && value.length > 0;
        })
        .test("fileType", "Unsupported File Format", (value) => {
          return (
            value &&
            value.length > 0 &&
            ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
              value[0]?.type
            )
          );
        })
        .test("fileSize", "File is too large (max 5MB)", (value) => {
          return value && value[0]?.size <= 5 * 1024 * 1024;
        }),
    })
  ),
  s6_heading: yup.string().required(),
  s6_content: yup.string().required(),
  s6_email: yup.string().required(),
  s6_phone: yup.string().required(),

  s7_heading: yup.string().required(),
  s7_description: yup.string().required(),
  s7_image: yup.object().shape({
    alt: yup.string().required(),
    name: yup.string().required(),
    file: yup
      .mixed()
      .required("Main image file is required")
      .test("fileExists", "Please upload a file", (value) => {
        return value && value.length > 0;
      })
      .test("fileType", "Unsupported File Format", (value) => {
        return (
          value &&
          value.length > 0 &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value[0]?.type
          )
        );
      })
      .test("fileSize", "File is too large (max 5MB)", (value) => {
        return value && value[0]?.size <= 5 * 1024 * 1024;
      }),
  }),
  s8_heading: yup.string().required(),
  s8_description: yup.string().required(),
  s8_items: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      alt: yup.string().required(),
      alt_name: yup.string().required(),
      text: yup.string().required(),
      file: yup
        .mixed()
        .required("Main image file is required")
        .test("fileExists", "Please upload a file", (value) => {
          return value && value.length > 0;
        })
        .test("fileType", "Unsupported File Format", (value) => {
          return (
            value &&
            value.length > 0 &&
            ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
              value[0]?.type
            )
          );
        })
        .test("fileSize", "File is too large (max 5MB)", (value) => {
          return value && value[0]?.size <= 5 * 1024 * 1024;
        }),
    })
  ),
  s9_faqs: yup.array().of(
    yup.object().shape({
      question: yup.string().required(),
      ans: yup.string().required(),
    })
  ),
  logo: yup
    .mixed()
    .required("Main image file is required")
    .test("fileExists", "Please upload a file", (value) => {
      return value && value.length > 0;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      return (
        value &&
        value.length > 0 &&
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          value[0]?.type
        )
      );
    })
    .test("fileSize", "File is too large (max 5MB)", (value) => {
      return value && value[0]?.size <= 5 * 1024 * 1024;
    }),
});

const CreateDeveloper = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const {
    fields: s2Images,
    append: appendS2Image,
    remove: removeS2Image,
  } = useFieldArray({ control, name: "s2_images" });
  const {
    fields: s4Items,
    append: appendS4Items,
    remove: removeS4Items,
  } = useFieldArray({ control, name: "s4_items" });
  const {
    fields: s5Items,
    append: appendS5Items,
    remove: removeS5Items,
  } = useFieldArray({ control, name: "s5_items" });
  const {
    fields: s8Items,
    append: appendS8Items,
    remove: removeS8Items,
  } = useFieldArray({ control, name: "s8_items" });
  const {
    fields: s9Faqs,
    append: appendS9Faq,
    remove: removeS9Faq,
  } = useFieldArray({ control, name: "s9_faqs" });

  // const onSubmit = (data) => {
  //   console.log("Form Data:", data);
  // };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      //  Basic fields
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("meta_title", data.meta_title);
      formData.append("meta_description", data.meta_description);
      formData.append("canonical_url", data.canonical_url);
      formData.append("focus_keyword", data.focus_keyword);
      formData.append("redirect_301", data.redirect_301);
      formData.append("redirect_302", data.redirect_302);
      formData.append("old_redirect_url", data.old_redirect_url);
      formData.append("schema", data.schema);
      formData.append("email", data.email);
      formData.append("phone_no", data.phone_no);
      formData.append("location", data.location);
      formData.append("description", data.description);

      //  Logo file
      if (data.logo?.[0]) {
        formData.append("logo", data.logo[0]);
      }

      //  main_image
      formData.append("main_image[alt]", data.main_image.alt);
      formData.append("main_image[name]", data.main_image.name);
      formData.append("main_image[file]", data.main_image.file[0]);

      //  Section 1
      formData.append("s1_heading", data.s1_heading);
      formData.append("s1_description", data.s1_description);
      formData.append("s1_text", data.s1_text);

      //  Section 2
      formData.append("s2_heading", data.s2_heading);
      formData.append("s2_description", data.s2_description);
      formData.append("s2_image[alt]", data.s2_image.alt);
      formData.append("s2_image[name]", data.s2_image.name);
      formData.append("s2_image[file]", data.s2_image.file[0]);

      if (data.s2_images) {
        data.s2_images?.forEach((item, index) => {
          formData.append(`s2_images[${index}][alt]`, item.alt);
          formData.append(`s2_images[${index}][name]`, item.name);
          formData.append(`s2_images[${index}][file]`, item.file[0]);
        });
      }

      formData.append("s3_heading", data.s3_heading);

      //  Section 4
      formData.append("s4_heading", data.s4_heading);
      formData.append("s4_image[alt]", data.s4_image.alt);
      formData.append("s4_image[name]", data.s4_image.name);
      formData.append(`s4_image[file]`, data.s4_image.file[0]);

      if (data.s4_items) {
        data.s4_items?.forEach((item, index) => {
          formData.append(`s4_items[${index}][name]`, item.name);
          formData.append(`s4_items[${index}][text]`, item.text);
          formData.append(`s4_items[${index}][alt]`, item.alt);
          formData.append(`s4_items[${index}][alt_name]`, item.alt_name);
          formData.append(`s4_items[${index}][file]`, item.file[0]);
        });
      }

      //  Section 5
      formData.append("s5_heading", data.s5_heading);
      formData.append("s5_sub_heading", data.s5_sub_heading);

      if (data.s5_items) {
        data.s5_items?.forEach((item, index) => {
          formData.append(`s5_items[${index}][name]`, item.name);
          formData.append(`s5_items[${index}][text]`, item.text);
          formData.append(`s5_items[${index}][alt]`, item.alt);
          formData.append(`s5_items[${index}][alt_name]`, item.alt_name);
          formData.append(`s5_items[${index}][file]`, item.file[0]);
        });
      }
      //  Section 6
      formData.append("s6_heading", data.s6_heading);
      formData.append("s6_content", data.s6_content);
      formData.append("s6_email", data.s6_email);
      formData.append("s6_phone", data.s6_phone);

      //  Section 7
      formData.append("s7_heading", data.s7_heading);
      formData.append("s7_description", data.s7_description);
      formData.append("s7_image[alt]", data.s7_image?.alt || "");
      formData.append("s7_image[name]", data.s7_image?.name || "");
      formData.append(`s7_image[file]`, data.s7_image?.file[0]);

      //  Section 8
      formData.append("s8_heading", data.s8_heading);
      formData.append("s8_description", data.s8_description);

      if (data.s8_items) {
        data.s8_items?.forEach((item, index) => {
          formData.append(`s8_items[${index}][name]`, item.name);
          formData.append(`s8_items[${index}][text]`, item.text);
          formData.append(`s8_items[${index}][alt]`, item.alt);
          formData.append(`s8_items[${index}][alt_name]`, item.alt_name);
          formData.append(`s8_items[${index}][file]`, item.file[0]);
        });
      }

      if (data.s9_faqs) {
        //  Section 9 FAQs
        data.s9_faqs?.forEach((faq, index) => {
          formData.append(`s9_faqs[${index}][question]`, faq.question);
          formData.append(`s9_faqs[${index}][ans]`, faq.ans);
        });
      }

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

      //  Send request
      const res = await axiosClient.post("/admin/developers/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success == true) {
        Swal.fire({
          icon: "success",
          //   title: "Success!",
          text: res.data?.message || "Data submitted successfully!",
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          //   title: "Success!",
          text: res.data?.message || "Data submitted Failed",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.response?.data?.message || "Something went wrong",
      });
    }
  };

  useEffect(() => {
    console.log("Validation Errors:", errors);
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
      {/* === Basic Info === */}
      {/* <h2 className="text-xl font-bold">Basic Information</h2>
      <div className="flex flex-wrap justify-between items-center gap-3">
        <input
          placeholder="Name"
          {...register("name")}
          className={`rounded p-3 text-base border outline-none border-gray-300 w-96`}
        />
        <input
          placeholder="Slug"
          {...register("slug")}
          className={`rounded p-3 text-base border outline-none border-gray-300 w-96`}
        />
        <input
          placeholder="Meta Title"
          {...register("meta_title")}
          className={`rounded p-3 text-base border outline-none border-gray-300 w-96`}
        />
        <input
          placeholder="Meta Description"
          {...register("meta_description")}
          className={`rounded p-3 text-base border outline-none border-gray-300 w-96`}
        />
        <input
          placeholder="Canonical URL"
          {...register("canonical_url")}
          className={`rounded p-3 text-base border outline-none border-gray-300 w-96`}
        />
        <input
          placeholder="Focus Keyword"
          {...register("focus_keyword")}
          className={`rounded p-3 text-base border outline-none border-gray-300 w-96`}
        />
        <input
          placeholder="Redirect 301"
          {...register("redirect_301")}
          className={`rounded p-3 text-base border outline-none border-gray-300 w-96`}
        />
        <input
          placeholder="Redirect 302"
          {...register("redirect_302")}
          className={`rounded p-3 text-base border outline-none border-gray-300 w-96`}
        />
        <input
          placeholder="Old Redirect URL"
          {...register("old_redirect_url")}
          className={`rounded p-3 text-base border outline-none border-gray-300 w-96`}
        />
        <input
          placeholder="Schema (as JSON)"
          {...register("schema")}
          className={`rounded p-3 text-base border outline-none border-gray-300 w-96`}
        />
        <input
          placeholder="Email"
          {...register("email")}
          className={`rounded p-3 text-base border outline-none border-gray-300 w-96`}
        />
        <input
          placeholder="Phone No"
          {...register("phone_no")}
          className={`rounded p-3 text-base border outline-none border-gray-300 w-96`}
        />
        <input
          placeholder="Location"
          {...register("location")}
          className={`rounded p-3 text-base border outline-none border-gray-300 w-96`}
        />
        <input
          type="file"
          accept="image/*"
          {...register("logo")}
          className="rounded p-3 border outline-none text-sm text-gray-700 w-96"
        />
      </div> */}
      <h2 className="text-xl font-bold mb-4">Basic Information</h2>
     <div className="flex flex-wrap justify-between gap-3">
  {[
    { name: "name", label: "Name", required: true },
    { name: "slug", label: "Slug", required: true },
    { name: "meta_title", label: "Meta Title", required: true },
    { name: "meta_description", label: "Meta Description", required: true },
    { name: "canonical_url", label: "Canonical URL", required: true },
    { name: "focus_keyword", label: "Focus Keyword", required: true },
    { name: "redirect_301", label: "Redirect 301", required: false },
    { name: "redirect_302", label: "Redirect 302", required: false },
    { name: "old_redirect_url", label: "Old Redirect URL", required: false },
    { name: "email", label: "Email", required: true },
    { name: "phone_no", label: "Phone No", required: true },
  ].map(({ name, label, required }) => (
    <div key={name} className="flex flex-col w-96">
      <label className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...register(
          name,
          required ? { required: `${label} is required` } : {}
        )}
        placeholder={label}
        className={`rounded p-3 text-base border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } outline-none`}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  ))}

  {/* Logo Upload */}
  <div className="flex flex-col w-96">
    <label className="mb-1 text-sm font-medium text-gray-700">Logo</label>
    <input
      type="file"
      accept="image/*"
      {...register("logo")}
      className={`rounded p-3 text-base border ${
        errors.logo ? "border-red-500" : "border-gray-300"
      } outline-none`}
    />
    {errors.logo && (
      <span className="text-red-500 text-sm mt-1">
        {errors.logo.message}
      </span>
    )}
  </div>

  <div className="flex flex-col w-96">
    <label className="mb-1 text-sm font-medium text-gray-700">
      Schema (as JSON)
    </label>
    <textarea
      {...register("schema", {
        required: "Schema (as JSON) is required",
      })}
      placeholder="Schema (as JSON)"
      className={`resize-none rounded p-3 text-base border ${
        errors?.schema ? "border-red-500" : "border-gray-300"
      } outline-none`}
    />
    {errors?.schema && (
      <span className="text-red-500 text-sm mt-1">
        {errors?.schema.message}
      </span>
    )}
  </div>

  <div className="flex flex-col w-96">
    <label className="mb-1 text-sm font-medium text-gray-700">
      Location
    </label>
    <textarea
      {...register("location", { required: "Location is required" })}
      placeholder="Location"
      className={`resize-none rounded p-3 text-base border ${
        errors?.location ? "border-red-500" : "border-gray-300"
      } outline-none`}
    />
    {errors?.location && (
      <span className="text-red-500 text-sm mt-1">
        {errors?.location.message}
      </span>
    )}
  </div>

  <div className="flex flex-col w-96">
    <QuillField
      control={control}
      name="description"
      label="Description"
      rules={{ required: "Description is required" }}
    />
    {errors?.description && (
      <span className="text-red-500 text-sm mt-1">
        {errors?.description.message}
      </span>
    )}
  </div>
</div>


      {/* === Main Image === */}
      <h2 className="text-xl font-bold mb-4">Main Image</h2>
      <div className="flex flex-wrap items-center gap-3">
        {/* Main Image Alt */}
        <div className="flex flex-col w-96">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Main Image Alt
          </label>
          <input
            placeholder="Main Image Alt"
            {...register("main_image.alt", {
              required: "Alt text is required",
            })}
            className={`rounded p-3 text-base border ${errors?.main_image?.alt ? "border-red-500" : "border-gray-300"
              } outline-none`}
          />
          {errors?.main_image?.alt && (
            <span className="text-red-500 text-sm mt-1">
              {errors.main_image.alt.message}
            </span>
          )}
        </div>

        {/* Main Image Name */}
        <div className="flex flex-col w-96">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Main Image Name
          </label>
          <input
            placeholder="Main Image Name"
            {...register("main_image.name", {
              required: "Image name is required",
            })}
            className={`rounded p-3 text-base border ${errors?.main_image?.name ? "border-red-500" : "border-gray-300"
              } outline-none`}
          />
          {errors?.main_image?.name && (
            <span className="text-red-500 text-sm mt-1">
              {errors.main_image.name.message}
            </span>
          )}
        </div>

        {/* Main Image File */}
        <div className="flex flex-col w-96">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Main Image File
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("main_image.file", {
              required: "Image file is required",
            })}
            className={`rounded p-3 border ${errors?.main_image?.file ? "border-red-500" : "border-gray-300"
              } outline-none text-sm text-gray-700`}
          />
          {errors?.main_image?.file && (
            <span className="text-red-500 text-sm mt-1">
              {errors.main_image.file.message}
            </span>
          )}
        </div>
      </div>

      {/* === Section 1 === */}
      <h2 className="text-xl font-bold mb-4">Section 1</h2>
      <div className="flex flex-wrap justify-between items-center gap-3">
        {/* Heading */}
        <div className="flex flex-col w-96">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Section 1 Heading
          </label>
          <input
            placeholder="Heading"
            {...register("s1_heading", { required: "Heading is required" })}
            className={`rounded p-3 text-base border ${errors?.s1_heading ? "border-red-500" : "border-gray-300"
              } outline-none`}
          />
          {errors?.s1_heading && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s1_heading.message}
            </span>
          )}
        </div>

        {/* Section 1 Description */}
        <div className="flex flex-col w-96">
          <QuillField
            control={control}
            name="s1_description"
            label="Section 1 Description"
            rules={{ required: "Description is required" }}
          />
          {errors?.s1_description && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s1_description.message}
            </span>
          )}
        </div>

        {/* Section 1 Text */}
        {/* <div className="flex flex-col w-96">
    <QuillField
      control={control}
      name="s1_text"
      label="Section 1 Text"
      rules={{ required: "Text is required" }}
    />
    {errors?.s1_text && (
      <span className="text-red-500 text-sm mt-1">{errors.s1_text.message}</span>
    )}
  </div> */}
        <div className="flex flex-col w-96">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Section 1 Text (Years of Experience)
          </label>
          <input
            placeholder="Years Of Experience"
            {...register("s1_text", { required: "Text is required" })}
            className={`rounded p-3 text-base border ${errors?.s1_text ? "border-red-500" : "border-gray-300"
              } outline-none`}
          />
          {errors?.s1_text && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s1_text.message}
            </span>
          )}
        </div>
      </div>

      {/* === Section 2 === */}
      <h2 className="text-xl font-bold mt-6">Section 2</h2>

      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex flex-col w-96">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Section 2 Heading
          </label>
          <input
            placeholder="Heading"
            {...register("s2_heading", { required: "Heading is required" })}
            className={`rounded p-3 text-base border ${errors?.s2_heading ? "border-red-500" : "border-gray-300"
              } outline-none`}
          />
          {errors?.s2_heading && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s2_heading.message}
            </span>
          )}
        </div>

        <div className="flex flex-col w-96">
          <QuillField
            control={control}
            name="s2_description"
            label="Section 2 Description"
            rules={{ required: "Description is required" }}
          />
          {errors?.s2_description && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s2_description.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-col w-96">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Image Alt
          </label>
          <input
            placeholder="Image Alt"
            {...register("s2_image.alt", {
              required: "Image alt text is required",
            })}
            className={`rounded p-3 text-base border ${errors?.s2_image?.alt ? "border-red-500" : "border-gray-300"
              } outline-none`}
          />
          {errors?.s2_image?.alt && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s2_image.alt.message}
            </span>
          )}
        </div>

        <div className="flex flex-col w-96">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Image Name
          </label>
          <input
            placeholder="Image Name"
            {...register("s2_image.name", {
              required: "Image name is required",
            })}
            className={`rounded p-3 text-base border ${errors?.s2_image?.name ? "border-red-500" : "border-gray-300"
              } outline-none`}
          />
          {errors?.s2_image?.name && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s2_image.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col w-96">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Image File
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("s2_image.file", {
              required: "Image file is required",
            })}
            className={`rounded p-3 text-base border ${errors?.s2_image?.file ? "border-red-500" : "border-gray-300"
              } outline-none`}
          />
          {errors?.s2_image?.file && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s2_image.file.message}
            </span>
          )}
        </div>
      </div>

      {/* === Repeating Images === */}
      {s2Images.map((item, index) => (
        <div key={item.id} className="flex items-center gap-3 flex-wrap">
          <div className="flex flex-col w-96">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Image {index + 1} Name
            </label>
            <input
              {...register(`s2_images.${index}.name`, {
                required: "Image name is required",
              })}
              placeholder={`Image ${index + 1} Name`}
              className={`rounded p-3 text-base border ${errors?.s2_images?.[index]?.name
                ? "border-red-500"
                : "border-gray-300"
                } outline-none`}
            />
            {errors?.s2_images?.[index]?.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.s2_images[index].name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col w-96">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Image {index + 1} Alt
            </label>
            <input
              {...register(`s2_images.${index}.alt`, {
                required: "Image alt is required",
              })}
              placeholder={`Image ${index + 1} Alt`}
              className={`rounded p-3 text-base border ${errors?.s2_images?.[index]?.alt
                ? "border-red-500"
                : "border-gray-300"
                } outline-none`}
            />
            {errors?.s2_images?.[index]?.alt && (
              <span className="text-red-500 text-sm mt-1">
                {errors.s2_images[index].alt.message}
              </span>
            )}
          </div>

          <div className="flex flex-col w-96">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Image {index + 1} File
            </label>
            <input
              type="file"
              accept="image/*"
              {...register(`s2_images.${index}.file`, {
                required: "Image file is required",
              })}
              className={`rounded p-3 text-base border ${errors?.s2_images?.[index]?.file
                ? "border-red-500"
                : "border-gray-300"
                } outline-none`}
            />
            {errors?.s2_images?.[index]?.file && (
              <span className="text-red-500 text-sm mt-1">
                {errors.s2_images[index].file.message}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => removeS2Image(index)}
            className="text-red-500 font-bold mt-7"
          >
            Remove
          </button>
        </div>
      ))}

      {/* <button
        type="button"
        onClick={() => appendS2Image({ name: "", alt: "", file: "" })}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Image
      </button> */}
      <h2 className="text-xl font-bold mb-4">Section 3</h2>

      <div className="flex flex-col w-96">
        <label
          htmlFor="s3_heading"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Heading
        </label>
        <input
          id="s3_heading"
          placeholder="Heading"
          {...register("s3_heading", { required: "Heading is required" })}
          className={`rounded p-3 text-base border outline-none w-full ${errors?.s3_heading ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors?.s3_heading && (
          <span className="text-red-500 text-sm mt-1">
            {errors.s3_heading.message}
          </span>
        )}
      </div>

      {/* === Section 4 === */}
      <h2 className="text-xl font-bold mb-4">Section 4</h2>

      <div className="flex flex-wrap justify-between items-start gap-6">
        <div className="flex flex-col w-96">
          <label
            htmlFor="s4_heading"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Heading
          </label>
          <input
            id="s4_heading"
            placeholder="Heading"
            {...register("s4_heading", { required: "Heading is required" })}
            className={`rounded p-3 text-base border outline-none w-full ${errors?.s4_heading ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors?.s4_heading && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s4_heading.message}
            </span>
          )}
        </div>

        <div className="flex flex-col w-96">
          <label
            htmlFor="s4_image_alt"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Image Alt
          </label>
          <input
            id="s4_image_alt"
            placeholder="Image Alt"
            {...register("s4_image.alt", { required: "Image alt is required" })}
            className={`rounded p-3 text-base border outline-none w-full ${errors?.s4_image?.alt ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors?.s4_image?.alt && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s4_image.alt.message}
            </span>
          )}
        </div>

        <div className="flex flex-col w-96">
          <label
            htmlFor="s4_image_name"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Image Name
          </label>
          <input
            id="s4_image_name"
            placeholder="Image Name"
            {...register("s4_image.name", {
              required: "Image name is required",
            })}
            className={`rounded p-3 text-base border outline-none w-full ${errors?.s4_image?.name ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors?.s4_image?.name && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s4_image.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col w-96">
          <label
            htmlFor="s4_image_file"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Image File
          </label>
          <input
            id="s4_image_file"
            type="file"
            accept="image/*"
            {...register("s4_image.file", {
              required: "Image file is required",
            })}
            className={`rounded p-3 border outline-none text-sm text-gray-700 w-full ${errors?.s4_image?.file ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors?.s4_image?.file && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s4_image.file.message}
            </span>
          )}
        </div>
      </div>

      {s4Items.map((item, i) => (
        <div key={item.id} className="flex flex-col gap-2 mb-6 ">
          {/* <label className="font-semibold">Item {i + 1} Name</label>
    <input
      placeholder={`Item ${i + 1} Name`}
      {...register(`s4_items.${i}.name`, { required: "Item name is required" })}
      className={`rounded p-3 text-base border outline-none w-96 ${
        errors?.s4_items?.[i]?.name ? "border-red-500" : "border-gray-300"
      }`}
    />
    {errors?.s4_items?.[i]?.name && (
      <span className="text-red-500 text-sm mt-1">{errors.s4_items[i].name.message}</span>
    )} */}

          <QuillField
            control={control}
            name={`s4_items.${i}.text`}
            label={`Item ${i + 1} Text`}
            rules={{ required: "Item text is required" }}
          />
          {errors?.s4_items?.[i]?.text && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s4_items[i].text.message}
            </span>
          )}

          <div className="flex flex-wrap items-start gap-6 mt-2">
            <div className="flex flex-col w-96">
              <label
                htmlFor={`s4_items_name_${i}`}
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Item {i + 1} Name
              </label>
              <input
                id={`s4_items_name_${i}`}
                placeholder={`Item ${i + 1} Name`}
                {...register(`s4_items.${i}.name`, {
                  required: "Item name is required",
                })}
                className={`rounded p-3 text-base border outline-none w-full ${errors?.s4_items?.[i]?.name
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              />
              {errors?.s4_items?.[i]?.name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.s4_items[i].name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-96">
              <label
                htmlFor={`s4_items.${i}.alt_name`}
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Item {i + 1} Image Name
              </label>
              <input
                id={`s4_items.${i}.alt_name`}
                placeholder="Image alt_name"
                {...register(`s4_items.${i}.alt_name`, {
                  required: "Image Name is required",
                })}
                className={`rounded p-3 text-base border outline-none w-full ${errors?.s4_items?.[i]?.alt_name
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              />
              {errors?.s4_items?.[i]?.alt_name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.s4_items[i].alt_name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-96">
              <label
                htmlFor={`s4_items_alt_${i}`}
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Item {i + 1} Image Alt
              </label>
              <input
                id={`s4_items.${i}.alt`}
                placeholder="Image Alt"
                {...register(`s4_items.${i}.alt`, {
                  required: "Image alt is required",
                })}
                className={`rounded p-3 text-base border outline-none w-full ${errors?.s4_items?.[i]?.alt
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              />
              {errors?.s4_items?.[i]?.alt && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.s4_items[i].alt.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-96">
              <label
                htmlFor={`s4_items_file_${i}`}
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Item {i + 1} Image File
              </label>
              <input
                id={`s4_items_file_${i}`}
                type="file"
                accept="image/*"
                {...register(`s4_items.${i}.file`, {
                  required: "Image file is required",
                })}
                className={`rounded p-3 border outline-none text-sm text-gray-700 w-full ${errors?.s4_items?.[i]?.file
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              />
              {errors?.s4_items?.[i]?.file && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.s4_items[i].file.message}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeS4Items(i)}
            className="text-red-500 font-bold w-fit mt-1"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => appendS4Items({ name: "", text: "", alt: "", file: "" })}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Item
      </button>

      {/* === Section 5 === */}
      <h2 className="text-xl font-bold mb-4">Section 5</h2>
      <div className="flex flex-wrap items-start gap-6">
        <div className="flex flex-col w-96">
          <label
            htmlFor="s5_heading"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Heading
          </label>
          <input
            id="s5_heading"
            placeholder="Heading"
            {...register("s5_heading", { required: "Heading is required" })}
            className={`rounded p-3 text-base border outline-none w-full ${errors?.s5_heading ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors?.s5_heading && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s5_heading.message}
            </span>
          )}
        </div>

        <div className="flex flex-col w-96">
          <label
            htmlFor="s5_sub_heading"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Sub Heading
          </label>
          <input
            id="s5_sub_heading"
            placeholder="Sub Heading"
            {...register("s5_sub_heading", {
              required: "Sub Heading is required",
            })}
            className={`rounded p-3 text-base border outline-none w-full ${errors?.s5_sub_heading ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors?.s5_sub_heading && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s5_sub_heading.message}
            </span>
          )}
        </div>

        {/* <div className="flex flex-col w-96">
    <label htmlFor="s5_image_alt" className="mb-1 text-sm font-medium text-gray-700">Image Alt</label>
    <input
      id="s5_image_alt"
      placeholder="Image Alt"
      {...register("s5_image.alt", { required: "Image alt is required" })}
      className={`rounded p-3 text-base border outline-none w-full ${
        errors?.s5_image?.alt ? "border-red-500" : "border-gray-300"
      }`}
    />
    {errors?.s5_image?.alt && (
      <span className="text-red-500 text-sm mt-1">{errors.s5_image.alt.message}</span>
    )}
  </div>

  <div className="flex flex-col w-96">
    <label htmlFor="s5_image_name" className="mb-1 text-sm font-medium text-gray-700">Image Name</label>
    <input
      id="s5_image_name"
      placeholder="Image Name"
      {...register("s5_image.name", { required: "Image name is required" })}
      className={`rounded p-3 text-base border outline-none w-full ${
        errors?.s5_image?.name ? "border-red-500" : "border-gray-300"
      }`}
    />
    {errors?.s5_image?.name && (
      <span className="text-red-500 text-sm mt-1">{errors.s5_image.name.message}</span>
    )}
  </div>

  <div className="flex flex-col w-96">
    <label htmlFor="s5_image_file" className="mb-1 text-sm font-medium text-gray-700">Image File</label>
    <input
      id="s5_image_file"
      type="file"
      accept="image/*"
      {...register("s5_image.file", { required: "Image file is required" })}
      className={`rounded p-3 border outline-none text-sm text-gray-700 w-full ${
        errors?.s5_image?.file ? "border-red-500" : "border-gray-300"
      }`}
    />
    {errors?.s5_image?.file && (
      <span className="text-red-500 text-sm mt-1">{errors.s5_image.file.message}</span>
    )}
  </div> */}
      </div>

      {s5Items.map((item, i) => (
        <div key={item.id} className="flex flex-col gap-2 mb-6">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Item {i + 1} Text
          </label>
          <QuillField
            control={control}
            name={`s5_items.${i}.text`}
            label={`Item ${i + 1} Text`}
            rules={{ required: "Item text is required" }}
          />
          {errors?.s5_items?.[i]?.text && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s5_items[i].text.message}
            </span>
          )}

          <div className="flex flex-wrap items-start gap-6 mt-2">
            <div className="flex flex-col w-96">
              <label
                htmlFor={`s5_items_name_${i}`}
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Item {i + 1} Name
              </label>
              <input
                id={`s5_items_name_${i}`}
                placeholder={`Item ${i + 1} Name`}
                {...register(`s5_items.${i}.name`, {
                  required: "Item name is required",
                })}
                className={`rounded p-3 text-base border outline-none w-full ${errors?.s5_items?.[i]?.name
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              />
              {errors?.s5_items?.[i]?.name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.s5_items[i].name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-96">
              <label
                htmlFor={`s5_items_alt_name_${i}`}
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Item {i + 1} Image Name
              </label>
              <input
                id={`s5_items_alt_name_${i}`}
                placeholder="Image Name"
                {...register(`s5_items.${i}.alt_name`, {
                  required: "Image Name is required",
                })}
                className={`rounded p-3 text-base border outline-none w-full ${errors?.s5_items?.[i]?.alt_name
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              />
              {errors?.s5_items?.[i]?.alt_name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.s5_items[i].alt_name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-96">
              <label
                htmlFor={`s5_items_alt_${i}`}
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Item {i + 1} Image Alt
              </label>
              <input
                id={`s5_items_alt_${i}`}
                placeholder="Image Alt"
                {...register(`s5_items.${i}.alt`, {
                  required: "Image alt is required",
                })}
                className={`rounded p-3 text-base border outline-none w-full ${errors?.s5_items?.[i]?.alt
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              />
              {errors?.s5_items?.[i]?.alt && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.s5_items[i].alt.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-96">
              <label
                htmlFor={`s5_items_file_${i}`}
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Item {i + 1} Image File
              </label>
              <input
                id={`s5_items_file_${i}`}
                type="file"
                accept="image/*"
                {...register(`s5_items.${i}.file`, {
                  required: "Image file is required",
                })}
                className={`rounded p-3 border outline-none text-sm text-gray-700 w-full ${errors?.s5_items?.[i]?.file
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              />
              {errors?.s5_items?.[i]?.file && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.s5_items[i].file.message}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeS5Items(i)}
            className="text-red-500 font-bold w-fit mt-2"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => appendS5Items({ name: "", text: "", file: "", alt: "" })}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Item
      </button>

      <h2 className="text-xl font-bold mb-4">Section 6</h2>
      <div className="flex flex-wrap justify-between items-start gap-6">
        <div className="flex flex-col w-96">
          <label
            htmlFor="s6_heading"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Heading
          </label>
          <input
            id="s6_heading"
            placeholder="Heading"
            {...register("s6_heading", { required: "Heading is required" })}
            className={`rounded p-3 text-base border outline-none w-full ${errors?.s6_heading ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors?.s6_heading && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s6_heading.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-96">
          <QuillField
            control={control}
            name={`s6_content`}
            label={`Description`}
            rules={{ required: "Answer is required" }}
          />
          {errors?.s6_content && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s6_content.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-96">
          <label
            htmlFor="s6_phone"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="s6_phone"
            placeholder="Heading"
            {...register("s6_phone", { required: "Heading is required" })}
            className={`rounded p-3 text-base border outline-none w-full ${errors?.s6_phone ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors?.s6_phone && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s6_phone.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-96">
          <label
            htmlFor="s6_email"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="s6_email"
            placeholder="Heading"
            {...register("s6_email", { required: "Heading is required" })}
            className={`rounded p-3 text-base border outline-none w-full ${errors?.s6_email ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors?.s6_email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s6_email.message}
            </span>
          )}
        </div>
      </div>

      {/* === Section 7 === */}
      <h2 className="text-xl font-bold mb-4">Section 7</h2>
      <div className="flex flex-wrap justify-between items-start gap-6">
        <div className="flex flex-col w-96">
          <label
            htmlFor="s7_heading"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Heading
          </label>
          <input
            id="s7_heading"
            placeholder="Heading"
            {...register("s7_heading", { required: "Heading is required" })}
            className={`rounded p-3 text-base border outline-none w-full ${errors?.s7_heading ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors?.s7_heading && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s7_heading.message}
            </span>
          )}
        </div>

        <div className="flex flex-col w-96">
          <QuillField
            control={control}
            name={`s7_description`}
            label={`Description`}
            rules={{ required: "Answer is required" }}
          />
          {errors?.s7_description && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s7_description.message}
            </span>
          )}
        </div>

        <div className="flex flex-col w-96">
          <label
            htmlFor="s7_image_alt"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Image Alt
          </label>
          <input
            id="s7_image_alt"
            placeholder="Image Alt"
            {...register("s7_image.alt", { required: "Image alt is required" })}
            className={`rounded p-3 text-base border outline-none w-full ${errors?.s7_image?.alt ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors?.s7_image?.alt && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s7_image.alt.message}
            </span>
          )}
        </div>

        <div className="flex flex-col w-96">
          <label
            htmlFor="s7_image_name"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Image Name
          </label>
          <input
            id="s7_image_name"
            placeholder="Image Name"
            {...register("s7_image.name", {
              required: "Image name is required",
            })}
            className={`rounded p-3 text-base border outline-none w-full ${errors?.s7_image?.name ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors?.s7_image?.name && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s7_image.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col w-96">
          <label
            htmlFor="s7_image.file"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Image File
          </label>
          <input
            id="s7_image.file"
            type="file"
            accept="image/*"
            {...register("s7_image.file", {
              required: "Image file is required",
            })}
            className={`rounded p-3 border outline-none text-sm text-gray-700 w-full ${errors?.s7_image?.file ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors?.s7_image?.file && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s7_image.file.message}
            </span>
          )}
        </div>
      </div>

      {/* === Section 8 === */}
      <h2 className="text-xl font-bold mb-4">Section 8</h2>
      <div className="flex flex-wrap items-start gap-6">
        <div className="flex flex-col w-96">
          <label
            htmlFor="s8_heading"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Heading
          </label>
          <input
            id="s8_heading"
            placeholder="Heading"
            {...register("s8_heading", { required: "Heading is required" })}
            className={`rounded p-3 text-base border outline-none w-full ${errors?.s8_heading ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors?.s8_heading && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s8_heading.message}
            </span>
          )}
        </div>

        <div className="flex flex-col w-96">
          <QuillField
            control={control}
            name={`s8_description`}
            label={`Description`}
            rules={{ required: "Answer is required" }}
          />
          {errors?.s8_description && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s8_description.message}
            </span>
          )}
        </div>
      </div>

      {s8Items.map((_, i) => (
        <div key={_.id} className="flex flex-col gap-2 mb-6">
          <label className="font-semibold">Item {i + 1}</label>

          <QuillField
            control={control}
            name={`s8_items.${i}.text`}
            label={`Item ${i + 1} Text`}
            rules={{ required: "Item text is required" }}
          />
          {errors?.s8_items?.[i]?.text && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s8_items?.[i]?.text?.message}
            </span>
          )}

          <div className="flex flex-wrap items-start gap-6 mt-2">
            <div className="flex flex-col w-96">
              <label
                htmlFor={`s8_items.${i}.name`}
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Item {i + 1} Name
              </label>
              <input
                id={`s8_items.${i}.name`}
                placeholder={`Item ${i + 1} Name`}
                {...register(`s8_items.${i}.name`, {
                  required: "Name is required",
                })}
                className={`rounded p-3 text-base border outline-none w-full ${errors?.s8_items?.[i]?.name
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              />
              {errors?.s8_items?.[i]?.name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.s8_items[i].name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-96">
              <label
                htmlFor={`s8_items.${i}.alt_name`}
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Image Name
              </label>
              <input
                id={`s8_items.${i}.alt_name`}
                placeholder="Image Name"
                {...register(`s8_items.${i}.alt_name`, {
                  required: "Image name is required",
                })}
                className={`rounded p-3 text-base border outline-none w-full ${errors?.s8_items?.[i]?.alt_name
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              />
              {errors?.s8_items?.[i]?.alt_name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.s8_items[i].alt_name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-96">
              <label
                htmlFor={`s8_items.${i}.alt`}
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Image Alt
              </label>
              <input
                id={`s8_items.${i}.alt`}
                placeholder="Image Alt"
                {...register(`s8_items.${i}.alt`, {
                  required: "Image alt is required",
                })}
                className={`rounded p-3 text-base border outline-none w-full ${errors?.s8_items?.[i]?.alt
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              />
              {errors?.s8_items?.[i]?.alt && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.s8_items[i].alt.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-96">
              <label
                htmlFor={`s8_items.${i}.file`}
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Image File
              </label>
              <input
                id={`s8_items.${i}.file`}
                type="file"
                accept="image/*"
                {...register(`s8_items.${i}.file`, {
                  required: "Image file is required",
                })}
                className={`rounded p-3 border outline-none text-sm text-gray-700 w-full ${errors?.s8_items?.[i]?.file
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              />
              {errors?.s8_items?.[i]?.file && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.s8_items[i].file.message}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeS8Items(i)}
            className="text-red-500 font-bold w-fit mt-2"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          appendS8Items({ name: "", text: "", file: "", alt: "", alt_name: "" })
        }
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Item
      </button>

      {/* === FAQs (Section 9) === */}
      <h2 className="text-xl font-bold mt-6 mb-4">FAQs</h2>
      {s9Faqs.map((item, index) => (
        <div key={item.id} className="flex flex-col gap-2 mb-6">
          <label
            htmlFor={`s9_faqs.${index}.question`}
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Question {index + 1}
          </label>
          <input
            id={`s9_faqs.${index}.question`}
            {...register(`s9_faqs.${index}.question`, {
              required: "Question is required",
            })}
            placeholder="Question"
            className={`rounded p-3 text-base border outline-none w-full ${errors?.s9_faqs?.[index]?.question
              ? "border-red-500"
              : "border-gray-300"
              }`}
          />
          {errors?.s9_faqs?.[index]?.question && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s9_faqs[index].question.message}
            </span>
          )}

          {/* QuillField handles its own label and errors */}
          <QuillField
            control={control}
            name={`s9_faqs.${index}.ans`}
            label={`Answer ${index + 1}`}
            rules={{ required: "Answer is required" }}
          />

          {errors?.s9_faqs?.[index]?.ans && (
            <span className="text-red-500 text-sm mt-1">
              {errors.s9_faqs?.[index]?.ans?.message}
            </span>
          )}

          <button
            type="button"
            onClick={() => removeS9Faq(index)}
            className="text-red-500 font-bold w-fit mt-2"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => appendS9Faq({ question: "", ans: "" })}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add FAQ
      </button>

      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Footer Section Title
          </label>
          <input
            {...register("footer_section_title")}
            placeholder="footer section title"
            className={`rounded p-3 text-base border outline-none`}
          />
        
        </div>

        {/* Section 1 Description - using Quill */}
        <div className="flex flex-col">
          <QuillField
            control={control}
            name="footer_section_description"
            label="footer Section Description"
            rules={{ required: "footer section Description is required" }}
          />
          
        </div>

        {/* Footer Section Image Fields */}

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            footer section Image File
          </label>
          <input
            type="file"
            {...register("footer_section_image_file")}
          />
        
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            footer section Image Alt
          </label>
          <input
            placeholder="footer section image alt"
            {...register("footer_section_image_alt")}
            className="rounded p-3 border border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            footer Section Image Text
          </label>
          <input
            placeholder="footer section img text"
            {...register("footer_section_image_text")}
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
            {...register("footer_section_btn_1_text")}
            className="rounded p-3 border border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            footer Btn 1 link
          </label>
          <input
            placeholder="footer Btn 1 link"
            {...register("footer_section_btn_1_link")}
            className="rounded p-3 border border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            footer Btn 2 Text
          </label>
          <input
            {...register("footer_section_btn_2_text")}
            placeholder="footer Btn 2 text"
            className="rounded p-3 border border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            footer Btn 2 link
          </label>
          <input
            {...register("footer_section_btn_2_link")}
            placeholder="footer Btn 2 link"
            className="rounded p-3 border border-gray-300 outline-none"
          />
        </div>

      </div>

      <hr />


      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateDeveloper;
