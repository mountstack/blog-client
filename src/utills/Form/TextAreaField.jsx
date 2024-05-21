import React from 'react';

const TextAreaField = ({ 
    label, name, register, 
    errors={}, required=false, errorMsg="", 
    ...rest }) => { 
    return ( 
        <div className='mb-3'> 
            <div className='text-lg font-semibold mb-1'> 
                {label} 
                {required && <span className='text-red-500 ml-1'>*</span>} 
            </div> 
            
            <textarea 
                className='rounded-md py-1 w-full border-gray-300 hover:border-gray-400 min-h-[120px] transition-all' 
                {...register(name, {required: required && errorMsg})} 
                {...rest} /> 
                { 
                    errors[name] && 
                    <span className=' text-sm text-red-600 font-bold'> 
                        {errors[name].message} 
                    </span> 
                } 
        </div> 
    ); 
}; 

export default TextAreaField; 