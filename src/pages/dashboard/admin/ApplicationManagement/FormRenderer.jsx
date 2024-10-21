import React, { useState } from 'react';

const FormRenderer = ({ formData }) => {
    const [formValues, setFormValues] = useState({});

    // Handle change for inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formValues);
        // Add your form submission logic here
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            {formData.data.map((item) => {
                const { element, attributesData, value, options } = item;

                switch (element) {
                    case 'input':
                        return (
                            <div key={item._id} className="mb-4">
                                <label htmlFor={attributesData.id} className="block text-gray-700 font-semibold mb-2">
                                    {attributesData.placeholder}
                                </label>
                                <input
                                    type="text"
                                    name={attributesData.id}
                                    id={attributesData.id}
                                    placeholder={attributesData.placeholder}
                                    value={formValues[attributesData.id] || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                                />
                            </div>
                        );

                    case 'label':
                        return (
                            <div key={item._id} className="mb-2">
                                <label className="block text-gray-700 font-semibold">{value}</label>
                            </div>
                        );

                    case 'select':
                        return (
                            <div key={item._id} className="mb-4">
                                <label htmlFor={attributesData.id} className="block text-gray-700 font-semibold mb-2">
                                    {attributesData.name}
                                </label>
                                <select
                                    name={attributesData.id}
                                    id={attributesData.id}
                                    value={formValues[attributesData.id] || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                                >
                                    {options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );

                    default:
                        return null;
                }
            })}

            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
            >
                Submit
            </button>
        </form>
    );
};

export default FormRenderer;
