import React, { useEffect, useState } from 'react';
import {
  Input,
  Switch,
} from "@material-tailwind/react";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllActiveCategories, getAllSubCategories } from '@/redux/admin/actions/MasterSettings/subCategory';
import { updateStatus } from '@/redux/admin/actions/MasterSettings/subCategory';
import ReactPaginate from 'react-paginate';
import TableShimmer from '@/components/common/TableShimmer';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import TitleComponent from '@/components/common/TitleComponent';
import { CiSearch } from "react-icons/ci";
import { toast } from 'react-toastify';
import { useCallback } from 'react';
import { MdClear } from 'react-icons/md';
import { updateEditPage } from '@/redux/admin/slices/MasterSettings/subCategorySlice/aubCategorySlice';
import { throttle } from '@/Helpers/globalfunctions';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import SearchBoxNew from '@/components/common/SearchBoxNew';
import Pagination from '@/components/common/Pagination';
import HeaderTitle from '@/components/common/HeaderTitle';
const Category = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isInitial, setIsInitial] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const subCategoryList = useSelector((state) => state.subCategory.subCategoryList)
  const totalRecords = useSelector((state) => state.subCategory.totalCount)
  const isFetching = useSelector((state) => state.subCategory.isFetching)
  const isStatusLoading = useSelector((state) => state.subCategory.isStatusLoading)
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleEdit = id => {

    navigate(`/dashboard/admin/masterSettings/Sub-Category/edit-sub-category/${id}`);
    dispatch(updateEditPage(searchParams.get("page") || 1));
  };

  useEffect(() => {
    const query = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;

    setSearchQuery(query);

    dispatch(getAllSubCategories(limit, page, query));
  }, [searchParams, dispatch]);

  const handleStatus = (form) => {
    // Toggle the status
    const newStatus = !form.active;
    const data = {
      subSectionTitle: form.subSectionTitle,
      sectionId: form.sectionId,
      sectionTitle: form.sectionTitle,
      active: newStatus,
      createdBy: "6f8e254d-0d1d-4f36-8d8c-52c61c4aeb4b"
    }
    dispatch(updateStatus(form.subCategoryId, data, navigate));
  };



  const breadcrumbData = [
    {
      
        
          name: 'Master Settings',
          children: [
            {
              name: 'Sub Category',
              url: '/dashboard/admin/masterSettings/Sub-Category',
            },
          ],
    }
  ];
  return (

    <div className='w-full mt-4'>
      <Breadcrumb items={breadcrumbData}/>
      <TitleComponent title={"CORPZO | Sub Category"}></TitleComponent>
      <HeaderTitle title={"Sub Category Management"} totalCount={totalRecords}/>
      <div className='flex gap-4 justify-between items-center w-full mb-4'>
        <NavLink to="/dashboard/admin/masterSettings/Sub-Category/add-sub-category" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Create Sub Category
        </NavLink>
        <SearchBoxNew queryParam='search' />
      </div>
      {isFetching ? (
        <TableShimmer />
      ) : (

        <>
          {
            subCategoryList && subCategoryList.length > 0 ?
              (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sr. No
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sub Category Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
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
                    {subCategoryList.map((form, index) => {
                       const idx = ((parseInt(searchParams.get("page") || 1) - 1) * parseInt(searchParams.get("limit") || 10)) + (index + 1);

                      return (
                      
                      <tr key={index}>
                       
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{idx}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{form.sectionTitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{form.subSectionTitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatReadableDate(form.createdAt)}</div>
                        </td>
                        <td >
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${form.active === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {form.active === true ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {/* {renderActionColumn(form)} */}
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(form.subCategoryId)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              Edit
                            </button>
                            <Switch disabled={isStatusLoading} checked={form.active} onChange={() => { handleStatus(form) }} />
                          </div>
                        </td>
                      </tr>
                    )})}
                  </tbody>

                </table>
              ) : (

                <div className="flex justify-center items-center h-screen">
                  <img src="/img/nodata_svg.svg" className="w-[50%]" alt="No data found" />
                </div>
              )
          }
        </>

      )}


      {/* {!isFetching && totalRecords > 10 && (
        <ReactPaginate
          className=""
          previousLabel={
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`border border-solid border-lightGray w-10 h-10 flex items-center justify-center rounded-md m-2 ${Number(searchParams.get('page')) <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-lightGray"
                  }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          }
          nextLabel={
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`border border-solid border-lightGray w-10 h-10 flex items-center justify-center rounded-md m-2 ${Number(searchParams.get('page')) >= totalRecords / 10 ? "opacity-50 cursor-not-allowed" : "hover:bg-lightGray"
                  }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          }
          breakLabel={"..."}
          pageCount={totalRecords / 10}
          marginPagesDisplayed={3}
          pageRangeDisplayed={4}
          onPageChange={handlePageClick}
          forcePage={Number(searchParams.get('page')) ? Number(searchParams.get('page')) - 1 : 0}
          containerClassName={"flex items-center justify-center mt-3 mb-4"}
          pageClassName={"block border border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md m-2"}
          activeClassName={"bg-blue-500 text-white"}
        />
      )} */}
          {!isFetching && totalRecords > 10 && <Pagination totalItems={totalRecords} itemsPerPage={10}></Pagination>}


    </div>

    
  );
}

export default Category;
