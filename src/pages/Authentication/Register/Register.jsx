import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const { createUser,updateUserProfile } = useAuth()
    const [profilePic, setProfilePic] = useState('')
    const axiosInstance = useAxios();

    const onSubmit = (data) => {
        console.log(data)
        // console.log(createUser)
        createUser(data.email, data.password, data.name)
            .then(async(result) => {
                console.log(result.user)

                //update userInfo in the database

                const userInfo={
                    email:data.email,
                    role:'user',
                    created_at: new Date().toISOString,
                    last_log_in: new Date().toISOString
                }

                const userRes = await axiosInstance.post('/users',userInfo)
                console.log(userRes.data)



                //update user profile in firebase
                const userProfile={
                    displayName:data.name,
                    photoURL:profilePic
                   
                }
                updateUserProfile(userProfile)
                .then(()=>{
                    console.log('Profile name pic updated')
        
                })
                .catch(error =>{
                    console.log(error)
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0]
        console.log(image)


        const formData = new FormData();
        formData.append('image', image)

        const imgUploadURL = 'https://api.imgbb.com/1/upload?key=511e2e9caf8cd644a8bf5628230588f6'

        const res = await axios.post(imgUploadURL,formData)
        console.log(res.data.data.url)

        setProfilePic(res.data.data.url)
    }
    return (

        <>
            <p className='text-3xl '>Create a account</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">

                    <label className="label">Your image</label>
                    <input type="file"
                        onChange={handleImageUpload}
                        className="input" placeholder="Your Profile Picture" />

                    {
                        errors.name?.type === 'required' && (
                            <p className='text-red-500'>Name is Required</p>
                        )
                    }

                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="Name" />

                    {
                        errors.name?.type === 'required' && (
                            <p className='text-red-500'>Name is Required</p>
                        )
                    }

                    {/* Email */}

                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />

                    {
                        errors.email?.type === 'required' && (
                            <p className='text-red-500'>Email is Required</p>
                        )
                    }

                    {/* Password */}

                    <label className="label">Password</label>
                    <input type="password"
                        {...register('password', { required: true, minLength: 6 })}
                        className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && (
                            <p className='text-red-500'>Password is Required</p>
                        )
                    }
                    {
                        errors.password?.type === 'minLength' && (
                            <p className='text-red-500'>Password Must be 6 characters or longer</p>

                        )
                    }


                    <div><a className="link link-hover">Forgot password?</a></div>

                </fieldset>
                <p>Already Have an Account? <span className='btn btn-link'><Link to='/login'>Login</Link></span></p>
                <button className="btn btn-primary text-black mt-4">Register</button>
            </form>
            <SocialLogin></SocialLogin>
        </>

    );
};

export default Register;