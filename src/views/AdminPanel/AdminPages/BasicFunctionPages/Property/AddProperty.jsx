import React, { useEffect, useRef, useState } from "react";
import BasicInput from "../../../AdminComponents/Inputs/BasicInput";
import axiosClient from "../../../../../axiosClient";
import JoditEditor from "jodit-react";
import BlueButtonAdmin from "../../../AdminComponents/Btns/BlueButtonAdmin";
import { set } from "react-hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const validationSchema = yup.object({
  schema: yup
    .string()
    .nullable()
    .test("is-json", "Schema must be valid JSON or empty", (value) => {
      if (!value || value.trim() === "") return true;
      try {
        let parsed = JSON.parse(value);

        // Handle case where it's a stringified JSON inside a string
        if (typeof parsed === "string") {
          parsed = JSON.parse(parsed);
        }

        // Ensure it's an object or array, not just a primitive
        return typeof parsed === "object" && parsed !== null;
      } catch {
        return false;
      }
    }),
});



const listingTypeList = [
  { id: "buy", name: "Buy" },
  { id: "off-plan", name: "Off Plan" }
];

const handoverList = [
  { id: "hand-over-2026", name: "Hand Over 2026" },
  { id: "hand-over-2027", name: "Hand Over 2027" },
  { id: "hand-over-2028", name: "Hand Over 2028" }
];

const paymentPlanList = [
  { id: "payment-plan-80-20", name: "Payment Plan 80/20" },
  { id: "payment-plan-70-30", name: "Payment Plan 70/30" },
  { id: "payment-plan-60-40", name: "Payment Plan 60/40" }
];

const frondList = [
  { id: "frond-a", name: "Frond A" },
  { id: "frond-b", name: "Frond B" },
  { id: "frond-c", name: "Frond C" },
  { id: "frond-d", name: "Frond D" },
  { id: "frond-e", name: "Frond E" },
  { id: "frond-f", name: "Frond F" },
  { id: "frond-g", name: "Frond G" },
  { id: "frond-h", name: "Frond H" },
  { id: "frond-i", name: "Frond I" },
  { id: "frond-j", name: "Frond J" },
  { id: "frond-k", name: "Frond K" },
  { id: "frond-l", name: "Frond L" },
  { id: "frond-m", name: "Frond M" },
  { id: "frond-n", name: "Frond N" },
  { id: "frond-o", name: "Frond O" },
  { id: "frond-p", name: "Frond P" }
];

const villaTypeList = [
  { id: "beach-villas", name: "Beach Villas" },
  { id: "coral-villas", name: "Coral Villas" }
];

const propertyFeatureList = [
  { id: "sea-front", name: "Sea Front" },
  { id: "garden-view", name: "Garden View" }
];



const AddProperty = () => {
  const [propCat, setPropCat] = useState([]);
  const [propDev, setPropDev] = useState([]);
  const [proplocation, setProplocation] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectProp, setSelectProp] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    short_description: "",
    meta_title: "", //seo
    image: [],
    image_alt: "",
    image_text: "",
    meta_description: "", //seo
    canonical_url: "", //seo
    focus_keyword: "", //seo
    redirect_301: "", //seo
    redirect_302: "", //seo
    old_redirect_url: "", //seo
    schema: "", //seo
    developer_id: "",
    property_types_id: "",
    property_locations_name: "",
    square_feet: "",
    price: "",
    no_of_bedrooms: "",
    register_btn_link: "",
    footer_section_title: "",
    footer_section_description: "",
    footer_section_btn_1_text: "",
    footer_section_btn_1_link: "",
    footer_section_btn_2_text: "",
    footer_section_btn_2_link: "",
    footer_section_image_file: [],
    footer_section_image_alt: "",
    footer_section_image_text: "",
    broucher_file: [],
    listing_type: "",
    handover: "",
    payment_plan: "",
    frond: "",
    villa_type: "",
    property_feature: "",
    section_1_title: "",
    section_1_heading: "",
    section_1_image: [],
    section_1_image_alt: "",
    section_1_image_text: "",
    section_1_options: [
      {
        heading: "",
        description: "",
        image: [],
        image_alt: "",
        image_text: "",
      },
    ],
    section_2_heading: "",
    section_2_description: "",
    section_2_image: [],
    section_2_image_alt: "",
    section_2_image_text: "",
    section_3_title: "",
    section_3_heading: "",
    section_3_options: [
      {
        heading: "",
        description: "",
        image: [],
        image_alt: "",
        image_text: "",
      },
    ],
    section_4_heading: "",
    section_4_description: "",
    section_4_interior_images: [
      {
        image: [],
        image_alt: "",
        image_text: "",
      },
    ],
    section_4_exterior_images: [
      {
        image: [],
        image_alt: "",
        image_text: "",
      },
    ],
    section_5_heading: "",
    section_5_description: "",
    section_5_image: [],
    section_5_image_alt: "",
    section_5_image_text: "",
    section_6_heading: "",
    section_6_options: [
      {
        text: "",
        image: [],
        image_alt: "",
        image_text: "",
      },
    ],
    section_7_heading: "",
    section_7_description: "",
    section_7_image: [],
    section_7_image_alt: "",
    section_7_image_text: "",
    section_7_options: [
      {
        percent: "",
        text: "",
        image: [],
        image_alt: "",
        image_text: "",
      },
    ],
    section_8_heading: "",
    floors: [
      {
        floor_number: "",
        floor_plan_image_alt: "",
        floor_plan_image_text: "",
        floor_plan_image: [],
        floor_plan_catalogue: [],
        square_feet: "",
      },
    ],
    section_9_heading: "",
    section_9_description: "",
    section_10_heading: "",
    section_10_description: "",
    section_9_image: [],
    section_9_image_alt: "",
    section_9_image_text: "",
    section_11_faqs: [
      {
        question: "",
        ans: "",
      },
    ],
  });

  const editor = useRef(null);
  const navigate = useNavigate();
  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      short_description: "",
      meta_title: "", //seo
      image: [],
      image_alt: "",
      image_text: "",
      meta_description: "", //seo
      canonical_url: "", //seo
      focus_keyword: "", //seo
      redirect_301: "", //seo
      redirect_302: "", //seo
      old_redirect_url: "", //seo
      schema: "", //seo
      developer_id: "",
      property_types_id: "",
      property_locations_name: "",
      square_feet: "",
      price: "",
      footer_section_title: "",
      footer_section_description: "",
      footer_section_btn_1_text: "",
      footer_section_btn_1_link: "",
      footer_section_btn_2_text: "",
      footer_section_btn_2_link: "",
      footer_section_image_file: [],
      footer_section_image_alt: "",
      footer_section_image_text: "",
      no_of_bedrooms: "",
      section_10_heading: "",
      section_10_description: "",
      register_btn_link: "",
      broucher_file: [],
      listing_type: "",
      handover: "",
      payment_plan: "",
      frond: "",
      villa_type: "",
      property_feature: "",
      section_1_title: "",
      section_1_heading: "",
      section_1_image: [],
      section_1_image_alt: "",
      section_1_image_text: "",
      section_1_options: [
        {
          heading: "",
          description: "",
          image: [],
          image_alt: "",
          image_text: "",
        },
      ],
      section_2_heading: "",
      section_2_description: "",
      section_2_image: [],
      section_2_image_alt: "",
      section_2_image_text: "",
      section_3_title: "",
      section_3_heading: "",
      section_3_options: [
        {
          heading: "",
          description: "",
          image: [],
          image_alt: "",
          image_text: "",
        },
      ],
      section_4_heading: "",
      section_4_description: "",
      section_4_interior_images: [
        {
          image: [],
          image_alt: "",
          image_text: "",
        },
      ],
      section_4_exterior_images: [
        {
          image: [],
          image_alt: "",
          image_text: "",
        },
      ],
      section_5_heading: "",
      section_5_description: "",
      section_5_image: [],
      section_5_image_alt: "",
      section_5_image_text: "",
      section_6_heading: "",
      section_6_options: [
        {
          text: "",
          image: [],
          image_alt: "",
          image_text: "",
        },
      ],
      section_7_heading: "",
      section_7_description: "",
      section_7_image: [],
      section_7_image_alt: "",
      section_7_image_text: "",
      section_7_options: [
        {
          percent: "",
          text: "",
          image: [],
          image_alt: "",
          image_text: "",
        },
      ],
      section_8_heading: "",
      floors: [
        {
          floor_number: "",
          floor_plan_image_alt: "",
          floor_plan_image_text: "",
          floor_plan_image: [],
          floor_plan_catalogue: [],
          square_feet: "",
        },
      ],
      section_9_heading: "",
      section_9_description: "",
      section_9_image: [],
      section_9_image_alt: "",
      section_9_image_text: "",
      section_11_faqs: [
        {
          question: "",
          ans: "",
        },
      ],
    });
    setIsEdit(false);
    setSelectProp(null);
  };
  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    if (name === "schema") {
      try {
        await validationSchema.validateAt("schema", { schema: value });
        setErrors((prev) => ({ ...prev, schema: "" }));
      } catch (err) {
        setErrors((prev) => ({ ...prev, schema: err.message }));
      }
    }
  };

  const handleOptionChange = (section, e, index) => {
    const { name, value, type, files } = e.target;
    if (section == "1") {
      const updatedlists = [...formData.section_1_options];
      type == "file"
        ? (updatedlists[index][name] = files[0])
        : (updatedlists[index][name] = value);
      setFormData((prev) => ({
        ...prev,
        section_1_options: updatedlists,
      }));
    } else if (section == "3") {
      const updatedlists = [...formData.section_3_options];
      type == "file"
        ? (updatedlists[index][name] = files[0])
        : (updatedlists[index][name] = value);
      setFormData((prev) => ({
        ...prev,
        section_3_options: updatedlists,
      }));
    } else if (section == "4.1") {
      const updatedlists = [...formData.section_4_interior_images];
      type == "file"
        ? (updatedlists[index][name] = files[0])
        : (updatedlists[index][name] = value);
      setFormData((prev) => ({
        ...prev,
        section_4_interior_images: updatedlists,
      }));
    } else if (section == "4.2") {
      const updatedlists = [...formData.section_4_exterior_images];
      type == "file"
        ? (updatedlists[index][name] = files[0])
        : (updatedlists[index][name] = value);
      setFormData((prev) => ({
        ...prev,
        section_4_exterior_images: updatedlists,
      }));
    } else if (section == "6") {
      const updatedlists = [...formData.section_6_options];
      type == "file"
        ? (updatedlists[index][name] = files[0])
        : (updatedlists[index][name] = value);
      setFormData((prev) => ({
        ...prev,
        section_6_options: updatedlists,
      }));
    } else if (section == "7") {
      const updatedlists = [...formData.section_7_options];
      type == "file"
        ? (updatedlists[index][name] = files[0])
        : (updatedlists[index][name] = value);
      setFormData((prev) => ({
        ...prev,
        section_7_options: updatedlists,
      }));
    } else if (section == "8") {
      const updatedlists = [...formData.floors];
      type == "file"
        ? (updatedlists[index][name] = files[0])
        : (updatedlists[index][name] = value);
      setFormData((prev) => ({
        ...prev,
        floors: updatedlists,
      }));
    } else if (section == "11") {
      const updatedlists = [...formData.section_11_faqs];
      updatedlists[index][name] = value;
      setFormData((prev) => ({
        ...prev,
        section_11_faqs: updatedlists,
      }));
    }
    console.log(formData);
  };
  const handleDescriptionChange = (value, section) => {
    if (section == 2) {
      setFormData((prev) => ({ ...prev, section_2_description: value }));
    } else if (section == 5) {
      setFormData((prev) => ({ ...prev, section_5_description: value }));
    } else if (section == 7) {
      setFormData((prev) => ({ ...prev, section_7_description: value }));
    } else if (section == 9) {
      setFormData((prev) => ({ ...prev, footer_section_description: value }));
    } else {
      setFormData((prev) => ({ ...prev, section_9_description: value }));
    }
    console.log(formData);
  };
  const handleFAQDescription = (value, index) => {
    const updatedlists = [...formData.section_11_faqs];
    updatedlists[index].ans = value;
    setFormData((prev) => ({
      ...prev,
      section_11_faqs: updatedlists,
    }));
    console.log(formData.section_11_faqs);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if errors object is empty
    //   if (Object.keys(errors).length === 0) {
    // console.log("Err",errors)
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) {
      alert("No access token found");
      return;
    }

    setIsCreating(true);

    try {
      const formData2 = new FormData();

      //  Basic fields
      formData2.append("name", formData.name);
      formData2.append("slug", formData.slug);
      formData2.append("short_description", formData.short_description);
      formData2.append("meta_title", formData.meta_title);
      formData2.append("focus_keyword", formData.focus_keyword);
      formData2.append("redirect_301", formData.redirect_301);
      formData2.append("redirect_302", formData.redirect_302);
      formData2.append("old_redirect_url", formData.old_redirect_url);
      formData2.append("schema", formData.schema);
      formData2.append("meta_description", formData.meta_description);
      formData2.append("canonical_url", formData.canonical_url);
      formData2.append("developer_id", formData.developer_id);
      formData2.append("property_types_id", formData.property_types_id);
      formData2.append(
        "property_locations_name",
        formData.property_locations_name
      );
      formData2.append("square_feet", formData.square_feet);
      formData2.append("price", formData.price);
      formData2.append("no_of_bedrooms", formData.no_of_bedrooms);
      formData2.append("register_btn_link", formData.register_btn_link);
      formData2.append("image", formData.image);
      formData2.append("broucher_file", formData.broucher_file);
      formData2.append("image_alt", formData.image_alt);
      formData2.append("image_text", formData.image_text);
      formData2.append("listing_type", formData.listing_type);
      formData2.append("handover", formData.handover);
      formData2.append("payment_plan", formData.payment_plan);
      formData2.append("frond", formData.frond);
      formData2.append("villa_type", formData.villa_type);
      formData2.append("property_feature", formData.property_feature);

      //  Section 1
      formData2.append("section_1_title", formData.section_1_title);
      formData2.append("section_1_heading", formData.section_1_heading);
      formData2.append("section_1_image", formData.section_1_image);
      formData2.append("section_1_image_alt", formData.section_1_image_alt);
      formData2.append("section_1_image_text", formData.section_1_image_text);
      if (formData.section_1_options) {
        formData.section_1_options?.forEach((item, index) => {
          formData2.append(
            `section_1_options[${index}][heading]`,
            item.heading
          );
          formData2.append(
            `section_1_options[${index}][description]`,
            item.description
          );
          formData2.append(`section_1_options[${index}][image]`, item.image);
          formData2.append(
            `section_1_options[${index}][image_alt]`,
            item.image_alt
          );
          formData2.append(
            `section_1_options[${index}][image_text]`,
            item.image_text
          );
        });
      }

      //  Section 2
      formData2.append("section_2_heading", formData.section_2_heading);
      formData2.append("section_2_description", formData.section_2_description);
      formData2.append("section_2_image", formData.section_2_image);
      formData2.append("section_2_image_alt", formData.section_2_image_alt);
      formData2.append("section_2_image_text", formData.section_2_image_text);
      formData2.append("footer_section_title", formData.footer_section_title);
      formData2.append("footer_section_description", formData.footer_section_description);
      formData2.append("footer_section_image_alt", formData.footer_section_image_alt);
      formData2.append("footer_section_image_text", formData.footer_section_image_text);
      formData2.append("footer_section_btn_1_text", formData.footer_section_btn_1_text);
      formData2.append("footer_section_btn_1_link", formData.footer_section_btn_1_link);
      formData2.append("footer_section_btn_2_text", formData.footer_section_btn_2_text);
      formData2.append("footer_section_btn_2_link", formData.footer_section_btn_2_link);

      // Append files if exist
      // if (formData.footer_section_image_file && formData.footer_section_image_file[0]) {
        formData2.append("footer_section_image_file", formData.footer_section_image_file[0]);
      // }
      //  Section 3
      formData2.append("section_3_title", formData.section_3_title);
      formData2.append("section_3_heading", formData.section_3_heading);
      if (formData.section_3_options) {
        formData.section_3_options?.forEach((item, index) => {
          formData2.append(
            `section_3_options[${index}][heading]`,
            item.heading
          );
          formData2.append(
            `section_3_options[${index}][description]`,
            item.description
          );
          formData2.append(`section_3_options[${index}][image]`, item.image);
          formData2.append(
            `section_3_options[${index}][image_alt]`,
            item.image_alt
          );
          formData2.append(
            `section_3_options[${index}][image_text]`,
            item.image_text
          );
        });
      }

      // Section 4
      formData2.append("section_4_heading", formData.section_4_heading);
      formData2.append("section_4_description", formData.section_4_description);
      if (formData.section_4_interior_images) {
        formData.section_4_interior_images?.forEach((item, index) => {
          formData2.append(
            `section_4_interior_images[${index}][image]`,
            item.image
          );
          formData2.append(
            `section_4_interior_images[${index}][image_alt]`,
            item.image_alt
          );
          formData2.append(
            `section_4_interior_images[${index}][image_text]`,
            item.image_text
          );
        });
      }
      if (formData.section_4_exterior_images) {
        formData.section_4_exterior_images?.forEach((item, index) => {
          formData2.append(
            `section_4_exterior_images[${index}][image]`,
            item.image
          );
          formData2.append(
            `section_4_exterior_images[${index}][image_alt]`,
            item.image_alt
          );
          formData2.append(
            `section_4_exterior_images[${index}][image_text]`,
            item.image_text
          );
        });
      }

      // Section 5
      formData2.append("section_5_heading", formData.section_5_heading);
      formData2.append("section_5_description", formData.section_5_description);
      formData2.append("section_5_image", formData.section_5_image);
      formData2.append("section_5_image_alt", formData.section_5_image_alt);
      formData2.append("section_5_image_text", formData.section_5_image_text);

      // Section 6
      formData2.append("section_6_heading", formData.section_6_heading);
      if (formData.section_6_options) {
        formData.section_6_options?.forEach((item, index) => {
          formData2.append(`section_6_options[${index}][text]`, item.text);
          formData2.append(`section_6_options[${index}][image]`, item.image);
          formData2.append(
            `section_6_options[${index}][image_alt]`,
            item.image_alt
          );
          formData2.append(
            `section_6_options[${index}][image_text]`,
            item.image_text
          );
        });
      }

      // Section 7
      formData2.append("section_7_heading", formData.section_7_heading);
      formData2.append("section_7_description", formData.section_7_description);
      formData2.append("section_7_image", formData.section_7_image);
      formData2.append("section_7_image_alt", formData.section_7_image_alt);
      formData2.append("section_7_image_text", formData.section_7_image_text);
      if (formData.section_7_options) {
        formData.section_7_options?.forEach((item, index) => {
          formData2.append(`section_7_options[${index}][text]`, item.text);
          formData2.append(
            `section_7_options[${index}][percent]`,
            item.percent
          );
          formData2.append(`section_7_options[${index}][image]`, item.image);
          formData2.append(
            `section_7_options[${index}][image_alt]`,
            item.image_alt
          );
          formData2.append(
            `section_7_options[${index}][image_text]`,
            item.image_text
          );
        });
      }

      //Section 8
      formData2.append("section_8_heading", formData.section_8_heading);
      if (formData.floors) {
        formData.floors?.forEach((item, index) => {
          formData2.append(`floors[${index}][floor_number]`, item.floor_number);
          formData2.append(`floors[${index}][square_feet]`, item.square_feet);
          formData2.append(
            `floors[${index}][floor_plan_image_alt]`,
            item.floor_plan_image_alt
          );
          formData2.append(
            `floors[${index}][floor_plan_image_text]`,
            item.floor_plan_image_text
          );
          formData2.append(
            `floors[${index}][floor_plan_image]`,
            item.floor_plan_image
          );
          formData2.append(
            `floors[${index}][floor_plan_catalogue]`,
            item.floor_plan_catalogue
          );
          formData2.append(
            `floors[${index}][floor_plan_catalogue]`,
            item.floor_plan_catalogue
          );
        });
      }

      // Section 9
      formData2.append("section_9_heading", formData.section_9_heading);
      formData2.append("section_9_description", formData.section_9_description);
      formData2.append("section_9_image", formData.section_9_image);
      formData2.append("section_9_image_alt", formData.section_9_image_alt);
      formData2.append("section_9_image_text", formData.section_9_image_text);

      formData2.append("section_10_heading", formData.section_10_heading);
      formData2.append("section_10_description", formData.section_10_description);
      // Section 11

      if (formData.section_11_faqs) {
        formData.section_11_faqs?.forEach((faq, index) => {
          formData2.append(`section_11_faqs[${index}][question]`, faq.question);
          formData2.append(`section_11_faqs[${index}][ans]`, faq.ans);
        });
      }

      const response = await axiosClient.post(
        "/admin/property/store",
        formData2,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const res = response.data;
      console.log(res);
      if (res.status == true) {
        Swal.fire("Success", res.message, "success");
        console.log(res.message, res);
        resetForm();
        navigate("/admin/property");
      } else {
        console.log(res.message);
        let errorMessage = "Something went wrong. Please try again.";
        // ✅ If validation errors are present
  if (res.message && typeof res.message === "object") {
    const messages = Object.values(res.message)
      .flat() // combine arrays
      // .join("<br>"); // format with line breaks for SweetAlert HTML
    errorMessage = messages;
  } else if (res.message) {
    // fallback for simple messages
    errorMessage = res.message;
  }
        Swal.fire({
        icon: "error",
        text: errorMessage,
      });
      }
      // Swal.fire("Success", "Blog created Successfully!", "success");
      // navigate("/admin/blogs");
      console.log("success");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create Blog. Please try again.";
      console.log(errorMessage);
      // Swal.fire("Error", errorMessage, "error");
      // setError(errorMessage);
    } finally {
      setIsCreating(false); // 👈 hide loading state
    }
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Validation Error",
    //     text: "Schema must be valid JSON or empty.",
    //   });
    // }
  };

  const handleClickOption = (reason, section, index) => {
    if (section == "1") {
      if (reason == "add") {
        setFormData((prev) => ({
          ...prev,
          section_1_options: [
            ...prev.section_1_options,
            {
              heading: "",
              description: "",
              image: [],
              image_alt: "",
              image_text: "",
            },
          ],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          section_1_options: prev.section_1_options.filter(
            (_, i) => i !== index
          ),
        }));
      }
    } else if (section == "3") {
      if (reason == "add") {
        setFormData((prev) => ({
          ...prev,
          section_3_options: [
            ...prev.section_3_options,
            {
              heading: "",
              description: "",
              image: [],
              image_alt: "",
              image_text: "",
            },
          ],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          section_3_options: prev.section_3_options.filter(
            (_, i) => i !== index
          ),
        }));
      }
    } else if (section == "4.1") {
      if (reason == "add") {
        setFormData((prev) => ({
          ...prev,
          section_4_interior_images: [
            ...prev.section_4_interior_images,
            {
              image: [],
              image_alt: "",
              image_text: "",
            },
          ],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          section_4_interior_images: prev.section_4_interior_images.filter(
            (_, i) => i !== index
          ),
        }));
      }
    } else if (section == "4.2") {
      if (reason == "add") {
        setFormData((prev) => ({
          ...prev,
          section_4_exterior_images: [
            ...prev.section_4_exterior_images,
            {
              image: [],
              image_alt: "",
              image_text: "",
            },
          ],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          section_4_exterior_images: prev.section_4_exterior_images.filter(
            (_, i) => i !== index
          ),
        }));
      }
    } else if (section == "6") {
      if (reason == "add") {
        setFormData((prev) => ({
          ...prev,
          section_6_options: [
            ...prev.section_6_options,
            {
              text: "",
              image: [],
              image_alt: "",
              image_text: "",
            },
          ],
        }));
      }
       else {
        setFormData((prev) => ({
          ...prev,
          section_6_options: prev.section_6_options.filter(
            (_, i) => i !== index
          ),
        }));
      }
    } else if (section == "7") {
      if (reason == "add") {
        setFormData((prev) => ({
          ...prev,
          section_7_options: [
            ...prev.section_7_options,
            {
              percent: "",
              text: "",
              image: [],
              image_alt: "",
              image_text: "",
            },
          ],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          section_7_options: prev.section_7_options.filter(
            (_, i) => i !== index
          ),
        }));
      }
    } else if (section == "8") {
      if (reason == "add") {
        setFormData((prev) => ({
          ...prev,
          floors: [
            ...prev.floors,
            {
              floor_number: "",
              floor_plan_image_alt: "",
              floor_plan_image_text: "",
              floor_plan_image: [],
              floor_plan_catalogue: [],
            },
          ],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          floors: prev.floors.filter((_, i) => i !== index),
        }));
      }
    } else if (section == "11") {
      if (reason == "add") {
        setFormData((prev) => ({
          ...prev,
          section_11_faqs: [
            ...prev.section_11_faqs,
            {
              question: "",
              ans: "",
            },
          ],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          section_11_faqs: prev.section_11_faqs.filter((_, i) => i !== index),
        }));
      }
    }
  };
  // for Fetching Develpoer List

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
  const fetchDevelopers = async () => {
    try {
      const res = await axiosClient.get("/developers/1");
      console.log(res.data.data);
      var response = res.data.data;
      setPropDev(response);
    } catch { }
  };
  useEffect(() => {
    fetchCategory();
    fetchDevelopers();
    setProplocation(locationList);
  }, []);

  return (
    <div className="mx-auto p-3" style={{ width: "100%" }}>
      <div className="bg-white flex flex-col gap-10 justify-between shadow-md rounded-lg p-6 mb-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col gap-10 justify-between"
        >
          <div className="flex flex-col gap-5">
            {/* Main Information */}

            <div className="flex flex-col gap-5 border-t pt-5">
              <div>
                <h2 className="text-2xl  font-bold font-palm">
                  Property Main Detils
                </h2>
              </div>
              <div className="flex justify-between flex-col gap-3">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Property Name
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        placeholder="Enter Property Name"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Property Slug
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Property Slug"
                        name="slug"
                        onChange={handleChange}
                        value={formData.slug}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2 justfify-between  ">
                      <label className="text-sm text-gray-700">
                        Select Developer Name
                      </label>
                      <div>
                        <select
                          name="developer_id"
                          required
                          value={formData.developer_id}
                          onChange={handleChange}
                          className={`rounded p-3 text-base border outline-none border-gray-300 w-full`}
                        >
                          <option value="">Select Developer Name</option>
                          {propDev.map((data, i) => (
                            <option value={data.id} key={data.id}>
                              {data.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2 justfify-between  ">
                      <label className="text-sm text-gray-700">
                        Select Property Type
                      </label>
                      <div>
                        <select
                          name="property_types_id"
                          required
                          value={formData.property_types_id}
                          onChange={handleChange}
                          className={`rounded p-3 text-base border outline-none border-gray-300 w-full`}
                        >
                          <option value="">Select Property Type</option>
                          {propCat.map((data, i) => (
                            <option value={data.id} key={data.id}>
                              {data.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2 justfify-between  ">
                      <label className="text-sm text-gray-700">
                        Select Property Location
                      </label>
                      <div>
                        <select
                          name="property_locations_name"
                          required
                          value={formData.property_locations_name}
                          onChange={handleChange}
                          className={`rounded p-3 text-base border outline-none border-gray-300 w-full`}
                        >
                          <option value="">Select Property Location</option>
                          {proplocation.map((data, i) => (
                            <option value={data.name} key={data.name}>
                              {data.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Main Image
                      </label>
                      <input
                        required
                        className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Main Image Url"
                        // accept="image/*"
                        name="image"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Main Image Alt
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Main Image Alt"
                        name="image_alt"
                        onChange={handleChange}
                        value={formData.image_alt}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Main Image Text
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 1 Image Text"
                        name="image_text"
                        onChange={handleChange}
                        value={formData.image_text}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Property Short Description
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Property Short Description"
                        name="short_description"
                        onChange={handleChange}
                        value={formData.short_description}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Square Feet
                      </label>
                      <input
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Square Feet"
                        name="square_feet"
                        onChange={handleChange}
                        value={formData.square_feet}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">Price</label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="number"
                        placeholder="Enter Price"
                        name="price"
                        onChange={handleChange}
                        value={formData.price}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        No Of Bedrooms / Floors
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter No Of Bedrooms"
                        name="no_of_bedrooms"
                        onChange={handleChange}
                        value={formData.no_of_bedrooms}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Register Btn Link
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="url"
                        placeholder="Enter Register Btn Link"
                        name="register_btn_link"
                        onChange={handleChange}
                        value={formData.register_btn_link}
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Broucher File
                      </label>
                      <input
                        required
                        className="rounded p-3  text-gray-500 text-base border outline-none border-gray-300 w-full"
                        type="file"
                        accept="application/pdf"
                        name="broucher_file"
                        // onChange={handleChange}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file && file.type !== "application/pdf") {
                            Swal.fire({
                              icon: "error",
                              title: "Invalid File",
                              text: "Only PDF files are allowed.",
                            });
                            e.target.value = ""; // reset file input
                            return;
                          }
                          handleChange(e); // only call your handler if PDF is valid
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">Listing Type</label>
                      <select
                        name="listing_type"
                        value={formData.listing_type}
                        onChange={handleChange}
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                      >
                        <option value="">Select Listing Type</option>
                        {listingTypeList.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">Handover Year</label>
                      <select
                        name="handover"
                        value={formData.handover}
                        onChange={handleChange}
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                      >
                        <option value="">Select Handover Year</option>
                        {handoverList.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">Payment Plan</label>
                      <select
                        name="payment_plan"
                        value={formData.payment_plan}
                        onChange={handleChange}
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                      >
                        <option value="">Select Payment Plan</option>
                        {paymentPlanList.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">Frond</label>
                      <select
                        name="frond"
                        value={formData.frond}
                        onChange={handleChange}
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                      >
                        <option value="">Select Frond</option>
                        {frondList.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">Villa Type</label>
                      <select
                        name="villa_type"
                        value={formData.villa_type}
                        onChange={handleChange}
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                      >
                        <option value="">Select Villa Type</option>
                        {villaTypeList.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">Property Feature</label>
                      <select
                        name="property_feature"
                        value={formData.property_feature}
                        onChange={handleChange}
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                      >
                        <option value="">Select Property Feature</option>
                        {propertyFeatureList.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Deatils */}

            <div className="flex flex-col gap-5 border-t pt-5">
              <div>
                <h2 className="text-2xl  font-bold font-palm">
                  Property SEO Detils
                </h2>
              </div>
              <div className="flex justify-between flex-col gap-3">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Meta Title
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Blog Category Meta title"
                        name="meta_title"
                        onChange={handleChange}
                        value={formData.meta_title}
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Meta Description
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Blog Category Meta description"
                        name="meta_description"
                        onChange={handleChange}
                        value={formData.meta_description}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Canonical URL
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Blog Tags Canonical URL"
                        name="canonical_url"
                        onChange={handleChange}
                        value={formData.canonical_url}
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Focus Keyword
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Blog Tgs Focus Keyword seprated by Comma "
                        name="focus_keyword"
                        onChange={handleChange}
                        value={formData.focus_keyword}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Redirect 301
                      </label>
                      <input

                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Blog Tags Redirect 301"
                        name="redirect_301"
                        onChange={handleChange}
                        value={formData.redirect_301}
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Redirect 302
                      </label>
                      <input

                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Blog Tgs Redirect 302  "
                        name="redirect_302"
                        onChange={handleChange}
                        value={formData.redirect_302}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Old Redirect URL
                      </label>
                      <input

                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Blog Tags Old Redirect URL"
                        name="old_redirect_url"
                        onChange={handleChange}
                        value={formData.old_redirect_url}
                      />
                    </div>
                  </div>
                  {/* <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">Schema</label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Blog Tgs Schema"
                        name="schema"
                        onChange={handleChange}
                        value={formData.schema || ""}
                      />
                       {errors.schema && (
      <p className="text-red-500 text-sm">{errors.schema}</p>
    )}
                    </div>
                  </div> */}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">Schema</label>
                      <input
                        className={`rounded p-3 text-base border outline-none w-full ${errors.schema ? "border-red-500" : "border-gray-300"
                          }`}
                        type="text"
                        placeholder="Enter Blog Tgs Schema"
                        name="schema"
                        onChange={handleChange}
                        value={formData.schema || ""}
                      />
                      {errors.schema && (
                        <p className="text-red-500 text-sm">{errors.schema}</p>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Section 1 */}

            <div className="flex flex-col gap-5 border-t pt-5">
              <div>
                <h2 className="text-2xl  font-bold font-palm">
                  Property Section 1
                </h2>
              </div>
              <div className="flex justify-between flex-col gap-3">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 1 Title
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 1 Title"
                        name="section_1_title"
                        onChange={handleChange}
                        value={formData.section_1_title}
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 1 Heading
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 1 Heading"
                        name="section_1_heading"
                        onChange={handleChange}
                        value={formData.section_1_heading}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 1 Image
                      </label>
                      {/* <input
                        required
                        className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                        type="file"
                        accept="image/*"
                        name="section_1_image"
                        onChange={handleChange}
                      /> */}
                      <input
                        type="text"
                        placeholder="Enter Section 1 Image Url"
                        required
                        name="section_1_image"
                        onChange={handleChange}
                        className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 1 Image Alt
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 1 Image Alt"
                        name="section_1_image_alt"
                        onChange={handleChange}
                        value={formData.section_1_image_alt}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 1 Image Text
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 1 Image Text"
                        name="section_1_image_text"
                        onChange={handleChange}
                        value={formData.section_1_image_text}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {formData.section_1_options.map((_, i) => (
                    <div
                      className="border p-5 rounded flex flex-col gap-3"
                      key={i}
                    >
                      {formData.section_1_options.length > 1 ? (
                        <div className="flex justify-end">
                          <div
                            onClick={() => handleClickOption("remove", 1, i)}
                            className="text-red-500 text-sm"
                          >
                            Remove
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="flex justify-between items-center gap-3">
                        <div className="w-1/2">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Heading
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Enter Heading"
                              name="heading"
                              onChange={(e) => handleOptionChange(1, e, i)}
                              value={formData.section_1_options[i].heading}
                            />
                          </div>
                        </div>
                        <div className="w-1/2">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Description
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Enter Description"
                              name="description"
                              onChange={(e) => handleOptionChange(1, e, i)}
                              value={formData.section_1_options[i].description}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Image
                            </label>
                            <input
                              required
                              className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                              type="text"
                        placeholder="Enter Image Url"
                              name="image"
                              onChange={(e) => handleOptionChange(1, e, i)}
                            />
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Image Alt
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Enter Image Alt"
                              name="image_alt"
                              onChange={(e) => handleOptionChange(1, e, i)}
                              value={formData.section_1_options[i].image_alt}
                            />
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Image Text
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Image Text"
                              name="image_text"
                              onChange={(e) => handleOptionChange(1, e, i)}
                              value={formData.section_1_options[i].image_text}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {formData.section_1_options.length < 4 ? (
                    <div className="flex justify-end ">
                      <div
                        onClick={() => handleClickOption("add", 1, 0)}
                        className=" bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 cursor-pointer md:text-sm text-xs text-white w-fit"
                      >
                        Add List
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2 */}

            <div className="flex flex-col gap-5 border-t pt-5">
              <div>
                <h2 className="text-2xl  font-bold font-palm">
                  Property Section 2
                </h2>
              </div>
              <div className="flex justify-between flex-col gap-3">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 2 Heading
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 2 Heading"
                        name="section_2_heading"
                        onChange={handleChange}
                        value={formData.section_2_heading}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <div className="flex flex-col gap-2 justfify-between  ">
                      <label className="text-sm text-gray-700">
                        Section 2 Description
                      </label>
                      <div>
                        <JoditEditor
                          ref={editor}
                          tabIndex={1}
                          value={formData.section_2_description}
                          onChange={(newContent, e) => {
                            handleDescriptionChange(newContent, 2);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 2 Image
                      </label>
                      <input
                        required
                        className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 2 Image Url"
                        name="section_2_image"
                        onChange={handleChange}
                      // value={formData.section_1_image}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 2 Image Alt
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 2 Image Alt"
                        name="section_2_image_alt"
                        onChange={handleChange}
                        value={formData.section_2_image_alt}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 2 Image Text
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 2 Image Text"
                        name="section_2_image_text"
                        onChange={handleChange}
                        value={formData.section_2_image_text}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}

            <div className="flex flex-col gap-5 border-t pt-5">
              <div>
                <h2 className="text-2xl  font-bold font-palm">
                  Property Section 3
                </h2>
              </div>
              <div className="flex justify-between flex-col gap-3">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 3 Title
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 3 Title"
                        name="section_3_title"
                        onChange={handleChange}
                        value={formData.section_3_title}
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 3 Heading
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 3 Heading"
                        name="section_3_heading"
                        onChange={handleChange}
                        value={formData.section_3_heading}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {formData.section_3_options.map((_, i) => (
                    <div
                      className="border p-5 rounded flex flex-col gap-3"
                      key={i}
                    >
                      {formData.section_3_options.length > 1 ? (
                        <div className="flex justify-end">
                          <div
                            onClick={() => handleClickOption("remove", 3, i)}
                            className="text-red-500 text-sm"
                          >
                            Remove
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="flex justify-between items-center gap-3">
                        <div className="w-1/2">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Heading
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Enter Heading"
                              name="heading"
                              onChange={(e) => handleOptionChange(3, e, i)}
                              value={formData.section_3_options[i].heading}
                            />
                          </div>
                        </div>
                        <div className="w-1/2">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Description
                            </label>
                            <input
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Enter Description"
                              name="description"
                              onChange={(e) => handleOptionChange(3, e, i)}
                              value={formData.section_3_options[i].description}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Image
                            </label>
                            <input
                              required
                              className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                              type="text"
                        placeholder="Enter Image Url"
                              name="image"
                              onChange={(e) => handleOptionChange(3, e, i)}
                            />
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Image Alt
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Enter Image Alt"
                              name="image_alt"
                              onChange={(e) => handleOptionChange(3, e, i)}
                              value={formData.section_3_options[i].image_alt}
                            />
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Image Text
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Image Text"
                              name="image_text"
                              onChange={(e) => handleOptionChange(3, e, i)}
                              value={formData.section_3_options[i].image_text}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* {formData.section_3_options.length < 4 ? (  */}
                  <div className="flex justify-end ">
                    <div
                      onClick={() => handleClickOption("add", 3, 0)}
                      className=" bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 cursor-pointer md:text-sm text-xs text-white w-fit"
                    >
                      Add List
                    </div>
                  </div>
                  {/* ) : (
                    <></>
                  )} */}
                </div>
              </div>
            </div>

            {/* Section 4 */}

            <div className="flex flex-col gap-5 border-t pt-5">
              <div>
                <h2 className="text-2xl  font-bold font-palm">
                  Property Section 4
                </h2>
              </div>
              <div className="flex justify-between flex-col gap-3">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 4 Heading
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 4 Heading"
                        name="section_4_heading"
                        onChange={handleChange}
                        value={formData.section_4_heading}
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 4 Description
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 4 Description"
                        name="section_4_description"
                        onChange={handleChange}
                        value={formData.section_4_description}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {formData.section_4_interior_images.map((_, i) => (
                    <div
                      className="flex justify-between items-center gap-3"
                      key={i}
                    >
                      <div className="w-1/3">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm text-gray-700">
                            Interior Image
                          </label>
                          <input
                            required
                            className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                            type="text"
                        placeholder="Enter Interior Image Url"
                            name="image"
                            onChange={(e) => handleOptionChange(4.1, e, i)}
                          />
                        </div>
                      </div>
                      <div className="w-1/3">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm text-gray-700">
                            Interior Image Alt
                          </label>
                          <input
                            required
                            className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                            type="text"
                            placeholder="Enter Interior  Image Alt"
                            name="image_alt"
                            onChange={(e) => handleOptionChange(4.1, e, i)}
                            value={
                              formData.section_4_interior_images[i].image_alt
                            }
                          />
                        </div>
                      </div>
                      <div className="w-1/3">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm text-gray-700">
                            Interior Image Text
                          </label>
                          <input
                            required
                            className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                            type="text"
                            placeholder="Interior Image Text"
                            name="image_text"
                            onChange={(e) => handleOptionChange(4.1, e, i)}
                            value={
                              formData.section_4_interior_images[i].image_text
                            }
                          />
                        </div>
                      </div>
                      {formData.section_4_interior_images.length > 1 ? (
                        <div className="">
                          <div
                            onClick={() => handleClickOption("remove", 4.1, i)}
                            className="text-red-500 text-sm"
                          >
                            Remove
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                  {formData.section_4_interior_images.length < 7 ? (
                    <div className="flex justify-end ">
                      <div
                        onClick={() => handleClickOption("add", 4.1, 0)}
                        className=" bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 cursor-pointer md:text-sm text-xs text-white w-fit"
                      >
                        Add Img
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {formData.section_4_exterior_images.map((_, i) => (
                    <div
                      className="flex justify-between items-center gap-3"
                      key={i}
                    >
                      <div className="w-1/3">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm text-gray-700">
                            Exterior Image
                          </label>
                          <input
                            required
                            className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                            type="text"
                        placeholder="Enter Exterior Image Url"
                            name="image"
                            onChange={(e) => handleOptionChange(4.2, e, i)}
                          />
                        </div>
                      </div>
                      <div className="w-1/3">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm text-gray-700">
                            Exterior Image Alt
                          </label>
                          <input
                            required
                            className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                            type="text"
                            placeholder="Enter Exterior Image Alt"
                            name="image_alt"
                            onChange={(e) => handleOptionChange(4.2, e, i)}
                            value={
                              formData.section_4_exterior_images[i].image_alt
                            }
                          />
                        </div>
                      </div>
                      <div className="w-1/3">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm text-gray-700">
                            Exterior Image Text
                          </label>
                          <input
                            required
                            className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                            type="text"
                            placeholder="Exterior Image Text"
                            name="image_text"
                            onChange={(e) => handleOptionChange(4.2, e, i)}
                            value={
                              formData.section_4_exterior_images[i].image_text
                            }
                          />
                        </div>
                      </div>
                      {formData.section_4_exterior_images.length > 1 ? (
                        <div className="">
                          <div
                            className="text-red-500 text-sm"
                            onClick={() => handleClickOption("remove", 4.2, i)}
                          >
                            Remove
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                  {formData.section_4_exterior_images.length < 7 ? (
                    <div className="flex justify-end ">
                      <div
                        onClick={() => handleClickOption("add", 4.2, 0)}
                        className=" bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 cursor-pointer md:text-sm text-xs text-white w-fit"
                      >
                        Add Img
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>

            {/* Section 5 */}

            <div className="flex flex-col gap-5 border-t pt-5">
              <div>
                <h2 className="text-2xl  font-bold font-palm">
                  Property Section 5
                </h2>
              </div>
              <div className="flex justify-between flex-col gap-3">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 5 Heading
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 5 Heading"
                        name="section_5_heading"
                        onChange={handleChange}
                        value={formData.section_5_heading}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <div className="flex flex-col gap-2 justfify-between  ">
                      <label className="text-sm text-gray-700">
                        Section 5 Description
                      </label>
                      <div>
                        <JoditEditor
                          ref={editor}
                          tabIndex={1}
                          onChange={(newContent, e) => {
                            handleDescriptionChange(newContent, "5");
                          }}
                          value={formData.section_5_description}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 5 Image
                      </label>
                      <input
                        required
                        className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 5 Image Url"
                        name="section_5_image"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 5 Image Alt
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 5 Image Alt"
                        name="section_5_image_alt"
                        onChange={handleChange}
                        value={formData.section_5_image_alt}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 5 Image Text
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 5 Image Text"
                        name="section_5_image_text"
                        onChange={handleChange}
                        value={formData.section_5_image_text}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6 */}

            <div className="flex flex-col gap-5 border-t pt-5">
              <div>
                <h2 className="text-2xl  font-bold font-palm">
                  Property Section 6
                </h2>
              </div>
              <div className="flex justify-between flex-col gap-3">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 6 Heading
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 6 Heading"
                        name="section_6_heading"
                        onChange={handleChange}
                        value={formData.section_6_heading}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {formData.section_6_options.map((_, i) => (
                    <div
                      className="border p-5 rounded flex flex-col gap-3"
                      key={i}
                    >
                      {formData.section_6_options.length > 1 ? (
                        <div className="flex justify-end">
                          <div
                            className="text-red-500 text-sm"
                            onClick={() => handleClickOption("remove", 6, i)}
                          >
                            Remove
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="flex justify-between items-center gap-3">
                        <div className="w-2/2">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Title
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Enter title"
                              name="text"
                              onChange={(e) => handleOptionChange(6, e, i)}
                              value={formData.section_6_options[i].text}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Image
                            </label>
                            <input
                              required
                              className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                              type="text"
                        placeholder="Enter Image Url"
                              name="image"
                              onChange={(e) => handleOptionChange(6, e, i)}
                            />
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Image Alt
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Enter Image Alt"
                              name="image_alt"
                              onChange={(e) => handleOptionChange(6, e, i)}
                              value={formData.section_6_options[i].image_alt}
                            />
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Image Text
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Image Text"
                              name="image_text"
                              onChange={(e) => handleOptionChange(6, e, i)}
                              value={formData.section_6_options[i].image_text}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {formData.section_6_options.length < 6 ? (
                    <div className="flex justify-end ">
                      <div
                        onClick={() => handleClickOption("add", 6, 0)}
                        className=" bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 cursor-pointer md:text-sm text-xs text-white w-fit"
                      >
                        Add List
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>

            {/* Section 7 */}

            <div className="flex flex-col gap-5 border-t pt-5">
              <div>
                <h2 className="text-2xl  font-bold font-palm">
                  Property Section 7
                </h2>
              </div>
              <div className="flex justify-between flex-col gap-3">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 7 Heading
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 7 Heading"
                        name="section_7_heading"
                        onChange={handleChange}
                        value={formData.section_7_heading}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <div className="flex flex-col gap-2 justfify-between  ">
                      <label className="text-sm text-gray-700">
                        Section 7 Description
                      </label>
                      <div>
                        <JoditEditor
                          ref={editor}
                          tabIndex={1}
                          value={formData.section_7_description}
                          onChange={(newContent, e) => {
                            handleDescriptionChange(newContent, 7);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 7 Image
                      </label>
                      <input
                        required
                        className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 7 Image Url"
                        name="section_7_image"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 7 Image Alt
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 7 Image Alt"
                        name="section_7_image_alt"
                        onChange={handleChange}
                        value={formData.section_7_image_alt}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 7 Image Text
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 7 Image Text"
                        name="section_7_image_text"
                        onChange={handleChange}
                        value={formData.section_7_image_text}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {formData.section_7_options.map((_, i) => (
                    <div
                      className="border p-5 rounded flex flex-col gap-3"
                      key={i}
                    >
                      {formData.section_7_options.length > 1 ? (
                        <div className="flex justify-end">
                          <div
                            className="text-red-500 text-sm"
                            onClick={() => handleClickOption("remove", 7, i)}
                          >
                            Remove
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="flex justify-between items-center gap-3">
                        <div className="w-1/2">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              percent
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="number"
                              placeholder="Enter Percent"
                              name="percent"
                              onChange={(e) => handleOptionChange(7, e, i)}
                              value={formData.section_7_options[i].percent}
                            />
                          </div>
                        </div>
                        <div className="w-1/2">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Text
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Enter Text"
                              name="text"
                              onChange={(e) => handleOptionChange(7, e, i)}
                              value={formData.section_7_options[i].text}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Image
                            </label>
                            <input
                              required
                              className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                              type="text"
                        placeholder="Enter Image Url"
                              name="image"
                              onChange={(e) => handleOptionChange(7, e, i)}
                            />
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Image Alt
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Enter Image Alt"
                              name="image_alt"
                              onChange={(e) => handleOptionChange(7, e, i)}
                              value={formData.section_7_options[i].image_alt}
                            />
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Image Text
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Image Text"
                              name="image_text"
                              onChange={(e) => handleOptionChange(7, e, i)}
                              value={formData.section_7_options[i].image_text}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {formData.section_7_options.length < 3 ? (
                    <div className="flex justify-end ">
                      <div
                        onClick={() => handleClickOption("add", 7, 0)}
                        className=" bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 cursor-pointer md:text-sm text-xs text-white w-fit"
                      >
                        Add List
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>

            {/* Section 8 */}

            <div className="flex flex-col gap-5 border-t pt-5">
              <div>
                <h2 className="text-2xl  font-bold font-palm">
                  Property Section 8
                </h2>
              </div>
              <div className="flex justify-between flex-col gap-3">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 8 Heading
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 8 Heading"
                        name="section_8_heading"
                        onChange={handleChange}
                        value={formData.section_8_heading}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {formData.floors.map((_, i) => (
                    <div
                      className="border p-5 rounded flex flex-col gap-3"
                      key={i}
                    >
                      {formData.floors.length > 1 ? (
                        <div className="flex justify-end">
                          <div
                            className="text-red-500 text-sm"
                            onClick={() => handleClickOption("remove", 8, i)}
                          >
                            Remove
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="flex justify-between items-center gap-3">
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Floor / Bedrooms Number
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Enter Bedrooms / Floor Number"
                              name="floor_number"
                              onChange={(e) => handleOptionChange(8, e, i)}
                              value={formData.floors[i].floor_number}
                            />
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Square Feet
                            </label>
                            <input
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Enter Sqaure feet"
                              name="square_feet"
                              onChange={(e) => handleOptionChange(8, e, i)}
                              value={formData.floors[i].square_feet}
                            />
                          </div>
                        </div>

                        <div className="w-1/3">
                          {i === 0 && (
                            <div className="flex flex-col gap-2">
                              <label className="text-sm text-gray-700">
                                Floor Plan Catalogue
                              </label>
                              <input
                                required
                                className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                                type="file"
                                accept="application/pdf"
                                name="floor_plan_catalogue"
                                // onChange={(e) => handleOptionChange(8, e, i)}
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file && file.type !== "application/pdf") {
                                    // alert("Only PDF files are allowed.");
                                    Swal.fire({
                                      icon: "error",
                                      title: "Invalid File",
                                      text: "Only PDF files are allowed.",
                                    });
                                    e.target.value = ""; // reset file input
                                    return;
                                  }
                                  handleOptionChange(8, e, i);
                                }}
                              />
                            </div>
                          )}
                        </div>

                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Image
                            </label>
                            <input
                              required
                              className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                              type="text"
                        placeholder="Enter Image Url"
                              name="floor_plan_image"
                              onChange={(e) => handleOptionChange(8, e, i)}
                            />
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Image Alt
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Enter Image Alt"
                              name="floor_plan_image_alt"
                              onChange={(e) => handleOptionChange(8, e, i)}
                              value={formData.floors[i].floor_plan_image_alt}
                            />
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Image Text
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Image Text"
                              name="floor_plan_image_text"
                              onChange={(e) => handleOptionChange(8, e, i)}
                              value={formData.floors[i].floor_plan_image_text}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end ">
                    <div
                      onClick={() => handleClickOption("add", 8, 0)}
                      className=" bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 cursor-pointer md:text-sm text-xs text-white w-fit"
                    >
                      Add List
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>

            {/* Section 9 */}

            <div className="flex flex-col gap-5 border-t pt-5">
              <div>
                <h2 className="text-2xl  font-bold font-palm">
                  Property Section 9
                </h2>
              </div>
              <div className="flex justify-between flex-col gap-3">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 9 Heading
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 9 Heading"
                        name="section_9_heading"
                        onChange={handleChange}
                        value={formData.section_9_heading}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <div className="flex flex-col gap-2 justfify-between  ">
                      <label className="text-sm text-gray-700">
                        Section 9 Description
                      </label>
                      <div>
                        <JoditEditor
                          ref={editor}
                          tabIndex={1}
                          value={formData.section_9_description}
                          onChange={(newContent, e) => {
                            handleDescriptionChange(newContent, 9);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 9 Image
                      </label>
                      <input
                        required
                        className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Property Section 9 Image Url"
                        name="section_9_image"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 9 Image Alt
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 9 Image Alt"
                        name="section_9_image_alt"
                        onChange={handleChange}
                        value={formData.section_9_image_alt}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 9 Image Text
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 9 Image Text"
                        name="section_9_image_text"
                        onChange={handleChange}
                        value={formData.section_9_image_text}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 10 */}

            <div className="flex flex-col gap-5 border-t pt-5">
              <div>
                <h2 className="text-2xl  font-bold font-palm">
                  Property Section 10
                </h2>
              </div>
              <div className="flex justify-between flex-col gap-3">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 10 Heading
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 10 Heading"
                        name="section_10_heading"
                        onChange={handleChange}
                        value={formData.section_10_heading}
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-700">
                        Section 10 description
                      </label>
                      <input
                        required
                        className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                        type="text"
                        placeholder="Enter Section 10 description"
                        name="section_10_description"
                        onChange={handleChange}
                        value={formData.section_10_description}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 11 */}

            <div className="flex flex-col gap-5 border-t pt-2">
              <div>
                <h2 className="text-2xl  font-bold font-palm">
                  Property Section 11
                </h2>
              </div>
              <div className="flex justify-between flex-col gap-3">
                <div className="flex flex-col gap-2">
                  {formData.section_11_faqs.map((_, i) => (
                    <div
                      className="border p-5 rounded flex flex-col gap-3"
                      key={i}
                    >
                      {formData.section_11_faqs.length > 1 ? (
                        <div className="flex justify-end">
                          <div
                            className="text-red-500 text-sm"
                            onClick={() => handleClickOption("remove", 11, i)}
                          >
                            Remove
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="flex justify-between items-center gap-3">
                        <div className="w-2/2">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">
                              Question
                            </label>
                            <input
                              required
                              className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                              type="text"
                              placeholder="Enter Question"
                              name="question"
                              onChange={(e) => handleOptionChange(11, e, i)}
                              value={formData.section_11_faqs[i].question}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <div className="w-2/2">
                          <div className="flex flex-col gap-2 justfify-between  ">
                            <label className="text-sm text-gray-700">
                              Answer
                            </label>
                            <div>
                              <JoditEditor
                                ref={editor}
                                tabIndex={1}
                                value={formData.section_11_faqs[i].ans}
                                onChange={(newContent) =>
                                  handleFAQDescription(newContent, i)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end ">
                    <div
                      onClick={() => handleClickOption("add", 11, 0)}
                      className=" bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 cursor-pointer md:text-sm text-xs text-white w-fit"
                    >
                      Add Question
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Footer Section */}


            <hr />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Footer Section Title
                </label>
                <input
                  name="footer_section_title"
                  placeholder="footer section title"
                  value={formData.footer_section_title}
                  onChange={handleChange}
                  className={`rounded p-3 text-base border outline-none`}
                  
                />
              </div>

              {/* Section 1 Description - using Quill */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-700">
                  Footer Section Description
                </label>
                <JoditEditor
                  ref={editor}
                  tabIndex={1}
                  value={formData.footer_section_description}
                  onChange={(newContent) =>
                    handleDescriptionChange(newContent,  9)
                  }
                />
              </div>

              {/* Footer Section Image Fields */}

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  footer section Image File
                </label>
                <input
                  type="text"
                        placeholder="Enter Footer Image Url"
                  name="footer_section_image_file"
                  onChange={handleChange}
                  className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                  
                  // {...methods.register("footer_section_image_file")}
                />
                
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  footer section Image Alt
                </label>
                <input
                  placeholder="footer section image alt"
                  // {...methods.register("footer_section_image_alt")}
                  name="footer_section_image_alt"
                  value={formData.footer_section_image_alt}
                  onChange={handleChange}
                  
                  className="rounded p-3 border border-gray-300 outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  footer Section Image Text
                </label>
                <input
                  placeholder="footer section img text"
                  // {...methods.register("footer_section_image_text")}
                  value={formData.footer_section_image_text}
                  name="footer_section_image_text"
                  onChange={handleChange}
                  
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
                  name="footer_section_btn_1_text"
                  value={formData.footer_section_btn_1_text}
                  onChange={handleChange}
                  
                  // {...methods.register("footer_section_btn_1_text")}
                  className="rounded p-3 border border-gray-300 outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  footer Btn 1 link
                </label>
                <input
                  placeholder="footer Btn 1 link"
                  name="footer_section_btn_1_link"
                  value={formData.footer_section_btn_1_link}
                  onChange={handleChange}
                  
                  // {...methods.register("footer_section_btn_1_link")}
                  className="rounded p-3 border border-gray-300 outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  footer Btn 2 Text
                </label>
                <input
                  // {...methods.register("footer_section_btn_2_text")}
                  name="footer_section_btn_2_text"
                  value={formData.footer_section_btn_2_text}
                  onChange={handleChange}
                  
                  placeholder="footer Btn 2 text"
                  className="rounded p-3 border border-gray-300 outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  footer Btn 2 link
                </label>
                <input
                  name="footer_section_btn_2_link"
                  value={formData.footer_section_btn_2_link}
                  onChange={handleChange}
                  
                  // {...methods.register("footer_section_btn_2_link")}
                  placeholder="footer Btn 2 link"
                  className="rounded p-3 border border-gray-300 outline-none"
                />
              </div>

            </div>

            <hr />



            {/* Button */}


            <div className="flex justify-end items-center">
              <div>
                <BlueButtonAdmin text={isCreating ? "Creating..." : "Add Property"} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
