import React, { useEffect } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from "../../../../../../axiosClient";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SEOFields from "../Components/SEOFields";
import InputField from "../../../../AdminComponents/Inputs/InputField";
import QuillField from "../../../../AdminComponents/Inputs/QuillField";

// Validation Schema
const schema = yup.object().shape({
  meta_title: yup.string().required(),
  meta_description: yup.string().required(),
  canonical_url: yup.string().required(),
  focus_keyword: yup.string().required(),
  // redirect_301: yup.string().nullable(),
  // redirect_302: yup.string().nullable(),
  // old_redirect_url: yup.string().nullable(),
  schema: yup.string().required(),

  banner_content: yup.string().required(),

  banner_images: yup.array().of(
    yup.object().shape({
      file_path: yup.mixed(),
      existingPath: yup.string(),
      alt: yup.string().required(),
      name: yup.string().required(),
    })
  ),

  sectionThree_heading: yup.string().required(),
  sectionThree_content: yup.string().required(),
  sectionFour_heading: yup.string().required(),
  sectionFour_content: yup.string().required(),
  sectionOne_heading: yup.string().required(),
  sectionOne_content: yup.string().required(),
  sectionOne_image: yup.object().shape({
    file_path: yup.mixed(),
    existingPath: yup.string(),
    alt: yup.string().required(),
    name: yup.string().required(),
  }),
  sectionOne_items: yup.array().of(
    yup.object().shape({
      heading: yup.string().required(),
      image: yup.object().shape({
        file_path: yup.mixed(),
        existingPath: yup.string(),
        alt: yup.string().required(),
        name: yup.string().required(),
      }),
    })
  ),

  sectionTwo_heading: yup.string().required(),
  sectionTwo_content: yup.string().required(),
  sectionTwo_pages: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      link: yup.string().required(),
      image: yup.object().shape({
        file_path: yup.mixed(),
        existingPath: yup.string(),
        alt: yup.string().required(),
        name: yup.string().required(),
      }),
    })
  ),

  sectionFive_heading: yup.string().required(),
  sectionFive_content: yup.string().required(),
  sectionFive_btn_link: yup.string().required(),
  sectionFive_items: yup.array().of(
    yup.object().shape({
      h: yup.string().required(),
      t: yup.string().required(),
    })
  ),
  sectionFive_image: yup.object().shape({
    file_path: yup.mixed(),
    existingPath: yup.string(),
    alt: yup.string().required(),
    name: yup.string().required(),
  }),

  sectionSix_heading: yup.string().required(),
  sectionSix_content: yup.string().required(),
  sectionSix_btn1_link: yup.string().required(),
  sectionSix_btn2_link: yup.string().required(),
  sectionSix_image: yup.object().shape({
    file_path: yup.mixed(),
    existingPath: yup.string(),
    alt: yup.string().required(),
    name: yup.string().required(),
  }),

  sectionSeven_heading: yup.string().required(),
  sectionSeven_content: yup.string().required(),
  sectionSeven_items_heading: yup.string().required(),
  sectionSeven_items: yup.array().of(
    yup.object().shape({
      t: yup.string().required(),
    })
  ),
  sectionSeven_btn_link: yup.string().required(),
  sectionSeven_image: yup.object().shape({
    file_path: yup.mixed(),
    existingPath: yup.string(),
    alt: yup.string().required(),
    name: yup.string().required(),
  }),

  sectionEight_heading: yup.string().required(),
  sectionEight_content: yup.string().required(),
  sectionEight_btns: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Name is required"),
      items: yup.array().of(
        yup.object().shape({
          t1: yup.string().required("Item t1 is required"),
          t2: yup.string().required("Item t2 is required"),
          t3: yup.string().required("Item t3 is required"),
        })
      )
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


  sectionNine_heading: yup.string().required(),
  sectionNine_content: yup.string().required(),
  sectionNine_images: yup.array().of(
    yup.object().shape({
      h: yup.string().required(),
      t: yup.string().required(),
      existingPath: yup.string(),
      file_path: yup.mixed(),
      alt: yup.string().required(),
      name: yup.string().required(),
    })
  ),
});

const HomeForm = ({ editData, setStatus, setEditData, fetchData }) => {
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      banner_images: [{}],
      footer_section_image: [{}],
      sectionOne_items : [{}],
      sectionTwo_pages: [{}],
      sectionFive_items: [{}],
      sectionSeven_items: [{}],
      sectionEight_btns: [{}],
      sectionNine_images: [{}],
    },
  });

  const { handleSubmit, reset, control, register } = methods;

  // const sectionTwoPages = useFieldArray({ control, name: "sectionTwo_pages" });
  // const sectionFiveItems = useFieldArray({ control, name: "sectionFive_items" });
  // const sectionSevenItems = useFieldArray({ control, name: "sectionSeven_items" });
  // const sectionEightBtns = useFieldArray({ control, name: "sectionEight_btns" });
  // const sectionNineImages = useFieldArray({ control, name: "sectionNine_images" });
  const bannerImages = useFieldArray({
    control,
    name: "banner_images",
  });
  const footerSectionImage = useFieldArray({
    control,
    name: "footer_section_image",
  });
  const sectionOneItems = useFieldArray({control , name:"sectionOne_items"});
  const sectionTwoPages = useFieldArray({ control, name: "sectionTwo_pages" });
  const sectionFiveItems = useFieldArray({
    control,
    name: "sectionFive_items",
  });
  const sectionSevenItems = useFieldArray({
    control,
    name: "sectionSeven_items",
  });
  const sectionEightBtns = useFieldArray({
    control,
    name: "sectionEight_btns",
  });
  const sectionNineImages = useFieldArray({
    control,
    name: "sectionNine_images",
  });
  const formatDataForForm = (apiData) => {
    const page = apiData?.Page;
    const pageSections = apiData?.pageSection;

    const formattedData = {
      slug: page.slug,
      meta_title: page.meta_title,
      meta_description: page.meta_description,
      canonical_url: page.canonical_url,
      focus_keyword: page.focus_keyword,
      redirect_301: page.redirect_301,
      redirect_302: page.redirect_302,
      old_redirect_url: page.old_redirect_url,
      schema: JSON.stringify(page.schema),

      banner_content: "",
      banner_images: [],
      footer_section_image: [],
      footer_section_title: "",
      footer_section_description: "",
      footer_section_btn_1_text: "",
      footer_section_btn_1_link: "",
      footer_section_btn_2_text: "",
      footer_section_btn_2_link: "",
      sectionOne_heading: "",
      sectionOne_content: "",
      sectionOne_image: {},
      sectionOne_items : [],
      sectionTwo_heading: "",
      sectionTwo_content: "",
      sectionTwo_pages: [],
      sectionFive_heading: "",
      sectionFive_content: "",
      sectionFive_btn_link: "",
      sectionFive_items: [],
      sectionFive_image: {},
      sectionSix_heading: "",
      sectionSix_content: "",
      sectionSix_btn1_link: "",
      sectionSix_btn2_link: "",
      sectionSix_image: {},
      sectionSeven_heading: "",
      sectionSeven_content: "",
      sectionSeven_items_heading: "",
      sectionSeven_items: [],
      sectionSeven_btn_link: "",
      sectionSeven_image: {},
      sectionEight_heading: "",
      sectionEight_content: "",
      sectionEight_btns: [],
      sectionNine_heading: "",
      sectionNine_content: "",
      sectionNine_images: [],
    };

    pageSections.forEach((section) => {
      const name = section.name;
      const data = section.content;

      switch (name) {
        case "bannerSection":
          formattedData.banner_content = data.content;
          formattedData.banner_images =
            data.images?.map((img) => ({
              existingPath: img.file_path || "",
              alt: img.alt || "",
              name: img.name || "",
            })) || [];
          break;
        case "footerSection":
          formattedData.footer_section_title = data.footer_section_title || "";
          formattedData.footer_section_description = data.footer_section_description || "";
          formattedData.footer_section_btn_1_text = data.footer_section_btn_1_text || "";
          formattedData.footer_section_btn_1_link = data.footer_section_btn_1_link || "";
          formattedData.footer_section_btn_2_text = data.footer_section_btn_2_text || "";
          formattedData.footer_section_btn_2_link = data.footer_section_btn_2_link || "";
          formattedData.footer_section_image = data.footer_section_image
            ? [{
              existingPath: data.footer_section_image.file_path || "",
              alt: data.footer_section_image.alt || "",
              name: data.footer_section_image.name || "",
            }]
            : [];
          break;
        case "sectionOne":
          formattedData.sectionOne_heading = data.heading || "";
          formattedData.sectionOne_content = data.content || "";
          formattedData.sectionOne_image = data.image
            ? {
              existingPath: data.image.file_path || "",
              alt: data.image.alt || "",
              name: data.image.name || "",
            }
            : {};
           formattedData.sectionOne_items =  data.items?.map((items) => ({
            heading: items.heading || "",
            image: page.image
                ? {
                  existingPath: page.image.file_path || "",
                  alt: page.image.alt || "",
                  name: page.image.name || "",
                }
                : {},
           }))
          break;

        case "sectionTwo":
          formattedData.sectionTwo_heading = data.heading || "";
          formattedData.sectionTwo_content = data.content || "";
          formattedData.sectionTwo_pages =
            data.pages?.map((page) => ({
              name: page.name || "",
              link: page.link || "",
              image: page.image
                ? {
                  existingPath: page.image.file_path || "",
                  alt: page.image.alt || "",
                  name: page.image.name || "",
                }
                : {},
            })) || [];
          break;

        case "sectionThree":
          formattedData.sectionThree_heading = data.heading || "";
          formattedData.sectionThree_content = data.content || "";
          break;

        case "sectionFour":
          formattedData.sectionFour_heading = data.heading || "";
          formattedData.sectionFour_content = data.content || "";
          break;


        case "sectionFive":
          formattedData.sectionFive_heading = data.heading || "";
          formattedData.sectionFive_content = data.content || "";
          formattedData.sectionFive_btn_link = data.btn_link || "";
          formattedData.sectionFive_items =
            data?.items?.map((item) => ({
              h: item.h || "",
              t: item.t || "",
            })) || [];
          formattedData.sectionFive_image = data.image
            ? {
              existingPath: data.image.file_path || "",
              alt: data.image.alt || "",
              name: data.image.name || "",
            }
            : {};
          break;

        case "sectionSix":
          formattedData.sectionSix_heading = data.heading || "";
          formattedData.sectionSix_content = data.content || "";
          formattedData.sectionSix_btn1_link = data.btn1_link || "";
          formattedData.sectionSix_btn2_link = data.btn2_link || "";
          formattedData.sectionSix_image = data.image
            ? {
              existingPath: data.image.file_path || "",
              alt: data.image.alt || "",
              name: data.image.name || "",
            }
            : {};
          break;

        case "sectionSeven":
          formattedData.sectionSeven_heading = data.heading || "";
          formattedData.sectionSeven_content = data.content || "";
          formattedData.sectionSeven_items_heading = data.items_heading || "";
          formattedData.sectionSeven_items =
            data.items?.map((item) => ({
              t: item.t || "",
            })) || [];
          formattedData.sectionSeven_btn_link = data.btn_link || "";
          formattedData.sectionSeven_image = data.image
            ? {
              existingPath: data.image.file_path || "",
              alt: data.image.alt || "",
              name: data.image.name || "",
            }
            : {};
          break;

        case "sectionEight":
          formattedData.sectionEight_heading = data.heading || "";
          formattedData.sectionEight_content = data.content || "";
          // formattedData.sectionEight_btns =
          //   data.btns?.map((btn) => ({
          //     name: btn.name || "",
          //     items: [],
          // {
          //   t1: btn.items?.t1 || "",
          //   t2: btn.items?.t2 || "",
          //   t3: btn.items?.t3 || "",
          // },
          // })) || [];
          formattedData.sectionEight_btns =
            data.btns?.map((btn) => ({
              name: btn.name || "",
              items: btn?.items?.map((item) => ({
                t1: item.t1 || "",
                t2: item.t2 || "",
                t3: item.t3 || "",
              })) || [],
            })) || [];

          break;

        case "sectionNine":
          formattedData.sectionNine_heading = data.heading || "";
          formattedData.sectionNine_content = data.content || "";
          formattedData.sectionNine_images =
            data.images?.map((img) => ({
              h: img.h || "",
              t: img.t || "",
              existingPath: img.image?.file_path || "",
              alt: img.image?.alt || "",
              name: img.image?.name || "",
            })) || [];
          break;

        default:
          break;
      }
    });

    return formattedData;
  };
  useEffect(() => {
    if (editData) {
      const formattedData = formatDataForForm(editData);
      reset(formattedData);
    }
  }, [editData, reset]);

  const prepareFormData = (data) => {
    const formData = new FormData();

    formData.append("meta_title", data.meta_title);
    formData.append("meta_description", data.meta_description);
    formData.append("canonical_url", data.canonical_url);
    formData.append("focus_keyword", data.focus_keyword);
    formData.append("redirect_301", data.redirect_301);
    formData.append("redirect_302", data.redirect_302);
    formData.append("old_redirect_url", data.old_redirect_url);
    formData.append("schema", data.schema);

    formData.append("banner[content]", data.banner_content);

    // Banner Images
    data.banner_images.forEach((img, index) => {
      if (img.file_path?.[0]) {
        formData.append(
          `banner[images][${index}][file]`,
          img.file_path[0]
        );
      } else {
        formData.append(
          `banner[images][${index}][existingPath]`,
          img.existingPath || ""
        );
      }
      formData.append(`banner[images][${index}][alt]`, img.alt);
      formData.append(`banner[images][${index}][name]`, img.name);
    });

    formData.append("footer_section_title", data.footer_section_title);
    formData.append("footer_section_description", data.footer_section_description);
    formData.append("footer_section_btn_1_text", data.footer_section_btn_1_text);
    formData.append("footer_section_btn_1_link", data.footer_section_btn_1_link);
    formData.append("footer_section_btn_2_text", data.footer_section_btn_2_text);
    formData.append("footer_section_btn_2_link", data.footer_section_btn_2_link);

    // Footer Section Images
    data.footer_section_image.forEach((img, index) => {
      if (img.file_path?.[0]) {
        formData.append(
          `footer_section_image[file]`,
          img.file_path[0]
        );
      } else {
        formData.append(
          `footer_section_image[existingPath]`,
          img.existingPath || ""
        );
      }
      formData.append(`footer_section_image[alt]`, img.alt);
      formData.append(`footer_section_image[name]`, img.name);
    });

    // Section One
    formData.append("sectionOne[heading]", data.sectionOne_heading);
    formData.append("sectionOne[content]", data.sectionOne_content);
    if (data.sectionOne_image.file_path?.[0]) {
      formData.append(
        "sectionOne[image][file]",
        data.sectionOne_image.file_path[0]
      );
    } else {
      formData.append(
        "sectionOne[image][existingPath]",
        data.sectionOne_image.existingPath || ""
      );
    }
    formData.append("sectionOne[image][alt]", data.sectionOne_image.alt);
    formData.append("sectionOne[image][name]", data.sectionOne_image.name);
    data.sectionOne_items.forEach((item , index) => {
      formData.append(`sectionOne[items][${index}][heading]` ,  item.heading);
       if (item?.image?.file_path?.[0]) {
        formData.append(
          `sectionOne[items][${index}][image][file]`,
          item.image?.file_path[0]
        );
      } else {
        formData.append(
          `sectionOne[items][${index}][image][existingPath]`,
          item.image.existingPath || ""
        );
      }
      formData.append(
        `sectionOne[items][${index}][image][alt]`,
        item.image.alt
      );
      formData.append(
        `sectionOne[items][${index}][image][name]`,
        item.image.name
      );
    })
    // Section Two Pages
    formData.append("sectionTwo[heading]", data.sectionTwo_heading);
    formData.append("sectionTwo[content]", data.sectionTwo_content);
    data.sectionTwo_pages.forEach((page, index) => {
      formData.append(`sectionTwo[pages][${index}][name]`, page.name);
      formData.append(`sectionTwo[pages][${index}][link]`, page.link);
      if (page.image?.file_path?.[0]) {
        formData.append(
          `sectionTwo[pages][${index}][image][file]`,
          page.image?.file_path[0]
        );
      } else {
        formData.append(
          `sectionTwo[pages][${index}][image][existingPath]`,
          page.image.existingPath || ""
        );
      }
      formData.append(
        `sectionTwo[pages][${index}][image][alt]`,
        page.image.alt
      );
      formData.append(
        `sectionTwo[pages][${index}][image][name]`,
        page.image.name
      );
    });

    // Section Three
    formData.append("sectionThree[heading]", data.sectionThree_heading);
    formData.append("sectionThree[content]", data.sectionThree_content);

    // Section Four
    formData.append("sectionFour[heading]", data.sectionFour_heading);
    formData.append("sectionFour[content]", data.sectionFour_content);

    // Section Five
    formData.append("sectionFive[heading]", data.sectionFive_heading);
    formData.append("sectionFive[content]", data.sectionFive_content);
    formData.append("sectionFive[btn_link]", data.sectionFive_btn_link);
    data.sectionFive_items.forEach((item, index) => {
      formData.append(`sectionFive[items][${index}][h]`, item.h);
      formData.append(`sectionFive[items][${index}][t]`, item.t);
    });

    if (data.sectionFive_image.file_path) {
      formData.append(
        "sectionFive[image][file]",
        data.sectionFive_image.file_path[0]
      );
    } else {
      formData.append(
        "sectionFive[image][existingPath]",
        data.sectionFive_image.existingPath || ""
      );
    }
    formData.append("sectionFive[image][alt]", data.sectionFive_image.alt);
    formData.append("sectionFive[image][name]", data.sectionFive_image.name);

    // Section Six
    formData.append("sectionSix[heading]", data.sectionSix_heading);
    formData.append("sectionSix[content]", data.sectionSix_content);
    formData.append("sectionSix[btn1_link]", data.sectionSix_btn1_link);
    formData.append("sectionSix[btn2_link]", data.sectionSix_btn2_link);
    if (data.sectionSix_image.file_path) {
      formData.append(
        "sectionSix[image][file]",
        data.sectionSix_image.file_path[0]
      );
    } else {
      formData.append(
        "sectionSix[image][existingPath]",
        data.sectionSix_image.existingPath || ""
      );
    }
    formData.append("sectionSix[image][alt]", data.sectionSix_image.alt);
    formData.append("sectionSix[image][name]", data.sectionSix_image.name);

    // Section Seven
    formData.append("sectionSeven[heading]", data.sectionSeven_heading);
    formData.append("sectionSeven[content]", data.sectionSeven_content);
    formData.append(
      "sectionSeven[items_heading]",
      data.sectionSeven_items_heading
    );
    data.sectionSeven_items.forEach((item, index) => {
      formData.append(`sectionSeven[items][${index}][t]`, item.t);
    });
    formData.append("sectionSeven[btn_link]", data.sectionSeven_btn_link);
    if (data.sectionSeven_image.file_path) {
      formData.append(
        "sectionSeven[image][file]",
        data.sectionSeven_image.file_path[0]
      );
    } else {
      formData.append(
        "sectionSeven[image][existingPath]",
        data.sectionSeven_image.existingPath || ""
      );
    }
    formData.append("sectionSeven[image][alt]", data.sectionSeven_image.alt);
    formData.append("sectionSeven[image][name]", data.sectionSeven_image.name);

    // Section Eight
    formData.append("sectionEight[heading]", data.sectionEight_heading);
    formData.append("sectionEight[content]", data.sectionEight_content);
    data.sectionEight_btns.forEach((btn, index) => {
      formData.append(`sectionEight[btns][${index}][name]`, btn.name);
      // formData.append(`sectionEight[btns][${index}][items][t1]`, btn.items.t1);
      // formData.append(`sectionEight[btns][${index}][items][t2]`, btn.items.t2);
      // formData.append(`sectionEight[btns][${index}][items][t3]`, btn.items.t3);
      btn.items.forEach((item, itemIndex) => {
        formData.append(`sectionEight[btns][${index}][items][${itemIndex}][t1]`, item.t1);
        formData.append(`sectionEight[btns][${index}][items][${itemIndex}][t2]`, item.t2);
        formData.append(`sectionEight[btns][${index}][items][${itemIndex}][t3]`, item.t3);
      });
    });

    // Section Nine
    formData.append("sectionNine[heading]", data.sectionNine_heading);
    formData.append("sectionNine[content]", data.sectionNine_content);
    data.sectionNine_images.forEach((img, index) => {
      formData.append(`sectionNine[images][${index}][h]`, img.h);
      formData.append(`sectionNine[images][${index}][t]`, img.t);
      if (img.file_path?.[0]) {
        formData.append(
          `sectionNine[images][${index}][file]`,
          img.file_path[0]
        );
      } else {
        formData.append(
          `sectionNine[images][${index}][existingPath]`,
          img.existingPath || ""
        );
      }
      formData.append(`sectionNine[images][${index}][alt]`, img.alt);
      formData.append(`sectionNine[images][${index}][name]`, img.name);
    });

    return formData;
  };

  const onSubmit = async (data) => {
    try {
      console.log('das', data)
      const formData = prepareFormData(data);

      const response = await axiosClient.post(
        `admin/saveHomePageSections`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success == true) {
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
      Swal.fire({ icon: "error", text: error?.message || "Failed!" });
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        {/* SEO Fields */}
        <SEOFields />

        {/* Banner Section */}
        <InputField name="banner_content" label="Banner Content" />
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Banner Images</h2>
          </div>

          {bannerImages.fields.map((field, index) => (
            <div key={field.id} className="p-4 border mb-2 relative">
              <InputField
                name={`banner_images[${index}].alt`}
                label="Image Alt Text"
              />

              <InputField
                name={`banner_images[${index}].name`}
                label="Image Name"
              />

              {/* File Upload */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input
                  type="file"
                  {...methods.register(`banner_images[${index}].file_path`)}
                />
                {methods.formState.errors?.banner_images?.[index].file_path && (
                  <span className="text-red-500 text-sm mt-1">
                    {
                      methods.formState.errors.banner_images[index].file_path
                        .message
                    }
                  </span>
                )}
              </div>


              {/* Remove Button */}
              <button
                type="button"
                onClick={() => bannerImages.remove(index)}
                className="text-red-500 font-bold"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              bannerImages.append({ existingPath: "", alt: "", name: "" })
            }
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Image
          </button>
        </div>

        {/* Section One */}
        <InputField name="sectionOne_heading" label="Section One Heading" />
        <QuillField name="sectionOne_content" label="Section One Content" />
        <InputField
          name={`sectionOne_image.alt`}
          label="Image Alt Text"
        />

        <InputField
          name={`sectionOne_image.name`}
          label="Image Name"
        />

        {/* File Upload */}
        {/* <div className="flex flex-col"> */}
        <label className="mb-1 text-sm font-medium text-gray-700">
          Image File
        </label>
        <input
          type="file"
          {...methods.register(`sectionOne_image.file_path`)}
        />
        {methods.formState.errors?.sectionOne_image?.file_path && (
          <span className="text-red-500 text-sm mt-1">
            {
              methods.formState.errors.sectionOne_image?.file_path
                .message
            }
          </span>
        )}

{sectionOneItems.fields.map((field, index) => (
          <div key={field.id} className="p-4 border mb-2 relative">
            <InputField
              name={`sectionOne_items[${index}].heading`}
              label="Section text"
            />
            <InputField
              name={`sectionOne_items[${index}].image.alt`}
              label="Image Alt Text"
            />
            <InputField
              name={`sectionOne_items[${index}].image.name`}
              label="Image Name"
            />

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Image File
              </label>
              <input
                type="file"
                {...methods.register(`sectionOne_items[${index}].image.file_path`)}
              />
              {methods.formState.errors?.sectionOne_items?.[index]
                ?.image?.file_path && (
                  <span className="text-red-500 text-sm mt-1">
                    {
                      methods.formState.errors.sectionOne_items[index].image?.file_path
                        .message
                    }
                  </span>
                )}
            </div>
            {/* Remove Button */}
            <button
              type="button"
              onClick={() => sectionOneItems.remove(index)}
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
              sectionOneItems.append({
                name: "",
                link: "",
                image: { existingPath: "", alt: "", name: "" },
              })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Items
          </button>
        </div>

        {/* Section Two */}
        <InputField name="sectionTwo_heading" label="Section Two Heading" />
        <QuillField name="sectionTwo_content" label="Section Two Content" />
        {sectionTwoPages.fields.map((field, index) => (
          <div key={field.id} className="p-4 border mb-2 relative">
            <InputField
              name={`sectionTwo_pages[${index}].name`}
              label="Page Name"
            />
            <InputField
              name={`sectionTwo_pages[${index}].link`}
              label="Page Link"
            />
            <InputField
              name={`sectionTwo_pages[${index}].image.alt`}
              label="Image Alt Text"
            />
            <InputField
              name={`sectionTwo_pages[${index}].image.name`}
              label="Image Name"
            />

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Image File
              </label>
              <input
                type="file"
                {...methods.register(`sectionTwo_pages[${index}].image.file_path`)}
              />
              {methods.formState.errors?.sectionTwo_pages?.[index]
                ?.image?.file_path && (
                  <span className="text-red-500 text-sm mt-1">
                    {
                      methods.formState.errors.sectionTwo_pages[index].image?.file_path
                        .message
                    }
                  </span>
                )}
            </div>
            {/* Remove Button */}
            <button
              type="button"
              onClick={() => sectionTwoPages.remove(index)}
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
              sectionTwoPages.append({
                name: "",
                link: "",
                image: { existingPath: "", alt: "", name: "" },
              })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Page
          </button>
        </div>

        {/* Section Three */}
        <InputField name="sectionThree_heading" label="Section Three Heading" />
        <QuillField name="sectionThree_content" label="Section Three Content" />

        {/* Section Four */}
        <InputField name="sectionFour_heading" label="Section Four Heading" />
        <QuillField name="sectionFour_content" label="Section Four Content" />

        {/* Section Five */}
        <InputField name="sectionFive_heading" label="Section Five Heading" />
        <QuillField name="sectionFive_content" label="Section Five Content" />
        <InputField name="sectionFive_btn_link" label="Button Link" />
        <InputField name="sectionFive_image.alt" label="Image Alt" />
        <InputField name="sectionFive_image.name" label="Image Name" />
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Image File
          </label>
          <input
            type="file"
            {...methods.register(`sectionFive_image.file_path`)}
          />
          {methods.formState.errors?.sectionFive_image?.file_path && (
            <span className="text-red-500 text-sm mt-1">
              {methods.formState.errors?.sectionFive_image?.file_path.message}
            </span>
          )}
        </div>
        {sectionFiveItems.fields.map((field, index) => (
          <div key={field.id} className="p-4 border mb-2 relative">
            <InputField
              name={`sectionFive_items[${index}].h`}
              label="Item Heading"
            />
            <InputField
              name={`sectionFive_items[${index}].t`}
              label="Item Text"
            />
            {/* Remove Button */}
            <button
              type="button"
              onClick={() => sectionFiveItems.remove(index)}
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
            onClick={() => sectionFiveItems.append({ h: "", t: "" })}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Item
          </button>
        </div>

        {/* Section Six */}
        <InputField name="sectionSix_heading" label="Section Six Heading" />
        <QuillField name="sectionSix_content" label="Section Six Content" />
        <InputField name="sectionSix_btn1_link" label="Button 1 Link" />
        <InputField name="sectionSix_btn2_link" label="Button 2 Link" />

        <InputField name="sectionSix_image.alt" label="Image Alt" />
        <InputField name="sectionSix_image.name" label="Image Name" />
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Image File
          </label>
          <input
            type="file"
            {...methods.register(`sectionSix_image.file_path`)}
          />
          {methods.formState.errors?.sectionSix_image?.file_path && (
            <span className="text-red-500 text-sm mt-1">
              {methods.formState.errors?.sectionSix_image?.file_path.message}
            </span>
          )}
        </div>

        {/* Section Seven */}
        <InputField name="sectionSeven_heading" label="Section Seven Heading" />
        <QuillField name="sectionSeven_content" label="Section Seven Content" />

        <InputField name="sectionSeven_btn_link" label="Button Link" />

        <InputField name="sectionSeven_image.alt" label="Image Alt" />
        <InputField name="sectionSeven_image.name" label="Image Name" />
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Image File
          </label>
          <input
            type="file"
            {...methods.register(`sectionSeven_image.file_path`)}
          />
          {methods.formState.errors?.sectionSeven_image?.file_path && (
            <span className="text-red-500 text-sm mt-1">
              {methods.formState.errors?.sectionSeven_image?.file_path.message}
            </span>
          )}
        </div>

        <InputField name="sectionSeven_items_heading" label="Items Heading" />
        {sectionSevenItems.fields.map((field, index) => (
          <div key={field.id} className="p-4 border mb-2 relative">
            <InputField
              name={`sectionSeven_items[${index}].t`}
              label="Item Text"
            />
            {/* Remove Button */}
            <button
              type="button"
              onClick={() => sectionSevenItems.remove(index)}
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
            onClick={() => sectionSevenItems.append({ t: "" })}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Item
          </button>
        </div>

        {/* Section Eight */}
        <InputField name="sectionEight_heading" label="Section Eight Heading" />
        <QuillField name="sectionEight_content" label="Section Eight Content" />
        {sectionEightBtns.fields.map((btn, btnIndex) => (
          <SectionEightButton
            key={btn.id}
            control={control}
            btnIndex={btnIndex}
            removeBtn={sectionEightBtns.remove}
          />
        ))}

        <button
          type="button"
          onClick={() =>
            sectionEightBtns.append({
              name: "",
              items: [{ t1: "", t2: "", t3: "" }]
            })
          }
          className="text-blue-600 mt-4"
        >
          + Add Button
        </button>


        {/* Section Nine */}
        <InputField name="sectionNine_heading" label="Section Nine Heading" />
        <QuillField name="sectionNine_content" label="Section Nine Content" />
        {sectionNineImages.fields.map((field, index) => (
          <div key={field.id} className="p-4 border mb-2 relative">
            <InputField
              name={`sectionNine_images[${index}].h`}
              label="Image Heading"
            />
            <InputField
              name={`sectionNine_images[${index}].t`}
              label="Image Text"
            />
            <InputField
              name={`sectionNine_images[${index}].alt`}
              label="Image Alt Text"
            />
            <InputField
              name={`sectionNine_images[${index}].name`}
              label="Image Name"
            />

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Image File
              </label>
              <input
                type="file"
                {...methods.register(`sectionNine_images[${index}].file_path`)}
              />
              {methods.formState.errors?.sectionNine_images?.[index]
                ?.file_path && (
                  <span className="text-red-500 text-sm mt-1">
                    {
                      methods.formState.errors.sectionNine_images[index]
                        .file_path.message
                    }
                  </span>
                )}
            </div>
            {/* Remove Button */}
            <button
              type="button"
              onClick={() => sectionNineImages.remove(index)}
              className=" text-red-500 font-bold"
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
              sectionNineImages.append({
                h: "",
                t: "",
                alt: "",
                name: "",
                file_path: null,
              })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Image
          </button>
        </div>

        <hr />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <InputField name="footer_section_title" label="footer Section title" />
          </div>

          {/* Section 1 Description - using Quill */}
          <div className="flex flex-col">
            <QuillField name="footer_section_description" label="Footer sectio Descripiton" />
          </div>

          {/* Footer Section Image Fields */}

          {footerSectionImage.fields.map((field, index) => (
            <div key={field.id} className="p-4 border mb-2 relative">
              <InputField
                name={`footer_section_image[${index}].alt`}
                label="Image Alt Text"
              />

              <InputField
                name={`footer_section_image[${index}].name`}
                label="Image Name"
              />

              {/* File Upload */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input
                  type="file"
                  {...methods.register(`footer_section_image[${index}].file_path`)}
                />
                {methods.formState.errors?.footer_section_image?.[index].file_path && (
                  <span className="text-red-500 text-sm mt-1">
                    {
                      methods.formState.errors.footer_section_image[index].file_path
                        .message
                    }
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Footer Section Button Feilds */}
          <div className="flex flex-col">
            <InputField name="footer_section_btn_1_text" label="footer Section Button 1 text" />
          </div>
          <div className="flex flex-col">
            <InputField name="footer_section_btn_1_link" label="footer Section Button 1 link" />
          </div>
          <div className="flex flex-col">
            <InputField name="footer_section_btn_2_text" label="footer Section Button 2 text" />
          </div>
          <div className="flex flex-col">
            <InputField name="footer_section_btn_2_link" label="footer Section Button 2 link" />
          </div>

        </div>

        <hr />

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
};


const SectionEightButton = ({ control, btnIndex, removeBtn }) => {
  const itemsFieldArray = useFieldArray({
    control,
    name: `sectionEight_btns[${btnIndex}].items`
  });

  return (
    <div className="p-4 border mb-4 bg-gray-100 rounded">
      <InputField
        name={`sectionEight_btns[${btnIndex}].name`}
        label="Button Name"
      />

      {itemsFieldArray.fields.map((item, itemIndex) => (
        <div key={item.id} className="pl-4 border-l mt-2">
          <InputField name={`sectionEight_btns[${btnIndex}].items[${itemIndex}].t1`} label="Item t1" />
          <InputField name={`sectionEight_btns[${btnIndex}].items[${itemIndex}].t2`} label="Item t2" />
          <InputField name={`sectionEight_btns[${btnIndex}].items[${itemIndex}].t3`} label="Item t3" />

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


export default HomeForm;
