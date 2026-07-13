import React, { useEffect, useRef, useState } from "react";
import BasicInput from "../../../AdminComponents/Inputs/BasicInput";
import axiosClient from "../../../../../axiosClient";
import JoditEditor from "jodit-react";
import BlueButtonAdmin from "../../../AdminComponents/Btns/BlueButtonAdmin";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BlogCreation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [blogCat, setBlogCat] = useState([]);
  const [blogTag, setBlogTag] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectBlog, setSelectBlog] = useState(null);
  const [formData, setFormData] = useState({
    category_id: "",
    tags_id: "",
    title: "",
    image: "",
    short_description: "",
    description_image: "",
    description: "",
    date: "6-4-25",
    heading: "",
    slug: "",
    meta_title: "",
    meta_description: "",
    canonical_url: "",
    focus_keyword: "",
    redirect_301: "",
    redirect_302: "",
    old_redirect_url: "",
    schema: "",
  });

  const resetForm = () => {
    setFormData({
      category_id: "",
      tags_id: "",
      title: "",
      image: "",
      short_description: "",
      description_image: "",
      description: "",
      date: "6-4-25",
      heading: "",
      slug: "",
      meta_title: "",
      meta_description: "",
      canonical_url: "",
      focus_keyword: "",
      redirect_301: "",
      redirect_302: "",
      old_redirect_url: "",
      schema: "",
    });
    setIsEdit(false);
    setSelectBlog(null);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.description === "") {
      Swal.fire({
        icon: "error",
        title: "Missing Description",
        text: "Please fill in the description section.",
      });
      return;
    } else {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) {
        alert("No access token found");
        return;
      }

      // const formData2 = new FormData();
      const formData2 = new FormData();

for (const key in formData) {
  if (Array.isArray(formData[key])) {
    formData[key].forEach((file) => {
      formData2.append(`${key}[]`, file);
    });
  } else {
    if ((key === 'image' || key === 'description_image')) {
      // Only append if value is not empty
      if (formData[key]) {
        formData2.append(key, formData[key]);
      }
    } else {
      formData2.append(key, formData[key]);
    }
  }
}


      try {
        const url = isEdit == false ? "/admin/blogs/store" : `/admin/blogs/${selectBlog?.id}/update`
        const response = await axiosClient.post(
          url,
          formData2,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const res = response.data;
        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.message || "Blog saved successfully!",
          });
          resetForm();
          navigate("/admin/blogs");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res.message || "An error occurred while saving the blog.",
          });
        }
        // Swal.fire("Success", "Blog created Successfully!", "success");
        // navigate("/admin/blogs");
        console.log("success");
      } catch (error) {
        const errorMessage =
        error.response?.data?.message ||
        "Failed to save blog. Please try again.";
  
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: errorMessage,
      });
      }
    }
  };

  // for Fetching Cat and Tags

  const fetchCategory = async () => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) return alert("No access token found");
      const res = await axiosClient.get("/blog-category");
      setBlogCat(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTags = async () => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) return alert("No access token found");
      const res = await axiosClient.get("/blog-tags");
      setBlogTag(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCategory();
    fetchTags();

    const blog = location.state?.data;
    if (blog) {
      setFormData({
        category_id: blog.category_id || "",
        tags_id: blog.tags_id || "",
        title: blog.title || "",
        image: "", // Let the user upload again if needed
        short_description: blog.short_description || "",
        description_image: "", // Same here
        description: blog.description || "",
        date: blog.date || "6-4-25",
        heading: blog.heading || "",
        slug: blog.slug || "",
        meta_title: blog.meta_title || "",
        meta_description: blog.meta_description || "",
        canonical_url: blog.canonical_url || "",
        focus_keyword: blog.focus_keyword || "",
        redirect_301: blog.redirect_301 || "",
        redirect_302: blog.redirect_302 || "",
        old_redirect_url: blog.old_redirect_url || "",
        schema: blog.schema || "",
      });
      setIsEdit(true);
      setSelectBlog(blog);
    }
  }, []);

  const editor = useRef(null);

  return (
    <div className="mx-auto p-3" style={{ width: "100%" }}>
      <div className="bg-white flex flex-col gap-10 justify-between shadow-md rounded-lg p-6 mb-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col gap-10 justify-between"
        >
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl  font-bold font-palm">
                Blog Main Detils
              </h2>
            </div>
            <div className="flex justify-between flex-col gap-3">
              <div className="flex justify-between items-center gap-3">
                <div className="w-1/2">
                  <div className="flex flex-col gap-2 justfify-between  ">
                    <label className="text-sm text-gray-700">
                      Select Category
                    </label>
                    <div>
                      <select
                        name="category_id"
                        required
                        value={formData.category_id}
                        onChange={handleChange}
                        className={`rounded p-3 text-base border outline-none border-gray-300 w-full`}
                      >
                        <option value="">Select Blog Category</option>
                        {blogCat.map((data, i) => (
                          <option value={data.id} key={data.id}>
                            {data.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="flex flex-col gap-2 justfify-between  ">
                    <label className="text-sm text-gray-700">Select Tag</label>
                    <div>
                      <select
                        name="tags_id"
                        value={formData.tags_id}
                        onChange={handleChange}
                        required
                        className={`rounded p-3 text-base border outline-none border-gray-300 w-full`}
                      >
                        <option value="">Select Blog Tag</option>
                        {blogTag.map((data, i) => (
                          <option key={data.id} value={data.id}>
                            {data.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700">Blog Title</label>
                    <input
                      required
                      className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                      type="text"
                      placeholder="Enter Blog Title"
                      name="title"
                      onChange={handleChange}
                      value={formData.title}
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700">
                      Blog Short Description
                    </label>
                    <input
                      required
                      className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                      type="text"
                      placeholder="Enter Blog Short Description"
                      name="short_description"
                      onChange={handleChange}
                      value={formData.short_description}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700">
                      Blog Main Image
                    </label>
                    <input
                       required={!isEdit}
                      className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700">
                      Blog Description Image
                    </label>
                    <input
                       required={!isEdit}
                      className="rounded p-3 text-gray-500 text-base border outline-none border-gray-300 w-full"
                      type="file"
                      name="description_image"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="w-2/2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700">
                      Blog Heading
                    </label>
                    <input
                      required
                      className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                      type="text"
                      placeholder="Enter Blog Heading"
                      name="heading"
                      onChange={handleChange}
                      value={formData.heading}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="w-2/2">
                  <div className="flex flex-col gap-2 justfify-between  ">
                    <label className="text-sm text-gray-700">
                      Blog Main Description
                    </label>
                    <div>
                      <JoditEditor
                        ref={editor}
                        onChange={(newContent) => {
                          handleDescriptionChange(newContent);
                        }}
                        value={formData.description}
                        className={`w-full`}
                        tabIndex={1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl  font-bold font-palm">Blog SEO Detils</h2>
            </div>
            <div className="flex justify-between flex-col gap-3">
              <div className="flex justify-between items-center gap-3">
                <div className="w-2/2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700">Slug</label>
                    <input
                      required
                      className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                      type="text"
                      placeholder="Enter Blog Categorie Slug"
                      name="slug"
                      onChange={handleChange}
                      value={formData.slug}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700">Meta Title</label>
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
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700">Schema</label>
                    <input
                      required
                      className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                      type="text"
                      placeholder="Enter Blog Tgs Schema"
                      name="schema"
                      onChange={handleChange}
                      value={formData.schema}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center">
              <div>
                <BlueButtonAdmin text="Add Blog" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogCreation;
