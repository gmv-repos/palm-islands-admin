// src/views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/ContactUs Page/DubaiIslandForm.jsx

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

  email: yup.string().email().required("Email is required"),
  phone: yup.string().required("Phone is required"),

  // Banner Section
  b1_heading: yup.string().required("Banner Heading is required"),
  b1_image: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("Banner Image Alt is required"),
    name: yup.string().required("Banner Image Name is required"),
  }),

  s1_title: yup.string().required("Section 1 Title is required"),
  s1_description: yup.string().required("Section 1 Description is required"),
  s1_button_text: yup.string().required("Section 1 Button Text is required"),

  s2_title: yup.string().required("Section 2 Title is required"),
  s2_description: yup.string().required("Section 2 Description is required"),
  s2_image: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("Section 2 Image Alt is required"),
    name: yup.string().required("Section 2 Image Name is required"),
    existingPath: yup.string().nullable(),
  }),

  s3_title: yup.string().required("Section 3 Title is required"),
  s3_description: yup.string().required("Section 3 Description is required"),

  s4_title: yup.string().required("Section 4 Title is required"),
  s4_description: yup.string().required("Section 4 Description is required"),
  s4_image: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("Section 4 Image Alt is required"),
    name: yup.string().required("Section 4 Image Name is required"),
    existingPath: yup.string().nullable(),
  }),

  s5_title: yup.string().required("Section 5 Title is required"),
  s5_description: yup.string().required("Section 5 Description is required"),
  s5_cards: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Card Title is required"),
      description: yup.string().required("Card Description is required"),
      image: yup.object().shape({
        file: yup.mixed().nullable(),
        alt: yup.string().required("Card Image Alt is required"),
        name: yup.string().required("Card Image Name is required"),
        existingPath: yup.string().nullable(),
      }),
    })
  ),

  s6_title: yup.string().required("Section 6 Title is required"),
  s6_description: yup.string().required("Section 6 Description is required"),
  s6_button_text: yup.string().required("Section 6 Button Text is required"),
  s6_image: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("Section 6 Image Alt is required"),
    name: yup.string().required("Section 6 Image Name is required"),
    existingPath: yup.string().nullable(),
  }),

  s8_title: yup.string().required("Section 8 Title is required"),
  s8_description: yup.string().required("Section 8 Description is required"),
  s8_image: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("Section 8 Image Alt is required"),
    name: yup.string().required("Section 8 Image Name is required"),
    existingPath: yup.string().nullable(),
  }),

  s9_title: yup.string().required("Section 9 Title is required"),
  // s9_description: yup.string().required("Section 9 Description is required"),
  s9_cards: yup.array().of(
    yup.object().shape({
      number: yup.string().required("Card Number is required"),
      title: yup.string().required("Card Title is required"),
      description: yup.string().required("Card Description is required"),
    })
  ),

  s10_title: yup.string().required("Section 10 Title is required"),
  s10_description: yup.string().required("Section 10 Description is required"),
  s10_images: yup.array().of(
    yup.object().shape({
      file: yup.mixed().nullable(),
      alt: yup.string().required("Image Alt is required"),
      name: yup.string().required("Image Name is required"),
      existingPath: yup.string().nullable(),
    })
  ),

  s11_title: yup.string().required("Section 11 Title is required"),
  s11_description: yup.string().required("Section 11 Description is required"),
  // s11_image: yup.object().shape({
  //   file: yup.mixed().nullable(),
  //   alt: yup.string().required("Section 11 Image Alt is required"),
  //   name: yup.string().required("Section 11 Image Name is required"),
  //   existingPath: yup.string().nullable(),
  // }),
  s11_btn: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Name is required"),
      items: yup.array().of(
        yup.object().shape({
          t1: yup.string().required("Item text 1 is required"),
          t2: yup.string().required("Item text 2 is required"),
          h: yup.string().required("Item Heading is required"),
        })
      )
    })
  ),

  s12_title: yup.string().required("Section 12 Title is required"),
  s12_description: yup.string().required("Section 12 Description is required"),
  // s12_cards: yup.array().of(
  //   yup.object().shape({
  //     heading: yup.string().required("Heading is required"),
  //     text: yup.string().required("Text is required"),
  //     title: yup.string().required("Title is required"),
  //     description: yup.string().required("Description is required"),
  //   })
  // ),
  s12_image: yup.object().shape({
    file: yup.mixed().nullable(),
    alt: yup.string().required("Section 8 Image Alt is required"),
    name: yup.string().required("Section 8 Image Name is required"),
    existingPath: yup.string().nullable(),
  }),

  s7_title: yup.string().required("Section 7 Title is required"),
  s7_description: yup.string().required("Section 7 Description is required"),
});

const DubaiIslandForm = ({ editData, setStatus, setEditData, fetchData }) => {
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      footer_section_image: [],
      footer_section_title: "",
      footer_section_description: "",
      footer_section_btn_1_text: "",
      footer_section_btn_1_link: "",
      footer_section_btn_2_text: "",
      footer_section_btn_2_link: "",
      slug: "",
      meta_title: "",
      meta_description: "",
      canonical_url: "",
      focus_keyword: "",
      redirect_301: "",
      redirect_302: "",
      old_redirect_url: "",
      schema: "",
      email: "",
      phone: "",
      // Banner Section
      b1_heading: "",
      b1_image: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },

      s1_title: "",
      s1_description: "",
      s1_button_text: "",

      s2_title: "",
      s2_description: "",
      s2_image: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },

      s3_title: "",
      s3_description: "",

      s4_title: "",
      s4_description: "",
      s4_image: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },

      s5_title: "",
      s5_description: "",
      s5_cards: [],

      s6_title: "",
      s6_description: "",
      s6_button_text: "",
      s6_image: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },

      s7_title: "",
      s7_description: "",

      s8_title: "",
      s8_description: "",
      s8_image: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },

      s9_title: "",
      // s9_description: "",
      s9_cards: [],

      s10_title: "",
      s10_description: "",
      s10_images: [],

      s11_title: "",
      s11_description: "",
      // s11_image: {
      //   file: null,
      //   alt: "",
      //   name: "",
      //   existingPath: "",
      // },
      s11_btn: [],

      s12_title: "",
      s12_description: "",
      s12_image: {
        file: null,
        alt: "",
        name: "",
        existingPath: "",
      },

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
    fields: s5Fields,
    append: s5Append,
    remove: s5Remove,
  } = useFieldArray({ control, name: "s5_cards" });
  const {
    fields: s12Fields,
    append: s12Append,
    remove: s12Remove,
  } = useFieldArray({ control, name: "s12_cards" });
  const {
    fields: s10Fields,
    append: s10Append,
    remove: s10Remove,
  } = useFieldArray({ control, name: "s10_images" });
  const {
    fields: s9Fields,
    append: s9Append,
    remove: s9Remove,
  } = useFieldArray({ control, name: "s9_cards" });
  const {
    fields: s11Fields,
    append: s11Append,
    remove: s11Remove,
  } = useFieldArray({ control, name: "s11_btn" });


  useEffect(() => {
    if (editData) {
      const { Page, pageSection } = editData;

      const getContent = (sectionName) =>
        pageSection.find((section) => section.name === sectionName)?.content || {};

      const getImage = (img = {}) => ({
        file: null,
        alt: img?.alt || "",
        name: img?.name || "",
        existingPath: img?.file_path || "",
      });

      const formattedData = {
        // Page meta
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
        b1_exitsing: getImage(getContent("bannerSection").b1_image?.file_path),

        // Section One
        s1_title: getContent("sectionOne").s1_title || "",
        s1_button_text: getContent("sectionOne").s1_button_text || "",
        s1_description: getContent("sectionOne").s1_description || "",

        // Section Two
        s2_title: getContent("sectionTwo").s2_title || "",
        s2_description: getContent("sectionTwo").s2_description || "",
        s2_image: getImage(getContent("sectionTwo").s2_image),

        // Section Three
        s3_title: getContent("sectionThree").s3_title || "",
        s3_description: getContent("sectionThree").s3_description || "",

        // Section Four
        s4_title: getContent("sectionFour").s4_title || "",
        s4_description: getContent("sectionFour").s4_description || "",
        s4_image: getImage(getContent("sectionFour").s4_image),

        // Section Five
        s5_title: getContent("sectionFive").s5_title || "",
        s5_description: getContent("sectionFive").s5_description || "",
        s5_cards: (getContent("sectionFive").s5_cards || []).map((card) => ({
          title: card.title || "",
          description: card.description || "",
          image: getImage(card.image),
        })),

        // Section Six
        s6_title: getContent("sectionSix").s6_title || "",
        s6_description: getContent("sectionSix").s6_description || "",
        s6_button_text: getContent("sectionSix").s6_button_text || "",
        s6_image: getImage(getContent("sectionSix").s6_image),

        // Section Seven
        s7_title: getContent("sectionSeven").s7_title || "",
        s7_description: getContent("sectionSeven").s7_description || "",

        // Section Eight
        s8_title: getContent("sectionEight").s8_title || "",
        s8_description: getContent("sectionEight").s8_description || "",
        s8_image: getImage(getContent("sectionEight").s8_image),

        // Section Nine
        s9_title: getContent("sectionNine").s9_title || "",
        // s9_description: getContent("sectionNine").s9_description || "",
        s9_cards: (getContent("sectionNine").s9_cards || []).map((card) => ({
          number: card.number || "",
          title: card.title || "",
          description: card.description || "",
        })),

        // Section Ten
        s10_title: getContent("sectionTen").s10_title || "",
        s10_description: getContent("sectionTen").s10_description || "",
        s10_images: (getContent("sectionTen").s10_images || []).map((img) => getImage(img)),

        // Section Eleven
        s11_title: getContent("sectionEleven").s11_title || "",
        s11_description: getContent("sectionEleven").s11_description || "",
        // s11_image: getImage(getContent("sectionEleven").s11_image),
        s11_btn: (getContent("sectionEleven").s11_btn || []).map((btn) => ({
          name: btn.name || "",
          items: (btn.items || []).map((item) => ({
            h: item.h || "",
            t1: item.t1 || "",
            t2: item.t2 || "",
            t3: item.t3 || "", // optional: use "" if schema requires it
          })),
        })),

        // Section Twelve
        s12_title: getContent("sectionTwelve").s12_title || "",
        s12_description: getContent("sectionTwelve").s12_description || "",
        // s12_cards: (getContent("sectionTwelve").s12_cards || []).map((card) => ({
        //   heading: card.heading || "",
        //   text: card.text || "",
        //   title: card.title || "",
        //   description: card.description || "",
        // })),
        s12_image: getImage(getContent("sectionTwelve").s12_image),

      };

      reset(formattedData);
    }
  }, [editData, reset]);


  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Basic SEO Fields
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("meta_title", data.meta_title);
      formData.append("meta_description", data.meta_description);
      formData.append("canonical_url", data.canonical_url);
      formData.append("focus_keyword", data.focus_keyword);
      formData.append("schema", data.schema);
      formData.append("redirect_301", data.redirect_301 || "");
      formData.append("redirect_302", data.redirect_302 || "");
      formData.append("old_redirect_url", data.old_redirect_url || "");
      formData.append("email", data.email);
      formData.append("phone", data.phone);

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
      formData.append("s1_title", data.s1_title);
      formData.append("s1_description", data.s1_description);
      formData.append("s1_button_text", data.s1_button_text);

      // Section 2
      formData.append("s2_title", data.s2_title);
      formData.append("s2_description", data.s2_description);
      if (data.s2_image?.file && data.s2_image.file[0]) {
        formData.append("s2_image[file]", data.s2_image.file[0]);
      } else {
        formData.append("s2_image[existingPath]", data.s2_image?.existingPath || "");
      }
      formData.append("s2_image[alt]", data.s2_image?.alt || "");
      formData.append("s2_image[name]", data.s2_image?.name || "");

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

      // Append files if exist
      formData.append("s3_title", data.s3_title);
      formData.append("s3_description", data.s3_description);
      formData.append("s4_title", data.s4_title);
      formData.append("s4_description", data.s4_description);
      if (data.s4_image?.file && data.s4_image.file[0]) {
        formData.append("s4_image[file]", data.s4_image.file[0]);
      } else {
        formData.append("s4_image[existingPath]", data.s4_image?.existingPath || "");
      }
      formData.append("s4_image[alt]", data.s4_image?.alt || "");
      formData.append("s4_image[name]", data.s4_image?.name || "");

      // Section 5
      formData.append("s5_title", data.s5_title);
      formData.append("s5_description", data.s5_description);
      data.s5_cards?.forEach((card, index) => {
        formData.append(`s5_cards[${index}][title]`, card.title);
        formData.append(`s5_cards[${index}][description]`, card.description);
        if (card.image?.file && card.image?.file[0]) {
          formData.append(`s5_cards[${index}][image][file]`, card.image.file[0]);
        } else {
          formData.append(`s5_cards[${index}][image][existingPath]`, card.image?.existingPath || "");
        }
        formData.append(`s5_cards[${index}][image][alt]`, card.image?.alt || "");
        formData.append(`s5_cards[${index}][image][name]`, card.image?.name || "");
      });

      // Section 6
      formData.append("s6_title", data.s6_title);
      formData.append("s6_description", data.s6_description);
      if (data.s6_image?.file && data.s6_image.file[0]) {
        formData.append("s6_image[file]", data.s6_image.file[0]);
      } else {
        formData.append("s6_image[existingPath]", data.s6_image?.existingPath || "");
      }
      formData.append("s6_image[alt]", data.s6_image?.alt || "");
      formData.append("s6_image[name]", data.s6_image?.name || "");
      formData.append("s6_button_text", data.s6_button_text);

      // Section 7
      formData.append("s7_title", data.s7_title);
      formData.append("s7_description", data.s7_description);

      // Section 8
      formData.append("s8_title", data.s8_title);
      formData.append("s8_description", data.s8_description);
      if (data.s8_image?.file && data.s8_image.file[0]) {
        formData.append("s8_image[file]", data.s8_image.file[0]);
      } else {
        formData.append("s8_image[existingPath]", data.s8_image?.existingPath || "");
      }
      formData.append("s8_image[alt]", data.s8_image?.alt || "");
      formData.append("s8_image[name]", data.s8_image?.name || "");

      // Section 9
      formData.append("s9_title", data.s9_title);
      // formData.append("s9_description", data.s9_description);
      data.s9_cards?.forEach((card, index) => {
        formData.append(`s9_cards[${index}][number]`, card.number);
        formData.append(`s9_cards[${index}][title]`, card.title);
        formData.append(`s9_cards[${index}][description]`, card.description);
      });

      // if (data.footer_section_image_file && data.footer_section_image_file[0]) {
      //   formData.append("footer_section_image_file", data.footer_section_image_file[0]);
      // }


      // Section 3 & 4
      // Section 10
      formData.append("s10_title", data.s10_title);
      formData.append("s10_description", data.s10_description);
      data.s10_images?.forEach((img, index) => {
        if (img?.file && img.file[0]) {
          formData.append(`s10_images[${index}][file]`, img.file[0]);
        } else {
          formData.append(`s10_images[${index}][existingPath]`, img.existingPath || "");
        }
        formData.append(`s10_images[${index}][alt]`, img.alt || "");
        formData.append(`s10_images[${index}][name]`, img.name || "");
      });

      // Section 11
      formData.append("s11_title", data.s11_title);
      formData.append("s11_description", data.s11_description);
    //     s11_btn: yup.array().of(
    // yup.object().shape({
    //   name: yup.string().required("Name is required"),
    //   items: yup.array().of(
    //     yup.object().shape({
    //       t1: yup.string().required("Item text 1 is required"),
    //       t2: yup.string().required("Item text 2 is required"),
    //       h: yup.string().required("Item Heading is required"),
    //     })
    //   )
    data.s11_btn?.forEach((btn, i) => { // Note: changed from s17_btn to s17_buttons as per your formatted data
        formData.append(`s11_btn[${i}][name]`, btn.name || "");
        btn.items?.forEach((item, j) => {
          formData.append(`s11_btn[${i}][items][${j}][h]`, item.h || "");
          formData.append(`s11_btn[${i}][items][${j}][t1]`, item.t1 || "");
          formData.append(`s11_btn[${i}][items][${j}][t2]`, item.t2 || "");
        });
      });
      // if (data.s11_image?.file && data.s11_image.file[0]) {
      //   formData.append("s11_image[file]", data.s11_image.file[0]);
      // } else {
      //   formData.append("s11_image[existingPath]", data.s11_image?.existingPath || "");
      // }
      formData.append("s11_image[alt]", data.s11_image?.alt || "");
      formData.append("s11_image[name]", data.s11_image?.name || "");

      // Section 12
      formData.append("s12_title", data.s12_title);
      formData.append("s12_description", data.s12_description);
      // data.s12_cards?.forEach((card, index) => {
      //   formData.append(`s12_cards[${index}][heading]`, card.heading);
      //   formData.append(`s12_cards[${index}][text]`, card.text);
      //   formData.append(`s12_cards[${index}][title]`, card.title);
      //   formData.append(`s12_cards[${index}][description]`, card.description);
      // });
      if (data.s12_image?.file && data.s12_image.file[0]) {
        formData.append("s12_image[file]", data.s12_image.file[0]);
      } else {
        formData.append("s12_image[existingPath]", data.s12_image?.existingPath || "");
      }
      formData.append("s12_image[alt]", data.s12_image?.alt || "");
      formData.append("s12_image[name]", data.s12_image?.name || "");


      const response = await axiosClient.post("admin/dubai-island/store", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success === true) {
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
      <h2 className="text-3xl mb-4 font-semibold">Dubai Island Page</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
          <SEOFields />

          <div className="flex flex-col space-y-6">

            <InputField name="email" label="Email" />
            <InputField
              name="phone"
              label="Phone Number"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium">Banner Image:</label>
              <input type="file" {...register("b1_image.file")} />
            </div>

            <InputField name="b1_image.alt" label="Image Alt" />
            <InputField name="b1_image.name" label="Image Name" />
            <InputField name="b1_heading" label="Banner Heading" />

            {/* Section One */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section One</h3>
              <InputField name="s1_title" label="Title" />
              <InputField
                name="s1_button_text"
                label="Button Text"
              />
              <QuillField
                control={methods.control}
                name="s1_description"
                label="Description"
                rules={{ required: "Required" }}
              />
            </div>

            {/* Section Two */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Two</h3>
              <div>
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input type="file" {...register("s2_image.file")} />
                <InputField name="s2_image.alt" label="Image Alt" />
                <InputField
                  name="s2_image.name"
                  label="Image Name"
                />
              </div>
              <InputField name="s2_title" label="Title" />
              <QuillField
                control={methods.control}
                name="s2_description"
                label="Description"
                rules={{ required: "Required" }}
              />
            </div>

            {/* Section Three */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Three</h3>
              <InputField name="s3_title" label="Title" />
              <QuillField
                control={methods.control}
                name="s3_description"
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
                <InputField
                  name="s4_image.name"
                  label="Image Name"
                />
              </div>
              <InputField name="s4_title" label="Title" />
              <QuillField
                control={methods.control}
                name="s4_description"
                label="Description"
                rules={{ required: "Required" }}
              />
            </div>

            {/* Section 5 Cards */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Five</h3>
              <InputField name="s5_title" label="Title" />
              <QuillField
                control={methods.control}
                name="s5_description"
                label="Description"
                rules={{ required: "Required" }}
              />

            </div>
            <div className="flex flex-col space-y-6">
              <h3 className="text-xl font-semibold">Section 5 Cards</h3>
              {s5Fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border p-4 rounded shadow-sm space-y-4"
                >
                  <InputField name={`s5_cards[${index}].title`} label="Title" />
                  <InputField
                    name={`s5_cards[${index}].description`}
                    label="Description"
                  />
                  <div>
                    <label>Image File</label>
                    <input
                      type="file"
                      {...register(`s5_cards[${index}].image.file`)}
                    />
                    <InputField
                      name={`s5_cards[${index}].image.alt`}
                      label="Alt Text"
                    />
                    <InputField
                      name={`s5_cards[${index}].image.name`}
                      label="Image Name"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => s5Remove(index)}
                    className="text-red-600 underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  s5Append({
                    title: "",
                    description: "",
                    image: { alt: "", name: "", file: null },
                  })
                }
                className="bg-blue-500 text-white px-2 py-1 rounded w-fit"
              >
                Add Card
              </button>
            </div>

            {/* Section Six */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Six</h3>
              <div>
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input type="file" {...register("s6_image.file")} />
                <InputField name="s6_image.alt" label="Image Alt" />
                <InputField
                  name="s6_image.name"
                  label="Image Name"
                />
              </div>
              <InputField name="s6_title" label="Title" />
              <InputField
                name="s6_button_text"
                label="Button Text"
              />
              <QuillField
                control={methods.control}
                name="s6_description"
                label="Description"
                rules={{ required: "Required" }}
              />
            </div>

            {/* Section Seven */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Seven</h3>
              <InputField name="s7_title" label="Title" />
              <QuillField
                control={methods.control}
                name="s7_description"
                label="Description"
                rules={{ required: "Required" }}
              />
            </div>

            {/* Section Eight */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Eight</h3>
              <div>
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input
                  type="file"
                  {...register("s8_image.file")}
                />
                <InputField
                  name="s8_image.alt"
                  label="Image Alt"
                />
                <InputField
                  name="s8_image.name"
                  label="Image Name"
                />
              </div>
              <InputField name="s8_title" label="Title" />
              <QuillField
                control={methods.control}
                name="s8_description"
                label="Description"
                rules={{ required: "Required" }}
              />
            </div>

            {/* Section 9 Cards */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Nine</h3>
              <InputField name="s9_title" label="Title" />
              {/* <QuillField
                control={methods.control}
                name="s9_description"
                label="Description"
                rules={{ required: "Required" }}
              /> */}
            </div>
            <div className="flex flex-col space-y-6">
              <h3 className="text-xl font-semibold">Section 9 Cards</h3>
              {s9Fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border p-4 rounded shadow-sm space-y-4"
                >
                  <InputField name={`s9_cards[${index}].title`} label="Title" />
                  <InputField
                    name={`s9_cards[${index}].number`}
                    label="Number"
                  />
                  <InputField
                    name={`s9_cards[${index}].description`}
                    label="Description"
                  />
                  <button
                    type="button"
                    onClick={() => s9Remove(index)}
                    className="text-red-600 underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  s9Append({ title: "", number: "", description: "" })
                }
                className="bg-blue-500 text-white px-2 py-1 rounded w-fit"
              >
                Add Card
              </button>
            </div>

            {/* Section 10 Images */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Ten</h3>
              <InputField name="s10_title" label="Title" />
              <QuillField
                control={methods.control}
                name="s10_description"
                label="Description"
                rules={{ required: "Required" }}
              />
            </div>
            <div className="flex flex-col space-y-6">
              <h3 className="text-xl font-semibold">Section 10 Images</h3>
              {s10Fields.map((field, index) => (
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
                    onClick={() => s10Remove(index)}
                    className="text-red-600 underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => s10Append({ alt: "", name: "", file: null })}
                className="bg-blue-500 text-white px-2 py-1 rounded w-fit"
              >
                Add Image
              </button>
            </div>

            {/* Section Eleven */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section Eleven</h3>
              {/* <div>
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input
                  type="file"
                  {...register("s11_image.file")}
                />
                <InputField
                  name="s11_image.alt"
                  label="Image Alt"
                />
                <InputField
                  name="s11_image.name"
                  label="Image Name"
                />
              </div> */}
              <InputField name="s11_title" label="Title" />
              <QuillField
                control={methods.control}
                name="s11_description"
                label="Description"
                rules={{ required: "Required" }}
              />

              {s11Fields.map((btn, btnIndex) => (
                <Section11Button
                  key={btn.id}
                  control={control}
                  btnIndex={btnIndex}
                  removeBtn={s11Remove}
                />
              ))}
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() =>
                    s11Append({
                      name: "",
                      items: [{ h: "", t1: "", t2: "", t3: "" }],
                    })
                  }
                  className="text-blue-500 mt-2"
                >
                  + Add Button Group
                </button>
              </div>
            </div>

            {/* Section 12 Cards */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Section 12</h3>
              <InputField name="s12_title" label="Title" />
              <QuillField
                control={methods.control}
                name="s12_description"
                label="Description"
                rules={{ required: "Required" }}
              />
            </div>
            {/* <div className="flex flex-col space-y-6">
              <h3 className="text-xl font-semibold">Section 12 Cards</h3>
              {s12Fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border p-4 rounded shadow-sm space-y-4"
                >
                  <InputField
                    name={`s12_cards[${index}].heading`}
                    label="Heading"
                  />
                  <InputField
                    name={`s12_cards[${index}].title`}
                    label="Title"
                  />
                  <InputField name={`s12_cards[${index}].text`} label="Text" />
                  <InputField
                    name={`s12_cards[${index}].description`}
                    label="Description"
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
                onClick={() =>
                  s12Append({
                    heading: "",
                    title: "",
                    text: "",
                    description: "",
                  })
                }
                className="bg-blue-500 text-white px-2 py-1 rounded w-fit"
              >
                Add Card
              </button>
            </div> */}
            <div>
              <label className="mb-1 text-sm font-medium text-gray-700">
                Image File
              </label>
              <input
                type="file"
                {...register("s12_image.file")}
              />
              <InputField
                name="s12_image.alt"
                label="Image Alt"
              />
              <InputField
                name="s12_image.name"
                label="Image Name"
              />
            </div>
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


          <hr />
          <button type="submit" className="bg-blue-600 text-white p-3 rounded">
            Submit
          </button>
        </form>
      </FormProvider>
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

const Section11Button = ({ control, btnIndex, removeBtn }) => {
  const itemsFieldArray = useFieldArray({
    control,
    name: `s11_btn[${btnIndex}].items`
  });

  return (
    <div className="p-4 border mb-4 bg-gray-100 rounded">
      <InputField
        name={`s11_btn[${btnIndex}].name`}
        label="Button Name"
      />

      {itemsFieldArray.fields.map((item, itemIndex) => (
        <div key={item.id} className="pl-4 border-l mt-2">
          <InputField name={`s11_btn[${btnIndex}].items[${itemIndex}].t1`} label="Item text 1" />
          <InputField name={`s11_btn[${btnIndex}].items[${itemIndex}].t2`} label="Item text 2" />
          <InputField name={`s11_btn[${btnIndex}].items[${itemIndex}].h`} label="Item Heading" />

          <button
            type="button"
            className="text-red-500 text-sm mt-1"
            onClick={() => itemsFieldArray.remove(itemIndex)}
          >
            Remove Item
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => itemsFieldArray.append({ t1: "", t2: "", t3: "" })}
        className="text-blue-500 text-sm mt-2"
      >
        + Add Item
      </button>

      <button
        type="button"
        className="text-red-700 font-bold absolute top-2 right-2"
        onClick={() => removeBtn(btnIndex)}
      >
        ✖
      </button>
    </div>
  );
};

export default DubaiIslandForm;
