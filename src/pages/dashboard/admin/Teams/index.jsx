import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReusableTable from "@/components/common/Tables";
import { TailSpin } from "react-loader-spinner";
import { format } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "@/components/common/Pagination";
import { deleteTeam, fetchAllTeams } from "@/redux/admin/actions/teams";
import { toast } from "react-toastify";
import { removeDeletingTeamError, removeFetchingTeamsError } from "@/redux/admin/slices/teamsSlice";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Teams = () => {
  const dispatch = useDispatch();
  const { teams,
    isFetchingTeams,
    fetchingTeamsError, totalCount, deletedTeam,
    isDeletingTeam,
    deletingTeamError } = useSelector((state) => state.team);
  const navigate = useNavigate(); 
  const [deleteId, setDeleteId] = useState("")

  useEffect(() => {
    if (fetchingTeamsError) {
        toast.error("Error occur in fetching teams.")
    }
    dispatch(removeFetchingTeamsError());
  }, [fetchingTeamsError])

    //handling pagination here..
    const [searchParams] = useSearchParams();
    // const [limit, setLimit]= useState(searchParams.get('limit') || 10);
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;
    
  
  useEffect(() => {
    dispatch(fetchAllTeams({ page, limit }));
  }, [page, limit]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    dispatch(deleteTeam(id));
  }

  useEffect(() => {
    if (deletedTeam) {
      toast.success("Deleted successfully")
      setDeleteId("");
    }
    if (deletingTeamError) {
      toast.error("Error in deleting team")
    }
    dispatch(removeDeletingTeamError());
  }, [deletedTeam, deletingTeamError])

  const handleEdit = (id) => {
    navigate(`/dashboard/admin/teams/edit/${id}`);
  }
  

  //This Column is requred for the Table 
  const columns = [
    {
      Header: 'Team',
      accessor: 'team',
      Cell: ({ row }) => (row?.original?.team),
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
              (row.original?._id === deleteId && isDeletingTeam) ? (
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
      <h1 className="text-xl md:text-3xl font-semibold">Teams</h1>
      {isFetchingTeams ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" visible={true} />
        </div>
      ) : (

        <div>
          <div className="flex justify-between p-3">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            onClick={()=>navigate("/dashboard/admin/team/create")} 
            >
              Add
            </button>
          </div>
          <ReusableTable
            data={teams||[]}
            editPath={`${window.location.pathname}/edit`}
            columns={columns}   //Must define table columns according to your data
        />
          <Pagination totalItems={totalCount} itemsPerPage = {10}/>
        </div>

         
      )}
    </div>
  );
};

export default Teams;