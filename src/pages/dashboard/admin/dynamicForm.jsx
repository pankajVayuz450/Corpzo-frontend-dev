import React, { useState } from 'react';
import FormModal from '@/components/admin/FormModal';

const DynamicForm = () => {
  const [fields, setFields] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentFieldType, setCurrentFieldType] = useState('');

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentFieldType('');
  };

  const addField = (field) => {
    setFields([...fields, { ...field, id: Date.now() }]);
    closeModal();
  };

  const handleInputChange = (id, value) => {
    setFields(fields.map(field => field.id === id ? { ...field, value } : field));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = fields.map(({ id, ...rest }) => rest);
    console.log('Form Data: ', JSON.stringify(formData, null, 2));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dynamic Form</h1>
      <div className="flex space-x-4 mb-4">
        <select
          value={currentFieldType}
          onChange={(e) => setCurrentFieldType(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">Select Field Type</option>
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="number">Number</option>
          <option value="select">Select</option>
          <option value="date">Date</option>
          <option value="media">Media</option>
        </select>
        <button
          onClick={openModal}
          disabled={!currentFieldType}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${!currentFieldType ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Add Field
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="flex flex-col space-y-2">
            <label className="font-bold">{field.label}</label>
            {field.type === 'text' && (
              <input
                type="text"
                placeholder={field.label}
                value={field.value || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
              />
            )}
            {field.type === 'email' && (
              <input
                type="email"
                placeholder={field.label}
                value={field.value || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
              />
            )}
            {field.type === 'password' && (
              <input
                type="password"
                placeholder={field.label}
                value={field.value || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
              />
            )}
            {field.type === 'number' && (
              <input
                type="number"
                placeholder={field.label}
                value={field.value || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
              />
            )}
            {field.type === 'select' && (
              <>
                <select
                  value={field.value || ''}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                >
                  <option value="">Select an option</option>
                  {field.options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </>
            )}
            {field.type === 'date' && (
              <input
                type="date"
                value={field.value || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
              />
            )}
            {field.type === 'media' && (
              <input
                type="file"
                onChange={(e) => handleInputChange(field.id, e.target.files[0])}
                className="border border-gray-300 p-2 rounded w-full"
              />
            )}
            {field.attributes && Object.keys(field.attributes).map((key, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <label className="font-semibold">{key}</label>
                <p className="text-gray-500 text-sm">{field.attributes[key]}</p>
              </div>
            ))}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Generated JSON:</h2>
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(fields.map(({ id, ...rest }) => rest), null, 2)}</pre>
      </div>
      {showModal && (
        <FormModal
          closeModal={closeModal}
          addField={addField}
          currentFieldType={currentFieldType}
        />
      )}
    </div>
  );
};

export default DynamicForm;
