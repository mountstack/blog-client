import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import config from '../../../config';
import Form from '../../../utills/Form/Form';
import ToastMessageNotify from '../../../utills/Toast';
import InputField from '../../../utills/Form/InputField';
import SelectField from '../../../utills/Form/ReactSelect/SelectField';
import Breadcrumb from '../../../utills/Breadcrumb/Breadcrumb';
import QuillEditor from '../../../utills/Form/QuillEditor/QuillEditor';
import InputCheckbox from '../../../utills/Form/Checkbox/InputCheckbox';

const ArticleForm = () => {
    const { id } = useParams();
    const [defaultData, setDefaultData] = useState(null);
    const [categoriesFieldOptions, setCategoriesFieldOptions] = useState([]); 

    useEffect(() => {
        async function fetch() {
            const res = await axios.get(`${config.baseUrl}/api/post/${id}`);
            const { 
                title, featureImageUrl, 
                content, category, 
                publish 
            } = res?.data?.post;

            setDefaultData({ 
                title, content, 
                publish, featureImageUrl, 
                category: category.map(function (c) { 
                    return { value: c._id, label: c.name } 
                }) 
            }); 
        } 
        id && fetch(); 
    }, []) 

    useEffect(function () {
        async function fetchData() {
            const { data: { categories } } = await axios.get(`${config.baseUrl}/api/category`);
            const result = categories.map(category => {
                return {
                    value: category._id,
                    label: category.name
                }
            })
            setCategoriesFieldOptions(result);
        }
        fetchData();
    }, [])

    const inputFields = [
        { // Title
            Field: InputField,
            properties: {
                name: 'title',
                label: 'Title',
                placeholder: 'Enter a Title...',
                required: true,
                errorMsg: 'Title is required'
            }
        },
        { // Feature Image URL
            Field: InputField,
            properties: {
                name: 'featureImageUrl',
                label: 'Feature Image',
                placeholder: 'Enter a image url...',
                required: true,
                errorMsg: 'Image is required'
            }
        },
        { // Category
            Field: SelectField,
            properties: {
                name: 'category',
                label: 'Categories',
                fieldOptions: categoriesFieldOptions, 
                selectedOptions: defaultData?.category || [], 
                required: true,
                errorMsg: 'Category is required'
            }
        }, 
        { // published
            Field: InputCheckbox,
            properties: { 
                name: 'publish', 
                label: 'Publish' 
            } 
        },
        { // Content - Quill Editor
            Field: QuillEditor,
            properties: {
                name: 'content',
                label: 'Content',
                placeholder: 'Enter Your Blog Content...',
                required: true,
                errorMsg: 'Content is required'
            }
        },
    ];

    const onSubmit = async (data) => { 
        const newData = { 
            ...data, 
            category: data?.category?.map(cat => cat.value)
        } 

        const method = id ? 'patch' : 'post';
        let url = `${config.baseUrl}/api/post`;
        if (id) {
            url = `${url}/${id}`;
        } 

        try {
            const { data: { message } } = await axios({ url, method, data: newData });
            toast(message, { type: 'success' });
        } 
        catch (error) {
            toast(error.message, { type: 'error' });
        }
    }; 

    return (
        <div> 
            <Breadcrumb form id={id} name="Article" link="/dashboard/article" /> 
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

export default ArticleForm; 