import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AllFormsTable from '../../../components/admin/AllFormsTable';
import { fetchAllForms } from '@/redux/admin/actions/form';
import { TailSpin } from 'react-loader-spinner';
import { setDescription,setTitle,setUrl } from '@/redux/admin/slices/form';



const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forms = useSelector((state) => state.forms.forms);
  const {isFormLoading} = useSelector((state) => state.forms);


  const renderActionColumn = (form) => (

    <div className="flex space-x-4">
    <button type="button" onClick={()=>navigateToPreviewForm(form)} className="text-green-500">Preview</button>
      <button type="button" onClick={()=>navigateToAddFieldsForm(form)} className="text-blue-500">Add</button>
      <button type="button" onClick={()=>navigateToEditForm(form)} className="text-blue-500">Edit</button>
      <button type="button" onClick={()=>navigateToDeleteForm(form)}  className="text-red-500">Delete</button>
    </div>
  );

  const navigateToPreviewForm = (form) => {
    navigate(`/dashboard/admin/preview-form/${form._id}`);
  };
  const navigateToAddFieldsForm = (form) => {
    navigate(`/dashboard/admin/formManagement/edit-fields/${form._id}`);
  };

  useEffect(() => {
    forms.length === 0 && 
    dispatch(fetchAllForms());
  }, [dispatch]);

  const navigateToCreateForm = () => {
      navigate('/dashboard/admin/formManagement/create-form');
  };
  const navigateToDeleteForm=(form)=>{
    navigate('/dashboard/admin/formManagement/delete-form',{
      state:{
        formId:form._id
      }
    }) 
  }

  const navigateToEditForm = (form) => {
    console.log(form);
    dispatch(setUrl(form.url));
    dispatch(setDescription(form.description));
    dispatch(setTitle(form.title));
    navigate('/dashboard/admin/formManagement/edit-form', {
      state: {
        initialForm: {
          formId:form._id,
          title: form.title,
          description: form.description,
          url: form.url,
        },
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4">
        <button type="button" onClick={navigateToCreateForm} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Create Form</button>
      </div>
      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-4">All Forms</h2>
        {isFormLoading?<TailSpin
          color="#000"
          height={80}
          width={80}
          timeout={3000}
        />:<AllFormsTable data={forms} renderActionColumn={renderActionColumn} />}
      </div>
    </div>
  );
};

export default Form;