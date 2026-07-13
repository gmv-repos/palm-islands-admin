import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../../axiosClient";
import { FaPen } from "react-icons/fa";
import { Image_Url } from "../../../../../../Utils/const";
import ContactUsForm from "./ContactUsForm";

const ContactUs = () => {
  const [about, setAbout] = useState(null);
  const [editData, setEditData] = useState(null);
  const [status, setStatus] = useState(1);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) return alert("No access token found");
      const res = await axiosClient.post("/admin/contact_us_page", {
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
    <div className="relative mx-auto p-3 w-full">
      {status === 1 ? (
        <div className="bg-white flex flex-col gap-10 shadow-md rounded-lg p-6 mb-6">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-3xl font-bold font-palm">Contact Us Page</h2>
            <button
              onClick={() => {
                setStatus(2);
                setEditData(about);
              }}
              className="p-2 text-sm rounded flex gap-2 items-center bg-[#5DAABA] text-white"
            >
              <FaPen />
              Edit
            </button>
          </div>

          {about ? (
            <div className="border border-gray-300 rounded-lg p-5">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><strong>Slug:</strong> <br /> {about.slug}</div>
                <div><strong>Meta Title:</strong> <br /> {about.meta_title}</div>
                <div><strong>Meta Description:</strong> <br /> {about.meta_description}</div>
                <div><strong>Canonical URL:</strong> <br /> {about.canonical_url}</div>
                <div><strong>Focus Keyword:</strong> <br /> {about.focus_keyword}</div>
                <div><strong>Redirect 301:</strong> <br /> {about.redirect_301}</div>
                <div><strong>Redirect 302:</strong> <br /> {about.redirect_302}</div>
                <div><strong>Old Redirect URL:</strong> <br /> {about.old_redirect_url}</div>
                <div><strong>Schema:</strong> <br /> {about.schema ? JSON.stringify(about.schema) : "N/A"}</div>
              </div>

              {/* Section 1 */}
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Section 1</h3>
                <p><strong>Heading:</strong> {about.section_1_heading}</p>
                <p><strong>Description:</strong> {about.section_1_description}</p>
              </div>

              {/* Section 2 */}
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Section 2</h3>
                <p><strong>Heading:</strong> {about.section_2_heading}</p>
                <p><strong>Description:</strong> {about.section_2_description}</p>
                <p><strong>Phone:</strong> {about.section_2_phone}</p>
                <p><strong>Website:</strong> {about.section_2_website}</p>
                <p><strong>Email:</strong> {about.section_2_email}</p>
              </div>

              {/* Section 3 */}
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Section 3</h3>
                <p><strong>Heading:</strong> {about.section_3_heading}</p>
                <p><strong>Description:</strong> {about.section_3_description}</p>

                {about.section_3_image && (
                  <div className="mt-3">
                    <img
                      src={`${Image_Url}${about.section_3_image}`}
                      alt={about.section_3_image_alt}
                      className="w-32 h-32 object-cover"
                    />
                    <div><strong>Alt:</strong> {about.section_3_image_alt}</div>
                    <div><strong>Text:</strong> {about.section_3_image_text}</div>
                  </div>
                )}
              </div>

              {/* Banner Images */}
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Banner Images</h3>
                <div className="flex flex-wrap gap-4">
                  {about.Banner_image?.map((img, i) => (
                    <div key={i} className="border border-gray-200 p-2">
                      <img src={`${Image_Url}${img.image}`} alt={img.image_alt} className="w-32 h-32 object-cover" />
                      <div><strong>Alt:</strong> {img.image_alt}</div>
                      <div><strong>Text:</strong> {img.image_text}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Social Media Links</h3>
                {about.social_media_links ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><strong>Twitter:</strong> {about.social_media_links.twiter || "N/A"}</div>
                    <div><strong>LinkedIn:</strong> {about.social_media_links.linkdin || "N/A"}</div>
                    <div><strong>Facebook:</strong> {about.social_media_links.facebook || "N/A"}</div>
                    <div><strong>Instagram:</strong> {about.social_media_links.instagram || "N/A"}</div>
                  </div>
                ) : (
                  <p>No Social Media Links</p>
                )}
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
            <div className="text-center text-gray-500">Content is not available</div>
          )}
        </div>
      ) : (
        <ContactUsForm
          editData={editData}
          setEditData={setEditData}
          setStatus={setStatus}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default ContactUs;
