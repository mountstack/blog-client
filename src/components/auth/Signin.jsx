import React, { useState } from "react";
import { useForm } from "react-hook-form"; 
import ToastMessageNotify from '../../utills/Toast'; 
import useApiRequest from '../../hooks/useAPIrequest'; 
import { useNavigate  } from 'react-router-dom'; 
import { CircleUser, Lock, Eye, EyeOff } from 'lucide-react';  

function Signin(props) { 
    const navigate = useNavigate(); 
    const { callTheAPI, pending  } = useApiRequest(); 
    const [ showPassword, setShowPassword ] = useState(false); 
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => { 
        const endPoint = '/api/auth/signin'; 
        const { response } = await callTheAPI(endPoint, data); 
        if(!response) return; 

        localStorage.setItem('token', response.token); 
        props.setLoggedIn(true); 
        navigate('/', { state: { signin: true } }); 
    }; 

    return ( 
        <div className="flex justify-center items-center h-[80vh]"> 
            <div className="px-4 py-8 border-2 border-slate-700 rounded-md w-[400px]"> 
                <h1 className="text-4xl font-bold text-center"> 
                    Sign In  
                </h1> 
                <form 
                    onSubmit={handleSubmit(onSubmit)} 
                    className="max-w-md mx-auto mt-8">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold">
                            Email 
                        </label>
                        <div className="relative">
                            <input
                                id="email" 
                                type="email"
                                className="mt-1 w-full rounded-md pl-11 text-lg"
                                placeholder="Enter Your Email"
                                {...register("email", { required: true })} 
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-1">
                                <CircleUser color="#4a4a4a" strokeWidth={1.75} /> 
                            </div> 
                        </div>
                        {
                            errors.email &&
                            <span className="text-red-500">
                                Email is required
                            </span>
                        }
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold">
                            Password
                        </label>
                        <div className="relative"> 
                            <input
                                id="password"  
                                type={showPassword ? "text" : "password"} 
                                className="mt-1 w-full rounded-md pl-11 text-lg" 
                                placeholder="Enter Your Password" 
                                {...register("password", { required: true, minLength: 8 })} 
                            /> 
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-1"> 
                                <Lock color="#4a4a4a" strokeWidth={1.75} /> 
                            </div> 
                            <div 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pl-3 pr-3 pt-1 cursor-pointer">
                                {showPassword && <Eye color="#4a4a4a" strokeWidth={1.75} /> }
                                {!showPassword && <EyeOff color="#4a4a4a" strokeWidth={1.75} />}
                            </div>
                        </div>
                        {
                            errors.password &&
                            errors.password.type === "required" &&
                            <span className="text-red-500">
                                Password is required
                            </span>
                        }
                        {
                            errors.password &&
                            errors.password.type === "minLength" &&
                            <span className="text-red-500">
                                Password must be at least 8 characters
                            </span>
                        }
                    </div>
                    
                    <div className="mt-6"> 
                        <button 
                            type="submit" 
                            disabled={pending} 
                            className="bg-blue-500 text-white text-lg py-2 px-4 rounded hover:bg-blue-600"> 
                            { pending ? 'Loading...' : 'Sign In' } 
                        </button> 
                    </div> 

                    
                </form> 
            </div> 
            
            <ToastMessageNotify /> 
        </div> 
    ); 
} 

export default Signin; 