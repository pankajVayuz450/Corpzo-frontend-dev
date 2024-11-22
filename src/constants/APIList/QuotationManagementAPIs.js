//ALL Admin quotation APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const quotationAPIs = {
    getAllQuotation:`${BASE_URL}/admin/quotation`,
    getAllUsers: `${BASE_URL}/admin/users?role=user`,
    getAllBusinesses : `${BASE_URL}/business/user-business`,
    createQuotation : `${BASE_URL}/admin/quotation`,
    getSingleQuotation : `${BASE_URL}/admin/quotation`,
    updateQuotation : `${BASE_URL}/admin/quotation`,
    updateStatus : `${BASE_URL}/admin/quotation`
}
export default quotationAPIs;