import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../../axiosClient";
import { FaPen } from "react-icons/fa";
import { Image_Url } from "../../../../../../Utils/const";
import HomeForm from "./HomeForm";

const Home = () => {
  const [about, setAbout] = useState(null);
  const [editData, setEditData] = useState(null);
  const [status, setStatus] = useState(1);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) return alert("No access token found");
      const res = await axiosClient.post("/admin/pages/webPage", {
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

  const getSection = (name) => {
    return about?.pageSection?.find((section) => section.name === name)?.content;
  };

  return (
    <div className="relative mx-auto p-3" style={{ width: "100%" }}>
      {status === 1 ? (
        <div className="bg-white flex flex-col gap-10 justify-between shadow-md rounded-lg p-6 mb-6">
          <div className="w-full flex justify-between">
            <h2 className="text-3xl font-bold font-palm">Home Page</h2>
          </div>

          {about !== null ? (
            <div className="border border-gray-300 rounded-lg p-5 mb-5">
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

              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><strong>Slug:</strong> {about.Page.slug}</div>
                <div><strong>Meta Title:</strong> {about.Page.meta_title}</div>
                <div><strong>Meta Description:</strong> {about.Page.meta_description}</div>
              </div> */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><strong>Slug:</strong> <br /> {about?.Page?.slug}</div>
                <div><strong>Meta Title:</strong> <br /> {about?.Page?.meta_title}</div>
                <div><strong>Meta Description:</strong> <br /> {about?.Page?.meta_description}</div>
                <div><strong>Canonical URL:</strong> <br /> {about?.Page?.canonical_url}</div>
                <div><strong>Focus Keyword:</strong> <br /> {about?.Page?.focus_keyword}</div>
                <div><strong>Redirect 301:</strong> <br /> {about?.Page?.redirect_301}</div>
                <div><strong>Redirect 302:</strong> <br /> {about?.Page?.redirect_302}</div>
                <div><strong>Old Redirect URL:</strong> <br /> {about?.Page?.old_redirect_url}</div>
                <div><strong>Schema:</strong> <br /> {about?.Page?.schema ? JSON.stringify(about?.Page?.schema) : "N/A"}</div>
              </div>

              {/* Banner Section */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Banner Section</h3>
                <div><strong>Content:</strong> {getSection("bannerSection")?.content}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {getSection("bannerSection")?.images?.map((img, idx) => (
                    <div key={idx} className="border p-3">
                      <img src={`${Image_Url}${img.file_path}`} alt={img.alt} className="w-64 h-40 object-cover" />
                      <div><strong>Alt:</strong> {img.alt}</div>
                      <div><strong>Name:</strong> {img.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section One */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Section One</h3>
                <div><strong>Heading:</strong> {getSection("sectionOne")?.heading}</div>
                <div><strong>Content:</strong> {getSection("sectionOne")?.content}</div>
                <div className="mt-3">
                  {getSection("sectionOne")?.image && (
                    <img src={`${Image_Url}${getSection("sectionOne").image.file_path}`} className="w-64 h-40 object-cover" alt={getSection("sectionOne").image.alt} />
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {getSection("sectionOne")?.items?.map((item, index) => (
                    <div key={index} className="border p-3">
                      <img src={`${Image_Url}${item.image.file_path}`} alt={item.image.alt} className="w-15 object-cover" />
                      <div><strong>Heading:</strong> {item.heading}</div>
                      {/* <div><strong>Link:</strong> {item.link}</div> */}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Two */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Section Two</h3>
                <div><strong>Heading:</strong> {getSection("sectionTwo")?.heading}</div>
                <div><strong>Content:</strong> {getSection("sectionTwo")?.content}</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {getSection("sectionTwo")?.pages?.map((item, index) => (
                    <div key={index} className="border p-3">
                      <img src={`${Image_Url}${item.image.file_path}`} alt={item.image.alt} className="w-64 h-40 object-cover" />
                      <div><strong>Name:</strong> {item.name}</div>
                      <div><strong>Link:</strong> {item.link}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Three */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Section Three</h3>
                <div><strong>Heading:</strong> {getSection("sectionThree")?.heading}</div>
                <div><strong>Content:</strong> {getSection("sectionThree")?.content}</div>
</div>

              {/* Section Four */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Section Four</h3>
                <div><strong>Heading:</strong> {getSection("sectionFour")?.heading}</div>
                <div><strong>Content:</strong> {getSection("sectionFour")?.content}</div>
</div>

              {/* Section Five */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Section Five</h3>
                <div><strong>Heading:</strong> {getSection("sectionFive")?.heading}</div>
                <div><strong>Content:</strong> {getSection("sectionFive")?.content}</div>
                <div><strong>Button Link:</strong> {getSection("sectionFive")?.btn_link}</div>
                <div className="mt-3">
                  {getSection("sectionFive")?.image && (
                    <img src={`${Image_Url}${getSection("sectionFive").image.file_path}`} className="w-64 h-40 object-cover" alt={getSection("sectionFive").image.alt} />
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {getSection("sectionFive")?.items?.map((item, index) => (
                    <div key={index} className="border p-3">
                      <div><strong>Heading:</strong> {item.h}</div>
                      <div><strong>Text:</strong> {item.t}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Six */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Section Six</h3>
                <div><strong>Heading:</strong> {getSection("sectionSix")?.heading}</div>
                <div><strong>Content:</strong> {getSection("sectionSix")?.content}</div>
                <div className="mt-3">
                  {getSection("sectionSix")?.image && (
                    <img src={`${Image_Url}${getSection("sectionSix").image.file_path}`} className="w-64 h-40 object-cover" alt={getSection("sectionSix").image.alt} />
                  )}
                </div>
                <div><strong>Button 1 Link:</strong> {getSection("sectionSix")?.btn1_link}</div>
                <div><strong>Button 2 Link:</strong> {getSection("sectionSix")?.btn2_link}</div>
              </div>

              {/* Section Seven */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Section Seven</h3>
                <div><strong>Heading:</strong> {getSection("sectionSeven")?.heading}</div>
                <div><strong>Content:</strong> {getSection("sectionSeven")?.content}</div>
                <div className="mt-3">
                  {getSection("sectionSeven")?.image && (
                    <img src={`${Image_Url}${getSection("sectionSeven").image.file_path}`} className="w-64 h-40 object-cover" alt={getSection("sectionSeven").image.alt} />
                  )}
                </div>
                <div><strong>Items Heading:</strong> {getSection("sectionSeven")?.items_heading}</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {getSection("sectionSeven")?.items?.map((item, index) => (
                    <div key={index} className="border p-3">
                      <div><strong>Text:</strong> {item.t}</div>
                    </div>
                  ))}
                </div>
                <div><strong>Button Link:</strong> {getSection("sectionSeven")?.btn_link}</div>
              </div>

              {/* Section Eight */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Section Eight</h3>
                <div><strong>Heading:</strong> {getSection("sectionEight")?.heading}</div>
                <div><strong>Content:</strong> {getSection("sectionEight")?.content}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {getSection("sectionEight")?.btns?.map((btn, index) => (
                    <div key={index} className="border p-3">
                      <div><strong>Name:</strong> {btn.name}</div>
                      <div><strong>T1:</strong> {btn.items.t1}</div>
                      <div><strong>T2:</strong> {btn.items.t2}</div>
                      <div><strong>T3:</strong> {btn.items.t3}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Nine */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Section Nine</h3>
                <div><strong>Heading:</strong> {getSection("sectionNine")?.heading}</div>
                <div><strong>Content:</strong> {getSection("sectionNine")?.content}</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {getSection("sectionNine")?.images?.map((item, index) => (
                    <div key={index} className="border p-3">
                      <img src={`${Image_Url}${item.image.file_path}`} alt={item.image.alt} className="w-64 h-40 object-cover" />
                      <div><strong>Image Alt:</strong> {item.image.alt}</div>
                      <div><strong>Image Name:</strong> {item.image.name}</div>
                      
                      
                      <div><strong>Heading:</strong> {item.h}</div>
                      <div><strong>Text:</strong> {item.t}</div>
                    </div>
                  ))}
                </div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <strong>Footer section Image:</strong> <br />
                  <img
                    src={`${Image_Url}${getSection("footerSection")?.footer_section_image?.file_path}`}
                    // alt={img.image_alt}
                    className="w-32 h-32 objectcover"
                  />
                </div>
                {console.log("Footer Section Data:", getSection("footerSection"))}
                <div>
                  <strong>Footer section Image Alt:</strong> <br /> {getSection("footerSection")?.footer_section_image?.alt}
                </div>
                <div>
                  <strong>Footer section Image Text:</strong> <br /> {getSection("footerSection")?.footer_section_image?.name}
                </div>
                <div>
                  <strong>Footer section Title:</strong> <br /> {getSection("footerSection")?.footer_section_title}
                </div>
                <div>
                  <strong>Footer section descripiton:</strong> <br /> {getSection("footerSection")?.footer_section_description}
                </div>
                <div>
                  <strong>Footer section btn 1 text:</strong> <br /> {getSection("footerSection")?.footer_section_btn_1_text}
                </div>
                <div>
                  <strong>Footer section btn 1 link:</strong> <br /> {getSection("footerSection")?.footer_section_btn_1_link}
                </div>
                <div>
                  <strong>Footer section btn 2 text:</strong> <br /> {getSection("footerSection")?.footer_section_btn_2_text}
                </div>
                <div>
                  <strong>Footer section btn 2 link:</strong> <br /> {getSection("footerSection")?.footer_section_btn_2_link}
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center text-gray-500">Content is not available</div>
          )}
        </div>
      ) : (
        <HomeForm editData={editData} setEditData={setEditData} setStatus={setStatus} fetchData={fetchData} />
      )}
    </div>
  );
};

export default Home;
