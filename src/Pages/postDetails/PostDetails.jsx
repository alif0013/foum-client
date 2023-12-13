import React from 'react';
import { BiUpvote } from 'react-icons/bi';
import { BiDownvote } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { useLoaderData } from 'react-router-dom';
import { RiShareForwardLine } from "react-icons/ri";
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useComments from '../../hooks/useComments';


const PostDetails = () => {

    const { user } = useAuth()
    const posts = useLoaderData()
    const axiosSecure = useAxiosSecure();

    const [comments, refetch] = useComments()

    const { _id, title, tags, currentTime, userImg, date, description, downvote, name, upvote } = posts;

    

    const handleComments = e => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment.value;
        const userName = user?.displayName;
        const commenterImg = user?.photoURL;
        const comenterEmail = user?.email; 
        const newComment = { comment, title, comenterEmail, commenterImg, userName };
        // console.log(newComment);

        axiosSecure.post('/comments', newComment)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    // toast.success('Posted Successfully!')

                    //refetch post to update the data 
                    refetch();
                }
            })


    }



    const handleUpvote = id => {

        axiosSecure.patch(`/posts/vote/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {

                    refetch();

                }
            })
    }

    const handleDownVote = id => {

        axiosSecure.patch(`/posts/downVote/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {

                    refetch();

                }
            })
    }

    return (

        <div className='px-4'>
            <div className="bg-slate-100 rounded p-10 mt-10 md:w-[600px] mx-auto">

                <div className="flex gap-5">
                    <div className="avatar">
                        <div className="w-16 rounded-full">
                            <img src={userImg} />
                        </div>
                    </div>

                    <div>
                        <h2 className="pb-1 font-bold">{name}</h2>

                        <div className='flex gap-3'>
                            <h3>{date}</h3>
                            <h3>{currentTime}</h3>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <h1 className="font-bold">{title}</h1>
                    <h2 className="font-semibold pt-1"># {tags}</h2>
                </div>

                <div className='mt-5'>
                    {description}
                </div>

                <div className="flex items-center gap-5 mt-5">
                    <button onClick={() => handleUpvote(_id)} className='btn'>
                        <BiUpvote className="text-xl"></BiUpvote>
                    </button> {upvote}

                    <button onClick={() => handleDownVote(_id)} className='btn'>
                        <BiDownvote className="text-xl"></BiDownvote>
                    </button> {downvote}


                    <RiShareForwardLine className="text-xl"></RiShareForwardLine>
                </div>

            </div>

            {/* comment section */}
            <div>
                <div className='flex gap-5 items-center mt-10 md:w-[600px] mx-auto'>
                    <div className="avatar online">
                        <div className="w-16 rounded-full">
                            <img src={user?.photoURL} />
                        </div>

                    </div>

                    <div>
                        <form onSubmit={handleComments} className='flex gap-2'>
                            <input type="text" name="comment" placeholder="Wright a comment..."
                                className="input input-bordered input-primary md:w-[430px] " />

                            <button type='submit' className='btn'>
                                <IoMdSend className="text-xl"></IoMdSend>
                            </button>

                        </form>
                    </div>

                </div>


                {/* comment box */}

                <div className='mt-10 md:w-[600px] mx-auto'>


                    <div className='mb-10'>
                        {
                            comments.map(comment => <>

                                <div className='mb-10'>

                                    <div className='flex gap-3 items-center'>


                                        <div className="avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={comment.commenterImg} />
                                            </div>
                                        </div>

                                        <div className='bg-slate-50 px-5 py-2 rounded-lg'>
                                            <div>
                                                <h1 className='font-bold'>{comment.userName}</h1>
                                            </div>

                                            <h1 className=''>{comment.comment}</h1>
                                        </div>

                                    </div>



                                </div>




                            </>)

                        }
                    </div>
                </div>

            </div>

        </div>
    );
};

export default PostDetails;