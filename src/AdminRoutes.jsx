// src/routes/AdminRoutes.jsx
// import { createBrowserRouter } from "react-router-dom";
// import AdminDashboard from "./views/AdminPanel/Dashboard/AdminDashboard.jsx";
import React from "react";
// Layouts
import DefaultLayout from "./Components/DefaultLayout.jsx";
import GuestLayout from "./Components/GuestLayout.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Login from "./views/AdminPanel/AdminPages/Login/Login.jsx";
import AdminHome from "./views/AdminPanel/AdminPages/Home/AdminHome.jsx";
import AddDeveloperPage from "./views/AdminPanel/AdminPages/BasicFunctionPages/AddDeveloperPage.jsx";
import AddCategory from "./views/AdminPanel/AdminPages/BasicFunctionPages/AddCategory.jsx";
import BlogCat from "./views/AdminPanel/AdminPages/BasicFunctionPages/Blog/BlogCat.jsx";
import BlogCreation from "./views/AdminPanel/AdminPages/BasicFunctionPages/Blog/BlogCreation.jsx";
import BlogTags from "./views/AdminPanel/AdminPages/BasicFunctionPages/Blog/BlogTags.jsx";
import BlogList from "./views/AdminPanel/AdminPages/BasicFunctionPages/Blog/BlogList.jsx";
// import AdProperty from "./views/AdminPanel/AdminPages/BasicFunctionPages/AddProperty.jsx";
import CreateDeveloper from "./views/AdminPanel/AdminPages/BasicFunctionPages/Developer/CreateDeveloper.jsx";
import AddProperty from "./views/AdminPanel/AdminPages/BasicFunctionPages/Property/AddProperty.jsx";
import DeveloperList from "./views/AdminPanel/AdminPages/BasicFunctionPages/Developer/DeveloperList.jsx";
import UpdateDeveloper from "./views/AdminPanel/AdminPages/BasicFunctionPages/Developer/UpdateDeveloper.jsx";
import Property from "./views/AdminPanel/AdminPages/BasicFunctionPages/Property/Property.jsx";
import UpdateProperty from "./views/AdminPanel/AdminPages/BasicFunctionPages/Property/UpdateProperty.jsx";

import CreateFaqs from "./views/AdminPanel/AdminPages/BasicFunctionPages/Faqs/CreateFaqs.jsx";
import FaqsCategory from "./views/AdminPanel/AdminPages/BasicFunctionPages/Faqs/FaqsCategory.jsx";
import Subscribers from "./views/AdminPanel/AdminPages/BasicFunctionPages/Subscribers/Subscribers.jsx";
import ContactList from "./views/AdminPanel/AdminPages/BasicFunctionPages/ContactList/ContactList.jsx";
import FaqList from "./views/AdminPanel/AdminPages/BasicFunctionPages/Faqs/FaqList.jsx";
import AboutUs from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/AboutUs Page/AboutUs.jsx";
import DeveloperListAdmin from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/Developer List Page/DeveloperList.jsx";
import Videos from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/Videos/Videos.jsx";
import PropertyAvailable from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/Property Available/Property.jsx";
import PropertyManagement from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/Property Management/PropertyManagement.jsx";
import Mortgage from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/Mortgage/Mortgage.jsx";
import PropertyList from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/List Your Property/Property.jsx";
import ContactUs from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/ContactUs Page/ContactUs.jsx";
import Home from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/Home/Home.jsx";
import DubaiIsland from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/DubaiIsland/Dubaisland.jsx";
import PalmJumeirah from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/Palm Jumeirah/PalmJumeirah.jsx";
import PalmJebelAli from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/Palm Jebel Ali/PalmJebelAli.jsx";
import GuidePage from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/Guide Page/GuidePage.jsx";
import GuideCategory from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/Guide Page/GuideCategory.jsx";
import GuideSubCategory from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/Guide Page/GuideSubCategory.jsx";
import GuidePageSeo from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/Guide Page/GuidePageSeo.jsx";
import NewDevelopment from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/NewDevelopment/NewDevelopment.jsx";
import FaqSeo from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/FaqSeo/FaqSeo.jsx";
import MortgageCalculator from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/MortgageCalculator/MortgageCalculator.jsx";
import BlogPage from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/BlogPage/BlogPage.jsx";
import FooterSec from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/Footer/FooterSec.jsx";
import PropertyTypePageForm from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/PropertyTypePages/PropertyTypePageForm.jsx";
import PropertyTypePageList from "./views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/PropertyTypePages/PropertyTypePageList.jsx";
import GalleryAdmin from "./views/AdminPanel/AdminPages/BasicFunctionPages/Gallery/Gallery.jsx";







// import BlogCreation from "./views/AdminPanel/AdminPages/BasicFunctionPages/BlogCreationPage.jsx";

// Helper function to simplify the protected route wrapping
const protectedRoute = (Component, permission) => (
  <ProtectedRoute requiredPermission={permission}>
    {Component}
  </ProtectedRoute>
);

const adminRoutes = [
  // Admin Panel Routes
  {
    path: "/admin/",
    element: <DefaultLayout />,
    children: [
      // { path: "dashboards", element: protectedRoute(<AdminDashboard />, "/admin/dashboards") },
      { path: "home", element: <AdminHome /> },
      { path: "add-developer", element: <AddDeveloperPage /> },
      { path: "create-developer", element: <CreateDeveloper /> },
      { path: "update-developer", element: <UpdateDeveloper /> },
      { path: "developer-list", element: <DeveloperList /> },
      { path: "add-faqs", element: <CreateFaqs /> },
      { path: "faq-categories", element: <FaqsCategory /> },
      { path: "faqs-list", element: <FaqList /> },
      { path: "subscribers", element: <Subscribers /> },
      { path: "contact-list", element: <ContactList /> },
      { path: "aboutus-page", element: <AboutUs /> },
      { path: "developer-list-page", element: <DeveloperListAdmin /> },
      { path: "videos-page", element: <Videos /> },
      { path: "property-available-page", element: <PropertyAvailable /> },
      { path: "property-management-page", element: <PropertyManagement /> },
      { path: "mortgage-page", element: <Mortgage /> },
      { path: "list-your-property-page", element: <PropertyList /> },
      { path: "contactus-page", element: <ContactUs /> },
      { path: "home-page", element: <Home /> },
      { path: "dubai-island", element: <DubaiIsland /> },
      { path: "palm-jumeirah", element: <PalmJumeirah /> },
      { path: "palm-jebel-ali", element: <PalmJebelAli /> },
      { path: "guide-category", element: <GuideCategory /> },
      { path: "guide-page", element: <GuidePage /> },
      { path: "guide-sub-category", element: <GuideSubCategory /> },
      { path: "guide-content", element: <GuidePageSeo /> },
      { path: "new-developments", element: <NewDevelopment /> },
      { path: "create-property-type-page", element: <PropertyTypePageForm /> },
      { path: "property-type-page-list", element: <PropertyTypePageList /> },
      { path: "gallery", element: <GalleryAdmin /> },



      { path: "faq-seo", element: <FaqSeo /> },
      { path: "mortage-calculator", element: <MortgageCalculator /> },
      { path: "blog-page", element: <BlogPage /> },
      { path: "footer", element: <FooterSec /> },

















      { path: "categories", element: <AddCategory /> },
      { path: "blog-categories", element: <BlogCat /> },
      { path: "add-blog", element: <BlogCreation /> },
      { path: "blog-tags", element: <BlogTags /> },
      { path: "blogs", element: <BlogList /> },
      { path: "add-property", element: <AddProperty /> },
      { path: "property", element: <Property /> },
      { path: "update-property", element: <UpdateProperty /> },
    ],
  },


  // Guest Routes (Login/Register)
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { index: true, element: <Login /> },
    ],
  },
];

export default adminRoutes;
