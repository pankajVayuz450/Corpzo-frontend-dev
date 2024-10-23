import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReusableTable from "@/components/common/Tables";
import { TailSpin } from "react-loader-spinner";
import { format } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "@/components/common/Pagination";
import { deleteRole, fetchAllRoles } from "@/redux/admin/actions/roles";
import { toast } from "react-toastify";
import { removeDeletingRoleError, removeFetchingRolesError } from "@/redux/admin/slices/rolesSlice";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Roles = () => {
  const dispatch = useDispatch();
  const { roles,
    isFetchingRoles,
    fetchingRolesError, totalCount, deletedRole,
    isDeletingRole,
    deletingRoleError } = useSelector((state) => state.role);
  const navigate = useNavigate(); 
  const [deleteId, setDeleteId] = useState("")

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
    dispatch(deleteRole(id));
  }

  useEffect(() => {
    if (deletedRole) {
      toast.success("Deleted successfully")
      setDeleteId("");
    }
    if (deletingRoleError) {
      toast.error("Error in deleting role")
    }
    dispatch(removeDeletingRoleError());
  }, [deletedRole, deletingRoleError])

  const handleEdit = (id) => {
    navigate(`/dashboard/admin/roles/edit/${id}`);
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
      Header: 'Updated At',
      accessor: 'updatedAt',
      Cell: ({ value }) => formatDate(value),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => handleEdit(row.original?._id)} 
            className="bg-blue-300 hover:bg-blue-500 transition-all p-2 rounded"
          >
            <FaEdit className="text-white" />
          </button>
          <button 
            onClick={() => handleDelete(row.original?._id)} 
            className="bg-red-300 hover:bg-red-500 transition-all p-2 rounded"
          >
            {
              (row.original?._id === deleteId && isDeletingRole) ? (
                <div className="flex items-center justify-center">
                  <div className="loader-delete"></div>
                </div>
              ) : (
                <MdDelete className="text-white" />
              )
            }
          </button>
        </div>
      ),
    }
  ];


  return (
    <div>
      <h1 className="text-xl md:text-3xl font-semibold">Roles</h1>
      {isFetchingRoles ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" visible={true} />
        </div>
      ) : (

        <div>
          <div className="flex justify-between p-3">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            onClick={()=>navigate("/dashboard/admin/role/create")} 
            >
              Add
            </button>
          </div>
          <ReusableTable
            data={roles||[]}
            editPath={`${window.location.pathname}/edit`}
            columns={columns}   //Must define table columns according to your data
        />
          <Pagination totalItems={totalCount} itemsPerPage = {10}/>
        </div>

         
      )}
    </div>
  );
};

export default Roles;