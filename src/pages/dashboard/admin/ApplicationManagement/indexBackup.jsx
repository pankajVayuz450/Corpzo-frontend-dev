import React, { useEffect, useState } from 'react';
import ReusableTable from "@/components/common/Tables";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TitleComponent from '@/components/common/TitleComponent';
import TableShimmer from '@/components/common/TableShimmer';
import { getAllApplications } from '@/redux/admin/actions/ApplicationManagement';
import SearchBoxNew from '@/components/common/SearchBoxNew';

const DUMMY_DATA = [
]
const ApplicationManagement = () => {

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const {isFetching} = useSelector((state) => state.department);
  const { applicationsList, totalCount } = useSelector((state) => state.applications)

  const navigate = useNavigate();

  // Handle edit application action
  const handleEdit = (id) => {
    navigate(`/dashboard/admin/masterSettings/edit-department/${id}`);
  };

  // Handle pagination
  const handlePageClick = (e) => {
    // dispatch(getAllDepartments(e.selected + 1, 10));
    setSearchParams({ page: e.selected + 1, limit: 10 });
  };

  // Toggle application status
  const handleStatus = (form) => {
    const newStatus = !form.active;
    const data = {
      name: form.name,
      description: form.description,
      active: newStatus,
    };
    dispatch(updateStatus(form.departmentId, data));
  };

  // Handle search input with debounce
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      setSearchParams({ search: value });
      dispatch(getAllApplications(1, 10, value));
    }, 2000);

    setDebounceTimeout(timeout);
  };

  // Automatically fetch applications based on searchParams
  useEffect(() => {
    const query = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;
    // console.log(limit, "lomit")

    setSearchQuery(query);

    dispatch(getAllApplications(limit, page, query));
  }, [searchParams, dispatch]);

  // Clear filter
  const handleClearFilter = () => {
    setSearchQuery('');
    setSearchParams({});
    dispatch(getAllApplications(1, 10));
  };

  const columns = [
    {
      Header: 'Id Number',
      accessor: 'id number',
      Cell: ({ value }) => {console.log(value)},
    },
    {
      Header: 'Case Id',
      accessor: 'case id',
      Cell: ({ value }) => {console.log(value)},
    },
    {
      Header: 'Username',
      accessor: 'username',
      Cell: ({ value }) => {console.log(value)},
    },
    {
      Header: 'Service',
      accessor: 'service',
      Cell: ({ value }) => {console.log(value)},
    },
    {
      Header: 'Added On',
      accessor: 'added on',
      Cell: ({ value }) => {console.log(value)},
    },
    {
      Header: 'Email',
      accessor: 'email',
      Cell: ({ value }) => {console.log(value)},
    },
    {
      Header: 'Agent',
      accessor: 'agent',
      Cell: ({ value }) => {console.log(value)},
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => {console.log(value)},
    },
   
    
  ];

  return (
    <div className='w-full'>
      <TitleComponent title={"CORPZO | Application Management"}></TitleComponent>
      <div className='flex gap-4 justify-between items-center w-full mb-4'>
        <NavLink to="/dashboard/admin/add-application" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Create Application
        </NavLink>
       <SearchBoxNew/>
      </div>
      {
        isFetching ? (
          <TableShimmer />
        ) : (
          <>
          <ReusableTable data={[{},{}]}  columns={columns} editPath={"/"}  />
          </>
        )
      }

      
    </div>
  );
}

export default ApplicationManagement;
