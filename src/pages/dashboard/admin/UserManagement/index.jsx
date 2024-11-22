import { useSelector, useDispatch } from "react-redux"
import ReusableTable from '@/components/common/Tables'
import { useCallback, useEffect, useState } from 'react'
import { getAllUsers, deleteUser, updateStatus, downloadUser, verifyUserFormTable, promoteDemoteUser, archiveUser } from '@/redux/admin/actions/UserManagement'
import { Oval } from 'react-loader-spinner';
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input, Menu, MenuHandler, MenuItem, MenuList, Spinner, Switch, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import TitleComponent from "@/components/common/TitleComponent";
import ReactPaginate from "react-paginate";
import TableShimmer from "@/components/common/TableShimmer";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { formatDate, formatReadableDate, formatReadableDateTime, throttle } from "@/Helpers/globalfunctions";
import { updateEditPage } from "@/redux/admin/slices/UserManagement";
import Pagination from "@/components/common/Pagination";
import SearchBoxNew from "@/components/common/SearchBoxNew";
import Papa from "papaparse";
import Breadcrumb from "@/widgets/layout/TopNavigation";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import HeaderTitle from "@/components/common/HeaderTitle";
import { FaUser, FaArchive } from "react-icons/fa";

const UserManagement = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { users, isUsersFetching, userDownloadFeching, isUserUpdating, verifyUserFromTableLoading, currentPage, totalPages, totalRecords, isStatusLoading, downloadUsers } = useSelector((state) => state.userMgmt)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [archiveOpen, setarchiveOpen] = useState(false);
  const [promoteUser, setPromoteUser] = useState(null);
  const [archiveUserId, setArchiveUserId] = useState(null)
  // useEffect(() => {
  //   users.length === 0 && dispatch(getAllUsers({ page: 1, limit: 10 }));

  //   console.log(users)
  // }, [])

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
  const verifyUser = (id) => {
    console.log(id, "id")
    dispatch(verifyUserFormTable({ userId: id }))
  }

  const handleStatus = (form) => {
    // Toggle the status
    console.log(form, "debug")
    const newStatus = !form.active;
    console.log(form, "form data ")
    const data = {
      active: newStatus,
    }
    dispatch(updateStatus(form.userId, data));
  };
  const openPromoteDemoteModal = (user) => {
    console.log(user, "user data")
    setPromoteUser(user);
    setModalOpen(true);
  };
  const openArchiveModal = (userId) => {
    setarchiveOpen(true)
    setArchiveUserId(userId)
    console.log(userId, "delete user")
  };

  const closePromoteDemoteModal = () => {
    setModalOpen(false);
    setPromoteUser(null);
  };
  const handleArchiveModal = () => {
    setarchiveOpen(false);

  };

  useEffect(() => {
    const query = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;

    setSearchQuery(query);

    dispatch(getAllUsers({ page: page, limit: limit, search: query, isDeleted: false }));

  }, [searchParams, dispatch]);


  const handleDownload = () => {
    setIsDownloadReady(false);  // Reset download state
    dispatch(downloadUser());   // Fetch the data for download
    setIsDownloadReady(true);
  }

  useEffect(() => {
    if (isDownloadReady && downloadUsers && downloadUsers.length > 0) {
      // Convert JSON to CSV
      console.log(downloadUsers, "downloadusersdata")
      const formattedUsers = downloadUsers?.map(form => ({
        name: form.name,
        email: form.email,
        role: form.role,
        gender: form.gender,
        phone: form.phone
      }));
      const csv = Papa.unparse(formattedUsers);

      // Create a Blob for the CSV
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      // Trigger a download of the CSV file
      const link = document.createElement("a");
      link.href = url;
      link.download = "user_data.csv";
      link.click();

      // Clean up
      URL.revokeObjectURL(url);
      toast.success("Data downloaded")
      setIsDownloadReady(false);  // Reset download state after download completes
    }
  }, [isDownloadReady, downloadUsers]);
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const promoteDemoteUserRole = (data) => {
    dispatch(promoteDemoteUser(data))
  }
  const confirmPromoteDemote = () => {
    console.log(promoteUser, "datadata")
    if (promoteUser) {
      dispatch(promoteDemoteUser(promoteUser));
      if (!isUserUpdating) {
        closePromoteDemoteModal();
      }
    }
  };

  const consfirmArchive = () => {
    console.log(archiveUserId, "Confirm Archive")
    dispatch(archiveUser({ userId: archiveUserId }))
    setarchiveOpen(false)
  }
  const breadcrumbData = [
    {
      name: 'User Management',
    }
  ];
  return (
    <div className="">
      <TitleComponent title={"CORPZO | User Management"} />
      <Breadcrumb items={breadcrumbData} />
      <HeaderTitle title="User Management" totalCount={totalRecords} />
      <div className="flex gap-4 justify-between items-center w-full mb-4">
        <div className="flex gap-4 ">

          <NavLink to="/dashboard/admin/usermanagement/create-user" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Create User
          </NavLink>
          <button
            onClick={handleDownload}
            className={`font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 flex items-center gap-2
              ${userDownloadFeching ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700 focus:ring-blue-500'}`}

            disabled={userDownloadFeching} // disable button during loading
          >
            {userDownloadFeching ? (
              <>
                <Spinner className="h-5 w-5" color="white" />
                Downloading...
              </>
            ) : (
              "Download User Data"
            )}
          </button>
          <NavLink to="/dashboard/admin/usermanagement/view-logs" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            View Logs
          </NavLink>
        </div>
        <SearchBoxNew queryParam="search" />
      </div>

      {isUsersFetching ?
        <TableShimmer /> :
        (
          <>
            {users && users.length > 0 ?
              (
                <div className=" overflow-x-scroll overflow-y-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sr No
                        </th>
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
                          Role
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Assigned To
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Is temporary
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Active
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
                      {users && users.map((form, index) => {
                        const idx = ((parseInt(searchParams.get("page") || 1) - 1) * parseInt(searchParams.get("limit") || 10)) + (index + 1);
                        console.log(form, "fporm")
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{idx}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{form.name ? form.name : "N/A"}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{form?.gender ? form?.gender : "N/A"}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {form.email && form.email.length > 5 ? `${form.email.slice(0, 10)}...` : form.email ? form.email : "N/A"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{form.phone ? form.phone : "N/A"}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{form.role ? form.role : "N/A"}</div>
                            </td>
                            <div className="text-sm text-gray-900">
                              {form.assigned_user && form.assigned_user.length > 0 ? `${form?.assigned_user[0]?.name} (${form?.assigned_user[0]?.role})` : "N/A"}
                            </div>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{form.isTemporaryUser ? "YES" : "NO"}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500"> {form.lastLoginAt ? formatReadableDate(form.lastLoginAt) : "N/A"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500"> {formatReadableDate(form.createdAt)}
                              </div>
                            </td>
                            <td>
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                                <Switch disabled={isStatusLoading} checked={form.active} onChange={() => { handleStatus(form) }} />
                              </span>
                            </td>

                            <td className="px-6 py-4">
                              <Menu placement="bottom-end">
                                <MenuHandler>
                                  <Button className="p-0 shadow-none bg-white text-black hover:text-gray-700">
                                    <BsThreeDotsVertical size={20} />
                                  </Button>
                                </MenuHandler>
                                <MenuList>
                                  <MenuItem className="flex items-center gap-2" onClick={() => handleEdit(form._id)}>
                                    <span>
                                      <MdEdit />
                                    </span>
                                    <p>
                                      Update User
                                    </p>
                                  </MenuItem>
                                  <MenuItem className="flex items-center gap-2" onClick={() => handleView(form._id)}>
                                    <span
                                      className=""
                                    >
                                      <BiSolidUserDetail />
                                    </span>
                                    <p>
                                      View User details
                                    </p>
                                  </MenuItem>


                                  {form.isTemporaryUser && (
                                    <MenuItem disabled={verifyUserFromTableLoading[form._id]} className="flex items-center gap-2" onClick={() => verifyUser(form._id)}>
                                      {verifyUserFromTableLoading[form._id] ? (
                                        "loading"
                                      ) : (
                                        <>
                                          <span className="">
                                            <FaUser />
                                          </span>
                                          <p>Verify User</p>
                                        </>
                                      )}
                                    </MenuItem>
                                  )}
                                  {(form.role === 'agent' || form.role === 'manager') && (
                                    <MenuItem
                                      disabled={verifyUserFromTableLoading[form._id]}
                                      className="flex items-center gap-2"
                                      // onClick={() => promoteDemoteUserRole({role : form.role==="agent" ? "manager" : "agent", userId : form._id})}
                                      onClick={() => openPromoteDemoteModal({ role: form.role === "agent" ? "agent" : "manager", userId: form._id })}
                                    >
                                      {verifyUserFromTableLoading[form._id] ? (
                                        "loading"
                                      ) : (
                                        <>
                                          <span>
                                            <FaUser />
                                          </span>
                                          <p>{form.role === 'agent' ? "Promote To Manager" : "Demote To Agent"}</p>
                                        </>
                                      )}
                                    </MenuItem>
                                  )}
                                  <MenuItem className="flex items-center gap-2" onClick={() => openArchiveModal(form._id)}>
                                    <span>
                                      <FaArchive />
                                    </span>
                                    <p>
                                      Archive User
                                    </p>
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </td>
                          </tr>
                        )
                      }

                      )}
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
      <Dialog open={modalOpen} handler={closePromoteDemoteModal} size="sm">
        <DialogHeader>
          {promoteUser?.role === 'agent' ? "Promote to Manager" : "Demote to Agent"}
        </DialogHeader>
        <DialogBody divider>
          {promoteUser?.role === 'agent'
            ? "Are you sure you want to promote this user to a Manager?"
            : "Are you sure you want to demote this user to an Agent?"}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={closePromoteDemoteModal}
            className="mr-2"
          >
            Cancel
          </Button>
          {/* <Button
            variant="gradient"
            color="green"
            onClick={confirmPromoteDemote}
          >
            Confirm
          </Button> */}
          <Button
            variant="gradient"
            color="green"
            onClick={confirmPromoteDemote}
            disabled={isUserUpdating} // Disable button when loading
          >
            {isUserUpdating ? (
              <>
                <Spinner />
                <span className="ml-2">Updating User</span>
              </>
            ) : (
              "Confirm"
            )}
          </Button>

        </DialogFooter>
      </Dialog>
      <Dialog open={archiveOpen} handler={handleArchiveModal} size="sm">
        <DialogHeader>
          Archive User?
        </DialogHeader>
        <DialogBody divider>
          Are you sure you want to Arcive this user?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleArchiveModal}
            className="mr-2"
          >
            Cancel
          </Button>
          {/* <Button
            variant="gradient"
            color="green"
            onClick={confirmPromoteDemote}
          >
            Confirm
          </Button> */}
          <Button
            variant="gradient"
            color="green"
            onClick={consfirmArchive}
            disabled={isUserUpdating} // Disable button when loading
          >
            {isUserUpdating ? (
              <>
                <Spinner />
                <span className="ml-2">Updating User</span>
              </>
            ) : (
              "Confirm"
            )}
          </Button>

        </DialogFooter>
      </Dialog>
      {!isUsersFetching && totalRecords > 10 && <Pagination totalItems={totalRecords} itemsPerPage={10}></Pagination>}

    </div>

  )

}

export default UserManagement