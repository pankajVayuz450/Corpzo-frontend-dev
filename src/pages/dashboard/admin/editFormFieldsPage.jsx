import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFormFields, updateField } from '@/redux/admin/actions/fields';
import { setFormFields } from '@/redux/admin/slices/fields';

const EditForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const formId = location.state?.formId;
  const { formFields, isFetching, isUpdating, formInputs, subInputs } = useSelector(state => state.fields);
  console.log('formFields:', formFields);
  useEffect(() => {
    if (formId) {
      dispatch(getAllFormFields(formId));
    }
  }, [formId, dispatch]);

  const handleFieldChange = (index, fieldName, value) => {
    const updatedFields = [...formFields];
    updatedFields[index] = { ...updatedFields[index], [fieldName]: value };
    dispatch(setFormFields(updatedFields));
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedFields = [...formFields];
    updatedFields[index].options[optionIndex] = value;
    dispatch(setFormFields(updatedFields));
  };

  const addOption = (index) => {
    const updatedFields = [...formFields];
    updatedFields[index].options.push("");
    dispatch(setFormFields(updatedFields));
  };

  const removeOption = (index, optionIndex) => {
    const updatedFields = [...formFields];
    updatedFields[index].options.splice(optionIndex, 1);
    dispatch(setFormFields(updatedFields));
  };

  const handleSubmit = async (values) => {
    try { dispatch(updateField({ formId, fields: values.fields }));
      setIsFormSubmitted(true);
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  if (isFetching) {
    return <div className="flex justify-center items-center"><span>Loading...</span></div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Form</h1>
      <Formik
        initialValues={{ fields: formFields }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4">
            {values.fields.map((field, index) => (
              <div key={field.id} className="bg-white p-4 shadow-md rounded-lg space-y-4">
                <div className="flex space-x-4 items-center">
                  <Field
                    as="select"
                    name={`fields.${index}.type`}
                    className="p-2 border rounded w-1/2"
                    onChange={e => handleFieldChange(index, 'type', e.target.value)}
                  >
                    <option value="">Select Type</option>
                    {formInputs.map(input => (
                      <option key={input._id} value={input._id}>{input.typeName}</option>
                    ))}
                  </Field>
                  <Select
                    isMulti
                    name={`fields.${index}.attributes`}
                    className="w-1/2"
                    options={subInputs[index] ? subInputs[index].map(subInput => ({ value: subInput._id, label: subInput.attribute })) : []}
                    onChange={selectedOptions => handleFieldChange(index, 'attributes', selectedOptions.reduce((acc, attr) => {
                      acc[attr.value] = values.fields[index].attributes[attr.value] || '';
                      return acc;
                    }, {}))}
                    value={Object.keys(values.fields[index].attributes).map(attrId => ({
                      value: attrId,
                      label: subInputs[index]?.find(attr => attr._id === attrId)?.attribute
                    }))}
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => dispatch(setFormFields(values.fields.filter((_, i) => i !== index)))}
                  >
                    Remove Field
                  </button>
                </div>
                <div className="space-y-2">
                  {field.type === 'select' && (
                    <div className="flex flex-col space-y-2">
                      <label className="font-bold">Options (one per line):</label>
                      {field.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <textarea
                            name={`fields.${index}.options.${optionIndex}`}
                            value={option}
                            placeholder="Enter option..."
                            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => handleOptionChange(index, optionIndex, e.target.value)}
                          />
                          {field.options.length > 1 && (
                            <button
                              type="button"
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                              onClick={() => removeOption(index, optionIndex)}
                            >
                              Delete Option
                            </button>
                          )}
                        </div>
                      ))}
                      {field.options.length < 4 && (
                        <button
                          type="button"
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          onClick={() => addOption(index)}
                        >
                          Add Option
                        </button>
                      )}
                    </div>
                  )}
                  {Object.keys(field.attributes).length > 0 && (
                    <div className="space-y-2">
                      {Object.keys(field.attributes).map((attrKey, attrIndex) => (
                        <div key={attrIndex} className="flex items-center space-x-2">
                          <label className="w-1/3">{subInputs[index]?.find(attr => attr._id === attrKey)?.attribute}</label>
                          <Field
                            name={`fields.${index}.attributes.${attrKey}`}
                            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter value..."
                            onChange={e => handleFieldChange(index, `attributes.${attrKey}`, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                disabled={isUpdating}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {isFormSubmitted && (
        <div className="mt-4">
          <button
            type="button"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            onClick={() => navigate(`/dashboard/admin/preview-form/${formId}`)}
          >
            Preview Form
          </button>
        </div>
      )}
    </div>
  );
};

export default EditForm;
