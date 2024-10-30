import React from 'react'
import * as Yup from 'yup';
import AddEditRolesAndTeams from '../AddEditRolesAndTeams';
import Breadcrumb from '@/widgets/layout/TopNavigation';

const AddTeam = () => {

  const initialValues = {
    team: ""
  };

  
  const breadcrumbData = [
    {
          name: 'Teams',
          url: "/dashboard/admin/teams",
          children: [
            {
              name: 'Create Team'
            },
          ],
    }
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbData}/>
      <AddEditRolesAndTeams initialValues={initialValues} type={"team"} subType={"add"} />
    </div>
  )
}

export default AddTeam