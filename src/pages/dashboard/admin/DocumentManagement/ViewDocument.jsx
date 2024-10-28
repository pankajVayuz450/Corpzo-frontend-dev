import { getFolderDocumentsList } from '@/redux/admin/actions/Document';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import React, { useState, useEffect, Children } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewDocument = () => {
  const [docUrl, setDocUrl] = useState('');
  const { folderId, docId } = useParams();
  const dispatch = useDispatch();
  const { folderDocuments, isFetching } = useSelector((state) => state.document);

  useEffect(() => {
    dispatch(getFolderDocumentsList(folderId));
  }, [dispatch, folderId]);

  useEffect(() => {
    if (!isFetching) {
      const foundDocument = folderDocuments.find(doc => doc._id === docId);
      if (foundDocument) {
        setDocUrl(foundDocument.url);
      }
    }
  }, [folderDocuments, docId, isFetching]);

  const getFileExtension = (url) => {
    return url.split('.').pop().toLowerCase();
  };

  const breadcrumbData = [
    {
      name: 'Document Management',
      url: '/dashboard/admin/document-management',
      children: [{
        name: 'View Document',
        url: '',
      }]
    }
  ];

  const renderDocument = () => {
    const fileExtension = getFileExtension(docUrl);
    switch (fileExtension) {
      case 'pdf':
        return (
          <iframe
            src={`https://docs.google.com/gview?url=${docUrl}&embedded=true`}
            title="PDF Document"
            width="100%"
            height="500px"
            frameBorder="0"
          ></iframe>
        );
      case 'xlsx':
      case 'xls':
        return (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${docUrl}`}
            title="Excel Document"
            width="100%"
            height="500px"
            frameBorder="0"
          ></iframe>
        );
      case 'ppt':
      case 'pptx':
        return (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${docUrl}`}
            title="PowerPoint Presentation"
            width="100%"
            height="500px"
            frameBorder="0"
          ></iframe>
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <img src={docUrl} alt="Document" style={{ width: '100%', height: 'auto' }} />;
      case 'mp4':
      case 'webm':
      case 'ogg':
        return (
          <video controls width="100%" height="auto">
            <source src={docUrl} type={`video/${fileExtension}`} />
            Your browser does not support the video tag.
          </video>
        );
      default:
        return <p>Unsupported file type</p>;
    }
  };

  return (
    <div>
      <Breadcrumb items={breadcrumbData} />
      {isFetching ? (
        <div className="flex justify-center items-center min-h-screen">
          <TailSpin height={50} width={50} color="blue" />
        </div>
      ) : docUrl ? (
        renderDocument()
      ) : (
        <p>No document available to display.</p>
      )}
    </div>
  );
};

export default ViewDocument;
