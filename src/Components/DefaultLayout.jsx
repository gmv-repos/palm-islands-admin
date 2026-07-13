import { Outlet, Navigate, Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../axiosClient";
import Sidebar from "./Sidebar"; // Ensure Sidebar is Bootstrap-based
import Spinner from "./Spinner"; // Assume Spinner uses Bootstrap styling
import "./Layout.css";
import {
  MdArticle,
  MdBrandingWatermark,
  MdCategory,
  MdFormatSize,
  MdProductionQuantityLimits,
  MdExitToApp,
  MdSettings
} from "react-icons/md";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isOpenHeader, setIsOpenHeader] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (token) {
      console.log(token, "hello")
    }
  }, [])
  // useEffect(() => {
  //   if (token) {
  //     axiosClient
  //       .get("/user")
  //       .then(({ data }) => {
  //         setUser(data);
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching user data:", err);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   } else {
  //     navigate('/');
  //     setLoading(false);
  //   }
  // }, [token, setUser]);

  // if (!loading && !token) {
  //   return <Navigate to="/admin/home" />;
  // }
  // useEffect(() => {
  //   const userData = localStorage.getItem("USER_DATA");
  //   const accessToken = localStorage.getItem("ACCESS_TOKEN");
  //   console.log(userData , accessToken)
  //   if (!userData || !accessToken) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  useEffect(() => {
    if (!token) {
      navigate('/admin')
      setLoading(false);
    }
    // axiosClient.get("/user").then((d)=>{console.log(d)}).catch((e)=> {console.log(e)})
  }, [navigate]);
  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then(() => {
      setUser(null);
      setToken(null);
      console.log(token, user)
      navigate("/");
    }).catch((err) => {
      console.error("Error logging out:", err);
    });
  };

  const toggleDropdown = () => {
    setIsOpenHeader(!isOpenHeader);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenHeader(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigateToChangePassword = () => {
    navigate("/admin/change-password");
  };

  return (
    <div
      id=""
      className={`flex ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={` ${isOpen ? "ps3" : "ps-1"}`} style={{ width: "100%" }}>
        {/* Header */}
        <div
          className="bg-white  px-4 py-5 shadow-sm z-3"
          style={{ width: "100%" }}
        >
          <div
            className="flex justify-between items-center "
            style={{ width: "100%" }}
          >
            <div
              to="/"
              className=" text-decoration-none text-dark text-xl font-palm font-bold"
            >
              Welcome To Palm Island Admin Panel
            </div>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                style={{ backgroundColor: "#5DAABA", color: "white" }}
                className="btn flex align-items-center rounded-md px-3 py-1"
              >
                Admin
              </button>

              {isOpenHeader && (
                <div className=" mt-2 absolute boxAbsolute shadow-sm bg-white">
                  {/* <button
                    onClick={navigateToChangePassword}
                    className="dropdown-item"
                  >
                    Change Password
                  </button> */}
                  <div
                    onClick={onLogout}
                    className=" dropdown-item py-2 px-5 border-b border-gray-100 flex justify-between gap-2 items-center"
                  >
                    <div>
                      <MdExitToApp />
                    </div>
                    <div>Logout</div>
                  </div>

                  {/* <div
                    onClick={onLogout}
                    className="dropdown-item  py-2 px-5 flex justify-between gap-2 items-center"
                  >
                    <div>
                     <MdSettings />
                    </div>
                    <div>Setting</div>
                  </div> */}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-5" style={{ width: "100%" }}>{loading ? <Spinner /> : <Outlet />}</main>
      </div>
    </div>
  );
}
