import React, { useState, useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const ViewDocument = () => {
  const [docs, setDocs] = useState([]);

  // Function to handle local file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    console.log(file)
    if (file) {
        const fileName = file.name;
        const idxDot = fileName.lastIndexOf(".") + 1;
        const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        console.log(extFile, "extfile")
      const fileURL = URL.createObjectURL(file); // Create object URL for the local file
      console.log(fileURL); // Debugging the fileURL
      const newDoc = {
        uri: fileURL,
        fileType : extFile// Fallback to PDF if type is unknown
      }; 
      setDocs([...docs, newDoc]); // Add the new local file to the documents array
    }
  };

  // Log the documents array whenever it updates
  useEffect(() => {
    console.log(docs); // Debug the documents array
  }, [docs]);

  // For testing, you can uncomment this static document
  // useEffect(() => {
  //   const staticDoc = {
  //     uri: "https://www.example.com/sample.pdf", // Replace with a valid PDF URL for testing
  //     fileType: "application/pdf"
  //   };
  //   setDocs([staticDoc]); // Set the documents to include the static doc
  // }, []);

  return (
    <div>
      {/* File input to upload local files */}
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.ppt,.pptx" // Specify file types that DocViewer supports
      />

      {/* DocViewer to display documents */}
      <DocViewer
        className="h-100"
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        style={{ height: '500px' }} // Set a specific height for better visibility
      />
    </div>
  );
};

export default ViewDocument;
