import { fetchTeamById } from '@/redux/admin/actions/teams';
import { removeFetchingSingleTeamError } from '@/redux/admin/slices/teamsSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import AddEditRolesAndTeams from '../AddEditRolesAndTeams';
import { TailSpin } from 'react-loader-spinner';
import Breadcrumb from '@/widgets/layout/TopNavigation';

const EditTeam = () => {

  const { teamId } = useParams();
  const dispatch = useDispatch();
  const { team,
    isFetchingTeam,
    fetchingTeamError } = useSelector(state => state.team)

  useEffect(() => {
    if (teamId) {
        dispatch(fetchTeamById(teamId));
    }
  }, [teamId])

  useEffect(() => {
    if (fetchingTeamError) {
        toast.error("Error in fetching team")
    }
    dispatch(removeFetchingSingleTeamError());
  }, [fetchingTeamError])

  
  
  const breadcrumbData = [
    {
      name: 'Teams',
      url: "/dashboard/admin/teams",
      children: [
        {
          name: 'Update Team'
        },
      ],
}
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbData}/>
        {isFetchingTeam ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <TailSpin
            height="80"
            width="80"
            color="blue"
            ariaLabel="loading"
            visible={true}
          />
        </div>
      ) : team ? (
        // Render table with attributes data
        <AddEditRolesAndTeams initialValues={{ team }} type={"team"} subType={"edit"} teamId={teamId}/>
      ) : (
        // Initially show "No Data" if no attributes are fetched
        <p>No Data</p>
      )}
    </div>
  )
}

export default EditTeam