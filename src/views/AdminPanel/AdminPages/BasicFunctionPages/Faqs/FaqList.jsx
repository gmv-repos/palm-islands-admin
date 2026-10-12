import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../axiosClient";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import Swal from "sweetalert2";
import { downloadExcelHeaders } from "../../../../../Utils/export";

const EXCEL_HEADERS = [
  "page_id",
  "category_id",
  "faqs",
];

const FaqList = () => {
  const navigate = useNavigate();
  const [faqCategory, setFaqCategory] = useState([]);

  const pages = [
    { name: "Contact Us", id: "1" },
    { name: "Palm Jumeirah", id: "16" },
    { name: "Palm Jebel Ali", id: "7" },
    { name: "Dubai Island", id: "11" },
    { name: "Developer List", id: "5" },
    { name: "List You Property", id: "6" },
    { name: "FAQ Page", id: "2" },
    { name: "Property Management", id: "8" },
    { name: "Property Available", id: "9" }
  ];

  const fetchData = async () => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) return alert("No access token found");
      const res = await axiosClient.post("/admin/faqs", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setFaqCategory(res.data.data);
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
      const res = await axiosClient.post(`/admin/faqs/${id}/toggleStatus`);
      if (res.data.success == true) {
        Swal.fire({
          icon: "success",
          //   title: "Success!",
          text: res.data?.message || "Status Changed Successfully!",
        });
        fetchData();
      } else {
        Swal.fire({
          icon: "error",
          //   title: "Success!",
          text: res.data?.message || "Status Change Failed",
        });
      }

    } catch (err) {
      Swal.fire({
        icon: "error",
        //   title: "Success!",
        text: "Status Change Failed",
      });
    }
  };

  return (
    <div className="relative mx-auto p-3" style={{ width: "100%" }}>
      <div
        className={`bg-white flex flex-col gap-10 justify-between shadow-md rounded-lg p-6 mb-6`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold font-palm">Faqs</h2>
          <button
            type="button"
            onClick={() =>
              downloadExcelHeaders({
                headers: EXCEL_HEADERS,
                filename: "faqs_Create_Example_Sheet.xlsx",
              })
            }
            className="bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 flex justify-center items-center gap-3 cursor-pointer md:text-sm text-xs text-white w-fit"
          >
            Download Excel Example Sheet
          </button>
        </div>
        <div>
          <table className="w-full table-fixed border border-gray-400 p-3 text-sm">
            <thead>
              <tr className="bg-[#5DAABA] text-white text-left">
                <th className="border border-gray-300 p-3">S.no</th>
                <th className="border border-gray-300 p-3">Page</th>
                <th className="border border-gray-300 p-3">Faq Category</th>
                <th className="border border-gray-300 p-3">Status</th>
                <th className="border border-gray-300 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {faqCategory?.length > 0 ? (
                faqCategory.map((data, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2 overflow-hidden">
                      {pages.find((page) => page.id === String(data.page_id))?.name || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2 overflow-hidden">
                      {data?.category?.name || "None"}
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
                            navigate("/admin/add-faqs", { state: { data } });
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FaqList;
