import React from 'react';
import useReport from '../../../hooks/useReport';
import { MdOutlineDelete } from 'react-icons/md';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ReportedComment = () => {

    const [reports, refetch] = useReport();

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

                    axiosSecure.delete(`/reported/${id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {

                                refetch();

                                Swal.fire(
                                    'Deleted!',
                                    'Your comment has been deleted.',
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
                <title>Dashboard | Report</title>
            </Helmet>

            <h2 className='text-4xl font-bold text-center mt-10'>Reported Comment:{reports.length}</h2><hr className='border-2 mt-4 md:w-[400px] mx-auto' />

            <div className='mt-10 lg:w-[800px] mx-auto'>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Email</th>
                                <th>Comment Text</th>
                                <th>Report Reason</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {/* row 1 */}
                            {
                                reports.map(report => <>
                                    <tr>

                                        <td><div className="avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={report.commenterImg} />
                                            </div>
                                        </div></td>
                                        <td>{report.comenterEmail}</td>
                                        <td>{report.currentComment}</td>
                                        <td>{report.feedBack}</td>
                                        <td> <button onClick={() => handleDelete(report._id)} className="btn text-xl text-red-600"><MdOutlineDelete></MdOutlineDelete></button> </td>

                                    </tr>
                                </>)
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default ReportedComment;