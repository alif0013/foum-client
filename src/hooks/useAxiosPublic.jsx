import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://smart-forum-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;