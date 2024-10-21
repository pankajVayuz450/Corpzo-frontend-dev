//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const subAdminAPIs = {
    createSubAdmin:`${BASE_URL}/admin/agents`,
    getAllSubAdmins:`${BASE_URL}/admin/agents`,
    getSubAdminById:`${BASE_URL}/admin/agents`,
    updateSubAdminById:`${BASE_URL}/admin/agents`,
    deleteSubAdminById:`${BASE_URL}/admin/agents`,
}
export default subAdminAPIs;