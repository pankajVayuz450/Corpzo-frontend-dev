//ALL Admin sub category APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const SubCategoryAPIs = {
    getSubCategory:`${BASE_URL}/admin/sub-sections`,
    addSubCategory : `${BASE_URL}/admin/sub-sections`, 
    deleteSubCategory : `${BASE_URL}/admin/sub-sections`,
    getSubCategoryById : `${BASE_URL}/admin/sub-sections`, 
    editSubCategory : `${BASE_URL}/admin/sub-sections`,
    getActiveCategories : `${BASE_URL}/user/all-service-category` 
}
export default SubCategoryAPIs;