import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import SEOFields from "../Components/SEOFields";
import QuillField from "../../../../AdminComponents/Inputs/QuillField";
// import InputField from "../../../../AdminComponents/Inputs/InputField"; // Assuming you have InputField component

// Validation Schema
const schema = yup.object().shape({
  property_type_id: yup.string().required("Category is required"),
  slug: yup.string().required(),
  property_locations_name: yup.string().required(),
      location_section_heading : yup.string().required(),
location_section_image_file: yup.mixed().nullable(),
location_section_image_alt : yup.string().required("location Section Image Alt is required"),
location_section_description: yup.string().required(),
      location_section2_heading : yup.string().required(),
location_section2_image_file: yup.mixed().nullable(),
location_section2_image_alt : yup.string().required("location Section 2 Image Alt is required"),
location_section2_description: yup.string().required(),

  meta_title: yup.string().required(),
  meta_description: yup.string().required(),
  canonical_url: yup.string().nullable(),
  focus_keyword: yup.string().required(),
  // redirect_301: yup.string().nullable(),
  // redirect_302: yup.string().nullable(),
  schema: yup.string().required(),

  Banner_image_alt: yup.string().required(),
  Banner_image_text: yup.string().required(),
  Banner_heading: yup.string().required(),

  section_1_title: yup.string().required(),
  section_2_heading: yup.string().required(),
  section_2_description: yup.string().required(),
  location_section_image_text: yup.string().nullable(),
  section_2_email: yup.string().email().required(),
  section_2_phone: yup
    .string()
    .matches(
      /^\+?[0-9]{10,15}$/,
      "Phone number must be 10 to 15 digits and may start with '+'"
    )
    .required(),

  section_3_title: yup.string().required(),
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

  // Optional, since they're not in your payload
  Banner_image: yup.mixed().nullable(),
});


const PropertyTypePageForm = ({
  // editData,
  setStatus,
  // setEditData,
  fetchData,
}) => {
  const navigate = useNavigate();
    const [propCat, setPropCat] = useState([]);
    const location = useLocation();
  const editData = location.state?.data || null;
   const locationList = [
    {
      name: "Palm Jumeirah",
      id: "1",
    },
    {
      name: "Palm Jebel Ali",
      id: "2",
    },
    {
      name: "Dubai Island",
      id: "3",
    },
  ];

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      property_type_id: null,
      meta_title: "",
      meta_description: "",
      canonical_url: "",
      focus_keyword: "",
      redirect_301: "",
      redirect_302: "",
      schema: "",
      Banner_image_alt: "",
      Banner_image_text: "",
      Banner_heading: "",
      section_1_title: "",
      footer_section_title: "",
      footer_section_description: "",
      footer_section_btn_1_text: "",
      footer_section_btn_1_link: "",
      footer_section_btn_2_text: "",
      footer_section_btn_2_link: "",
      footer_section_image_file: null,
      footer_section_image_alt: "",
      footer_section_image_text: "",
      section_2_heading: "",
      section_2_description: "",
      section_2_email: "",
      section_2_phone: "",
      section_3_title: "",
      location_section_image_text: "",
      location_section_description : "",
      location_section_image_file : null ,
      location_section_image_alt: "",
      location_section_heading : "",
            location_section2_image_text: "",
      location_section2_description : "",
      location_section2_image_file : null ,
      location_section2_image_alt: "",
      location_section2_heading : "",
      Banner_image: null,
    },
  });

  const { handleSubmit, reset, control, register, formState } = methods;

    const fetchCategory = async () => {
    // setLoading(true);
    try {
      const res = await axiosClient.get("/property-types/active");
      setPropCat(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
    useEffect(() => {
    fetchCategory();
  }, []);


      

  useEffect(() => {
    if (editData) {
      const formattedData = {
        ...editData,
        schema: editData.schema ? JSON.stringify(editData.schema) : "",
        Banner_image_existing: editData?.Banner_image,
        footer_section_image_file: null,
                location_section_image_file: null,
location_section2_image_file: null,
        property_type_id: editData?.property_type_id
        ? String(editData.property_type_id) // 👈 force string
        : "",
        property_locations_name: editData?.property_locations_name
        ? String(editData.property_locations_name) // 👈 force string
        : "",
      };
      reset(formattedData);
    }
  }, [editData, reset, propCat]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Handle file condition
      if (data.Banner_image && data.Banner_image instanceof FileList && data.Banner_image.length > 0) {
        formData.append("Banner_image", data.Banner_image[0]);
      }

      // Handle file condition
      if (data?.footer_section_image_file && data?.footer_section_image_file.length > 0) {
        formData.append("footer_section_image_file", data.footer_section_image_file[0]);
      }

      if (data.Banner_image && data.Banner_image instanceof FileList && data.Banner_image.length > 0) {
        formData.append("Banner_image", data.Banner_image[0]);
      }
      
      if (data.location_section_image_file !== null) {
        formData.append("location_section_image_file", data.location_section_image_file[0]);
      }
      if (data.location_section2_image_file !== null) {
        formData.append("location_section2_image_file", data.location_section2_image_file[0]);
      }

      // Handle rest of the fields
       Object.entries(data).forEach(([key, value]) => {
        if (key !== "location_section2_image_file" &&  key !== "location_section_image_file" && key !== "Banner_image" && key !== "Banner_image_existing" && key !== "footer_section_image_file") {
          formData.append(key, value);
        }
      });

      const response = await axiosClient.post(
        `admin/property-type-page/save`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.status) {
        Swal.fire({
          icon: "success",
          text: response.data?.message || "Success!",
        });
        navigate("/admin/property-type-page-list");
        reset();
        // fetchData();
        // setEditData(null);
        // setStatus(1);
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
      Swal.fire({ icon: "error", text: error?.response.data.message || "Failed!" });
    }
  };



  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className=" gap-4">
        <SEOFields/>

<div className="flex gap-4">
        {/* Property Type Dropdown */}
        <div className="flex flex-col my-4 w-1/4">
          <label className="mb-1 text-sm font-medium text-gray-700">Select Property Type</label>
          <select
            {...register("property_type_id")}
            className={`rounded p-3 border ${formState.errors.property_type_id ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">-- Select Property Type --</option>
            {propCat.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {formState.errors.property_type_id && (
            <span className="text-red-500 text-sm mt-1">{formState.errors.property_type_id.message}</span>
          )}
        </div>

         {/* Location Dropdown */}
        <div className="flex flex-col my-4 w-1/4">
          <label className="mb-1 text-sm font-medium text-gray-700">Select Location</label>
          <select
            {...register("property_locations_name")}
            className={`rounded p-3 border ${formState.errors.property_locations_name ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">-- Select Locations --</option>
            {locationList.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {formState.errors.property_locations_name && (
            <span className="text-red-500 text-sm mt-1">{formState.errors.property_locations_name.message}</span>
          )}
        </div>
        </div>

        {/* Banner Section */}
        <h3 className="col-span-2 text-xl font-bold mt-4">Banner Section</h3>
        <input type="file" {...methods.register("Banner_image")} />
        <InputField name="Banner_image_alt" label="Image Alt" />
        <InputField name="Banner_image_text" label="Image Text" />
        <InputField name="Banner_heading" label="Banner Heading" />



        <div className="grid col-2 gap-4">
          {/* Section 2 */}
          <h3 className="col-span-2 text-xl font-bold">Section 1</h3>

          <InputField name="section_1_title" label="Heading" />
        </div>

          <div className="grid col-2 gap-4">
          {/* Section 2 */}
          <h3 className="col-span-2 text-xl font-bold">Section 2</h3>

          <InputField name="location_section_heading" label="Heading" />
            <QuillField
            name="location_section_description"
            label="Description"
            control={control}
          />
        </div>
        <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Location section Image File
            </label>
            <input
              type="file"
              {...methods.register("location_section_image_file")}
            />
            {methods.formState.errors.location_section_image_file && (
              <span className="text-red-500 text-sm mt-1">
                {methods.formState.errors.location_section_image_file.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Location section Image Alt
            </label>
            <input
              placeholder="Location section image alt"
              {...methods.register("location_section_image_alt")}
              className="rounded p-3 border border-gray-300 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Location Section Image Text
            </label>
            <input
              placeholder="Location section img text"
              {...methods.register("location_section_image_text")}
              className="rounded p-3 border border-gray-300 outline-none"
            />
          </div>

   <div className="grid col-2 gap-4">
          {/* Section 2 */}
          <h3 className="col-span-2 text-xl font-bold">Section 3</h3>

          <InputField name="location_section2_heading" label="Heading" />
            <QuillField
            name="location_section2_description"
            label="Description"
            control={control}
          />
        </div>
        <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Location section Image File
            </label>
            <input
              type="file"
              {...methods.register("location_section2_image_file")}
            />
            {methods.formState.errors.location_section2_image_file && (
              <span className="text-red-500 text-sm mt-1">
                {methods.formState.errors.location_section2_image_file.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Location section Image Alt
            </label>
            <input
              placeholder="Location section image alt"
              {...methods.register("location_section2_image_alt")}
              className="rounded p-3 border border-gray-300 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Location Section Image Text
            </label>
            <input
              placeholder="Location section img text"
              {...methods.register("location_section2_image_text")}
              className="rounded p-3 border border-gray-300 outline-none"
            />
          </div>








        <div className="grid col-2 gap-4">
          {/* Section 2 */}
          <h3 className="col-span-2 text-xl font-bold">Section 4</h3>

          {/* Heading */}
          <InputField name="section_2_heading" label="Heading" />

          {/* Description */}
          <QuillField
            name="section_2_description"
            label="Description"
            control={control}
          />

          {/* Image Alt */}
          <InputField name="section_2_email" label="Email" />

          {/* Image Text */}
          <InputField name="section_2_phone" label="Phone" />

          {/* Section 3 */}
          <h3 className="col-span-2 text-xl font-bold mt-6">Section 5</h3>

          {/* Heading */}
          <InputField name="section_3_title" label="Section 3 Heading" />
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

export default PropertyTypePageForm;
