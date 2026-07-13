import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../../axiosClient";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Image_Url } from "../../../../../../Utils/const";
import Swal from "sweetalert2";
import DeveloperListForm from "./DeveloperListForm";

const DeveloperList = () => {
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
      const res = await axiosClient.post("/admin/developer-list", {
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

  return (
    <div className="relative mx-auto p-3" style={{ width: "100%" }}>
      {status == 1 ? (
        <div className="bg-white flex flex-col gap-10 justify-between shadow-md rounded-lg p-6 mb-6">
          <div className="w-full flex justify-between">
            <h2 className="text-3xl font-bold font-palm">Developer List Page</h2>
            {about == null && (
              <button
                onClick={() => setStatus(2)}
                className="p-2 text-sm rounded flex gap-2 items-center justify-between bg-[#5DAABA] text-white"
              >
                Add Developer Page
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
                <div><strong>Slug:</strong> <br /> {about.slug}</div>
                <div><strong>Meta Title:</strong> <br /> {about.meta_title}</div>
                <div><strong>Meta Description:</strong> <br /> {about.meta_description}</div>
                <div><strong>Canonical URL:</strong> <br /> {about.canonical_url}</div>
                <div><strong>Focus Keyword:</strong> <br /> {about.focus_keyword}</div>
                <div><strong>Redirect 301:</strong> <br /> {about.redirect_301}</div>
                <div><strong>Redirect 302:</strong> <br /> {about.redirect_302}</div>

                {/* Schema */}
                <div>
                  <strong>Schema:</strong>
                  <div className="pl-2">
                    {JSON.stringify(about.schema)}
                  </div>
                </div>

                {/* Section 1 */}
                <div><strong>Section 1 Title:</strong> <br /> {about.section_1_title}</div>
                <div><strong>Section 1 Description:</strong> <br /> {about.section_1_description}</div>

                {/* Section 2 */}
                <div><strong>Section 2 Title:</strong> <br /> {about.section_2_title}</div>
                <div><strong>Section 2 Description:</strong> <br /> {about.section_2_description}</div>
                <div><strong>Section 2 Email:</strong> <br /> {about.section_2_email}</div>
                <div><strong>Section 2 Phone:</strong> <br /> {about.section_2_phone}</div>
                {/* <div><strong>Section 2 Form Heading:</strong> <br /> {about.section_2_form_heading}</div>
            <div><strong>Section 2 Form Text:</strong> <br /> {about.section_2_form_text}</div> */}

                {/* Section 3 */}
                <div><strong>Section 3 Title:</strong> <br /> {about.section_3_title}</div>
                <div><strong>Section 3 Description:</strong> <br /> {about.section_3_description}</div>

                {/* Section 4 */}
                <div><strong>Section 4 Title:</strong> <br /> {about.section_4_title}</div>
                <div><strong>Section 4 Description:</strong> <br /> {about.section_4_description}</div>

                <div><strong>Section 5 Title:</strong> <br /> {about.section_5_title}</div>


                {/* Status */}
                <div><strong>Status:</strong> <br /> {about.status === 1 ? "Active" : "Inactive"}</div>
              </div>
              <div className="flex flex-wrap gap-5 mt-10">
                {/* Section 2 Image */}
                {/* <div className="mt-4">
            <h4 className="font-semibold">Section 2 Image:</h4>
            {about.section_2_image ? (
              <img
                src={`${Image_Url}${about.section_2_image}`}
                alt={about.section_2_image_alt}
                className="w-32 h-32 object-cover mt-2"
              />
            ) : (
              <div className="text-gray-500">No Image Available</div>
            )}
            <div><strong>Alt:</strong> {about.section_2_image_alt}</div>
            <div><strong>Text:</strong> {about.section_2_image_text}</div>
          </div> */}

                {/* Section 3 Image */}
                <div className="mt-4">
                  <h4 className="font-semibold">Section 3 Image:</h4>
                  {about.section_3_image ? (
                    <img
                      src={`${Image_Url}${about.section_3_image}`}
                      alt={about.section_3_image_alt}
                      className="w-32 h-32 object-cover mt-2"
                    />
                  ) : (
                    <div className="text-gray-500">No Image Available</div>
                  )}
                  <div><strong>Alt:</strong> {about.section_3_image_alt}</div>
                  <div><strong>Text:</strong> {about.section_3_image_text}</div>
                </div>

                {/* Section 4 Image */}
                <div className="mt-4">
                  <h4 className="font-semibold">Section 4 Image:</h4>
                  {about.section_4_image ? (
                    <img
                      src={`${Image_Url}${about.section_4_image}`}
                      alt={about.section_4_image_alt}
                      className="w-32 h-32 object-cover mt-2"
                    />
                  ) : (
                    <div className="text-gray-500">No Image Available</div>
                  )}
                  <div><strong>Alt:</strong> {about.section_4_image_alt}</div>
                  <div><strong>Text:</strong> {about.section_4_image_text}</div>
                </div>

                {/* Banner Image */}
                <div className="mt-4">
                  <h4 className="font-semibold">Banner Image:</h4>
                  {about.Banner_image ? (
                    <img
                      src={`${Image_Url}${about.Banner_image}`}
                      alt={about.Banner_image_alt}
                      className="w-32 h-32 object-cover mt-2"
                    />
                  ) : (
                    <div className="text-gray-500">No Banner Image Available</div>
                  )}
                  <div><strong>Alt:</strong> {about.Banner_image_alt}</div>
                  <div><strong>Text:</strong> {about.Banner_image_text}</div>
                </div>
              </div>

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
            <div className="text-center text-gray-500">Content Is not Available</div>
          )}
        </div>
      ) : (
        <DeveloperListForm
          editData={editData}
          setEditData={setEditData}
          setStatus={setStatus}
          fetchData={fetchData}
        />
      )}
    </div>

  );
};

export default DeveloperList;
