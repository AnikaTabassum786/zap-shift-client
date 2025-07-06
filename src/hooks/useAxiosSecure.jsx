import React from 'react';
import axios from 'axios'
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
})

const useAxiosSecure = () => {

    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`

        return config;
    }, error => {
        return Promise.reject(error)
    })

    //interceptor

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        console.log('inside res interceptor', error.status);
        const status = error.status;

        if (status === 403) {
            navigate('/forbidden');
        }

        else if (status === 401) {
            logOut()
                .then(() => {
                    navigate('/login')
                })
                .catch((error) => {
                    console.log(error)
                })

        }

        return Promise.reject(error)
    })

    return axiosSecure;
};

export default useAxiosSecure;

// import axios from "axios";
// import React, { useContext, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext/AuthContext";


// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3000',
// });

// const useAxiosSecure = () => {
//   const { user, logOut, loading } = useContext(AuthContext);

//   useEffect(() => {
//     if (!loading && user?.accessToken) {
//       // Add request interceptor
//       const requestInterceptor = axiosInstance.interceptors.request.use(
//         (config) => {
//           config.headers.authorization = `Bearer ${user.accessToken}`;
//           return config;
//         }
//       );

//       // Add response interceptor
//       const responseInterceptor = axiosInstance.interceptors.response.use(
//         (res) => res,
//         (err) => {
//           if (err?.response?.status === 401 || err?.response?.status === 403) {
//             logOut()
//               .then(() => {
//                 console.log("Logged out due to token issue.");
//               })
//               .catch(console.error);
//           }
//           return Promise.reject(err);
//         }
//       );

//       // Cleanup to prevent multiple interceptors on re-renders
//       return () => {
//         axiosInstance.interceptors.request.eject(requestInterceptor);
//         axiosInstance.interceptors.response.eject(responseInterceptor);
//       };
//     }
//   }, [user, loading]);

//   return axiosInstance;
// };

// export default useAxiosSecure;