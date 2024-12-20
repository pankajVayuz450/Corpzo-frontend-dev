import React from 'react';
import { FaSpinner } from 'react-icons/fa';

// Reusable Heading Component
const Heading = ({ text }) => {
  return <h1 className="text-left text-2xl font-bold mb-4">{text}</h1>;
};

// Reusable Paragraph Component
const Paragraph = ({ text }) => {
  return <p className="text-left text-sm text-gray-600">{text}</p>;
};

// Reusable Label Component
const Label = ({ labelText }) => {
  return <label className="block text-left text-gray-700 text-sm font-bold mb-2">{labelText}</label>;
};

// Reusable Textarea Component
const TextArea = ({ placeholder, value, onChange, error, touched,maxLength }) => {
  return (
    <div>
      <textarea
        className={`resize-none border rounded-md w-full h-28 p-2 text-gray-700 focus:outline-none focus:ring-2 ${
          touched && error ? 'border-red-500' : 'focus:ring-indigo-500'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
      {touched && error && <p className="text-red-500 text-xs mt-1">{error}</p>} {/* Display error based on touched */}
    </div>
  );
};

// Reusable Button Component
const Button = ({ buttonText, loading }) => {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      type="submit" // Keep type as submit for form submission
      disabled={loading} // Disable the button while loading
    >
      {loading ? (
        <FaSpinner className="animate-spin text-white text-xl inline" />
      ) : (
        buttonText
      )}
    </button>
  );
};

// Main Reusable Component
const ReusableForm = ({
  headingText,
  nameText,
  dateText,
  labelText,
  placeholderText,
  buttonText,
  handleSubmit,
  values,
  handleChange,
  errors,
  touched,
  loading
}) => {
  return (
    <form onSubmit={handleSubmit} className="p-4 w-full max-w-md mx-auto bg-white shadow-md rounded-md">
      <Heading text={headingText} />
      <Paragraph text={nameText} />
      <Paragraph text={dateText} />
      <Label labelText={labelText} />
      <TextArea
        placeholder={placeholderText}
        value={values.note}
        onChange={handleChange('note')}
        error={errors.note} // Pass error message for textarea
        touched={touched.note} // Pass touched state
        maxLength={600}
      />
      <div className="mt-4">
        <Button buttonText={buttonText} loading={loading} /> {/* Pass loading to Button */}
      </div>
    </form>
  );
};

export default ReusableForm;
