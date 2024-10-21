//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const formFieldsAPI = {
    createFormField:`${BASE_URL}/admin/form/field`,
    getAllFormFields:`${BASE_URL}/admin/form/field`,
    updateFormFieldById:`${BASE_URL}/admin/form/field`,
    deleteFormFieldById:`${BASE_URL}/admin/form/field`,

}
export default formFieldsAPI;