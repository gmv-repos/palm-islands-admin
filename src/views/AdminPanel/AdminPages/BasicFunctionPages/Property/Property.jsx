import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../axiosClient";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Image_Url } from "../../../../../Utils/const";
import { downloadExcelHeaders } from "../../../../../Utils/export";
import UploadExcelButton from "../../../AdminComponents/Btns/UploadExcelButton";

const EXCEL_HEADERS = [
  "name",
  "slug",
  "short_description",
  "meta_title",
  "focus_keyword",
  "redirect_301",
  "redirect_302",
  "old_redirect_url",
  "schema",
  "meta_description",
  "canonical_url",
  "developer_id",
  "property_types_id",
  "property_locations_name",
  "square_feet",
  "price",
  "no_of_bedrooms",
  "register_btn_link",
  "image",
  "broucher_file",
  "image_alt",
  "image_text",
  "listing_type",
  "handover",
  "payment_plan",
  "frond",
  "villa_type",
  "property_feature",
  "section_1_title",
  "section_1_heading",
  "section_1_image",
  "section_1_image_alt",
  "section_1_image_text",
  "section_1_options",
  "section_2_heading",
  "section_2_description",
  "section_2_image",
  "section_2_image_alt",
  "section_2_image_text",
  "footer_section_title",
  "footer_section_description",
  "footer_section_image_alt",
  "footer_section_image_text",
  "footer_section_btn_1_text",
  "footer_section_btn_1_link",
  "footer_section_btn_2_text",
  "footer_section_btn_2_link",
  "footer_section_image_file",
  "section_3_title",
  "section_3_heading",
  "section_3_options",
  "section_4_heading",
  "section_4_description",
  "section_4_interior_images",
  "section_4_exterior_images",
  "section_5_heading",
  "section_5_description",
  "section_5_image",
  "section_5_image_alt",
  "section_5_image_text",
  "section_6_heading",
  "section_6_options",
  "section_7_heading",
  "section_7_description",
  "section_7_image",
  "section_7_image_alt",
  "section_7_image_text",
  "section_7_options",
  "section_8_heading",
  "floors",
  "section_9_heading",
  "section_9_description",
  "section_9_image",
  "section_9_image_alt",
  "section_9_image_text",
  "section_10_heading",
  "section_10_description",
  "section_11_faqs",
];


const Property = () => {
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
      const res = await axiosClient.post("/admin/property", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setBlogs(res.data.data);
      console.log(res.data.data);
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
      await axiosClient.post(`/admin/property/${id}/toggleStatus`);
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
          <h2 className="text-3xl font-bold font-palm">Properties</h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                downloadExcelHeaders({
                  headers: EXCEL_HEADERS,
                  filename: "properties_Create_Example_Sheet.xlsx",
                })
              }
              className="bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 flex justify-center items-center gap-3 cursor-pointer md:text-sm text-xs text-white w-fit"
            >
              Download Excel Example Sheet
            </button>
            <UploadExcelButton
              endpoint="/admin/properties/bulk-upload"
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
                <th className="border border-gray-300 p-3">Name</th>
                <th className="border border-gray-300 p-3">Slug</th>
                <th className="border border-gray-300 p-3">Description</th>
                <th className="border border-gray-300 p-3">Location</th>
                <th className="border border-gray-300 p-3">Price</th>
                <th className="border border-gray-300 p-3">Status</th>
                <th className="border border-gray-300 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs?.length > 0 ? (
                blogs.map((data, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>

                    <td className="border border-gray-300 p-2 overflow-hidden">
                      {data.name}
                    </td>
                    <td className="border border-gray-300 p-2">{data.slug}</td>
                    <td className="border border-gray-300 p-2">
                      {data.short_description}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {data.property_locations_name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {data.price}
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
                            navigate("/admin/update-property", { state: { data } });
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
                    colSpan="8"
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

export default Property;
