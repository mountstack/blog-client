import React, { useState } from 'react'; 
import { useDropzone } from 'react-dropzone'; 
import axios from 'axios'; 
import './image-upload.css'; 

const ImageUploadField = ({ label, name, control, required = false, 
    errorMsg, errors, obj, ...rest }) => {
    const { Controller } = obj;
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length === 0) return;

        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        formData.append('upload_preset', 'your_upload_preset'); 

        setUploading(true);

        axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData)
            .then(response => {
                setUploadedImage(response.data.secure_url);
                setUploading(false);
            })
            .catch(error => {
                console.error('Error uploading the image:', error);
                setUploading(false);
            });
    }; 

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

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
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        {uploading ? (
                            <p>Uploading...</p>
                        ) : (
                            <p>Drag & drop an image here, or click to select one</p>
                        )}
                    </div>
                )}
            />

            {uploadedImage && (
                <div className='mt-2'>
                    <img src={uploadedImage} alt='Uploaded' className='uploaded-image' />
                </div>
            )}

            {
                errors[name] &&
                <span className='text-sm text-red-600 font-bold'>
                    {errors[name].message}
                </span>
            }
        </div>
    );
};

export default ImageUploadField;