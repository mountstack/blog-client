import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ToastMessageNotify from '../../utills/Toast';
import useApiRequest from '../../hooks/useAPIrequest';
import { CircleUser, Lock, Eye, EyeOff } from 'lucide-react'; 

function SignupForm() {
    const { callTheAPI, pending } = useApiRequest();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch("password");

    const onSubmit = async (data) => {
        const endPoint = '/api/auth/signup';
        await callTheAPI(endPoint, data);
    };

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="px-4 py-8 border-2 border-slate-700 rounded-md w-[400px]">
                <h1 className="text-4xl font-bold text-center">
                    Sign Up
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
                                {showPassword && <Eye color="#4a4a4a" strokeWidth={1.75} />}
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
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                className="mt-1 w-full rounded-md pl-11 text-lg"
                                placeholder="Re-Enter Your Password"
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: value => value === password
                                })}
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-1">
                                <Lock color="#4a4a4a" strokeWidth={1.75} />
                            </div>
                            <div
                                onClick={() => setConfirmShowPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pl-3 pr-3 pt-1 cursor-pointer">
                                {
                                    showConfirmPassword &&
                                    <Eye color="#4a4a4a" strokeWidth={1.75} />
                                }
                                {
                                    !showConfirmPassword &&
                                    <EyeOff color="#4a4a4a" strokeWidth={1.75} />
                                }
                            </div>
                        </div>
                        {
                            errors.confirmPassword &&
                            <span className="text-red-500">
                                Passwords do not match
                            </span>
                        }
                    </div>
                    <div className="mt-6"> 
                        <button 
                            type="submit"
                            className="text-white py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 text-lg" >
                            { pending ? 'Loading...' : 'Sign Up' }
                        </button> 
                    </div> 
                    <div className="mt-6">
                        <p>
                            Already have an account?
                            <NavLink to="/signin">
                                <span className="text-blue-500 ml-2 border-b-2 border-gray-500">
                                    Login
                                </span>
                            </NavLink>
                        </p>
                    </div>
                </form>
            </div>

            <ToastMessageNotify />
        </div>
    );
}

export default SignupForm;
