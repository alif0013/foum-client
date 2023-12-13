import React from 'react';
import { Helmet } from 'react-helmet-async';
import useMyPost from '../../../hooks/useMyPost';
import { FaRegCommentAlt } from 'react-icons/fa';
import { MdOutlineDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';


const MyPost = () => {

    const [myPost, refetch] = useMyPost()
    

    const axiosSecure = useAxiosSecure();

    
    

    const handleDelete = id => {
        // console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {

                    axiosSecure.delete(`/posts/${id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {

                                refetch();

                                Swal.fire(
                                    'Deleted!',
                                    'Your Post has been deleted.',
                                    'success'
                                )

                            }

                        })
                }
            })
    }

    return (
        <div>
            <Helmet>
                <title>Dashboard | My Post</title>
            </Helmet>

            <h2 className='text-4xl font-bold text-center mt-10'>My Post</h2><hr className='border-2 mt-4 md:w-[400px] mx-auto' />

            <div className='mt-10 lg:w-[800px] mx-auto'>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Number Of Vote</th>
                                <th>Comment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                       
                        <tbody>
                            {/* row 1 */}
                            {
                                myPost.map(post => <>
                                    <tr>

                                        <td>{post.title}</td>
                                        <td>{post.upvote}</td>
                                        <td> <Link to={`/comments-details`} className="btn"><FaRegCommentAlt></FaRegCommentAlt></Link> </td>
                                        <td> <button onClick={() => handleDelete(post._id)} className="btn text-xl text-red-600"><MdOutlineDelete></MdOutlineDelete></button> </td>

                                    </tr>
                                </>)
                            }

                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )


};

export default MyPost;