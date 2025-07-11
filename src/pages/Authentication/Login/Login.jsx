import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const { signInUser } = useAuth()

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/'

    const onSubmit = (data) => {
        console.log(data)

        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(from)
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register('email')} className="input" placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password"
                        {...register('password', {
                            required: true,
                            minLength: 6
                        })}
                        className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must be 6 characters or longer</p>
                    }

                    <div><a className="link link-hover">Forgot password?</a></div>

                </fieldset>
                <p>New This Website?  <span className='btn btn-link'><Link state={{ from }} to='/register'>Register</Link></span></p>
                <button className="btn btn-primary text-black mt-4">Login</button>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;