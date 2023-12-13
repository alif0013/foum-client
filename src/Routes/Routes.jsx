import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayouts from '../Layouts/MainLayouts/MainLayouts';
import ErrorPage from '../errorPage/ErrorPage';
import Home from '../Pages/Home/Home/Home';
import Membership from '../Pages/Membership/Membership';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import PostDetails from '../Pages/postDetails/PostDetails';
import Dashboard from '../Layouts/Dashboard/Dashboard';
import MyProfile from '../Pages/UserDashboard/MyProfile/MyProfile';
import MyPost from '../Pages/UserDashboard/MyPost/MyPost';
import AddPost from '../Pages/UserDashboard/AddPost/AddPost';
import ManageUser from '../Pages/AdminDashboard/ManageUser/ManageUser';
import ReportedComment from '../Pages/AdminDashboard/ReportedComment/ReportedComment';
import Announcement from '../Pages/AdminDashboard/Announcement/Announcement';
import AdminProfile from '../Pages/AdminProfile/AdminProfile';
import CommentDetails from '../Pages/UserDashboard/MyPost/CommentDetails';
import PrivateRoutes from './PrivateRoutes';
import Payment from '../Pages/UserDashboard/Payment/Payment';
import Subscriber from '../Pages/AdminDashboard/Subscriber/Subscriber';

const myCreatedRoutes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayouts></MainLayouts>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/membership',
                element: <PrivateRoutes><Membership></Membership></PrivateRoutes>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/details/:id',
                element: <PrivateRoutes><PostDetails></PostDetails></PrivateRoutes> ,
                loader: ({ params }) => fetch(`https://smart-forum-server.vercel.app/posts/${params.id}`)
           
            },
            {
                path: '/comments-details',
                element: <CommentDetails></CommentDetails>,
              

            },
            {
                path: '/payment',
                element: <Payment></Payment>
            }

        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'myProfile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'addPost',
                element: <AddPost></AddPost>
            },
            {
                path: 'myPost',
                element: <MyPost></MyPost>,

            },

            //admin route
            {
                path: 'adminProfile',
                element: <AdminProfile></AdminProfile>
            },
            {
                path: 'manageUser',
                element: <ManageUser></ManageUser>
            },
            {
                path: 'reportedComment',
                element: <ReportedComment></ReportedComment>
            },
            {
                path: 'announcement',
                element: <Announcement></Announcement>
            },
            {
                path: 'subscriber',
                element: <Subscriber></Subscriber>
            },



        ]
    }
])

export default myCreatedRoutes;