import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosClient from "../../../../../axiosClient";
import { Image_Url } from "../../../../../Utils/const";

const BlueButtonAdmin = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="bg-[#5DAABA] hover:bg-[#4a97a5] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 text-sm"
  >
    {text}
  </button>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2M8 20h8a2 2 0 002-2v-8a2 2 0 00-2-2h-2" />
  </svg>
);

// 🧩 Add this new icon above
const PreviewIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10l4.553 2.276a1 1 0 010 1.448L15 16m-6-6l-4.553 2.276a1 1 0 000 1.448L9 16m6-6v6m-6-6v6"
    />
  </svg>
);


const TimesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const GalleryAdmin = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [formData, setFormData] = useState({ images: [] });
  const [imagePreview, setImagePreview] = useState([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const res = await axiosClient.get("/admin/gallery", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGalleryItems(res.data.data);
    } catch (err) {
      console.error("Failed to load gallery:", err);
    }
  };

  const resetForm = () => {
    setFormData({ images: [] });
    setImagePreview([]);
    setIsOpenModal(false);
    setIsEdit(false);
    setSelectItem(null);
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ images: files });
    setImagePreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("ACCESS_TOKEN");
    const url = isEdit ? `/admin/gallery/${selectItem}/update` : "/admin/gallery/store";
    const formDataToSend = new FormData();

    if (formData.images.length === 0 && !isEdit) {
      Swal.fire("Error", "Please select at least one image to upload.", "error");
      return;
    }

    formData.images.forEach((file, index) => {
      formDataToSend.append(`images[${index}]`, file);
    });
    if (isEdit) formDataToSend.append("_method", "PUT");

    try {
      const response = await axiosClient.post(url, formDataToSend, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      const res = response.data;

      if (res.status == true) {
        Swal.fire("Success", res.message, "success");
        fetchGallery();
        resetForm();
      } else {
        Swal.fire("Error", res.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Something went wrong.", "error");
    }
  };

 const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This image will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const token = localStorage.getItem("ACCESS_TOKEN");
      try {
        const response = await axiosClient.delete(
          `/admin/gallery/${id}/destroy`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const res = response.data;

        if (res.status == true) {
          Swal.fire("Deleted!", res.message, "success");
          // 👇 Re-fetch the gallery after successful delete
          fetchGallery();
        } else {
          Swal.fire("Error", res.message, "error");
        }
      } catch (err) {
        Swal.fire("Error", "Failed to delete image.", "error");
      }
    }
  });
};


  const handleCopyUrl = (filePath) => {
    const fullUrl = `${filePath}`;
    navigator.clipboard.writeText(fullUrl);
    Swal.fire("Copied!", "Image URL copied to clipboard.", "success");
  };

  const handlePreview = (filePath) => {
  const fullUrl = `${Image_Url}${filePath}`;
  window.open(fullUrl, "_blank");
};


  return (
    <div className="relative mx-auto p-3 font-sans w-full">
      <div className={`bg-white flex flex-col gap-10 justify-between shadow-xl rounded-xl p-6 mb-6`}>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Gallery Items</h2>
          <div onClick={() => { resetForm(); setIsOpenModal(true); }}>
            <BlueButtonAdmin text="Add New Images" />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-inner">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead>
              <tr className="bg-[#5DAABA] text-white text-left">
                <th className="px-4 py-3 border-r border-gray-300">Sno</th>
                <th className="px-4 py-3 border-r border-gray-300">Image</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {galleryItems.length > 0 ? (
                galleryItems.map((data, index) => (
                  <tr key={data.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-3 border-r border-gray-200">{index + 1}</td>
                    <td className="px-4 py-3 border-r border-gray-200">
                      <img
                        src={`${Image_Url}${data.file_path}`}
                        alt="Gallery"
                        className="w-16 h-16 object-cover rounded-md shadow-inner"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">

                         <button
    onClick={() => handlePreview(data.file_path)}
    className="p-2 text-sm rounded-full bg-green-500 hover:bg-green-600 text-white shadow-md"
    title="Preview Image"
  >
    <PreviewIcon />
  </button>

                        <button
                          onClick={() => handleCopyUrl(data.file_path)}
                          className="p-2 text-sm rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-md"
                          title="Copy URL"
                        >
                          <CopyIcon />
                        </button>

                        <button
                          onClick={() => handleDelete(data.id)}
                          className="p-2 text-sm rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md"
                          title="Delete"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-5 text-center text-gray-500 bg-gray-100" colSpan="3">
                    No Gallery Items Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isOpenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-xl relative">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEdit ? "Edit Image" : "Upload New Images"}
              </h2>
              <div className="p-1 text-gray-500 cursor-pointer hover:text-red-500" onClick={resetForm}>
                <TimesIcon />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-5">
              <div className="flex flex-col gap-2 border p-4 rounded-lg bg-gray-50">
                <label htmlFor="images" className="text-sm font-medium text-gray-700">
                  {isEdit ? "Replace Existing Image" : "Upload Image(s)"}
                </label>
                <input
                  id="images"
                  required={!isEdit && formData.images.length === 0}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#5DAABA] file:text-white hover:file:bg-[#4a97a5] transition-colors"
                  type="file"
                  accept="image/*"
                  name="images"
                  multiple
                  onChange={handleChange}
                />

                {imagePreview.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-3">
                    {imagePreview.map((url, i) => (
                      <img key={i} src={url} className="w-20 h-20 object-cover rounded-lg border-2 border-[#5DAABA]" />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#5DAABA] hover:bg-[#4a97a5] text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
                >
                  {isEdit ? "Update Image" : "Upload Images"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryAdmin;
