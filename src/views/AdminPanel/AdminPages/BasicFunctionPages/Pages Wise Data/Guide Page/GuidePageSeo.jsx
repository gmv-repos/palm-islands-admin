import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../../axiosClient";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Image_Url } from "../../../../../../Utils/const";
import Swal from "sweetalert2";
import GuidePageSeoForm from "./GuidePageSeoForm";

const GuidePageSeo = () => {
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
      const res = await axiosClient.post("/admin/guid-page/1/show", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setAbout(res.data.guide_page);
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
            <h2 className="text-3xl font-bold font-palm">Guide Page</h2>
            {about == null && (
              <button
                onClick={() => setStatus(2)}
                className="p-2 text-sm rounded flex gap-2 items-center justify-between bg-[#5DAABA] text-white"
              >
                Add Guide Page
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
    <div><strong>Slug:</strong> <br /> {about?.slug}</div>
    <div><strong>Meta Title:</strong> <br /> {about?.meta_title}</div>
    <div><strong>Meta Description:</strong> <br /> {about?.meta_description}</div>
    <div><strong>Canonical URL:</strong> <br /> {about?.canonical_url}</div>
    <div><strong>Focus Keyword:</strong> <br /> {about?.focus_keyword}</div>
    <div><strong>Redirect 301:</strong> <br /> {about?.redirect_301}</div>
    <div><strong>Redirect 302:</strong> <br /> {about?.redirect_302}</div>
    <div><strong>Old Redirect URL:</strong> <br /> {about?.old_redirect_url}</div>
    <div><strong>Schema:</strong> <br /> {JSON.stringify(about?.schema)}</div>
    <div><strong>Status:</strong> <br /> {about?.status === 1 ? "Active" : "Inactive"}</div>
  </div>

  {/* Banner Image */}
  {about?.banner_image_url && (
    <div className="mt-4">
      <h4 className="font-semibold">Banner Image:</h4>
      <img
        src={`${Image_Url}${about?.banner_image_url}`}
        alt="Banner"
        className="w-32 h-32 object-cover mt-2"
      />
    </div>
  )}

  {/* Categories with Sections and Blocks */}
  {/* <div className="mt-6 space-y-6">
    {about?.categories?.map((category, catIndex) => (
      <div key={category.id} className="border p-4 rounded-md shadow">
        <h3 className="font-bold text-lg mb-2">{catIndex + 1}. {category.title}</h3>
        {category.sections?.map((section, secIndex) => (
          <div key={section.id} className="ml-4 mb-4 border-l-2 border-gray-300 pl-4">
            <h4 className="font-semibold text-base mb-1">
              Section {secIndex + 1}: {section.title}
            </h4>
            <p className="text-sm text-gray-500 mb-2">Layout: {section.layout_type}</p>
            {section.blocks?.map((block, blkIndex) => (
              <div key={block.id} className="ml-4 mb-3 border-l border-gray-200 pl-4">
                <p className="text-sm font-semibold mb-1">
                  Block {blkIndex + 1} - {block.type.toUpperCase()}
                </p>
                {block.type === "image" ? (
                  <img
                    src={`${Image_Url}${block.content}`}
                    alt={`Block Image ${block.id}`}
                    className="w-32 h-32 object-cover"
                  />
                ) : (
                  <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    ))}
  </div> */}
</div>

          ) : (
            <div className="text-center text-gray-500">
              Content Is not Available
            </div>
          )}
        </div>
      ) : (
        <GuidePageSeoForm
          editData={editData}
          setEditData={setEditData}
          setStatus={setStatus}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default GuidePageSeo;
