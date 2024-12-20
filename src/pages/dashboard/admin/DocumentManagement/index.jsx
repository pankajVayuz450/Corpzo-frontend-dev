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
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { getAllDocuments, getAllFolders, getFolderDocuments } from '@/redux/admin/actions/Document';
import HeaderTitle from '@/components/common/HeaderTitle';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdEdit, MdGridView } from "react-icons/md";
import { IoIosAdd } from 'react-icons/io';
import { IoDocuments, } from "react-icons/io5";
import Pagination from '@/components/common/Pagination';
import SearchBoxNew from '@/components/common/SearchBoxNew';

const DocumentManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [openFile, setOpenFile] = useState(false);   // For file modal
  const [openFolder, setOpenFolder] = useState(false); // For folder modal
  const [selectedId, setSelectedId] = useState(null); // To store the ID of the item being edited
  
  const { isFetching, documentList, isAdding,totalCount } = useSelector((state) => state.document);
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

    dispatch(getAllFolders(limit, page, query));
    // dispatch(getAllDocuments(page, query))
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

  const handleViewAllDOcuments=()=>{
    navigate(`/dashboard/admin/document-management/all-documents`)
  }
  return (
    <div className='w-full mt-4'>
      <TitleComponent title={"CORPZO | Document Management"} />
      <HeaderTitle title="Document Management" totalCount={totalCount} />
      <Breadcrumb items={breadcrumbData} />

      <div className='flex gap-4 justify-between items-center w-full mb-4 mt-4'>
        <div>
          <Select label='Add Folder/File'>
            <Option onClick={() => handleFolderModal()}>Create Folder</Option>
            <Option onClick={() => handleFileModal()}>Add File</Option>
          </Select>
        </div>
        <div className='flex gap-4'>

        <Button onClick={handleViewAllDOcuments} className="flex items-center gap-3 bg-blue-500 hover:bg-blue-800">
          <IoDocuments className="w-5 h-5 text-inherit" />
          View All Documents
        </Button>
        <SearchBoxNew queryParam='search'/>
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

                          <Menu placement="bottom-end">
                            <MenuHandler>
                              <Button className="p-0 shadow-none bg-white text-black hover:text-gray-700">
                                <BsThreeDotsVertical size={20} />
                              </Button>
                            </MenuHandler>
                            <MenuList>
                              <MenuItem className='flex gap-4' onClick={form.folderId ? () => handleFolderModal(form.folderId) : () => handleFileModal(form.fileId)}>
                                <MdEdit/>
                                Edit
                              </MenuItem>
                              <MenuItem className='flex gap-4' onClick={() => handleFileUploadFOrDoc(form._id)}>
                              <IoIosAdd />
                                Add Document
                              </MenuItem>
                              <NavLink to={`/dashboard/admin/document-management/documents/${form._id}`}>
                                <MenuItem className='flex gap-4'>
                                <IoDocuments />
                                  View Documents
                                </MenuItem>
                              </NavLink>
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

      <Pagination totalItems={totalCount} itemsPerPage={10}/>

      {/* <DocumentForm open={openFile} handleOpen={handleFileModal} modalType="file" selectedId={selectedId}/>
      <DocumentForm open={openFolder} handleOpen={handleFolderModal} modalType="folder" selectedId={selectedId}/> */}
      <DocumentForm open={openFile} handleOpen={handleFileModal} modalType="file" folderId={folderId} id={selectedId} />
      <DocumentForm open={openFolder} handleOpen={handleFolderModal} modalType="folder" id={selectedId} />

    </div>
  );
};

export default DocumentManagement;
