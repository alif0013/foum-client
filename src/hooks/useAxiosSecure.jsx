import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    // baseURL: 'https://smart-forum-server.vercel.app'
    baseURL: 'https://smart-forum-server.vercel.app'

})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useAuth();


//request interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        // console.log('res stooped', token);
        config.headers.Authorization = `Bearer ${token}`
        return config;
    }, function (error){
        return Promise.reject(error)
    })

    //intercepts 401 and 403 status 
    axiosSecure.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            await logOut();
            navigate('/login')
          }
          return Promise.reject(error)
        }
      )





    return axiosSecure;
};

export default useAxiosSecure;