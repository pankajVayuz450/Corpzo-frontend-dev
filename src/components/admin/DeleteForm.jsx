import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteForm } from '@/redux/admin/actions/form';
import { TailSpin } from 'react-loader-spinner';

const DeleteFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const formId = location.state?.formId;
  const {isFormDeleting} = useSelector((state) => state.forms);

  const handleDelete = (formId) => {
    dispatch(deleteForm(formId))
    .unwrap()
    .then(()=>{
        navigate('/dashboard/admin/formManagement')
    })
  };

  if (!formId) {
    return <div>No form selected for deletion.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Delete Confirmation</h2>
        <p className="mb-5">You are about to delete a form. This action cannot be undone. Are you sure you want to proceed?</p>
        {isFormDeleting?<TailSpin
          color="#4F46E5"
          height={80}
          width={80}
        />:<div className="flex justify-between">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={()=>handleDelete(formId)}
          >
            Yes, Delete it
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate(-1)}
          >
            No, Go Back
          </button>
        </div>}
      </div>
    </div>
  );
};

export default DeleteFormPage;