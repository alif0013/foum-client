import React, { useState } from 'react';
import useComments from '../../../hooks/useComments';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const CommentDetails = () => {

    const [comments, refetch] = useComments()
    const axiosSecure = useAxiosSecure()
    const [selectedFeedback, SetSelectedFeedback] = useState('')

    // const feedback = selectedFeedback;

    const handleFeedBack = comment => {

        const currentComment = comment.comment;
        const comenterEmail = comment.comenterEmail;
        const commenterImg = comment.commenterImg;
        const feedBack = selectedFeedback;

        const newReport = {currentComment, comenterEmail, commenterImg, feedBack };
        // console.log(newReport);

        axiosSecure.post('/reported', newReport)
        .then(res => {
            console.log(res.data);
            if (res.data.insertedId) {
                toast.success('Reported Successfully!')

                // refetch post to the data 
                refetch();
            }
        })

    }

    const handleSelectFeedBack = e => {
        SetSelectedFeedback(e.target.value); // Update selectedLevel state when the select value changes
    };

    return (
        <div>
            <Helmet>
                <title>Dashboard | Comment</title>
            </Helmet>

            <h2 className='text-4xl font-bold text-center mt-10'>All Comments: {comments.length}</h2><hr className='border-2 mt-4 md:w-[400px] mx-auto' />

            <div className='mt-10 lg:w-[800px] mx-auto'>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Comment Text</th>
                                <th>Feedback</th>
                                <th>Action</th>
                            </tr>
                        </thead>


                        <tbody>

                            {/* row danamic */}
                            {
                                comments.map(comment => <>
                                    <tr>

                                        <td>{comment.comenterEmail}</td>
                                        <td>{comment.comment}</td>
                                        <td> <Link className="">
                                            <select
                                                className="select input select-bordered w-full max-w-xs mr-5"
                                                onChange={handleSelectFeedBack} // Handle select change
                                                value={selectedFeedback} // Set the selected value from state
                                            >
                                                <option value="" disabled selected>Select Your Feedback</option>
                                                <option value="Harmful">Harmful</option>
                                                <option value="Adult">Adult</option>
                                                <option value="Dangerous">Dangerous</option>

                                            </select>
                                        </Link>
                                        </td>

                                        <td> <button
                                            onClick={()=> handleFeedBack(comment)}
                                            type='submit'
                                            className="btn text-xl text-red-600">Report</button>
                                        </td>

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

export default CommentDetails;