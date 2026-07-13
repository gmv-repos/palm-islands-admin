import { useEffect, useState } from "react";
import { FaTimes, FaSearch, FaPen, FaTrash } from "react-icons/fa";
import BlueButtonAdmin from "../../../AdminComponents/Btns/BlueButtonAdmin";
import axiosClient from "../../../../../axiosClient";
// import CategoryModal from "./Category/CategoryModal";

const BlogTags = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectCat, setSelectCat] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    Meta_title: "",
    Meta_description: "",
    canonical_url: "",
    focus_keyword: "",
    redirect_301: "",
    redirect_302: "",
    old_redirect_url: "",
    Schema: "",
  });

  useEffect(() => {
    fetchCategory();
    // fetchRoles();
  }, []);

  const fetchCategory = async () => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) return alert("No access token found");
      const res = await axiosClient.post("/admin/blog-tags", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setCategory(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      setErrorMessage("Failed to load users.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      Meta_title: "",
      Meta_description: "",
      canonical_url: "",
      focus_keyword: "",
      redirect_301: "",
      redirect_302: "",
      old_redirect_url: "",
      Schema: "",
    });
    setIsOpenModal(false);
    setIsEdit(false);
    setSelectCat(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);

    console.log(formData);
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) return alert("No access token found");

    const url = isEdit
      ? `/admin/blog-tags/${selectCat}/update`
      : "/admin/blog-tags/store";
    // const url = "/admin/property-types/store";
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    try {
      const response = await axiosClient.post(url, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const res = response.data;
      console.log(res);
      if (res.success) {
        console.log(res.message);
        fetchCategory();
        resetForm();
      } else {
        console.log(res.message);
      }
      resetForm();
    } catch (err) {
      const message =
        err.response?.data?.message || "An error occurred. Please try again.";
      console.log(message, err, "messsage");
    }
    // Handle further actions like sending to API
  };

  const toggleStatus = async (id) => {
    console.log(id);
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) return alert("No access token found");

    try {
      await axiosClient.post(`/admin/blog-tags/${id}/toggleStatus`);
      fetchCategory();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative mx-auto p-3" style={{ width: "100%" }}>
      <div
        className={`bg-white flex flex-col gap-10 justify-between shadow-md rounded-lg p-6 mb-6 ${
          isOpenModal ? "blur-sm" : "blur-none"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold font-palm">Blog Tags</h2>
          <div
            onClick={() => {
              setIsOpenModal(true);
              setIsEdit(false);
              setFormData({
                name: "",
                slug: "",
                Meta_title: "",
                Meta_description: "",
                canonical_url: "",
                focus_keyword: "",
                redirect_301: "",
                redirect_302: "",
                old_redirect_url: "",
                Schema: "",
              });
            }}
          >
            <BlueButtonAdmin text="Add Categories" />
          </div>
        </div>
        {/* <div className="flex justify-end items-center">
          <div className="rounded border border-gray-300 flex items-center p-3 gap-3">
            <label htmlFor="search">
              <FaSearch className="text-gray-300" />
            </label>
            <input
              id="search"
              required
              className="text-base outline-none"
              type="text"
              placeholder="Search"
            />
          </div>
        </div> */}
        <div>
          <table className="w-full table-fixed border border-gray-400 p-3 text-sm ">
            <thead>
              <tr className="bg-[#5DAABA] text-white text-left">
                <th className="border border-gray-300 p-3">Sno</th>
                <th className="border border-gray-300 p-3">Name</th>
                <th className="border border-gray-300 p-3">Slug</th>
                <th className="border border-gray-300 p-3">Status</th>
                <th className="border border-gray-300 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {category?.length > 0 ? (
                category.map((data, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2 active overflow-auto">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 p-2 overflow-auto">
                      {data.name}
                    </td>
                    <td className="border border-gray-300 p-2 overflow-auto">
                      {data.slug}
                    </td>
                    <td className="border border-gray-300 p-2 flex overflow-auto">
                      <button
                        className={`${
                          data.status === 1 ? "bg-green-500" : "bg-red-500"
                        } p-2 rounded text-white`}
                        onClick={() => toggleStatus(data.id)}
                      >
                        {data.status === 1 ? "Active" : "In-Active"}
                      </button>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsOpenModal(true);
                            setIsEdit(true);
                            setSelectCat(data.id);
                            setFormData({
                              name: data.name,
                              slug: data.slug,
                              Meta_title: data.Meta_title,
                              Meta_description: data.Meta_description,
                              canonical_url: data.canonical_url,
                              focus_keyword: data.focus_keyword,
                              redirect_301: data.redirect_301,
                              redirect_302: data.redirect_302,
                              old_redirect_url: data.old_redirect_url,
                              Schema: data.Schema,
                            });
                          }}
                          className="p-2 text-sm rounded flex gap-2 items-center justify-between bg-[#5DAABA] text-white"
                        >
                          <FaPen />
                          <div>Edit</div>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border border-gray-300 p-3 text-center text-sm bg-gray-200"
                    colSpan="5"
                  >
                    Content Is not Available
                  </td>
                </tr>
              )}
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
      {isOpenModal && (
        <div className="w-[70%] r-0 absolute top-5 right-50 bg-white shadow-xl rounded p-5">
          <div className="flex flex-col gap-10 justify-between">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold font-palm">Add Blog Tags</h2>
              <div className="text-2xl" onClick={() => setIsOpenModal(false)}>
                <FaTimes />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex justify-between items-center gap-3">
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700">Name</label>
                    <input
                      required
                      className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                      type="text"
                      placeholder="Enter Blog Categorie Name"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                    />
                  </div>
                </div>
                <div className="w-1/2">
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
                      name="Meta_title"
                      onChange={handleChange}
                      value={formData.Meta_title}
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
                      name="Meta_description"
                      onChange={handleChange}
                      value={formData.Meta_description}
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
                      name="Schema"
                      onChange={handleChange}
                      value={formData.Schema}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className="bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 flex justify-center items-center gap-3 cursor-pointer md:text-sm text-xs text-white w-fit"
                >
                  {isEdit ? "Update" : "Add Categories"}
                </button>
              </div>
            </form>
          </div>
        </div>
        // <>
        //

        // </>
      )}
    </div>
  );
};

export default BlogTags;
