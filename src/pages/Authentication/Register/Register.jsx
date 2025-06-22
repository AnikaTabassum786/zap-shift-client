import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const {createUser} = useAuth()

    const onSubmit = (data) => {
        console.log(data)
        // console.log(createUser)
        createUser(data.email,data.password)
        .then(result=>{
            console.log(result.user)
        })
        .catch(error =>{
            console.log(error)
        })
    }
    return (

        <>
            <p className='text-3xl '>Create a account</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">

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
                    {...register('password',{required: true, minLength:6})} 
                    className="input" placeholder="Password" />
                    {
                        errors.password?.type==='required' && (
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