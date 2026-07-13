import { Outlet, useLocation } from "react-router-dom";
// import Header from '../views/webComponents/Header'
// import Footer from '../views/webComponents/Footer'
import React, { useEffect, useLayoutEffect, useState } from "react";
import { getScrollPosition } from "../Utils/scrollPositions";
import RouteChangeListener from "../Utils/RouteChangeListener";
import Header from "../views/webComponents/header/Header";
import Footer from "../views/webComponents/footer/Footer";
import SubFooter from "../views/webComponents/SubFooter/SubFooter";
import footerBg from '/footerTopBgImg.png'; // Adjust path as needed

export default function WebsiteLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileMenu, setMoblieMenu] = useState("Menu");

    const location = useLocation();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);


    return (
        <div>
            <RouteChangeListener />
            <Header />
            <Outlet />
            {/* <Footer /> */}
            {/* <div className='w-full relative flex justify-center lg:px-24 sm:px-12 px-6 bg-[#5DAABA]  md:pt-20'>
                <SubFooter footerBg={footerBg} />
                <Footer />
            </div> */}
            {/* <ChatbotComponent setMoblieMenu={setMoblieMenu} setIsMobileMenuOpen={setIsMobileMenuOpen} mobileMenu={mobileMenu} isMobileMenuOpen={isMobileMenuOpen} /> */}
        </div>
    )
}