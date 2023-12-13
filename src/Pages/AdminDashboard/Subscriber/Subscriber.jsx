import React from 'react';
import useSubscriber from '../../../hooks/useSubscriber';

const Subscriber = () => {

    const [subscribers, refetch] = useSubscriber()


    return (
        <div>
            <h2 className='text-4xl font-bold text-center mt-10'>All Subscriber: {subscribers.length}</h2><hr className='border-2 mt-4 md:w-[400px] mx-auto' />

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            subscribers.map(Subscriber => <>
                                <tr>
                                    <td>{Subscriber.email}</td>
                                    <td>{Subscriber.date}</td>
                                    <td>{Subscriber.currentTime}</td>
                                    <td>Send Message</td>
                                </tr>
                            </>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Subscriber;