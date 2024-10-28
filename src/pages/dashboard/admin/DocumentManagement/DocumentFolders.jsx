import React, { Children, useCallback, useEffect, useState } from 'react';
import {
  Input,
  Option,
  Select,
  Button,
  Switch
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import TableShimmer from '@/components/common/TableShimmer';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import DocumentForm from './DocumentForm';
import TitleComponent from '@/components/common/TitleComponent';
import { formatReadableDate, throttle } from '@/Helpers/globalfunctions';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { getAllDocuments, getFolderDocuments } from '@/redux/admin/actions/Document';
import HeaderTitle from '@/components/common/HeaderTitle';

const FolderDocuments = () => {
  const [openFile, setOpenFile] = useState(false);   // For file modal
  const [openFolder, setOpenFolder] = useState(false); // For folder modal
  const [selectedId, setSelectedId] = useState(null); // To store the ID of the item being edited
  const dispatch = useDispatch();
  const { isFetching, folderDocuments, isAdding } = useSelector((state) => state.document);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  // Function to toggle file modal with id
  const handleFileModal = (id = null, folderId) => {
    setSelectedId(id); // Set the selected id for file editing
    setOpenFile(!openFile);

  };

  const { folderId } = useParams()
  // Function to toggle folder modal with id

  const handleFileUploadFOrDoc = (folderId) => {
    // Set folderId in state
    console.log(folderId, "folderId");
    handleFileModal(null, folderId); // Pass folderId to handleFileModal
  };
  // Handle pagination
  const handlePageClick = (e) => {
    if (searchQuery !== "") {
      setSearchParams({ page: e.selected + 1, limit: 10, search: searchQuery });
    } else {
      setSearchParams({ page: e.selected + 1, limit: 10 });
    }
  };

  // Toggle document status
  const handleStatus = (form) => {
    const newStatus = !form.active;
    const data = {
      name: form.name,
      description: form.description,
      active: newStatus,
    };
    dispatch(updateStatus(form.documentId, data));
  };

  // Automatically fetch documents based on searchParams
  useEffect(() => {

    dispatch(getFolderDocuments(folderId));
  }, [dispatch]);

  useEffect(() => {
    if (!isAdding) {
      setOpenFile(false);
      setOpenFolder(false);
      setSelectedId(null);
    }
  }, [isAdding]);
  const breadcrumbData = [
    {
      name: 'Document Management',
      url: '/dashboard/admin/document-management',
      children: [{
        name: 'Folder Documents',
        url: '',
      }]
    }
  ];

  return (
    <div className='w-full mt-4'>
      <TitleComponent title={"CORPZO | Document Management"} />
      <HeaderTitle title="Document Files" totalCount={folderDocuments.length} />
      <Breadcrumb items={breadcrumbData} />
      {/* <div className='flex gap-4 justify-between items-center w-full mb-4 mt-4'>
        <div className='w-[20%]'>
          <Select label='Add Folder/File'>
            <Option onClick={() => handleFolderModal()}>Create Folder</Option>
            <Option onClick={() => handleFileModal()}>Add File</Option>
          </Select>
        </div>
      </div> */}

      <>
        {
          isFetching ? (
            <TableShimmer />
          ) : (
            <>
              {folderDocuments && folderDocuments.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        View
                      </th>
                      {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {folderDocuments && folderDocuments.map((form, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{form.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatReadableDate(form.createdAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <NavLink to={`/dashboard/admin/document-management/view-document/${form?.folderId}/${form?._id}`}>
                            <span className="text-sm text-gray-500">View</span>
                          </NavLink>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex justify-center items-center h-screen">
                  <img src="/img/nodata_svg.svg" className="w-[40%]" alt="No data found" />
                </div>
              )}
            </>
          )
        }
      </>

      {/* <DocumentForm open={openFile} handleOpen={handleFileModal} modalType="file" selectedId={selectedId}/>
      <DocumentForm open={openFolder} handleOpen={handleFolderModal} modalType="folder" selectedId={selectedId}/> */}
      {/* <DocumentForm open={openFile} handleOpen={handleFileModal} modalType="file" folderId={folderId} id={selectedId} />
      <DocumentForm open={openFolder} handleOpen={handleFolderModal} modalType="folder" id={selectedId} /> */}

    </div>
  );
};

export default FolderDocuments;
