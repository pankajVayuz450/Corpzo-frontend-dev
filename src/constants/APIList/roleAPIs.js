//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const roleAPIs = {
    createRole:`${BASE_URL}/admin/role`,
    getAllRoles:`${BASE_URL}/admin/role`,
    getRoleById:`${BASE_URL}/admin/role`,
    updateRoleById:`${BASE_URL}/admin/role`,
    deleteRoleById:`${BASE_URL}/admin/role`,
    fetchAssignedToData:`${BASE_URL}/admin/users`,
}
export default roleAPIs;