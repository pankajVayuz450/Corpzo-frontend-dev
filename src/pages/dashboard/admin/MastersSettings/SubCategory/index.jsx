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
import { MdClear, MdEdit } from 'react-icons/md';
import { updateEditPage } from '@/redux/admin/slices/MasterSettings/subCategorySlice/aubCategorySlice';
import { throttle } from '@/Helpers/globalfunctions';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import SearchBoxNew from '@/components/common/SearchBoxNew';
import Pagination from '@/components/common/Pagination';
import HeaderTitle from '@/components/common/HeaderTitle';
import ReusableTable from '@/components/common/Tables';
import NoData from '@/components/common/NoData';
const SubCategory = () => {
  const [searchParams] = useSearchParams();

  const {
    subCategoryList,
    totalCount,
    isFetching,
    isStatusLoading
  } = useSelector((state) => state.subCategory);
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

    dispatch(getAllSubCategories(limit, page, query));
  }, [searchParams, dispatch]);

  const handleStatus = (form) => {
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

  const columns = [
    {
      Header: 'Sub Category',
      accessor: 'subSectionTitle',
      Cell: ({ row }) => (row?.original?.subSectionTitle),
    },
    {
      Header: 'Sub Category',
      accessor: 'sectionTitle',
      Cell: ({ row }) => (row?.original?.sectionTitle),
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: ({ value }) => formatReadableDate(value),
    },
    {
      Header: 'Status ',
      accessor: 'active',
      Cell: ({ row }) => (
        <>
          <Switch disabled={isStatusLoading} checked={row.original.active} onChange={() => { handleStatus(row.original) }} />
          {/* {childLoading[row.original.categoryId] ? <TailSpin height={20} width={20} color="blue" /> : <Switch disabled={isStatusLoading} checked={row.original.active} onChange={() => handleStatus(row.original)} />} */}

        </>
      ),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleEdit(row.original?.subCategoryId)}
            className="transition-all p-2 rounded"
          >
            <MdEdit />
          </button>
        </div>
      ),
    }
  ];

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
      <Breadcrumb items={breadcrumbData} />
      <TitleComponent title={"CORPZO | Sub Category"}></TitleComponent>
      <HeaderTitle title={"Sub Category Management"} totalCount={totalCount} />
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
                <ReusableTable data={subCategoryList || []} columns={columns} totalData={totalCount} key={isStatusLoading}/>
              ) : (
                <NoData/>
              )
          }
        </>

      )}

      {!isFetching && totalCount > 10 && <Pagination totalItems={totalCount} itemsPerPage={10}></Pagination>}


    </div>


  );
}

export default SubCategory;