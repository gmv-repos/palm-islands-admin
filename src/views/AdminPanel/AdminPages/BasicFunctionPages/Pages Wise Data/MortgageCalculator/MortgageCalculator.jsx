import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../../axiosClient";
import { FaPen } from "react-icons/fa";
import { Image_Url } from "../../../../../../Utils/const";
import MortgageCalculatorForm from "./MortgageCalculatorForm";

const MortgageCalculator = () => {
  const [about, setAbout] = useState(null);
  const [editData, setEditData] = useState(null);
  const [status, setStatus] = useState(1);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) return alert("No access token found");
      const res = await axiosClient.post("/admin/mortgage-calculator", {
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
            <h2 className="text-3xl font-bold font-palm">Mortgage Calculator Page</h2>
          </div>



          {about !== null ? (
            <div className="border border-gray-300 rounded-lg p-5 mb-5">
              <div className="flex justify-end gap-4 mb-5">
                <button
                  onClick={() => {
                    setStatus(2);
                    setEditData(about);
                  }}
                  className="p-2 text-sm rounded flex gap-2 items-center bg-[#5DAABA] text-white"
                >
                  <FaPen />
                  <div>Edit</div>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><strong>Slug:</strong> {about.slug}</div>
                <div><strong>Meta Title:</strong> {about.meta_title}</div>
                <div><strong>Meta Description:</strong> {about.meta_description}</div>
                <div><strong>Canonical URL:</strong> {about.canonical_url}</div>
                <div><strong>Focus Keyword:</strong> {about.focus_keyword}</div>
                <div><strong>Redirect 301:</strong> {about.redirect_301}</div>
                <div><strong>Redirect 302:</strong> {about.redirect_302}</div>
                <div><strong>Old Redirect URL:</strong> {about.old_redirect_url}</div>
              </div>

              <div className="mt-4">
                <strong>Schema:</strong>
                <pre className="bg-gray-100 p-2 rounded text-sm mt-1">
                  {JSON.stringify(JSON.parse(about.schema || "{}"), null, 2)}
                </pre>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-2">Banner Section</h3>
                <div><strong>Heading:</strong> {about.Banner_heading}</div>
                {about.Banner_image ? (
                  <img
                    src={`${Image_Url}${about.Banner_image}`}
                    alt={about.Banner_image_alt}
                    className="w-full md:w-64 h-40 object-cover mt-2 rounded"
                  />
                ) : (
                  <div className="text-gray-500">No Banner Image</div>
                )}
                <div className="mt-2"><strong>Alt Text:</strong> {about.Banner_image_alt}</div>
                <div><strong>Text:</strong> {about.Banner_image_text}</div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-2">Section 1</h3>
                <div><strong>Heading:</strong> {about.section_1_heading}</div>
                <div className="mt-2"><strong>Description 1:</strong></div>
                <p className="text-sm text-gray-700 whitespace-pre-line">{about.section_1_description_1}</p>
                <div className="mt-2"><strong>Description 2:</strong></div>
                <p className="text-sm text-gray-700 whitespace-pre-line">{about.section_1_description_2}</p>

                {/* Section 1 Options */}
                {Array.isArray(about.section_1_options) && about.section_1_options.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Options:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {about.section_1_options.map((opt, index) => (
                        <div key={index} className="border p-3 rounded bg-gray-50">
                          <div><strong>Text:</strong> {opt.text?.replace(/"/g, "")}</div>
                          <div><strong>Number:</strong> {opt.number?.replace(/"/g, "")}</div>
                        </div>
                      ))}
                    </div>
                  </div>
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
            <div className="text-center text-gray-500">Content Is not Available</div>
          )}
        </div>
      ) : (
        <MortgageCalculatorForm editData={editData} setEditData={setEditData} setStatus={setStatus} fetchData={fetchData} />
      )}
    </div>
  );
};

export default MortgageCalculator;
