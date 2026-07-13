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

  b1_heading: yup.string().required("Banner Heading is required"),
  b1_image: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("Banner Image Alt is required"),
    name: yup.string().required("Banner Image Name is required"),
    existingPath: yup.string().nullable(),
  }),
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
  s1_heading: yup.string().required("Section 1 Heading is required"),
  s1_content: yup.string().required("Section 1 Content is required"),
  s1_btn_link: yup.string().url().required("Section 1 Button Link is required"),

  s2_content: yup.string().required("Section 2 Content is required"),
  s2_image: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("Section 2 Image Alt is required"),
    name: yup.string().required("Section 2 Image Name is required"),
    existingPath: yup.string().nullable(),
  }),
  s2_items: yup.array().of(
    yup.object().shape({
      h: yup.string().required("S2 item heading is required"),
      t: yup.string().required("S2 item text is required"),
      image: yup.object().shape({
        file: yup.mixed().nullable(),
        alt: yup.string().required("S2 item image alt is required"),
        name: yup.string().required("S2 item image name is required"),
        existingPath: yup.string().nullable(),
      }),
    })
  ),

  s3_heading: yup.string().required("Section 3 Heading is required"),
  s3_content: yup.string().required("Section 3 Content is required"),

  s4_heading: yup.string().required("Section 4 Heading is required"),
  s4_content: yup.string().required("Section 4 Content is required"),
  s4_image: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("Section 4 Image Alt is required"),
    name: yup.string().required("Section 4 Image Name is required"),
    existingPath: yup.string().nullable(),
  }),

  s5_heading: yup.string().required("Section 5 Heading is required"),
  s5_content: yup.string().required("Section 5 Content is required"),
  s5_items: yup.array().of(
    yup.object().shape({
      h: yup.string().required("S5 item heading is required"),
      t: yup.string().required("S5 item text is required"),
      image: yup.object().shape({
        file: yup.mixed().nullable(),
        alt: yup.string().required("S5 item image alt is required"),
        name: yup.string().required("S5 item image name is required"),
        existingPath: yup.string().nullable(),
      }),
    })
  ),

  s6_heading: yup.string().required("Section 6 Heading is required"),
  // s6_content: yup.string().required("Section 6 Content is required"),
  s6_image: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("Section 6 Image Alt is required"),
    name: yup.string().required("Section 6 Image Name is required"),
    existingPath: yup.string().nullable(),
  }),
    s6_content: yup.array().of(
    yup.object().shape({
      h: yup.string().required(),
      t: yup.string().required(),
      image: yup.object().shape({
        file_path: yup.mixed(),
        existingPath: yup.string(),
        // alt: yup.string().required(),
        // name: yup.string().required(),
      }),
    })
  ),
  

  s7_heading: yup.string().required("Section 7 Heading is required"),
  s7_items: yup.array().of(
    yup.object().shape({
      number: yup.string().required("S7 item number is required"),
      h: yup.string().required("S7 item heading is required"),
      t: yup.string().required("S7 item text is required"),
    })
  ),

  s8_heading: yup.string().required("Section 8 Heading is required"),
  s8_content: yup.string().required("Section 8 Content is required"),
  s8_btn_link: yup.string().required("Section 8 Button Link is required"),
  s8_image: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("Section 8 Image Alt is required"),
    name: yup.string().required("Section 8 Image Name is required"),
    existingPath: yup.string().nullable(),
  }),

  s9_heading: yup.string().required("Section 9 Heading is required"),
  s9_content: yup.string().required("Section 9 Content is required"),

  s10_heading: yup.string().required("Section 10 Heading is required"),
  s10_content: yup.string().required("Section 10 Content is required"),
  s10_images: yup.array().of(
    yup.object().shape({
      file: yup.mixed().nullable(),
      alt: yup.string().required("S10 image alt is required"),
      name: yup.string().required("S10 image name is required"),
      existingPath: yup.string().nullable(),
    })
  ),

  s11_heading: yup.string().required("Section 11 Heading is required"),
  s11_content: yup.string().required("Section 11 Content is required"),
  s11_image: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("S11 image alt is required"),
    name: yup.string().required("S11 image name is required"),
    existingPath: yup.string().nullable(),
  }),

  s12_heading: yup.string().required("Section 12 Heading is required"),
  s12_content: yup.string().required("Section 12 Content is required"),
  s12_btn: yup.array().of(
    yup.object().shape({
      name: yup.string().required("S12 button name is required"),
      items: yup.array().of(
        yup.object().shape({
          h: yup.string().required("Item heading is required"),
          t1: yup.string().required("Item t1 is required"),
          t2: yup.string().required("Item t2 is required"),
        })
      ),
    })
  ),

  s14_heading: yup.string().required("Section 14 Heading is required"),
  s14_content: yup.string().required("Section 14 Content is required"),
  s14_email: yup.string().email().required("Email is required"),
  s14_phone: yup.string().required("Phone is required"),
});

const PalmJumeirahForm = ({ editData, setStatus, setEditData, fetchData }) => {
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

      s1_heading: "",
      s1_content: "",
      s1_btn_link: "",
      footer_section_image: [],
      footer_section_title: "",
      footer_section_description: "",
      footer_section_btn_1_text: "",
      footer_section_btn_1_link: "",
      footer_section_btn_2_text: "",
      footer_section_btn_2_link: "",
      s2_content: "",
      s2_image: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },
      s2_items: [
        {
          image: {
            file: null,
            alt: "",
            name: "",
            existingPath: "",
          },
          h: "",
          t: "",
        },
      ],

      s3_heading: "",
      s3_content: "",

      s4_heading: "",
      s4_content: "",
      s4_image: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },

      s5_heading: "",
      s5_content: "",
      s5_items: [
        {
          image: {
            file: null,
            alt: "",
            name: "",
            existingPath: "",
          },
          h: "",
          t: "",
        },
      ],

      s6_heading: "",
      // s6_content: "",
      s6_image: {
        file: null,
        // alt: "",
        // name: "",
        existingPath: "",
      },
       s6_content : [{}],

      s7_heading: "",
      s7_items: [
        {
          number: "",
          h: "",
          t: "",
        },
      ],

      s8_heading: "",
      s8_content: "",
      s8_btn_link: "",
      s8_image: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },

      s9_heading: "",
      s9_content: "",

      s10_heading: "",
      s10_content: "",
      s10_images: [
        {
          file: null,
          alt: "",
          name: "",
          existingPath: "",
        },
      ],

      s11_heading: "",
      s11_content: "",
      s11_image: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },

      s12_heading: "",
      s12_content: "",
      s12_btn: [
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

      s14_heading: "",
      s14_content: "",
      s14_email: "",
      s14_phone: "",
    },
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;
  const {
    fields: s2ItemsFields,
    append: s2ItemsAppend,
    remove: s2ItemsRemove,
  } = useFieldArray({ control, name: "s2_items" });

  const {
    fields: s5ItemsFields,
    append: s5ItemsAppend,
    remove: s5ItemsRemove,
  } = useFieldArray({ control, name: "s5_items" });

  const s6Items = useFieldArray({control , name:"s6_content"});

  const {
    fields: s7ItemsFields,
    append: s7ItemsAppend,
    remove: s7ItemsRemove,
  } = useFieldArray({ control, name: "s7_items" });

  const {
    fields: s10ItemsFields,
    append: s10ItemsAppend,
    remove: s10ItemsRemove,
  } = useFieldArray({ control, name: "s10_images" });

  const {
    fields: s12Fields,
    append: s12Append,
    remove: s12Remove,
  } = useFieldArray({ control, name: "s12_btn" });

  useEffect(() => {
    if (editData) {
      const { Page, pageSection } = editData;

      const getContent = (sectionName) =>
        pageSection.find((section) => section.name === sectionName)?.content ||
        {};

      const getImage = (img = {}) => ({
        file: null,
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
        b1_heading: getContent("bannerSection").b1_heading || "",
        b1_image: getImage(getContent("bannerSection").b1_image),



        // Section 1
        s1_heading: getContent("sectionOne").s1_heading || "",
        s1_content: getContent("sectionOne").s1_content || "",
        s1_btn_link: getContent("sectionOne").s1_btn_link || "",

        // Section 2
        s2_content: getContent("sectionTwo").s2_content || "",
        s2_image: getImage(getContent("sectionTwo").s2_image),
        s2_items: (getContent("sectionTwo").s2_items || []).map((item) => ({
          h: item.h || "",
          t: item.t || "",
          image: getImage(item.image || {}),
        })),

        // Section 3
        s3_heading: getContent("sectionThree").s3_heading || "",
        s3_content: getContent("sectionThree").s3_content || "",

        // Section 4
        s4_heading: getContent("sectionFour").s4_heading || "",
        s4_content: getContent("sectionFour").s4_content || "",
        s4_image: getImage(getContent("sectionFour").s4_image),

        // Section 5
        s5_heading: getContent("sectionFive").s5_heading || "",
        s5_content: getContent("sectionFive").s5_content || "",
        s5_items: (getContent("sectionFive").s5_items || []).map((item) => ({
          h: item.h || "",
          t: item.t || "",
          image: getImage(item.image || {}),
        })),

        // Section 6
        s6_heading: getContent("sectionSix").s6_heading || "",
        // s6_content: getContent("sectionSix").s6_content || "",
        s6_image: getImage(getContent("sectionSix").s6_image),
        // s6_content:  getContent("sectionSix").items?.map((items) => ({
        //     h: items.h || "",
        //     t: items.t || "",
        //     image: items.image
        //         ? {
        //           existingPath: items.image.file_path || "",
        //           alt: items.image.alt || "",
        //           name: items.image.name || "",
        //         }
        //         : {},
        //    })),

        // Section 7
        s6_content: getContent("sectionSix").s6_content?.map((item) => ({
  h: item.h || "",
  t: item.t || "",
  image: item.image
    ? {
        // file_path: item.image.file_path || "",
        existingPath: item.image.file_path || "", // keep both if needed
      }
    : {
        file_path: "",
        existingPath: "",
        alt: "",
        name: "",
      },
})),
        s7_heading: getContent("sectionSeven").s7_heading || "",
        s7_items: (getContent("sectionSeven").s7_items || []).map((item) => ({
          number: item.number || "",
          h: item.h || "",
          t: item.t || "",
        })),

        // Section 8
        s8_heading: getContent("sectionEight").s8_heading || "",
        s8_content: getContent("sectionEight").s8_content || "",
        s8_btn_link: getContent("sectionEight").s8_btn_link || "",
        s8_image: getImage(getContent("sectionEight").s8_image),

        // Section 9
        s9_heading: getContent("sectionNine").s9_heading || "",
        s9_content: getContent("sectionNine").s9_content || "",

        // Section 10
        s10_heading: getContent("sectionTen").s10_heading || "",
        s10_content: getContent("sectionTen").s10_content || "",
        s10_images: (getContent("sectionTen").s10_images || []).map((img) =>
          getImage(img)
        ),

        // Section 11
        s11_heading: getContent("sectionEleven").s11_heading || "",
        s11_content: getContent("sectionEleven").s11_content || "",
        s11_image: getImage(getContent("sectionEleven").s11_image),

        // Section 12
        s12_heading: getContent("sectionTwelve").s12_heading || "",
        s12_content: getContent("sectionTwelve").s12_content || "",
        s12_btn: (getContent("sectionTwelve").s12_buttons || []).map((btn) => ({
          name: btn.name || "",
          items: (btn.items || []).map((item) => ({
            h: item.h || "",
            t1: item.t1 || "",
            t2: item.t2 || "",
          })),
        })),

        // Section 14
        s14_heading: getContent("sectionfourteen").s14_heading || "",
        s14_content: getContent("sectionfourteen").s14_content || "",
        s14_email: getContent("sectionfourteen").s14_email || "",
        s14_phone: getContent("sectionfourteen").s14_phone || "",
      };

      reset(formattedData);
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted!", data);
      const formData = new FormData();

      // SEO & Basic Fields
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
      formData.append("email", data.email || "");
      formData.append("phone", data.phone || "");

      // Banner
      formData.append("b1_heading", data.b1_heading);
      formData.append("b1_image[alt]", data.b1_image?.alt || "");
      formData.append("b1_image[name]", data.b1_image?.name || "");
      if (data.b1_image?.file && data.b1_image.file[0]) {
        formData.append("b1_image[file]", data.b1_image.file[0]);
      } else {
        formData.append("b1_image[existingPath]", data.b1_image?.existingPath || "");
      }

      // Section 1
      formData.append("s1_heading", data.s1_heading);
      formData.append("s1_content", data.s1_content);
      formData.append("s1_btn_link", data.s1_btn_link);


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


      // Section 2
      formData.append("s2_content", data.s2_content);
      formData.append("s2_image[alt]", data.s2_image?.alt || "");
      formData.append("s2_image[name]", data.s2_image?.name || "");
      if (data.s2_image?.file && data.s2_image.file[0]) {
        formData.append("s2_image[file]", data.s2_image.file[0]);
      } else {
        formData.append("s2_image[existingPath]", data.s2_image?.existingPath || "");
      }

      data.s2_items?.forEach((item, index) => {
        formData.append(`s2_items[${index}][h]`, item.h);
        formData.append(`s2_items[${index}][t]`, item.t);
        formData.append(`s2_items[${index}][image][alt]`, item.image?.alt || "");
        formData.append(`s2_items[${index}][image][name]`, item.image?.name || "");
        if (item.image?.file && item.image.file[0]) {
          formData.append(`s2_items[${index}][image][file]`, item.image.file[0]);
        } else {
          formData.append(`s2_items[${index}][image][existingPath]`, item.image?.existingPath || "");
        }
      });

      // Section 3 (optional empty)
      formData.append("s3_heading", data.s3_heading || "");
      formData.append("s3_content", data.s3_content || "");

      // Section 4
      formData.append("s4_heading", data.s4_heading);
      formData.append("s4_content", data.s4_content);
      formData.append("s4_image[alt]", data.s4_image?.alt || "");
      formData.append("s4_image[name]", data.s4_image?.name || "");
      if (data.s4_image?.file && data.s4_image.file[0]) {
        formData.append("s4_image[file]", data.s4_image.file[0]);
      } else {
        formData.append("s4_image[existingPath]", data.s4_image?.existingPath || "");
      }

      // Section 5
      formData.append("s5_heading", data.s5_heading);
      formData.append("s5_content", data.s5_content);
      data.s5_items?.forEach((item, index) => {
        formData.append(`s5_items[${index}][h]`, item.h);
        formData.append(`s5_items[${index}][t]`, item.t);
        formData.append(`s5_items[${index}][image][alt]`, item.image?.alt || "");
        formData.append(`s5_items[${index}][image][name]`, item.image?.name || "");
        if (item.image?.file && item.image.file[0]) {
          formData.append(`s5_items[${index}][image][file]`, item.image.file[0]);
        } else {
          formData.append(`s5_items[${index}][image][existingPath]`, item.image?.existingPath || "");
        }
      });

      // Section 6
      formData.append("s6_heading", data.s6_heading);
      // formData.append("s6_content", data.s6_content);
      formData.append("s6_image[alt]", data.s6_image?.alt || "");
      formData.append("s6_image[name]", data.s6_image?.name || "");
      if (data.s6_image?.file && data.s6_image.file[0]) {
        formData.append("s6_image[file]", data.s6_image.file[0]);
      } else {
        formData.append("s6_image[existingPath]", data.s6_image?.existingPath || "");
      }
      data.s6_content.forEach((item , index) => {
      formData.append(`s6_content[${index}][h]` ,  item.h);
      formData.append(`s6_content[${index}][t]` ,  item.t);
       if (item?.image?.file_path?.[0]) {
        formData.append(
          `s6_content[${index}][image][file]`,
          item.image?.file_path[0]
        );
      } else {
        formData.append(
          `s6_content[${index}][image][existingPath]`,
          item.image.existingPath || ""
        );
      }
    });

    

      // Section 7
      formData.append("s7_heading", data.s7_heading);
      data.s7_items?.forEach((item, index) => {
        formData.append(`s7_items[${index}][number]`, item.number);
        formData.append(`s7_items[${index}][h]`, item.h);
        formData.append(`s7_items[${index}][t]`, item.t);
      });

      // Section 8
      formData.append("s8_heading", data.s8_heading);
      formData.append("s8_content", data.s8_content);
      formData.append("s8_btn_link", data.s8_btn_link);
      formData.append("s8_image[alt]", data.s8_image?.alt || "");
      formData.append("s8_image[name]", data.s8_image?.name || "");
      if (data.s8_image?.file && data.s8_image.file[0]) {
        formData.append("s8_image[file]", data.s8_image.file[0]);
      } else {
        formData.append("s8_image[existingPath]", data.s8_image?.existingPath || "");
      }

      // Section 9
      formData.append("s9_heading", data.s9_heading);
      formData.append("s9_content", data.s9_content);

      // Section 10
      formData.append("s10_heading", data.s10_heading);
      formData.append("s10_content", data.s10_content);
      data.s10_images?.forEach((img, index) => {
        formData.append(`s10_images[${index}][alt]`, img.alt || "");
        formData.append(`s10_images[${index}][name]`, img.name || "");
        if (img?.file && img.file[0]) {
          formData.append(`s10_images[${index}][file]`, img.file[0]);
        } else {
          formData.append(`s10_images[${index}][existingPath]`, img.existingPath || "");
        }
      });

      // Section 11
      formData.append("s11_heading", data.s11_heading);
      formData.append("s11_content", data.s11_content);
      formData.append("s11_image[alt]", data.s11_image?.alt || "");
      formData.append("s11_image[name]", data.s11_image?.name || "");
      if (data.s11_image?.file && data.s11_image.file[0]) {
        formData.append("s11_image[file]", data.s11_image.file[0]);
      } else {
        formData.append("s11_image[existingPath]", data.s11_image?.existingPath || "");
      }

      // Section 12
      formData.append("s12_heading", data.s12_heading);
      formData.append("s12_content", data.s12_content);
      data.s12_btn?.forEach((btn, i) => {
        formData.append(`s12_btn[${i}][name]`, btn.name);
        btn.items?.forEach((item, j) => {
          formData.append(`s12_btn[${i}][items][${j}][h]`, item.h);
          formData.append(`s12_btn[${i}][items][${j}][t1]`, item.t1);
          formData.append(`s12_btn[${i}][items][${j}][t2]`, item.t2);
        });
      });

      // Section 14
      formData.append("s14_heading", data.s14_heading);
      formData.append("s14_content", data.s14_content);
      formData.append("s14_email", data.s14_email);
      formData.append("s14_phone", data.s14_phone);

      // Send to API
      const response = await axiosClient.post("admin/palm-jumeirah/store", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        Swal.fire({ icon: "success", text: response.data?.message || "Success!" });
        reset();
        fetchData();
        setEditData(null);
        setStatus(1);
      } else {
        Swal.fire({ icon: "error", text: response.data?.message || "Error occurred!" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({ icon: "error", text: "Submission failed. Check console for details." });
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
      <h2 className="text-3xl mb-4 font-semibold">Create Palm Jumereih Page</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
          <SEOFields />

          <div className="flex flex-col space-y-6">
            <InputField name="email" label="Email" />
            <InputField
              name="phone"
              label="Phone Number"
            />

            {/* Section Banner */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Banner Section</h3>
              <div>
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input type="file" {...register("b1_image.file")} />
                <InputField name="b1_image.alt" label="Image Alt" />
                <InputField name="b1_image.name" label="Image Name" />
              </div>
              <InputField name="b1_heading" label="Banner Heading" />
            </div>
            {/* // Section 1 */}
            <InputField name="s1_heading" label="Section 1 Heading" />
            {/* <QuillField name="s1_content" label="Section 1 Content" control={control} /> */}
            <QuillField
              control={methods.control}
              name="s1_content"
              label="Description"
              rules={{ required: "Required" }}
            />
            <InputField name="s1_btn_link" label="Section 1 Button Link" />

            {/* Section Two */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Two</h3>
              <div>
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input type="file" {...register("s2_image.file")} />
                <InputField name="s2_image.alt" label="Image Alt" />
                <InputField name="s2_image.name" label="Image Name" />
              </div>
              <QuillField
                control={methods.control}
                name="s2_content"
                label="Description"
                rules={{ required: "Required" }}
              />
            </div>

            {s2ItemsFields.map((field, index) => (
              <div key={field.id} className="border p-4">
                <InputField name={`s2_items[${index}].h`} label="Heading" />
                <InputField name={`s2_items[${index}].t`} label="Text" />
                <div>
                  <label>Image File</label>
                  <input
                    type="file"
                    {...register(`s2_items[${index}].image.file`)}
                  />
                  <InputField
                    name={`s2_items[${index}].image.alt`}
                    label="Alt Text"
                  />
                  <InputField
                    name={`s2_items[${index}].image.name`}
                    label="Image Name"
                  />
                </div>
                <button
                  onClick={() => s2ItemsRemove(index)}
                  className="text-red-600 underline"
                >
                  Remove
                </button>
              </div>
            ))}
            <div
              onClick={() => s2ItemsAppend({ h: "", t: "", image: {} })}
              className="bg-blue-500 text-white cursor-pointer px-2 py-1 rounded w-fit"
            >
              Add Item
            </div>

            {/* Section Three */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Three</h3>
              <InputField name="s3_heading" label="Title" />
              <QuillField
                control={methods.control}
                name="s3_content"
                label="Description"
                rules={{ required: "Required" }}
              />
            </div>

            {/* Section Four */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Four</h3>
              <div>
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input type="file" {...register("s4_image.file")} />
                <InputField name="s4_image.alt" label="Image Alt" />
                <InputField name="s4_image.name" label="Image Name" />
              </div>
              <InputField name="s4_heading" label="Title" />
              <QuillField
                control={methods.control}
                name="s4_content"
                label="Description"
                rules={{ required: "Required" }}
              />
            </div>

            {/* Section Five */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Five</h3>
              <InputField name="s5_heading" label="Title" />
              <QuillField
                control={methods.control}
                name="s5_content"
                label="Description"
                rules={{ required: "Required" }}
              />
              {s5ItemsFields.map((field, index) => (
                <div key={field.id} className="border p-4">
                  <InputField name={`s5_items[${index}].h`} label="Heading" />
                  <InputField name={`s5_items[${index}].t`} label="Text" />
                  <div>
                    <label className="mr-4">Image File</label>
                    <input
                      type="file"
                      className="my-6"
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
                  </div>
                  <button
                    onClick={() => s5ItemsRemove(index)}
                    className="text-red-600 underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div
              type="button"
              onClick={() => s5ItemsAppend({ h: "", t: "", image: {} })}
              className="bg-blue-500 cursor-pointer text-white px-3 py-1 rounded w-fit"
            >
              Add Item
            </div>

            {/* Section Six */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Six</h3>
              <div>
                <label className="mb-1 mr-4 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input type="file" {...register("s6_image.file")} className="my-6" />
                <InputField name="s6_image.alt" label="Image Alt" />
                <InputField name="s6_image.name" label="Image Name" />
              </div>
              <InputField name="s6_heading" label="Title" />
              {/* <QuillField
                control={methods.control}
                name="s6_content"
                label="Description"
                rules={{ required: "Required" }}
              /> */}
            </div>
            {s6Items.fields.map((field, index) => (
          <div key={field.id} className="p-4 border mb-2 relative">
            <InputField
              name={`s6_content[${index}].h`}
              label="Section Heading"
            />
            <InputField
              name={`s6_content[${index}].t`}
              label="Section text"
            />

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Image File
              </label>
              <input
                type="file"
                {...methods.register(`s6_content[${index}].image.file_path`)}
              />
              {methods.formState.errors?.s6_content?.[index]
                ?.image?.file_path && (
                  <span className="text-red-500 text-sm mt-1">
                    {
                      methods.formState.errors.s6_content[index].image?.file_path
                        .message
                    }
                  </span>
                )}
            </div>
            {/* Remove Button */}
            <button
              type="button"
              onClick={() => s6Items.remove(index)}
              className="text-red-500 font-bold"
            >
              Remove
            </button>
          </div>
        ))}

        {/* Add Button */}
        <div className="my-4">
          <button
            type="button"
            onClick={() =>
              s6Items.append({
                h: "",
                t: "",
                image: { existingPath: "", alt: "", name: "" },
              })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Items
          </button>
        </div>
            {/* <button
              onClick={() => s5ItemsAppend({ h: "", t: "", image: {} })}
              className="bg-blue-500 text-white px-2 py-1 rounded w-fit"
            >
              Add Item
            </button> */}

            {/* Section Six */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Seven</h3>
              <InputField name="s7_heading" label="Section 7 Heading" />
              {s7ItemsFields.map((field, index) => (
                <div key={field.id} className="border p-4">
                  <InputField
                    name={`s7_items[${index}].number`}
                    label="Number"
                  />
                  <InputField name={`s7_items[${index}].h`} label="Heading" />
                  <InputField name={`s7_items[${index}].t`} label="Text" />
                  <button
                    onClick={() => s7ItemsRemove(index)}
                    className="text-red-600 underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div
              onClick={() => s7ItemsAppend({ number: "", h: "", t: "" })}
              className="bg-blue-500 text-white px-2 cursor-pointer py-1 rounded w-fit"
            >
              Add Item
            </div>

            {/* Section Eight */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Eight</h3>
              <div>
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input type="file" {...register("s8_image.file")} />
                <InputField name="s8_image.alt" label="Image Alt" />
                <InputField name="s8_image.name" label="Image Name" />
              </div>
              <InputField name="s8_heading" label="Title" />
              <QuillField
                control={methods.control}
                name="s8_content"
                label="Description"
                rules={{ required: "Required" }}
              />
              <InputField name="s8_btn_link" label="Button Link" />
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Nine</h3>
              <InputField name={`s9_heading`} label="Heading" />
              <QuillField
                control={methods.control}
                name="s9_content"
                label="Description"
                rules={{ required: "Required" }}
              />
            </div>

            {/* Section 10 Images */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Ten</h3>
              <InputField name="s10_heading" label="Title" />
              <QuillField
                control={methods.control}
                name="s10_content"
                label="Description"
                rules={{ required: "Required" }}
              />
            </div>
            <div className="flex flex-col space-y-6">
              <h3 className="text-xl font-semibold">Section 10 Images</h3>
              {s10ItemsFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border p-4 rounded shadow-sm space-y-4"
                >
                  <input
                    type="file"
                    {...register(`s10_images[${index}].file`)}
                  />
                  <InputField
                    name={`s10_images[${index}].alt`}
                    label="Alt Text"
                  />
                  <InputField
                    name={`s10_images[${index}].name`}
                    label="Image Name"
                  />
                  <button
                    type="button"
                    onClick={() => s10ItemsRemove(index)}
                    className="text-red-600 underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div
                type="button"
                onClick={() =>
                  s10ItemsAppend({ alt: "", name: "", file: null })
                }
                className="bg-blue-500 cursor-pointer text-white px-2 py-1 rounded w-fit"
              >
                Add Image
              </div>
            </div>

            {/* Section Four */}
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
              <InputField name="s11_heading" label="Title" />
              <QuillField
                control={methods.control}
                name="s11_content"
                label="Description"
                rules={{ required: "Required" }}
              />
            </div>

            {/* Section Four */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section 12</h3>
              <InputField name="s12_heading" label="Section 12 Heading" />
              {/* <QuillField name="s12_content" label="Section 12 Content" control={control} /> */}
              <QuillField
                control={methods.control}
                name="s12_content"
                label="Description"
                rules={{ required: "Required" }}
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
                    onClick={() => s12Remove(index)}
                    className="text-red-600 underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div
                onClick={() => s12Append({ name: "", items: [] })}
                className="bg-blue-500 text-white px-2 cursor-pointer py-1 rounded w-fit"
              >
                Add Button Group
              </div>
            </div>

            {/* Section 14 */}
            <div className="flex flex-col space-y-4">
              {/* <h3 className="text-xl font-semibold">Section Ten</h3> */}
            </div>
            <div className="flex flex-col space-y-6">
              <h3 className="text-xl font-semibold">Section 14</h3>
              <InputField name="s14_heading" label="Section 14 Heading" />
              <QuillField
                control={methods.control}
                name="s14_content"
                label="Description"
                rules={{ required: "Required" }}
              />
              <InputField name="s14_email" label="Email" />
              <InputField name="s14_phone" label="Phone" />
            </div>

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

          </div>

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

export default PalmJumeirahForm;
