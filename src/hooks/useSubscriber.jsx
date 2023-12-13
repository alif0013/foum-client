
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useSubscriber = () =>  {
    //tanstack query
    const axiosSecure = useAxiosSecure();

    const {refetch, data: subscribers = [] } = useQuery({
        queryKey: ['subscribers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/subscribe')
            return res.data;
        }
    })


    return [subscribers, refetch]
};

export default useSubscriber;