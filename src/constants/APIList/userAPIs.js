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
    getAllTransactions :`${BASE_URL}/admin/applications/transaction`,
    getAllProgress :`${BASE_URL}/admin/all-service-progress`,
    downloadUsers : `${BASE_URL}/admin/users?role=user`,
    viewInvoice : `${BASE_URL}/admin/applications/download-invoice`,
    verifyUserFormTable : `${BASE_URL}/admin/verify-temp-user`,
    verifyTemporaryUser : `${BASE_URL}/admin/email/verify-temp-user`,
    getUserId : `${BASE_URL}/admin/user-id-number`,
    promoteDemoteUser :  `${BASE_URL}/admin/promot-user`,
    archiveUser : `${BASE_URL}/admin/delete-user`,
    viewLogs : `${BASE_URL}/admin/applications/logs`
}
export default userAPIs;