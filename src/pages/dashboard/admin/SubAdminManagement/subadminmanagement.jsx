import SubAdminTable from '@/components/admin/SubAdminTable';
import Pagination from '@/components/common/Pagination';
import SearchBoxNew from '@/components/common/SearchBoxNew';
import ReusableTable from '@/components/common/Tables';
import TableShimmer from '@/components/common/TableShimmer';
import TitleComponent from '@/components/common/TitleComponent';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import { deleteSubAdmin, fetchSubAdmins, updateStatus, updateStatusTHUNK } from '@/redux/admin/actions/subAdmin';
import reusableFunctions from '@/utils/reusableFunctions';
import { Switch } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SubAdminManagement = () => {
  const dispatch = useDispatch();
  const { subAdmins, isSubAdminsFetching, statusloading, disabled } = useSelector((state) => state.subAdmins);
  console.log(statusloading, "disabled state ")
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const handleCreateSubAdmin = () => {
    navigate('/dashboard/admin/submadminmanagemnt/create-subadmin');
  };
  console.log(subAdmins, "subadmins state ")
  const handleDelete = (id) => {
    dispatch(deleteSubAdmin(id))
  };

  // useEffect(() => {
  //   if (!subAdmins.length) {
  //     dispatch(fetchSubAdmins({ limit: 10, page: 1, search: '' }));
  //   }
  // }, [dispatch]);

  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10
  const search = searchParams.get('search') || "";
  useEffect(() => {

    dispatch(fetchSubAdmins({ limit: limit, page: page, search: search }));

  }, [page, limit, search]);``
  const handleEdit =(id)=>{
    navigate(`/dashboard/admin/submadminmanagemnt/edit-subadmin/${id}`)
    console.log(id)
  }
  const handleStatus=(data)=>{
    const newStatus = !data.active;
    
    // dispatch(updateStatus({id : data.agentId, active : newStatus}))
    dispatch(updateStatusTHUNK(data.agentId, { active: newStatus }));
    console.log(data, "data from status change")
  }
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ row }) => (row?.original?.name),
    },
    {
      Header: 'Contact',
      accessor: 'contact',
      Cell: ({ row }) => (row?.original?.contact),
    },
    {
      Header: 'Email',
      accessor: 'email',
      Cell: ({ row }) => (row?.original?.email),
    },
    {
      Header: 'Type',
      accessor: 'type',
      Cell: ({ row }) => (row?.original?.type),
    },
    {
      Header: 'Status',
      accessor: 'active',
      Cell: ({ row }) => {
        console.log("isStatusLoading",statusloading);

        if(statusloading) return <h3>Loading...</h3>
        
      return <Switch disabled={statusloading}  className={`${disabled ? 'cursor-not-allowed opacity-50' : ''}`} key={statusloading} checked={row?.original?.active} onChange={() => handleStatus(row?.original)} />
    },
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row.original.agentId)}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          {/* <button
            onClick={() => handleDelete(row.original._id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button> */}
        </div>
      ),
    },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4" >Sub Admins Management</h1>
      <TitleComponent title={"CORPZO | Sub Admin Management"} />
      <div className='flex justify-between align-center'>
        <button onClick={handleCreateSubAdmin} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Create Sub Admin</button>
        <SearchBoxNew queryParam='search' />
      </div>

      {/* <SubAdminTable /> */}
      {isSubAdminsFetching ?
        <TableShimmer />
        : <ReusableTable
          columns={columns}
          data={subAdmins}
          editPath="/dashboard/admin/submadminmanagemnt/edit-subadmin"
          onDelete={handleDelete}
        />}
        <Pagination totalItems={subAdmins.length} itemsPerPage={10}></Pagination> 
    </div>
  );
};

export default SubAdminManagement;
