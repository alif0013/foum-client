import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useComments from '../../hooks/useComments';
import usePosts from '../../hooks/usePosts';

const AdminProfile = () => {

    const { user } = useAuth()
    const [comments] = useComments()
    const [posts] = usePosts()

    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })




    return (
        <div>
            <Helmet>
                <title>Dashboard | Admin Profile</title>
            </Helmet>

            <h2 className='text-4xl font-bold text-center mt-10'>Admin Profile</h2><hr className='border-2 mt-4 md:w-[400px] mx-auto' />

            <div className='flex justify-center mt-10 lg:mt-20'>

                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                    <div className="flex flex-col items-center pb-10">
                        <img className="w-24 h-24 mb-3 mt-2 rounded-full shadow-lg" src={user?.photoURL} alt="Bonnie image" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Name: {user?.displayName}</h5>


                        <span className="text-sm text-gray-500 dark:text-gray-400">Email: {user?.email}</span>
                        <div className="flex mt-4 md:mt-6">

                        </div>
                    </div>
                </div>

            </div>


            <div className='mt-10 mb-10 lg:w-[800px] mx-auto bg-slate-200'>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Number of Users</th>
                                <th>Number of Comments</th>
                                <th>Number of Post</th>

                            </tr>
                        </thead>

                        <tbody>
                            {/* row 1 */}
                            <tr>

                                <td>{users.length}</td>
                                <td>{comments.length}</td>
                                <td>{posts.length}</td>

                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>



        </div>
    );
};

export default AdminProfile;