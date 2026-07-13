import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../../axiosClient";
import { FaPen } from "react-icons/fa";
import { Image_Url } from "../../../../../../Utils/const";
import PropertyForm from "./PropertyForm";

const Property = () => {
  const [about, setAbout] = useState(null);
  const [editData, setEditData] = useState(null);
  const [status, setStatus] = useState(1);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) return alert("No access token found");
      const res = await axiosClient.post("/admin/property-available", {
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
            <h2 className="text-3xl font-bold font-palm">Property Available Page</h2>
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

                <div>
                  <strong>Schema:</strong>
                  <div className="pl-2">
                    {JSON.stringify(about.schema)}
                  </div>
                </div>

                <div><strong>Status:</strong> <br /> {about.status === 1 ? "Active" : "Inactive"}</div>
              </div>

              {/* Banner Image */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Banner Image</h3>
                {about.Banner_image ? (
                  <img src={`${Image_Url}${about.Banner_image}`} alt={about.Banner_image_alt} className="w-64 h-40 object-cover mb-2" />
                ) : (
                  <div className="text-gray-500">No Banner Image Available</div>
                )}
                <div><strong>Alt:</strong> {about.Banner_image_alt}</div>
                <div><strong>Text:</strong> {about.Banner_image_text}</div>
              </div>
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Section 1</h3>
                <div><strong>Heading:</strong> {about.section_1_heading}</div>
                <div><strong>Description:</strong> {about.section_1_description}</div>
              </div>

              {/* Section 2 */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Section 2</h3>
                <div><strong>Heading:</strong> {about.section_2_heading}</div>
                <div><strong>Description:</strong> {about.section_2_description}</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {about.section_2_cards?.map((item, index) => (
                    <div key={index} className="border rounded p-3 shadow-sm">
                      <img src={`${Image_Url}${item.image}`} alt={item.image_alt} className="w-32 h-32 object-cover mb-2" />
                      <div><strong>Alt:</strong> {item.image_alt}</div>
                      <div><strong>Text:</strong> {item.image_text}</div>
                      <div><strong>Heading:</strong> {item.heading}</div>
                      <div><strong>Description:</strong> {item.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3 */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Section 3</h3>
                <div><strong>Heading:</strong> {about.section_3_heading}</div>
                <div><strong>Description:</strong> {about.section_3_description}</div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {about.section_3_images?.map((item, index) => (
                    <div key={index} className="border rounded p-3 shadow-sm">
                      <img src={`${Image_Url}${item.image}`} alt={item.image_alt} className="w-32 h-32 object-cover mb-2" />
                      <div><strong>Alt:</strong> {item.image_alt}</div>
                      <div><strong>Text:</strong> {item.image_text}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4 */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Section 4</h3>
                <div><strong>Heading:</strong> {about.section_4_heading}</div>
                <div><strong>Description:</strong> {about.section_4_description}</div>
              </div>
              {about.section_4_items?.map((item, index) => (
                <div key={index} className="mt-4 p-4 rounded shadow-sm bg-gray-50">
                  <div className="font-semibold text-lg text-[#5DAABA]">{item.name}</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    {item.items?.map((inner, idx) => (
                      <div key={idx} className="border p-3 rounded bg-white">
                        <div><strong>Heading:</strong> {inner.h}</div>
                        <div><strong>Text 1:</strong> {inner.t1}</div>
                        <div><strong>Text 2:</strong> {inner.t2}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Section 5 */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Section 5</h3>
                <div><strong>Heading:</strong> {about.section_5_heading}</div>
                <div><strong>Description:</strong> {about.section_5_description}</div>

                <div className="mt-4">
                  {about.section_5_image ? (
                    <img src={`${Image_Url}${about.section_5_image}`} alt={about.section_5_image_alt} className="w-64 h-40 object-cover mb-2" />
                  ) : (
                    <div className="text-gray-500">No Image Available</div>
                  )}
                  <div><strong>Alt:</strong> {about.section_5_image_alt}</div>
                  <div><strong>Text:</strong> {about.section_5_image_text}</div>
                </div>
              </div>

              {/*  footer Section */}

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
        <PropertyForm editData={editData} setEditData={setEditData} setStatus={setStatus} fetchData={fetchData} />
      )}
    </div>
  );
};

export default Property;
