import { useSelector, useDispatch } from "react-redux"
import ReusableTable from '@/components/common/Tables'
import { useCallback, useEffect, useState } from 'react'
import { getAllUsers, deleteUser, updateStatus } from '@/redux/admin/actions/UserManagement'
import { Oval } from 'react-loader-spinner';
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Input, Switch } from "@material-tailwind/react";
import TitleComponent from "@/components/common/TitleComponent";
import ReactPaginate from "react-paginate";
import TableShimmer from "@/components/common/TableShimmer";
import { CiSearch } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { toast } from 'react-toastify';
import { throttle } from "@/Helpers/globalfunctions";
import { updateEditPage } from "@/redux/admin/slices/UserManagement";
import Pagination from "@/components/common/Pagination";
const UserManagement = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { users, isUsersFetching, currentPage, totalPages, totalRecords, isStatusLoading } = useSelector((state) => state.userMgmt)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    users.length === 0 && dispatch(getAllUsers({ page: 1, limit: 10 }));

    console.log(users)
  }, [])

  const handleCreate = () => {
    navigate('/dashboard/admin/usermanagement/create-user')
  }
  const handleEdit = (id) => {
    navigate(`/dashboard/admin/usermanagement/edit-user/${id}`)
    dispatch(updateEditPage(searchParams.get("page") || 1));
  }
  const handleView = (id) => {
    navigate(`/dashboard/admin/usermanagement/view-user/${id}`)
  }

  const handleStatus = (form) => {
    // Toggle the status
    const newStatus = !form.active;
    console.log(form, "form data ")
    const data = {
      name: form.name,
      gender: form.gender,
      email: form.email,
      phone: form.phone,
      active: newStatus,
    }
    dispatch(updateStatus(form.userId, data));
  };
  const handlePageClick = (e) => {
    console.log(e.selected)
    setSearchParams({ page: e.selected + 1, limit: 10 })
  }



  useEffect(() => {
    const query = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;

    setSearchQuery(query);

    dispatch(getAllUsers({ page: page, limit: limit, search: query }));

  }, [searchParams, dispatch]);


  const handleClearFilter = () => {
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;
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
    }else if (!regex.test(searchQuery)) {
      toast.warn("Special characters are not allowed");
      return;
    } else if (searchQuery.length < 3) {
      toast.warn("search must be atleast 3 characters long")
      return;
    }
    else if (searchQuery !== "" && searchQuery > 30) {
      toast.warn("search query cannot be more than 30 characters long")
      return;
    }
    setSearchParams({ search: searchQuery });
  }, 500), [searchQuery, dispatch, setSearchParams]);

  const handleSearch = () => {
    throttledSearch();
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className="">
      <TitleComponent title={"Admin | User Management"} />
      <div className="flex gap-4 justify-between items-center w-full mb-4">
        <NavLink to="/dashboard/admin/usermanagement/create-user" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Create User
        </NavLink>
        <div className='w-[30%] flex gap-4 justify-end items-center mb-4'>
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
            />
            <span className='absolute right-2'><button>
              <CiSearch />
            </button></span>
          </div>
          {searchQuery.length > 0 && <button onClick={handleClearFilter}>
            <MdClear />
          </button>}
        </div>
      </div>

      {isUsersFetching ?
        <TableShimmer /> :
        (
          <>
            {users && users.length > 0 ?
              (
                <div className=" overflow-x-scroll">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gender
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
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
                      {users && users.map((form, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{form.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{form.gender}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{form.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{form.phone}</div>
                          </td>
                          <td >
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                            <Switch disabled={isStatusLoading} checked={form.active} onChange={() => { handleStatus(form) }} />
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {/* {renderActionColumn(form)} */}
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(form._id)}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleView(form._id)}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                View
                              </button>

                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex justify-center items-center h-screen">
                  <img src="/img/nodata_svg.svg" className="w-[50%]" alt="No data found" />
                </div>
              )}
          </>
        )
      }
  {!isUsersFetching && totalRecords > 10 && <Pagination totalItems={totalRecords} itemsPerPage={10}></Pagination>}

    </div>

  )

}

export default UserManagement