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
import HeaderTitle from '@/components/common/HeaderTitle';
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
    <>
      <Breadcrumb items={breadcrumbData} />
      <TitleComponent title={"CORPZO | Category"} />
      <HeaderTitle title="Category Management" />
      <div className='w-full mt-4'>
        <div className='flex gap-4 justify-between items-center w-full mb-4'>
          <NavLink to="/dashboard/admin/masterSettings/Category/add-category" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Create Category
          </NavLink>
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
        {!isFetching && totalCount > 10 && <Pagination totalItems={totalCount} itemsPerPage={10}></Pagination>}
      </div>
    </>
  );
}

export default Category;
