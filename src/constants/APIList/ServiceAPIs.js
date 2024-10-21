//ALL Admin Service APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const serviceAPIs= {
    getService:`${BASE_URL}/admin/service`,
    getActiveCategories : `${BASE_URL}/user/all-service-category`,
    getActiveSubCategories : `${BASE_URL}/user/service-subcategory`,
    getActiveSubCategoriesAll : `${BASE_URL}/admin/service-subcategorys`,
    getActiveBusinessEmail : `${BASE_URL}/admin/businesses`,
    uploadVideo : `${BASE_URL}/user/auth/upload-file`,
    getForms : `${BASE_URL}/admin/form`,
    addService : `${BASE_URL}/admin/service`,
    editService : `${BASE_URL}/admin/service`
}
export default serviceAPIs;