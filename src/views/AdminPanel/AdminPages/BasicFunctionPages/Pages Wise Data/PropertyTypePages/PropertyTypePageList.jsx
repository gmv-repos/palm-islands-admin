import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosClient from "../../../../../../axiosClient";
import { Image_Url } from "../../../../../../Utils/const";
import { downloadExcelHeaders } from "../../../../../../Utils/export";
import UploadExcelButton from "../../../../AdminComponents/Btns/UploadExcelButton";

const EXCEL_HEADERS = [
  "slug",
  "meta_title",
  "meta_description",
  "canonical_url",
  "focus_keyword",
  "schema",
  "redirect_301",
  "redirect_302",
  "old_redirect_url",
  "property_type_id",
  "property_locations_name",
  "Banner_image",
  "Banner_image_alt",
  "Banner_image_text",
  "Banner_heading",
  "section_1_title",
  "location_section_heading",
  "location_section_description",
  "location_section_image_file",
  "location_section_image_alt",
  "location_section_image_text",
  "location_section2_heading",
  "location_section2_description",
  "location_section2_image_file",
  "location_section2_image_alt",
  "location_section2_image_text",
  "section_2_heading",
  "section_2_description",
  "section_2_email",
  "section_2_phone",
  "section_3_title",
  "footer_section_title",
  "footer_section_description",
  "footer_section_image_file",
  "footer_section_image_alt",
  "footer_section_image_text",
  "footer_section_btn_1_text",
  "footer_section_btn_1_link",
  "footer_section_btn_2_text",
  "footer_section_btn_2_link",
];

const PropertyTypePageList = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) return alert("No access token found");
      const res = await axiosClient.post("/admin/property-type-page", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setPages(res.data.data);
    } catch (err) {
      console.log("Failed to load property type pages.", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative mx-auto p-3" style={{ width: "100%" }}>
      <div className="bg-white flex flex-col gap-10 shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold font-palm">Property Type Pages</h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                downloadExcelHeaders({
                  headers: EXCEL_HEADERS,
                  filename: "property-type-pages_Create_Example_Sheet.xlsx",
                })
              }
              className="bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 flex justify-center items-center gap-3 cursor-pointer md:text-sm text-xs text-white w-fit"
            >
              Download Excel Example Sheet
            </button>
            <UploadExcelButton
              endpoint="/admin/property-type-pages/bulk-upload"
              onImported={fetchData}
            />
          </div>
        </div>

        <div>
          <table className="w-full table-fixed border border-gray-400 p-3 text-sm">
            <thead>
              <tr className="bg-[#5DAABA] text-white text-left">
                <th className="border border-gray-300 p-3">Sno</th>
                <th className="border border-gray-300 p-3">Banner Image</th>
                <th className="border border-gray-300 p-3">Property Type</th>
                <th className="border border-gray-300 p-3">Page</th>
                <th className="border border-gray-300 p-3">Slug</th>
                <th className="border border-gray-300 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {pages?.length > 0 ? (
                pages.map((data, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">
                      <img
                        src={
                          data?.Banner_image
                            ? `${Image_Url}${data?.Banner_image}`
                            : "/background.png"
                        }
                        alt={data?.Banner_image_alt}
                        className="w-20 h-20 object-cover"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      {data?.property_type?.name || "-"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {data?.property_locations_name || "-"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {data?.slug}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() =>
                          navigate("/admin/create-property-type-page", {
                            state: { data },
                          })
                        }
                        className="p-2 text-sm rounded flex gap-2 items-center justify-between bg-[#5DAABA] text-white"
                      >
                        <FaPen />
                        <div>Edit</div>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border border-gray-300 p-3 text-center text-sm bg-gray-200"
                    colSpan="6"
                  >
                    Content is not available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertyTypePageList;
