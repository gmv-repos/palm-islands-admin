import React, { useState, useEffect, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  MdArticle,
  MdBrandingWatermark,
  MdCategory,
  MdFormatSize,
  MdProductionQuantityLimits,
} from "react-icons/md";
// import logo  from '../../src/assets/logo.png'
import { useStateContext } from "../contexts/contextProvider";
import axiosClient from "../axiosClient";
import "./Layout.css";
import "./Sidebar.css"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [expandedSections, setExpandedSections] = useState({
    products: false,
    blogs: false,
    stocks: false,
    pos: false,
  });

  const { user } = useStateContext();
  const navigate = useNavigate();
  // const [permissions, setPermissions] = useState([]);

  const toggleSection = useCallback((section) => {
    setExpandedSections((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map((key) => [key, false])),
      [section]: !prev[section],
    }));
  }, []);

  // const fetchPermissions = useCallback(async () => {
  //   if (!user?.role_id) return;
  //   try {
  //     const res = await axiosClient.get(`/roles/getPermission/${user.role_id}`);
  //     setPermissions(res.data.data);
  //   } catch (err) {
  //     console.error("Permission error", err);
  //   }
  // }, [user]);

  // const hasPermission = (permissionName) => {
  //   if (user?.role_id === 99999999) return true;
  //   return permissions.some((perm) => perm.permission === permissionName);
  // };

  // useEffect(() => {
  //   fetchPermissions();
  // }, [fetchPermissions]);

    //   useEffect(() => {
    //   const userData = localStorage.getItem('USER_DATA');
    //   const accessToken = localStorage.getItem('ACCESS_TOKEN');

    //   if (!userData) {
    //     navigate('/');
    //   }
    // }, [navigate]);

  const NavItem = ({ to, label, icon }) => (
    <li className="nav-item">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `nav-link flex align-items-center px-3 py-2 ${isActive ? "active text-[#5DAABA] bg-white fw-bold" : "text-white"}`
        }
        style={{ fontSize: "14px" }}
      >
        {icon}
        {isOpen && <span className="ms-2">{label}</span>}
      </NavLink>
    </li>
  );

  const DropdownItem = ({ title, sectionKey, icon, items }) => (
    <>
      <li
        className="nav-item flex justify-between items-center px-3 py-2 text-white"
        role="button"
        onClick={() => toggleSection(sectionKey)}
      >
        <div className="flex items-center" style={{ fontSize: "14px" }}>
          {icon}
          {isOpen && <span className="ms-2 " style={{ fontSize: "14px" }}>{title}</span>}
        </div>
        {isOpen && (expandedSections[sectionKey] ? <FaChevronUp /> : <FaChevronDown />)}
      </li>
      {isOpen && expandedSections[sectionKey] && (
        <ul className="nav flex-col ms-4">
          {items.map(({ to, label, permission }) =>
            // permission && !hasPermission(permission) ? null : (
              <NavItem key={to} to={to} label={label} icon={<span />} />
            // )
          )}
        </ul>
      )}
    </>
  );

  return (
    <div className={` text-white  sideNavbar ${isOpen ? "px-2" : "px-1"}`} style={{ width: isOpen ? 200 : 60  , minHeight:  "100vh"}}>
      <div className="flex justify-between items-center p-2 border-bottom">
        {isOpen &&
        <h5 className="m-0 text-xl font-palm">Palm Island Admin</h5>
        // <img src={logo} style={{ width: "45px" }}/>
        }
        <button className="btn btn-sm btn-outline-light" onClick={toggleSidebar}>
          &#9776;
        </button>
      </div>

      <ul className="nav flex-column mt-3">
        {/* <DropdownItem
          title="POS"
          sectionKey="pos"
          icon={<MdProductionQuantityLimits className="me-2" />}
          items={[
            { to: "/admin/pos/dashboard", label: "POS Dashboard", permission: "/admin/pos/dashboard" },
            { to: "/admin/pos/sale-returns", label: "Sale Return", permission: "/admin/pos/sale-returns" },
            { to: "/admin/pos/purchaseOrder", label: "Purchase Orders", permission: "/admin/pos/purchaseOrder" },
            { to: "/admin/pos/purchase-history", label: "Purchase History", permission: "/admin/pos/purchase-history" },
            { to: "/admin/pos/purchaseReturn", label: "Purchase Return", permission: "/admin/pos/purchaseReturn" },
            { to: "/admin/pos/expenses", label: "Expenses", permission: "/admin/pos/expenses" },
            { to: "/admin/pos/payments", label: "Payments", permission: "/admin/pos/payments" },
            { to: "/admin/pos/customers", label: "Customers", permission: "/admin/pos/customers" },
            { to: "/admin/pos/suppliers", label: "Suppliers", permission: "/admin/pos/suppliers" },
            { to: "/admin/pos/reports", label: "Reports", permission: "/admin/pos/reports" },
            { to: "/admin/pos/master-forms", label: "Master Forms", permission: "/admin/pos/master-forms" },
          ]}
        /> */}

        {/* <NavItem to="/admin/dashboards" icon={<MdCategory className="me-2" />} label="Dashboard" /> */}
        {/* <NavItem to="/admin/pages-seo-details" icon={<MdCategory className="me-2" />} label="Pages SEO" /> */}
        {/* <DropdownItem
          title="User Management"
          sectionKey="user-management"
          icon={<MdProductionQuantityLimits className="me-2" />}
          items={[
            { to: "/admin/roles", label: "Roles" },
            { to: "/admin/permissions", label: "Permissions" },
          ]}
        /> */}
         <DropdownItem
          title="Developers"
          sectionKey="Developers"
          icon={<MdCategory className="me-2" />}
          items={[
            { to: "/admin/create-developer", label: "Add Developer", },
            { to: "/admin/developer-list", label: "Developer List", },
          ]}
        />
        <DropdownItem
          title="Property"
          sectionKey="Properties"
          icon={<MdCategory className="me-2" />}
          items={[
            { to: "/admin/categories", label: "Property Types", },
            { to: "/admin/add-property", label: "Add Property", },
            { to: "/admin/property", label: "Property List", },
          ]}
        />
         <DropdownItem
          title="Property Type Pages"
          sectionKey="PropertyTypePages"
          icon={<MdCategory className="me-2" />}
          items={[
            { to: "/admin/create-property-type-page", label: "Add Property Type Page", },
            { to: "/admin/property-type-page-list", label: "Property Type Pages List", },
          ]}
        />
        {/* <NavItem to="/admin/create-developer" icon={<MdCategory className="me-2" />} label="Add Developer" />
        <NavItem to="/admin/developer-list" icon={<MdCategory className="me-2" />} label="Developer List" /> */}
         <DropdownItem
          title="Blog"
          sectionKey="Blogs"
          icon={<MdCategory className="me-2" />}
          items={[
            { to: "/admin/blog-categories", label: "Categories", },
            // { to: "/admin/pos/import-products", label: "Import Products", },
            { to: "/admin/blog-tags", label: "Tags", },
            { to: "/admin/add-blog", label: "Add Blog", },
            { to: "/admin/blogs", label: "All Blogs", },
            // { to: "/admin/products/create", label: "Add", permission: "/admin/products/create" },
          ]}
        />
         <DropdownItem
          title="Faqs"
          sectionKey="Faqs"
          icon={<MdCategory className="me-2" />}
          items={[
            { to: "/admin/add-faqs", label: "Add Faqs", },
            { to: "/admin/faqs-list", label: "Faqs List", },
            { to: "/admin/faq-categories", label: "Faqs Category", },
          ]}
        />
        <DropdownItem
          title="Pages Data"
          sectionKey="PagesData"
          icon={<MdCategory className="me-2" />}
          items={[
            { to: "/admin/aboutus-page", label: "About Us", },
            { to: "/admin/developer-list-page", label: "Developer List", },
            { to: "/admin/videos-page", label: "Videos", },
            { to: "/admin/property-available-page", label: "Property Available", },
            { to: "/admin/property-management-page", label: "Property Management", },
            { to: "/admin/mortgage-page", label: "Mortgage", },
            { to: "/admin/mortage-calculator", label: "Mortgage Calculator", },
            { to: "/admin/list-your-property-page", label: "List Property", },
            { to: "/admin/contactus-page", label: "Contact Us", },
            { to: "/admin/home-page", label: "Home", },
            { to: "/admin/dubai-island", label: "Dubai Island", },
            { to: "/admin/palm-jumeirah", label: "Palm Jumeirah", },
            { to: "/admin/palm-jebel-ali", label: "Palm Jebel Ali", },
            { to: "/admin/new-developments", label: "New Development", },
            { to: "/admin/faq-seo", label: "Faq List", },
            // { to: "/admin/gallery", label: "Gallery", },

            // { to: "/admin/blog-page", label: "Blog Page", },
            // { to: "/admin/footer", label: "Footer section", },






          ]}
        />

        <DropdownItem
          title="Guide Page"
          sectionKey="GuidePage"
          icon={<MdCategory className="me-2" />}
          items={[
            { to: "/admin/guide-content", label: "Guide Content", },
            { to: "/admin/guide-page", label: "Guide Sections", },
            { to: "/admin/guide-category", label: "Guide Category", },
            { to: "/admin/guide-sub-category", label: "Guide Sub-Category", },
          ]}
        />
        {/* <NavItem to="/admin/blog-categories" icon={<MdCategory className="me-2" />} label="Blog Categories" />
        <NavItem to="/admin/blog-tags" icon={<MdCategory className="me-2" />} label="Blog Tags" />
        <NavItem to="/admin/add-blog" icon={<MdCategory className="me-2" />} label="Add Blogs" /> */}
        {/* <NavItem to="/admin/fsaf" icon={<MdCategory className="me-2" />} label="Pages - FAQs" /> */}
        <NavItem to="/admin/subscribers" icon={<MdCategory className="me-2" />} label="Subscribers" />
        <NavItem to="/admin/contact-list" icon={<MdCategory className="me-2" />} label="User Contacts" />
        <NavItem to="/admin/gallery" icon={<MdCategory className="me-2" />} label="Gallery" />

        {/* <NavItem to="/admin/guide-page" icon={<MdCategory className="me-2" />} label="Guide Page" /> */}

        {/* <NavItem to="/admin/home-page" icon={<MdCategory className="me-2" />} label="Home Page" /> */}
        {/* <NavItem to="/admin/about-us-page" icon={<MdCategory className="me-2" />} label="About Us Page" /> */}
        {/* <NavItem to="/admin/contact-us-page" icon={<MdCategory className="me-2" />} label="Contact Us Page" /> */}

        {/* <NavItem to="/admin/payments" icon={<MdCategory className="me-2" />} label="Payments" /> */}

        {/* <NavItem to="/admin/subscribers" icon={<MdCategory className="me-2" />} label="Subscribers" />
        <NavItem to="/admin/shipping" icon={<MdCategory className="me-2" />} label="Shipping Methods" />
        <NavItem to="/admin/orders" icon={<MdCategory className="me-2" />} label="Orders" /> */}

        {/* <NavItem to="/admin/hero-sections" icon={<MdCategory className="me-2" />} label="Hero Sections" /> */}
        {/* <NavItem to="/admin/ticker-options" icon={<MdCategory className="me-2" />} label="Ticker Option" /> */}

         {/* Product Dropdown */}
        {/* <DropdownItem
          title="Product"
          sectionKey="products"
          icon={<MdProductionQuantityLimits className="me-2" />}
          items={[
            { to: "/admin/products", label: "List", permission:"/admin/products" },
            { to: "/admin/products/create", label: "Add", permission:"/admin/products/create" },
          ]}
        /> */}

        {/* Blogs Dropdown */}
        {/* <DropdownItem
          title="Blogs"
          sectionKey="blogs"
          icon={<MdArticle className="me-2" />}
          items={[
            { to: "/admin/blogs", label: "List", permission:"/admin/blogs" },
            { to: "/admin/blogs/create", label: "Add", permission:"/admin/blogs/create" },
          ]}
        /> */}

        {/* Stocks Dropdown */}
        {/* <DropdownItem
          title="Stocks"
          sectionKey="stocks"
          icon={<MdArticle className="me-2" />}
          items={[
            { to: "/admin/stocks", label: "Stock List", permission:"/admin/stocks" },
            { to: "/admin/stocks/create", label: "Add Stock", permission:"/admin/stocks/create" },
          ]}
        /> */}

         {/* {hasPermission("/admin/basket-types") && (
          <NavItem
            to="/admin/basket-types"
            icon={<MdCategory className="me-2" />}
          >
            Basket Types
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/ready-made-baskets") && (
          <NavItem
            to="/admin/ready-made-baskets"
            icon={<MdCategory className="me-2" />}
          >
            Ready Made Basket
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/custom-baskets") && (
          <NavItem
            to="/admin/custom-baskets"
            icon={<MdCategory className="me-2" />}
          >
            Custom Basket
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/custom-trays") && (
          <NavItem
            to="/admin/custom-trays"
            icon={<MdCategory className="me-2" />}
          >
            Custom Tray
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/custom-boxs") && (
          <NavItem
            to="/admin/custom-boxs"
            icon={<MdCategory className="me-2" />}
          >
            Custom Box
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/brands") && (
          <NavItem
            to="/admin/brands"
            icon={<MdBrandingWatermark className="me-2" />}
          >
            Brand
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/product-category-sizes") && (
          <NavItem
            to="/admin/product-category-sizes"
            icon={<MdFormatSize className="me-2" />}
          >
            Product Category Size
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/sizes") && (
          <NavItem
            to="/admin/sizes"
            icon={<MdFormatSize className="me-2" />}
          >
            Size
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/compositions") && (
          <NavItem
            to="/admin/compositions"
            icon={<MdFormatSize className="me-2" />}
          >
            Compositions
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/gift-cards") && (
          <NavItem
            to="/admin/gift-cards"
            icon={<MdFormatSize className="me-2" />}
          >
            Gift Cards
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/corporate-gift-pages") && (
          <NavItem
            to="/admin/corporate-gift-pages"
            icon={<MdFormatSize className="me-2" />}
          >
            Corporate Gift Pages
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/corporate-gift-sections") && (
          <NavItem
            to="/admin/corporate-gift-sections"
            icon={<MdFormatSize className="me-2" />}
          >
            Corporate Gift Sections
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/corporate-gift-categories") && (
          <NavItem
            to="/admin/corporate-gift-categories"
            icon={<MdFormatSize className="me-2" />}
          >
            Corporate Gift Categories
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/corporate-gift-products") && (
          <NavItem
            to="/admin/corporate-gift-products"
            icon={<MdFormatSize className="me-2" />}
          >
            Corporate Gift Products
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/discount-codes") && (
          <NavItem
            to="/admin/discount-codes"
            icon={<MdFormatSize className="me-2" />}
          >
            Discount Codes
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/delivery-charges") && (
          <NavItem
            to="/admin/delivery-charges"
            icon={<MdFormatSize className="me-2" />}
          >
            Delivery Charges
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/orders") && (
          <NavItem
            to="/admin/orders"
            icon={<MdFormatSize className="me-2" />}
          >
            Orders
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/contacts") && (
          <NavItem
            to="/admin/contacts"
            icon={<MdCategory className="me-2" />}
          >
            Contact List
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/subscribers") && (
          <NavItem
            to="/admin/subscribers"
            icon={<MdCategory className="me-2" />}
          >
            Subscriber List
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/product-reviews") && (
          <NavItem
            to="/admin/product-reviews"
            icon={<MdCategory className="me-2" />}
          >
            Product Reviews
          </NavItem>
        )} */}
        {/* {hasPermission("/admin/LoyaltyPointsSettings") && (
          <NavItem
            to="/admin/LoyaltyPointsSettings"
            icon={<MdCategory className="me-2" />}
          >
            Loyalty Points Settings
          </NavItem>
        )} */}
      </ul>
    </div>
  );
};

export default Sidebar;
