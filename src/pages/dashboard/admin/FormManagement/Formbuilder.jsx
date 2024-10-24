import formAPIs from '@/constants/APIList/formAPIs';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormField from './FormField'; // Import the new FormField component
import formInputFields from '@/constants/APIList/formInputFields';

function Formbuilder() {
  const params = useParams();
  const formId = params.id;
  const [formDetails, setFormDetails] = useState(null);
  const [formDetailsLoading, setFormDetailsLoading] = useState(false);

  // State to handle dynamic form fields
  const [formFields, setFormFields] = useState([]);
  const [availableElements, setAvailableElements] = useState([]);

  console.log("Formbuilder formFields[]:",formFields);
  

  useEffect(() => {
    const getFormDetails = async () => {
      try {
        setFormDetailsLoading(true);
        const response = await axios.get(`${formAPIs.getFormById}/${formId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setFormDetails(response.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setFormDetailsLoading(false);
      }
    };
    getFormDetails();
  }, [formId]);

  // Fetch available form elements from an API
  useEffect(() => {
    const fetchFormElements = async () => {
      try {
        const response = await axios.get(formInputFields.getAllInputs, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setAvailableElements(response.data?.data || []);
      } catch (error) {
        console.log('Error fetching form elements', error);
      }
    };
    fetchFormElements();
  }, []);

  // Add a new form field
  const addFormField = () => {
    setFormFields([...formFields, { element: '', subType: '', attributes: [] }]);
  };

  // Remove a form field
  const removeFormField = (index) => {
    const updatedFields = formFields.filter((_, i) => i !== index);
    setFormFields(updatedFields);
  };

  // Handle field updates (element, sub-type, and attributes)
  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][key] = value;
    setFormFields(updatedFields);
  };

  // Create form button handler
  const createForm = async () => {
    try {
      const formData = {
        formId: formDetails.id, // Assuming you have formId available
        fields: formFields, // This contains the element, sub-type, and attributes
      };
      console.log('Form data to be sent:', formData); // Log data before sending

      // Send form data to the API
      const response = await axios.post(formAPIs.createForm, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.status === 200) {
        console.log('Form created successfully:', response.data);
        // Handle success (e.g., show success message or navigate to another page)
      } else {
        console.log('Failed to create form:', response);
      }
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  if (formDetailsLoading) return <h1>Loading form details...</h1>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Form Builder</h1>

      {formDetails ? (
        <div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Title: {formDetails.title}</h2>
            <p className="text-gray-700 mb-4">Description: {formDetails.description}</p>
            <p className="text-gray-500 text-xs">Created At: {formatReadableDate(formDetails.createdAt)}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 my-4">
            <h3 className="text-lg font-semibold mb-4">Dynamic Form Fields</h3>

            {formFields.map((field, index) => (
              <FormField
                key={index}
                index={index}
                fieldData={field}
                onFieldChange={handleFieldChange}
                onRemoveField={removeFormField}
                availableElements={availableElements}
              />
            ))}

            <button
              onClick={addFormField}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Field
            </button>

            <button
              onClick={createForm}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Create Form
            </button>
          </div>
        </div>
      ) : (
        <p>Form is not Active</p>
      )}
    </div>
  );
}

export default Formbuilder;