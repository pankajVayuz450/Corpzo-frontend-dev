//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const userAPIs = {
    createUser:`${BASE_URL}/admin/user`,
    getAllUsers:`${BASE_URL}/admin/user`,
    getUserById:`${BASE_URL}/admin/user`,
    updateUserById:`${BASE_URL}/admin/user`,
    deleteUserById:`${BASE_URL}/admin/user`,
    getBusinessDetails :`${BASE_URL}/business/user-business`,
    getAllUserServices :`${BASE_URL}/admin/service-details`,
}
export default userAPIs;