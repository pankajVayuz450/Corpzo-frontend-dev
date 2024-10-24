import { getFolderDocumentsList } from '@/redux/admin/actions/Document';
import React, { useState, useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewDocument = () => {
  const [docUrl, setDocUrl] = useState('');
  const { docId } = useParams(); 
  const { folderDocuments } = useSelector((state) => state.document);
  console.log(folderDocuments, "folderDocuments")

  useEffect(() => {
    const foundDocument = folderDocuments.find(doc => doc._id === docId);
    console.log(foundDocument, "found document")
    if (foundDocument) {
      setDocUrl(foundDocument.url);
    }
  }, [folderDocuments, docId]);

  return (
    <div>
      {docUrl ? (
        <iframe
          src={docUrl}
          title="Document Viewer"
          width="100%"
          height="500px"
          frameBorder="0"
          allowFullScreen
        />
      ) : (
        <p>No document available to display.</p>
      )}
    </div>
  );
};

export default ViewDocument;
