import React, { useEffect } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';
import { Trash2, FilePenLine } from 'lucide-react';
import config from '../../../config';
import useModal from '../../../hooks/useModal';
import ToastMessageNotify from '../../../utills/Toast'; 
import { getAllCategory } from '../../../store/actions/categoryAction'; 
import TableWrapper from '../../../utills/ReactTable/TableWrapper'; 
import ConfirmModal from '../../../utills/Modal/ConfirmModal';
import Breadcrumb from '../../../utills/Breadcrumb/Breadcrumb';

const Category = () => { 
    const location = useLocation();
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.allCategory); 

    const { isModalOpen, onOpenModal, onCloseModal } = useModal(); 

    const columns = [ 
        { header: 'Category Name', accessorKey: 'name', 
        size: 250, maxSize: 300, canFilter: true },
        {
            header: 'Description', accessorKey: 'description', canFilter: true, 
            cell: (data) => (
                <div className='text-gray-500'>
                    {data.getValue()}
                </div>
            )
        },
        {
            header: 'Action', accessorKey: '', 
            size: 100, maxSize: 100, canFilter: false,
            cell: (data) => (
                <div className='flex gap-2 justify-center'>
                    <div
                        className='text-blue-500'>
                        <Link to={`${location.pathname}/${data?.row?.original?._id}`}>
                            <FilePenLine size={20} />
                        </Link>
                    </div>
                    <div
                        onClick={() => deleteHandler(data)}
                        className='text-red-500 cursor-pointer'>
                        <Trash2 size={20} />
                    </div>
                </div>
            )
        }
    ]; 

    useEffect(() => dispatch(getAllCategory()), []); 

    async function deleteItem() { 
        const id = localStorage.getItem('deletableItemID'); 
        try { 
            await axios({method: 'delete', url: `${config.baseUrl}/api/category/${id}`}); 
            dispatch(getAllCategory());
            toast('Deleted Successfully', {type: 'success'}); 
        } 
        catch (error) { 
            toast(error.message, {type: 'error'}); 
        } 
        finally { 
            localStorage.removeItem('deletableItemID'); 
        } 
    } 

    function deleteHandler(data) { 
        const { _id } = data.row.original; 
        localStorage.setItem('deletableItemID', _id); 
        onOpenModal(); 
    } 

    return ( 
        <div> 
            <div className='flex justify-between'> 
                <Breadcrumb name="Category" link="/dashboard/category" /> 

                <Link to="/dashboard/category/create">
                    <button 
                        className='add-new-btn'>
                        Add New
                    </button>
                </Link>
            </div> 

            <TableWrapper dataSet={categories || []} columns={columns} /> 

            <ConfirmModal open={isModalOpen} onCloseModal={onCloseModal} deleteItem={deleteItem} /> 
            <ToastMessageNotify /> 
        </div> 
    ) 
} 

export default Category; 