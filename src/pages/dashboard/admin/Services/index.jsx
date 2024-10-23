import React, { useEffect, useState, useCallback } from 'react';
import {
  Input,
  Switch,
} from "@material-tailwind/react";
import { MdEdit } from "react-icons/md";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import TitleComponent from '@/components/common/TitleComponent';
import TableShimmer from '@/components/common/TableShimmer';
import { getAllServices, updateStatus } from '@/redux/admin/actions/Services';
import { throttle } from '@/Helpers/globalfunctions';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import { CiSearch } from "react-icons/ci";
import { toast } from 'react-toastify';
import { MdClear } from "react-icons/md";
import { handleStepValue, updateEditPage } from '@/redux/admin/slices/Service';
import { BsThreeDotsVertical } from "react-icons/bs";
import Breadcrumb from '@/widgets/layout/TopNavigation';
import Pagination from '@/components/common/Pagination';
import SearchBoxNew from '@/components/common/SearchBoxNew';
import HeaderTitle from '@/components/common/HeaderTitle';

const Service = () => {

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { offerList, } = useSelector((state) => state.offer)
  const { serviceList, totalCount, isFetching, isStatusLoading } = useSelector((state) => state.service);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  console.log(totalCount, "totalCount")
  const navigate = useNavigate();
  dispatch(updateEditPage(searchParams.get("page") || 1));

  // Handle edit Service action
  const handleEdit = (id) => {
    navigate(`/dashboard/admin/edit-offer/${id}`);
    dispatch(updateEditPage(searchParams.get("page") || 1));
  };

  // Handle pagination
  const handlePageClick = (e) => {
    if (searchQuery !== "") {
      setSearchParams({ page: e.selected + 1, limit: 10, search: searchQuery });
    } else {

      setSearchParams({ page: e.selected + 1, limit: 10 });
    }
  };

  // Toggle Service status
  const handleStatus = (form) => {
    const newStatus = !form.active;
    const data = {
      serviceId: form._id,
      active: newStatus,
    };
    dispatch(updateStatus(data));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  // Automatically fetch Services based on searchParams
  useEffect(() => {
    const query = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;

    setSearchQuery(query);

    dispatch(getAllServices(limit, page, query, ""));
  }, [searchParams, dispatch]);

  // Clear filter
  const handleClearFilter = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  const handleToggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id); // Toggle the dropdown
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
    } else if (searchQuery !== "" && searchQuery.length > 50) {
      toast.warn("Search term cannot be more than 50 characters long")
      return
    } else if (searchQuery.length < 2) {
      toast.warn("Search cannot be less than 2 characters")
      return
    } else {
      setSearchParams({ search: searchQuery });
    }
  }, 500), [searchQuery, dispatch, setSearchParams]);

  const handleSearch = () => {
    throttledSearch();
  };
  const breadcrumbData = [
    {
          name: 'Service Management',
    }
  ];
  const handleCreateService=()=>{
    dispatch(handleStepValue(0))
    navigate('/dashboard/admin/services/create-service')
  }
  return (
    <>
      <HeaderTitle title="Service Management" totalCount={totalCount}/>
      <Breadcrumb items={breadcrumbData}/>
      <TitleComponent title={"CORPZO | Service"}></TitleComponent>
    <div className='w-full mt-4'>
      <div className='flex gap-4 justify-between items-center w-full mb-4'>
        <button onClick={handleCreateService} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Create Service
        </button>
        <SearchBoxNew queryParam='search'/>
      </div>
      {
        isFetching ? (
          <TableShimmer />
        ) : (
          <>
            {
              serviceList && serviceList.length > 0 ? (
                <div className="overflow-x-auto overflow-y-hidden min-h-[25rem]">
                  <table className="min-w-fullm min-h- divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Duration(Months)
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sub Category
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
                      {serviceList && serviceList.map((form, index) => (
                        <tr key={index}>
                          {serviceList.length > 0 && console.log(form.category?.[0]?.categoryName || 'No category')}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{form.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{form.duration}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">  {form.category?.[0]?.categoryName || 'No category to display'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">  {form.sub_category?.[0]?.subSectionTitle || 'No Sub category to display'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{formatReadableDate(form.createdAt)}</div>
                          </td>
                          <td >
                            <Switch disabled={isStatusLoading} checked={form.active} onChange={() => { handleStatus(form) }} />
                          </td>
                          <td className="px-6 py-4 relative">
                            <button onClick={() => handleToggleDropdown(form._id)}>
                              <BsThreeDotsVertical />
                            </button>
                            {openDropdownId === form._id && (
                              <ul
                                role="menu"
                                // className="absolute right-[4rem] z-40 min-w-[100px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg focus:outline-none"
                                className={`absolute right-[4rem] z-40 min-w-[100px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg focus:outline-none ${
                                  index === 8 || index === 9 ? '-bottom-[5%] mb-2 mr-4' : 'top-10 mt-2'
                                }`}
>
                                <NavLink to={`/dashboard/admin/steps/${form._id}`}>
                                  <li className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-1 transition-all hover:bg-slate-100">
                                    Step
                                  </li>
                                </NavLink>
                                {form.isOneTime === false && <NavLink to={`/dashboard/admin/subscriptions/${form._id}`}>
                                  <li className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-1 transition-all hover:bg-slate-100">
                                    Subscription
                                  </li>
                                </NavLink>}
                                <NavLink to={`/dashboard/admin/Service-FAQs/${form._id}`}>
                                  <li className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-1 transition-all hover:bg-slate-100">
                                    FAQ
                                  </li>
                                </NavLink>
                                <NavLink to={`/dashboard/admin/services/update-service/${form._id}`}>
                                <li className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-1 transition-all hover:bg-slate-100">
                                 
                                    Edit
                                </li>
                                  </NavLink>
                              </ul>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex justify-center items-center h-screen">
                  <img src="/img/nodata_svg.svg" className="w-[50%]" alt="No data found" />
                </div>)
            }
          </>
        )
      }
       {!isFetching && totalCount > 10 && <Pagination totalItems={totalCount} itemsPerPage={10}></Pagination>}
    </div>
    </>
  );
}

export default Service;
