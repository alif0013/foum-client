import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useReport = () => {

    const axiosSecure = useAxiosSecure();

    const {refetch, data: reports = [] } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reported')
            return res.data;
        }
    })


    return [reports, refetch]
};

export default useReport;