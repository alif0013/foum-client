import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: isAdmin} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !! user?.email && !! localStorage.getItem('access-token'),
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            console.log(res.data.admin);
            return res.data?.admin;
        }
    })

    return [isAdmin];



};

export default useAdmin;