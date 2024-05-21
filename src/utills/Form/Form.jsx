import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

const Form = ({inputFields=[], onSubmit=function(){}, defaultData}) => { 
    const { register, handleSubmit, setValue, getValues, formState: { errors }, control } = useForm(); 

    useEffect(() => { 
        for(let prop in defaultData) { 
            setValue(prop, defaultData[prop]); 
        } 
    }, [defaultData]) 

    return ( 
        <form onSubmit={handleSubmit(onSubmit)}> 
            <div className='w-full'> 
            { 
                inputFields.map((inputField, index) => { 
                    const { Field, properties } = inputField; 
                    return ( 
                        <Field 
                            key={index} 
                            {...properties} 
                            register={register} 
                            errors={errors} 
                            control={control} 
                            obj={{
                                defaultData, 
                                getValues, 
                                setValue, 
                                Controller
                            }} 
                        /> 
                    ) 
                }) 
            } 
            </div> 
            <button 
                className='mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-2 rounded-md'>
                Submit 
            </button> 
        </form> 
    ) 
} 

export default Form; 