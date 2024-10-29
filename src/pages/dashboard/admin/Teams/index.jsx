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
import HeaderTitle from "@/components/common/HeaderTitle";
import Breadcrumb from "@/widgets/layout/TopNavigation";
import { Button, Dialog, DialogFooter, DialogHeader, Spinner } from "@material-tailwind/react";

const Teams = () => {
  const dispatch = useDispatch();
  const { teams,
    isFetchingTeams,
    fetchingTeamsError, totalCount, deletedTeam,
    isDeletingTeam,
    deletingTeamError } = useSelector((state) => state.team);
  const navigate = useNavigate(); 
  const [deleteId, setDeleteId] = useState("")
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  
  const handleDelete = (id) => {
    setDeleteId(id);
    handleOpen();
  }

  const confirmDelete = () => {
    dispatch(deleteTeam(deleteId));
  }

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

  useEffect(() => {
    if (deletedTeam) {
      toast.success("Deleted successfully")
      setDeleteId("");
      handleOpen();
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
            <MdDelete className="text-white" />
          </button>
        </div>
      ),
    }
  ];

  
  const breadcrumbData = [
    {
          name: 'Teams',
    }
  ];


  return (
    <div>
      <Breadcrumb items={breadcrumbData}/>
      <HeaderTitle title={`Team Management (${totalCount})`}/>
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
          {limit > 10 && <Pagination totalItems={totalCount} itemsPerPage = {10}/>}
        </div>
      )}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Delete Step?</DialogHeader>
        
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
          {isDeletingTeam ?
            <div className='flex justify-center items-center gap-3'>
              <Spinner color='white' className="h-4 w-4" />
              Deleting Team
            </div>
            : "Delete Team"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Teams;