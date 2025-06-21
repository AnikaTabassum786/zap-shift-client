import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()

    const onSubmit = (data) => {
        console.log(data)
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
                <button className="btn btn-neutral mt-4">Register</button>
            </form>
        </>

    );
};

export default Register;