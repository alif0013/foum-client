import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Pages/Footer/Footer';

const MainLayouts = () => {
    return (
        <div className='lg:w-[1200px] mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            {/* <Footer></Footer> */}
            <Toaster></Toaster>
        </div>
    );
};

export default MainLayouts;