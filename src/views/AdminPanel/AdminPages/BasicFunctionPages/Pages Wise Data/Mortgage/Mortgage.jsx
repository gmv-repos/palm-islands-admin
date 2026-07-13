import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../../axiosClient";
import { FaPen } from "react-icons/fa";
import { Image_Url } from "../../../../../../Utils/const";
import MortgageForm from "./MortgageForm";

const Mortgage = () => {
  const [about, setAbout] = useState(null);
  const [editData, setEditData] = useState(null);
  const [status, setStatus] = useState(1);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) return alert("No access token found");
      const res = await axiosClient.post("/admin/mortgage", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setAbout(res.data.data);
    } catch (err) {
      console.log("Failed to load data.");
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
            <h2 className="text-3xl font-bold font-palm">Mortgage Page</h2>
          </div>

          {about !== null ? (
            <div key={1} className="border border-gray-300 rounded-lg p-5 mb-5">
              {/* Actions */}
              <div className="flex justify-end gap-4 mb-5">
                <button
                  onClick={() => {
                    setStatus(2);
                    setEditData(about);
                  }}
                  className="p-2 text-sm rounded flex gap-2 items-center justify-between bg-[#5DAABA] text-white"
                >
                  <FaPen />
                  <div>Edit</div>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><strong>Slug:</strong> <br /> {about?.slug}</div>
                <div><strong>Meta Title:</strong> <br /> {about?.meta_title}</div>
                <div><strong>Meta Description:</strong> <br /> {about?.meta_description}</div>
                <div><strong>Canonical URL:</strong> <br /> {about?.canonical_url}</div>
                <div><strong>Focus Keyword:</strong> <br /> {about?.focus_keyword}</div>
                <div><strong>Redirect 301:</strong> <br /> {about?.redirect_301}</div>
                <div><strong>Redirect 302:</strong> <br /> {about?.redirect_302}</div>
                <div><strong>Old Redirect URL:</strong> <br /> {about?.old_redirect_url}</div>
                <div><strong>Schema:</strong> <br /> {JSON.stringify(about?.schema)}</div>
              </div>

              {/* Banner Image */}
              <div className="mt-4">
                <h4 className="font-semibold">Banner Image:</h4>
                <img
                  src={`${Image_Url}${about?.Banner_image}`}
                  alt={about?.Banner_image_alt}
                  className="w-32 h-32 object-cover mt-2"
                />
                <div><strong>Alt:</strong> {about?.Banner_image_alt}</div>
                <div><strong>Text:</strong> {about?.Banner_image_text}</div>
                <div><strong>Heading:</strong> {about?.Banner_heading}</div>
                <div><strong>Button Text:</strong> {about?.Banner_button_text}</div>
              </div>

              {/* Section 1 */}
              <div className="mt-4">
                <h4 className="font-semibold">Section 1:</h4>
                <div><strong>Heading:</strong> {about?.section_1_heading}</div>
                <div><strong>Description:</strong> {about?.section_1_description}</div>
                <div className="mt-2">
                  <img
                    src={`${Image_Url}${about?.section_1_image}`}
                    alt={about?.section_1_image_alt}
                    className="w-32 h-32 object-cover"
                  />
                  <div><strong>Alt:</strong> {about?.section_1_image_alt}</div>
                  <div><strong>Text:</strong> {about?.section_1_image_text}</div>
                </div>

                {/* Section 1 Points */}
                <div className="mt-2">
                  <h5 className="font-semibold">Section 1 Points:</h5>
                  {about?.section_1_points?.map((point, index) => (
                    <div key={index} className="mb-2 border p-2 rounded">
                      <div><strong>Heading:</strong> {point.heading}</div>
                      <div><strong>Description:</strong> {point.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2 */}
              <div className="mt-4">
                <h4 className="font-semibold">Section 2:</h4>
                <div><strong>Heading:</strong> {about?.section_2_heading}</div>

                {/* Section 2 Cards */}
                <div className="mt-2">
                  <h5 className="font-semibold">Section 2 Cards:</h5>
                  {about?.section_2_cards?.map((card, index) => (
                    <div key={index} className="mb-2 border p-2 rounded">
                      <div><strong>Heading:</strong> {card.heading}</div>
                      <div><strong>Description:</strong> {card.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3 */}
              <div className="mt-4">
                <h4 className="font-semibold">Section 3:</h4>
                <div><strong>Heading:</strong> {about?.section_3_heading}</div>
                <div className="mt-2">
                  <img
                    src={`${Image_Url}${about?.section_3_image}`}
                    alt={about?.section_3_image_alt}
                    className="w-32 h-32 object-cover"
                  />
                  <div><strong>Alt:</strong> {about?.section_3_image_alt}</div>
                  <div><strong>Text:</strong> {about?.section_3_image_text}</div>
                </div>

                {/* Section 3 Points */}
                <div className="mt-2">
                  <h5 className="font-semibold">Section 3 Points:</h5>
                  {about?.section_3_points?.map((point, index) => (
                    <div key={index} className="mb-2 border p-2 rounded">
                      <div><strong>Heading:</strong> {point.heading}</div>
                      <div><strong>Description:</strong> {point.description}</div>
                      <div className="mt-2">
                        <img
                          src={`${Image_Url}${point.image}`}
                          alt={point.image_alt}
                          className="w-32 h-32 object-cover"
                        />
                        <div><strong>Alt:</strong> {point.image_alt}</div>
                        <div><strong>Text:</strong> {point.image_text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4 */}
              <div className="mt-4">
                <h4 className="font-semibold">Section 4:</h4>
                <div><strong>Heading:</strong> {about?.section_4_heading}</div>
                <div><strong>Description:</strong> {about?.section_4_description}</div>
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
              {/* Status */}
              {/* <div className="mt-4">
                <strong>Status:</strong> {about?.status === 1 ? "Active" : "Inactive"}
              </div> */}
            </div>
          ) : (
            <div className="text-center text-gray-500">Content Is not Available</div>
          )}
        </div>
      ) : (
        <MortgageForm
          editData={editData}
          setEditData={setEditData}
          setStatus={setStatus}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default Mortgage;
