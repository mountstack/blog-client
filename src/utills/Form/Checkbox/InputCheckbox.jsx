import React, { useState } from 'react'; 
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css'; 

const InputCheckbox = ({ label, name, fieldOptions, defaultdata, control,
    required = false, errorMsg, errors, obj, ...rest }) => { 
    const { Controller } = obj; 

    const [value, setValue] = useState(obj.defaultData?.publish || false);

    return (
        <div className='mb-3 custom-checkbox-wrapper'>
            <label className='text-xl font-semibold mr-3'> 
                {label} 
            </label>
            <Controller
                name={name} 
                control={control}
                defaultValue={value} 
                render={({ field: { value, onChange } }) => (
                    <Checkbox 
                        checked={value}
                        className={`custom-checkbox ${value ? 'custom-checkbox-checked' : ''}`}
                        onChange={(e) => onChange(e.target.checked)}
                    />
                )}
            /> 
        </div>
    )
}

export default InputCheckbox; 