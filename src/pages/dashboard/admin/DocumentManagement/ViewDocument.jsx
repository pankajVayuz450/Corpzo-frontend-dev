// src/pages/ViewDocument.js
import HeaderTitle from '@/components/common/HeaderTitle';
import { getFolderDocumentsList } from '@/redux/admin/actions/Document';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DocumentViewer from '@/components/common/DocumnetViewr';

const ViewDocument = () => {
  const [docUrl, setDocUrl] = useState('');
  const { folderId, docId } = useParams();
  const [docName, setDocName] = useState('');
  const dispatch = useDispatch();
  const { folderDocuments, isFetching } = useSelector((state) => state.document);

  useEffect(() => {
    dispatch(getFolderDocumentsList(folderId));
  }, [dispatch, folderId]);

  useEffect(() => {
    if (!isFetching) {
      const foundDocument = folderDocuments.find((doc) => doc._id === docId);
      if (foundDocument) {
        setDocUrl(foundDocument.url);
        setDocName(foundDocument.name);
      }
    }
  }, [folderDocuments, docId, isFetching]);

  const breadcrumbData = [
    {
      name: 'Document Management',
      url: '/dashboard/admin/document-management',
      children: [
        {
          name: 'View Document',
          url: '',
        },
      ],
    },
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbData} />
      <HeaderTitle title="View Document" />
      <DocumentViewer docUrl={docUrl} docName={docName} isLoading={isFetching} />
    </div>
  );
};

export default ViewDocument;
