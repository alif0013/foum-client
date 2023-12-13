import React from 'react';
import { FcBusinessman } from "react-icons/fc";
import { MdAdd } from "react-icons/md";
import { CiCircleList } from "react-icons/ci";
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { Toaster } from 'react-hot-toast';
import useMyPost from '../../hooks/useMyPost';
import { GoReport } from "react-icons/go";
import { CiBullhorn } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import useAdmin from '../../hooks/useAdmin';


const Dashboard = () => {
    const [myPost] = useMyPost()

    const [isAdmin] = useAdmin();



    return (
        <div className='md:flex'>
            <div className='md:48 md:min-h-screen lg:w-64 bg-green-400'>
                <ul className='menu p-5'>

                    {
                        isAdmin ? <>
                            <li className='bg-white my-2 rounded-lg'>
                                <NavLink to="/dashboard/adminProfile">
                                    <FcBusinessman className='text-xl'></FcBusinessman> Admin Profile
                                </NavLink>
                            </li>
                            <li className='bg-white my-1 rounded-lg'>
                                <NavLink to="/dashboard/manageUser">
                                <FaUsers className='text-xl'></FaUsers> Manage Users
                                </NavLink>
                            </li>
                            <li className='bg-white my-2 rounded-lg'>
                                <NavLink to="/dashboard/reportedComment">
                                    <GoReport className='text-xl'></GoReport> Reported Comment
                                </NavLink>
                            </li>
                            <li className='bg-white my-2 rounded-lg'>
                                <NavLink to="/dashboard/announcement">
                                    <CiBullhorn className='text-xl'></CiBullhorn> Announcement
                                </NavLink>
                            </li>
                            <li className='bg-white my-2 rounded-lg'>
                                <NavLink to="/dashboard/subscriber">
                                    <FaUsers className='text-xl'></FaUsers> Subscriber
                                </NavLink>
                            </li>

                            </>
                            :
                            <>
                                <li className='bg-white my-2 rounded-lg'>
                                    <NavLink to="/dashboard/myProfile">
                                        <FcBusinessman className='text-xl'></FcBusinessman> My Profile
                                    </NavLink>
                                </li>
                                <li className='bg-white my-1 rounded-lg'>
                                    <NavLink to="/dashboard/addPost">
                                        <MdAdd className='text-xl'></MdAdd> Add Post
                                    </NavLink>
                                </li>
                                <li className='bg-white my-2 rounded-lg'>
                                    <NavLink to="/dashboard/myPost">
                                        <CiCircleList className='text-xl'></CiCircleList> My Post ({myPost.length})
                                    </NavLink>
                                </li>
                            </>
                    }
                    <div className="divider"></div>

                    <li className='bg-white my-2 rounded-lg'>
                        <NavLink to="/">
                            <FaHome className='text-xl'></FaHome>Home
                        </NavLink>
                    </li>

                </ul>
            </div>

            <div className='flex-1'>
                <Outlet></Outlet>
                <Toaster></Toaster>
            </div>

        </div>
    );
};

export default Dashboard;