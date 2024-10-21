import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAttributeTypes, deleteInputTypes, deleteSubInputTypes, deleteValidFormElement, deleteValidFormElementAttributes, deleteValidFormElementTypes } from '@/redux/admin/actions/data';
import {toast} from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
const DeleteModal = ({ onCloseModal, data }) => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const {title,isDeleting,error}= useSelector((state) => state.data);
    const handleDelete = () => {
      const navigateOnSuccess = () => onCloseModal()
       if(title === 'Elements'){
        dispatch(deleteInputTypes({
            url: `${process.env.VITE_BASE_URL}/deleteFormInput`,
            data: {id: data.id},
        }))
        .unwrap()
      .then(() =>navigateOnSuccess())
    }
    else if(title === 'SubTypes'){
        dispatch(deleteSubInputTypes({
            url: `${process.env.VITE_BASE_URL}/deleteFormSubInput`,
            data: {id: data.id},
        }))
        .unwrap()
      .then(() =>navigateOnSuccess())
       
    }
    else if(title === 'Attributes'){
        dispatch(deleteAttributeTypes({
            url: `${process.env.VITE_BASE_URL}/deleteFieldAttribute`,
            data: {id: data.id},
        }))
        .unwrap()
      .then(() =>navigateOnSuccess())
       
    }
    else if(title === 'Valid Form Element'){
        dispatch(deleteValidFormElement({
            url: `${process.env.VITE_BASE_URL}/deleteValidFormElement`,
            data: {id: data.id},
        }))
        .unwrap()
      .then(() =>navigateOnSuccess())
       
    }
    else if(title==='Valid Form Element Types'){
      dispatch(deleteValidFormElementTypes({
          url: `${process.env.VITE_BASE_URL}/deleteValidFormElementType`,
          data: {id: data.id},
      }))
      .unwrap()
      .then(() =>navigateOnSuccess())

      
    }
    else if (title === 'Valid Form Element Attributes'){
      dispatch(deleteValidFormElementAttributes({
          url: `${process.env.VITE_BASE_URL}/deleteValidFormAttribute`,
          data: {id: data.id},
      }))
      .unwrap()
      .then(() =>navigateOnSuccess())
    }
    
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Item</h3>
        <p className="mt-2">Are you sure you want to delete this item? This action cannot be undone.</p>
       {isDeleting?<TailSpin
          color="#000"
          height={80}
          width={80}
          timeout={3000}
       /> :<div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={onCloseModal}
          >
            No
          </button>
        </div>}
      </div>
    </div>
  );
};

export default DeleteModal;