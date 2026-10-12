import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../../axiosClient';
import { useStateContext } from '../../../../contexts/contextProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const payload = {
      email,
      password
    };
    try {
      const response = await axiosClient.post("login",
        payload
      );
      if (
        (response.data.success == true)
      ) {
        const { token, user } = response.data;
        setToken(token);
        setUser(user);
        setTimeout(() => {
          navigate("/admin/home");
        }, 2000);
      } else {
        console.log('Error at Login')
      }
    } catch (err) {
      console.log('Error at Login')
      alert("Error Message" + err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8  shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 font-palm">Login</h2>

        <form
          // onSubmit={handleSubmit}
          className="mt-6"
        >
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full px-4 py-2 mt-2 border  border-gray-500  focus:outline-none focus:ring-1 focus:ring-[#5DAABA]"
            />
          </div>
          {/* Password input with eye toggle */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full px-4 py-2 mt-2 border border-gray-500  focus:outline-none focus:ring-1 focus:ring-[#5DAABA]"
            />
            <div
              className="absolute inset-y-0 top-3 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-700" />
              ) : (
                <FaEye className="text-gray-700" />
              )}
            </div>
          </div>
          {error && <p className="my-6 text-red-700">{error}</p>}
          <div onClick={handleSubmit} className=" bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 flex justify-center items-center gap-3 cursor-pointer md:text-sm text-xs text-white w-full">
            {loading ? "Logging..." : "Login"}
          </div>
        </form>
      </div>
    </div>
  );
}
