// src/views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/ContactUs Page/PalmJumeirahForm.jsx

import React, { useEffect } from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  useFieldArray,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SEOFields from "../Components/SEOFields";
import BannerFields from "../Components/BannerFields";
import QuillField from "../../../../AdminComponents/Inputs/QuillField";
import axiosClient from "../../../../../../axiosClient";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import FormFieldArray from "../../../../AdminComponents/Inputs/FormFieldArray";
import ImageField from "../../../../AdminComponents/Inputs/ImageField";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  slug: yup.string().required("Slug is required"),
  meta_title: yup.string().required("Meta Title is required"),
  meta_description: yup.string().required("Meta Description is required"),
  canonical_url: yup.string().required("Canonical URL is required"),
  focus_keyword: yup.string().required("Focus Keyword is required"),
  // redirect_301: yup.string(),
  // redirect_302: yup.string(),
  // old_redirect_url: yup.string(),
  schema: yup
    .string()
    .required("Schema is required")
    .test("is-json", "Schema must be valid JSON", (value) => {
      try {
        JSON.parse(value);
        return true;
      } catch {
        return false;
      }
    }),
  email: yup.string().email("Invalid email format").nullable(), // Added email, allowing null
  phone: yup.string().nullable(), // Added phone, allowing null

  // Banner Section
  b1_heading: yup.string().required("Banner Heading is required"),
  b1_image: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("Banner Image Alt is required"),
    name: yup.string().required("Banner Image Name is required"),
  }),

  // Section One
  s1_heading: yup.string().required("Section 1 Heading is required"),
  s1_content: yup.string().required("Section 1 Content is required"),
  s1_btn_link: yup
    .string()
    .required("Section 1 Button Link is required"),
  s1_items: yup.array().of(
    yup.object().shape({
      h: yup.string().required("S1 item heading is required"),
      t: yup.string().required("S1 item text is required"),
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
  // footer_section_image: yup.array().of(
  //   yup.object().shape({
  //     file_path: yup.mixed(),
  //     existingPath: yup.string(),
  //     alt: yup.string().required(),
  //     name: yup.string().required(),
  //   })
  // ),
  // Section Two (Corrected based on payload)
  s2_heading: yup.string().required("Section 2 Heading is required"),
  s2_content: yup.string().required("Section 2 Content is required"),
  // Removed s2_image and s2_items as they are not in the provided payload for sectionTwo

  // Section Three
  s3_heading: yup.string().required("Section 3 Heading is required"),
  s3_content: yup.string().required("Section 3 Content is required"),
  s3_image_1: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("Section 3 Image 1 Alt is required"),
    name: yup.string().required("Section 3 Image 1 Name is required"),
  }),
  s3_image_2: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("Section 3 Image 2 Alt is required"),
    name: yup.string().required("Section 3 Image 2 Name is required"),
  }),
  s3_items: yup.array().of(
    yup.object().shape({
      h: yup.string().required("S3 item heading is required"),
      t: yup.string().required("S3 item text is required"),
      image: yup
        .object()
        .shape({
          file: yup.mixed().nullable(),
          alt: yup.string().nullable(),
          name: yup.string().nullable(),
        })
        .nullable(), // Image is nullable as not all items have it
    })
  ),

  // Section Four
  s4_heading: yup.string().required("Section 4 Heading is required"),
  s4_content: yup.string().required("Section 4 Content is required"),
  // Removed s4_image as it's not in the provided payload for sectionFour
  s4_items: yup.array().of(
    yup.object().shape({
      h: yup.string().required("S4 item heading is required"),
      t: yup.string().required("S4 item text is required"),
      image: yup
        .object()
        .shape({
          file: yup.mixed().nullable(),
          alt: yup.string().required("S4 item image alt is required"),
          name: yup.string().required("S4 item image name is required"),
        })
        .nullable(),
    })
  ),

  // Section Five
  s5_top_text: yup.string().required("Section 5 Top Text is required"),
  s5_heading: yup.string().required("Section 5 Heading is required"),
  s5_content: yup.string().required("Section 5 Content is required"),
  s5_image: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("Section 5 Image Alt is required"),
    name: yup.string().required("Section 5 Image Name is required"),
  }),
  s5_points: yup.array().of(
    // Renamed from s5_items to s5_points based on payload
    yup.object().shape({
      h: yup.string().required("S5 point heading is required"),
      t: yup.string().nullable(), // t can be empty in payload
      image: yup
        .object()
        .shape({
          file: yup.mixed().nullable(),
          alt: yup.string().required("S5 point image alt is required"),
          name: yup.string().required("S5 point image name is required"),
        })
        .nullable(),
    })
  ),
  s5_items: yup.array().of(
    // Added s5_items from payload structure
    yup.object().shape({
      h: yup.string().required("S5 item heading is required"),
      t: yup.string().required("S5 item text is required"),
    })
  ),

  // Section Six
  s6_top_text: yup.string().required("Section 6 Top Text is required"),
  s6_heading: yup.string().required("Section 6 Heading is required"),
  // s6_content: yup.string().required("Section 6 Content is required"),
    s6_content: yup.array().of(
      yup.object().shape({
        h: yup.string().required("Section 6 item heading is required"),
        t: yup.string().required("Section 6 item text is required"),
  })),
  // Removed s6_image as it's not in the provided payload for sectionSix

  // Section Seven (Corrected based on payload)
  s7_heading: yup.string().nullable(), // Nullable based on payload
  // s7_items is completely absent in the payload, so it's removed

  // Section Eight
  s8_top_text: yup.string().required("Section 8 Top Text is required"),
  s8_heading: yup.string().required("Section 8 Heading is required"),
  s8_bottom_text: yup.string().required("Section 8 Bottom Text is required"),
  // s8_content: yup.string().required("Section 8 Content is required"),
      s8_content: yup.array().of(
    yup.object().shape({
      h: yup.string().required("S2 item heading is required"),
      t: yup.string().required("S2 item text is required"),
    })
  ),
  // Removed s8_btn_link as it's not in the provided payload for sectionEight
  // Removed s8_image as it's not in the provided payload for sectionEight
  s8_items: yup.array().of(
    yup.object().shape({
      h: yup.string().required("S8 item heading is required"),
      t: yup.string().required("S8 item text is required"),
      image: yup
        .object()
        .shape({
          file: yup.mixed().nullable(),
          alt: yup.string().nullable(),
          name: yup.string().nullable(),
        })
        .nullable(),
    })
  ),

  // Section Nine (Corrected based on payload)
  s9_heading: yup.string().nullable(), // Nullable based on payload
  // s9_content is completely absent in the payload, so it's removed

  // Section Ten
  s10_heading: yup.string().required("Section 10 Heading is required"),
  // s10_content is completely absent in the payload, so it's removed
  s10_image: yup
    .object()
    .shape({
      // Corrected to single image
      file: yup.mixed().nullable(),
      alt: yup.string().required("Section 10 Image Alt is required"),
      name: yup.string().required("Section 10 Image Name is required"),
    })
    .nullable(), // Can be null based on payload
  s10_items: yup.array().of(
    yup.object().shape({
      h: yup.string().required("S10 item heading is required"),
      t: yup.string().required("S10 item text is required"),
      image: yup
        .object()
        .shape({
          file: yup.mixed().nullable(),
          alt: yup.string().nullable(),
          name: yup.string().nullable(),
        })
        .nullable(),
    })
  ),

  // Section Eleven
  // s11_heading is completely absent in the payload, so it's removed
  // s11_content is completely absent in the payload, so it's removed
  s11_image: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("S11 image alt is required"),
    name: yup.string().required("S11 image name is required"),
  }),

  // Section Twelve
  s12_heading: yup.string().required("Section 12 Heading is required"),
  s12_content: yup.string().required("Section 12 Content is required"),
  s12_images: yup.array().of(
    yup.object().shape({
      file: yup.mixed().nullable(),
      alt: yup.string().required("S12 image alt is required"),
      name: yup.string().required("S12 image name is required"),
    })
  ),

  // Section Thirteen (Corrected from s13[] to s13_items[])
  s13_items: yup.array().of(
    yup.object().shape({
      h: yup.string().required("S13 item heading is required"),
      t: yup.string().required("S13 item text is required"),
      image: yup
        .object()
        .shape({
          file: yup.mixed().nullable(),
          alt: yup.string().required("S13 item image alt is required"),
          name: yup.string().required("S13 item image name is required"),
        })
        .nullable(),
    })
  ),

  // Section Fourteen
  s14_heading: yup.string().required("Section 14 Heading is required"),
  s14_content: yup.string().required("Section 14 Content is required"),
  s14_image: yup
    .object()
    .shape({
      file: yup.mixed().nullable(),
      alt: yup.string().required("Section 14 Image Alt is required"),
      name: yup.string().required("Section 14 Image Name is required"),

    })
    .nullable(), // Can be null based on payload
  // Removed s14_email and s14_phone as they are not explicitly in pageSection content

  // Section Fifteen
  s15_heading: yup.string().required("Section 15 Heading is required"),
  s15_content: yup.string().required("Section 15 Content is required"),
  s15_items: yup.array().of(
    yup.object().shape({
      h: yup.string().required("S15 item heading is required"),
      t: yup.string().required("S15 item text is required"),
      image: yup
        .object()
        .shape({
          file: yup.mixed().nullable(),
          alt: yup.string().required("S15 item image alt is required"),
          name: yup.string().required("S15 item image name is required"),

        })
        .nullable(),
    })
  ),

  // Section Sixteen
  s16_heading: yup.string().required("Section 16 Heading is required"),
  s16_content: yup.string().required("Section 16 Content is required"),
  s16_image: yup
    .object()
    .shape({
      file: yup.mixed().nullable(),
      alt: yup.string().required("Section 16 Image Alt is required"),
      name: yup.string().required("Section 16 Image Name is required"),

    })
    .nullable(),

  // Section Seventeen
  s17_heading: yup.string().required("Section 17 Heading is required"),
  s17_content: yup.string().required("Section 17 Content is required"),
  s17_btn: yup.array().of(
    yup.object().shape({
      name: yup.string().required("S17 button name is required"),
      items: yup.array().of(
        yup.object().shape({
          h: yup.string().required("Item heading is required"),
          t1: yup.string().required("Item t1 is required"),
          t2: yup.string().required("Item t2 is required"),
        })
      ),
    })
  ),
});

const PalmJebelAliForm = ({ editData, setStatus, setEditData, fetchData }) => {
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      slug: "",
      meta_title: "",
      meta_description: "",
      canonical_url: "",
      focus_keyword: "",
      redirect_301: "",
      redirect_302: "",
      old_redirect_url: "",
      schema: "",
      email: null,
      phone: null,

      // Banner Section
      b1_heading: "",
      b1_image: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },
      footer_section_image: [],
      footer_section_title: "",
      footer_section_description: "",
      footer_section_btn_1_text: "",
      footer_section_btn_1_link: "",
      footer_section_btn_2_text: "",
      footer_section_btn_2_link: "",
      // Section One
      s1_heading: "",
      s1_content: "",
      s1_btn_link: "",
      s1_items: [
        {
          h: "",
          t: "",
        },
      ],

      // Section Two
      s2_heading: "",
      s2_content: "",

      // Section Three
      s3_heading: "",
      s3_content: "",
      s3_image_1: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },
      s3_image_2: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },
      s3_items: [
        {
          h: "",
          t: "",
          image: {
            file: null,
            alt: "",
            name: "",
            existingPath: "",
          },
        },
      ],

      // Section Four
      s4_heading: "",
      s4_content: "",
      s4_items: [
        {
          h: "",
          t: "",
          image: {
            file: null,
            alt: "",
            name: "",
            existingPath: "",
          },
        },
      ],

      // Section Five
      s5_top_text: "",
      s5_heading: "",
      s5_content: "",
      s5_image: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },
      s5_points: [
        {
          h: "",
          t: "",
          image: {
            file: null,
            alt: "",
            name: "",
            existingPath: "",
          },
        },
      ],
      s5_items: [
        {
          h: "",
          t: "",
        },
      ],

      // Section Six
      s6_top_text: "",
      s6_heading: "",
      // s6_content: "",
s6_content: [],

      // Section Seven
      s7_heading: "",

      // Section Eight
      s8_top_text: "",
      s8_heading: "",
      s8_bottom_text: "",
      // s8_content: "",
      s8_content: [],
      s8_items: [
        {
          h: "",
          t: "",
          image: {
            file: null,
            alt: "",
            name: "",
            existingPath: "",
          },
        },
      ],

      // Section Nine
      s9_heading: "",

      // Section Ten
      s10_heading: "",
      s10_image: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },
      s10_items: [
        {
          h: "",
          t: "",
          image: {
            file: null,
            alt: "",
            name: "",
            existingPath: "",
          },
        },
      ],

      // Section Eleven
      s11_image: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },

      // Section Twelve
      s12_heading: "",
      s12_content: "",
      s12_images: [
        {
          file: null,
          alt: "",
          name: "",
          existingPath: "",
        },
      ],

      // Section Thirteen
      s13_items: [
        {
          h: "",
          t: "",
          image: {
            file: null,
            alt: "",
            name: "",
            existingPath: "",
          },
        },
      ],

      // Section Fourteen
      s14_heading: "",
      s14_content: "",
      s14_image: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },

      // Section Fifteen
      s15_heading: "",
      s15_content: "",
      s15_items: [
        {
          h: "",
          t: "",
          image: {
            file: null,
            alt: "",
            name: "",
            existingPath: "",
          },
        },
      ],

      // Section Sixteen
      s16_heading: "",
      s16_content: "",
      s16_image: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },

      // ✅ Section Seventeen (this was missing)
      s17_heading: "",
      s17_content: "",
      s17_btn: [
        {
          name: "",
          items: [
            {
              h: "",
              t1: "",
              t2: "",
            },
          ],
        },
      ],
    },
  });

  const {
    control,
    setValue,
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const {
    fields: s10ItemsFields,
    append: s10ItemsAppend,
    remove: s10ItemsRemove,
  } = useFieldArray({ control, name: "s10_items" });

  const {
    fields: s6Fields,
    append: s6Append,
    remove: s6Remove,
  } = useFieldArray({ control, name: "s6_content" });

  const {
    fields: s8Fields,
    append: s8Append,
    remove: s8Remove,
  } = useFieldArray({ control, name: "s8_content" });

  const {
    fields: s12Fields,
    append: s12Append,
    remove: s12Remove,
  } = useFieldArray({ control, name: "s12_btn" });
  const {
    fields: s5PointsFields,
    append: s5PointsAppend,
    remove: s5PointsRemove,
  } = useFieldArray({
    control: methods.control,
    name: "s5_points",
  });

  const {
    fields: s5ItemsFields,
    append: s5ItemsAppend,
    remove: s5ItemsRemove,
  } = useFieldArray({
    control: methods.control,
    name: "s5_items",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "s8_items",
  });

  const { fields: fields15, append: append15 } = useFieldArray({
    control,
    name: "s15_items",
  });

  // const { fields: fields17, append: append17 } = useFieldArray({
  //   control,
  //   name: "s17_btn",
  // });
  const {
    fields: fields17,
    append: append17,
    remove: remove17,
  } = useFieldArray({
    control: methods.control,
    name: "s17_btn",
  });

  const appendNested17 = (btnIndex, newItem) => {
    const current = methods.getValues(`s17_btn.${btnIndex}.items`) || [];
    methods.setValue(`s17_btn.${btnIndex}.items`, [...current, newItem]);
  };

  useEffect(() => {
    if (editData) {
      const { Page, pageSection } = editData;

      const getContent = (sectionName) =>
        pageSection.find((section) => section.name === sectionName)?.content ||
        {};

      const getImage = (img = {}) => ({
        file: null, // This is for new file uploads
        alt: img?.alt || "",
        name: img?.name || "",
        existingPath: img?.file_path || "",
      });

      const formattedData = {
        // Page Meta
        name: Page?.name || "",
        slug: Page?.slug || "",
        meta_title: Page?.meta_title || "",
        meta_description: Page?.meta_description || "",
        canonical_url: Page?.canonical_url || "",
        focus_keyword: Page?.focus_keyword || "",
        redirect_301: Page?.redirect_301 || "",
        redirect_302: Page?.redirect_302 || "",
        old_redirect_url: Page?.old_redirect_url || "",
        schema: Page?.schema ? JSON.stringify(Page.schema) : "",
        email: Page?.email || "",
        phone: Page?.phone || "",
        footer_section_title: getContent("footerSection").footer_section_title || "",
        footer_section_description: getContent("footerSection").footer_section_description || "",
        footer_section_btn_1_text: getContent("footerSection").footer_section_btn_1_text || "",
        footer_section_btn_1_link: getContent("footerSection").footer_section_btn_1_link || "",
        footer_section_btn_2_text: getContent("footerSection").footer_section_btn_2_text || "",
        footer_section_btn_2_link: getContent("footerSection").footer_section_btn_2_link || "",
        footer_section_image: (getContent("foooterSection").footer_section_image || []).map((img) => ({
          existingPath: img.file_path || "",
          alt: img.alt || "",
          name: img.name || "",
        })) || [],
        // Banner Section (originally Section 1 in your previous mapping)
        // Based on your editData, b1_image and b1_heading are from 'bannerSection'
        b1_heading: getContent("bannerSection").b1_heading || "",
        b1_image: getImage(getContent("bannerSection").b1_image),
        b1_exitsing: getImage(getContent("bannerSection").b1_image?.file_path),

        // Section One (your original Section 1)
        s1_heading: getContent("sectionOne").s1_heading || "",
        s1_content: getContent("sectionOne").s1_content || "",
        s1_btn_link: getContent("sectionOne").s1_btn_link || "",
        s1_items: (getContent("sectionOne").s1_items || []).map((item) => ({
          h: item.h || "",
          t: item.t || "",
          // Assuming s1_items don't have images based on your editData
        })),

        // Section Two (your original Section 2)
        s2_heading: getContent("sectionTwo").s2_heading || "",
        s2_content: getContent("sectionTwo").s2_content || "",
        // s2_image and s2_items are not present in your provided 'sectionTwo' editData content
        // They will default to empty/null as per getImage and || []
        s2_image: getImage(getContent("sectionTwo").s2_image), // This will be empty as s2_image is not in editData
        s2_items: (getContent("sectionTwo").s2_items || []).map((item) => ({
          h: item.h || "",
          t: item.t || "",
          image: getImage(item.file_path || {}),
        })),

        // Section Three (your original Section 3)
        s3_heading: getContent("sectionThree").s3_heading || "",
        s3_content: getContent("sectionThree").s3_content || "",
        s3_image_1: getImage(getContent("sectionThree").s3_image_1),
        s3_image_2: getImage(getContent("sectionThree").s3_image_2),
        s3_items: (getContent("sectionThree").s3_items || []).map((item) => {
          return {
            h: item.h || "",
            t: item.t || "",
            image: getImage(item.image), // ✅ This should now log the real image object
          };
        }),

        // Section Four (your original Section 4)
        s4_heading: getContent("sectionFour").s4_heading || "",
        s4_content: getContent("sectionFour").s4_content || "",
        // s4_image is not in your provided 'sectionFour' editData content
        s4_image: getImage(getContent("sectionFour").s4_image), // This will be empty
        s4_items: (getContent("sectionFour").s4_items || []).map((item) => ({
          h: item.h || "",
          t: item.t || "",
          image: getImage(item.image), // Pass file_path as part of an object to getImage
        })),

        // Section Five (your original Section 5)
        s5_heading: getContent("sectionFive").s5_heading || "",
        s5_content: getContent("sectionFive").s5_content || "",
        s5_top_text: getContent("sectionFive").s5_top_text || "",
        s5_image: getImage(getContent("sectionFive").s5_image),
        s5_items: (getContent("sectionFive").s5_items || []).map((item) => ({
          h: item.h || "",
          t: item.t || "",
          // Assuming s5_items don't have images based on your editData
        })),
        s5_points: (getContent("sectionFive").s5_points || []).map((item) => ({
          h: item.h || "",
          t: item.t || "",
          image: getImage(item.image), // Pass file_path as part of an object to getImage
        })),

        // Section Six (your original Section 6)
        s6_heading: getContent("sectionSix").s6_heading || "",
        // s6_content: getContent("sectionSix").s6_content || "",
        s6_content: (getContent("sectionSix").s6_content || []).map((item) => ({
          h: item.heading || "",
          t: item.text || "",
        })),
        s6_top_text: getContent("sectionSix").s6_top_text || "",
        // s6_image is not in your provided 'sectionSix' editData content
        s6_image: getImage(getContent("sectionSix").s6_image), // This will be empty

        // Section Seven - This section is not in your provided editData.
        // It will default to empty strings/arrays as it's not found in pageSection.
        s7_heading: getContent("sectionSeven").s7_heading || "",

        // Section Eight (your original Section 8)
        s8_heading: getContent("sectionEight").s8_heading || "",
        // s8_content: getContent("sectionEight").s8_content || "",
        s8_content: (getContent("sectionEight").s8_content || []).map((item) => ({
          h: item.heading || "",
          t: item.text|| "",
        })),
        s8_top_text: getContent("sectionEight").s8_top_text || "",
        s8_bottom_text: getContent("sectionEight").s8_bottom_text || "",
        s8_items: (getContent("sectionEight").s8_items || []).map((item) => ({
          h: item.h || "",
          t: item.t || "",
          image: getImage(item.image), // Pass file_path as part of an object to getImage
        })),

        s9_heading: getContent("sectionNine").s9_heading || "",
        // Section Ten (your original Section 10)
        s10_heading: getContent("sectionTen").s10_heading || "",
        s10_items: (getContent("sectionTen").s10_items || []).map((item) => ({
          h: item.h || "",
          t: item.t || "",
          image: getImage(item.image), // Pass file_path as part of an object to getImage
        })),
        s10_image: getImage(getContent("sectionTen").s10_image), // Handling the single s10_image field

        // Section Eleven (your original Section 11)
        s11_image: getImage(getContent("sectionEleven").s11_image),

        // Section Twelve (your original Section 12)
        s12_heading: getContent("sectionTwelve").s12_heading || "",
        s12_content: getContent("sectionTwelve").s12_content || "",
        s12_images: (getContent("sectionTwelve").s12_images || []).map((img) =>
          getImage(img)
        ), // Ensure this handles the array of images

        // Section Thirteen - Add mapping for sectionThirteen based on your data
        s13_items: (getContent("sectionThirteen").s13_items || []).map(
          (item) => ({
            h: item.h || "",
            t: item.t || "",
            image: getImage(item.image), // Pass file_path as part of an object to getImage
          })
        ),

        // Section Fourteen (your original Section 14)
        s14_heading: getContent("sectionFourteen").s14_heading || "", // Corrected section name to "sectionFourteen"
        s14_content: getContent("sectionFourteen").s14_content || "", // Corrected section name to "sectionFourteen"
        s14_image: getImage(getContent("sectionFourteen").s14_image), // Handling the single s14_image field

        // Section Fifteen - Add mapping for sectionFifteen
        s15_heading: getContent("sectionFifteen").s15_heading || "",
        s15_content: getContent("sectionFifteen").s15_content || "",
        s15_items: (getContent("sectionFifteen").s15_items || []).map(
          (item) => ({
            h: item.h || "",
            t: item.t || "",
            image: getImage(item.image), // Pass file_path as part of an object to getImage
          })
        ),

        // Section Sixteen - Add mapping for sectionSixteen
        s16_heading: getContent("sectionSixteen").s16_heading || "",
        s16_content: getContent("sectionSixteen").s16_content || "",
        s16_image: getImage(getContent("sectionSixteen").s16_image),

        // Section Seventeen - Add mapping for sectionSeventeen explicitly
        s17_heading: getContent("sectionSeventeen").s17_heading || "",
        s17_content: getContent("sectionSeventeen").s17_content || "",
        s17_btn: (getContent("sectionSeventeen").s17_buttons || []).map(
          (btn) => ({
            name: btn.name || "",
            items: (btn.items || []).map((item) => ({
              h: item.h || "",
              t1: item.t1 || "",
              t2: item.t2 || "",
            })),
          })
        ),
      };

      reset(formattedData);
      console.log(formattedData.s3_items[0].image)
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted!", data);
      const formData = new FormData();

      // Page Meta & Basic Fields (Aligned with your data structure)
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("meta_title", data.meta_title);
      formData.append("meta_description", data.meta_description);
      formData.append("canonical_url", data.canonical_url);
      formData.append("focus_keyword", data.focus_keyword);
      formData.append("redirect_301", data.redirect_301 || "");
      formData.append("redirect_302", data.redirect_302 || "");
      formData.append("old_redirect_url", data.old_redirect_url || "");
      formData.append("schema", JSON.stringify(data.schema || {}));
      // Email and Phone are now directly from the Page object, not s14
      formData.append("email", data.email || ""); // Assuming 'email' is a top-level field from Page
      formData.append("phone", data.phone || ""); // Assuming 'phone' is a top-level field from Page
      formData.append("footer_section_title", data.footer_section_title);
      formData.append("footer_section_description", data.footer_section_description);
      formData.append("footer_section_btn_1_text", data.footer_section_btn_1_text);
      formData.append("footer_section_btn_1_link", data.footer_section_btn_1_link);
      formData.append("footer_section_btn_2_text", data.footer_section_btn_2_text);
      formData.append("footer_section_btn_2_link", data.footer_section_btn_2_link);
      if (data.footer_section_image?.file && data.footer_section_image.file[0]) {
        formData.append("footer_section_image[file]", data.footer_section_image.file[0]);
      } else {
        formData.append("footer_section_image[existingPath]", data.footer_section_image?.existingPath || "");
      }
      formData.append("footer_section_image[alt]", data.footer_section_image?.alt || "");
      formData.append("footer_section_image[name]", data.footer_section_image?.name || "");

      // Banner Section (added from your provided data)
      formData.append("b1_heading", data.b1_heading || "");
      if (data.b1_image?.file && data.b1_image.file?.[0]) {
        formData.append("b1_image[file]", data.b1_image.file?.[0]);
        formData.append("b1_image[alt]", data.b1_image?.alt || "");
        formData.append("b1_image[name]", data.b1_image?.name || "");
      } else {
        formData.append("b1_image[alt]", data.b1_image?.alt || "");
        formData.append("b1_image[name]", data.b1_image?.name || "");
        formData.append("b1_image[existingPath]", data.b1_image?.existingPath || "");
      }

      // Section 1
      formData.append("s1_heading", data.s1_heading || "");
      formData.append("s1_content", data.s1_content || "");
      formData.append("s1_btn_link", data.s1_btn_link || "");
      data.s1_items?.forEach((item, index) => {
        formData.append(`s1_items[${index}][h]`, item.h || "");
        formData.append(`s1_items[${index}][t]`, item.t || "");
      });


      // Section 2
      formData.append("s2_heading", data.s2_heading || ""); // Added s2_heading
      formData.append("s2_content", data.s2_content || "");
      // Note: s2_image and s2_items' image structure in your frontend
      // doesn't match the backend's expected `s2_image` or `file_path` directly.
      // The previous `s2_image` and `s2_items` from your `editData` didn't contain images.
      // I'll keep the existing logic, but be mindful of this potential mismatch.
      formData.append("s2_image_alt", data.s2_image?.alt || "");
      formData.append("s2_image_name", data.s2_image?.name || "");
      if (data.s2_image?.file instanceof File) {
        formData.append("s2_image_file", data.s2_image.file); // Changed key for single image upload
      } else {
        formData.append("s2_image_existingPath", data.s2_image?.existingPath || "");
      }

      data.s2_items?.forEach((item, index) => {
        formData.append(`s2_items[${index}][h]`, item.h || "");
        formData.append(`s2_items[${index}][t]`, item.t || "");
        // If s2_items have images, map them similarly to s3_items
        if (item.image) {
          formData.append(`s2_items[${index}][image][alt]`, item.image?.alt || "");
          formData.append(`s2_items[${index}][image][name]`, item.image?.name || "");
          if (item.image?.file && item.image.file?.[0]) {
            formData.append(`s2_items[${index}][image][file]`, item.image.file[0]);
          } else {
            formData.append(`s2_items[${index}][image][existingPath]`, item.image?.existingPath || "");
          }
        }
      });

      // Section 3
      formData.append("s3_heading", data.s3_heading || "");
      formData.append("s3_content", data.s3_content || "");
      // s3_image_1
      if (data.s3_image_1?.file instanceof File) {
        formData.append("s3_image_1[file]", data.s3_image_1.file);
        formData.append("s3_image_1[alt]", data.s3_image_1?.alt || "");
        formData.append("s3_image_1[name]", data.s3_image_1?.name || "");
      } else {
        formData.append("s3_image_1[alt]", data.s3_image_1?.alt || "");
        formData.append("s3_image_1[name]", data.s3_image_1?.name || "");
        formData.append("s3_image_1[existingPath]", data.s3_image_1?.existingPath || "");
      }
      // s3_image_2
      if (data.s3_image_2?.file instanceof File) {
        formData.append("s3_image_2[file]", data.s3_image_2.file);
        formData.append("s3_image_2[alt]", data.s3_image_2?.alt || "");
        formData.append("s3_image_2[name]", data.s3_image_2?.name || "");
      } else {
        formData.append("s3_image_2[alt]", data.s3_image_2?.alt || "");
        formData.append("s3_image_2[name]", data.s3_image_2?.name || "");
        formData.append("s3_image_2[existingPath]", data.s3_image_2?.existingPath || "");
      }

      data.s3_items?.forEach((item, index) => {
        formData.append(`s3_items[${index}][h]`, item.h || "");
        formData.append(`s3_items[${index}][t]`, item.t || "");
        if (item.image) {
          formData.append(`s3_items[${index}][image][alt]`, item.image?.alt || "");
          formData.append(`s3_items[${index}][image][name]`, item.image?.name || "");
          if (item.image?.file && item.image.file?.[0]) {
            formData.append(`s3_items[${index}][image][file]`, item.image.file[0]);
          } else {
            formData.append(`s3_items[${index}][image][existingPath]`, item.image?.existingPath || "");
          }
        }
      });

      // Section 4
      formData.append("s4_heading", data.s4_heading || "");
      formData.append("s4_content", data.s4_content || "");
      if (data.s4_image?.file instanceof File) {
        formData.append("s4_image_file", data.s4_image.file);
      } else {
        formData.append("s4_image_alt", data.s4_image?.alt || "");
        formData.append("s4_image_name", data.s4_image?.name || "");
        formData.append("s4_image_existingPath", data.s4_image?.existingPath || "");
      }
      data.s4_items?.forEach((item, index) => {
        formData.append(`s4_items[${index}][h]`, item.h || "");
        formData.append(`s4_items[${index}][t]`, item.t || "");
        if (item.image) {
          formData.append(`s4_items[${index}][image][alt]`, item.image?.alt || "");
          formData.append(`s4_items[${index}][image][name]`, item.image?.name || "");
          if (item.image?.file instanceof File) {
            formData.append(`s4_items[${index}][image][file]`, item.image.file);
          } else {
            formData.append(`s4_items[${index}][image][existingPath]`, item.image?.existingPath || "");
          }
        }
      });

      // Section 5
      formData.append("s5_top_text", data.s5_top_text || ""); // Added
      formData.append("s5_heading", data.s5_heading || "");
      formData.append("s5_content", data.s5_content || "");
      if (data.s5_image?.file && data.s5_image.file?.[0]) {
        formData.append("s5_image[file]", data.s5_image.file[0]);
      } else {
        formData.append("s5_image[alt]", data.s5_image?.alt || "");
        formData.append("s5_image[name]", data.s5_image?.name || "");
        formData.append("s5_image[existingPath]", data.s5_image?.existingPath || "");
      }
      data.s5_items?.forEach((item, index) => {
        formData.append(`s5_items[${index}][h]`, item.h || "");
        formData.append(`s5_items[${index}][t]`, item.t || "");
        // No image in s5_items based on your provided payload
      });
      data.s5_points?.forEach((item, index) => {
        formData.append(`s5_points[${index}][h]`, item.h || "");
        formData.append(`s5_points[${index}][t]`, item.t || "");
        if (item.image) {
          formData.append(`s5_points[${index}][image][alt]`, item.image?.alt || "");
          formData.append(`s5_points[${index}][image][name]`, item.image?.name || "");
          if (item.image?.file && item.image.file?.[0]) {
            formData.append(`s5_points[${index}][image][file]`, item.image.file[0]);
          } else {
            formData.append(`s5_points[${index}][image][existingPath]`, item.image?.existingPath || "");
          }
        }
      });

      // Section 6
      formData.append("s6_top_text", data.s6_top_text || ""); // Added
      formData.append("s6_heading", data.s6_heading || "");
      // formData.append("s6_content", data.s6_content || "");
            data.s6_content?.forEach((item, index) => {
        formData.append(`s6_content[${index}][heading]`, item.h || "");
        formData.append(`s6_content[${index}][text]`, item.t || "");
      });
      if (data.s6_image?.file && data.s6_image.file?.[0]) {
        formData.append("s6_image_file", data.s6_image.file[0]);
      } else {
        formData.append("s6_image_alt", data.s6_image?.alt || "");
        formData.append("s6_image_name", data.s6_image?.name || "");
        formData.append("s6_image_existingPath", data.s6_image?.existingPath || "");
      }

      // Section 7
      formData.append("s7_heading", data.s7_heading || "");
      data.s7_items?.forEach((item, index) => {
        formData.append(`s7_items[${index}][number]`, item.number || "");
        formData.append(`s7_items[${index}][h]`, item.h || "");
        formData.append(`s7_items[${index}][t]`, item.t || "");
      });

      // Section 8
      formData.append("s8_top_text", data.s8_top_text || ""); // Added
      formData.append("s8_bottom_text", data.s8_bottom_text || ""); // Added
      formData.append("s8_heading", data.s8_heading || "");
      // formData.append("s8_content", data.s8_content || "");
                data.s8_content?.forEach((item, index) => {
        formData.append(`s8_content[${index}][heading]`, item.h || "");
        formData.append(`s8_content[${index}][text]`, item.t || "");
      });
      formData.append("s8_btn_link", data.s8_btn_link || "");
      if (data.s8_image?.file && data.s8_image.file?.[0]) {
        formData.append("s8_image_file", data.s8_image.file[0]);
      } else {
        formData.append("s8_image_alt", data.s8_image?.alt || "");
        formData.append("s8_image_name", data.s8_image?.name || "");
        formData.append("s8_image_existingPath", data.s8_image?.existingPath || "");
      }
      data.s8_items?.forEach((item, index) => {
        formData.append(`s8_items[${index}][h]`, item.h || "");
        formData.append(`s8_items[${index}][t]`, item.t || "");
        if (item.image) {
          formData.append(`s8_items[${index}][image][alt]`, item.image?.alt || "");
          formData.append(`s8_items[${index}][image][name]`, item.image?.name || "");
          if (item.image?.file && item.image.file?.[0]) {
            formData.append(`s8_items[${index}][image][file]`, item.image.file[0]);
          } else {
            formData.append(`s8_items[${index}][image][existingPath]`, item.image?.existingPath || "");
          }
        }
      });

      // Section 9
      formData.append("s9_heading", data.s9_heading || "");
      formData.append("s9_content", data.s9_content || "");

      // Section 10
      formData.append("s10_heading", data.s10_heading || "");
      formData.append("s10_content", data.s10_content || ""); // Keep if needed, though not in your provided payload
      if (data.s10_image?.file && data.s10_image.file?.[0]) {
        formData.append("s10_image[file]", data.s10_image.file[0]); // For single s10_image
      } else {
        formData.append("s10_image[alt]", data.s10_image?.alt || "");
        formData.append("s10_image[name]", data.s10_image?.name || "");
        formData.append("s10_image[existingPath]", data.s10_image?.existingPath || "");
      }
      data.s10_items?.forEach((item, index) => {
        formData.append(`s10_items[${index}][h]`, item.h || "");
        formData.append(`s10_items[${index}][t]`, item.t || "");
        if (item.image) { // Add image handling for s10_items
          formData.append(`s10_items[${index}][image][alt]`, item.image?.alt || "");
          formData.append(`s10_items[${index}][image][name]`, item.image?.name || "");
          if (item.image?.file instanceof File) {
            formData.append(`s10_items[${index}][image][file]`, item.image.file);
          } else {
            formData.append(`s10_items[${index}][image][existingPath]`, item.image?.existingPath || "");
          }
        }
      });
      data.s10_images?.forEach((img, index) => { // This loop seems to be for an array of images
        if (img?.file && img.file?.[0]) {
          formData.append(`s10_images[${index}][file]`, img.file[0]);
        } else {
          formData.append(`s10_images[${index}][alt]`, img.alt || "");
          formData.append(`s10_images[${index}][name]`, img.name || "");
          formData.append(`s10_images[${index}][existingPath]`, img.existingPath || "");
        }
      });

      // Section 11
      formData.append("s11_heading", data.s11_heading || ""); // Added
      formData.append("s11_content", data.s11_content || ""); // Added
      if (data.s11_image?.file && data.s11_image.file?.[0]) {
        formData.append("s11_image[file]", data.s11_image.file[0]);
      } else {
        formData.append("s11_image[alt]", data.s11_image?.alt || "");
        formData.append("s11_image[name]", data.s11_image?.name || "");
        formData.append("s11_image[existingPath]", data.s11_image?.existingPath || "");
      }

      // Section 12
      formData.append("s12_heading", data.s12_heading || "");
      formData.append("s12_content", data.s12_content || "");
      data.s12_images?.forEach((img, index) => { // Handling array of images
        if (img?.file instanceof File) {
          formData.append(`s12_images[${index}][file]`, img.file);
        } else {
          formData.append(`s12_images[${index}][existingPath]`, img.existingPath || "");
        }
        formData.append(`s12_images[${index}][alt]`, img.alt || "");
        formData.append(`s12_images[${index}][name]`, img.name || "");
      });
      // If s12_btn is separate and refers to section 17 buttons as per your useEffect
      data.s12_btn?.forEach((btn, i) => { // This seems to map s17_buttons to s12_btn
        formData.append(`s12_btn[${i}][name]`, btn.name || "");
        btn.items?.forEach((item, j) => {
          formData.append(`s12_btn[${i}][items][${j}][h]`, item.h || "");
          formData.append(`s12_btn[${i}][items][${j}][t1]`, item.t1 || "");
          formData.append(`s12_btn[${i}][items][${j}][t2]`, item.t2 || "");
        });
      });

      // Section 13 (added from your provided payload)
      data.s13_items?.forEach((item, index) => { // Assuming s13 is for s13_items
        formData.append(`s13[${index}][h]`, item.h || "");
        formData.append(`s13[${index}][t]`, item.t || "");
        if (item.image) {
          formData.append(`s13[${index}][image][alt]`, item.image?.alt || "");
          formData.append(`s13[${index}][image][name]`, item.image?.name || "");
          if (item.image?.file instanceof File) {
            formData.append(`s13[${index}][image][file]`, item.image.file);
          } else {
            formData.append(`s13[${index}][image][existingPath]`, item.image?.existingPath || "");
          }
        }
      });

      // Section 14
      formData.append("s14_heading", data.s14_heading || "");
      formData.append("s14_content", data.s14_content || "");
      // If email and phone were extracted to top level, remove these.
      // If they are specific to section 14, keep them here.
      // Based on your initial schema, they were top-level 'Page' fields, but your payload example shows them in s14.
      // I've kept them here assuming they are s14 specific.
      formData.append("s14_email", data.s14_email || "");
      formData.append("s14_phone", data.s14_phone || "");
      if (data.s14_image?.file instanceof File) {
        formData.append("s14_image[file]", data.s14_image.file);
      } else {
        formData.append("s14_image[alt]", data.s14_image?.alt || "");
        formData.append("s14_image[name]", data.s14_image?.name || "");
        formData.append("s14_image[existingPath]", data.s14_image?.existingPath || "");
      }


      // Section 15 (added from your provided payload)
      formData.append("s15_heading", data.s15_heading || "");
      formData.append("s15_content", data.s15_content || "");
      data.s15_items?.forEach((item, index) => {
        formData.append(`s15_items[${index}][h]`, item.h || "");
        formData.append(`s15_items[${index}][t]`, item.t || "");
        if (item.image) { // Add image handling for s15_items
          formData.append(`s15_items[${index}][image][alt]`, item.image?.alt || "");
          formData.append(`s15_items[${index}][image][name]`, item.image?.name || "");
          if (item.image?.file instanceof File) {
            formData.append(`s15_items[${index}][image][file]`, item.image.file);
          } else {
            formData.append(`s15_items[${index}][image][existingPath]`, item.image?.existingPath || "");
          }
        }
      });

      // Section 16 (added from your provided payload)
      formData.append("s16_heading", data.s16_heading || "");
      formData.append("s16_content", data.s16_content || "");
      if (data.s16_image?.file instanceof File) {
        formData.append("s16_image[file]", data.s16_image.file);
      } else {

        formData.append("s16_image[existingPath]", data.s16_image?.existingPath || "");
      }
      formData.append("s16_image[alt]", data.s16_image?.alt || "");
      formData.append("s16_image[name]", data.s16_image?.name || "");

      // Section 17 (added from your provided payload)
      formData.append("s17_heading", data.s17_heading || "");
      formData.append("s17_content", data.s17_content || "");
      data.s17_btn?.forEach((btn, i) => { // Note: changed from s17_btn to s17_buttons as per your formatted data
        formData.append(`s17_btn[${i}][name]`, btn.name || "");
        btn.items?.forEach((item, j) => {
          formData.append(`s17_btn[${i}][items][${j}][h]`, item.h || "");
          formData.append(`s17_btn[${i}][items][${j}][t1]`, item.t1 || "");
          formData.append(`s17_btn[${i}][items][${j}][t2]`, item.t2 || "");
        });
      });


      // Send to API
      const response = await axiosClient.post(
        "admin/palm-jebel/store",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
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
          icon: "error",
          text: response.data?.message || "Error occurred!",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        text: "Submission failed. Check console for details.",
      });
    }
  };

  const onError = (errors) => {
    console.log("Validation Errors:", errors);
    let errorMessages = [];

    const extractErrors = (errObj, parentKey = "") => {
      Object.entries(errObj).forEach(([key, value]) => {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;

        if (value?.message) {
          errorMessages.push(`${fullKey}: ${value.message}`);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            extractErrors(item, `${fullKey}[${index}]`);
          });
        } else if (typeof value === "object") {
          extractErrors(value, fullKey);
        }
      });
    };

    extractErrors(errors);

    Swal.fire({
      icon: "error",
      title: "Validation Error",
      html: errorMessages.join("<br>"),
    });
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-3xl mb-4 font-semibold">
        Create Palm Jebel Ali Page
      </h2>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-6"
        >
          <SEOFields />

          <div className="flex flex-col space-y-6">
            <InputField name="email" label="Email" />
            <InputField name="phone" label="Phone Number" />
            <div className="mb-4">
              <label className="block text-sm font-medium">Banner Image:</label>
              <input type="file" {...register("b1_image.file")} />
            </div>

            <InputField name="b1_image.alt" label="Image Alt" />
            <InputField name="b1_image.name" label="Image Name" />
            <InputField name="b1_heading" label="Banner Heading" />

            {/* // Section 1 */}
            <Section1 />

            {/* Section Two */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Two</h3>
              <InputField name="s2_heading" label="Heading" />
              <QuillField
                control={methods.control}
                name="s2_content"
                label="Description"
                rules={{ required: "Required" }}
              />
            </div>

            {/* Section Three */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Three</h3>

              {/* Heading */}
              <InputField name="s3_heading" label="Title" />

              {/* Description */}
              <QuillField
                control={methods.control}
                name="s3_content"
                label="Description"
                rules={{ required: "Required" }}
              />

              {/* Image 1 */}
              <ImageField
                name="s3_image_1"
                label="Image 1"
                altName="s3_image_1.alt"
                nameName="s3_image_1.name"
              />

              {/* Image 2 */}
              <ImageField
                name="s3_image_2"
                label="Image 2"
                altName="s3_image_2.alt"
                nameName="s3_image_2.name"
              />

              {/* Items */}
              <FormFieldArray
                name="s3_items"
                label="Items"
                renderField={(field, index) => (
                  <div
                    key={field.id}
                    className="border p-4 rounded-md space-y-4"
                  >
                    <InputField name={`s3_items[${index}].h`} label="Heading" />
                    <InputField name={`s3_items[${index}].t`} label="Text" />
                    {/* <ImageField
                      name={`s3_items[${index}].file_path`}
                      label="Image"
                      altName={`s3_items[${index}].file_path.alt`}
                      nameName={`s3_items[${index}].file_path.name`}
                    /> */}
                    <div>
                      <label className="mb-1 text-sm font-medium text-gray-700">
                        Image File
                      </label>
                      <input type="file" {...register(`s3_items[${index}].image.file`)} />
                      <InputField name={`s3_items[${index}].image.alt`} label="Image Alt" />
                      <InputField name={`s3_items[${index}].image.name`} label="Image Name" />
                    </div>
                  </div>
                )}
              />
            </div>

            {/* Section Four */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Four</h3>

              <InputField name="s4_heading" label="Title" />

              <QuillField
                control={methods.control}
                name="s4_content"
                label="Description"
                rules={{ required: "Required" }}
              />

              <FormFieldArray
                name="s4_items"
                label="Section 4 Items"
                renderField={(field, index) => (
                  <div key={field.id} className="space-y-4">
                    <InputField name={`s4_items[${index}].h`} label="Heading" />
                    <InputField name={`s4_items[${index}].t`} label="Text" />
                    <ImageField
                      name={`s4_items[${index}].image`}
                      label="Image"
                      altName={`s4_items[${index}].image.alt`}
                      nameName={`s4_items[${index}].image.name`}
                    />
                  </div>
                )}
              />
            </div>

            {/* Section Five */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Five</h3>

              {/* Top Text */}
              <InputField name="s5_top_text" label="Top Text" />

              {/* Heading and Content */}
              <InputField name="s5_heading" label="Title" />
              <QuillField
                control={methods.control}
                name="s5_content"
                label="Description"
                rules={{ required: "Required" }}
              />

              {/* Image Object */}
              <div className="border p-4">
                <label>Section Image</label>
                <input type="file" {...register("s5_image.file")} />
                <InputField name="s5_image.alt" label="Alt Text" />
                <InputField name="s5_image.name" label="Image Name" />
              </div>

              {/* s5_points */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Points</h4>
                {s5PointsFields.map((field, index) => (
                  <div key={field.id} className="border p-4">
                    <InputField
                      name={`s5_points[${index}].h`}
                      label="Heading"
                    />
                    <InputField
                      name={`s5_points[${index}].t`}
                      label="Text (optional)"
                    />
                    <div>
                      <label>Image File</label>
                      <input
                        type="file"
                        {...register(`s5_points[${index}].image.file`)}
                      />
                      <InputField
                        name={`s5_points[${index}].image.alt`}
                        label="Alt Text"
                      />
                      <InputField
                        name={`s5_points[${index}].image.name`}
                        label="Image Name"
                      />
                    </div>
                    <button
                      onClick={() => s5PointsRemove(index)}
                      className="text-red-600 underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    s5PointsAppend({
                      h: "",
                      t: "",
                      image: { file: null, alt: "", name: "" },
                    })
                  }
                  className="text-blue-600 underline"
                >
                  + Add Point
                </button>
              </div>

              {/* s5_items */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Items</h4>
                {s5ItemsFields.map((field, index) => (
                  <div key={field.id} className="border p-4">
                    <InputField name={`s5_items[${index}].h`} label="Heading" />
                    <InputField name={`s5_items[${index}].t`} label="Text" />
                    {/* <div>
                      <label>Image File</label>
                      <input
                        type="file"
                        {...register(`s5_items[${index}].image.file`)}
                      />
                      <InputField
                        name={`s5_items[${index}].image.alt`}
                        label="Alt Text"
                      />
                      <InputField
                        name={`s5_items[${index}].image.name`}
                        label="Image Name"
                      />
                    </div> */}
                    <button
                      onClick={() => s5ItemsRemove(index)}
                      className="text-red-600 underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    s5ItemsAppend({
                      h: "",
                      t: "",
                      image: { file: null, alt: "", name: "" },
                    })
                  }
                  className="bg-blue-500 text-white px-2 py-1 rounded w-fit"
                >
                  Add Item
                </button>
              </div>
            </div>

            {/* Section Six */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Six</h3>

              {/* Removed Image fields: s6_image.file, s6_image.alt, s6_image.name */}

              <InputField name="s6_top_text" label="Top Text" />
              <InputField name="s6_heading" label="Heading" />
              {/* <QuillField
                control={methods.control}
                name="s6_content"
                label="Content"
                rules={{ required: "Required" }}
              /> */}
               <div className="space-y-4">
                <h4 className="text-lg font-medium">Content</h4>
                {s6Fields.map((field, index) => (
                  <div key={field.id} className="border p-4">
                    <InputField name={`s6_content[${index}].h`} label="Heading" />
                    <InputField name={`s6_content[${index}].t`} label="Text" />
                    <button
                    type="button"
                      onClick={() => s6Remove(index)}
                      className="text-red-600 underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                type="button"
                  onClick={() =>
                    s6Append({
                      h: "",
                      t: "",
                    })
                  }
                  className="bg-blue-500 text-white px-2 py-1 rounded w-fit"
                >
                  Add Item
                </button>
              </div>
            </div>

            {/* Section 7 */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Seven</h3>
              <InputField name="s7_heading" label="Section 7 Heading" />
            </div>

            {/* Section Eight */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Eight</h3>

              <InputField name="s8_top_text" label="Top Text" />
              <InputField name="s8_heading" label="Title" />
              <InputField name="s8_bottom_text" label="Bottom Text" />
              {/* <QuillField
                control={methods.control}
                name="s8_content"
                label="Description"
                rules={{ required: "Required" }}
              /> */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Content</h4>
                {s8Fields.map((field, index) => (
                  <div key={field.id} className="border p-4">
                    <InputField name={`s8_content[${index}].h`} label="Heading" />
                    <InputField name={`s8_content[${index}].t`} label="Text" />
                    <button
                    type="button"
                      onClick={() => s8Remove(index)}
                      className="text-red-600 underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                type="button"
                  onClick={() =>
                    s8Append({
                      h: "",
                      t: "",
                    })
                  }
                  className="bg-blue-500 text-white px-2 py-1 rounded w-fit"
                >
                  Add Item
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Section 8 Items</h4>
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="border p-4 rounded-md space-y-2"
                  >
                    <InputField
                      name={`s8_items[${index}].h`}
                      label="Item Heading"
                    />
                    <InputField
                      name={`s8_items[${index}].t`}
                      label="Item Text"
                    />
                    <div>
                      <label className="mb-1 text-sm font-medium text-gray-700">
                        Item Image File
                      </label>
                      <input
                        type="file"
                        {...register(`s8_items[${index}].image.file`)}
                      />
                      <InputField
                        name={`s8_items[${index}].image.alt`}
                        label="Image Alt"
                      />
                      <InputField
                        name={`s8_items[${index}].image.name`}
                        label="Image Name"
                      />
                    </div>
                    <button
                      type="button"
                      className="text-red-500 text-sm"
                      onClick={() => remove(index)}
                    >
                      Remove Item
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="text-blue-600 text-sm"
                  onClick={() =>
                    append({
                      h: "",
                      t: "",
                      image: {
                        file: null,
                        alt: "",
                        name: "",
                        existingPath: "",
                      },
                    })
                  }
                >
                  Add Item
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Nine</h3>
              <InputField name={`s9_heading`} label="Heading" />
            </div>

            {/* Section 10 */}
            <div className="flex flex-col space-y-6">
              <h3 className="text-xl font-semibold">Section 10</h3>
              <InputField name="s10_heading" label="Title" />

              {/* Single Image Upload for s10_image */}
              <div className="border p-4 rounded shadow-sm space-y-4">
                <label className="font-medium">Section 10 Image</label>
                <input type="file" {...register("s10_image.file")} />
                <InputField name="s10_image.alt" label="Alt Text" />
                <InputField name="s10_image.name" label="Image Name" />
              </div>

              {/* Section 10 Items */}
              <h3 className="text-xl font-semibold">Section 10 Items</h3>
              {s10ItemsFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border p-4 rounded shadow-sm space-y-4"
                >
                  <InputField name={`s10_items[${index}].h`} label="Heading" />
                  <InputField name={`s10_items[${index}].t`} label="Text" />
                  <div>
                    <label className="font-medium">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setValue(
                          `s10_items.${index}.image.file`,
                          e.target.files[0]
                        )
                      }
                      className="mb-2"
                    />
                    <InputField
                      name={`s10_items[${index}].image.alt`}
                      label="Alt Text"
                    />
                    <InputField
                      name={`s10_items[${index}].image.name`}
                      label="Image Name"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => s10ItemsRemove(index)}
                    className="text-red-600 underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  s10ItemsAppend({
                    h: "",
                    t: "",
                    image: { file: null, alt: "", name: "" },
                  })
                }
                className="bg-blue-500 text-white px-2 py-1 rounded w-fit"
              >
                Add Item
              </button>
            </div>

            {/* Section 11 */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Eleven</h3>
              <div>
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input type="file" {...register("s11_image.file")} />
                <InputField name="s11_image.alt" label="Image Alt" />
                <InputField name="s11_image.name" label="Image Name" />
              </div>
            </div>

            {/* Section 12 */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section 12</h3>

              <InputField name="s12_heading" label="Section 12 Heading" />

              <QuillField
                control={methods.control}
                name="s12_content"
                label="Description"
                rules={{ required: "Required" }}
              />

              {/* Add support for s12_images */}
              <ImageUploadRepeater
                name="s12_images"
                label="Section 12 Images"
                control={methods.control}
                register={methods.register}
                setValue={methods.setValue}
                getValues={methods.getValues}
                maxImages={10} // optional limit
              />

              {s12Fields.map((field, index) => (
                <div key={field.id} className="border p-4">
                  <InputField
                    name={`s12_btn[${index}].name`}
                    label="Button Name"
                  />
                  <S12BtnItems
                    nestIndex={index}
                    control={control}
                    register={register}
                  />

                  <button
                    type="button"
                    onClick={() => s12Remove(index)}
                    className="text-red-600 underline"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => s12Append({ name: "", items: [] })}
                className="bg-blue-500 text-white px-2 py-1 rounded w-fit"
              >
                Add Button Group
              </button>
            </div>

            <Section13
              register={methods.register}
              control={methods.control}
              setValue={methods.setValue}
            />

            {/* Section 14 */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section 14</h3>

              {/* Heading */}
              <div>
                <label className="font-medium block">Heading</label>
                <input
                  type="text"
                  {...register("s14_heading")}
                  className="w-full mt-1 border rounded px-3 py-1"
                  placeholder="Enter section 14 heading"
                />
              </div>

              {/* Content */}
              <div>
                <label className="font-medium block">Content</label>
                <textarea
                  {...register("s14_content")}
                  className="w-full mt-1 border rounded px-3 py-1"
                  placeholder="Enter section 14 content"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="font-medium block">Image File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setValue("s14_image.file", file);
                    }
                  }}
                  className="mt-1"
                />
              </div>

              {/* Image Alt */}
              <div>
                <label className="font-medium block">Image Alt</label>
                <input
                  type="text"
                  {...register("s14_image.alt")}
                  className="w-full mt-1 border rounded px-3 py-1"
                  placeholder="Enter image alt text"
                />
              </div>

              {/* Image Name */}
              <div>
                <label className="font-medium block">Image Name</label>
                <input
                  type="text"
                  {...register("s14_image.name")}
                  className="w-full mt-1 border rounded px-3 py-1"
                  placeholder="Enter image name"
                />
              </div>
            </div>

            {/* Section 15 */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section 15</h3>

              {/* Heading */}
              <div>
                <label className="font-medium block">Heading</label>
                <input
                  type="text"
                  {...register("s15_heading")}
                  className="w-full mt-1 border rounded px-3 py-1"
                  placeholder="Enter section 15 heading"
                />
              </div>

              {/* Content */}
              <div>
                <label className="font-medium block">Content</label>
                <textarea
                  {...register("s15_content")}
                  className="w-full mt-1 border rounded px-3 py-1"
                  placeholder="Enter section 15 content"
                />
              </div>

              {/* Items */}
              <div>
                <label className="font-medium block">Items</label>
                {fields15.map((item, index) => (
                  <div key={item.id} className="border p-3 mb-4 rounded">
                    <input
                      type="text"
                      {...register(`s15_items.${index}.h`)}
                      placeholder="Heading"
                      className="w-full mb-2 border rounded px-3 py-1"
                    />
                    <input
                      type="text"
                      {...register(`s15_items.${index}.t`)}
                      placeholder="Text"
                      className="w-full mb-2 border rounded px-3 py-1"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setValue(
                          `s15_items.${index}.image.file`,
                          e.target.files[0]
                        )
                      }
                      className="mb-2"
                    />
                    <input
                      type="text"
                      {...register(`s15_items.${index}.image.alt`)}
                      placeholder="Image Alt"
                      className="w-full mb-2 border rounded px-3 py-1"
                    />
                    <input
                      type="text"
                      {...register(`s15_items.${index}.image.name`)}
                      placeholder="Image Name"
                      className="w-full border rounded px-3 py-1"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    append15({
                      h: "",
                      t: "",
                      image: {
                        file: null,
                        alt: "",
                        name: "",
                        existingPath: "",
                      },
                    })
                  }
                  className="mt-2 px-4 py-1 rounded bg-blue-500 text-white"
                >
                  Add Item
                </button>
              </div>
            </div>

            {/* Section 16 */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section 16</h3>

              {/* Heading */}
              <div>
                <label className="font-medium block">Heading</label>
                <input
                  type="text"
                  {...register("s16_heading")}
                  className="w-full mt-1 border rounded px-3 py-1"
                  placeholder="Enter section 16 heading"
                />
              </div>

              {/* Content */}
              <div>
                {/* <label className="font-medium block">Content</label> */}
                {/* <textarea
                  {...register("s16_content")}
                  className="w-full mt-1 border rounded px-3 py-1"
                  placeholder="Enter section 16 content"
                /> */}
                <QuillField
                control={methods.control}
                name="s16_content"
                label="Content"
                rules={{ required: "Required" }}
              />
              </div>

              {/* Image */}
              <div>
                <label className="font-medium block">Image File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setValue("s16_image.file", file);
                    }
                  }}
                  className="mt-1"
                />
                {/* <input
                  type="text"
                  {...register("s16_image.alt")}
                  placeholder="Image Alt"
                  className="w-full mt-2 border rounded px-3 py-1"
                />
                <input
                  type="text"
                  {...register("s16_image.name")}
                  placeholder="Image Name"
                  className="w-full mt-2 border rounded px-3 py-1"
                /> */}
                {/* Image Alt */}
                <InputField name="s16_image.alt" label="Image Alt" />
                <InputField name="s16_image.name" label="Image Name" />
              </div>
            </div>

            <div className="border p-3 mb-4 rounded">
              <h2 className="text-xl font-semibold">Section 17</h2>

              <InputField name={`s17_heading`} label="Heading" />
              <QuillField
                control={control}
                name="s17_content"
                label="Description"
                rules={{ required: "Required" }}
              />

              {fields17.map((btn, btnIndex) => (
                <Section17Group
                  key={btn.id}
                  btnIndex={btnIndex}
                  control={methods.control}
                  register={methods.register}
                />
              ))}
            </div>

            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded w-fit"
              onClick={() =>
                append17({ name: "", items: [{ h: "", t1: "", t2: "" }] })
              }
            >
              Add Button Group
            </button>
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
                {...methods.register("footer_section_image.file")}
              />

            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                footer section Image Alt
              </label>
              <input
                placeholder="footer section image alt"
                {...methods.register("footer_section_image.alt")}
                className="rounded p-3 border border-gray-300 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                footer Section Image Text
              </label>
              <input
                placeholder="footer section img text"
                {...methods.register("footer_section_image.name")}
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

          <button type="submit" className="bg-blue-600 text-white p-3 rounded">
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

const S12BtnItems = ({ control, nestIndex, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `s12_btn[${nestIndex}].items`,
  });

  return (
    <div className="space-y-4 mt-2">
      {fields.map((item, k) => (
        <div key={item.id} className="border p-3 bg-gray-50 rounded">
          <InputField
            name={`s12_btn[${nestIndex}].items[${k}].h`}
            label="Item Heading"
          />
          <InputField
            name={`s12_btn[${nestIndex}].items[${k}].t1`}
            label="Item T1"
          />
          <InputField
            name={`s12_btn[${nestIndex}].items[${k}].t2`}
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

const getNestedError = (errors, name) => {
  return name.split(".").reduce((acc, part) => acc?.[part], errors);
};

const InputField = ({ name, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = getNestedError(errors, name);

  return (
    <div className="flex flex-col w-full">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        {...register(name)}
        placeholder={label}
        className={`rounded p-3 text-base border ${error ? "border-red-500" : "border-gray-300"
          }`}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
};

const Section17Group = ({ btnIndex, control, register }) => {
  const {
    fields: itemFields,
    append: appendItems,
    remove: removeItems, // 👈 Get remove function
  } = useFieldArray({
    control,
    name: `s17_btn.${btnIndex}.items`,
  });

  return (
    <div className="border p-3 mb-4 rounded">
      {/* <h2 className="text-xl font-semibold">Section 17</h2> */}

      {/* Button Name */}
      <label className="font-medium block mb-1">Button Name</label>
      <input
        type="text"
        {...register(`s17_btn.${btnIndex}.name`)}
        className="w-full mb-2 border rounded px-3 py-1"
        placeholder="Enter button name"
      />

      {/* Item List */}
      {itemFields.map((_, itemIndex) => (
        <div key={itemIndex} className="p-2 mb-2 rounded bg-gray-50 relative">
          <input
            type="text"
            {...register(`s17_btn.${btnIndex}.items.${itemIndex}.h`)}
            placeholder="Item Heading"
            className="w-full mb-1 border rounded px-3 py-1"
          />
          <input
            type="text"
            {...register(`s17_btn.${btnIndex}.items.${itemIndex}.t1`)}
            placeholder="Text 1"
            className="w-full mb-1 border rounded px-3 py-1"
          />
          <input
            type="text"
            {...register(`s17_btn.${btnIndex}.items.${itemIndex}.t2`)}
            placeholder="Text 2"
            className="w-full mb-1 border rounded px-3 py-1"
          />

          {/* Remove Button */}
          <button
            type="button"
            className="text-red-500 hover:text-red-700"
            onClick={() => removeItems(itemIndex)}
          >
            Remove
          </button>
        </div>
      ))}

      {/* Add Item Button */}
      <button
        type="button"
        className="px-3 py-1 bg-green-500 text-white rounded mt-2"
        onClick={() => appendItems({ h: "", t1: "", t2: "" })}
      >
        Add Item
      </button>
    </div>
  );
};

const Section1 = () => {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "s1_items",
  });

  return (
    <>
      {/* Section 1 */}
      <InputField name="s1_heading" label="Section 1 Heading" />

      <QuillField
        control={control}
        name="s1_content"
        label="Description"
        rules={{ required: "Required" }}
      />

      <InputField name="s1_btn_link" label="Section 1 Button Link" />

      {/* s1_items Add/Remove */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Section 1 Items</h4>
        </div>

        {fields.map((item, index) => (
          <div
            key={item.id}
            className="border p-4 mb-4 rounded-md relative bg-gray-50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                name={`s1_items[${index}].h`}
                label={`Item ${index + 1} Heading`}
                register={register}
              />
              <InputField
                name={`s1_items[${index}].t`}
                label={`Item ${index + 1} Text`}
                register={register}
              />
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ h: "", t: "" })}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Item
        </button>
      </div>
    </>
  );
};

const ImageUploadRepeater = ({
  name,
  control,
  register,
  setValue,
  getValues,
  label,
  maxImages = 5,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setValue(`${name}[${index}].file`, file);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h4 className="text-lg font-medium">{label}</h4>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border p-4 rounded-md space-y-3 bg-gray-50"
        >
          <div>
            <label className="block font-semibold">Image File</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, index)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block font-semibold">Alt Text</label>
            <input
              type="text"
              {...register(`${name}[${index}].alt`)}
              className="w-full border rounded px-3 py-1 mt-1"
              placeholder="Enter alt text"
            />
          </div>

          <div>
            <label className="block font-semibold">Image Name</label>
            <input
              type="text"
              {...register(`${name}[${index}].name`)}
              className="w-full border rounded px-3 py-1 mt-1"
              placeholder="Enter image name"
            />
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-600 underline mt-2"
          >
            Remove
          </button>
        </div>
      ))}

      {fields.length < maxImages && (
        <button
          type="button"
          onClick={() =>
            append({ file: null, alt: "", name: "", existingPath: "" })
          }
          className="bg-blue-500 text-white px-4 py-1 rounded w-fit"
        >
          Add Image
        </button>
      )}
    </div>
  );
};

const Section13 = ({ register, control, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "s13_items",
  });

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setValue(`s13_items[${index}].image.file`, file);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Section 13 Items</h2>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="p-4 border rounded-md bg-gray-50 space-y-4"
        >
          {/* Heading */}
          <div>
            <label className="font-medium block">Heading</label>
            <input
              type="text"
              {...register(`s13_items[${index}].h`)}
              className="w-full mt-1 border rounded px-3 py-1"
              placeholder="Enter heading"
            />
          </div>

          {/* Text */}
          <div>
            <label className="font-medium block">Text</label>
            <textarea
              {...register(`s13_items[${index}].t`)}
              className="w-full mt-1 border rounded px-3 py-1"
              placeholder="Enter text"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-medium block">Image File</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, index)}
              className="mt-1"
            />
          </div>

          {/* Alt */}
          <div>
            <label className="font-medium block">Image Alt</label>
            <input
              type="text"
              {...register(`s13_items[${index}].image.alt`)}
              className="w-full mt-1 border rounded px-3 py-1"
              placeholder="Enter image alt text"
            />
          </div>

          {/* Name */}
          <div>
            <label className="font-medium block">Image Name</label>
            <input
              type="text"
              {...register(`s13_items[${index}].image.name`)}
              className="w-full mt-1 border rounded px-3 py-1"
              placeholder="Enter image name"
            />
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-600 underline mt-2"
          >
            Remove Item
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            h: "",
            t: "",
            image: { file: null, alt: "", name: "", existingPath: "" },
          })
        }
        className="bg-blue-600 text-white px-4 py-1 rounded w-fit"
      >
        Add Item
      </button>
    </div>
  );
};

export default PalmJebelAliForm;
