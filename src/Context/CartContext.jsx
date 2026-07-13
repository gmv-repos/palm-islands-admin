import React, { createContext, useState, useContext, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
import axiosClient from "../axiosClient";
// import axios from "../Utils/axios";

const CatContext = createContext();

export const CatProvider = ({ childern }) => {
  const [CartItems, setCartItems] = useState([]);

  const fetchCatItems = async () => {
    const token = localStorage.getItem("access_token");
    //   const storedSession = localStorage.getItem('session_id');
    const url = `/property-types/`;

    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    try {
      const response = await axiosClient.get(url, config);
      //   setCatItems(response);

      const items = response.data.data || [];
      setCartItems(items);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };
  useEffect(() => {
    fetchCatItems();
  }, []);

  return (
    <CatContext.Provider
      value={{
        CartItems,
      }}
    >
      {childern}
    </CatContext.Provider>
  );
};

export const useCat = () => useContext(CatContext);
