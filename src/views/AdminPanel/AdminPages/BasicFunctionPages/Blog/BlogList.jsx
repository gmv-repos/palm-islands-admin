import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../axiosClient";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Image_Url } from "../../../../../Utils/const";
import { downloadExcelHeaders } from "../../../../../Utils/export";
import UploadExcelButton from "../../../AdminComponents/Btns/UploadExcelButton";

const EXCEL_HEADERS = [
  "category_id",
  "tags_id",
  "title",
  "image",
  "short_description",
  "description_image",
  "description",
  "date",
  "heading",
  "slug",
  "meta_title",
  "meta_description",
  "canonical_url",
  "focus_keyword",
  "redirect_301",
  "redirect_302",
  "old_redirect_url",
  "schema",
];


const BlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectCat, setSelectCat] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  const fetchData = async () => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) return alert("No access token found");
      const res = await axiosClient.post("/admin/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setBlogs(res.data.data);
      console.log(res.data.data[0].image);
    } catch (err) {
      console.log("Failed to load users.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleStatus = async (id) => {
    console.log(id);
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) return alert("No access token found");

    try {
      await axiosClient.post(`/admin/blogs/${id}/toggleStatus`);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative mx-auto p-3" style={{ width: "100%" }}>
      <div
        className={`bg-white flex flex-col gap-10 justify-between shadow-md rounded-lg p-6 mb-6 ${isOpenModal ? "blur-sm" : "blur-none"
          }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold font-palm">Blogs</h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                downloadExcelHeaders({
                  headers: EXCEL_HEADERS,
                  filename: "blogs_Create_Example_Sheet.xlsx",
                })
              }
              className="bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 flex justify-center items-center gap-3 cursor-pointer md:text-sm text-xs text-white w-fit"
            >
              Download Excel Example Sheet
            </button>
            <UploadExcelButton
              endpoint="/admin/blogs/bulk-upload"
              onImported={fetchData}
            />
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
          <table className="w-full table-fixed border border-gray-400 p-3 text-sm">
            <thead>
              <tr className="bg-[#5DAABA] text-white text-left">
                <th className="border border-gray-300 p-3">Sno</th>
                <th className="border border-gray-300 p-3">Main Image</th>
                <th className="border border-gray-300 p-3">Name</th>
                <th className="border border-gray-300 p-3">Slug</th>
                <th className="border border-gray-300 p-3">Description</th>
                <th className="border border-gray-300 p-3">Status</th>
                <th className="border border-gray-300 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs?.length > 0 ? (
                blogs.map((data, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">
                      <img
                        src={
                          data.image
                            ? `${Image_Url}${data.image}`
                            : "/background.png"
                        }
                        alt={data.title}
                        className="w-24  objectcover"
                      />
                    </td>
                    <td className="border border-gray-300 p-2 overflow-hidden">
                      {data.title}
                    </td>
                    <td className="border border-gray-300 p-2">{data.slug}</td>
                    <td className="border border-gray-300 p-2 overflow-hidden">
                      {data.short_description}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        className={`${data.status === 1 ? "bg-green-500" : "bg-red-500"
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
                            navigate("/admin/add-blog", { state: { data } });
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
                    colSpan="7"
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
    </div>
  );
};

export default BlogList;
