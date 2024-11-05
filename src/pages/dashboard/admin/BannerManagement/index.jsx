import React, { useEffect, useState } from 'react';
import {
  Input,
  Switch,
} from "@material-tailwind/react";
import ReusableTable from "@/components/common/Tables";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { getAllDepartments, updateStatus } from '@/redux/admin/actions/MasterSettings/Department';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import ReactPaginate from 'react-paginate';
import TitleComponent from '@/components/common/TitleComponent';
import TableShimmer from '@/components/common/TableShimmer';
import { getBanners } from '@/redux/admin/actions/banner';
import { toast } from 'react-toastify';
import { removeFetchingBannersError, resetBanner } from '@/redux/admin/slices/bannerSlice';
import Pagination from '@/components/common/Pagination';
import { format } from 'date-fns';
import { FaEdit } from 'react-icons/fa';

const BannerManagement = () => {

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;

  const navigate = useNavigate();

  const { banners,
    isFetchingBanners,
    fetchingBannersError, totalCount } = useSelector(state => state.banner)

  useEffect(() => {
    dispatch(getBanners({ page, limit }));
  }, [page, limit])

  useEffect(() => {
    if (fetchingBannersError) {
      toast.error("Error occur in fetching banners data")
    }
    dispatch(removeFetchingBannersError())
  }, [fetchingBannersError])

  const handleEdit = id => {
    navigate(`/dashboard/admin/edit-banner/${id}`);
  };
  
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const columns = [
    {
      Header: 'Banner Title',
      accessor: 'bannerTitle',
      Cell: ({ row }) => (row?.original?.bannerTitle),
    },
    {
      Header: 'Banner Url',
      accessor: 'bannerURL',
      Cell: ({ row }) => (
        <a className='text-blue-400 hover:text-blue-600 transition-all' href={row?.original?.bannerURL} target='_blank'>View Banner</a>
      ),
    },
    {
      Header: 'User Type',
      accessor: 'userType',
      Cell: ({ row }) => (row?.original?.userType),
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: ({ value }) => formatDate(value),
    },
    {
      Header: 'Updated At',
      accessor: 'updatedAt',
      Cell: ({ value }) => formatDate(value),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div>
          <button
            onClick={() => handleEdit(row.original?._id)}
            className="bg-blue-300 hover:bg-blue-500 transition-all p-2 rounded"
          >
            <FaEdit className="text-white" />
          </button>
        </div>
      ),
    }
  ];

  return (
    <div className='w-full'>
      <TitleComponent title={"CORPZO | Banner Management"}></TitleComponent>
      <div className='flex gap-4 justify-between items-center w-full mb-4'>
        <NavLink to="/dashboard/admin/add-banner" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Create Banner
        </NavLink>
      </div>
      {
        isFetchingBanners ? (
          <TableShimmer />
        ) : (
          <>
            <ReusableTable
            data={banners || []}
            editPath={`${window.location.pathname}/edit`}
            columns={columns}   //Must define table columns according to your data
          />
          {totalCount > 10 && <Pagination totalItems={totalCount} itemsPerPage={10} />}
          </>
        )
      }
    </div>
  );
}

export default BannerManagement;
