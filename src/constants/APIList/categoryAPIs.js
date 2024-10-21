//ALL Admin category APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const categoryAPIs = {
    getCategory:`${BASE_URL}/admin/sections`,
    addCategory : `${BASE_URL}/admin/sections`, 
    deleteCategory : `${BASE_URL}/admin/sections`,
    getCategoryById : `${BASE_URL}/admin/sections`, 
    editCategory : `${BASE_URL}/admin/sections`, 
}
export default categoryAPIs;