import { fetchRoleById } from '@/redux/admin/actions/roles';
import { removeFetchingSingleRoleError } from '@/redux/admin/slices/rolesSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import AddEditRolesAndTeams from '../AddEditRolesAndTeams';
import { TailSpin } from 'react-loader-spinner';

const EditRole = () => {

  const { roleId } = useParams();
  const dispatch = useDispatch();
  const { role,
    isFetchingRole,
    fetchingRoleError } = useSelector(state => state.role)

  useEffect(() => {
    if (roleId) {
        dispatch(fetchRoleById(roleId));
    }
  }, [roleId])

  useEffect(() => {
    if (fetchingRoleError) {
        toast.error("Error in fetching role")
    }
    dispatch(removeFetchingSingleRoleError());
  }, [fetchingRoleError])

  const validationSchema = Yup.object({
    role: Yup.string().required('Role is required')
  })

  return (
    <div>
        {isFetchingRole ? (
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
            color="#4fa94d"
            ariaLabel="loading"
            visible={true}
          />
        </div>
      ) : role ? (
        // Render table with attributes data
        <AddEditRolesAndTeams initialValues={{ role }} validationSchema={validationSchema} type={"role"} subType={"add"} />
      ) : (
        // Initially show "No Data" if no attributes are fetched
        <p>No Data</p>
      )}
    </div>
  )
}

export default EditRole