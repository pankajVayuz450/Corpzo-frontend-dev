//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const formActionAPIs = {
    saveFormData:`${BASE_URL}/users/save-form`,
    getUserData:`${BASE_URL}/admin/form/all-data`,
}
export default formActionAPIs;