// FormTable.jsx
import React, { useState } from 'react';

const 
FormTable = ({ data, renderActionColumn }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const Modal = ({ form }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
        <h2 className="font-bold text-lg mb-4">Form Details</h2>
        <p>Title: {form?.title}</p>
        <p>Status: {form?.isActive ? 'Active' : 'Inactive'}</p>
        {/* Add more details as needed */}
        <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={toggleModal}>Close</button>
      </div>
    </div>
  );

  function formatReadableDate(dateInput) {
    const date = new Date(dateInput);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  
  return (
    <>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Form Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Created At
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Updated At
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th scope="col"  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((form, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{form.title}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{formatReadableDate(form.createdAt)}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{formatReadableDate(form.updatedAt)}</div>
            </td>
            <td >
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${form.isActive === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {form.isActive === true ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              {renderActionColumn(form)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {isModalOpen && selectedForm && <Modal form={selectedForm} />}
    </>
  );
};

export default FormTable;