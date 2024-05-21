import React from 'react';
import { X, Trash2 } from 'lucide-react'; 
import './modal.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const ConfirmModal = ({ open, onCloseModal, deleteItem }) => {
    return (
        <Modal
            center
            open={open}
            onClose={onCloseModal}
            closeIcon={<X color="#5b5757" />}
            classNames={{modal: 'customModal'}}> 

            <div className='my-3 flex flex-col justify-center items-center w-[275px]'> 
                <Trash2 size={48} color="#f53838" />
                <h1 className='text-xl font-bold mt-4 mb-2'>
                    Confirm Delete 
                </h1> 
                <p className='text-center'>
                    Are you sure you want to <br /> delete this item?
                </p> 

                <div className='flex gap-3 mt-4'>
                    <button
                        className='btn btn-danger'
                        onClick={() => { 
                            deleteItem(); 
                            onCloseModal(); 
                        }}> 
                        <Trash2 size={20} color="white" />
                        Delete
                    </button>
                    <button 
                        className='btn btn-light' 
                        onClick={onCloseModal}>
                        Cancel
                    </button> 
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmModal; 