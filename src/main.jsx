import React, { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ContextProvider } from "./contexts/contextProvider";
import { CatProvider } from "./Context/CartContext";
import { ToastContainer } from "react-toastify";
// import React from "react";

// Render the application - Made and Bind My M Anas ASif Chippa
createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ToastContainer />
    <ContextProvider>
      {/* <CatProvider> */}
        <RouterProvider router={router} />
      {/* </CatProvider> */}
    </ContextProvider>
  </StrictMode>
);
