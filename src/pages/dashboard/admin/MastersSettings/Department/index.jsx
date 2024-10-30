import React, { useCallback, useEffect, useState } from 'react';
import {
  Input,
  Switch,
} from "@material-tailwind/react";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { getAllDepartments, updateStatus } from '@/redux/admin/actions/MasterSettings/Department';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import TitleComponent from '@/components/common/TitleComponent';
import TableShimmer from '@/components/common/TableShimmer';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import { CiSearch } from "react-icons/ci";
import { toast } from 'react-toastify';
import { MdClear } from "react-icons/md";
import { throttle } from '@/Helpers/globalfunctions';
import { updateEditPage } from '@/redux/admin/slices/MasterSettings/DepartmentSlice/departmentSlice';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import Pagination from '@/components/common/Pagination';
import SearchBoxNew from '@/components/common/SearchBoxNew';
import HeaderTitle from '@/components/common/HeaderTitle';
const Department = () => {

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { departmentList, isFetching, totalCount, totalPages, isStatusLoading } = useSelector((state) => state.department);
  const navigate = useNavigate();

  // Handle edit department action
  const handleEdit = (id) => {
    navigate(`/dashboard/admin/masterSettings/Department/edit-department/${id}`);
    dispatch(updateEditPage(searchParams.get("page") || 1));
  };

  // Toggle department status
  const handleStatus = (form) => {
    const newStatus = !form.active;
    const data = {
      name: form.name,
      description: form.description,
      active: newStatus,
    };
    dispatch(updateStatus(form.departmentId, data));
  };

  // Automatically fetch departments based on searchParams
  useEffect(() => {
    const query = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;

    dispatch(getAllDepartments(page, limit, query));
  }, [searchParams, dispatch]);


  const breadcrumbData = [
    {
          name: 'Master Settings',
          children: [
            {
              name: 'Department',
              url: '/dashboard/admin/masterSettings/Department',
            },
          ],
    }
  ];
  return (
    <div className='w-full h-full mt-4'>
       <Breadcrumb items={breadcrumbData}/>
      <TitleComponent title={"CORPZO | Department Management"}></TitleComponent>
      <HeaderTitle title={"Department Management"} totalCount={totalCount}/>
      <div className='flex gap-4 justify-between items-center w-full mb-4'>
        <NavLink to="/dashboard/admin/masterSettings/Department/add-department" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Create Department
        </NavLink>
        <SearchBoxNew queryParam='search' />

      </div>

      {isFetching ? (
        <TableShimmer />
      ) : (
        <div className=''>
          {departmentList && departmentList.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sr. No
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
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
                {departmentList && departmentList.map((form, index) => {
                  const idx = ((parseInt(searchParams.get("page") || 1) - 1) * parseInt(searchParams.get("limit") || 10)) + (index + 1);
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{idx}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{form.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {form.description.length > 6 ? `${form.description.substring(0, 9)}...` : form.description}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatReadableDate(form.createdAt)}</div>
                      </td>
                      <td>
                      <Switch disabled={isStatusLoading} checked={form.active} onChange={() => handleStatus(form)} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button onClick={() => handleEdit(form.departmentId)} className="text-blue-500 hover:text-blue-700">
                            Edit
                          </button>
                          {/* <Switch disabled={isStatusLoading} checked={form.active} onChange={() => handleStatus(form)} /> */}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <img src="/img/nodata_svg.svg" className="w-[50%]" alt="No data found" />
            </div>
          )}
        </div>
      )}

      {/* {!isFetching && totalCount > 10 && (
        <ReactPaginate
          className=""
          previousLabel={
            departmentList.length > 0 ? (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="border border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md m-2"
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
            ) : null
          }
          nextLabel={
            totalCount > 0 ? (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className=" border border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md m-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            ) : null
          }
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={3}
          pageRangeDisplayed={4}
          onPageChange={handlePageClick}
          forcePage={Number(searchParams.get("page")) ? Number(searchParams.get("page")) - 1 : 0}
          containerClassName={"flex items-center justify-center mt-3 mb-4"}
          pageClassName={
            "block border border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md m-2"
          }
          pageLinkClassName={"page-link"}
          previousClassName={
            Number(searchParams.get("page")) === 1 || !searchParams.get("page")
              ? "page-item opacity-50 pointer-events-none" 
              : "page-item"
          }
          previousLinkClassName={"page-link"}
          nextClassName={
            Number(searchParams.get("page")) === totalPages
              ? "page-item opacity-50 pointer-events-none" 
              : "page-item"
          }
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"bg-blue-500 text-white"}
        />
      )} */}
      {!isFetching && totalCount > 10 && <Pagination totalItems={totalCount} itemsPerPage={10}></Pagination>}



    </div>
  );
};

export default Department;
