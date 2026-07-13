import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../../../../../../axiosClient";
import Swal from "sweetalert2";
import JoditEditor from "jodit-react";

const GuidePage = () => {
  const [sections, setSections] = useState([]);
    const editor = useRef(null);
    const [editMode, setEditMode] = useState(false);
const [editId, setEditId] = useState(null);
  const [contentSections, setContentSections] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    content_section_id: "",
    type: "text",
    content: "",
    order_index: "",
  });

  const token = localStorage.getItem("ACCESS_TOKEN");

  const fetchData = async () => {
    try {
      if (!token) return alert("No access token found");
      const res = await axiosClient.post("/admin/section-content-block", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSections(res.data.content_blocks || []);
    } catch (err) {
      console.error("Failed to load section content blocks.", err);
    }
  };

  const fetchContentSections = async () => {
    try {
      if (!token) return;
      const res = await axiosClient.post("admin/content-page-section", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContentSections(res.data.content_sections || []);
    } catch (err) {
      console.error("Failed to load content sections.", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchContentSections();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!token) return alert("No access token found");

  //   try {
  //     const res = await axiosClient.post(
  //       "/admin/section-content-block",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     Swal.fire({
  //       icon: "success",
  //       text: res.data?.message || "Block added successfully!",
  //     });

  //     setFormData({
  //       content_section_id: "",
  //       type: "text",
  //       content: "",
  //       order_index: "",
  //     });

  //     setShowForm(false);
  //     fetchData();
  //   } catch (err) {
  //     Swal.fire({
  //       icon: "error",
  //       text: "Failed to add block.",
  //     });
  //     console.error(err);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!token) return alert("No access token found");

  try {
    const url = editMode
      ? `/admin/section-content-block/${editId}/update`
      : "/admin/section-content-block";

    const method = editMode ? "post" : "post";

    const res = await axiosClient[method](url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    Swal.fire({
      icon: "success",
      text: res.data?.message || `Block ${editMode ? "updated" : "added"} successfully!`,
    });

    setFormData({
      content_section_id: "",
      type: "text",
      content: "",
      order_index: "",
    });
    setShowForm(false);
    setEditMode(false);
    setEditId(null);
    fetchData();
  } catch (err) {
    Swal.fire({
      icon: "error",
      text: `Failed to ${editMode ? "update" : "add"} block.`,
    });
    console.error(err);
  }
};

const handleEditClick = (block) => {
  setFormData({
    content_section_id: block.content_section_id,
    type: block.type,
    content: block.content,
    order_index: block.order_index,
  });
  setEditId(block.id);
  setEditMode(true);
  setShowForm(true);
};


  return (
    <div className="relative mx-auto p-3">
      {/* <div className="mb-6"> */}
<div className="flex items-end gap-2">
{!editMode ? (
  !showForm ? (
    <button
      onClick={() => setShowForm(true)}
      className="px-6 py-2 bg-blue-500 text-white rounded"
    >
      Add Guide
    </button>
  ) : (
    <button
      onClick={() => setShowForm(false)}
      className="px-6 py-2 bg-gray-500 text-white rounded"
    >
      Cancel
    </button>
  )
) : null}

  {editMode && (
    <button
      type="button"
      onClick={() => {
        setEditMode(false);
        setEditId(null);
        setFormData({
          content_section_id: "",
          type: "text",
          content: "",
          order_index: "",
        });
        setShowForm(false);
      }}
      className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Cancel
    </button>
  )}
</div>



      {showForm ? (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Add New Content Block</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block font-medium mb-1">Content Section</label>
              <select
                name="content_section_id"
                value={formData.content_section_id}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select Section</option>
                {contentSections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="heading">Heading</option>
              </select>
            </div>

            <div className="md:col-span-2">
  <label className="block font-medium mb-1">Content</label>
  <JoditEditor
    ref={editor}
    value={formData.content}
    onChange={(newContent) =>
      setFormData((prev) => ({
        ...prev,
        content: newContent,
      }))
    }
    tabIndex={1}
    className="w-full"
  />
</div>


          {!editMode &&  <div>
              <label className="block font-medium mb-1">Order Index</label>
              <input
                type="number"
                name="order_index"
                value={formData.order_index}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>}

            <div className="flex items-end">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Block
              </button>
            </div>
          </form>
        </div>
      ) : (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Guide Page Sections</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-[#5DAABA] text-white">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Section Title</th>
                <th className="p-2 border">Blocks</th>
                {/* <th className="p-2 border">Edit</th> */}
              </tr>
            </thead>
            <tbody>
              {sections.length > 0 ? (
                sections.map((section, index) => (
                  <tr key={section.id} className="border border-gray-300">
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border">
                      {section.category?.title || "-"}
                    </td>
                    <td className="p-2 border">{section.title}</td>
<td className="p-2 border">
  {section.blocks.map((block, idx) => (
    <div key={idx} className="mb-2">
      {/* <strong>{block.type}:</strong>{" "} */}
      {/* {block.type === "image" ? (
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/${block.content}`}
          alt="block"
          className="w-16 h-16 object-cover mt-1"
        />
      ) : ( */}
        <span className="block max-w-xs truncate">
          {block.content}
        </span>
      {/* )} */}
      {/* Edit Button */}
      <button
        className="mt-1 text-blue-600 underline cursor-pointer text-sm"
        onClick={() => handleEditClick(block)}
      >
        Edit
      </button>
    </div>
  ))}
</td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4 bg-gray-100">
                    No content blocks available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </div>
  );
};

export default GuidePage;
