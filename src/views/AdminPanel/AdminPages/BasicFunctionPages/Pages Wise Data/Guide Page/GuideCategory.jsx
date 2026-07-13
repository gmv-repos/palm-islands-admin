import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../../axiosClient";
import Swal from "sweetalert2";
import { IoMdClose } from "react-icons/io";

const GuideCategory = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    order_index: "",
    guide_page_id: 1,
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("ACCESS_TOKEN");

  const fetchCategories = async () => {
    try {
      const res = await axiosClient.post("/admin/content-page", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data.guide_page || []);
    } catch (err) {
      console.error("Failed to fetch guide categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.order_index) {
      return Swal.fire("Error", "All fields are required", "error");
    }

    try {
      const url = editMode
        ? `/admin/content-page/${editId}/update`
        : "/admin/content-page/store";

      const res = await axiosClient.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
if (res.data.success == true) {
  Swal.fire("Success", res.data?.message || "Saved successfully!", "success");
  setFormData({ title: "", order_index: "", guide_page_id: 1 });
  setEditMode(false);
  setEditId(null);
  setShowModal(false);
  fetchCategories();
} else {
  Swal.fire("Error", res.data?.message || "Something went wrong", "error");
}
    } catch (err) {
  const errorMsg =
    err?.response?.data?.message || "Something went wrong!";
  Swal.fire("Error", errorMsg, "error");
  console.error(err);
}
  };

  const handleEdit = (category) => {
    setFormData({
  title: category.title || "",
  order_index: category.order_index?.toString() || "", // ensure it's a string
  guide_page_id: category.guide_page_id || 1,
});
    setEditMode(true);
    setEditId(category.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setEditId(null);
    setFormData({ title: "", order_index: "", guide_page_id: 1 });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Guide Categories</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-[#5DAABA] text-white">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Order Index</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr key={cat.id} className="border border-gray-300">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{cat.title}</td>
                  <td className="p-2 border">{cat.order_index}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 bg-gray-100">
                  No guide categories available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            {/* Close Button */}
            <button
              className="absolute top-2 left-2 text-gray-500 hover:text-red-600"
              onClick={closeModal}
            >
              <IoMdClose size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
              {editMode ? "Edit Guide Category" : "Add Guide Category"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Order Index</label>
                <input
                  type="number"
                  name="order_index"
                  value={formData.order_index}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                  {editMode ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideCategory;
