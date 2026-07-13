import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../../axiosClient";
import { FaPen } from "react-icons/fa";
import VideoForm from "./VideoForm";
import { Image_Url } from "../../../../../../Utils/const";

// Helper function to extract YouTube video ID
const getYoutubeVideoId = (url) => {
  const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[1].length === 11) ? match[1] : null;
};

const Videos = () => {
  const [about, setAbout] = useState(null);
  const [editData, setEditData] = useState(null);
  const [status, setStatus] = useState(1);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) return alert("No access token found");
      const res = await axiosClient.post("/admin/video", {
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
            <h2 className="text-3xl font-bold font-palm">Videos List Page</h2>
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

              <div className="flex flex-wrap gap-4">
                <div className="min-w-80"><strong>Slug:</strong> <br /> {about.slug}</div>
                <div className="min-w-80"><strong>Meta Title:</strong> <br /> {about.meta_title}</div>
                <div className="min-w-80"><strong>Meta Description:</strong> <br /> {about.meta_description}</div>
                <div className="min-w-80"><strong>Canonical URL:</strong> <br /> {about.canonical_url}</div>
                <div className="min-w-80"><strong>Focus Keyword:</strong> <br /> {about.focus_keyword}</div>
                <div className="min-w-80"><strong>Redirect 301:</strong> <br /> {about.redirect_301}</div>
                <div className="min-w-80"><strong>Redirect 302:</strong> <br /> {about.redirect_302}</div>
                <div className="min-w-80"><strong>Redirect Old:</strong> <br /> {about.old_redirect_url}</div>

                <div><strong>Schema:</strong> <div className="pl-2">{JSON.stringify(about.schema)}</div></div>

                <div className="min-w-80"><strong>Main Heading:</strong> <br /> {about.main_heading}</div>
                <div className="min-w-80"><strong>Banner Heading:</strong> <br /> {about.Banner_heading}</div>
                <div className="min-w-80"></div>
                {about.Banner_image_alt ? (
                  <img src={`${Image_Url}${about.Banner_image}`} alt={about.Banner_image_alt} className="w-24 h-20 object-cover mb-2" />
                ) : (
                  <div className="text-gray-500">No Image Available</div>
                )}
                <div className=""><strong>Banner Alt:</strong> <br /> {about.Banner_image_alt}</div>
                <div className=""><strong>Banner Text:</strong> <br /> {about.Banner_image_text}</div>
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

              {/* Render videos */}
              <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-5">Videos:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {about.video.map((item, index) => {
                    const videoId = getYoutubeVideoId(item.url);
                    return (
                      <div key={index} className="rounded-lg p2 shadow">
                        {videoId ? (
                          <>
                            <iframe
                              width="100%"
                              height="200"
                              src={`https://www.youtube.com/embed/${videoId}`}
                              title={item.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                            <h4 className="text-lg font-bold p-1">{item.title}</h4>
                          </>
                        ) : (
                          <p>Invalid YouTube URL</p>
                        )}
                      </div>
                    );
                  })}
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
        <VideoForm
          editData={editData}
          setEditData={setEditData}
          setStatus={setStatus}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default Videos;
