import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle, setDescription } from '../../redux/admin/slices/form';
import 'tailwindcss/tailwind.css';
// Import Modal component if you're using a UI library or define your own

const FormCreationPage = () => {
  const dispatch = useDispatch();
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const handleTitleChange = (e) => {
    dispatch(setTitle(e.target.value));
  };

  const handleDescriptionChange = (e) => {
    dispatch(setDescription(e.target.value));
  };

  const handleOpenFirstModal = () => {
    setIsFirstModalOpen(true);
  };

  const handleFirstModalSubmit = () => {
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(true);
  };

  const handleCreateForm = () => {
    // Dispatch action to create form or perform API call
    setIsSecondModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">Create New Form</h1>
      <button onClick={handleOpenFirstModal} className="px-4 py-2 bg-blue-500 text-white rounded">Create Form</button>
      
      {isFirstModalOpen && (
        <div className="modal"> {/* Replace with actual modal component */}
          <form className="space-y-4">
            <button onClick={handleFirstModalSubmit}>Next</button>
          </form>
        </div>
      )}

      {isSecondModalOpen && (
        <div className="modal">
          <button onClick={handleCreateForm}>Create Form</button>
        </div>
      )}
    </div>
  );
};

export default FormCreationPage;