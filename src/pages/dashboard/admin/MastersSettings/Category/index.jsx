import React, { useCallback, useEffect, useState } from 'react';
import {
  Input,
  Switch
} from "@material-tailwind/react";
import ReusableTable from "@/components/common/Tables";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { getAllCategories, deleteCategory, updateStatus } from '@/redux/admin/actions/MasterSettings/Category';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import TitleComponent from '@/components/common/TitleComponent';
import TableShimmer from '@/components/common/TableShimmer';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import { CiSearch } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { toast } from 'react-toastify';
import { throttle } from '@/Helpers/globalfunctions';
import { updateEditPage } from '@/redux/admin/slices/MasterSettings/CategorySlice/categorySlice';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import Pagination from '@/components/common/Pagination';
import SearchBoxNew from '@/components/common/SearchBoxNew';
const Category = () => {

  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useSelector((state) => state.category.categoryList);
  const totalCount = useSelector((state) => state.category.totalCount)
  const isFetching = useSelector((state) => state.category.isFetching)
  const isStatusLoading = useSelector((state) => state.category.isStatusLoading)
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();
  const handleEdit = id => {
    navigate(`/dashboard/admin/masterSettings/Category/edit-category/${id}`);
    dispatch(updateEditPage(searchParams.get("page") || 1));
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const query = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;

    setSearchQuery(query);

    dispatch(getAllCategories(limit, page, query));

  }, [searchParams, dispatch]);

  const handleStatus = (form) => {
    const newStatus = !form.active;
    const data = {
      categoryName: form.categoryName,
      active: newStatus,
    }
    dispatch(updateStatus(form.categoryId, data, navigate));
  };

  const handlePageClick = (e) => {
    if (searchQuery !== "") {
      setSearchParams({ page: e.selected + 1, limit: 10, search: searchQuery });
    } else {
      setSearchParams({ page: e.selected + 1, limit: 10 })
    }
  }

  const handleClearFilter = () => {
    setSearchQuery('');
    setSearchParams({});
    setSearchQuery('')
  };


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
    } else if (searchQuery.length > 50) {
    } else if (searchQuery.length < 3) {
      toast.warn("Search must be at least 3 characters long");
      return;
    } else if (searchQuery.length > 50) {
      toast.warn("Search query cannot be more than 50 characters long");
      return;
    }

    setIsSearching(true);
    setSearchParams({ search: searchQuery });

    if (!isFetching) {
      setIsSearching(false)
    }
  }, 1000), [searchQuery, dispatch, setSearchParams]);

  const handleSearch = () => {
    setIsSearching(true)
    throttledSearch();
  };

  const breadcrumbData = [
    {


      name: 'Master Settings',
      children: [
        {
          name: 'Category',
          url: '/dashboard/admin/masterSettings/Category',
        },
      ],
    }
  ];
  return (
    <div className='w-full'>
      <Breadcrumb items={breadcrumbData} />
      <TitleComponent title={"CORPZO | Category"} />
      <div className='flex gap-4 justify-between items-center w-full mb-4'>
        <NavLink to="/dashboard/admin/masterSettings/Category/add-category" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Create Category
        </NavLink>
        {/* <div className='w-[30%] flex gap-4 justify-end items-center mb-4'>
          <div className="flex items-center justify-center relative">
            <Input
              size="sm"
              placeholder="Search..."
              className="!border-t-blue-gray-200 focus:!border-t-gray-500 w-full"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              value={searchQuery}
              maxLength={30}
            />
            <span className='absolute right-2'><button>
              <CiSearch />
            </button></span>
          </div>
          {(searchParams.get("search") && searchParams.get("search") !== "" || null) && <button onClick={handleClearFilter}>
            <MdClear />
          </button>}
        </div> */}
        <SearchBoxNew queryParam='search' />

      </div>
      <>
        {
          isFetching ? (
            <TableShimmer />
          ) : (
            <>
              {data && data.length > 0 ? (
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
                    {data && data.map((form, index) => {
                      const idx = ((parseInt(searchParams.get("page") || 1) - 1) * parseInt(searchParams.get("limit") || 10)) + (index + 1);
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{idx}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{form.categoryName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{formatReadableDate(form.createdAt)}</div>
                          </td>
                          <td className="h-full">
                            <div className="flex justify-center items-center h-full">
                              <span className="inline-flex text-xs leading-5 font-semibold">
                                <Switch disabled={isStatusLoading} checked={form.active} onChange={() => handleStatus(form)} />
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {/* {renderActionColumn(form)} */}
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(form.categoryId)}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                <>
                  <div className="flex justify-center items-center h-screen">
                    <img src="/img/nodata_svg.svg" className="w-[50%]" alt="No data found" />
                  </div>
                </>
              )}
            </>
          )
        }

      </>
      {/* {!isFetching && totalCount > 10 && (
        <ReactPaginate
          className=""
          previousLabel={
            data.length > 0 ? (
              <span
                className={`${!searchParams.get("page") || searchParams.get("page") === "1"
                    ? "cursor-not-allowed opacity-50"
                    : "border border-solid border-lightGray hover:bg-lightGray"
                  } w-10 h-10 flex items-center justify-center rounded-md m-2`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  viewBox="0 0 20 20"
                  fill={`${!searchParams.get("page") || searchParams.get("page") === "1"
                      ? "gray"
                      : "currentColor"
                    }`}
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
            data.length > 0 ? (
              <span
                className={`${Number(searchParams.get("page")) === Math.ceil(totalCount / 10)
                    ? "cursor-not-allowed opacity-50"
                    : "border border-solid border-lightGray hover:bg-lightGray"
                  } w-10 h-10 flex items-center justify-center rounded-md m-2`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  viewBox="0 0 20 20"
                  fill={`${Number(searchParams.get("page")) === Math.ceil(totalCount / 10)
                      ? "gray"
                      : "currentColor"
                    }`}
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
          pageCount={Math.ceil(totalCount / 10)}
          marginPagesDisplayed={3}
          pageRangeDisplayed={4}
          onPageChange={handlePageClick}
          forcePage={
            Number(searchParams.get("page")) ? Number(searchParams.get("page")) - 1 : 0
          }
          containerClassName={"flex items-center justify-center mt-3 mb-4"}
          pageClassName={
            "block border border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md m-2"
          }
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"bg-blue-500 text-white"}
        />
      )} */}
      {!isFetching && totalCount > 10 && <Pagination totalItems={totalCount} itemsPerPage={10}></Pagination>}



    </div>
  );
}

export default Category;
