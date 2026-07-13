import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../axiosClient";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Image_Url } from "../../../../../Utils/const";
import Swal from "sweetalert2";
import FaqCategoryModal from "./FaqCategoryModal";

const FaqsCategory = () => {
  const navigate = useNavigate();
  const [faqCategory, setFaqCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
  });

  const fetchData = async () => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) return alert("No access token found");
      const res = await axiosClient.post("/admin/faqs-category", {
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
      const res = await axiosClient.post(
        `/admin/faqs-category/${id}/toggleStatus`
      );
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
        className={`bg-white flex flex-col gap-10 justify-between shadow-md rounded-lg p-6 mb-6 ${
          isOpenModal ? "blur-sm" : "blur-none"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold font-palm">Faq Categories</h2>
          <button
            onClick={() => {
              setIsOpenModal(true);
              setIsEdit(false);
              setSelectedCategory(null);
            }}
            className="p-2 text-sm rounded flex gap-2 items-center justify-between bg-[#5DAABA] text-white"
          >
            Add Faq Category
          </button>
        </div>
        <div>
          <table className="w-full table-fixed border border-gray-400 p-3 text-sm">
            <thead>
              <tr className="bg-[#5DAABA] text-white text-left">
                <th className="border border-gray-300 p-3">Sno</th>
                <th className="border border-gray-300 p-3">Category Name</th>
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
                      {data.name}
                    </td>
                    <td className="border border-gray-300 p-2">
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
                            setSelectedCategory(data);
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
                    colSpan="4"
                  >
                    Content Is not Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <FaqCategoryModal
      setIsOpenModal={setIsOpenModal}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        isEdit={isEdit}
        selectedCategory={selectedCategory}
        formData={formData}               // 👈 pass this
  setFormData={setFormData}  
        onSubmit={async (formData) => {
          const token = localStorage.getItem("ACCESS_TOKEN");
          try {
            const url = isEdit
              ? `/admin/faqs-category/${selectedCategory.id}/update`
              : "/admin/faqs-category/store";
            const res = await axiosClient.post(url, formData, {
              headers: { Authorization: `Bearer ${token}` },
            });
if(res.data.success == true){
            Swal.fire({
              icon: "success",
              text: res.data.message || "Operation successful!",
            });
            fetchData();
            setFormData({
                name: ""
            })
            setSelectedCategory(null)
            setIsOpenModal(false);
            
     } else {
         Swal.fire({
              icon: "error",
              text: res.data.message || "Something went wrong!",
            });
     }
        } catch (err) {
            Swal.fire({
              icon: "error",
              text: "Something went wrong!",
            });
          }
        }}
      />
    </div>
  );
};

export default FaqsCategory;
