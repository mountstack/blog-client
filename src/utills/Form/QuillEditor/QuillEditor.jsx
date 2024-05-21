import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill-editor.css'; 


const QuillEditor = ({ label, name, fieldOptions, defaultdata, control,
    required = false, errorMsg, errors, obj, ...rest }) => {
    const { Controller } = obj; 

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
                    <ReactQuill
                        {...field}
                        placeholder={""}
                        modules={{
                            toolbar: [
                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                [{ size: [] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                { 'indent': '-1' }, { 'indent': '+1' }],
                                ['link', 'image', 'video'],
                                ['clean']
                            ],
                        }}
                        formats={[
                            'header', 'font', 'size',
                            'bold', 'italic', 'underline', 'strike', 'blockquote',
                            'list', 'bullet', 'indent',
                            'link', 'image', 'video'
                        ]}
                        onChange={(value) => field.onChange(value)}
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

export default QuillEditor; 