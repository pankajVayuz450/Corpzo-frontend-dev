import React, { useCallback, useEffect, useState } from 'react';
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
import { useSearchParams } from 'react-router-dom';
import { getAllDocuments } from '@/redux/admin/actions/Document';

const DocumentManagement = () => {
  const [openFile, setOpenFile] = useState(false);   // For file modal
  const [openFolder, setOpenFolder] = useState(false); // For folder modal
  const [selectedId, setSelectedId] = useState(null); // To store the ID of the item being edited
  const dispatch = useDispatch();
  const { isFetching, documentList } = useSelector((state) => state.document);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to toggle file modal with id
  const handleFileModal = (id = null) => {
    setSelectedId(id); // Set the selected id for file editing
    setOpenFile(!openFile);
  };

  // Function to toggle folder modal with id
  const handleFolderModal = (id) => {
    console.log(id, "id a rahi hai yar")
    setSelectedId(id); // Set the selected id for folder editing
    setOpenFolder(!openFolder);
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
    const query = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;

    setSearchQuery(query);

    dispatch(getAllDocuments(limit, page, query));
  }, [searchParams, dispatch]);

  const throttledSearch = useCallback(throttle(() => {
    const regex = /^[a-zA-Z0-9 ]*$/;
    if (searchQuery === "") {
      toast.warn("Search cannot be empty");
      return;
    } else if (searchQuery.trim() === "") {
      toast.warn("Search cannot be just spaces");
      return;
    } else if (!regex.test(searchQuery)) {
      toast.warn("Special characters are not allowed");
      return;
    } else if (searchQuery !== "" && searchQuery.length > 50) {
      toast.warn("Search term cannot be more than 50 characters long");
      return;
    } else if (searchQuery.length < 3) {
      toast.warn("Search cannot be less than 3 characters");
      return;
    } else {
      setSearchParams({ search: searchQuery });
    }
  }, 500), [searchQuery, dispatch, setSearchParams]);

  const handleSearch = () => {
    throttledSearch();
  };

  const breadcrumbData = [
    {
      name: 'Document Management',
      url: '/dashboard/admin/document-management',
    }
  ];

  return (
    <div className='w-full mt-4'>
      <TitleComponent title={"CORPZO | Document Management"} />
      <Breadcrumb items={breadcrumbData} />

      <div className='flex gap-4 justify-between items-center w-full mb-4 mt-4'>
        <div className='w-[20%]'>
          <Select label='Add Folder/File'>
            <Option onClick={() => handleFolderModal()}>Create Folder</Option>
            <Option onClick={() => handleFileModal()}>Add File</Option>
          </Select>
        </div>
        <div className="w-[30%]">
          <Input
            size="sm"
            placeholder="Search..."
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
      </div>

      <>
        {
          isFetching ? (
            <TableShimmer />
          ) : (
            <>
              {documentList && documentList.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Folder/File Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documentList && documentList.map((form, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{form.folderName}</div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatReadableDate(form.createdAt)}</div>
                        </td>
                        <td className="h-full">
                          <div className="flex justify-start items-center h-full">
                            <span className="inline-flex text-xs leading-5 font-semibold">
                              <Switch checked={form.active} onChange={() => handleStatus(form)} />
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={form.folderId ? () => handleFolderModal(form.folderId) : () => handleFileModal(form.fileId)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex justify-center items-center h-screen">
                  <img src="/img/Nodata.svg" className="w-[40%]" alt="No data found" />
                </div>
              )}
            </>
          )
        }
      </>

      {/* <DocumentForm open={openFile} handleOpen={handleFileModal} modalType="file" selectedId={selectedId}/>
      <DocumentForm open={openFolder} handleOpen={handleFolderModal} modalType="folder" selectedId={selectedId}/> */}
      <DocumentForm open={openFile} handleOpen={handleFileModal} modalType="file" id={selectedId} />
      <DocumentForm open={openFolder} handleOpen={handleFolderModal} modalType="folder" id={selectedId} />

    </div>
  );
};

export default DocumentManagement;
