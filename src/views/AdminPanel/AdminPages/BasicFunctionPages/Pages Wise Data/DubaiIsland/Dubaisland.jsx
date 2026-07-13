// Imports remain the same
import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../../axiosClient";
import { FaPen } from "react-icons/fa";
import { Image_Url } from "../../../../../../Utils/const";
import DubaiIslandForm from "./DubaiIslandForm";

const DubaiIsland = () => {
  const [about, setAbout] = useState(null);
  const [editData, setEditData] = useState(null);
  const [status, setStatus] = useState(1);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) return alert("No access token found");
      const res = await axiosClient.post("/admin/pages/dubaiPage", {
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
    return about?.pageSection?.find((section) => section.name === name)
      ?.content;
  };

  return (
    <div className="relative mx-auto p-3 w-full">
      {status === 1 ? (
        <div className="bg-white flex flex-col gap-10 shadow-md rounded-lg p-6 mb-6">
          <div className="w-full flex justify-between">
            <h2 className="text-3xl font-bold font-palm">Dubai Island Page</h2>
          </div>

          {about ? (
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
                  <span>Edit</span>
                </button>
              </div>

              {/* Page Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(about.Page)
                  .filter(
                    ([key]) =>
                      ![
                        "id",
                        "type",
                        "status",
                        "created_at",
                        "updated_at",
                      ].includes(key)
                  )
                  .map(([key, value]) => (
                    <div key={key}>
                      <strong>{key.replace(/_/g, " ")}:</strong>
                      <br />
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : value}
                    </div>
                  ))}
              </div>

              {/* Section Renderer */}
              {[
                "sectionOne",
                "sectionTwo",
                "sectionThree",
                "sectionFour",
                "sectionFive",
                "sectionSix",
                "sectionSeven",
                "sectionEight",
                "sectionNine",
                "sectionTen",
                "sectionEleven",
                "sectionTwelve",
                "footerSection",

              ].map((sectionName) => {
                const content = getSection(sectionName);
                if (!content) return null;

                return (
                  <div className="mt-10 border-t pt-6" key={sectionName}>
                    <h3 className="text-xl font-semibold mb-2 capitalize">
                      {sectionName.replace(/([A-Z])/g, " $1")}
                    </h3>

                    {/* Text Content */}
                    {Object.entries(content)
                      .filter(([key]) => typeof content[key] === "string")
                      .map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {value}
                        </div>
                      ))}

                    {/* Image Object */}
                    {Object.entries(content)
                      .filter(
                        ([key, val]) =>
                          typeof val === "object" &&
                          val?.file_path !== undefined
                      )
                      .map(([key, val]) => (
                        <div key={key} className="mt-2">
                          <img
                            src={
                              val.file_path
                                ? `${Image_Url}${val.file_path}`
                                : ""
                            }
                            alt={val.alt}
                            className="w-64 h-40 object-cover"
                          />
                          <div>
                            <strong>Alt:</strong> {val.alt}
                          </div>
                          <div>
                            <strong>Name:</strong> {val.name}
                          </div>
                        </div>
                      ))}

                    {/* Array of Cards or Images */}
                    {Object.entries(content)
                      .filter(([key, val]) => Array.isArray(val))
                      .map(([key, val]) => (
                        <div
                          key={key}
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
                        >
                          {val.map((item, idx) => (
                            <div
                              key={idx}
                              className="border rounded p-4 shadow"
                            >
                              {item?.file_path && (
                                <img
                                  src={`${Image_Url}${item.file_path}`}
                                  alt={item.alt}
                                  className="w-64 h-40 object-cover mb-2"
                                />
                              )}
                              {Object.entries(item).map(([subKey, subVal]) => (
                                <div key={subKey}>
                                  <strong>{subKey}:</strong>{" "}
                                  {typeof subVal === "object"
                                    ? JSON.stringify(subVal)
                                    : subVal}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          ) : (
              <>
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
              <div className="text-center text-gray-500">Content Is not Available</div>
              </>
          )}
        </div>
      ) : (
        <DubaiIslandForm
          editData={editData}
          setEditData={setEditData}
          setStatus={setStatus}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default DubaiIsland;
