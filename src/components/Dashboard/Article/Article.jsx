import React, { useEffect } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';
import { Trash2, FilePenLine, Check, Minus } from 'lucide-react';
import { format, parseISO } from 'date-fns'; 
import config from '../../../config';
import useModal from '../../../hooks/useModal';
import ToastMessageNotify from '../../../utills/Toast';
import ConfirmModal from '../../../utills/Modal/ConfirmModal';
import Breadcrumb from '../../../utills/Breadcrumb/Breadcrumb';
import { getOnlyMyArticles } from '../../../store/actions/articleAction';
import TableWrapper from '../../../utills/ReactTable/TableWrapper';

const Article = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const articles = useSelector(state => state?.articles?.myArticles);
    const { isModalOpen, onOpenModal, onCloseModal } = useModal();

    const columns = [ 
        { header: 'Title', accessorKey: 'title', canFilter: true }, 
        {
            header: "Categories", accessorKey: 'category', canFilter: false, 
            cell: (data) => {
                const items = data.getValue();
                if (items.length === 0) return null;

                return ( 
                    <div> 
                        <span 
                            className="inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-1 mr-2 text-purple-600 text-xs font-semibold" 
                        > 
                            {items[0]?.name} 
                        </span> 
                        { 
                            items[1]?.name && 
                            <span 
                                className="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-1 text-amber-600 text-xs font-semibold"> 
                                {items[1].name} 
                            </span> 
                        } 
                    </div> 
                ) 
            } 
        }, 
        {
            header: 'Publish', accessorKey: 'publish', 
            size: 100, maxSize: 100, canFilter: false, 
            cell: (data) => {
                const value = data.getValue(); 
                return ( 
                    <div> 
                    { 
                        value 
                            ? <Check color="#64db43" size="16" strokeWidth={3} />
                            : <Minus color="#fd6363" size="16" strokeWidth={2.75} />
                    } 
                    </div> 
                ) 
            } 
        }, 
        { 
            header: 'Created At', accessorKey: 'createdAt', canFilter: false, 
            cell: (data) => { 
                const value = data.getValue(); 
                const date = format(parseISO(value), "h:mm a - EEE MMM d, yyyy"); 
                return ( 
                    <span className='text-gray-500 text-sm  hover:font-[500]'> 
                        { date } 
                    </span> 
                ) 
            } 
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

useEffect(function () {
    dispatch(getOnlyMyArticles());
}, []);

async function deleteItem() {
    const id = localStorage.getItem('deletableItemID');
    try {
        await axios({ method: 'delete', url: `${config.baseUrl}/api/post/${id}` });
        dispatch(getOnlyMyArticles());
        toast('Deleted Successfully', { type: 'success' });
    }
    catch (error) {
        toast(error.message, { type: 'error' });
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
            <Breadcrumb name="Article" link="/dashboard/article" />

            <Link to="/dashboard/article/create">
                <button
                    className='add-new-btn'>
                    Add New
                </button>
            </Link>
        </div>

        <TableWrapper dataSet={articles || []} columns={columns} />

        <ToastMessageNotify />
        <ConfirmModal open={isModalOpen} onCloseModal={onCloseModal} deleteItem={deleteItem} />
    </div>
)
}

export default Article; 