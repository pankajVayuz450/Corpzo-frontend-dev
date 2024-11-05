import React, { useState } from 'react';

function FileUpload({ field }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="bg-gray-300 p-4 m-4 w-96 rounded-md flex flex-col">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">{field.lebel}</label>
      </div>

      <input
        type="file"
        onChange={handleFileChange}
        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />

      {/* Validation Message */}
      {field.isValidationRequired && !selectedFile && (
        <p className="text-red-800 text-xs">{field.custom_validation_msg}</p>
      )}
    </div>
  );
}

export default FileUpload;
