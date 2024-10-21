import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllFormFieldsPreview } from '@/redux/admin/actions/fields';
import { TailSpin } from 'react-loader-spinner';

const PreviewFormPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { previewedForm, isFetchingFormFields, error } = useSelector((state) => state.fields);

  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    dispatch(getAllFormFieldsPreview(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (previewedForm) {
      const initialValues = previewedForm.reduce((acc, field) => {
        const { attributesData = {} } = field;
        if (attributesData) {
          const { name = '', value = '' } = attributesData;
          if (name) {
            acc[name] = value;
          }
        }
        return acc;
      }, {});
      setFormValues(initialValues);
    }
  }, [previewedForm]);

  if (isFetchingFormFields) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' || type === 'radio' ? checked : value
    }));
  };

  const renderFormElement = (field, index) => {
    if (!field) return null;

    const { element, attributesData = {}, options = [] } = field;
    
    const {
      name = '',
      type = 'text',
      value = '',
      id = '',
      src = '',
      alt = '',
      className = ''
    } = attributesData || {}; 

    const commonProps = {
      key: index,
      className: `p-2 border border-gray-300 rounded ${className}`,
      name,
      id,
      type,
      value,
      src,
      alt
    };

    switch (element) {
      case 'label':
        return (
          <label
            htmlFor={id}
            className={`block ${commonProps.className}`}
            key={index}
          >
            {value || 'Label'}
          </label>
        );

      case 'input':
        return (
          <input
            {...commonProps}
            value={formValues[name] || ''}
            onChange={handleInputChange}
          />
        );

      case 'select':
        return (
          <select
            {...commonProps}
            value={formValues[name] || ''}
            onChange={handleInputChange}
          >
            {options.length > 0 ? (
              options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))
            ) : (
              <option value="">No options available</option>
            )}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            {...commonProps}
            value={formValues[name] || ''}
            onChange={handleInputChange}
          />
        );

      case 'button':
        return (
          <button
            {...commonProps}
            className='block bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {value || 'Button'}
          </button>
        );

      case 'checkbox':
        return (
          <label className="flex items-center">
            <input
              type="checkbox"
              {...commonProps}
              checked={formValues[name] || false}
              onChange={handleInputChange}
            />
            {value || ''}
          </label>
        );

      case 'radio':
        return (
          <div className="flex flex-wrap gap-2">
            {options.map((option, idx) => (
              <label key={idx} className="flex items-center">
                <input
                  type="radio"
                  {...commonProps}
                  value={option}
                  checked={formValues[name] === option}
                  onChange={handleInputChange}
                />
                {option}
              </label>
            ))}
          </div>
        );

      case 'file':
        return (
          <input
            type="file"
            {...commonProps}
            onChange={handleInputChange}
          />
        );

      case 'img':
        return (
          <img
            {...commonProps}
            src={src || ''}
            alt={alt || ''}
            className={`block mb-4 ${commonProps.className}`}
          />
        );

      default:
        return null;
    }
  };

  const renderFormFields = () => {
    if (!previewedForm || previewedForm.length === 0) return <p>No fields available.</p>;

    const gridItems = previewedForm
      .filter(field => field.element !== 'button') // Exclude buttons from grid
      .map((field, index) => {
        const element = renderFormElement(field, index);
        return (
          <div key={index} className="flex items-center">
            {element}
          </div>
        );
      });

    return (
      <div className="grid grid-cols-2 gap-4">
        {gridItems}
      </div>
    );
  };

  return (
    <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      {renderFormFields()}
      {/* Handle buttons separately */}
      <div className="mt-4">
        {previewedForm.map((field, index) => {
          if (field.element === 'button') {
            return renderFormElement(field, index);
          }
          return null;
        })}
      </div>
    </form>
  );
};

export default PreviewFormPage;
