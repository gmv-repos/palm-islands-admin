import { Navigate, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";

const ProtectedRoute = ({ children, requiredPermission }) => {
    
  const { token, user } = useStateContext();
  const location = useLocation();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.role_id) {
      setLoading(false);
      return;
    }

    const fetchPermissions = async () => {
      try {
        const res = await axiosClient.get(`/roles/getPermission/${user?.role_id}`);
        setPermissions(res.data.data);
      } catch (err) {
        console.error("Error fetching permissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [user]);

  const hasPermission = (permissionName) =>
    permissions.some((perm) => perm.permission === permissionName);

//   if (loading) return <div>Loading...</div>;

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} />;
  }
  if(user?.role_id == 99999999){

  }else{
    if (requiredPermission && !hasPermission(requiredPermission)) {
        return <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6 text-center"><h2 className="text-xl font-semibold mb-4">You do not have permission to view this page.</h2></div></div>;
    }
  }
  

  return children;
};

export default ProtectedRoute;
