//ALL Admin Investor APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const InvestorAPIs = {
    getInvestor:`${BASE_URL}/admin/investors`,
    addInvestor : `${BASE_URL}/admin/investors`, 
    deleteInvestor : `${BASE_URL}/admin/investors`,
    getInvestorById : `${BASE_URL}/admin/investors`, 
    editInvestor : `${BASE_URL}/admin/investors`, 
}
export default InvestorAPIs;