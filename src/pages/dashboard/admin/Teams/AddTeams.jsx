import React from 'react'
import * as Yup from 'yup';
import AddEditRolesAndTeams from '../AddEditRolesAndTeams';

const AddTeam = () => {

  const initialValues = {
    team: ""
  };
  const validationSchema = Yup.object({
    team: Yup.string().required('Role is required')
  })

  return (
    <div>
      <AddEditRolesAndTeams initialValues={initialValues} validationSchema={validationSchema} type={"team"} subType={"add"} />
    </div>
  )
}

export default AddTeam