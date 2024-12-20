import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReusableTable from "@/components/common/Tables";
import { format } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "@/components/common/Pagination";
import { deleteRole, fetchAllRoles, updateStatus } from "@/redux/admin/actions/roles";
import { toast } from "react-toastify";
import { removeDeletingRoleError, removeFetchingRolesError } from "@/redux/admin/slices/rolesSlice";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import TableShimmer from "@/components/common/TableShimmer";
import HeaderTitle from "@/components/common/HeaderTitle";
import Breadcrumb from "@/widgets/layout/TopNavigation";
import { Button, Dialog, DialogFooter, DialogHeader, Spinner, Switch } from "@material-tailwind/react";
import TitleComponent from "@/components/common/TitleComponent";
import { MdEdit } from "react-icons/md";

const Roles = () => {
  const dispatch = useDispatch();
  const { roles,
    isFetchingRoles,
    fetchingRolesError, totalCount, deletedRole,
    isDeletingRole,
    deletingRoleError,
    isStatusLoading
  } = useSelector((state) => state.role);
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState("")
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    if (fetchingRolesError) {
      toast.error("Error occur in fetching roles.")
    }
    dispatch(removeFetchingRolesError());
  }, [fetchingRolesError])

  //handling pagination here..
  const [searchParams] = useSearchParams();
  // const [limit, setLimit]= useState(searchParams.get('limit') || 10);
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;


  useEffect(() => {
    dispatch(fetchAllRoles({ page, limit }));
  }, [page, limit]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    handleOpen();
  }

  const confirmDelete = () => {
    dispatch(deleteRole(deleteId));
  }

  useEffect(() => {
    if (deletedRole) {
      toast.success("Deleted successfully")
      setDeleteId("");
      handleOpen();
    }
    if (deletingRoleError) {
      toast.error("Error in deleting role")
    }
    dispatch(removeDeletingRoleError());
  }, [deletedRole, deletingRoleError])

  const handleEdit = (id) => {
    navigate(`/dashboard/admin/roles/edit/${id}`);
  }
  const handleStatus = (data) => {
    const { _id, active } = data;

    const newData = {
      _id: _id,
      active: !active
    }
    dispatch(updateStatus(newData))
  }

  //This Column is requred for the Table 
  const columns = [
    {
      Header: 'Role',
      accessor: 'role',
      Cell: ({ row }) => (row?.original?.role),
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: ({ value }) => formatDate(value),
    },
    {
      Header: 'Status ',
      accessor: 'active',
      Cell: ({ row }) => (
        <>
          <Switch disabled={isStatusLoading} checked={row.original.active} onChange={() => { handleStatus(row.original) }} />

        </>
      ),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleEdit(row.original?._id)}
            className="transition-all p-2 rounded"
          >
            <MdEdit />
          </button>
          {/* <button
            onClick={() => handleDelete(row.original?._id)}
            className="bg-red-300 hover:bg-red-500 transition-all p-2 rounded"
          >
            <MdDelete className="text-white" />
          </button> */}
        </div>
      ),
    }
  ];



  const breadcrumbData = [
    {
      name: 'Roles',
    }
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbData} />
      <HeaderTitle title={`Role Management`} totalCount={totalCount} />
      <TitleComponent title="CORPZO | Roles" />
      {isFetchingRoles ? (
        <TableShimmer />
      ) : (
        <div>
          <div className="flex justify-between p-3">
            {/* <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={() => navigate("/dashboard/admin/role/create")}
            >
              Add
            </button> */}
          </div>
          <ReusableTable
            data={roles || []}
            editPath={`${window.location.pathname}/edit`}
            columns={columns}   //Must define table columns according to your data
            key={isStatusLoading}
          />
          {totalCount > 10 && <Pagination totalItems={totalCount} itemsPerPage={10} />}
        </div>
      )}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Delete Role?</DialogHeader>

        <DialogFooter>
          <Button
            variant="gradient"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button onClick={confirmDelete} variant="danger" color="green" >
            {isDeletingRole ?
              <div className='flex justify-center items-center gap-3'>
                <Spinner color='white' className="h-4 w-4" />
                Deleting Role
              </div>
              : "Delete Role"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Roles;