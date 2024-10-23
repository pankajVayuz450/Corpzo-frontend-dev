import React from 'react';

const FileDownloader = ({ fileUrl }) => {
  // Function to trigger the file download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;  // Set the file URL
    link.download = fileUrl.split('/').pop();  // Extract the file name from the URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

//   console.log("check file url",fileUrl)

  return (
    <button
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      onClick={handleDownload}
    >
      Download File
    </button>
  );
};

export default FileDownloader;
