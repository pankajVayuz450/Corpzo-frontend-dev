import React from 'react'
import * as Yup from 'yup';
import AddEditRolesAndTeams from '../AddEditRolesAndTeams';

const AddRole = () => {

  const initialValues = {
    role: ""
  };
  const validationSchema = Yup.object({
    role: Yup.string().required('Role is required')
  })

  return (
    <div>
      <AddEditRolesAndTeams initialValues={initialValues} validationSchema={validationSchema} type={"role"} subType={"add"} />
    </div>
  )
}

export default AddRole
