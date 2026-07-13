// src/views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/AboutUs Page/AboutUsForm.jsx

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
  email: yup.string().required("email is required"),
  phone: yup.string().required("phone is required"),
  address: yup.string().required("Address is required"),
  credits: yup.string().required("Credits is required"),
  main_description: yup.string().required("Main Descripition is required"),
  social_links: yup.array().of(
    yup.object().shape({
      icon: yup
        .mixed()
        .nullable(),
      url: yup.string().required("Url  is required"),
    })
  ),
  main_links: yup.array().of(
    yup.object().shape({
      url: yup.string().required("Url  is required"),
      name: yup.string().required("name  is required"),
    })
  ),
  great_palms: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Title  is required"),
      link: yup.string().required("link  is required"),
    })
  ),
});

const FooterSecForm = ({ editData, setStatus, setEditData, fetchData }) => {
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

        social_links: Array.isArray(editData?.social_links) && editData.social_links.length > 0
          ? editData.social_links.map(item => ({
            icon: item.icon,
            url: item.url,
          }))
          : [],
        main_links: Array.isArray(editData?.main_links) && editData.main_links.length > 0
          ? editData.main_links.map(item => ({
            name: item.name,
            url: item.url,
          }))
          : [],
        great_palms: Array.isArray(editData?.great_palms) && editData.great_palms.length > 0
          ? editData.great_palms.map(item => ({
            title: item.title,
            link: item.link,
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
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("credits", data.credits);
      formData.append("main_description", data.main_description);
      formData.append("address", data.address);
      // Append section_3_images array
      if (
        Array.isArray(data.social_links) &&
        data.social_links.length > 0
      ) {
        data.social_links.forEach((item, index) => {
          if (item.icon && item.icon[0]) {
            formData.append(
              `social_links[${index}][icon]`,
              item.icon[0]
            );
          } else {
            formData.append(
              `social_links[${index}][icon]`,
              item.icon
            );
          }
          formData.append(
            `social_links[${index}][url]`,
            item.url
          );
        });
      }


      if (
        Array.isArray(data.great_palms) &&
        data.great_palms.length > 0
      ) {
        data.great_palms.forEach((item, index) => {

          formData.append(
            `great_palms[${index}][title]`,
            item.title
          );
          formData.append(
            `great_palms[${index}][link]`,
            item.link
          );
        });
      }
      if (
        Array.isArray(data.main_links) &&
        data.main_links.length > 0
      ) {
        data.main_links.forEach((item, index) => {

          formData.append(
            `main_links[${index}][name]`,
            item.name
          );
          formData.append(
            `main_links[${index}][url]`,
            item.url
          );
        });
      }



      //   console.log("FormData prepared =>", formData);

      // Call your API here using axiosClient
      const response = await axiosClient.post(
        `admin/footer/save`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success == true) {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Section 1 Title */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...methods.register("email")}
                className={`rounded p-3 text-base border ${methods.formState.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
                  } outline-none`}
              />
              {methods.formState.errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.email.message}
                </span>
              )}
            </div>


            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                {...methods.register("phone")}
                className={`rounded p-3 text-base border ${methods.formState.errors.phone
                  ? "border-red-500"
                  : "border-gray-300"
                  } outline-none`}
              />
              {methods.formState.errors.phone && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.phone.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                {...methods.register("address")}
                className={`rounded p-3 text-base border ${methods.formState.errors.address
                  ? "border-red-500"
                  : "border-gray-300"
                  } outline-none`}
              />
              {methods.formState.errors.address && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.address.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Credits
              </label>
              <input
                {...methods.register("credits")}
                className={`rounded p-3 text-base border ${methods.formState.errors.credits
                  ? "border-red-500"
                  : "border-gray-300"
                  } outline-none`}
              />
              {methods.formState.errors.credits && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.credits.message}
                </span>
              )}
            </div>


            {/* Section 1 Description - using Quill */}
            <div className="flex flex-col">
              <QuillField
                control={methods.control}
                name="main_description"
                label="Main Description"
                rules={{ required: "main_description is required" }}
              />
              {methods.formState.errors.main_description && (
                <span className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.main_description.message}
                </span>
              )}
            </div>

          </div>

          {/* Section 3 Images Array */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Social Links
            </label>

            {methods.watch("social_links", []).map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 mb-4 items-center"
              >
                <div>
                  <input
                    type="file"
                    {...methods.register(
                      `social_links.${index}.icon`
                    )}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Url
                  </label>
                  <input
                    {...methods.register(`social_links.${index}.url`)}
                    className="rounded p-3 border border-gray-300 outline-none"
                    placeholder="url"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-1 rounded mt-6"
                    onClick={() => {
                      const currentImages =
                        methods.getValues("social_links");
                      const updatedImages = currentImages.filter(
                        (_, i) => i !== index
                      );
                      methods.setValue("social_links", updatedImages);
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
                methods.setValue("social_links", [
                  ...(methods.getValues("social_links") || []),
                  { icon: null, url: "", },
                ]);
              }}
            >
              Add Social Link
            </button>
          </div>


          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Main Links
            </label>

            {methods.watch("main_links", []).map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 mb-4 items-center"
              >
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    {...methods.register(`main_links.${index}.name`)}
                    className="rounded p-3 border border-gray-300 outline-none"
                    placeholder="name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Url
                  </label>
                  <input
                    {...methods.register(`main_links.${index}.url`)}
                    className="rounded p-3 border border-gray-300 outline-none"
                    placeholder="url"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-1 rounded mt-6"
                    onClick={() => {
                      const currentImages =
                        methods.getValues("main_links");
                      const updatedImages = currentImages.filter(
                        (_, i) => i !== index
                      );
                      methods.setValue("main_links", updatedImages);
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
                methods.setValue("main_links", [
                  ...(methods.getValues("main_links") || []),
                  { name: "", url: "", },
                ]);
              }}
            >
              Add Main Link
            </button>
          </div>



          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
            Great Palm Links
            </label>

            {methods.watch("great_palms", []).map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 mb-4 items-center"
              >
               
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    {...methods.register(`great_palms.${index}.title`)}
                    className="rounded p-3 border border-gray-300 outline-none"
                    placeholder="title"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Link
                  </label>
                  <input
                    {...methods.register(`great_palms.${index}.link`)}
                    className="rounded p-3 border border-gray-300 outline-none"
                    placeholder="link"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-1 rounded mt-6"
                    onClick={() => {
                      const currentImages =
                        methods.getValues("great_palms");
                      const updatedImages = currentImages.filter(
                        (_, i) => i !== index
                      );
                      methods.setValue("great_palms", updatedImages);
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
                methods.setValue("great_palms", [
                  ...(methods.getValues("great_palms") || []),
                  { title: "", link: "", },
                ]);
              }}
            >
              Add Great Palms Link
            </button>
          </div>



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

export default FooterSecForm;
