import NoData from '@/components/common/NoData';
import Pagination from '@/components/common/Pagination';
import ReusableTable from '@/components/common/Tables';
import TableShimmer from '@/components/common/TableShimmer';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import { getAllDepartments, updateStatus } from '@/redux/admin/actions/MasterSettings/Department';
import { updateEditPage } from '@/redux/admin/slices/MasterSettings/DepartmentSlice/departmentSlice';
import MainLayout from '@/widgets/layout/MainLayout';
import {
  Switch
} from "@material-tailwind/react";
import { useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Department = () => {

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { departmentList, isFetching, totalCount, isStatusLoading } = useSelector((state) => state.department);
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

  const columns = [
    {
      Header: 'Department',
      accessor: 'name',
      Cell: ({ row }) => (
        row?.original?.name
          ? `${row?.original?.name.slice(0, 10)}...` // Convert to string and append "..."
          : "N/A"
      ),
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
          <Switch disabled={isStatusLoading} checked={row.original.active} onChange={() => handleStatus(row.original)} />
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
            onClick={() => handleEdit(row.original?.departmentId)}
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
          name: 'Department',
          url: '/dashboard/admin/masterSettings/Department',
        },
      ],
    }
  ];
  return (
    <div className='w-full h-full mt-4'>

      <MainLayout loading={isFetching} itemsPerPage={10} link={"/dashboard/admin/masterSettings/Department/add-department"} totalCount={totalCount} linkTitle={"Create Department"} titleComponentData={"CORPZO | Department Management"} breadcrumbData={breadcrumbData} headerComponenetData={"Department Management"}>

        {isFetching ? (
          <TableShimmer />
        ) : (
          <div className=''>
            {departmentList && departmentList.length > 0 ? (
              <ReusableTable data={departmentList || []} totalCount={totalCount} key={isStatusLoading} columns={columns} />
            ) : (
              <NoData />
            )}
          </div>
        )}
      </MainLayout>
      {!isFetching && totalCount > 10 && <Pagination totalItems={totalCount} itemsPerPage={10}></Pagination>}

    </div>
  );
};

export default Department;