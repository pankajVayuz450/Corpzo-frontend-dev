import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReusableTable from "@/components/common/Tables";
import { TailSpin } from "react-loader-spinner";
import { format } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "@/components/common/Pagination";
import { deleteTeam, fetchAllTeams, updateStatus } from "@/redux/admin/actions/teams";
import { toast } from "react-toastify";
import { removeDeletingTeamError, removeFetchingTeamsError } from "@/redux/admin/slices/teamsSlice";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import HeaderTitle from "@/components/common/HeaderTitle";
import Breadcrumb from "@/widgets/layout/TopNavigation";
import { Button, Dialog, DialogFooter, DialogHeader, Spinner, Switch } from "@material-tailwind/react";
import TitleComponent from "@/components/common/TitleComponent";
import TableShimmer from "@/components/common/TableShimmer";

const Teams = () => {
  const dispatch = useDispatch();
  const { teams,
    isFetchingTeams,
    fetchingTeamsError, totalCount, deletedTeam,
    isDeletingTeam,
    deletingTeamError,
    isStatusLoading
  } = useSelector((state) => state.team);
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
            className=""
          >
            <MdEdit className="text-gray-500 hover:text-gray-700 transition-all" />
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
      <Breadcrumb items={breadcrumbData} />
      <HeaderTitle title={`Team Management (${totalCount})`} />
      <TitleComponent title="CORPZO | Teams" />
      {isFetchingTeams ? (
        <TableShimmer />
      ) : (

        <div>
          <div className="flex justify-between p-3">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => navigate("/dashboard/admin/team/create")}
            >
              Create Team
            </button>
          </div>
          <ReusableTable
            data={teams || []}
            editPath={`${window.location.pathname}/edit`}
            columns={columns}   //Must define table columns according to your data
            key={isStatusLoading}
          />
          {totalCount > 10 && <Pagination totalItems={totalCount} itemsPerPage={10} />}
        </div>
      )}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Delete Team?</DialogHeader>

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