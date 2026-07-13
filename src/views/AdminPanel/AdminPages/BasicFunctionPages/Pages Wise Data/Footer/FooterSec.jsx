import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../../axiosClient";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Image_Url } from "../../../../../../Utils/const";
import Swal from "sweetalert2";
// import AboutUsForm from "./AboutUsForm";
import FooterSecForm from "./FooterSecForm";

const FooterSec = () => {
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
            const res = await axiosClient.get("/admin/footer", {
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
                        <h2 className="text-3xl font-bold font-palm">Footer</h2>
                        {about == null && (
                            <button
                                onClick={() => setStatus(2)}
                                className="p-2 text-sm rounded flex gap-2 items-center justify-between bg-[#5DAABA] text-white"
                            >
                                Add Footer detail
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
                                <div>
                                    <strong>Main Description:</strong> <br /> {about?.main_description}
                                </div>
                                <div>
                                    <strong>Address:</strong> <br /> {about?.address}
                                </div>
                                <div>
                                    <strong>Email:</strong> <br />{" "}
                                    {about?.email}
                                </div>
                                <div>
                                    <strong>phone:</strong> <br /> {about?.phone}
                                </div>

                            </div>
                            <div className="flex gap-4">
                                {/* Section 1 Image */}
                                <div className="mt-4">
                                    {/* <h4 className="font-semibold">Section 1 Image:</h4>
                  {about?.section_1_image && (
                    <img
                      src={`${Image_Url}${about?.section_1_image}`}
                      alt={about?.section_1_image_alt}
                      className="w-32 h-32 objectcover mt-2"
                    />
                  )} */}
                                    <div>
                                        <strong>Credits:</strong> {about?.credits}
                                    </div>
                                </div>


                            </div>

                            {/* Banner Images */}
                            <div className="mt-4">
                                <h4 className="font-semibold">Great Palms Link:</h4>
                                <div className="flex gap-4 flex-wrap">
                                    {about?.great_palms?.map((img, i) => (
                                        <div key={i} className="border border-gray-200  p-2">

                                            <div>
                                                <strong>link:</strong> {img.link}
                                            </div>
                                            <div>
                                                <strong>Title:</strong> {img.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            {/* Banner Images */}
                            <div className="mt-4">
                                <h4 className="font-semibold">Main Links:</h4>
                                <div className="flex gap-4 flex-wrap">
                                    {about?.main_links?.map((img, i) => (
                                        <div key={i} className="border border-gray-200  p-2">
                                            <div>
                                                <strong>URL:</strong> {img.url}
                                            </div>
                                            <div>
                                                <strong>Name:</strong> {img.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="mt-4">
                                <h4 className="font-semibold">Social Links:</h4>
                                <div className="flex gap-4 flex-wrap">
                                    {about?.social_links?.map((img, i) => (
                                        <div key={i} className="border border-gray-200  p-2">
                                            <img
                                                src={`${Image_Url}${img.icon}`}
                                                alt={img.image_alt}
                                                className="w-15 h-15 objectcover"
                                            />
                                            <div>
                                                <strong>URL:</strong> {img.url}
                                            </div>
                                        </div>
                                    ))}
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
                <FooterSecForm
                    editData={editData}
                    setEditData={setEditData}
                    setStatus={setStatus}
                    fetchData={fetchData}
                />
            )}
        </div>
    );
};

export default FooterSec;
