import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import config from '../../../config';
import Form from '../../../utills/Form/Form';
import ToastMessageNotify from '../../../utills/Toast'; 
import InputField from '../../../utills/Form/InputField';
import TextAreaField from '../../../utills/Form/TextAreaField'; 
import Breadcrumb from '../../../utills/Breadcrumb/Breadcrumb';

const CategoryForm = () => {
    const { id } = useParams();
    const [defaultData, setDefaultData] = useState({});

    useEffect(() => {
        async function fetch() {
            const res = await axios.get(`${config.baseUrl}/api/category/${id}`)
            const { name, description } = res.data.category;
            setDefaultData({ name, description });
        }
        id && fetch();
    }, [])

    const inputFields = [
        {
            Field: InputField,
            properties: {
                name: 'name',
                label: 'Name',
                placeholder: 'Enter a Name...',
                required: true,
                errorMsg: 'Name is required'
            }
        },
        {
            Field: TextAreaField,
            properties: {
                name: 'description',
                label: 'Description',
                placeholder: 'Enter a Description...'
            }
        },
    ]; 

    const onSubmit = async (data) => { 
        const method = id ? 'patch' : 'post';
        let url = `${config.baseUrl}/api/category`; 
        if (id) { 
            url = `${url}/${id}`;
        } 

        try {
            const {data: {message}} = await axios({ url, method, data }); 
            toast(message, {type: 'success'}); 
        } 
        catch (error) {
            toast(error.message, {type: 'error'}); 
        }
    }; 

    return (
        <div>
            <Breadcrumb form id={id} name="Category" link="/dashboard/category" /> 
            <div className=' h-3'></div> 

            <Form
                inputFields={inputFields}
                onSubmit={onSubmit}
                defaultData={defaultData}
            /> 

            <ToastMessageNotify />
        </div>
    )
}

export default CategoryForm; 