import { useState } from 'react';
import Select from 'react-select';
import './react-select.css'; 

const SelectField = ({ label, name, fieldOptions, defaultdata, control,
    required = false, errorMsg, errors, obj, ...rest }) => {
    const { Controller } = obj;
    const { selectedOptions } = rest;
    const [selectedValue, setSelectedValue] = useState(selectedOptions);


    return (
        <div className='mb-3'>
            <div className='text-lg font-semibold mb-1'>
                {label}
                {required && <span className='text-red-500 ml-1'>*</span>}
            </div>

            <Controller
                name={name}
                control={control} 
                rules={{ required: required && errorMsg }} 
                render={({ field }) => (
                    <Select
                        {...field}
                        isMulti 
                        options={fieldOptions}
                        defaultValue={selectedValue}
                        onChange={(selected) => {
                            setSelectedValue(selected);
                            field.onChange(selected);
                        }}
                    />
                )}
            />
            {
                errors[name] &&
                <span className=' text-sm text-red-600 font-bold'>
                    {errors[name].message}
                </span>
            }
        </div>
    )
}

export default SelectField;
















// ----------------------------------------------
// ----------------------------------------------

// import Select from 'react-select';

// const SelectField = ({ label, name, fieldOptions, defaultdata,
//     required = false, errorMsg, errors, obj, ...rest }) => {
//     const { setValue } = obj;
//     const { selectedOptions } = rest;

//     return (
//         <div className='mb-3'>
//             <div className='text-lg font-bold mb-1'>
//                 {label}
//                 {required && <span className='text-red-500 ml-1'>*</span>}
//             </div>
//             <Select
//                 isMulti
//                 options={fieldOptions}
//                 value={selectedOptions}
//                 {...rest}
//                 onChange={(selectedOptions) => {
//                     console.log(selectedOptions);
//                     setValue(name, selectedOptions);
//                 }}
//             />
//             {
//                 errors[name] &&
//                 <span className=' text-sm text-red-600 font-bold'>
//                     {errors[name].message}
//                 </span>
//             }
//         </div>
//     )
// }

// export default SelectField;
