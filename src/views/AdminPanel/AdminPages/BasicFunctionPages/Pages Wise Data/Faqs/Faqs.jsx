import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../../axiosClient";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Image_Url } from "../../../../../../Utils/const";
import Swal from "sweetalert2";
import FaqsForm from "./FaqsForm";

const Faqs = () => {
  const navigate = useNavigate();
  const [about, setAbout] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectCat, setSelectCat] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [status, setStatus] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) return alert("No access token found");
      const res = await axiosClient.post("/admin/about-us", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setAbout(res.data.data);
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
        `/admin/developers/${id}/toggleStatus`
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
      {status == 1 ? (
        <div className="bg-white flex flex-col gap-10 justify-between shadow-md rounded-lg p-6 mb-6">
          <div className="w-full flex justify-between">
            <h2 className="text-3xl font-bold font-palm">About Us Page</h2>
            {about == null && (
              <button
                onClick={() => setStatus(2)}
                className="p-2 text-sm rounded flex gap-2 items-center justify-between bg-[#5DAABA] text-white"
              >
                Add About Page
              </button>
            )}
          </div>

          {about !== null ? (
            <div key={1} className="border border-gray-300 rounded-lg p-5 mb-5">
              {/* Actions */}
              <div className="flex justify-end gap-4 mb-5">
                <button
                  onClick={() => {
                    setStatus(2), setEditData(about);
                  }}
                  className="p-2 text-sm rounded flex gap-2 items-center justify-between bg-[#5DAABA] text-white"
                >
                  <FaPen />
                  <div>Edit</div>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <strong>Slug:</strong> <br /> {about?.slug}
                </div>
                <div>
                  <strong>Meta Title:</strong> <br /> {about?.meta_title}
                </div>
                <div>
                  <strong>Meta Description:</strong> <br />{" "}
                  {about?.meta_description}
                </div>
                <div>
                  <strong>Canonical URL:</strong> <br /> {about?.canonical_url}
                </div>
                <div>
                  <strong>Focus Keyword:</strong> <br /> {about?.focus_keyword}
                </div>
                <div>
                  <strong>Redirect 301:</strong> <br /> {about?.redirect_301}
                </div>
                <div>
                  <strong>Redirect 302:</strong> <br /> {about?.redirect_302}
                </div>
                <div>
                  <strong>Old Redirect URL:</strong> <br />
                  {about?.old_redirect_url}
                </div>
                <div>
                  <strong>Schema:</strong> <br /> {JSON.stringify(about?.schema)}
                </div>
                <div>
                  <strong>Section 1 Title:</strong> <br />
                  {about?.section_1_title}
                </div>
                <div>
                  <strong>Section 1 Description:</strong> <br />
                  {about?.section_1_description}
                </div>
                <div>
                  <strong>Section 2 Title:</strong> <br />
                  {about?.section_2_title}
                </div>
                <div>
                  <strong>Section 2 Description:</strong> <br />
                  {about?.section_2_description}
                </div>
                <div>
                  <strong>Section 3 Title:</strong> <br />
                  {about?.section_3_title}
                </div>
                <div>
                  <strong>Section 3 Description:</strong> <br />
                  {about?.section_3_description}
                </div>
                <div>
                  <strong>Status:</strong> <br />
                  {about?.status === 1 ? "Active" : "Inactive"}
                </div>
              </div>
              <div className="flex gap-4">
                {/* Section 1 Image */}
                <div className="mt-4">
                  <h4 className="font-semibold">Section 1 Image:</h4>
                  {about?.section_1_image && (
                    <img
                      src={`${Image_Url}${about?.section_1_image}`}
                      alt={about?.section_1_image_alt}
                      className="w-32 h-32 objectcover mt-2"
                    />
                  )}
                  <div>
                    <strong>Alt:</strong> {about?.section_1_image_alt}
                  </div>
                  <div>
                    <strong>Text:</strong> {about?.section_1_image_text}
                  </div>
                </div>

                {/* Section 2 Image */}
                <div className="mt-4">
                  <h4 className="font-semibold">Section 2 Image:</h4>
                  {about?.section_2_image && (
                    <img
                      src={`${Image_Url}${about?.section_2_image}`}
                      alt={about?.section_2_image_alt}
                      className="w-32 h-32 objectcover mt-2"
                    />
                  )}
                  <div>
                    <strong>Alt:</strong> {about?.section_2_image_alt}
                  </div>
                  <div>
                    <strong>Text:</strong> {about?.section_2_image_text}
                  </div>
                </div>
              </div>

              {/* Banner Images */}
              <div className="mt-4">
                <h4 className="font-semibold">Banner Images:</h4>
                <div className="flex gap-4 flex-wrap">
                  {about?.Banner_image?.map((img, i) => (
                    <div key={i} className="border border-gray-200  p-2">
                      <img
                        src={`${Image_Url}${img.image}`}
                        alt={img.image_alt}
                        className="w-32 h-32 objectcover"
                      />
                      <div>
                        <strong>Alt:</strong> {img.image_alt}
                      </div>
                      <div>
                        <strong>Text:</strong> {img.image_text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3 Images */}
              <div className="mt-4">
                <h4 className="font-semibold">Section 3 Images:</h4>
                <div className="flex gap-4 flex-wrap">
                  {about?.section_3_images?.map((img, i) => (
                    <div key={i} className="border border-gray-200 p-2 ">
                      <img
                        src={`${Image_Url}${img.image}`}
                        alt={img.image_alt}
                        className="w-32 h-32 objectcover"
                      />
                      <div>
                        <strong>Alt:</strong> {img.image_alt}
                      </div>
                      <div>
                        <strong>Text:</strong> {img.image_text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Section */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <strong>Footer section Image:</strong> <br />
                  <img
                    src={`${Image_Url}${about?.footer_section_image}`}
                    // alt={img.image_alt}
                    className="w-32 h-32 objectcover"
                  />
                </div>
                <div>
                  <strong>Footer section Image Alt:</strong> <br /> {about?.footer_section_image_alt}
                </div>
                <div>
                  <strong>Footer section Image Text:</strong> <br /> {about?.footer_section_image_text}
                </div>
                <div>
                  <strong>Footer section Title:</strong> <br /> {about?.footer_section_title}
                </div>
                <div>
                  <strong>Footer section descripiton:</strong> <br /> {about?.footer_section_description}
                </div>
                <div>
                  <strong>Footer section btn 1 text:</strong> <br /> {about?.footer_section_btn_1_text}
                </div>
                <div>
                  <strong>Footer section btn 1 link:</strong> <br /> {about?.footer_section_btn_1_link}
                </div>
                <div>
                  <strong>Footer section btn 2 text:</strong> <br /> {about?.footer_section_btn_2_text}
                </div>
                <div>
                  <strong>Footer section btn 2 link:</strong> <br /> {about?.footer_section_btn_2_link}
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center text-gray-500">
              Content Is not Available
            </div>
          )}
        </div>
      ) : (
        <FaqsForm
          editData={editData}
          setEditData={setEditData}
          setStatus={setStatus}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default Faqs;
