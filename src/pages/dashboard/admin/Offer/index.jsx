import React, { useEffect, useState, useCallback } from 'react';
import {
  Input,
  Switch,
} from "@material-tailwind/react";
import ReusableTable from "@/components/common/Tables";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import ReactPaginate from 'react-paginate';
import TitleComponent from '@/components/common/TitleComponent';
import TableShimmer from '@/components/common/TableShimmer';
import { getAllOffers, updateStatus } from '@/redux/admin/actions/Offer';
import { throttle } from '@/Helpers/globalfunctions';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import { CiSearch } from "react-icons/ci";
import { toast } from 'react-toastify';
import { MdClear } from "react-icons/md";
import { updateEditPage } from '@/redux/admin/slices/Offer';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import Pagination from '@/components/common/Pagination';
import SearchBoxNew from '@/components/common/SearchBoxNew';
import HeaderTitle from '@/components/common/HeaderTitle';
import { MdEdit } from "react-icons/md";
const Offer = () => {

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { offerList, totalCount, isFetching, isStatusLoading } = useSelector((state) => state.offer)

  const navigate = useNavigate();

  // Handle edit Offer action
  const handleEdit = (id) => {
    navigate(`/dashboard/admin/edit-offer/${id}`);
    dispatch(updateEditPage(searchParams.get("page") || 1));
  };

  // Toggle Offer status
  const handleStatus = (form) => {
    const newStatus = !form.active;
    const data = {
      active: newStatus,
    };
    dispatch(updateStatus(form.offerId, data));
  };

  // Automatically fetch Offer based on searchParams
  useEffect(() => {
    const query = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;

    dispatch(getAllOffers(limit, page, query));
  }, [searchParams, dispatch]);

  const validateDate = (date) => {
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    const validityDate = new Date(date);

    if (validityDate && validityDate < todayUTC) {
      return false
    } else {
      return true
    }
  };
  const check = validateDate("2024-11-15T18:30:00.000Z")
  console.log(check, "valid date")
  const breadcrumbData = [
    {

      name: 'Offer Management',
      url: '/dashboard/admin/offer',

    }
  ];
  return (
    <div className='w-full  mt-4'>
      <TitleComponent title={"CORPZO | Offer Management"}></TitleComponent>
      <Breadcrumb items={breadcrumbData} />
      <HeaderTitle title='Offer Management' totalCount={totalCount} />
      <div className='flex gap-4 justify-between items-center w-full mb-4'>
        <NavLink to="/dashboard/admin/add-offer" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Create Offer
        </NavLink>
        <SearchBoxNew queryParam='search' />

      </div>
      {
        isFetching ? (
          <TableShimmer />
        ) : (
          <>
            {
              offerList && offerList.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Offer Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Offer Percentage
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expired At
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
                    {offerList && offerList.map((form, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{form.offerTitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{form.discountPercent} %</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatReadableDate(form.createdAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatReadableDate(form.validity)}</div>
                        </td>
                        <td >
                          {/* <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${form.active === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {form.active === true ? 'Active' : 'Inactive'}
                          </span> */}
                          <Switch disabled={isStatusLoading} checked={form.active} onChange={() => { handleStatus(form) }} />

                        </td>
                        <td className="px-6 py-4">
                          {/* {renderActionColumn(form)} */}
                          <div className="flex space-x-2">
                            <button
                              onClick={()=> handleEdit(form.offerId)}
                              className={`text-gray-500 hover:text-gray-700 ${!validateDate(form.validity) ? 'opacity-50 cursor-not-allowed' : ''}`}
                              disabled={!validateDate(form.validity)} // Disable if validateDate returns false
                            >
                              <MdEdit />
                            </button>
                            {/* <Switch disabled={isStatusLoading} checked={form.active} onChange={() => { handleStatus(form) }} /> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
  );
}

export default Offer;
