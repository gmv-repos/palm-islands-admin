import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../axiosClient";
import Swal from "sweetalert2";

const ContactList = () => {
  const [faqCategory, setFaqCategory] = useState([]);

  const fetchData = async () => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) return alert("No access token found");
      const res = await axiosClient.get("/admin/contact-us", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setFaqCategory(res.data.data);
    } catch (err) {
      console.log("Failed to load users.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

    //     const toggleStatus = async (id) => {
    //   console.log(id);
    //   const token = localStorage.getItem("ACCESS_TOKEN");
    //   if (!token) return alert("No access token found");
  
    //   try {
    //     const res = await axiosClient.post(`/admin/subscribers/${id}/toggleStatus`);
    //     if(res.data.status == true) {
    //         Swal.fire({
    //           icon: "success",
    //         //   title: "Success!",
    //           text: res.data?.message || "Status Changed Successfully!",
    //         });
    //               fetchData();
    //         } else {
    //             Swal.fire({
    //           icon: "error",
    //         //   title: "Success!",
    //           text: res.data?.message || "Status Change Failed",
    //         }); 
    //         }
  
    //   } catch (err) {
    //     Swal.fire({
    //           icon: "error",
    //         //   title: "Success!",
    //           text: "Status Change Failed",
    //         }); 
    //   }
    // };

  return (
    <div className="relative mx-auto p-3" style={{ width: "100%" }}>
      <div
        className={`bg-white flex flex-col gap-10 justify-between shadow-md rounded-lg p-6 mb-6`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold font-palm">Contacts List</h2>
        </div>
        <div>
          <table className="w-full table-fixed border border-gray-400 p-3 text-sm">
            <thead>
              <tr className="bg-[#5DAABA] text-white text-left">
                <th className="border border-gray-300 p-3">S.no</th>
                <th className="border border-gray-300 p-3">Full Name</th>
                <th className="border border-gray-300 p-3">Email</th>
                <th className="border border-gray-300 p-3">Phone No</th>
                <th className="border border-gray-300 p-3">Message</th>
                {/* <th className="border border-gray-300 p-3">Status</th> */}
              </tr>
            </thead>
            <tbody>
              {faqCategory?.length > 0 ? (
                faqCategory.map((data, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2 overflow-hidden">
                      {(data.first_name !== null ? data.first_name : "") + (data.last_name !== null ? data.last_name : "")}
                    </td>
                    <td className="border border-gray-300 p-2 overflow-hidden">
                      {data.email}
                    </td>
                    <td className="border border-gray-300 p-2 overflow-hidden">
                      {data.phone}
                    </td>
                    <td className="border border-gray-300 p-2 overflow-hidden">
                      {data.message}
                    </td>
                    {/* <td className="border border-gray-300 p-2">
                                          <button
                                            className={`${
                                              data.status === 1 ? "bg-green-500" : "bg-red-500"
                                            } p-2 rounded text-white`}
                                            onClick={() => toggleStatus(data.id)}
                                          >
                                            {data.status === 1 ? "Active" : "In-Active"}
                                          </button>
                                        </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border border-gray-300 p-3 text-center text-sm bg-gray-200"
                    colSpan="6"
                  >
                    Content Is not Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
