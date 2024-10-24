import React, { useCallback, useEffect, useState } from 'react';
import {
  Input,
  Option,
  Select,
  Button,
  Switch,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import TableShimmer from '@/components/common/TableShimmer';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import DocumentForm from './DocumentForm';
import TitleComponent from '@/components/common/TitleComponent';
import { formatReadableDate, throttle } from '@/Helpers/globalfunctions';
import { NavLink, useSearchParams } from 'react-router-dom';
import { getAllDocuments } from '@/redux/admin/actions/Document';
import HeaderTitle from '@/components/common/HeaderTitle';
import { BsThreeDotsVertical } from 'react-icons/bs'; 

const DocumentManagement = () => {
  const [openFile, setOpenFile] = useState(false);   // For file modal
  const [openFolder, setOpenFolder] = useState(false); // For folder modal
  const [selectedId, setSelectedId] = useState(null); // To store the ID of the item being edited
  const dispatch = useDispatch();
  const { isFetching, documentList, isAdding } = useSelector((state) => state.document);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [folderId, setFolderId] = useState(null)
  // Function to toggle file modal with id
  const handleFileModal = (id = null, folderId) => {
    setSelectedId(id); // Set the selected id for file editing
    setOpenFile(!openFile);
    setFolderId(folderId)
  };

  // Function to toggle folder modal with id
  const handleFolderModal = (id) => {
    console.log(id, "id a rahi hai yar")
    const data = documentList.find((document) => document.folderId === id);
    console.log(data, "doc data")
    setSelectedId(id); // Set the selected id for folder editing
    setOpenFolder(!openFolder);
  };

  const handleFileUploadFOrDoc = (folderId) => {
    setFolderId(folderId); // Set folderId in state
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
    const query = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;

    setSearchQuery(query);

    dispatch(getAllDocuments(limit, page, query));
  }, [searchParams, dispatch]);
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
    }
  ];

  return (
    <div className='w-full mt-4'>
      <TitleComponent title={"CORPZO | Document Management"} />
      <HeaderTitle title="Document Management" totalCount={documentList.length}/>
      <Breadcrumb items={breadcrumbData} />

      <div className='flex gap-4 justify-between items-center w-full mb-4 mt-4'>
        <div className='w-[20%]'>
          <Select label='Add Folder/File'>
            <Option onClick={() => handleFolderModal()}>Create Folder</Option>
            <Option onClick={() => handleFileModal()}>Add File</Option>
          </Select>
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
                        Folder Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created Date
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
                        <td className="px-6 py-4">
                         
                           <Menu>
                          <MenuHandler>
                            <Button className="p-0 shadow-none bg-white text-black hover:text-gray-700">
                              <BsThreeDotsVertical size={20} />
                            </Button>
                          </MenuHandler>
                          <MenuList>
                            <MenuItem onClick={form.folderId ? () => handleFolderModal(form.folderId) : () => handleFileModal(form.fileId)}>
                              Edit
                            </MenuItem>
                            <MenuItem onClick={() => handleFileUploadFOrDoc(form._id)}>
                              Add Document  
                            </MenuItem>
                            <MenuItem>
                              <NavLink to={`/dashboard/admin/document-management/documents/${form._id}`}>
                                View Documents
                              </NavLink>
                            </MenuItem>
                          </MenuList>
                        </Menu>
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
      <DocumentForm open={openFile} handleOpen={handleFileModal} modalType="file" folderId={folderId} id={selectedId} />
      <DocumentForm open={openFolder} handleOpen={handleFolderModal} modalType="folder" id={selectedId} />

    </div>
  );
};

export default DocumentManagement;
