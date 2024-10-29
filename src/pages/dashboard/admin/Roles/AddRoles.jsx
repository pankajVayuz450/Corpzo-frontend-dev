import React from 'react'
import * as Yup from 'yup';
import AddEditRolesAndTeams from '../AddEditRolesAndTeams';
import Breadcrumb from '@/widgets/layout/TopNavigation';

const AddRole = () => {

  const initialValues = {
    role: ""
  };

  
  
  const breadcrumbData = [
    {
      name: 'Roles',
      url: "/dashboard/admin/roles",
      children: [
        {
          name: 'Add Role'
        },
      ],
}
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbData}/>
      <AddEditRolesAndTeams initialValues={initialValues} type={"role"} subType={"add"} />
    </div>
  )
}

export default AddRole
