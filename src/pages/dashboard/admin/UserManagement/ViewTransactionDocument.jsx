import DocumentViewer from '@/components/common/DocumnetViewr';
import HeaderTitle from '@/components/common/HeaderTitle';
import { viewInvoice } from '@/redux/admin/actions/UserManagement';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ViewTransactionDocument = () => {

  const { transactionId } = useParams();
  const dispatch = useDispatch();

  const { transactionUrl, isTransactionDocumentLoading } = useSelector((state) => state.userMgmt);

  useEffect(() => {
    dispatch(viewInvoice(transactionId));
  }, [transactionId])
  
  const breadcrumbData = [
    {
      name: 'User Management',
      url: "/dashboard/admin/usermanagement",
      children: [
        {
          name: 'View Invoice',
          url: '',
        },
      ],
    }
  ];
  return (
    <div>
      <Breadcrumb items={breadcrumbData} />
      <HeaderTitle title={"View Invoice"} />
      <DocumentViewer docUrl={transactionUrl} isLoading={isTransactionDocumentLoading} />
    </div>
  )
}

export default ViewTransactionDocument