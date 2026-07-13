import { useEffect, useState } from "react";
import { FaTimes, FaSearch, FaPen, FaTrash } from "react-icons/fa";
import BlueButtonAdmin from "../../AdminComponents/Btns/BlueButtonAdmin";
import axiosClient from "../../../../axiosClient";
import Swal from "sweetalert2";
// import CategoryModal from "./Category/CategoryModal";

const AddCategory = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectCat, setSelectCat] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: null,
    image_alt: "",
    image_text: "",
  });

  useEffect(() => {
    fetchCategory();
    // fetchRoles();
  }, []);

  const fetchCategory = async () => {
    // setLoading(true);
    try {
      const res = await axiosClient.get("property-types");
      setCategory(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      setErrorMessage("Failed to load users.");
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      image: null,
      image_alt: "",
      image_text: "",
    });
    setIsOpenModal(false);
    setIsEdit(false);
    setSelectCat(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);

    console.log(formData);
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) return alert("No access token found");

    const url = isEdit
      ? `/admin/property-types/${selectCat}/update`
      : "/admin/property-types/store";
    // const url = "/admin/property-types/store";
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value) {
        formDataToSend.append("image", value);
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await axiosClient.post(url, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const res = response.data;
      console.log(res);
      if (res.success) {
        console.log(res.message);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.message || "Operation completed successfully",
      });
        fetchCategory();
        resetForm();
      } else {
        console.log(res.message);
      }
      resetForm();
    } catch (err) {
       const errorData = err.response?.data;

  if (errorData?.error) {
    // If backend sends field-specific validation errors
    const errorMessages = Object.values(errorData.error)
      .flat()
      .join("\n");

    Swal.fire({
      icon: "error",
      title: errorData.message || "Validation Error",
      text: errorMessages,
    });
  } else {
    // General error fallback
    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        errorData?.message ||
        "An error occurred. Please try again later.",
    });
  }
    }
    // Handle further actions like sending to API
  };

  const toggleStatus = async (id) => {
    console.log(id);
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) return alert("No access token found");

    try {
      await axiosClient.post(`admin/property-types/${id}/toggleStatus`);
      fetchCategory();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative mx-auto p-3" style={{ width: "100%" }}>
      <div
        className={`bg-white flex flex-col gap-10 justify-between shadow-md rounded-lg p-6 mb-6 ${
          isOpenModal ? "blur-sm" : "blur-none"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold font-palm">Property Type</h2>
          <div
            onClick={() => {
              setIsOpenModal(true);
              setIsEdit(false);
              setFormData({
                name: "",
                slug: "",
              });
            }}
          >
            <BlueButtonAdmin text="Add Categories" />
          </div>
        </div>
        <div>
          <table className="w-full table-fixed border border-gray-400 p-3 text-sm">
            <thead>
              <tr className="bg-[#5DAABA] text-white text-left">
                <th className="border border-gray-300 p-3">Sno</th>
                <th className="border border-gray-300 p-3">Name</th>
                <th className="border border-gray-300 p-3">Slug</th>
                <th className="border border-gray-300 p-3">Status</th>
                <th className="border border-gray-300 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {category?.length > 0 ? (
                category.map((data, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">{data.name}</td>
                    <td className="border border-gray-300 p-2">{data.slug}</td>
                    <td className="border border-gray-300 p-2 flex">
                      <button
                        className={`${
                          data.status === true ? "bg-green-500" : "bg-red-500"
                        } p-2 rounded text-white`}
                        onClick={() => toggleStatus(data.id)}
                      >
                        {data.status === true ? "Active" : "in-Active"}
                      </button>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsOpenModal(true);
                            setIsEdit(true);
                            setSelectCat(data.id);
                            setFormData({
                              name: data.name,
                              slug: data.slug,
                              image_text: data.image_text,
                              image_alt: data.image_alt,
                            });
                          }}
                          className="p-2 text-sm rounded flex gap-2 items-center justify-between bg-[#5DAABA] text-white"
                        >
                          <FaPen />
                          <div>Edit</div>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border border-gray-300 p-3 text-center text-sm bg-gray-200"
                    colSpan="5"
                  >
                    Content Is not Available
                  </td>
                </tr>
              )}
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
      {isOpenModal && (
        <div className="w-[70%] r-0 absolute top-15 right-50 bg-white shadow-xl rounded p-5">
          <div className="flex flex-col gap-10 justify-between">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold font-palm">
                Add Property Type
              </h2>
              <div className="text-2xl" onClick={() => setIsOpenModal(false)}>
                <FaTimes />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex justify-between items-center gap-3">
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-sm text-gray-700"
                      htmlFor="CategorieName"
                    >
                      Name
                    </label>
                    <input
                      required
                      className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                      id="CategorieName"
                      type="text"
                      placeholder="Enter Categorie Name"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-sm text-gray-700"
                      htmlFor="CategorieSlug"
                    >
                      Slug
                    </label>
                    <input
                      required
                      className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                      id="CategorieSlug"
                      type="text"
                      placeholder="Enter Categorie Slug"
                      name="slug"
                      onChange={handleChange}
                      value={formData.slug}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm text-gray-700"
                    htmlFor="imageUpload"
                  >
                    Image
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                  />
                </div>
              </div>

              <div className="w-full">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-700">Image Alt</label>
                  <input
                    type="text"
                    name="image_alt"
                    value={formData.image_alt}
                    onChange={handleChange}
                    className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                  />
                </div>
              </div>

              <div className="w-full">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-700">Image Text</label>
                  <input
                    type="text"
                    name="image_text"
                    value={formData.image_text}
                    onChange={handleChange}
                    className="rounded p-3 text-base border outline-none border-gray-300 w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className="bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 flex justify-center items-center gap-3 cursor-pointer md:text-sm text-xs text-white w-fit"
                >
                  {isEdit ? "Update" : "Add Categories"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
