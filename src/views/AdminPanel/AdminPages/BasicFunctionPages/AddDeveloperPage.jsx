import React, { useRef, useState } from "react";
import BasicInput from "../../AdminComponents/Inputs/BasicInput";
import BlueButtonAdmin from "../../AdminComponents/Btns/BlueButtonAdmin";
import ImgInput from "../../AdminComponents/Inputs/ImgInput";
import DescriptionInput from "../../AdminComponents/Inputs/DescriptionInput";
import TextEditor from "../../AdminComponents/Inputs/TextEditor";
import { useFieldArray } from "react-hook-form";

const AddDeveloperPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    meta_title: "",
    meta_description: "",
    canonical_url: "",
    focus_keyword: "",
    redirect_301: "",
    old_redirect_url: "",
    redirect_302: "",
    schema: "",
    email: "",
    phone_no: "",
    location: "",
    logo_path: [],
    description: "",
    main_image: { alt: "", file: [], name: "" },
    s1_heading: "",
    s1_description: "",
    s1_text: "",
    s2_heading: "",
    s2_description: "",
    s2_image: { alt: "", file: [], name: "" },
    s4_heading: "",
    s4_image: { alt: "", file: [], name: "" },
    s4_items: [
      {
        name: "",
        text: "",
        logo: [],
      },
    ],
    s5_heading: "",
    s5_sub_heading: "",
    s5_items: [
      {
        name: "",
        text: "",
        logo: [],
      },
    ],
    s7_heading: "",
    s7_description: "",
    s7_image: { alt: "", file: [], name: "" },
    s8_heading: "",
    s8_description: "",
    s8_items: [
      {
        name: "",
        text: "",
        logo: [],
      },
    ],
    s9_faqs: [
      {
        question: "who is This ? ",
        answer: "this is blah blah",
      },
      {
        question: "who is This ? ",
        answer: "this is blah blah",
      },
    ],
  });

  const handleMainImage = (e) => {
    const { name, value, files } = e.target;
    const updatedImages = formData.main_image;
    if (name === "image" && files.length > 0) {
      updatedImages.file = files[0];
    } else if (name !== "image") {
      updatedImages[name] = value;
    }
    setFormData((prev) => ({
      ...prev,
      main_image: updatedImages,
    }));
  };

  const handleLogoImage = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      logo_path: files[0],
    }));
    console.log(formData.logo_path);
  };

  const handleSection4Img = (e, type, index) => {
    const { name, value, files } = e.target;
    const updatedImages = formData.s4_image;
    if (name === "image" && files.length > 0) {
      updatedImages.file = files[0];
    } else if (name !== "image") {
      updatedImages[name] = value;
    }
    setFormData((prev) => ({
      ...prev,
      s4_image: updatedImages,
    }));
  };

  const Section4ListForm = () => {
    return (
      <div className="flex justify-between items-center gap-3">
        <div className="w-1/3">
          <BasicInput
            width="w-full"
            title={`Section 8 (1) list Heading`}
            error=""
            placeholder="Enter Section 8 list heading"
            name="name"
            // label={`section81listheading`}
            iserror={false}
            type="text"
            require="required"
            minLength="3"
          />
        </div>
        <div className="w-1/3">
          <BasicInput
            width="w-full"
            title={`Section 8 (1) list Text`}
            error=""
            name="text"
            placeholder="Enter Section 8 list Text"
            // label={`section81listtxt`}
            iserror={false}
            type="text"
            require="required"
            minLength="3"
          />
        </div>
        <div className="w-1/3">
          <ImgInput
            title={`Section 8 (1) list Image`}
            error=""
            accept="image/*"
            name="listImg"
            // label={`section81listimg`}
            width="w-full"
            iserror={false}
            ismulti={false}
            req="required"
          />
        </div>
        {formData.s4_items.length > 1 ? (
          <div>
            <div className=" bg-red-500 border border-red-500 md:p-2 p-1 md:px-4 px-2 flex justify-center items-center gap-3 cursor-pointer md:text-sm text-xs text-white w-fit">
              Remove
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const handleSection8List = (index, type, e) => {
    const updatedlists = [...formData.s8_items];
    const { name, value, files } = e.target;
    if (type == "img" && files.length > 0) {
      updatedlists[index].logo = files[0];
    } else {
      updatedlists[index][name] = value;
      console.log(formData);
    }
  };

  const Section8ListForum = (index, i) => {
    const indexNumber = index.i;
    const list = formData.s8_items[indexNumber];
    return (
      <div className="flex justify-between items-center gap-3">
        <div className="w-1/3">
          <BasicInput
            width="w-full"
            title={`Section 8 (${indexNumber + 1}) list Heading`}
            error=""
            // value={list.name || ""}
            placeholder="Enter Section 8 list heading"
            name="name"
            onchange={(e) => handleSection8List(indexNumber, "other", e)}
            label={`section8${indexNumber + 1}listheading`}
            iserror={false}
            type="text"
            require="required"
            minLength="3"
          />
        </div>
        <div className="w-1/3">
          <BasicInput
            width="w-full"
            title={`Section 8 (${indexNumber + 1}) list Text`}
            // value={list.text || ""}
            error=""
            name="text"
            onchange={(e) => handleSection8List(indexNumber, "other", e)}
            placeholder="Enter Section 8 list Text"
            label={`section8${indexNumber + 1}listtxt`}
            iserror={false}
            type="text"
            require="required"
            minLength="3"
          />
        </div>
        <div className="w-1/3">
          <ImgInput
            title={`Section 8 (${indexNumber + 1}) list Image`}
            error=""
            accept="image/*"
            // value={list.logo || ""}
            onchange={(e) => handleSection8List(indexNumber, "img", e)}
            name="listImg"
            label={`section8${indexNumber + 1}listimg`}
            width="w-full"
            iserror={false}
            ismulti={false}
            req="required"
          />
        </div>
        {formData.s8_items.length > 1 ? (
          <div>
            <div
              onClick={(e) => section8Click("remove", indexNumber)}
              className=" bg-red-500 border border-red-500 md:p-2 p-1 md:px-4 px-2 flex justify-center items-center gap-3 cursor-pointer md:text-sm text-xs text-white w-fit"
            >
              Remove
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const section8Click = (type, index) => {
    if (type == "add") {
      setFormData((prev) => ({
        ...prev,
        s8_items: [...prev.s8_items, { name: "", text: "", logo: [] }],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        s8_items: prev.s8_items.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSection5List = (index, type, e) => {
    const updatedlists = [...formData.s5_items];
    const { name, value, files } = e.target;
    if (type == "img" && files.length > 0) {
      updatedlists[index].logo = files[0];
    } else {
      updatedlists[index][name] = value;
      console.log(formData);
    }
  };

  const Section5ListForum = (index, i) => {
    const indexNumber = index.i;
    const list = formData.s5_items[indexNumber];
    return (
      <div className="flex justify-between items-center gap-3">
        <div className="w-1/3">
          <BasicInput
            width="w-full"
            title={`Section 5 (${indexNumber + 1}) list Heading`}
            error=""
            // value={list.name || ""}
            placeholder="Enter Section 5 list heading"
            name="name"
            onchange={(e) => handleSection5List(indexNumber, "other", e)}
            label={`section5${indexNumber + 1}listheading`}
            iserror={false}
            type="text"
            require="required"
            minLength="3"
          />
        </div>
        <div className="w-1/3">
          <BasicInput
            width="w-full"
            title={`Section 5 (${indexNumber + 1}) list Text`}
            error=""
            // value={list.text || ""}
            name="text"
            onchange={(e) => handleSection5List(indexNumber, "other", e)}
            placeholder="Enter Section 5 list Text"
            label={`section5${indexNumber + 1}listtxt`}
            iserror={false}
            type="text"
            require="required"
            minLength="3"
          />
        </div>
        <div className="w-1/3">
          <ImgInput
            title={`Section 5 (${indexNumber + 1}) list Image`}
            error=""
            // value={list.logo || ""}
            accept="image/*"
            onchange={(e) => handleSection5List(indexNumber, "img", e)}
            name="listImg"
            label={`section5${indexNumber + 1}listimg`}
            width="w-full"
            iserror={false}
            ismulti={false}
            req="required"
          />
        </div>
        {formData.s5_items.length > 1 ? (
          <div>
            <div
              onClick={(e) => section5Click("remove", indexNumber)}
              className=" bg-red-500 border border-red-500 md:p-2 p-1 md:px-4 px-2 flex justify-center items-center gap-3 cursor-pointer md:text-sm text-xs text-white w-fit"
            >
              Remove
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const section5Click = (type, index) => {
    if (type == "add") {
      setFormData((prev) => ({
        ...prev,
        s5_items: [...prev.s5_items, { name: "", text: "", logo: [] }],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        s5_items: prev.s5_items.filter((_, i) => i !== index),
      }));
    }
  };

  const handleDescriptionChange = (value, section) => {
    // setBlog((prev) => ({ ...prev, blog_body: value }));
    if (section == "1") {
      setFormData((prev) => ({ ...prev, s1_description: value }));
    } else if (section == "2") {
      setFormData((prev) => ({ ...prev, s2_description: value }));
    } else {
      setFormData((prev) => ({ ...prev, s7_description: value }));
    }
  };

  const handleSection2Img = (e) => {
    const { name, value, files } = e.target;
    const updatedImages = formData.s2_image;
    if (name === "image" && files.length > 0) {
      updatedImages.file = files[0];
    } else if (name !== "image") {
      updatedImages[name] = value;
    }
    setFormData((prev) => ({
      ...prev,
      s2_image: updatedImages,
    }));
  };

  const handleSection7Img = (e) => {
    const { name, value, files } = e.target;
    const updatedImages = formData.s7_image;
    if (name === "image" && files.length > 0) {
      updatedImages.file = files[0];
    } else if (name !== "image") {
      updatedImages[name] = value;
    }
    setFormData((prev) => ({
      ...prev,
      s7_image: updatedImages,
    }));
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      s9_faqs: [...prev.s9_faqs, { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      s9_faqs: prev.s9_faqs.filter((_, i) => i !== index),
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data for admin/developers/store:", formData);

    const token = localStorage.getItem("ACCESS_TOKEN"); // Assuming you have this
    if (!token) {
        alert("Access token not found. Please login.");
        return;
    }

    // Construct FormData
    const formDataToSend = new FormData();

    Object.keys(formData).forEach(key => {
        if (key === "main_image" || key === "s2_image" || key === "s4_image" || key === "s7_image") {
            if (formData[key].file instanceof File) {
                formDataToSend.append(`${key}_file`, formData[key].file);
            }
            formDataToSend.append(`${key}_alt`, formData[key].alt);
            formDataToSend.append(`${key}_name`, formData[key].name);
        } else if (key === "logo_path") {
            if (formData[key] instanceof File) { // Assuming logo_path directly holds the file
                formDataToSend.append('logo_file', formData[key]);
            }
             // If logo_path were an object like { file, alt, name }, handle it like other images.
        } else if (key === "s8_items" || key === "s5_items" || key === "s4_items") {
            formData[key].forEach((item, index) => {
                Object.keys(item).forEach(itemKey => {
                    if (itemKey === "logo" && item[itemKey] instanceof File) {
                        formDataToSend.append(`${key}[${index}][${itemKey}_file]`, item[itemKey]);
                    } else {
                         formDataToSend.append(`${key}[${index}][${itemKey}]`, item[itemKey]);
                    }
                });
            });
        } else if (key === "s9_faqs") {
            formData[key].forEach((faq, index) => {
                formDataToSend.append(`${key}[${index}][question]`, faq.question);
                formDataToSend.append(`${key}[${index}][answer]`, faq.answer);
            });
        }
         else if (formData[key] !== null && formData[key] !== undefined) {
            formDataToSend.append(key, formData[key]);
        }
    });
    
    // Log FormData entries for verification
    // for (let pair of formDataToSend.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }


    // try {
    //   const response = await axiosClient.post("/admin/developers/store", formDataToSend, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "multipart/form-data", // Axios usually sets this correctly with FormData
    //     },
    //   });
    //   console.log("API Response:", response.data);
    //   if (response.data.success) {
    //     alert("Developer added successfully!");
    //     // Optionally reset form or redirect
    //     // resetForm(); 
    //   } else {
    //     alert(`Error: ${response.data.message}`);
    //   }
    // } catch (error) {
    //   console.error("API Submission Error:", error.response ? error.response.data : error.message);
    //   alert(`Submission failed: ${error.response ? error.response.data.message : error.message}`);
    // }
  };
   // FAQ Handlers
   const handleFaqChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFaqs = [...prev.s9_faqs];
      updatedFaqs[index] = { ...updatedFaqs[index], [name]: value };
      return { ...prev, s9_faqs: updatedFaqs };
    });
  };

  return (
    <div className="mx-auto p-3" style={{ width: "100%" }}>
      <div className="bg-white flex flex-col gap-10 justify-between shadow-md rounded-lg p-6 mb-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col gap-10 justify-between"
        >
          {/* Main Details */}

          <div>
            <div>
              <h2 className="text-2xl  font-bold font-palm">
                Developer Main Details
              </h2>
            </div>
            <div className="flex justify-between flex-col gap-3">
              <div className="flex justify-between items-center gap-3">
                <div className="w-1/2">
                  <BasicInput
                    width="w-full"
                    title="Name"
                    error=""
                    placeholder="Enter Developer Name"
                    label="developerName"
                    iserror={false}
                    type="text"
                    name="name"
                    require="required"
                    minLength="3"
                  />
                </div>
                <div className="w-1/2">
                  <BasicInput
                    width="w-full"
                    title="Slug"
                    error=""
                    placeholder="Enter Developer Page Slug"
                    label="developerSlug"
                    iserror={false}
                    type="text"
                    name="slug"
                    require="required"
                    minLength="3"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="w-1/3">
                  <ImgInput
                    title="Logo Image"
                    error=""
                    name="logoImg"
                    accept="image/*"
                    label="Logoimg"
                    width="w-full"
                    onchange={handleLogoImage}
                    iserror={false}
                    ismulti={false}
                    req="required"
                  />
                </div>
                <div className="w-1/3">
                  <BasicInput
                    width="w-full"
                    title="Logo Image Alt"
                    error=""
                    name="alt"
                    placeholder="Enter Developer Logo Image Alt"
                    label="LogoAlt"
                    iserror={false}
                    type="text"
                    require="required"
                    minLength="3"
                  />
                </div>
                <div className="w-1/3">
                  <BasicInput
                    width="w-full"
                    title="Logo Image Name"
                    onchange={handleMainImage}
                    error=""
                    name="name"
                    placeholder="Enter Logo Image Name"
                    label="logoName"
                    iserror={false}
                    type="text"
                    require="required"
                    minLength="3"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="w-1/3">
                  <ImgInput
                    title="Main Image"
                    error=""
                    onchange={handleMainImage}
                    accept="image/*"
                    name="image"
                    label="mainimg"
                    width="w-full"
                    iserror={false}
                    ismulti={false}
                    req="required"
                  />
                </div>
                <div className="w-1/3">
                  <BasicInput
                    width="w-full"
                    title="Main Image Alt"
                    error=""
                    onchange={handleMainImage}
                    placeholder="Enter Developer Main Image Alt"
                    label="mainAlt"
                    name="alt"
                    iserror={false}
                    type="text"
                    require="required"
                    minLength="3"
                  />
                </div>
                <div className="w-1/3">
                  <BasicInput
                    width="w-full"
                    title="Main Image Name"
                    onchange={handleMainImage}
                    error=""
                    name="name"
                    placeholder="Enter Main Image Name"
                    label="mainName"
                    iserror={false}
                    type="text"
                    require="required"
                    minLength="3"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="w-1/3">
                  <BasicInput
                    width="w-full"
                    title="Email"
                    error=""
                    name="email"
                    placeholder="Enter Developer Email"
                    label="email"
                    iserror={false}
                    type="email"
                    require="required"
                  />
                </div>
                <div className="w-1/3">
                  <BasicInput
                    width="w-full"
                    title="Phone no"
                    error=""
                    name="phone_no"
                    placeholder="Enter Developer Phone no"
                    label="phone"
                    iserror={false}
                    type="number"
                    maxLength="15"
                    require="required"
                  />
                </div>
                <div className="w-1/3">
                  <BasicInput
                    width="w-full"
                    title="Years of Experience"
                    error=""
                    name="s1-text"
                    placeholder="Enter Developer Year Of Experience"
                    label="years"
                    iserror={false}
                    type="number"
                    require="required"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="w-1/2">
                  <DescriptionInput
                    width="w-full"
                    title="Location"
                    error=""
                    name="location"
                    label="location"
                    iserror={false}
                    req="required"
                    rows="1"
                  />
                </div>
                <div className="w-1/2">
                  <DescriptionInput
                    width="w-full"
                    title="Main Description"
                    error=""
                    name="description"
                    label="desc"
                    iserror={false}
                    req="required"
                    rows="1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SEO Details */}

          <div>
            <div>
              <h2 className="text-2xl  font-bold font-palm">SEO Details</h2>
            </div>
            <div className="flex justify-between flex-col gap-3">
              <div className="flex justify-between items-center gap-3">
                <div className="w-1/2">
                  <BasicInput
                    width="w-full"
                    title="Meta Title"
                    error=""
                    placeholder="Enter Meta Title"
                    label="metaTitle"
                    iserror={false}
                    type="text"
                    name="meta_title"
                    require="no-required"
                    minLength="3"
                  />
                </div>
                <div className="w-1/2">
                  <BasicInput
                    width="w-full"
                    title="Canonical URL"
                    error=""
                    name="canonical_url"
                    placeholder="Enter Canonical Url"
                    label="cannoical_url"
                    iserror={false}
                    type="text"
                    require="no-required"
                    minLength="3"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="w-1/2">
                  <BasicInput
                    width="w-full"
                    title="Redirect-301"
                    error=""
                    name="redirect_301"
                    placeholder="Enter redirect-301"
                    label="redirect-1"
                    iserror={false}
                    type="text"
                    require="no-required"
                    minLength="3"
                  />
                </div>
                <div className="w-1/2">
                  <BasicInput
                    width="w-full"
                    title="Redirect-302"
                    error=""
                    name="redirect_302"
                    placeholder="Enter redirect-302"
                    label="redirect-2"
                    iserror={false}
                    type="text"
                    require="no-required"
                    minLength="3"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="w-1/2">
                  <BasicInput
                    width="w-full"
                    title="Focus Keyword"
                    error=""
                    placeholder="Enter Focus Keyword  - Seprate by comma"
                    label="keyword"
                    iserror={false}
                    name="focus_keyword"
                    type="text"
                    require="no-required"
                    minLength="3"
                  />
                </div>
                <div className="w-1/2">
                  <BasicInput
                    width="w-full"
                    title="Old Redirect URL"
                    error=""
                    placeholder="Enter Old Redirect URL"
                    label="old-redirect"
                    iserror={false}
                    name="old_redirect_url"
                    type="text"
                    require="no-required"
                    minLength="3"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="w-1/2">
                  <DescriptionInput
                    width="w-full"
                    title="Meta Description"
                    error=""
                    name="meta_description"
                    label="metaDesc"
                    iserror={false}
                    req="no-required"
                    rows="1"
                  />
                </div>
                <div className="w-1/2">
                  <DescriptionInput
                    width="w-full"
                    title="Schema"
                    error=""
                    name="schema"
                    label="schema"
                    iserror={false}
                    req="no-required"
                    rows="1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}

          <div>
            <div>
              <h2 className="text-2xl  font-bold font-palm">
                Additonal Details / Section Wise Details
              </h2>
            </div>
            <div className="flex justify-between flex-col gap-5">
              <div className="flex flex-col gap-2 border-y border-gray-400 py-5 mt-5">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <BasicInput
                      width="w-full"
                      title="Section 1 Heading"
                      onchange={handleChange}
                      error=""
                      placeholder="Enter Section 1 Heading"
                      label="sec1head"
                      name="s1_heading"
                      iserror={false}
                      type="text"
                      require="required"
                      minLength="3"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <TextEditor
                      title="Section 1 Description"
                      width="w-full"
                      error=""
                      name="s1_description"
                      onchange={(newContent, e) => {
                        handleDescriptionChange(newContent, "1");
                      }}
                      label="sec1desc"
                      iserror={false}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 border-b border-gray-400 py-5">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <BasicInput
                      width="w-full"
                      onchange={handleChange}
                      title="Section 2 Heading"
                      error=""
                      name="s2_heading"
                      placeholder="Enter Section 2 Heading"
                      label="sec2Head"
                      iserror={false}
                      type="text"
                      require="required"
                      minLength="3"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/3">
                    <ImgInput
                      title="Section 2 Image"
                      error=""
                      accept="image/*"
                      onchange={handleSection2Img}
                      name="image"
                      label="sec2img"
                      width="w-full"
                      iserror={false}
                      ismulti={false}
                      req="required"
                    />
                  </div>
                  <div className="w-1/3">
                    <BasicInput
                      width="w-full"
                      title="Section 2 Image Alt"
                      onchange={handleSection2Img}
                      error=""
                      placeholder="Enter Section 2 Image Alt"
                      label="section2alt"
                      iserror={false}
                      type="text"
                      name="alt"
                      require="required"
                      minLength="3"
                    />
                  </div>
                  <div className="w-1/3">
                    <BasicInput
                      width="w-full"
                      title="Section 2 Image Name"
                      error=""
                      name="name"
                      onchange={handleSection2Img}
                      placeholder="Enter Section 2 Image Name"
                      label="section2name"
                      iserror={false}
                      type="text"
                      require="required"
                      minLength="3"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <TextEditor
                      title="Section 2 Description"
                      width="w-full"
                      error=""
                      label="s2_description"
                      onchange={(newContent, e) => {
                        handleDescriptionChange(newContent, "2");
                      }}
                      name=""
                      iserror={false}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 border-b border-gray-400 py-5 ">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <BasicInput
                      onchange={handleChange}
                      width="w-full"
                      title="Section 4 Heading"
                      error=""
                      name="s4_heading"
                      placeholder="Enter Section 4 Heading"
                      label="sec4Head"
                      iserror={false}
                      type="text"
                      require="required"
                      minLength="3"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/3">
                    <ImgInput
                      title="Section 4 Image"
                      error=""
                      onchange={(e) => handleSection4Img(e, "main", 0)}
                      accept="image/*"
                      name="image"
                      label="sec4img"
                      width="w-full"
                      iserror={false}
                      ismulti={false}
                      req="required"
                    />
                  </div>
                  <div className="w-1/3">
                    <BasicInput
                      width="w-full"
                      title="Section 4 Image Alt"
                      error=""
                      onchange={(e) => handleSection4Img(e, "main")}
                      placeholder="Enter Section 4 Image Alt"
                      label="section4alt"
                      iserror={false}
                      type="text"
                      name="alt"
                      require="required"
                      minLength="3"
                    />
                  </div>
                  <div className="w-1/3">
                    <BasicInput
                      width="w-full"
                      title="Section 4 Image Name"
                      error=""
                      onchange={(e) => handleSection4Img(e, "main")}
                      placeholder="Enter Section 4 Image Name"
                      label="section4name"
                      name="name"
                      iserror={false}
                      type="text"
                      require="required"
                      minLength="3"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Section4ListForm />
                </div>
              </div>
              <div className="flex flex-col gap-2 border-b border-gray-400 py-5">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/2">
                    <BasicInput
                      width="w-full"
                      title="Section 5 Heading"
                      error=""
                      placeholder="Enter Section 5 Heading"
                      label="sec5head"
                      iserror={false}
                      name="s5_heading"
                      type="text"
                      onchange={handleChange}
                      require="required"
                      minLength="3"
                    />
                  </div>
                  <div className="w-1/2">
                    <BasicInput
                      width="w-full"
                      onchange={handleChange}
                      title="Section 5 Sub Heading"
                      error=""
                      placeholder="Enter Section 5 Sub Heading"
                      label="sec5desc"
                      iserror={false}
                      type="text"
                      name="s5_sub_heading"
                      require="required"
                      minLength="3"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {formData.s5_items.map((i, index) => (
                    <Section5ListForum index={i} i={index} />
                  ))}
                  {formData.s5_items.length < 4 ? (
                    <div className="flex justify-end">
                      <div
                        onClick={() => section5Click("add", 0)}
                        className=" bg-black border border-black md:p-2 p-1 md:px-4 px-2 flex justify-center items-center gap-3 cursor-pointer md:text-sm text-xs text-white w-fit"
                      >
                        Add List
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 border-b border-gray-400 py-5">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <BasicInput
                      width="w-full"
                      title="Section 7 Heading"
                      error=""
                      name="s7_heading"
                      placeholder="Enter Section 7 Heading"
                      onchange={handleChange}
                      label="sec7Head"
                      iserror={false}
                      type="text"
                      require="required"
                      minLength="3"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/3">
                    <ImgInput
                      title="Section 7 Image"
                      error=""
                      onchange={handleSection7Img}
                      name="image"
                      accept="image/*"
                      label="sec7img"
                      width="w-full"
                      iserror={false}
                      ismulti={false}
                      req="required"
                    />
                  </div>
                  <div className="w-1/3">
                    <BasicInput
                      width="w-full"
                      title="Section 7 Image Alt"
                      error=""
                      onchange={handleSection7Img}
                      placeholder="Enter Section 7 Image Alt"
                      label="section7alt"
                      iserror={false}
                      type="text"
                      name="alt"
                      require="required"
                      minLength="3"
                    />
                  </div>
                  <div className="w-1/3">
                    <BasicInput
                      width="w-full"
                      title="Section 7 Image Name"
                      error=""
                      onchange={handleSection7Img}
                      placeholder="Enter Section 7 Image Name"
                      label="section7name"
                      iserror={false}
                      name="name"
                      type="text"
                      require="required"
                      minLength="3"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-2/2">
                    <TextEditor
                      title="Section 7 Description"
                      width="w-full"
                      error=""
                      label="sec7desc"
                      onchange={(newContent, e) => {
                        handleDescriptionChange(newContent, "7");
                      }}
                      name="7_description"
                      iserror={false}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 border-b border-gray-400 py-5">
                <div className="flex justify-between items-center gap-3">
                  <div className="w-1/2">
                    <BasicInput
                      width="w-full"
                      title="Section 8 Heading"
                      error=""
                      onchange={handleChange}
                      placeholder="Enter Section 8 Heading"
                      label="sec8head"
                      name="s8_heading"
                      iserror={false}
                      type="text"
                      require="required"
                      minLength="3"
                    />
                  </div>
                  <div className="w-1/2">
                    <BasicInput
                      width="w-full"
                      title="Section 8 Description"
                      error=""
                      onchange={handleChange}
                      placeholder="Enter Section 8 Description"
                      label="sec8desc"
                      name="s8_description"
                      iserror={false}
                      type="text"
                      require="required"
                      minLength="3"
                    />
                  </div>
                </div>
                {/* <div className="flex flex-col gap-3">
                  {formData.s8_items.map((i, index) => (
                    <Section8ListForum index={i} i={index} />
                  ))}
                  {formData.s8_items.length < 4 ? (
                    <div className="flex justify-end">
                      <div
                        onClick={() => section8Click("add", 0)}
                        className=" bg-black border border-black md:p-2 p-1 md:px-4 px-2 flex justify-center items-center gap-3 cursor-pointer md:text-sm text-xs text-white w-fit"
                      >
                        Add List
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div> */}
              </div>
            </div>
          </div>

          {/* Section 9: FAQs */}
          <div className="flex flex-col gap-4 border-b border-gray-300 py-5">
            <h3 className="text-xl font-semibold font-palm">Section 9: Frequently Asked Questions (FAQs)</h3>
            {formData.s9_faqs.map((faq, index) => (
              <div key={index} className="p-3 border rounded-md shadow-sm bg-gray-50">
                <div className="flex flex-col gap-3">
                <BasicInput
                    width="w-full"
                    title="Question"
                    error=""
                    name="question"
                    placeholder="Enter A Question"
                    // label="Question"
                    iserror={false}
                    type="text"
                    require="required"
                  />
                  <DescriptionInput
                    width="w-full"
                    title="Answer"
                    error=""
                    name="answer"
                    // label="answer"
                    iserror={false}
                    req="required"
                    rows="1"
                  />
                </div>
                {formData.s9_faqs.length > 1 && (
                  // <BlueButtonAdmin
                  //   onClick={() => removeFaq(index)}
                  //   label="Remove FAQ"
                  //   type="button"
                  //   className="bg-red-500 hover:bg-red-600 mt-3 text-white"
                  // />
                  <button type="button" className="bg-red-500 hover:bg-red-600 mt-3 text-white">Remove FAQ</button>
                )}
              </div>
            ))}
                  <button type="button" className="mt-2 w-fit">Add FAQ</button>

          </div>

          {/* Buttons */}

          <div className="flex justify-end items-center">
            <div>
              <BlueButtonAdmin text="Add Developer" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeveloperPage;
